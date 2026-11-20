'use strict';

const fs = require('fs');
const schema = require('./storyboard.schema.json');

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

function validateSteps(steps, targets, label, requireAssertion) {
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
  requireValue(delay <= 15000 && pauses <= 5000, `${label} exceeds the typing or pause budget.`);
  requireValue(!requireAssertion || steps.some(step => step.kind === 'assert' || step.expectTextCycle),
    `${label} needs an assertion or a text-cycle check before capture.`);
}

function validateStoryboard(value) {
  requireValue(value?.schemaVersion === 2, 'unsupported schemaVersion; migrate to version 2 using build/storyboards/editor-find.json.');
  requireScalarFields(value, schema, 'storyboard', ['profile', 'fixture', 'workspace', 'targets', 'steps', 'capture', 'video', 'privacy']);
  requireScalarFields(value.profile, schema.$defs.profile, 'profile');
  requireValue(value.profile.zoomLevel === (value.profile.wideContent ? 1.5 : 2),
    'use zoom level 2 by default, or 1.5 with profile.wideContent: true.');
  requireValue(Object.hasOwn(value, 'fixture') !== Object.hasOwn(value, 'workspace'),
    'supply either a generated fixture or an existing workspace entry.');
  if (value.fixture) {
    requireScalarFields(value.fixture, schema.$defs.fixture, 'fixture');
  } else {
    requireScalarFields(value.workspace, schema.$defs.workspace, 'workspace');
  }
  const targetsRule = schema.properties.targets;
  requireValue(value.targets !== null && typeof value.targets === 'object' && !Array.isArray(value.targets),
    'targets must be an object.');
  requireValue(Object.keys(value.targets).length >= targetsRule.minProperties &&
    Object.keys(value.targets).length <= targetsRule.maxProperties, 'targets must have 1-30 entries.');
  for (const [name, target] of Object.entries(value.targets)) {
    requireScalar(name, {type: 'string', ...targetsRule.propertyNames}, 'target name');
    requireScalarFields(target, schema.$defs.target, `targets.${name}`);
    if (Object.hasOwn(target, 'selector')) {
      requireValue(!Object.hasOwn(target, 'role') && !Object.hasOwn(target, 'name') && !Object.hasOwn(target, 'exact'),
        `targets.${name} must use a selector or a role and name, not both.`);
    } else {
      requireValue(Object.hasOwn(target, 'role') && Object.hasOwn(target, 'name'),
        `targets.${name} requires a role and name.`);
    }
  }
  validateSteps(value.steps, value.targets, 'steps', true);
  requireScalarFields(value.capture, schema.properties.capture, 'capture', ['highlights']);
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
    requireScalarFields(value.video, schema.properties.video, 'video', ['reset', 'steps']);
    validateSteps(value.video.reset, value.targets, 'video.reset', false);
    validateSteps(value.video.steps, value.targets, 'video.steps', true);
  }
  requireScalarFields(value.privacy, schema.properties.privacy, 'privacy', ['denyText']);
  const denied = schema.properties.privacy.properties.denyText;
  requireArray(value.privacy.denyText, denied, 'privacy.denyText');
  for (const text of value.privacy.denyText) {
    requireScalar(text, denied.items, 'privacy.denyText[]');
  }
  return value;
}

function locate(page, targets, name) {
  if (!Object.hasOwn(targets, name)) {
    throw new Error(`Unknown storyboard target: ${name}`);
  }
  const target = Reflect.get(targets, name);
  const scope = target.scope ? page.locator(target.scope) : page;
  let locator = target.selector ? scope.locator(target.selector) :
    scope.getByRole(target.role, {name: target.name, exact: target.exact !== false});
  if (target.first) {
    locator = locator.first();
  }
  return locator;
}

async function assertText(locator, text, match) {
  const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // The text is escaped as a literal before constructing an anchored pattern.
  // eslint-disable-next-line security/detect-non-literal-regexp
  const hasText = match === 'equals' ? new RegExp(`^\\s*${escaped}\\s*$`) : text;
  await locator.filter({hasText}).waitFor({state: 'visible'});
}

async function runSteps(page, storyboard, steps, checkPrivacy, phase = 'steps', started = Date.now()) {
  const completed = [];
  for (const [index, step] of steps.entries()) {
    try {
      await checkPrivacy();
      const target = step.target ? locate(page, storyboard.targets, step.target) : undefined;
      switch (step.kind) {
        case 'click': {
          let expectation;
          if (step.expectTextCycle) {
            const cycle = step.expectTextCycle;
            const observed = locate(page, storyboard.targets, cycle.target);
            const current = (await observed.innerText()).trim();
            const position = cycle.values.indexOf(current);
            if (position < 0) {
              throw new Error('Current text is not in the expected cycle.');
            }
            expectation = {observed, next: cycle.values.at((position + 1) % cycle.values.length)};
          }
          await target.click();
          if (expectation) {
            await assertText(expectation.observed, expectation.next, 'equals');
          }
          break;
        }
        case 'key':
          await (target || page.keyboard).press(step.key);
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
          await assertText(target, step.text, step.match);
          break;
        case 'pause':
          await page.waitForTimeout(step.ms);
          break;
        default:
          throw new Error(`Unsupported storyboard step: ${step.kind}`);
      }
      await checkPrivacy();
      completed.push({index, kind: step.kind, ...(step.target ? {target: step.target} : {}), elapsedMs: Date.now() - started});
    } catch (error) {
      throw new Error(`Storyboard ${phase}[${index}] (${step.kind}) failed: ${error.message}`, {cause: error});
    }
  }
  return completed;
}

function main(args = process.argv.slice(2)) {
  if (args.length === 1 && args[0] === '--help') {
    console.log('Usage: node build/storyboard.js <storyboard.json> [more-storyboards.json]');
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
