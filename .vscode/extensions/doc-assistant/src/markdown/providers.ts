/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { DocumentationRegistry, FeatureDefinition, RegistrySnapshot, VariableDefinition } from './registry';
import { findDocumentationReferences, isPublishedDocument, rankCandidates } from './references';

const selector: vscode.DocumentSelector = { language: 'markdown' };
const diagnosticSource = 'VS Code docs';

export function registerMarkdownAuthoringSupport(context: vscode.ExtensionContext, logger: vscode.LogOutputChannel): void {
	context.subscriptions.push(new MarkdownAuthoringSupport(logger));
}

class MarkdownAuthoringSupport implements vscode.Disposable {
	private readonly registry: DocumentationRegistry;
	private readonly diagnostics = vscode.languages.createDiagnosticCollection('vscode-docs-markdown');
	private readonly disposables: vscode.Disposable[] = [];
	private readonly validationVersions = new Map<string, number>();

	constructor(logger: vscode.LogOutputChannel) {
		this.registry = new DocumentationRegistry(logger);
		const completionProvider = new DocumentationCompletionProvider(this.registry);
		const hoverProvider = new DocumentationHoverProvider(this.registry);
		const codeActionProvider = new DocumentationCodeActionProvider(this.registry);

		this.disposables.push(
			this.registry,
			this.diagnostics,
			vscode.languages.registerCompletionItemProvider(selector, completionProvider, '(', '.', ':'),
			vscode.languages.registerHoverProvider(selector, hoverProvider),
			vscode.languages.registerCodeActionsProvider(selector, codeActionProvider, {
				providedCodeActionKinds: DocumentationCodeActionProvider.providedCodeActionKinds
			}),
			vscode.workspace.onDidOpenTextDocument(document => this.queueValidation(document)),
			vscode.workspace.onDidChangeTextDocument(event => this.queueValidation(event.document)),
			vscode.workspace.onDidCloseTextDocument(document => {
				this.validationVersions.delete(document.uri.toString());
				this.diagnostics.delete(document.uri);
			}),
			this.registry.onDidChange(folder => {
				for (const document of vscode.workspace.textDocuments) {
					if (vscode.workspace.getWorkspaceFolder(document.uri)?.uri.toString() === folder.uri.toString()) {
						this.queueValidation(document);
					}
				}
			})
		);

		for (const document of vscode.workspace.textDocuments) {
			this.queueValidation(document);
		}
	}

	dispose(): void {
		for (const disposable of this.disposables) {
			disposable.dispose();
		}
	}

	private queueValidation(document: vscode.TextDocument): void {
		if (document.languageId !== 'markdown' || !isPublishedDocument(document.uri)) {
			this.diagnostics.delete(document.uri);
			return;
		}
		void this.validate(document);
	}

	private async validate(document: vscode.TextDocument): Promise<void> {
		const key = document.uri.toString();
		const version = (this.validationVersions.get(key) ?? 0) + 1;
		this.validationVersions.set(key, version);

		let snapshot: RegistrySnapshot;
		try {
			snapshot = await this.registry.getSnapshot(document.uri);
		} catch (error) {
			if (this.validationVersions.get(key) === version) {
				this.diagnostics.set(document.uri, [registryDiagnostic(document, error)]);
			}
			return;
		}
		if (this.validationVersions.get(key) !== version) {
			return;
		}

		const parsed = findDocumentationReferences(document.getText());
		const diagnostics: vscode.Diagnostic[] = [];
		for (const reference of parsed.references) {
			const range = offsetsToRange(document, reference.start, reference.end);
			if (reference.kind === 'variable') {
				if (!snapshot.variables.has(reference.value)) {
					diagnostics.push(createDiagnostic(
						range,
						reference.value
							? `Unknown reusable variable "${reference.value}".`
							: 'A reusable variable path is required.',
						vscode.DiagnosticSeverity.Error,
						'unknown-variable'
					));
				}
			} else if (!snapshot.features.has(reference.value)) {
				diagnostics.push(createDiagnostic(
					range,
					reference.value
						? `Unknown feature lifecycle ID "${reference.value}".`
						: 'A feature lifecycle ID is required.',
					vscode.DiagnosticSeverity.Warning,
					'unknown-feature'
				));
			}
		}
		for (const reference of parsed.incomplete) {
			const position = document.positionAt(reference.offset);
			diagnostics.push(createDiagnostic(
				new vscode.Range(position, position),
				reference.kind === 'feature'
					? 'Feature lifecycle marker is missing a closing parenthesis.'
					: 'Reusable variable directive is missing a closing "%}".',
				vscode.DiagnosticSeverity.Warning,
				reference.kind === 'feature' ? 'incomplete-feature' : 'incomplete-variable'
			));
		}
		this.diagnostics.set(document.uri, diagnostics);
	}
}

class DocumentationCompletionProvider implements vscode.CompletionItemProvider {
	constructor(private readonly registry: DocumentationRegistry) { }

	async provideCompletionItems(
		document: vscode.TextDocument,
		position: vscode.Position
	): Promise<vscode.CompletionItem[] | undefined> {
		const context = completionContext(document, position);
		if (!context) {
			return undefined;
		}

		let snapshot: RegistrySnapshot;
		try {
			snapshot = await this.registry.getSnapshot(document.uri);
		} catch {
			return undefined;
		}

		if (context.kind === 'variable') {
			return [...snapshot.variables.values()]
				.sort((left, right) => left.path.localeCompare(right.path))
				.map(definition => variableCompletion(definition, context.range));
		}
		return [...snapshot.features.values()]
			.sort((left, right) => left.id.localeCompare(right.id))
			.map(definition => featureCompletion(definition, context.range));
	}
}

class DocumentationHoverProvider implements vscode.HoverProvider {
	constructor(private readonly registry: DocumentationRegistry) { }

	async provideHover(document: vscode.TextDocument, position: vscode.Position): Promise<vscode.Hover | undefined> {
		const offset = document.offsetAt(position);
		const reference = findDocumentationReferences(document.getText()).references
			.find(candidate => candidate.start <= offset && offset < candidate.end);
		if (!reference) {
			return undefined;
		}

		let snapshot: RegistrySnapshot;
		try {
			snapshot = await this.registry.getSnapshot(document.uri);
		} catch {
			return undefined;
		}

		const contents = reference.kind === 'variable'
			? variableHover(snapshot.variables.get(reference.value))
			: featureHover(snapshot.features.get(reference.value));
		if (!contents) {
			return undefined;
		}
		return new vscode.Hover(contents, offsetsToRange(document, reference.start, reference.end));
	}
}

class DocumentationCodeActionProvider implements vscode.CodeActionProvider {
	static readonly providedCodeActionKinds = [vscode.CodeActionKind.QuickFix];

	constructor(private readonly registry: DocumentationRegistry) { }

	async provideCodeActions(
		document: vscode.TextDocument,
		_range: vscode.Range,
		context: vscode.CodeActionContext
	): Promise<vscode.CodeAction[]> {
		const actions: vscode.CodeAction[] = [];
		const incompleteDiagnostics = context.diagnostics.filter(diagnostic =>
			diagnostic.source === diagnosticSource && (
				diagnostic.code === 'incomplete-feature' ||
				diagnostic.code === 'incomplete-variable'
			)
		);
		for (const diagnostic of incompleteDiagnostics) {
			const suffix = diagnostic.code === 'incomplete-feature' ? ')' : ' %}';
			const action = new vscode.CodeAction(`Insert "${suffix}"`, vscode.CodeActionKind.QuickFix);
			action.diagnostics = [diagnostic];
			action.isPreferred = true;
			action.edit = new vscode.WorkspaceEdit();
			action.edit.insert(document.uri, diagnostic.range.start, suffix);
			actions.push(action);
		}

		const unknownDiagnostics = context.diagnostics.filter(diagnostic =>
			diagnostic.source === diagnosticSource && (
				diagnostic.code === 'unknown-feature' ||
				diagnostic.code === 'unknown-variable'
			)
		);
		if (unknownDiagnostics.length === 0) {
			return actions;
		}

		let snapshot: RegistrySnapshot;
		try {
			snapshot = await this.registry.getSnapshot(document.uri);
		} catch {
			return actions;
		}

		for (const diagnostic of unknownDiagnostics) {
			const value = document.getText(diagnostic.range);
			const candidates = diagnostic.code === 'unknown-feature'
				? snapshot.features.keys()
				: snapshot.variables.keys();
			for (const [index, candidate] of rankCandidates(value, candidates).entries()) {
				const action = new vscode.CodeAction(`Replace with "${candidate}"`, vscode.CodeActionKind.QuickFix);
				action.diagnostics = [diagnostic];
				action.isPreferred = index === 0;
				action.edit = new vscode.WorkspaceEdit();
				action.edit.replace(document.uri, diagnostic.range, candidate);
				actions.push(action);
			}
		}
		return actions;
	}
}

interface CompletionContext {
	kind: 'feature' | 'variable';
	range: vscode.Range;
}

function completionContext(document: vscode.TextDocument, position: vscode.Position): CompletionContext | undefined {
	const linePrefix = document.lineAt(position.line).text.slice(0, position.character);
	const variable = /\{%\s*data\s+variables\.([^%}]*)$/.exec(linePrefix);
	if (variable) {
		return {
			kind: 'variable',
			range: new vscode.Range(position.translate(0, -variable[1].length), position)
		};
	}

	const feature = /feature\(([^)]*)$/.exec(linePrefix);
	if (feature) {
		return {
			kind: 'feature',
			range: new vscode.Range(position.translate(0, -feature[1].length), position)
		};
	}

	if (isInFrontmatter(document, position.line)) {
		const status = /^\s*FeatureStatus:\s*([^\s#]*)$/.exec(linePrefix);
		if (status) {
			return {
				kind: 'feature',
				range: new vscode.Range(position.translate(0, -status[1].length), position)
			};
		}
	}
	return undefined;
}

function isInFrontmatter(document: vscode.TextDocument, line: number): boolean {
	if (document.lineCount === 0 || document.lineAt(0).text.trim() !== '---') {
		return false;
	}
	for (let current = 1; current <= line; current++) {
		if (document.lineAt(current).text.trim() === '---') {
			return false;
		}
	}
	return true;
}

function featureCompletion(definition: FeatureDefinition, range: vscode.Range): vscode.CompletionItem {
	const item = new vscode.CompletionItem(definition.id, vscode.CompletionItemKind.EnumMember);
	item.detail = `${definition.label} (${capitalize(definition.state)})`;
	item.documentation = definition.trackingUrl
		? new vscode.MarkdownString(`[Open tracking issue](${definition.trackingUrl})`)
		: undefined;
	item.range = range;
	return item;
}

function variableCompletion(definition: VariableDefinition, range: vscode.Range): vscode.CompletionItem {
	const suffix = definition.path.slice('variables.'.length);
	const item = new vscode.CompletionItem(definition.path, vscode.CompletionItemKind.Variable);
	item.filterText = suffix;
	item.insertText = suffix;
	item.detail = definition.value;
	item.documentation = `Defined in ${vscode.workspace.asRelativePath(definition.source, false)}:${definition.line}`;
	item.range = range;
	return item;
}

function featureHover(definition: FeatureDefinition | undefined): vscode.MarkdownString | undefined {
	if (!definition) {
		return undefined;
	}
	const contents = new vscode.MarkdownString();
	contents.appendText(definition.label);
	contents.appendMarkdown(`\n\nLifecycle: **${capitalize(definition.state)}**`);
	contents.appendMarkdown(`\n\nID: \`${definition.id}\``);
	if (definition.trackingUrl) {
		contents.appendMarkdown(`\n\n[Open tracking issue](${definition.trackingUrl})`);
	}
	return contents;
}

function variableHover(definition: VariableDefinition | undefined): vscode.MarkdownString | undefined {
	if (!definition) {
		return undefined;
	}
	const contents = new vscode.MarkdownString();
	contents.appendMarkdown('Resolves to:\n\n');
	contents.appendCodeblock(definition.value);
	contents.appendMarkdown(`\nDefined in \`${vscode.workspace.asRelativePath(definition.source, false)}:${definition.line}\``);
	return contents;
}

function createDiagnostic(
	range: vscode.Range,
	message: string,
	severity: vscode.DiagnosticSeverity,
	code: string
): vscode.Diagnostic {
	const diagnostic = new vscode.Diagnostic(range, message, severity);
	diagnostic.source = diagnosticSource;
	diagnostic.code = code;
	return diagnostic;
}

function registryDiagnostic(document: vscode.TextDocument, error: unknown): vscode.Diagnostic {
	const start = new vscode.Position(0, 0);
	const end = document.lineCount > 0 && document.lineAt(0).text.length > 0
		? new vscode.Position(0, 1)
		: start;
	return createDiagnostic(
		new vscode.Range(start, end),
		`Unable to load documentation registries: ${error instanceof Error ? error.message : String(error)}`,
		vscode.DiagnosticSeverity.Error,
		'registry-error'
	);
}

function offsetsToRange(document: vscode.TextDocument, start: number, end: number): vscode.Range {
	return new vscode.Range(document.positionAt(start), document.positionAt(end));
}

function capitalize(value: string): string {
	return value.charAt(0).toUpperCase() + value.slice(1);
}
