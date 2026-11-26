'use strict';

const insidersSource = 'https://update.code.visualstudio.com/api/update/win32-x64/insider/latest';
const revisionPattern = /^[a-f0-9]{40}$/;
const versionPattern = /^\d+\.\d+\.\d+$/;

function reviewProductTarget({channel, version = ''}) {
  if (!['stable', 'insiders'].includes(channel) || typeof version !== 'string' ||
      (version.trim() && (channel !== 'stable' || !versionPattern.test(version.trim())))) {
    throw new Error('Choose a public product channel and an optional Stable version such as 1.147.0. Insiders uses the latest published build.');
  }
  return {channel, version: version.trim()};
}

function validateReviewProduct(product) {
  if (!product || Object.keys(product).length !== 4 ||
      Object.keys(product).some(key => !['channel', 'version', 'revision', 'source'].includes(key)) ||
      !['stable', 'insiders'].includes(product.channel) || typeof product.version !== 'string' ||
      !(product.channel === 'stable' ? versionPattern : /^\d+\.\d+\.\d+-insider$/).test(product.version) ||
      typeof product.revision !== 'string' || !revisionPattern.test(product.revision) ||
      product.source !== (product.channel === 'stable'
        ? `https://github.com/microsoft/vscode/releases/tag/${product.version}` : insidersSource)) {
    throw new Error('Invalid public product target for technical review.');
  }
  return product;
}

async function resolveReviewProduct(input, {api, fetch: request = globalThis.fetch} = {}) {
  const {channel, version} = reviewProductTarget(input);
  if (typeof api !== 'function') throw new Error('Read-only GitHub access is required to pin the product source.');
  let product;
  if (channel === 'stable') {
    const release = await api(`repos/microsoft/vscode/releases/${version ? `tags/${version}` : 'latest'}`);
    if (!release || !versionPattern.test(release.tag_name || '') || release.draft !== false || release.prerelease !== false ||
        (version && release.tag_name !== version) ||
        release.html_url !== `https://github.com/microsoft/vscode/releases/tag/${release.tag_name}`) {
      throw new Error('GitHub did not return the requested public Stable release.');
    }
    let reference = await api(`repos/microsoft/vscode/git/ref/tags/${release.tag_name}`);
    for (let depth = 0; reference?.object?.type === 'tag' && depth < 5; depth++) {
      if (!revisionPattern.test(reference.object.sha || '')) throw new Error('Invalid product release tag.');
      reference = await api(`repos/microsoft/vscode/git/tags/${reference.object.sha}`);
    }
    if (reference?.object?.type !== 'commit' || !revisionPattern.test(reference.object.sha || '')) {
      throw new Error('Cannot resolve the public release tag to a product commit.');
    }
    product = {channel, version: release.tag_name, revision: reference.object.sha, source: release.html_url};
  } else {
    const response = await request(insidersSource, {
      headers: {Accept: 'application/json'}, redirect: 'error', signal: AbortSignal.timeout(15000)
    });
    if (!response.ok) throw new Error(`Cannot resolve the published Insiders build: HTTP ${response.status}.`);
    const text = await response.text();
    if (text.length > 64000) throw new Error('Published Insiders metadata is oversized.');
    const published = JSON.parse(text);
    product = {channel, version: published.productVersion, revision: published.version, source: insidersSource};
  }
  validateReviewProduct(product);
  const commit = await api(`repos/microsoft/vscode/commits/${product.revision}`);
  if (commit?.sha !== product.revision) throw new Error('The public product revision is unavailable in microsoft/vscode.');
  return product;
}

module.exports = {resolveReviewProduct, reviewProductTarget, validateReviewProduct};
