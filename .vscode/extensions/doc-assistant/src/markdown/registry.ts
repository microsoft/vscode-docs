/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as path from 'path';
import * as vscode from 'vscode';

export interface FeatureDefinition {
	id: string;
	label: string;
	state: 'experimental' | 'preview';
	trackingUrl?: string;
	source: vscode.Uri;
}

export interface VariableDefinition {
	path: string;
	value: string;
	source: vscode.Uri;
	line: number;
}

export interface RegistrySnapshot {
	features: ReadonlyMap<string, FeatureDefinition>;
	variables: ReadonlyMap<string, VariableDefinition>;
}

export class DocumentationRegistry implements vscode.Disposable {
	private readonly cache = new Map<string, Promise<RegistrySnapshot>>();
	private readonly watchers = new Map<string, vscode.FileSystemWatcher[]>();
	private readonly changeEmitter = new vscode.EventEmitter<vscode.WorkspaceFolder>();
	private readonly reportedErrors = new Map<string, string>();
	private readonly workspaceFolderListener: vscode.Disposable;

	readonly onDidChange = this.changeEmitter.event;

	constructor(private readonly logger: vscode.LogOutputChannel) {
		for (const folder of vscode.workspace.workspaceFolders ?? []) {
			this.watchFolder(folder);
		}
		this.workspaceFolderListener = vscode.workspace.onDidChangeWorkspaceFolders(event => {
			for (const folder of event.removed) {
				this.unwatchFolder(folder);
			}
			for (const folder of event.added) {
				this.watchFolder(folder);
			}
		});
	}

	async getSnapshot(uri: vscode.Uri): Promise<RegistrySnapshot> {
		const folder = vscode.workspace.getWorkspaceFolder(uri);
		if (!folder) {
			throw new Error('The document is not in a workspace folder.');
		}

		const key = folder.uri.toString();
		let snapshot = this.cache.get(key);
		if (!snapshot) {
			snapshot = this.load(folder).catch(error => {
				this.reportError(folder, error);
				throw error;
			});
			this.cache.set(key, snapshot);
		}
		return snapshot;
	}

	dispose(): void {
		for (const watchers of this.watchers.values()) {
			for (const watcher of watchers) {
				watcher.dispose();
			}
		}
		this.workspaceFolderListener.dispose();
		this.changeEmitter.dispose();
	}

	private watchFolder(folder: vscode.WorkspaceFolder): void {
		const key = folder.uri.toString();
		if (this.watchers.has(key)) {
			return;
		}
		const patterns = [
			new vscode.RelativePattern(folder, 'build/feature-lifecycle.json'),
			new vscode.RelativePattern(folder, 'data/variables/**/*.{yml,yaml}')
		];

		const watchers: vscode.FileSystemWatcher[] = [];
		for (const pattern of patterns) {
			const watcher = vscode.workspace.createFileSystemWatcher(pattern);
			watcher.onDidChange(() => this.invalidate(folder));
			watcher.onDidCreate(() => this.invalidate(folder));
			watcher.onDidDelete(() => this.invalidate(folder));
			watchers.push(watcher);
		}
		this.watchers.set(key, watchers);
	}

	private unwatchFolder(folder: vscode.WorkspaceFolder): void {
		const key = folder.uri.toString();
		for (const watcher of this.watchers.get(key) ?? []) {
			watcher.dispose();
		}
		this.watchers.delete(key);
		this.cache.delete(key);
		this.reportedErrors.delete(key);
	}

	private invalidate(folder: vscode.WorkspaceFolder): void {
		this.cache.delete(folder.uri.toString());
		this.reportedErrors.delete(folder.uri.toString());
		this.changeEmitter.fire(folder);
	}

	private async load(folder: vscode.WorkspaceFolder): Promise<RegistrySnapshot> {
		const [features, variables] = await Promise.all([
			loadFeatures(folder),
			loadVariables(folder)
		]);
		this.reportedErrors.delete(folder.uri.toString());
		return { features, variables };
	}

	private reportError(folder: vscode.WorkspaceFolder, error: unknown): void {
		const message = error instanceof Error ? error.message : String(error);
		const key = folder.uri.toString();
		if (this.reportedErrors.get(key) === message) {
			return;
		}
		this.reportedErrors.set(key, message);
		this.logger.error(`Unable to load Markdown authoring registries for ${folder.name}: ${message}`);
	}
}

async function loadFeatures(folder: vscode.WorkspaceFolder): Promise<ReadonlyMap<string, FeatureDefinition>> {
	const source = vscode.Uri.joinPath(folder.uri, 'build', 'feature-lifecycle.json');
	const contents = await readRequiredFile(source, 'feature lifecycle registry');
	let parsed: unknown;
	try {
		parsed = JSON.parse(contents);
	} catch (error) {
		throw new Error(`Invalid JSON in ${source.fsPath}: ${error instanceof Error ? error.message : String(error)}`);
	}

	if (!isRecord(parsed) || !isRecord(parsed.features)) {
		throw new Error(`${source.fsPath} must contain a "features" object.`);
	}
	if (Object.keys(parsed).some(key => key !== '$schema' && key !== 'features') ||
		(parsed.$schema !== undefined && typeof parsed.$schema !== 'string')) {
		throw new Error(`${source.fsPath} contains an unsupported top-level property.`);
	}

	const features = new Map<string, FeatureDefinition>();
	for (const [id, value] of Object.entries(parsed.features)) {
		if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || !isRecord(value)) {
			throw new Error(`Invalid feature entry "${id}" in ${source.fsPath}.`);
		}
		const { label, state, trackingUrl } = value;
		if (Object.keys(value).some(key => key !== 'label' && key !== 'state' && key !== 'trackingUrl')) {
			throw new Error(`Feature "${id}" in ${source.fsPath} contains an unsupported property.`);
		}
		if (typeof label !== 'string' || label.length === 0 || (state !== 'experimental' && state !== 'preview')) {
			throw new Error(`Feature "${id}" in ${source.fsPath} must have a label and a valid state.`);
		}
		if (trackingUrl !== undefined && (typeof trackingUrl !== 'string' || !isHttpsUrl(trackingUrl))) {
			throw new Error(`Feature "${id}" in ${source.fsPath} has an invalid trackingUrl.`);
		}
		features.set(id, { id, label, state, trackingUrl, source });
	}
	return features;
}

async function loadVariables(folder: vscode.WorkspaceFolder): Promise<ReadonlyMap<string, VariableDefinition>> {
	const pattern = new vscode.RelativePattern(folder, 'data/variables/**/*.{yml,yaml}');
	const sources = (await vscode.workspace.findFiles(pattern)).sort((left, right) => left.path.localeCompare(right.path));
	if (sources.length === 0) {
		throw new Error(`No reusable variable files were found under ${vscode.Uri.joinPath(folder.uri, 'data', 'variables').fsPath}.`);
	}

	const variables = new Map<string, VariableDefinition>();
	for (const source of sources) {
		const contents = await readRequiredFile(source, 'reusable variable file');
		const relativePath = path.relative(vscode.Uri.joinPath(folder.uri, 'data', 'variables').fsPath, source.fsPath);
		const group = relativePath.replace(/\.(?:ya?ml)$/i, '').split(path.sep).join('.');
		for (const entry of parseVariableFile(contents, source.fsPath)) {
			const variablePath = `variables.${group}.${entry.key}`;
			const previous = variables.get(variablePath);
			if (previous) {
				throw new Error(`Duplicate reusable variable "${variablePath}" in ${previous.source.fsPath} and ${source.fsPath}.`);
			}
			variables.set(variablePath, {
				path: variablePath,
				value: entry.value,
				source,
				line: entry.line
			});
		}
	}
	return variables;
}

interface ParsedVariable {
	key: string;
	value: string;
	line: number;
}

export function parseVariableFile(contents: string, sourceName: string): ParsedVariable[] {
	const entries: ParsedVariable[] = [];
	const keys = new Set<string>();
	const lines = contents.split(/\r?\n/);
	for (let index = 0; index < lines.length; index++) {
		const line = lines[index];
		const lineNumber = index + 1;
		if (line.trim().length === 0) {
			continue;
		}
		if (/^\s/.test(line)) {
			throw variableError(sourceName, lineNumber, 'Indented mappings are not supported.');
		}
		if (line.startsWith('#')) {
			continue;
		}

		const separator = line.indexOf(':');
		if (separator <= 0) {
			throw variableError(sourceName, lineNumber, 'Expected a flat "key: value" entry.');
		}

		const key = line.slice(0, separator).trim();
		if (!key) {
			throw variableError(sourceName, lineNumber, 'Variable keys cannot be empty.');
		}
		if (keys.has(key)) {
			throw variableError(sourceName, lineNumber, `Duplicate variable key "${key}".`);
		}

		const value = parseVariableValue(line.slice(separator + 1), sourceName, lineNumber);
		keys.add(key);
		entries.push({ key, value, line: lineNumber });
	}
	return entries;
}

function parseVariableValue(input: string, sourceName: string, line: number): string {
	const trimmedStart = input.trimStart();
	if (!trimmedStart) {
		throw variableError(sourceName, line, 'Variable values cannot be empty.');
	}

	if (trimmedStart.startsWith('\'')) {
		let value = '';
		for (let index = 1; index < trimmedStart.length; index++) {
			const character = trimmedStart[index];
			if (character === '\'') {
				if (trimmedStart[index + 1] === '\'') {
					value += '\'';
					index++;
					continue;
				}
				assertOnlyComment(trimmedStart.slice(index + 1), sourceName, line);
				return value;
			}
			value += character;
		}
		throw variableError(sourceName, line, 'Unterminated single-quoted value.');
	}

	if (trimmedStart.startsWith('"')) {
		let value = '';
		for (let index = 1; index < trimmedStart.length; index++) {
			const character = trimmedStart[index];
			if (character === '"') {
				assertOnlyComment(trimmedStart.slice(index + 1), sourceName, line);
				return value;
			}
			if (character === '\\') {
				const escape = trimmedStart[++index];
				const replacements: Record<string, string> = { '"': '"', '\\': '\\', n: '\n', t: '\t' };
				if (escape === undefined || replacements[escape] === undefined) {
					throw variableError(sourceName, line, `Unsupported escape sequence "\\${escape ?? ''}".`);
				}
				value += replacements[escape];
				continue;
			}
			value += character;
		}
		throw variableError(sourceName, line, 'Unterminated double-quoted value.');
	}

	const comment = input.indexOf('#');
	const rawValue = (comment >= 0 ? input.slice(0, comment) : input).trim();
	if (!rawValue) {
		throw variableError(sourceName, line, 'Variable values cannot be empty.');
	}
	if (/[:[\]{}]/.test(rawValue) || /(^|\s)[&*][^\s]+/.test(rawValue)) {
		throw variableError(sourceName, line, 'Quote values that contain YAML collections, anchors, aliases, or colons.');
	}
	return rawValue;
}

function assertOnlyComment(remainder: string, sourceName: string, line: number): void {
	const trimmed = remainder.trim();
	if (trimmed && !trimmed.startsWith('#')) {
		throw variableError(sourceName, line, 'Unexpected content after the quoted value.');
	}
}

function variableError(sourceName: string, line: number, message: string): Error {
	return new Error(`${sourceName}:${line}: ${message}`);
}

async function readRequiredFile(uri: vscode.Uri, description: string): Promise<string> {
	try {
		return new TextDecoder().decode(await vscode.workspace.fs.readFile(uri));
	} catch (error) {
		throw new Error(`Unable to read ${description} at ${uri.fsPath}: ${error instanceof Error ? error.message : String(error)}`);
	}
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isHttpsUrl(value: string): boolean {
	try {
		const url = new URL(value);
		return url.protocol === 'https:' && url.hostname.length > 0;
	} catch {
		return false;
	}
}
