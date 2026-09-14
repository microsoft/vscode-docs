/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { validateReleaseNoteToc } from '../../../../build/release-note-toc';

const RELEASE_NOTE_PATH_PATTERN = /\/release-notes\/v1_\d+\.md$/i;

function isReleaseNote(document: vscode.TextDocument): boolean {
    return document.languageId === 'markdown'
        && document.uri.scheme === 'file'
        && RELEASE_NOTE_PATH_PATTERN.test(document.uri.path);
}

export function registerReleaseNoteTocDiagnostics(context: vscode.ExtensionContext): void {
    const collection = vscode.languages.createDiagnosticCollection('release-note-toc');

    const updateDiagnostics = (document: vscode.TextDocument): void => {
        if (!isReleaseNote(document)) {
            collection.delete(document.uri);
            return;
        }

        const diagnostics = validateReleaseNoteToc(document.getText()).map(issue => {
            const line = document.lineAt(issue.line);
            const startCharacter = Math.min(issue.startCharacter, line.text.length);
            const endCharacter = Math.max(
                startCharacter,
                Math.min(issue.endCharacter, line.text.length)
            );
            const range = new vscode.Range(
                issue.line,
                startCharacter,
                issue.line,
                endCharacter
            );
            const diagnostic = new vscode.Diagnostic(
                range,
                issue.message,
                vscode.DiagnosticSeverity.Error
            );
            diagnostic.code = issue.code;
            diagnostic.source = 'Release note ToC';
            return diagnostic;
        });

        collection.set(document.uri, diagnostics);
    };

    context.subscriptions.push(
        collection,
        vscode.workspace.onDidOpenTextDocument(updateDiagnostics),
        vscode.workspace.onDidChangeTextDocument(event => updateDiagnostics(event.document)),
        vscode.workspace.onDidCloseTextDocument(document => collection.delete(document.uri))
    );

    for (const document of vscode.workspace.textDocuments) {
        updateDiagnostics(document);
    }
}
