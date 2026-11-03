import { createCanvas, CanvasError, joinSession } from '@github/copilot-sdk/extension';
import { realpath } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createStore, WorkbenchError } from './state.mjs';
import { createGitHub } from './github.mjs';
import { createWorkbench } from './workbench.mjs';
import { createHttpDiagnostics, createWorkbenchServer } from './server.mjs';

const instances = new Map();
const github = createGitHub();
let session;
let initializing;

async function workbench() {
  if (!initializing) {
    initializing = (async () => {
      const workspace = await realpath(fileURLToPath(new URL('../../../', import.meta.url)));
      const account = await github.account();
      const store = await createStore(workspace, account);
      await store.read();
      return createWorkbench({ session, store, github, workspace, account });
    })().catch(error => {
      initializing = undefined;
      throw new CanvasError('workbench-initialization-failed', `Cannot load Docs workbench: ${error.message}`);
    });
  }
  return initializing;
}

async function authorize(action, input) {
  if (action !== 'close-confirm' && !(action === 'launch' && input.workflow === 'implement')) return;
  if (!session.capabilities.ui?.elicitation) throw new WorkbenchError('This action requires host approval dialogs, which are unavailable.', 409);
  let prompt;
  if (action === 'close-confirm') {
    const operation = (await (await workbench()).snapshot()).operations[input.id];
    if (!operation || input.confirmed !== true) throw new WorkbenchError('A confirmed close preview is required.');
    prompt = `Close ${operation.key} (${operation.title}) without merging or deleting branches${operation.applyInvalid ? ', and apply the invalid label' : ''}?\n\nPost this public comment:\n${operation.comment}`;
  } else {
    prompt = `Approve this documentation plan and a new isolated worktree from ${input.base} for ${input.key}?\n\n${input.plan}`;
  }
  if (!await session.ui.confirm(prompt)) throw new WorkbenchError('Action cancelled. No further steps were executed.', 409);
}

async function invoke(action, input = {}, requireLaunchApproval = false) {
  try {
    if (requireLaunchApproval && input.workflow !== 'implement') {
      if (!session.capabilities.ui?.elicitation || !await session.ui.confirm(`Start ${input.workflow} for ${input.key} as a background agent? No GitHub publication is authorized.`)) {
        throw new WorkbenchError('Task launch was not approved.', 409);
      }
    }
    await authorize(action, input);
    return await (await workbench()).dispatch(action, input);
  } catch (error) {
    throw new CanvasError('workbench-action-failed', error.message);
  }
}

const schema = (properties, required) => ({ type: 'object', properties, required, additionalProperties: false });
const key = { type: 'string', description: 'Canonical identity, for example microsoft/vscode-docs:pr:1234.' };
const canvas = createCanvas({
  id: 'vscode-docs-workbench',
  displayName: 'Docs workbench',
  description: 'Track documentation PRs, release TPIs, issues, and media tasks with approved background-agent workflows.',
  actions: [{
    name: 'queue-summary',
    description: 'Read queue counts, refresh errors, milestone, and local work status without fetching GitHub.',
    async handler() {
      const state = await (await workbench()).snapshot();
      return {
        milestone: state.milestone, account: state.account,
        queues: Object.fromEntries(Object.entries(state.queues).map(([name, items]) => [name, {
          count: items.length, fetchedAt: state.cache[name]?.fetchedAt, error: state.cache[name]?.error
        }])),
        records: Object.entries(state.records).map(([key, record]) => ({ key, disposition: record.disposition }))
      };
    }
  }, {
    name: 'refresh-queues',
    description: 'Refresh GitHub queues, preserving cached data and reporting any individual queue errors.',
    async handler() {
      await invoke('refresh');
      return { refreshed: true, ...(await canvasActionSummary()) };
    }
  }, {
    name: 'inspect-item',
    description: 'Read the current source, comments, and stored workflow history for a work item.',
    inputSchema: schema({ key }, ['key']),
    handler: ({ input }) => invoke('detail', input)
  }, {
    name: 'start-workflow',
    description: 'Start a host-approved background review, documentation plan, approved implementation, or media task.',
    inputSchema: schema({
      key, workflow: { type: 'string', enum: ['review', 'document', 'close-comment', 'implement', 'screenshot', 'video'] },
      plan: { type: 'string' }, base: { type: 'string', enum: ['main', 'vnext'] }
    }, ['key', 'workflow']),
    handler: ({ input }) => invoke('launch', input, true)
  }, {
    name: 'sync-tasks',
    description: 'Read actual host background-agent states and save their results.',
    async handler() { await invoke('sync'); return canvasActionSummary(); }
  }, {
    name: 'attach-media',
    description: 'Attach a genuine PNG, WebM, or MP4 from the task private media directory for human visual review.',
    inputSchema: schema({ key, file: { type: 'string' }, description: { type: 'string' } }, ['key', 'file', 'description']),
    handler: ({ input }) => invoke('attach-media', input)
  }],
  async open({ instanceId }) {
    if (!instances.has(instanceId)) {
      try {
        const instance = await createWorkbenchServer(await workbench(), authorize, createHttpDiagnostics(session));
        instances.set(instanceId, instance);
      } catch (error) {
        throw new CanvasError('workbench-open-failed', error.message);
      }
    }
    return { url: instances.get(instanceId).url };
  },
  async onClose({ instanceId }) {
    const instance = instances.get(instanceId);
    if (instance) {
      await instance.close();
      instances.delete(instanceId);
    }
  }
});

async function canvasActionSummary() {
  const state = await (await workbench()).snapshot();
  return {
    milestone: state.milestone,
    queues: Object.fromEntries(Object.entries(state.queues).map(([name, items]) => [name, { count: items.length, error: state.cache[name]?.error }])),
    tasks: Object.entries(state.records).flatMap(([key, record]) => record.runs.map(run => ({
      key, id: run.id, workflow: run.workflow, agentId: run.agentId, status: run.status, result: run.result, error: run.error
    })))
  };
}

session = await joinSession({ canvases: [canvas] });
