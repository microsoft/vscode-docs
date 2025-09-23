/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { BasePromptElementProps, PromptElement, renderElementJSON } from '@vscode/prompt-tsx';
import { createLanguageModelToolResult } from './utils';
import path from 'path';
import { getCurrentMilestoneName } from './queries';

interface GetCurrentMilestoneNameResultSuccessProps extends BasePromptElementProps {
	readonly result: {
		milestoneName: string;
	};
}

interface GetCurrentMilestoneNameResultErrorProps extends BasePromptElementProps {
	readonly error: string;
}

type GetCurrentMilestoneNameResultProps = GetCurrentMilestoneNameResultSuccessProps | GetCurrentMilestoneNameResultErrorProps;

function isSuccess(props: GetCurrentMilestoneNameResultProps): props is GetCurrentMilestoneNameResultSuccessProps {
	return !!(props as GetCurrentMilestoneNameResultSuccessProps).result;
}

class GetCurrentMilestoneNameResult extends PromptElement<GetCurrentMilestoneNameResultProps> {

	render() {
		if (!isSuccess(this.props)) {
			return <>{this.props.error}</>;
		} else {
			return <>{JSON.stringify(this.props.result)}</>;
		}
	}
}

export class GetCurrentMilestoneName implements vscode.LanguageModelTool<void> {

	static readonly ID = 'getCurrentMilestone';

	constructor(
		private readonly logger: vscode.LogOutputChannel
	) {
	}

	async invoke(options: vscode.LanguageModelToolInvocationOptions<void>, token: vscode.CancellationToken) {
		const milestoneName = await getCurrentMilestoneName();
		if (!milestoneName) {
			return createLanguageModelToolResult(
				await renderElementJSON(GetCurrentMilestoneNameResult, { error: 'No milestone specified' }, options.tokenizationOptions, token),
			);
		}
		this.logger.debug('currentMilestone', milestoneName);
		return createLanguageModelToolResult(
			await renderElementJSON(GetCurrentMilestoneNameResult, { result: { milestoneName } }, options.tokenizationOptions, token),
		);
	}
}
