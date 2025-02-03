/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import createChatParticipant from './docParticipant';
import { GetReleaseFeatures } from './tools/getReleaseIssues';

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
