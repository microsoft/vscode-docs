/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { PromptElementJSON } from '@vscode/prompt-tsx/dist/base/jsonTypes';

export function createLanguageModelToolResult(tsx: PromptElementJSON): vscode.LanguageModelToolResult {
	return new vscode.LanguageModelToolResult([
		new vscode.LanguageModelPromptTsxPart(tsx)
	]);
}

function isTsxContent(content: vscode.LanguageModelTextPart | vscode.LanguageModelPromptTsxPart | unknown): content is vscode.LanguageModelPromptTsxPart {
	return content instanceof vscode.LanguageModelPromptTsxPart;
}

export function getTsxDataFromToolsResult(result: vscode.LanguageModelToolResult): PromptElementJSON | undefined {
	const tsxContents = result.content.filter(isTsxContent);
	if (tsxContents.length > 0) {
		return tsxContents[0].value as PromptElementJSON;
	}
	return undefined;
}