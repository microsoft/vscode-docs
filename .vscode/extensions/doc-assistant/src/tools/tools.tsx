/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import {
	AssistantMessage,
	BasePromptElementProps,
	PromptElement,
	PromptPiece,
	PromptSizing,
	UserMessage,
	PromptMetadata,
	ToolCall,
	Chunk,
	ToolMessage,
} from '@vscode/prompt-tsx';
import { getTsxDataFromToolsResult } from './utils';

export interface TsxToolUserMetadata {
	readonly toolCallsMetadata: ToolCallsMetadata;
}

export interface ToolCallsMetadata {
	readonly toolCallRounds: ToolCallRound[];
	readonly toolCallResults: Record<string, vscode.LanguageModelToolResult>;
}

export function isTsxToolUserMetadata(obj: unknown): obj is TsxToolUserMetadata {
	// If you change the metadata format, you would have to make this stricter or handle old objects in old ChatRequest metadata
	return !!obj &&
		!!(obj as TsxToolUserMetadata).toolCallsMetadata &&
		Array.isArray((obj as TsxToolUserMetadata).toolCallsMetadata.toolCallRounds);
}

export interface ToolCallElementProps extends BasePromptElementProps {
	readonly toolCall: vscode.LanguageModelToolCallPart;
	readonly toolInvocationToken: vscode.ChatParticipantToolToken | undefined;
	readonly toolCallResult: vscode.LanguageModelToolResult | undefined;
}

class ToolCallElement extends PromptElement<ToolCallElementProps, void> {
	async render(state: void, sizing: PromptSizing): Promise<PromptPiece | undefined> {
		const tool = vscode.lm.tools.find(t => t.name === this.props.toolCall.name);
		if (!tool) {
			console.error(`Tool not found: ${this.props.toolCall.name}`);
			return <ToolMessage toolCallId={this.props.toolCall.callId}>Tool not found</ToolMessage>;
		}

		const tokenizationOptions: vscode.LanguageModelToolInvocationOptions<unknown>['tokenizationOptions'] = {
			tokenBudget: sizing.tokenBudget,
			countTokens: async (content: string) => sizing.countTokens(content),
		};

		const toolResult = this.props.toolCallResult ??
			await vscode.lm.invokeTool(this.props.toolCall.name, { input: this.props.toolCall.input, toolInvocationToken: this.props.toolInvocationToken, tokenizationOptions }, new vscode.CancellationTokenSource().token);

		const data = getTsxDataFromToolsResult(toolResult);
		if (!data) {
			console.error(`Tool result does not contain a TSX part: ${this.props.toolCall.name}`);
			return <ToolMessage toolCallId={this.props.toolCall.callId}>Tool result does not contain a TSX part</ToolMessage>;
		}

		return <ToolMessage toolCallId={this.props.toolCall.callId}>
			<meta value={new ToolResultMetadata(this.props.toolCall.callId, toolResult)}></meta>
			<elementJSON data={data}></elementJSON>
		</ToolMessage>;
	}
}

export interface ToolCallRound {
	readonly response: string;
	readonly toolCalls: vscode.LanguageModelToolCallPart[];
}

export interface ToolCallsProps extends BasePromptElementProps {
	readonly toolCallRounds: ToolCallRound[];
	readonly toolCallResults: Record<string, vscode.LanguageModelToolResult>;
	readonly toolInvocationToken: vscode.ChatParticipantToolToken | undefined;
}

export class ToolCalls extends PromptElement<ToolCallsProps, void> {
	async render(state: void, sizing: PromptSizing) {
		if (!this.props.toolCallRounds.length) {
			return undefined;
		}

		return <>
			{this.props.toolCallRounds.map(round => this.renderOneToolCallRound(round))}
			<UserMessage>Above is the result of calling one or more tools. The user cannot see the results, so you should explain them to the user if referencing them in your answer.</UserMessage>
		</>;
	}

	private renderOneToolCallRound(round: ToolCallRound) {
		const assistantToolCalls: ToolCall[] = round.toolCalls.map(tc => ({ type: 'function', function: { name: tc.name, arguments: JSON.stringify(tc.input) }, id: tc.callId }));
		return <Chunk>
			<AssistantMessage toolCalls={assistantToolCalls}>{round.response}</AssistantMessage>
			{round.toolCalls.map(toolCall =>
				<ToolCallElement toolCall={toolCall} toolInvocationToken={this.props.toolInvocationToken} toolCallResult={this.props.toolCallResults[toolCall.callId]}></ToolCallElement>
			)}
		</Chunk>;
	}
}

export class ToolResultMetadata extends PromptMetadata {
	constructor(
		public toolCallId: string,
		public result: vscode.LanguageModelToolResult,
	) {
		super();
	}
}