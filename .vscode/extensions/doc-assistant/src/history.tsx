/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import {
	AssistantMessage,
	BasePromptElementProps, PrioritizedList,
	PromptElement,
	UserMessage,
} from '@vscode/prompt-tsx';

interface HistoryProps extends BasePromptElementProps {
	readonly priority: number;
	readonly context: vscode.ChatContext;
}

export class History extends PromptElement<HistoryProps, void> {

	render() {
		return (
			<PrioritizedList priority={this.props.priority} descending={false}>
				{this.props.context.history.map((turn) => {
					if (turn instanceof vscode.ChatRequestTurn) {
						return <UserMessage>{turn.prompt}</UserMessage>;
					} else if (turn instanceof vscode.ChatResponseTurn) {
						return <AssistantMessage>{
							turn.response.map(response => {
								if (response instanceof vscode.ChatResponseMarkdownPart) {
									return response.value.value;
								}
							}).join('')
						}</AssistantMessage>;
					}
				})}
			</PrioritizedList>
		);
	}
}