const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const cfgPath = path.join(__dirname, '..', '.config', 'tsaoptions.json');

function fail(msg) {
    console.error('ERROR:', msg);
    process.exit(1);
}

function normalizePpe(val) {
    if (typeof val === 'boolean') return val;
    if (typeof val === 'string') return val.toLowerCase() === 'true';
    return false;
}

if (!fs.existsSync(cfgPath)) {
    fail(`Config file not found: ${cfgPath}`);
}

let raw;
try {
    raw = fs.readFileSync(cfgPath, 'utf8');
} catch (e) {
    fail(`Failed to read config: ${e.message}`);
}

let cfg;
try {
    cfg = JSON.parse(raw);
} catch (e) {
    fail(`Invalid JSON: ${e.message}`);
}

const required = ['instanceUrl', 'projectName', 'areaPath', 'template', 'codebaseName'];
for (const k of required) {
    if (!cfg[k]) fail(`Missing required key: ${k}`);
}

if (!/^https?:\/\//i.test(cfg.instanceUrl)) {
    fail('instanceUrl must be an http(s) URL');
}

cfg.ppe = normalizePpe(cfg.ppe);

console.log('TSA Options summary:');
console.log('  instanceUrl:', cfg.instanceUrl);
console.log('  projectName:', cfg.projectName);
console.log('  areaPath:   ', cfg.areaPath);
console.log('  template:   ', cfg.template);
console.log('  codebase:   ', cfg.codebaseName);
console.log('  ppe:        ', cfg.ppe);
if (Array.isArray(cfg.notificationAliases)) {
    console.log('  notifications:', cfg.notificationAliases.join(', '));
}

if (process.argv.includes('--open')) {
    // Use the devcontainer rule: use "$BROWSER" <url> to open the host browser
    const cmd = `"$BROWSER" ${cfg.instanceUrl}`;
    console.log('Opening instanceUrl via:', cmd);
    exec(cmd, { shell: true }, (err) => {
        if (err) console.error('Failed to open browser:', err.message);
    });
}