'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const {runSteps, validateStoryboard} = require('./storyboard');
const find = require('./storyboards/editor-find.json');
const replace = require('./storyboards/editor-find-replace.json');
const debugConfiguration = require('./storyboards/debug-create-configuration.json');

test('validates checked-in workflows and rejects unsafe paths or unsupported actions', () => {
  validateStoryboard(find);
  validateStoryboard(replace);
  validateStoryboard(debugConfiguration);
  for (const change of [
    value => { value.fixture.file = '..\\outside.js'; },
    value => { value.fixture.file = 'con.js'; },
    value => { value.fixture.openFolder = 'true'; },
    value => { value.workspace = {entry: 'example.js'}; },
    value => { value.capture.file = '../outside.png'; },
    value => { value.video.file = 'capture.json'; },
    value => { value.id = '../escape'; },
    value => { value.article = 'docs/../../outside.md'; },
    value => { value.execution = 'unattended'; },
    value => { value.ai = 'live-approved'; },
    value => { value.steps[0] = {kind: 'evaluate', script: 'arbitrary()'}; },
    value => { value.steps[0].target = 'missing'; },
    value => { value.steps[0].script = 'ignored()'; },
    value => { value.targets.query.selector = 'input'; },
    value => { value.video.steps[7].expectTextCycle.values = ['1 of 3', '1 of 3']; },
    value => { value.video.steps[7].expectTextCycle.target = 'missing'; }
  ]) {
    const value = structuredClone(find);
    change(value);
    assert.throws(() => validateStoryboard(value), /Invalid storyboard/);
  }
  assert.throws(() => validateStoryboard({...find, schemaVersion: 1}), /migrate to version 2/);
  assert.throws(() => validateStoryboard({...debugConfiguration, workspace: {entry: '../secret.json'}}), /invalid format/);
});

test('requires outcome assertions and bounds typing and pause time', () => {
  for (const steps of [
    [{kind: 'click', target: 'tab'}],
    [{kind: 'assert', target: 'count', text: 'of 3', match: 'contains'}, {kind: 'pause', ms: 2000}],
    [...Array(4).fill({kind: 'pause', ms: 1500}), find.steps.at(-1)],
    [{kind: 'type', target: 'query', text: 'x'.repeat(100), delayMs: 200}, find.steps.at(-1)],
    Array(41).fill(find.steps.at(-1))
  ]) {
    assert.throws(() => validateStoryboard({...find, steps}), /assertion|integer|budget|items/);
  }
});

test('prepared-session screenshots require a sample, a surface, and observation-only steps', () => {
  const storyboard = structuredClone(find);
  delete storyboard.fixture;
  delete storyboard.video;
  storyboard.workspace = {entry: 'example.js', environment: 'sample'};
  storyboard.capture.mode = 'prepared-session';
  storyboard.capture.surface = 'editor';
  storyboard.steps = [find.steps.at(-1)];
  validateStoryboard(storyboard);
  for (const change of [
    value => { delete value.capture.mode; },
    value => { delete value.capture.surface; },
    value => { value.capture.surface = 'browser'; },
    value => { delete value.workspace.environment; },
    value => { value.video = structuredClone(find.video); },
    value => { value.steps.unshift({kind: 'click', target: 'tab'}); },
    value => { value.steps.unshift({kind: 'key', key: 'Enter'}); },
    value => { value.steps.unshift({kind: 'fill', target: 'query', text: 'Send a prompt'}); }
  ]) {
    const invalid = structuredClone(storyboard);
    change(invalid);
    assert.throws(() => validateStoryboard(invalid), /Invalid storyboard/);
  }
});

test('live-AI scripts require explicit scope, one recorded execution, guarded prompts, and targeted keys', () => {
  const storyboard = structuredClone(find);
  delete storyboard.fixture;
  delete storyboard.video.reset;
  storyboard.ai = 'live-approved';
  storyboard.liveAI = {provider: 'Test provider', model: 'Test model', requests: 'One synthetic prompt.', tools: 'No tools.'};
  storyboard.workspace = {entry: 'example.js', environment: 'sample',
    allowedChanges: ['src/routes/+page.svelte'], excludedDirectories: ['node_modules', '.svelte-kit']};
  Object.assign(storyboard.capture, {mode: 'live-ai', surface: 'editor'});
  storyboard.steps = [find.steps.at(-1)];
  storyboard.targets.approval = {selector: '.test-approval'};
  storyboard.video.maxDurationSeconds = 25;
  storyboard.video.blockedTargets = ['approval'];
  storyboard.video.steps = [
    {kind: 'type', target: 'query', text: 'Synthetic prompt', delayMs: 40},
    {kind: 'key', target: 'query', key: 'Enter'}, find.steps.at(-1)
  ];
  validateStoryboard(storyboard);
  const browser = structuredClone(storyboard);
  browser.video.browserUrl = 'http://127.0.0.1:5187/blog';
  browser.targets.query.surface = 'browser';
  validateStoryboard(browser);
  validateStoryboard({...browser, video: {...browser.video, browserCamera: 'window'}});
  assert.throws(() => validateStoryboard({...storyboard, video: {...storyboard.video, browserCamera: 'window'}}),
    /browserCamera requires/);
  for (const url of ['https://example.com/', 'http://user:secret@localhost/', 'http://127.0.0.1:5187/blog?token=secret']) {
    assert.throws(() => validateStoryboard({...browser, video: {...browser.video, browserUrl: url}}), /loopback URL/);
  }
  assert.throws(() => validateStoryboard({...browser, video: storyboard.video}), /browser targets require/);
  for (const change of [
    value => {value.ai = 'none';},
    value => {delete value.liveAI;},
    value => {delete value.liveAI.tools;},
    value => {value.capture.mode = 'prepared-session';},
    value => {value.workspace.environment = 'isolated';},
    value => {delete value.workspace.allowedChanges;},
    value => {value.workspace.allowedChanges = ['../secret.js'];},
    value => {value.video.reset = find.video.reset;},
    value => {value.video.maxDurationSeconds = 121;},
    value => {value.workspace.allowedChanges = ['src/../secret.js'];},
    value => {value.workspace.allowedChanges = ['.vscode/settings.json'];},
    value => {value.workspace.allowedChanges = ['node_modules/package/index.js'];},
    value => {value.workspace.allowedChanges = ['src/NUL.js'];},
    value => {value.workspace.excludedDirectories = ['src'];},
    value => {delete value.video.blockedTargets;},
    value => {value.video.blockedTargets = ['missing'];},
    value => {value.video.steps[1].target = 'approval';},
    value => {delete value.video.steps[1].target;},
    value => {value.steps.unshift({kind: 'click', target: 'query'});}
  ]) {
    const invalid = structuredClone(storyboard);
    change(invalid);
    assert.throws(() => validateStoryboard(invalid), /Invalid storyboard/);
  }
});

test('browser-surface steps never fall back to the workbench', async () => {
  let clicked = false;
  const storyboard = {targets: {theme: {role: 'button', name: 'Toggle theme', surface: 'browser'}}};
  const step = [{kind: 'click', target: 'theme'}];
  const driver = {getByRole: () => {assert.fail('The browser action must not run in the workbench.');}};
  const browser = {getByRole: () => ({click: async () => {clicked = true;}})};
  await runSteps(driver, storyboard, step, async () => {}, 'video.steps', Date.now(), {browser});
  assert.equal(clicked, true);
  await assert.rejects(() => runSteps(driver, storyboard, step, async () => {}), /browser capture surface is not available/);
});

test('Git demos require an empty generated workspace, one-pass guards, and a bounded no-AI editor video', () => {
  const story = structuredClone(find);
  delete story.fixture;
  delete story.video.reset;
  story.gitDemo = {content: '# Git practice\n', commitMessage: 'Add practice README'};
  story.capture = {...story.capture, mode: 'git-demo', surface: 'editor'};
  story.steps = [find.steps.at(-1)];
  story.targets.approval = {selector: '.test-approval'};
  Object.assign(story.video, {steps: story.steps, maxDurationSeconds: 60, blockedTargets: ['approval']});
  validateStoryboard(story);
  for (const change of [
    value => {value.ai = 'live-approved';},
    value => {value.fixture = find.fixture;},
    value => {value.workspace = {entry: 'readme.md'};},
    value => {delete value.gitDemo;},
    value => {value.capture.mode = 'live-ai';},
    value => {value.capture.surface = 'agents';},
    value => {value.gitDemo.commitMessage += '\n';},
    value => {value.video.reset = find.video.reset;},
    value => {value.video.maxDurationSeconds = 61;},
    value => {delete value.video.blockedTargets;},
    value => {value.video.steps = [{kind: 'key', key: 'Enter'}, ...story.steps];},
    value => {value.steps.unshift({kind: 'click', target: 'query'});},
    value => {value.video.browserUrl = 'http://localhost/';},
    value => {value.video.steps = [{kind: 'type', target: 'query', text: 'x'.repeat(210), delayMs: 200}, ...story.steps];}
  ]) {
    const invalid = structuredClone(story);
    change(invalid);
    assert.throws(() => validateStoryboard(invalid), /Invalid storyboard/);
  }
});

test('instruction source maps require exact line ranges and an observable outcome for each runnable check', () => {
  const storyboard = structuredClone(find);
  delete storyboard.video;
  storyboard.instructions = {
    setup: 'Open the reviewed sample file.',
    checks: [
      {source: {line: 165, endLine: 165, quote: 'Article instruction.'},
        action: 'Search for total.', expected: 'Three matches.', steps: [6]},
      {source: {line: 167, endLine: 167, quote: 'Another article instruction.'},
        action: 'Check a persistent setting.', expected: 'The value survives restart.', notChecked: 'Restart is outside this check.'}
    ]
  };
  validateStoryboard(storyboard);
  for (const change of [
    value => {value.instructions.checks[0].steps = [0];},
    value => {value.instructions.checks[0].steps = [40];},
    value => {value.instructions.checks[0].steps = [6, 6];},
    value => {value.instructions.checks[0].steps = [6, 0];},
    value => {value.instructions.checks[0].notChecked = 'Not run';},
    value => {delete value.instructions.checks[1].notChecked;},
    value => {value.instructions.checks[0].source.endLine = 166;},
    value => {value.video = structuredClone(find.video);}
  ]) {
    const invalid = structuredClone(storyboard);
    change(invalid);
    assert.throws(() => validateStoryboard(invalid), /Invalid storyboard/);
  }
});

test('validates screenshot highlights without allowing unknown targets, colors, or oversized strokes', () => {
  validateStoryboard({...find, capture: {...find.capture, highlights: {targets: [{target: 'query'}]}}});
  for (const highlights of [
    null,
    {targets: []},
    {targets: [{target: 'missing'}]},
    {targets: [{target: 'query'}, {target: 'query'}]},
    {targets: [{target: 'query', padding: 33}]},
    {targets: [{target: 'query'}], strokeWidth: 0},
    {targets: [{target: 'query'}], strokeWidth: 4},
    {targets: [{target: 'query'}], strokeWidth: 1.5},
    {targets: [{target: 'query'}], color: 'blue'}
  ]) {
    assert.throws(() => validateStoryboard({...find, capture: {...find.capture, highlights}}), /Invalid storyboard/);
  }
});

function fakePage() {
  const state = {text: 'Beta', clicks: 0, events: []};
  const observed = {
    count: async () => 1,
    isVisible: async () => true,
    innerText: async () => state.text,
    filter: ({hasText}) => ({waitFor: async () => {
      assert.ok(typeof hasText === 'string' ? state.text.includes(hasText) : hasText.test(state.text), 'Unexpected visible text');
    }})
  };
  const button = {
    hover: async () => state.events.push('hovered'),
    click: async () => {
      state.clicks++;
      state.text = state.text === 'Beta' ? 'Gamma' : state.text === 'Gamma' ? 'Alpha' : 'Beta';
    },
    fill: async text => { state.text = text; },
    pressSequentially: async (text, options) => { state.events.push(['type', text, options.delay]); },
    check: async () => state.events.push('checked'),
    uncheck: async () => state.events.push('unchecked'),
    waitFor: async options => state.events.push(options.state),
    press: async key => state.events.push(key)
  };
  return {
    state,
    page: {
      locator: () => observed,
      getByRole: (role, options) => {
        assert.equal(role, 'button');
        assert.equal(options.name, 'Advance');
        assert.equal(options.exact, true);
        return button;
      },
      keyboard: {press: async key => state.events.push(key)},
      waitForTimeout: async ms => state.events.push(ms)
    }
  };
}

const targets = {advance: {role: 'button', name: 'Advance'}, position: {selector: '.position'}};
const advance = {kind: 'click', target: 'advance', expectTextCycle: {target: 'position', values: ['Alpha', 'Beta', 'Gamma']}};

test('executes named targets and verifies a text cycle from its observed starting state', async () => {
  const fake = fakePage();
  let scans = 0;
  const completed = await runSteps(fake.page, {targets}, [advance, advance, advance], async () => { scans++; });
  assert.equal(fake.state.clicks, 3);
  assert.equal(fake.state.text, 'Beta');
  assert.equal(scans, 6);
  assert.equal(completed.length, 3);
  fake.state.text = 'Unexpected state';
  await assert.rejects(() => runSteps(fake.page, {targets}, [advance], async () => {}), /steps\[0\].*expected cycle/);
  assert.equal(fake.state.clicks, 3);
});

test('executes input primitives and treats asserted text as literal, not a regular expression', async () => {
  const fake = fakePage();
  const steps = [
    {kind: 'fill', target: 'advance', text: '[total] (a+b)?'},
    {kind: 'assert', target: 'position', text: '[total] (a+b)?', match: 'equals'},
    {kind: 'type', target: 'advance', text: 'test', delayMs: 180},
    {kind: 'check', target: 'advance', checked: true},
    {kind: 'check', target: 'advance', checked: false},
    {kind: 'key', target: 'advance', key: 'Enter'},
    {kind: 'key', key: 'Escape'},
    {kind: 'hover', target: 'advance'},
    {kind: 'wait-for', target: 'advance', state: 'hidden'},
    {kind: 'pause', ms: 500}
  ];
  await runSteps(fake.page, {targets}, steps, async () => {});
  assert.deepEqual(fake.state.events, [['type', 'test', 180], 'checked', 'unchecked', 'Enter', 'Escape', 'hovered', 'hidden', 500]);
  await assert.rejects(() => runSteps(fake.page, {targets}, [
    {kind: 'assert', target: 'position', text: 'wrong', match: 'equals'}, advance
  ], async () => {}), /steps\[0\].*Unexpected visible text/);
  assert.equal(fake.state.clicks, 0);
});

test('privacy failure stops subsequent actions and reports the failing phase and step', async () => {
  const fake = fakePage();
  let scans = 0;
  await assert.rejects(() => runSteps(fake.page, {targets}, [advance, advance], async () => {
    if (++scans === 2) throw new Error('Privacy check failed');
  }, 'video.steps'), /video.steps\[0\].*Privacy check failed/);
  assert.equal(fake.state.clicks, 1);
});
