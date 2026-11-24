import reviewChat from '../../../build/review-chat.js';
import { createGitHub } from './github.mjs';
import { isTime, now } from './article-storage.mjs';
import { text } from './state.mjs';

export function createPrReviews(editor, { github = createGitHub() } = {}) {
  let cache;
  return {
    async load({ repository = reviewChat.prRepositories[0] }) {
      if (!reviewChat.prRepositories.includes(repository)) throw new Error('Choose a supported documentation repository.');
      const account = text(await github.account(), 'GitHub account', 100);
      if (cache && cache.account !== account) cache = undefined;
      let error = '';
      try {
        const source = await github.openPullRequests(repository);
        if (!Array.isArray(source)) throw new Error('GitHub returned an invalid pull request list.');
        const items = source.map(item => ({
          number: item.number, title: item.title, author: item.author, draft: item.draft,
          updatedAt: typeof item.updatedAt === 'string' && Number.isFinite(Date.parse(item.updatedAt))
            ? new Date(item.updatedAt).toISOString() : item.updatedAt
        }));
        if (new Set(items.map(item => item.number)).size !== items.length || items.some(item =>
          !Number.isSafeInteger(item.number) || item.number < 1 || typeof item.title !== 'string' || !item.title.trim() ||
          (item.author !== null && typeof item.author !== 'string') || typeof item.draft !== 'boolean' || !isTime(item.updatedAt))) {
          throw new Error('GitHub returned invalid pull request metadata.');
        }
        cache = { repository, account, fetchedAt: now(), items };
      } catch (failure) { error = `Could not load PRs for ${repository}: ${failure.message}`; }
      return { repository, cache: cache || null, error,
        chatAvailable: editor.available && typeof editor.chat === 'function', chatMessage: editor.message };
    },
    async review(input) {
      if (input.confirmed !== true) throw new Error('Start the PR review explicitly before opening chat.');
      if (!editor.available || typeof editor.chat !== 'function') throw new Error(editor.message || 'Native chat opening is unavailable in this host.');
      const prompt = reviewChat.prPrompt({ url: input.url, request: input.request });
      return editor.chat({ files: [], prompt });
    }
  };
}
