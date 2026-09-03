/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as path from 'path';
import * as vscode from 'vscode';

export type ReferenceKind = 'feature' | 'featureStatus' | 'variable';

export interface DocumentationReference {
	kind: ReferenceKind;
	value: string;
	start: number;
	end: number;
}

export interface IncompleteReference {
	kind: 'feature' | 'variable';
	offset: number;
	suffix: ')' | ' %}';
}

export interface ParsedReferences {
	references: DocumentationReference[];
	incomplete: IncompleteReference[];
}

const publishedFolders = new Set(['docs', 'api', 'remote', 'release-notes', 'blogs']);

export function isPublishedDocument(uri: vscode.Uri): boolean {
	const folder = vscode.workspace.getWorkspaceFolder(uri);
	if (!folder) {
		return false;
	}
	const relative = path.relative(folder.uri.fsPath, uri.fsPath);
	if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) {
		return false;
	}
	return isPublishedRelativePath(relative);
}

export function isPublishedRelativePath(relativePath: string): boolean {
	const normalized = relativePath.replace(/\\/g, '/');
	return publishedFolders.has(normalized.split('/')[0]);
}

export function findDocumentationReferences(text: string): ParsedReferences {
	const references: DocumentationReference[] = [];
	const incomplete: IncompleteReference[] = [];
	const excludedLines = findFencedCodeLines(text);
	const frontmatterEnd = findFrontmatterEnd(text);

	for (const match of text.matchAll(/feature\(([^)\r\n]*)\)/g)) {
		const matchStart = match.index;
		if (matchStart === undefined || isExcluded(matchStart, text, excludedLines)) {
			continue;
		}
		const value = match[1].trim();
		const valueOffset = matchStart + match[0].indexOf(match[1]) + match[1].indexOf(value);
		references.push({ kind: 'feature', value, start: valueOffset, end: valueOffset + value.length });
	}

	for (const match of text.matchAll(/\{%\s*data\s+(variables\.[^%\r\n]*?)\s*%\}/g)) {
		const matchStart = match.index;
		if (matchStart === undefined || isExcluded(matchStart, text, excludedLines)) {
			continue;
		}
		const value = match[1].trim();
		const valueOffset = matchStart + match[0].indexOf(match[1]) + match[1].indexOf(value);
		references.push({ kind: 'variable', value, start: valueOffset, end: valueOffset + value.length });
	}

	if (frontmatterEnd !== undefined) {
		const frontmatter = text.slice(0, frontmatterEnd);
		for (const match of frontmatter.matchAll(/^FeatureStatus:[ \t]*([^#\r\n]*?)[ \t]*(?:#.*)?$/gm)) {
			const matchStart = match.index;
			if (matchStart === undefined) {
				continue;
			}
			const value = match[1].trim();
			const valueOffset = matchStart + match[0].indexOf(match[1]) + match[1].indexOf(value);
			references.push({ kind: 'featureStatus', value, start: valueOffset, end: valueOffset + value.length });
		}
	}

	const lines = lineOffsets(text);
	for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
		if (excludedLines.has(lineNumber)) {
			continue;
		}
		const start = lines[lineNumber];
		const end = lineNumber + 1 < lines.length ? lines[lineNumber + 1] : text.length;
		const line = text.slice(start, end).replace(/\r?\n$/, '');

		const feature = /feature\([^)\r\n`]*(`?)[ \t]*$/.exec(line);
		if (feature) {
			const trailingWhitespace = line.length - line.trimEnd().length;
			const closingBacktickLength = feature[1].length;
			incomplete.push({
				kind: 'feature',
				offset: start + line.length - trailingWhitespace - closingBacktickLength,
				suffix: ')'
			});
		}

		const variable = /\{%\s*data\s+variables\.[^%}\r\n]*$/.exec(line);
		if (variable) {
			incomplete.push({ kind: 'variable', offset: start + line.length, suffix: ' %}' });
		}
	}

	return { references, incomplete };
}

export function rankCandidates(query: string, candidates: Iterable<string>, limit = 3): string[] {
	if (!query) {
		return [];
	}
	const threshold = Math.max(2, Math.floor(query.length * 0.35));
	return [...candidates]
		.map(candidate => ({
			candidate,
			distance: levenshteinDistance(query.toLowerCase(), candidate.toLowerCase())
		}))
		.filter(result => result.distance <= threshold)
		.sort((left, right) => left.distance - right.distance || left.candidate.localeCompare(right.candidate))
		.slice(0, limit)
		.map(result => result.candidate);
}

function findFrontmatterEnd(text: string): number | undefined {
	if (!/^---\r?\n/.test(text)) {
		return undefined;
	}
	const match = /^---[ \t]*$/gm;
	match.exec(text);
	const closing = match.exec(text);
	return closing?.index === undefined ? undefined : closing.index;
}

function findFencedCodeLines(text: string): Set<number> {
	const excluded = new Set<number>();
	const lines = text.split(/\r?\n/);
	let fence: { character: string; length: number } | undefined;
	for (let index = 0; index < lines.length; index++) {
		const match = /^\s*(`{3,}|~{3,})/.exec(lines[index]);
		if (!fence && match) {
			fence = { character: match[1][0], length: match[1].length };
			excluded.add(index);
			continue;
		}
		if (fence) {
			excluded.add(index);
			if (match?.[1][0] === fence.character && match[1].length >= fence.length) {
				fence = undefined;
			}
		}
	}
	return excluded;
}

function lineOffsets(text: string): number[] {
	const offsets = [0];
	for (let index = 0; index < text.length; index++) {
		if (text[index] === '\n') {
			offsets.push(index + 1);
		}
	}
	return offsets;
}

function isExcluded(offset: number, text: string, excludedLines: ReadonlySet<number>): boolean {
	let line = 0;
	for (let index = 0; index < offset; index++) {
		if (text[index] === '\n') {
			line++;
		}
	}
	return excludedLines.has(line);
}

function levenshteinDistance(left: string, right: string): number {
	const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
	for (let leftIndex = 1; leftIndex <= left.length; leftIndex++) {
		let diagonal = previous[0];
		previous[0] = leftIndex;
		for (let rightIndex = 1; rightIndex <= right.length; rightIndex++) {
			const above = previous[rightIndex];
			previous[rightIndex] = left[leftIndex - 1] === right[rightIndex - 1]
				? diagonal
				: Math.min(diagonal, above, previous[rightIndex - 1]) + 1;
			diagonal = above;
		}
	}
	return previous[right.length];
}
