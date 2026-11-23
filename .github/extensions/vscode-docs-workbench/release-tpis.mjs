import { fileURLToPath } from 'node:url';
import writing from '../../../build/writing-chat.js';
import { createGitHub } from './github.mjs';
import { atomicJson, hash, isTime, now, readJson } from './article-storage.mjs';
import { milestoneName, text } from './state.mjs';

const format = 'vscode-docs-release-tpis';
const validNumber = value => Number.isSafeInteger(value) && value > 0;
const validRelease = release => release && validNumber(release.number) &&
  typeof release.title === 'string' && /^\d+\.\d+\.\d+$/.test(release.title) && ['open', 'closed'].includes(release.state);

function validate(state, account) {
  if (state?.format !== format || state.version !== 1 || state.account !== account ||
      Object.keys(state).some(key => !['format', 'version', 'account', 'selected', 'cache', 'documented'].includes(key)) ||
      (state.selected !== null && !validNumber(state.selected)) ||
      !Array.isArray(state.documented) || !state.documented.every(validNumber) ||
      new Set(state.documented).size !== state.documented.length) throw new Error('Corrupt release-TPI state. It has not been overwritten.');
  if (state.cache !== null && (!validRelease(state.cache?.release) || !isTime(state.cache.fetchedAt) ||
      !Array.isArray(state.cache.items) || new Set(state.cache.items.map(item => item.number)).size !== state.cache.items.length ||
      state.cache.items.some(item => !validNumber(item.number) || typeof item.title !== 'string' || !item.title.trim() ||
        !['open', 'closed'].includes(item.state) || !Array.isArray(item.assignees) ||
        item.assignees.some(name => typeof name !== 'string')))) throw new Error('Corrupt cached release TPIs. The previous data was not replaced.');
  return state;
}

export function createReleaseTpis(store, editor, { github = createGitHub() } = {}) {
  function stateName(account) { return `release-tpis-${hash(account.toLowerCase())}.json`; }
  async function read(account) {
    try { return validate(await readJson(await store.file(stateName(account), false)), account); }
    catch (error) {
      if (error.code === 'ENOENT') return { format, version: 1, account, selected: null, cache: null, documented: [] };
      throw error;
    }
  }
  async function update(account, change) {
    return store.withLock(`${stateName(account)}.lock`, async () => {
      const state = await read(account);
      change(state);
      validate(state, account);
      await atomicJson(await store.file(stateName(account)), state);
      return state;
    });
  }
  async function accountFor(expected) {
    const account = text(await github.account(), 'GitHub account', 100);
    if (expected !== undefined && expected !== account) throw new Error('The GitHub account changed. Refresh Release TPIs before continuing.');
    return account;
  }
  function view(state, releases, error = '') {
    return { account: state.account, selected: state.selected, cache: state.cache, documented: state.documented,
      releases, error, chatAvailable: editor.available && typeof editor.chat === 'function', chatMessage: editor.message };
  }
  async function selectedItem(input) {
    if (typeof input.account !== 'string' || !input.account) throw new Error('Refresh Release TPIs before changing or documenting an item.');
    const account = await accountFor(input.account);
    const state = await read(account);
    const item = state.cache?.items.find(item => item.number === input.number);
    if (!item || input.release !== state.cache.release.number) throw new Error('The TPI list changed. Refresh and use its current release list.');
    return { account, state, item };
  }
  return {
    async load(input) {
      const account = await accountFor();
      let state = await read(account);
      let releases;
      try {
        releases = await github.milestones();
        if (!Array.isArray(releases) || releases.some(release => !validRelease(release))) throw new Error('GitHub returned an invalid release list.');
        releases.sort((a, b) => b.title.localeCompare(a.title, undefined, { numeric: true }));
      } catch (error) {
        return view(state, state.cache ? [state.cache.release] : [], `Could not load releases: ${error.message}`);
      }
      const selected = input.release === undefined ? state.selected : input.release;
      if (selected === null) return view(state, releases);
      const release = releases.find(release => release.number === selected);
      if (!release) throw new Error('Choose a release from the GitHub milestone list.');
      let cache;
      let failure = '';
      try {
        const items = (await github.releaseTpis(release.number)).map(item => ({
          number: item.number, title: item.title, state: item.state, assignees: item.assignees
        }));
        cache = { release, fetchedAt: now(), items };
        validate({ ...state, cache }, account);
      } catch (error) { failure = `Could not load TPIs for ${release.title}: ${error.message}`; }
      state = await update(account, current => {
        current.selected = selected;
        if (cache && !failure) current.cache = cache;
      });
      return view(state, releases, failure);
    },
    async documented(input) {
      if (typeof input.documented !== 'boolean') throw new Error('Choose whether the TPI is documented.');
      const { account } = await selectedItem(input);
      const state = await update(account, current => {
        const numbers = new Set(current.documented);
        if (input.documented) numbers.add(input.number);
        else numbers.delete(input.number);
        current.documented = [...numbers].sort((a, b) => a - b);
      });
      return { documented: state.documented };
    },
    async document(input) {
      if (input.confirmed !== true) throw new Error('Select Document explicitly before opening a chat.');
      if (!editor.available || typeof editor.chat !== 'function') throw new Error(editor.message || 'Native chat opening is unavailable in this host.');
      const { state, item } = await selectedItem(input);
      const release = milestoneName(state.cache.release.title);
      const skill = fileURLToPath(new URL('../../skills/doc-writer/SKILL.md', import.meta.url));
      const prompt = writing.writingPrompt({ workspace: store.workspace, skill, kind: 'issue',
        issue: `https://github.com/microsoft/vscode/issues/${item.number}`,
        request: input.request, channel: input.channel });
      return editor.chat({ files: [skill], prompt: `${prompt}
This source is a test plan item selected from microsoft/vscode, release milestone ${release}.
Read the latest TPI and relevant discussion in chat. The selected milestone is context, not proof the feature shipped or permission to execute its test steps. A no-documentation recommendation is valid.` });
    }
  };
}
