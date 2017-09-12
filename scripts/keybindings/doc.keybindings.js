/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
 
var fs = require('fs'),
	path = require('path');

function readRules() {
	var win = processRules(path.join(__dirname, 'doc.keybindings.win.json'));
	var osx = processRules(path.join(__dirname, 'doc.keybindings.osx.json'));
	var linux = processRules(path.join(__dirname, 'doc.keybindings.linux.json'));
	
	return {
		win: win,
		osx: osx,
		linux: linux
	};
}

function processRules(filepath) {
	var contents = fs.readFileSync(filepath);
	var rules = JSON.parse(contents);
	
	var lookupMap = Object.create(null);
	for (var i = 0; i < rules.length; i++) {
		lookupMap[rules[i].command.toLowerCase()] = rules[i].key;
	}
	
	return lookupMap;
}

var rules = readRules();
function lookup(commandId) {
	commandId = commandId.toLowerCase();
	var win = rules.win[commandId] || '';
	var osx = rules.osx[commandId] || '';
	var linux = rules.linux[commandId] || '';
	return {
		win: {
			value: win,
			label: keybindingToLabel('win', win)
		},
		osx: {
			value: osx,
			label: keybindingToLabel('osx', osx)
		},
		linux: {
			value: linux,
			label: keybindingToLabel('linux', linux)
		}
	};
}

var osx_replace = {
	'ctrl+': '\u2303',
	'shift+': '\u21E7',
	'alt+': '\u2325',
	'cmd+': '\u2318',
	'left': String.fromCharCode(8592),
	'up': String.fromCharCode(8593),
	'right': String.fromCharCode(8594),
	'down': String.fromCharCode(8595),
};

var winlinux_replace = {
	'ctrl+': 'Ctrl+',
	'shift+': 'Shift+',
	'alt+': 'Alt+',
	'win+': 'Win+',
	'meta+': 'Meta+'
};

function capitalizeKey(key) {
	if (!key || key.length === 0) {
		return key;
	}
	
	switch (key) {
		case 'pausebreak':
			return 'PauseBreak';
		case 'capslock':
			return 'CapsLock';
		case 'pageup':
			return 'PageUp';
		case 'pagedown':
			return 'PageDown';
		case 'leftarrow':
			return 'LeftArrow';
		case 'uparrow':
			return 'UpArrow';
		case 'rightarrow':
			return 'RightArrow';
		case 'downarrow':
			return 'DownArrow';
		case 'contextmenu':
			return 'ContextMenu';
		case 'numlock':
			return 'NumLock';
		case 'scrolllock':
			return 'ScrollLock';
	}
	
	return key.charAt(0).toUpperCase() + key.substr(1);
}

function keybindingToLabel(env, kb) {
	kb = kb.toLowerCase();
	// Actual key
	kb = kb.replace(/([^\+ ]+)($| )/gi, function(match, p1, p2) {
		return capitalizeKey(p1) + p2;
	});
	
	if (env === 'osx') {
		kb = kb.replace(/(ctrl\+|shift\+|alt\+|cmd\+|\bleft\b|\bup\b|\bright\b|\bdown\b)/gi, function(match, p1) {
			return osx_replace[p1.toLowerCase()];
		});
	} else {
		kb = kb.replace(/(ctrl\+|shift\+|alt\+|win\+|meta\+)/gi, function(match, p1) {
			return winlinux_replace[p1.toLowerCase()];
		});
	}
	
//	if (kb.indexOf('`') >= 0) {
//		return '**' + kb + '**';
//	}
	return kb;//'`' + kb + '`';
}

function renderKeybinding(label) {
	return '<span class="keybinding">' + label + '</span>';
}

function render(commandId) {
	var lookupResult = lookup(commandId);
	var win = lookupResult.win,
		osx = lookupResult.osx,
		linux = lookupResult.linux;
		
	var r = '<span class="dynamic-keybinding"';
	if (osx.value) {
		r += ' data-osx="' + osx.label + '"';
	}
	if (win.value) {
		r += ' data-win="' + win.label + '"';
	}
	if (linux.value) {
		r += ' data-linux="' + linux.label + '"';
	}
	r += '>';
	
	if (osx.value) {
		r += renderKeybinding(osx.label);
		if (win.label !== osx.label) {
			if (linux.label !== win.label) {
				r += ' (Windows ' + renderKeybinding(win.label) + ', Linux ' + renderKeybinding(linux.label) + ')';
			} else {
				r += ' (Windows, Linux ' + renderKeybinding(win.label) + ')';
			}
		}
	} else {
		if (win.value) {
			r += renderKeybinding(win.label);
			if (linux.label !== win.label) {
				r += ' (Linux ' + renderKeybinding(linux.label) + ')';
			}
		}
	}
	
	r += '</span>';
	
//	console.log(commandId + ' ==> ' + r);
	
	return r;
}

exports.processFile = function(contents) {
	return contents.replace(/\`kb\(([a-z.\d\-]+)\)\`/gi, function(match, p1) {
		return render(p1);
	});
}

exports.postProcessFile = function(contents) {
	return contents.replace(/\<code\>kb\(([a-z.\d\-]+)\)\<\/code\>/gi, function(match, p1) {
		return render(p1);
	}).replace(/\<code\>kbstyle\(([^\)]+)\)\<\/code\>/gi, function(match, p1) {
		return renderKeybinding(p1);
	});
}