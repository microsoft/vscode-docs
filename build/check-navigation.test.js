'use strict';

const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');
const { checkClaims, parseArguments } = require('./check-claims');
const { assertReportCurrent, formatReport } = require('./findings');
const { analyzeSitemap, collectPages, parseSitemap } = require('./verify-sitemap');

/* eslint-disable security/detect-non-literal-fs-filename -- Tests use isolated temporary directories. */

function withRepository(callback) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'vscode-docs-navigation-'));
  const root = path.join(directory, 'repo');
  try {
    const write = (file, content) => {
      const target = path.join(root, file);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, content);
    };
    write(path.join('data', 'variables', 'product.yml'), 'name: VS Code\n');
    write(path.join('build', 'feature-lifecycle.json'), '{"features":{}}');
    write(path.join('docs', 'article.md'), '---\nContentId: fixture\n---\n# Article\n\n## Section\n');
    for (const section of ['docs', 'api', 'learn']) {
      write(path.join(section, 'toc.json'), '[]');
    }
    write(path.join('build', 'sitemap.xml'), sitemap(['/docs/article']));
    const run = () => checkClaims(root, [path.join('docs', 'article.md')], { navigation: true, sourceRevision: 'same-head' });
    callback({ root, directory, write, run });
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

function sitemap(paths) {
  return '<urlset>\n' + paths.map(item => `  <url><loc>https://code.visualstudio.com${item}</loc></url>`).join('\n') + '\n</urlset>';
}

test('checks nested and imported TOCs with source lines while allowing secondary links', function () {
  withRepository(({ write, run }) => {
    write(path.join('docs', 'toc.json'), `[
      {"name":"{% data variables.product.name %}", "link":"/docs/article#section", "toc":"section/toc.json", "topics":[]},
      {"name":"Shortcuts", "topics":[["First","/docs/article"],["Again","/docs/article",{"secondary":true}]]}
    ]`);
    write(path.join('docs', 'section', 'toc.json'), `[
      {"name":"Nested", "topics":[["","",{"name":"Group","topics":[
        ["Missing","/docs/missing"],
        ["Bad fragment","/docs/article#missing"]
      ]}]]}
    ]`);
    const report = run();
    assert.deepEqual(report.checks, ['claims', 'navigation']);
    assert.deepEqual(report.findings.map(({article,line,evidence,severity}) => ({article,line,evidence,severity})), [
      {article:'docs/section/toc.json',line:3,evidence:'toc-link(/docs/missing)',severity:'unverified'},
      {article:'docs/section/toc.json',line:4,evidence:'toc-link(/docs/article#missing)',severity:'error'}
    ]);
    assert.match(formatReport(report, 'github'), /::notice file=docs\/section\/toc.json,line=3/);
    assert.match(formatReport(report, 'github'), /::error file=docs\/section\/toc.json,line=4/);
    assert.equal(parseArguments(['--navigation', '--files', 'docs']).navigation, true);
    assert.throws(() => parseArguments(['--navigation','--navigation']), /only once/);
  });
});

test('reports malformed structures and variable references rather than skipping invalid TOC entries', function () {
  withRepository(({write, run}) => {
    write(path.join('docs', 'toc.json'), `[
      {"name":"Bad topics","topics":[["Too short"],["Wrong",123],["Unknown {% data variables.product.missing %}","/docs/article"]]},
      {"name":"Bad import","toc":"missing/toc.json"}
    ]`);
    write(path.join('api', 'toc.json'), '{ broken');
    const report = run();
    assert.equal(report.findings.length, 5);
    assert.ok(report.findings.every(finding => finding.severity === 'error'));
    assert.ok(report.findings.some(finding => /Invalid TOC JSONC/.test(finding.message)));
    assert.ok(report.findings.some(finding => /Missing data variable/.test(finding.message)));
    assert.ok(report.findings.some(finding => /Cannot load TOC/.test(finding.message)));
  });
});

test('detects import cycles and refuses escaping or externally linked TOCs', function () {
  withRepository(({root, directory, write, run}) => {
    const outside = path.join(directory, 'outside');
    fs.mkdirSync(outside);
    fs.writeFileSync(path.join(outside,'toc.json'), '[]');
    fs.symlinkSync(outside, path.join(root,'docs','linked'), process.platform === 'win32' ? 'junction' : 'dir');
    write(path.join('docs','toc.json'), JSON.stringify([
      {name:'Cycle',toc:'section/toc.json'},
      {name:'Escape',toc:'../../outside/toc.json'},
      {name:'Symlink',toc:'linked/toc.json'}
    ]));
    write(path.join('docs','section','toc.json'), '[{"name":"Back","toc":"../toc.json"}]');
    const report = run();
    assert.equal(report.findings.length, 3);
    assert.ok(report.findings.every(finding => finding.severity === 'error'));
    assert.equal(report.findings.filter(finding => /outside the repository/.test(finding.message)).length, 2);
    assert.ok(report.findings.some(finding => /TOC import cycle/.test(finding.message)));
  });
});

test('maps sitemap problems to shared findings and keeps redirect-only findings nonfatal', function () {
  withRepository(({write,run}) => {
    write(path.join('docs','not-listed.md'), '---\nContentId: another\n---\n# Missing\n');
    write(path.join('docs','redirection.json'), '[{"from":"/docs/old","to":"/docs/article"}]');
    write(path.join('build','sitemap.xml'), sitemap(['/docs/article','/docs/missing','/docs/article','/docs/old']));
    const report = run();
    assert.deepEqual(report.findings.map(({article,line,evidence,severity}) => ({article,line,evidence,severity})), [
      {article:'build/sitemap.xml',line:3,evidence:'sitemap-link(/docs/missing)',severity:'unverified'},
      {article:'build/sitemap.xml',line:4,evidence:'sitemap-duplicate(/docs/article)',severity:'error'},
      {article:'build/sitemap.xml',line:5,evidence:'sitemap-redirect(/docs/old)',severity:'warning'},
      {article:'docs/not-listed.md',line:1,evidence:'sitemap-missing(/docs/not-listed)',severity:'error'}
    ]);
    write(path.join('build','sitemap.xml'), sitemap(['/docs/article','/docs/not-listed','/docs/old']));
    const warnings = run();
    assert.equal(warnings.findings.length, 1);
    assert.equal(warnings.findings[0].severity, 'warning');
  });
});

test('fingerprints navigation files, referenced headings, and the standalone page inventory', function () {
  withRepository(({write,run}) => {
    const initial = run();
    assert.deepEqual(initial.findings, []);
    assert.doesNotThrow(() => assertReportCurrent(initial,run()));
    write(path.join('docs','toc.json'), '[{"name":"Links","topics":[["Section","/docs/target#section"]]}]');
    write(path.join('docs','target.md'), '# Target\n\n## Section\n');
    const tocChanged = run();
    assert.throws(() => assertReportCurrent(initial,tocChanged), /inputHash changed/);
    write(path.join('docs','target.md'), '# Target\n\n## Renamed\n');
    const headingChanged = run();
    assert.throws(() => assertReportCurrent(tocChanged,headingChanged), /inputHash changed/);
    write(path.join('docs','new.md'), '---\nContentId: new\n---\n# New\n');
    const newPage = run();
    assert.throws(() => assertReportCurrent(headingChanged,newPage), /inputHash changed/);
    assert.ok(newPage.findings.some(finding => finding.evidence === 'sitemap-missing(/docs/new)'));
    write(path.join('build','sitemap.xml'), sitemap(['/docs/article','/docs/new']));
    assert.throws(() => assertReportCurrent(newPage,run()), /inputHash changed/);
  });
});

test('parses sitemap source locations and preserves the standalone report categories', function () {
  const xml = '<urlset>\n<!-- <url><loc>ignored</loc></url> -->\n<url>\n<loc>https://code.visualstudio.com/docs/article</loc>\n</url>\n</urlset>';
  const entries = parseSitemap(xml);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].line, 4);
  const report = analyzeSitemap(entries,new Map(),['/docs/article'], () => true);
  assert.deepEqual(report,{brokenUrls:[],missingPages:[],redirectingUrls:[],duplicates:[]});
  for (const malformed of ['not XML', '<urlset><url></url></urlset>', '<urlset><url><loc>https://code.visualstudio.com/docs/article</loc></urlset>']) {
    assert.throws(() => parseSitemap(malformed), /sitemap|Sitemap/);
  }
  withRepository(({write,run}) => {
    write(path.join('build','sitemap.xml'), '<urlset><url></url></urlset>');
    const result = run();
    assert.equal(result.findings[0].evidence,'sitemap-format');
    assert.equal(result.findings[0].severity,'error');
  });
});

test('sitemap page inventory includes index pages but excludes templates, snippets, and symbolic links', function () {
  withRepository(({root,directory,write}) => {
    write(path.join('docs','section','index.md'), '---\nContentId: index\n---\n# Section\n');
    write(path.join('docs','README.md'), '---\nContentId: readme\n---\n# Readme\n');
    write(path.join('docs','snippet.md'), '# Snippet\n');
    write(path.join('docs','sample.template.md'), '---\nContentId: template\n---\n# Template\n');
    const outside = path.join(directory,'outside');
    fs.mkdirSync(outside);
    fs.writeFileSync(path.join(outside,'page.md'),'---\nContentId: outside\n---\n# Outside\n');
    fs.symlinkSync(outside,path.join(root,'docs','linked'),process.platform === 'win32' ? 'junction' : 'dir');
    assert.deepEqual(collectPages('docs',root).sort(),['/docs/article','/docs/section']);
  });
});
