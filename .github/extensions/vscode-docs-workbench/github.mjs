import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createHash } from 'node:crypto';
import { itemKey, WorkbenchError } from './state.mjs';

const execute = promisify(execFile);
export async function runGh(args, input) {
  if (input === undefined) {
    const { stdout } = await execute('gh', args, { windowsHide: true, timeout: 60000, maxBuffer: 20 * 1024 * 1024 });
    return JSON.parse(stdout);
  }
  return new Promise((resolve, reject) => {
    const child = execFile('gh', [...args, '--input', '-'], {
      windowsHide: true, timeout: 60000, maxBuffer: 20 * 1024 * 1024
    }, (error, stdout) => {
      if (error) reject(error);
      else {
        try { resolve(JSON.parse(stdout)); } catch (parseError) { reject(parseError); }
      }
    });
    child.stdin.on('error', reject);
    child.stdin.end(JSON.stringify(input));
  });
}

export function sourceIdentity(key) {
  itemKey(key);
  const match = /^(microsoft\/vscode(?:-docs)?):(issue|pr):([1-9]\d*)$/.exec(key);
  if (!match) throw new WorkbenchError('This operation requires a GitHub item.');
  return { repo: match[1], kind: match[2], number: Number(match[3]) };
}

export function normalize(item, repo, kind) {
  return {
    key: `${repo}:${kind}:${item.number}`, number: item.number, repo, kind,
    title: item.title, url: item.html_url || item.url, state: item.state.toLowerCase(),
    author: item.author?.login ?? item.user?.login ?? null,
    updatedAt: item.updated_at || item.updatedAt, createdAt: item.created_at || item.createdAt,
    labels: (item.labels?.nodes || item.labels || []).map(label => label.name),
    assignees: (item.assignees?.nodes || item.assignees || []).map(user => user.login),
    draft: item.isDraft ?? item.draft ?? false, reviewDecision: item.reviewDecision || '',
    sourceVersion: item.headRefOid || item.head?.sha || item.updated_at || item.updatedAt
  };
}

export function isDocumentationTpi(item) {
  const excluded = ['verification', 'verification-needed', 'verification-found', 'verification-steps-needed',
    '~verification-steps-needed', 'author-verification-requested', 'invalid-testplan-item'];
  return !item.labels.some(label => excluded.includes(label)) && !/^(?:test:\s*)?verification\b/i.test(item.title);
}

export function createGitHub(run = runGh) {
  const api = (endpoint, method = 'GET', body) => run(['api', '--hostname', 'github.com', endpoint, '--method', method], body);
  async function pages(endpoint) {
    const result = [];
    for (let page = 1; ; page++) {
      const rows = await api(`${endpoint}${endpoint.includes('?') ? '&' : '?'}per_page=100&page=${page}`);
      if (!Array.isArray(rows)) throw new WorkbenchError('GitHub returned an unexpected list response.', 502);
      result.push(...rows);
      if (rows.length < 100) return result;
    }
  }
  async function pullRequests() {
    const items = [];
    let cursor = null;
    do {
      const result = await api('graphql', 'POST', {
        query: `query($cursor:String){repository(owner:"microsoft",name:"vscode-docs"){
          pullRequests(first:100,after:$cursor,states:OPEN,orderBy:{field:UPDATED_AT,direction:DESC}){
            nodes{number title url state updatedAt createdAt isDraft headRefOid reviewDecision author{login}
              labels(first:100){nodes{name}} assignees(first:100){nodes{login}}}
            pageInfo{hasNextPage endCursor}}}}`,
        variables: { cursor }
      });
      if (result.errors) throw new WorkbenchError(result.errors.map(error => error.message).join('; '), 502);
      const connection = result.data.repository.pullRequests;
      items.push(...connection.nodes.map(item => normalize(item, 'microsoft/vscode-docs', 'pr')));
      cursor = connection.pageInfo.hasNextPage ? connection.pageInfo.endCursor : null;
    } while (cursor);
    return items;
  }
  async function milestones() {
    return (await pages('repos/microsoft/vscode/milestones?state=all'))
      .filter(item => /^\d+\.\d+\.\d+$/.test(item.title))
      .map(item => ({ title: item.title, number: item.number, state: item.state }));
  }
  async function queue(name, milestone) {
    if (name === 'pulls') return pullRequests();
    if (name === 'issues') {
      return (await pages('repos/microsoft/vscode-docs/issues?state=open'))
        .filter(item => !item.pull_request).map(item => normalize(item, 'microsoft/vscode-docs', 'issue'));
    }
    if (name !== 'tpis') throw new WorkbenchError('Unknown GitHub queue.');
    const release = (await milestones()).find(item => item.title === milestone);
    if (!release) throw new WorkbenchError(`Milestone ${milestone} does not exist in microsoft/vscode.`);
    return (await pages(`repos/microsoft/vscode/issues?state=all&labels=testplan-item&milestone=${release.number}`))
      .filter(item => !item.pull_request).map(item => normalize(item, 'microsoft/vscode', 'issue')).filter(isDocumentationTpi);
  }
  async function detail(key) {
    const { repo, kind, number } = sourceIdentity(key);
    const issue = await api(`repos/${repo}/issues/${number}`);
    const pull = kind === 'pr' ? await api(`repos/${repo}/pulls/${number}`) : undefined;
    if ((kind === 'pr') !== !!issue.pull_request) throw new WorkbenchError('GitHub item type does not match the requested action.');
    const [comments, reviews, reviewComments] = await Promise.all([
      pages(`repos/${repo}/issues/${number}/comments`),
      kind === 'pr' ? pages(`repos/${repo}/pulls/${number}/reviews`) : [],
      kind === 'pr' ? pages(`repos/${repo}/pulls/${number}/comments`) : []
    ]);
    return {
      ...normalize({ ...issue, ...(pull || {}) }, repo, kind),
      body: issue.body || '', merged: !!pull?.merged, targetBranch: pull?.base?.ref || '',
      comments: comments.map(comment => ({ id: comment.id, body: comment.body || '', url: comment.html_url, updatedAt: comment.updated_at })),
      reviews: reviews.map(review => ({ id: review.id, body: review.body || '', state: review.state, commit: review.commit_id })),
      reviewComments: reviewComments.map(comment => ({ id: comment.id, body: comment.body || '', path: comment.path, line: comment.line, updatedAt: comment.updated_at }))
    };
  }
  return {
    api, pages, queue, milestones, detail,
    account: async () => (await api('user')).login,
    async canTriage() {
      const { permissions } = await api('repos/microsoft/vscode-docs');
      return !!permissions && ['admin', 'maintain', 'push', 'triage'].some(permission => permissions[permission] === true);
    }
  };
}

export function contextVersion(item, operationId) {
  const comments = (item.comments || []).filter(comment => !operationId || !comment.body.includes(`<!-- vscode-docs-workbench:close:${operationId} -->`));
  return createHash('sha256').update(JSON.stringify({
    title: item.title, body: item.body, head: item.kind === 'pr' ? item.sourceVersion : '',
    state: item.state, merged: item.merged, comments, reviews: item.reviews || [],
    reviewComments: item.reviewComments || [], assignees: item.assignees,
    labels: item.labels.filter(label => !operationId || label !== 'invalid')
  })).digest('hex');
}
