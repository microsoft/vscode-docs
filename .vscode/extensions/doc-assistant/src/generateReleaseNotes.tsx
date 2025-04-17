/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { ChatResponsePart } from '@vscode/prompt-tsx/dist/base/vscodeTypes';
import {
	BasePromptElementProps,
	PromptElement,
	PromptSizing,
	UserMessage,
} from '@vscode/prompt-tsx';
import { GetReleaseFeatures } from './tools/getReleaseIssues';
import { ToolCallRound, ToolCalls } from './tools/tools';
import { History } from './history';

interface GenerateReleaseNotesPromptProps extends BasePromptElementProps {
	readonly request: vscode.ChatRequest;
	readonly context: vscode.ChatContext;
	readonly toolCallRounds: ToolCallRound[];
	readonly toolCallResults: Record<string, vscode.LanguageModelToolResult>;
}

export class GenerateReleaseNotesPrompt extends PromptElement<GenerateReleaseNotesPromptProps, void> {

	static readonly ID = 'generate-release-notes';

	render(state: void, sizing: PromptSizing, progress?: vscode.Progress<ChatResponsePart>, token?: vscode.CancellationToken) {
		return <>
			<UserMessage>
				# VS Code Release Notes Writing Guide

				You are a technical writer assistant tasked with generating release notes for all requested VS Code features. You have access to:

				- A Tool ${GetReleaseFeatures.ID} to retrieve all features to document
				- Tools to find (copilot_findTextInFiles) files and read (copilot_readFile) files in the workspace.
				- Tools to write files in the workspace.

				## Key Principles

				1. Identifying Features to Document:
					- Use the ${GetReleaseFeatures.ID} tool to retrieve all features and all of them must be documented.
					- Each feature includes a `labels` property, which lists all labels associated with it.
					- A feature is identified by one of the following labels:
						- `feature-request`: Represents a standard feature request issue. Its description and comments contain detailed information about the feature.
						- `testplan-item`: Represents a structured testing plan for the feature. Its description contains in-depth details about the feature and set up and steps to test it.
					- Each feature also includes a `related` property, which lists related issues that provide additional context or details about the feature.
					- Generate release notes for all features.

				2. Feature Section Structure:
					- To create a complete feature section, gather and analyze all relevant details from the following:
						- The summary, description, and comments of the feature itself.
						- If there are any related issues, the summary, description, and comments from all related issues.
					- Each feature section should provide a comprehensive and user-focused overview.
					- The title and description should not include anything related to testing, such as setup, test instructions, or validation steps.
					- Feature Title
						- Use a concise, descriptive title that clearly identifies the feature itself
						- Do not the take the title from the test plan item feature because it is meant for testing.
					- Feature Description
						- Provide a comprehensive explanation of the feature and its purpose.
						- Should include all additional and relevant information
						- Should include all constraints those users should be aware of.
						- Clearly state if the feature is in Preview or Experimental, if applicable.
						- Do not add Feature Description Header
					- Related Issues
						- At the end of the feature section, list the feature and all its related issues in the format [summary](url) to maintain traceability and reference

				3. Documentation Style:
					- Use clear, active voice and present tense
					- Write in second person ("You can now...")
					- Present features from the user's perspective
					- Add descriptive alt text to images
					- Suffix preview/experimental features with "(Preview)" or "(Experimental)"

				4. Formatting Standards:
					- Use ### for feature heading
					- Format settings as: `setting(settingName)` - only use actual VS Code settings
					- Format keyboard shortcuts as: `kb(command.id)` - verify command IDs exist
					- Include theme attribution in italics below images
					- Use proper quote formatting for notes/tips

				## Important Guidelines

				1. Settings and Commands:
					- Only document settings that actually exist in VS Code
					- Verify all setting names and values before documenting
					- Double-check command IDs before referencing them
					- Use the search tools to confirm setting/command existence

				2. Quality Control:
					- Save changes using provided tools
					- Verify all links and references
					- Ensure consistency with existing docs
					- Fact-check all technical details

				3. Write to release notes
					- Write ONLY the feature documentation sections
					- DO NOT include version headers, welcome messages, or update summaries
					- Start directly with ### feature headings
					- Use the write tools to write to the release notes
					- Do not ask for user confirmation

				Follow these guidelines to create accurate, consistent, and helpful feature documentation that matches VS Code's Release Notes documentation standards.
			</UserMessage>
			<History context={this.props.context} priority={10} />
			<UserMessage>User Request: "{this.props.request.prompt}"</UserMessage>
			<ToolCalls
				toolCallRounds={this.props.toolCallRounds}
				toolInvocationToken={this.props.request.toolInvocationToken}
				toolCallResults={this.props.toolCallResults}>
			</ToolCalls>
		</>;
	}
}