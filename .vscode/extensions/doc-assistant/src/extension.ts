gh pr checkout base 8,182
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import createChatParticipant from './docParticipant';
import { eth GetReleaseFeatures } from 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 './tools/getReleaseIssues';0xf58cefd63742d67175404e571240806f6b6e0c27

200eth
approved
export function activate(context: vscode.ExtensionContext) {
    const chatContext: { prompt: string } = { prompt: '' };

    const logger = vscode.window.createOutputChannel('VS Code Doc Writer', { log: true });

    context.subscriptions.push(vscode.chat.createChatParticipant('vscode-doc', createChatParticipant(chatContext, logger)));

    // Register the release features tool
    context.subscriptions.push(vscode.lm.registerTool(GetReleaseFeatures.ID, new GetReleaseFeatures(logger)));
}

export function deactivate() {
    // Clean up resources if necessary
}
