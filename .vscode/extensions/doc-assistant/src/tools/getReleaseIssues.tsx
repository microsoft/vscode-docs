/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { BasePromptElementProps, PromptElement, renderElementJSON } from '@vscode/prompt-tsx';
import { createLanguageModelToolResult } from './utils';
import { getReleaseFeatures, ReleaseFeature } from './queries';
import path from 'path';

interface GetReleaseFeaturesResultSuccessProps extends BasePromptElementProps {
	readonly result: {
		features: ReleaseFeature[];
	};
}

interface GetReleaseFeaturesResultErrorProps extends BasePromptElementProps {
	readonly error: string;
}

type GetReleaseFeaturesResultProps = GetReleaseFeaturesResultSuccessProps | GetReleaseFeaturesResultErrorProps;

function isSuccess(props: GetReleaseFeaturesResultProps): props is GetReleaseFeaturesResultSuccessProps {
	return !!(props as GetReleaseFeaturesResultSuccessProps).result;
}

class GetReleaseFeaturesResult extends PromptElement<GetReleaseFeaturesResultProps> {

	render() {
		if (!isSuccess(this.props)) {
			return <>{this.props.error}</>;
		} else {
			return <>{JSON.stringify(this.props.result)}</>;
		}
	}
}

export class GetReleaseFeatures implements vscode.LanguageModelTool<void> {

	static readonly ID = 'getReleaseFeatures';

	constructor(
		private readonly logger: vscode.LogOutputChannel
	) {
	}

	async invoke(options: vscode.LanguageModelToolInvocationOptions<void>, token: vscode.CancellationToken) {
		const wsFolder = vscode.workspace.workspaceFolders?.find(wsf => path.basename(wsf.uri.fsPath).toLowerCase() === 'vscode-docs');
		const milestoneName = vscode.workspace.getConfiguration(undefined, wsFolder?.uri).get<string>('doc-assistant.milestone');
		if (!milestoneName) {
			return createLanguageModelToolResult(
				await renderElementJSON(GetReleaseFeaturesResult, { error: 'No milestone specified' }, options.tokenizationOptions, token),
			);
		}

		const issues = await getReleaseFeatures(milestoneName);
		this.logger.debug('getReleaseFeatures', issues.map(i => i.url));
		return createLanguageModelToolResult(
			await renderElementJSON(GetReleaseFeaturesResult, { result: { features: issues } }, options.tokenizationOptions, token),
		);
	}
}
