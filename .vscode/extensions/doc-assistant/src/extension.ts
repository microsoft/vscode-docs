/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { GetReleaseFeatures } from './tools/getReleaseIssues';
import { GetCurrentMilestoneName } from './tools/getCurrentMilestone';

export function activate(context: vscode.ExtensionContext) {
    const logger = vscode.window.createOutputChannel('VS Code Doc Writer', { log: true });
    context.subscriptions.push(vscode.lm.registerTool(GetReleaseFeatures.ID, new GetReleaseFeatures(logger)));
    context.subscriptions.push(vscode.lm.registerTool(GetCurrentMilestoneName.ID, new GetCurrentMilestoneName(logger)));
}

export function deactivate() {
    // Clean up resources if necessary
}
