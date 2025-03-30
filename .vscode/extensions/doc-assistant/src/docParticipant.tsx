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
	renderPrompt
} from '@vscode/prompt-tsx';
import { GenerateReleaseNotesPrompt } from './generateReleaseNotes';
import { ToolCallRound, ToolResultMetadata } from './tools/tools';


interface HistoryProps extends BasePromptElementProps {
	readonly priority: number;
	readonly context: vscode.ChatContext;
}

class History extends PromptElement<HistoryProps, void> {

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

export default function (
	chatContext: { prompt: string },
	logger: vscode.LogOutputChannel
) {
	return async (request: vscode.ChatRequest, context: vscode.ChatContext, response: vscode.ChatResponseStream, token: vscode.CancellationToken) => {
		chatContext.prompt = request.prompt;

		if (request.command === GenerateReleaseNotesPrompt.ID) {

			const [model] = await vscode.lm.selectChatModels({ family: 'gpt-4o' });

			const tools = vscode.lm.tools
				.filter(t => t.tags.includes('vscode-doc')
					|| t.tags.includes('vscode_codesearch')
					|| t.tags.includes('vscode_editing'))
				.map<vscode.LanguageModelChatTool>(t => ({
					name: t.name,
					description: t.description,
					parametersSchema: t.inputSchema,
				}));

			const toolCallRounds: ToolCallRound[] = [];
			const toolCallResults: Record<string, vscode.LanguageModelToolResult> = {};

			while (true) {
				const { messages, metadatas } = await renderPrompt(GenerateReleaseNotesPrompt, { request, context, toolCallRounds, toolCallResults }, { modelMaxPromptTokens: model.maxInputTokens }, model, undefined, token);
				const toolResultMetadata = metadatas.getAll(ToolResultMetadata);

				if (toolResultMetadata?.length) {
					toolResultMetadata.forEach(meta => toolCallResults[meta.toolCallId] = meta.result);
				}

				logger.trace('sending request to the model');
				const modelResponse = await model.sendRequest(messages, { tools }, token);
				logger.info('model responded.');

				const { textResponse, toolCalls } = await processResponseStream(modelResponse, response);

				if (toolCalls.length === 0) {
					break;
				}

				toolCallRounds.push({ response: textResponse, toolCalls });
			}

			return {
				metadata: {
					toolCallsMetadata: {
						toolCallResults,
						toolCallRounds
					}
				}
			};
		}

		throw new Error('Unsupported request');

	};
}

async function processResponseStream(modelResponse: vscode.LanguageModelChatResponse, response: vscode.ChatResponseStream): Promise<{ textResponse: string, toolCalls: vscode.LanguageModelToolCallPart[] }> {
	const toolCalls: vscode.LanguageModelToolCallPart[] = [];
	let textResponse = '';
	let buffer = "";

	for await (const part of modelResponse.stream) {
		if (part instanceof vscode.LanguageModelTextPart) {
			buffer += part.value;
			const markdownString = new vscode.MarkdownString(undefined, true);
			textResponse += buffer;
			markdownString.appendMarkdown(buffer);
			buffer = "";
			response.markdown(markdownString);
		} else if (part instanceof vscode.LanguageModelToolCallPart) {
			const tool = vscode.lm.tools.find(t => t.name === part.name);

			if (!tool) {
				continue;
			}

			toolCalls.push(part);
		}
	}

	return { textResponse, toolCalls };
}