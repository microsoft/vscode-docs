/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import * as vscode from 'vscode';
import { DocumentationRegistry, parseVariableFile } from '../markdown/registry';
import { findDocumentationReferences, isPublishedRelativePath, rankCandidates } from '../markdown/references';

suite('Markdown authoring support', function () {
	this.timeout(30_000);

	test('parses the supported reusable variable syntax', () => {
		const variables = parseVariableFile([
			'# Product names',
			'plain: Visual Studio Code',
			'single: \'Copilot Pro+\'',
			'escaped: "Line one\\nLine two"',
			'quote: \'Copilot\'\'s feature\' # Comment'
		].join('\n'), 'variables.yml');

		assert.deepStrictEqual(variables, [
			{ key: 'plain', value: 'Visual Studio Code', line: 2 },
			{ key: 'single', value: 'Copilot Pro+', line: 3 },
			{ key: 'escaped', value: 'Line one\nLine two', line: 4 },
			{ key: 'quote', value: 'Copilot\'s feature', line: 5 }
		]);
	});

	test('rejects unsupported reusable variable syntax', () => {
		assert.throws(
			() => parseVariableFile('group:\n  child: value', 'variables.yml'),
			/Variable values cannot be empty/
		);
		assert.throws(
			() => parseVariableFile('value: unquoted: colon', 'variables.yml'),
			/Quote values/
		);
		assert.throws(
			() => parseVariableFile('  # Indented comment', 'variables.yml'),
			/Indented mappings/
		);
	});

	test('finds supported references and ignores fenced examples', () => {
		const text = [
			'---',
			'FeatureStatus: agent-artifacts',
			'---',
			'',
			'Use `feature(rubber-duck)` with {% data variables.product.prodname_vscode %}.',
			'',
			'````md',
			'```',
			'feature(not-real)',
			'{% data variables.fake.value %}',
			'````'
		].join('\n');

		const parsed = findDocumentationReferences(text);
		assert.deepStrictEqual(
			parsed.references.map(reference => [reference.kind, reference.value]),
			[
				['feature', 'rubber-duck'],
				['variable', 'variables.product.prodname_vscode'],
				['featureStatus', 'agent-artifacts']
			]
		);
		assert.deepStrictEqual(parsed.incomplete, []);
	});

	test('finds safely repairable incomplete references', () => {
		const text = [
			'Use `feature(agent-artifacts`',
			'Use {% data variables.product.prodname_vscode'
		].join('\n');
		const parsed = findDocumentationReferences(text);

		assert.deepStrictEqual(parsed.incomplete.map(reference => [reference.kind, reference.suffix]), [
			['feature', ')'],
			['variable', ' %}']
		]);
		assert.strictEqual(text[parsed.incomplete[0].offset], '`');
	});

	test('ranks only close typo candidates', () => {
		assert.deepStrictEqual(
			rankCandidates('agent-artifcts', ['rubber-duck', 'agent-artifacts', 'agent-host-byok-models']),
			['agent-artifacts']
		);
	});

	test('limits diagnostics to published content folders', () => {
		assert.strictEqual(isPublishedRelativePath('docs/agents/overview.md'), true);
		assert.strictEqual(isPublishedRelativePath('release-notes/v1_100.md'), true);
		assert.strictEqual(isPublishedRelativePath('CONTRIBUTING.md'), false);
		assert.strictEqual(isPublishedRelativePath('data/variables/README.md'), false);
	});

	test('loads repository registries and resolves published references', async () => {
		const folder = vscode.workspace.workspaceFolders?.[0];
		assert.ok(folder, 'Expected the documentation repository test workspace.');

		const logger = vscode.window.createOutputChannel('VS Code Doc Writer Tests', { log: true });
		const registry = new DocumentationRegistry(logger);
		try {
			const snapshot = await registry.getSnapshot(vscode.Uri.joinPath(folder.uri, 'docs', 'getstarted', 'overview.md'));
			assert.strictEqual(snapshot.features.get('agent-artifacts')?.state, 'preview');
			assert.strictEqual(snapshot.variables.get('variables.product.prodname_vscode')?.value, 'Visual Studio Code');

			const markdownFiles = await vscode.workspace.findFiles(
				new vscode.RelativePattern(folder, '{docs,api,remote,release-notes,blogs}/**/*.md')
			);
			const unresolved = (await Promise.all(markdownFiles.map(async uri => {
				const text = new TextDecoder().decode(await vscode.workspace.fs.readFile(uri));
				const fileReferences: string[] = [];
				for (const reference of findDocumentationReferences(text).references) {
					const found = reference.kind === 'variable'
						? snapshot.variables.has(reference.value)
						: snapshot.features.has(reference.value);
					if (!found) {
						fileReferences.push(`${vscode.workspace.asRelativePath(uri, false)}: ${reference.value}`);
					}
				}
				return fileReferences;
			}))).flat();
			assert.deepStrictEqual(unresolved, []);
		} finally {
			registry.dispose();
			logger.dispose();
		}
	});

	test('provides completions, hovers, diagnostics, and quick fixes', async () => {
		const folder = vscode.workspace.workspaceFolders?.[0];
		assert.ok(folder, 'Expected the documentation repository test workspace.');
		const extension = vscode.extensions.getExtension('ms-vscode.vscode-doc-assistant');
		assert.ok(extension, 'Expected the development extension.');
		await extension.activate();

		const contents = [
			'---',
			'FeatureStatus: agent-artifcts',
			'---',
			'',
			'Complete feature: `feature(`',
			'Known feature: `feature(agent-artifacts)`',
			'Complete variable: {% data variables. %}',
			'Known variable: {% data variables.product.prodname_vscode %}'
		].join('\n');
		const uri = vscode.Uri.joinPath(folder.uri, 'docs', `.doc-assistant-test-${Date.now()}.md`);
		await vscode.workspace.fs.writeFile(uri, new TextEncoder().encode(contents));
		try {
			const document = await vscode.workspace.openTextDocument(uri);
			await vscode.window.showTextDocument(document, { preview: true });

			const featurePosition = document.positionAt(contents.indexOf('Complete feature: `feature(') + 'Complete feature: `feature('.length);
			const featureCompletions = await vscode.commands.executeCommand<vscode.CompletionList>(
				'vscode.executeCompletionItemProvider',
				uri,
				featurePosition
			);
			assert.ok(featureCompletions.items.some(item => completionLabel(item) === 'agent-artifacts'));

			const variablePosition = document.positionAt(contents.indexOf('Complete variable: {% data variables.') + 'Complete variable: {% data variables.'.length);
			const variableCompletions = await vscode.commands.executeCommand<vscode.CompletionList>(
				'vscode.executeCompletionItemProvider',
				uri,
				variablePosition
			);
			assert.ok(variableCompletions.items.some(item => completionLabel(item) === 'variables.product.prodname_vscode'));

			const hoverPosition = document.positionAt(contents.lastIndexOf('prodname_vscode') + 2);
			const hovers = await vscode.commands.executeCommand<vscode.Hover[]>('vscode.executeHoverProvider', uri, hoverPosition);
			assert.ok(hovers.length > 0);

			const diagnostics = await waitForDiagnostics(uri, diagnostic =>
				diagnostic.code === 'unknown-feature'
			);
			const unknownFeature = diagnostics.find(diagnostic => diagnostic.code === 'unknown-feature');
			assert.ok(unknownFeature);

			const actions = await vscode.commands.executeCommand<(vscode.CodeAction | vscode.Command)[]>(
				'vscode.executeCodeActionProvider',
				uri,
				unknownFeature.range,
				vscode.CodeActionKind.QuickFix.value
			);
			assert.ok(actions.some(action => action.title === 'Replace with "agent-artifacts"'));
		} finally {
			await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
			await vscode.workspace.fs.delete(uri);
		}
	});
});

function completionLabel(item: vscode.CompletionItem): string {
	return typeof item.label === 'string' ? item.label : item.label.label;
}

async function waitForDiagnostics(
	uri: vscode.Uri,
	predicate: (diagnostic: vscode.Diagnostic) => boolean
): Promise<readonly vscode.Diagnostic[]> {
	for (let attempt = 0; attempt < 50; attempt++) {
		const diagnostics = vscode.languages.getDiagnostics(uri);
		if (diagnostics.some(predicate)) {
			return diagnostics;
		}
		await new Promise(resolve => setTimeout(resolve, 100));
	}
	return vscode.languages.getDiagnostics(uri);
}
