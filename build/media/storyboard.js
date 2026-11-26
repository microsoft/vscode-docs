'use strict';

const fs = require('fs');
const schema = require('../schemas/storyboard.schema.json');
const {ProcedureFailure, failureDetails} = require('./replay-errors');

function requireValue(condition, message) {
  if (!condition) {
    throw new Error(`Invalid storyboard: ${message}`);
  }
}

function definition(value) {
  return value.$ref ? Reflect.get(schema.$defs, value.$ref.slice('#/$defs/'.length)) : value;
}

function requireShape(value, rule, label) {
  requireValue(value !== null && typeof value === 'object' && !Array.isArray(value), `${label} must be an object.`);
  for (const key of rule.required || []) {
    requireValue(Object.hasOwn(value, key), `${label}.${key} is required.`);
  }
  for (const key of Object.keys(value)) {
    requireValue(Object.hasOwn(rule.properties, key), `${label}.${key} is not supported.`);
  }
}

function requireScalar(value, rule, label) {
  rule = definition(rule);
  if (Object.hasOwn(rule, 'const')) {
    requireValue(value === rule.const, `${label} must be ${JSON.stringify(rule.const)}.`);
  }
  if (rule.enum) {
    requireValue(rule.enum.includes(value), `${label} must be one of ${rule.enum.join(', ')}.`);
  }
  if (rule.type === 'boolean') {
    requireValue(typeof value === 'boolean', `${label} must be boolean.`);
  } else if (rule.type === 'integer') {
    requireValue(Number.isInteger(value) && value >= rule.minimum && value <= rule.maximum,
      `${label} must be an integer from ${rule.minimum} to ${rule.maximum}.`);
  } else if (rule.type === 'string') {
    requireValue(typeof value === 'string' && value.length >= (rule.minLength || 0) &&
      value.length <= (rule.maxLength || 4096), `${label} has an invalid string length.`);
    // Patterns come only from the checked-in schema, never from storyboard input.
    // eslint-disable-next-line security/detect-non-literal-regexp
    requireValue(!rule.pattern || new RegExp(rule.pattern).test(value), `${label} has an invalid format.`);
  }
}

function requireScalarFields(value, rule, label, excluded = []) {
  requireShape(value, rule, label);
  for (const [key, item] of Object.entries(value)) {
    if (!excluded.includes(key)) {
      requireScalar(item, Reflect.get(rule.properties, key), `${label}.${key}`);
    }
  }
}

function requireArray(value, rule, label) {
  requireValue(Array.isArray(value) && value.length >= rule.minItems && value.length <= rule.maxItems,
    `${label} must have ${rule.minItems}-${rule.maxItems} items.`);
}

const STEP_RULES = new Map(schema.$defs.steps.items.oneOf.map(reference => {
  const rule = definition(reference);
  return [rule.properties.kind.const, rule];
}));

function validateSteps(steps, targets, label, requireAssertion, typingBudget = 15000) {
  requireArray(steps, schema.$defs.steps, label);
  let delay = 0;
  let pauses = 0;
  const requireTarget = name => {
    requireScalar(name, schema.$defs.targetName, `${label}.target`);
    requireValue(Object.hasOwn(targets, name), `${label} references unknown target "${name}".`);
  };
  for (const [index, step] of steps.entries()) {
    const rule = STEP_RULES.get(step?.kind);
    requireValue(Boolean(rule), `${label}[${index}] has an unsupported step kind.`);
    requireScalarFields(step, rule, `${label}[${index}]`, ['expectTextCycle']);
    if (Object.hasOwn(step, 'target')) {
      requireTarget(step.target);
    }
    if (step.expectTextCycle) {
      const cycle = step.expectTextCycle;
      const cycleRule = schema.$defs.textCycle;
      requireShape(cycle, cycleRule, `${label}[${index}].expectTextCycle`);
      requireTarget(cycle.target);
      requireArray(cycle.values, cycleRule.properties.values, `${label}[${index}].expectTextCycle.values`);
      for (const value of cycle.values) {
        requireScalar(value, cycleRule.properties.values.items, `${label}[${index}].expectTextCycle.values[]`);
      }
      requireValue(new Set(cycle.values).size === cycle.values.length, `${label} text-cycle values must be unique.`);
    } else {
      requireValue(!Object.hasOwn(step, 'expectTextCycle'), `${label} requires an object for expectTextCycle.`);
    }
    if (step.kind === 'pause') {
      pauses += step.ms;
      delay += step.ms;
    } else if (step.kind === 'type') {
      delay += step.text.length * step.delayMs;
    }
  }
  requireValue(delay <= typingBudget && pauses <= 5000, `${label} exceeds the typing or pause budget.`);
  requireValue(!requireAssertion || steps.some(step => step.kind === 'assert' || step.expectTextCycle),
    `${label} needs an assertion or a text-cycle check before capture.`);
}

function validateStoryboard(value) {
  requireValue(value?.schemaVersion === 2, 'unsupported schemaVersion; migrate to version 2 using build/media/storyboards/editor-find.json.');
  requireScalarFields(value, schema, 'storyboard', ['profile', 'fixture', 'workspace', 'gitDemo', 'targets', 'steps', 'instructions', 'capture', 'video', 'privacy', 'liveAI']);
  const liveAI = value.ai === 'live-approved';
  const gitDemo = value.capture?.mode === 'git-demo';
  const singleRun = liveAI || gitDemo;
  requireScalarFields(value.profile, schema.$defs.profile, 'profile');
  requireValue(value.profile.zoomLevel === (value.profile.wideContent ? 1.5 : 2),
    'use zoom level 2 by default, or 1.5 with profile.wideContent: true.');
  requireValue(['fixture', 'workspace', 'gitDemo'].filter(key => Object.hasOwn(value, key)).length === 1,
    'supply either a generated fixture, an existing workspace entry, or a Git demo.');
  if (value.fixture) {
    requireScalarFields(value.fixture, schema.$defs.fixture, 'fixture');
  } else if (value.gitDemo) {
    requireScalarFields(value.gitDemo, schema.properties.gitDemo, 'gitDemo');
    requireValue(gitDemo && !liveAI, 'gitDemo requires no-AI git-demo capture mode.');
    requireValue(value.gitDemo.commitMessage.trim() === value.gitDemo.commitMessage,
      'gitDemo commitMessage must not have leading or trailing whitespace.');
  } else {
    requireScalarFields(value.workspace, schema.$defs.workspace, 'workspace', ['allowedChanges', 'excludedDirectories']);
    if (Object.hasOwn(value.workspace, 'excludedDirectories')) {
      const rule = schema.$defs.workspace.properties.excludedDirectories;
      requireArray(value.workspace.excludedDirectories, rule, 'workspace.excludedDirectories');
      for (const directory of value.workspace.excludedDirectories) requireScalar(directory, rule.items, 'workspace.excludedDirectories[]');
      requireValue(new Set(value.workspace.excludedDirectories).size === value.workspace.excludedDirectories.length,
        'workspace.excludedDirectories must be unique.');
    }
    if (Object.hasOwn(value.workspace, 'allowedChanges')) {
      const rule = schema.$defs.workspace.properties.allowedChanges;
      requireArray(value.workspace.allowedChanges, rule, 'workspace.allowedChanges');
      for (const file of value.workspace.allowedChanges) {
        requireScalar(file, rule.items, 'workspace.allowedChanges[]');
        requireValue(file.split('/').every(part => part && part !== '.' && part !== '..') &&
          !file.split('/').some(part => part.endsWith('.') || /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(part)) &&
          !['.git', '.github', '.vscode', '.mcp.json', ...(value.workspace.excludedDirectories || [])]
            .some(root => file.toLowerCase() === root || file.toLowerCase().startsWith(`${root}/`)),
        'allowedChanges must name source files, without traversal, reserved names, protected configuration, or excluded trees.');
      }
      requireValue(new Set(value.workspace.allowedChanges.map(file => file.toLowerCase())).size === value.workspace.allowedChanges.length,
        'workspace.allowedChanges must be unique.');
    }
  }
  const targetsRule = schema.properties.targets;
  requireValue(value.targets !== null && typeof value.targets === 'object' && !Array.isArray(value.targets),
    'targets must be an object.');
  requireValue(Object.keys(value.targets).length >= targetsRule.minProperties &&
    Object.keys(value.targets).length <= targetsRule.maxProperties, 'targets must have 1-30 entries.');
  for (const [name, target] of Object.entries(value.targets)) {
    requireScalar(name, {type: 'string', ...targetsRule.propertyNames}, 'target name');
    requireScalarFields(target, schema.$defs.target, `targets.${name}`);
    requireValue(!target.surface || (liveAI && Boolean(value.video?.browserUrl)),
      'browser targets require a live-approved video with an explicit browserUrl.');
    if (Object.hasOwn(target, 'selector')) {
      requireValue(!Object.hasOwn(target, 'role') && !Object.hasOwn(target, 'name') && !Object.hasOwn(target, 'exact'),
        `targets.${name} must use a selector or a role and name, not both.`);
    } else {
      requireValue(Object.hasOwn(target, 'role') && Object.hasOwn(target, 'name'),
        `targets.${name} requires a role and name.`);
    }
  }
  validateSteps(value.steps, value.targets, 'steps', true);
  if (Object.hasOwn(value, 'instructions')) {
    const instructions = value.instructions;
    const rule = schema.properties.instructions;
    requireScalarFields(instructions, rule, 'instructions', ['checks']);
    requireArray(instructions.checks, rule.properties.checks, 'instructions.checks');
    requireValue(!Object.hasOwn(value, 'video'), 'instruction checks use steps, not video phases.');
    for (const [index, check] of instructions.checks.entries()) {
      const label = `instructions.checks[${index}]`;
      requireScalarFields(check, schema.$defs.instructionCheck, label, ['source', 'steps']);
      requireScalarFields(check.source, schema.$defs.instructionSource, `${label}.source`);
      requireValue(check.source.endLine >= check.source.line &&
        check.source.quote.split('\n').length === check.source.endLine - check.source.line + 1,
      `${label}.source must quote complete lines in its range.`);
      requireValue(Object.hasOwn(check, 'steps') !== Object.hasOwn(check, 'notChecked'),
        `${label} requires steps or an explicit notChecked reason.`);
      if (Object.hasOwn(check, 'steps')) {
        const stepsRule = schema.$defs.instructionCheck.properties.steps;
        requireArray(check.steps, stepsRule, `${label}.steps`);
        for (const [position, step] of check.steps.entries()) {
          requireScalar(step, stepsRule.items, `${label}.steps[]`);
          requireValue(step < value.steps.length && (position === 0 || step > check.steps[position - 1]),
            `${label}.steps must reference existing steps in increasing order.`);
        }
        const outcome = value.steps.at(check.steps.at(-1));
        requireValue(outcome.kind === 'assert' || outcome.kind === 'wait-for' || outcome.expectTextCycle,
          `${label}.steps must end with an observable outcome.`);
      }
    }
  }
  requireScalarFields(value.capture, schema.properties.capture, 'capture', ['highlights']);
  if (liveAI) {
    requireValue(value.capture.mode === 'live-ai' && ['editor', 'agents'].includes(value.capture.surface) &&
      value.workspace?.environment === 'sample' && Array.isArray(value.workspace.allowedChanges) &&
      Boolean(value.video) && !value.instructions, 'live AI requires a sample, allowedChanges, surface, and video, without replay instructions.');
    requireScalarFields(value.liveAI, schema.properties.liveAI, 'liveAI');
    requireValue(value.steps.every(step => ['assert', 'wait-for', 'pause'].includes(step.kind)),
      'live-AI setup steps must only observe the prepared scene; actions belong in the single recorded execution.');
  } else {
    requireValue(!Object.hasOwn(value, 'liveAI') && !Object.hasOwn(value.workspace || {}, 'allowedChanges') &&
      !Object.hasOwn(value.workspace || {}, 'excludedDirectories'), 'liveAI and workspace change controls require explicit live-AI mode.');
    if (gitDemo) {
      requireValue(Boolean(value.gitDemo) && value.capture.surface === 'editor' && Boolean(value.video) &&
        !value.instructions && !value.capture.highlights,
      'git-demo requires a generated Git demo, editor video, and no replay or screenshot highlights.');
      requireValue(value.steps.every(step => ['assert', 'wait-for', 'pause'].includes(step.kind)),
        'git-demo setup must only observe the empty workspace; actions belong in the single recording.');
    } else if (value.capture.mode || value.capture.surface) {
      requireValue(value.capture.mode === 'prepared-session' && ['editor', 'agents'].includes(value.capture.surface),
        'prepared-session capture requires a mode and surface.');
      requireValue(value.workspace?.environment === 'sample' && !value.video && !value.instructions,
        'prepared-session screenshots require a sample workspace, without video or replay instructions.');
      requireValue(value.steps.every(step => ['assert', 'wait-for', 'pause'].includes(step.kind)),
        'prepared-session screenshot steps must only observe the scene; prepare it separately before confirming readiness.');
    }
  }
  if (Object.hasOwn(value.capture, 'highlights')) {
    const highlights = value.capture.highlights;
    const rule = schema.$defs.highlights;
    requireScalarFields(highlights, rule, 'capture.highlights', ['targets']);
    requireArray(highlights.targets, rule.properties.targets, 'capture.highlights.targets');
    const seen = new Set();
    for (const item of highlights.targets) {
      requireScalarFields(item, rule.properties.targets.items, 'capture.highlights.targets[]');
      requireValue(Object.hasOwn(value.targets, item.target), `highlight references unknown target "${item.target}".`);
      requireValue(!seen.has(item.target), `duplicate highlight target "${item.target}".`);
      seen.add(item.target);
    }
  }
  if (Object.hasOwn(value, 'video')) {
    requireScalarFields(value.video, schema.properties.video, 'video', ['reset', 'steps', 'blockedTargets']);
    requireValue(!value.video.browserCamera || (liveAI && Boolean(value.video.browserUrl)),
      'browserCamera requires a live-approved video with an explicit browserUrl.');
    if (singleRun) {
      requireValue(liveAI || (!value.video.browserUrl && !value.video.browserCamera && value.video.maxDurationSeconds <= 60),
        'git-demo records only the editor for at most 60 seconds.');
      if (value.video.browserUrl !== undefined) {
        requireValue(URL.canParse(value.video.browserUrl), 'browserUrl must be a valid URL.');
        const url = new URL(value.video.browserUrl);
        requireValue(url.protocol === 'http:' && ['127.0.0.1', 'localhost'].includes(url.hostname) &&
          !url.username && !url.password && !url.search && !url.hash && url.href === value.video.browserUrl,
        'browserUrl must be a canonical HTTP loopback URL without credentials, query, or fragment.');
        requireValue(!value.capture.highlights, 'browser-camera annotations belong in media composition, not screenshot highlights.');
      }
      requireValue(!Object.hasOwn(value.video, 'reset') && Object.hasOwn(value.video, 'maxDurationSeconds'),
        'single-run videos require a duration limit and cannot reset or dry-run actions.');
      const rule = schema.properties.video.properties.blockedTargets;
      requireArray(value.video.blockedTargets, rule, 'video.blockedTargets');
      for (const target of value.video.blockedTargets) {
        requireScalar(target, rule.items, 'video.blockedTargets[]');
        requireValue(Object.hasOwn(value.targets, target), 'video.blockedTargets references an unknown target.');
      }
      requireValue(new Set(value.video.blockedTargets).size === value.video.blockedTargets.length,
        'video.blockedTargets must be unique.');
      requireValue(value.video.steps.every(step =>
        (step.kind !== 'key' || Boolean(step.target)) &&
        (!step.target || !value.video.blockedTargets.includes(step.target))),
      'single-run steps must target their keyboard input and must not act on blocked prompts.');
    } else {
      requireValue(!Object.hasOwn(value.video, 'maxDurationSeconds') && !Object.hasOwn(value.video, 'blockedTargets') &&
        !Object.hasOwn(value.video, 'browserUrl'),
        'video duration and blocked-target controls require live-AI mode.');
      validateSteps(value.video.reset, value.targets, 'video.reset', false);
    }
    validateSteps(value.video.steps, value.targets, 'video.steps', true, gitDemo ? 40000 : 15000);
  }
  requireScalarFields(value.privacy, schema.properties.privacy, 'privacy', ['denyText']);
  const denied = schema.properties.privacy.properties.denyText;
  requireArray(value.privacy.denyText, denied, 'privacy.denyText');
  for (const text of value.privacy.denyText) {
    requireScalar(text, denied.items, 'privacy.denyText[]');
  }
  return value;
}

function locate(page, targets, name, surfaces = {}) {
  if (!Object.hasOwn(targets, name)) {
    throw new Error(`Unknown storyboard target: ${name}`);
  }
  const target = Reflect.get(targets, name);
  if (target.surface !== undefined && (target.surface !== 'browser' || !surfaces.browser)) {
    throw new Error('The requested browser capture surface is not available.');
  }
  const targetPage = target.surface === 'browser' ? surfaces.browser : page;
  const scope = target.scope ? targetPage.locator(target.scope) : targetPage;
  let locator = target.selector ? scope.locator(target.selector) :
    scope.getByRole(target.role, {name: target.name, exact: target.exact !== false});
  if (target.first) {
    locator = locator.first();
  }
  return locator;
}

async function assertText(locator, text, match, checkPrivacy) {
  const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // The text is escaped as a literal before constructing an anchored pattern.
  // eslint-disable-next-line security/detect-non-literal-regexp
  const hasText = match === 'equals' ? new RegExp(`^\\s*${escaped}\\s*$`) : text;
  try {
    await locator.filter({hasText}).waitFor({state: 'visible'});
  } catch (error) {
    // A timeout alone is not evidence of drift. Confirm a unique, visible result
    // and a contradictory value, without persisting arbitrary product text.
    if (error.name === 'TimeoutError') {
      await checkPrivacy();
      if (await locator.count() === 1 && await locator.isVisible()) {
        const contradictory = await locator.filter({hasText}).count() === 0;
        await checkPrivacy();
        if (contradictory) {
          throw new ProcedureFailure('mismatch', 'text-mismatch', 'Visible outcome contradicts the reviewed assertion.', {
            expected: {text, match}, observed: {state: 'visible', matches: false}
          }, error);
        }
      }
    }
    throw error;
  }
}

async function runSteps(page, storyboard, steps, checkPrivacy, phase = 'steps', started = Date.now(), surfaces = {}) {
  const completed = [];
  const privacy = async () => {
    try {
      await checkPrivacy();
    } catch (error) {
      if (error instanceof ProcedureFailure) throw error;
      throw new ProcedureFailure('privacy', 'privacy-check-failed', error.message, {}, error);
    }
  };
  for (const [index, step] of steps.entries()) {
    try {
      await privacy();
      const target = step.target ? locate(page, storyboard.targets, step.target, surfaces) : undefined;
      switch (step.kind) {
        case 'click': {
          let expectation;
          if (step.expectTextCycle) {
            const cycle = step.expectTextCycle;
            const observed = locate(page, storyboard.targets, cycle.target, surfaces);
            const current = (await observed.innerText()).trim();
            const position = cycle.values.indexOf(current);
            if (position < 0) {
              await privacy();
              if (await observed.count() !== 1 || !await observed.isVisible()) {
                throw new Error('Cannot verify a unique visible cycle outcome.');
              }
              throw new ProcedureFailure('mismatch', 'cycle-mismatch', 'Current text is not in the expected cycle.', {
                expected: {values: cycle.values}, observed: {state: 'visible', matches: false}
              });
            }
            expectation = {observed, next: cycle.values.at((position + 1) % cycle.values.length)};
          }
          await target.click();
          if (expectation) {
            await assertText(expectation.observed, expectation.next, 'equals', privacy);
          }
          break;
        }
        case 'key':
          await (target || page.keyboard).press(step.key);
          break;
        case 'hover':
          await target.hover();
          break;
        case 'fill':
          await target.fill(step.text);
          break;
        case 'type':
          await target.pressSequentially(step.text, {delay: step.delayMs});
          break;
        case 'check':
          await (step.checked ? target.check() : target.uncheck());
          break;
        case 'wait-for':
          await target.waitFor({state: step.state});
          break;
        case 'assert':
          await assertText(target, step.text, step.match, privacy);
          break;
        case 'pause':
          await page.waitForTimeout(step.ms);
          break;
        default:
          throw new Error(`Unsupported storyboard step: ${step.kind}`);
      }
      await privacy();
      completed.push({index, kind: step.kind, ...(step.target ? {target: step.target} : {}), status: 'passed', elapsedMs: Date.now() - started});
    } catch (error) {
      const details = {...failureDetails(error), phase, step: index, kind: step.kind,
        ...(step.target ? {target: step.target} : {})};
      const failure = new ProcedureFailure(details.category, details.code,
        `Storyboard ${phase}[${index}] (${step.kind}) failed: ${error.message}`, details, error);
      failure.steps = [...completed, {index, kind: step.kind, ...(step.target ? {target: step.target} : {}),
        status: 'failed', elapsedMs: Date.now() - started, failure: details}];
      throw failure;
    }
  }
  return completed;
}

function main(args = process.argv.slice(2)) {
  if (args.length === 1 && args[0] === '--help') {
    console.log('Usage: node build/media/storyboard.js <storyboard.json> [more-storyboards.json]');
    return;
  }
  if (!args.length || args.some(argument => argument.startsWith('--'))) {
    throw new Error('Supply storyboard files to validate; use --help for usage.');
  }
  const results = args.map(file => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename -- The caller explicitly selects files for passive validation.
    const storyboard = validateStoryboard(JSON.parse(fs.readFileSync(file, 'utf8')));
    return {file, id: storyboard.id, channel: storyboard.channel, execution: storyboard.execution,
      steps: storyboard.steps.length, video: Boolean(storyboard.video)};
  });
  console.log(JSON.stringify(results, null, 2));
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { locate, main, runSteps, validateStoryboard };
