import { createCanvas, CanvasError, joinSession } from '@microsoft/copilot-sdk/extension';
import { realpath } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createStore, WorkbenchError } from './state.mjs';
import { createGitHub } from './github.mjs';
import { createWorkbench } from './workbench.mjs';
import { createHttpDiagnostics, createWorkbenchServer } from './server.mjs';
import { articleCanvasOptions } from './article-canvas.mjs';
import { declaredCanvas } from './canvas-declarations.mjs';

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

const canvas = createCanvas({
  ...declaredCanvas('vscode-docs-workbench', {
    async 'queue-summary'() {
      const state = await (await workbench()).snapshot();
      return {
        milestone: state.milestone, account: state.account,
        historyCount: state.history.length, archiveCandidateCount: state.archiveCandidateCount,
        queues: Object.fromEntries(Object.entries(state.queues).map(([name, items]) => [name, {
          count: items.filter(item => !state.records[item.key]?.archivedAt).length,
          fetchedAt: state.cache[name]?.fetchedAt, error: state.cache[name]?.error
        }])),
        records: Object.entries(state.records).filter(([, record]) => !record.archivedAt)
          .map(([key, record]) => ({ key, disposition: record.disposition }))
      };
    },
    async 'refresh-queues'() {
      await invoke('refresh');
      return { refreshed: true, ...(await canvasActionSummary()) };
    },
    'inspect-item': ({ input }) => invoke('detail', input),
    'start-workflow': ({ input }) => invoke('launch', input, true),
    async 'sync-tasks'() { await invoke('sync'); return canvasActionSummary(); },
    'attach-media': ({ input }) => invoke('attach-media', input)
  }),
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
    historyCount: state.history.length, archiveCandidateCount: state.archiveCandidateCount,
    queues: Object.fromEntries(Object.entries(state.queues).map(([name, items]) => [name, {
      count: items.filter(item => !state.records[item.key]?.archivedAt).length, error: state.cache[name]?.error
    }])),
    tasks: Object.entries(state.records).filter(([, record]) => !record.archivedAt).flatMap(([key, record]) => record.runs.map(run => ({
      key, id: run.id, workflow: run.workflow, agentId: run.agentId, status: run.status, result: run.result, error: run.error
    })))
  };
}

const articleCanvas = createCanvas(articleCanvasOptions({ getSession: () => session, CanvasError }));
session = await joinSession({ canvases: { definitions: [canvas, articleCanvas] } });
