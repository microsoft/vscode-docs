import { fileURLToPath } from 'node:url';
import { createWorkbenchServer, createHttpDiagnostics } from './server.mjs';
import { declaredCanvas } from './canvas-declarations.mjs';

async function createArticleWorkflow(options) {
  const workflow = await import('./article-workflow.mjs');
  return workflow.createArticleWorkflow(options);
}

export const articleAssets = new Map([
  ['/', ['article.html', 'text/html; charset=utf-8']],
  ['/findings', ['article.html', 'text/html; charset=utf-8']],
  ['/writing', ['article.html', 'text/html; charset=utf-8']],
  ['/review', ['review-chat.html', 'text/html; charset=utf-8']],
  ['/screenshots', ['review-chat.html', 'text/html; charset=utf-8']],
  ['/videos', ['review-chat.html', 'text/html; charset=utf-8']],
  ['/instructions', ['review-chat.html', 'text/html; charset=utf-8']],
  ['/write', ['review-chat.html', 'text/html; charset=utf-8']],
  ['/issue', ['review-chat.html', 'text/html; charset=utf-8']],
  ['/tpis', ['release-tpis.html', 'text/html; charset=utf-8']],
  ['/prs', ['pr-reviews.html', 'text/html; charset=utf-8']],
  ['/pr-reviews-app.mjs', ['pr-reviews-app.mjs', 'text/javascript; charset=utf-8']],
  ['/release-tpis-app.mjs', ['release-tpis-app.mjs', 'text/javascript; charset=utf-8']],
  ['/review-chat.mjs', ['review-chat.mjs', 'text/javascript; charset=utf-8']],
  ['/article-app.mjs', ['article-app.mjs', 'text/javascript; charset=utf-8']],
  ['/article.css', ['article.css', 'text/css; charset=utf-8']]
]);

export function articleCanvasOptions({ getSession, CanvasError, createWorkflow = createArticleWorkflow }) {
  const instances = new Map();
  let initializing;
  async function workflow() {
    if (!initializing) initializing = createWorkflow({
      session: getSession(), workspace: fileURLToPath(new URL('../../../', import.meta.url))
    })
      .catch(error => { initializing = undefined; throw error; });
    return initializing;
  }
  async function guarded(callback) {
    try { return await callback(); }
    catch (error) { throw new CanvasError('article-check-failed', error.message); }
  }
  return {
    ...declaredCanvas('vscode-docs-article-checks', {
      status: () => guarded(async () => (await workflow()).snapshot()),
      'inspect-report': ({ input }) => guarded(async () => (await workflow()).dispatch('inspect', input))
    }),
    open: ({ instanceId }) => guarded(async () => {
      if (!instances.has(instanceId)) {
        instances.set(instanceId, (async () => createWorkbenchServer(
          await workflow(), async () => {}, createHttpDiagnostics(getSession()), { assetEntries: articleAssets }
        ))().catch(error => { instances.delete(instanceId); throw error; }));
      }
      return { url: (await instances.get(instanceId)).url };
    }),
    async onClose({ instanceId }) {
      const instance = await instances.get(instanceId);
      if (instance) { await instance.close(); instances.delete(instanceId); }
      if (!instances.size && initializing) await (await initializing).cancelVerification?.();
    }
  };
}
