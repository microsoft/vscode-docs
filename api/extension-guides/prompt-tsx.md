---
# DO NOT TOUCH — Managed by doc writer
ContentId:
DateApproved:

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide for how to build language model prompts using the prompt-tsx library
---

# Crafting Language Model Prompts

When we started building Copilot, we initially built all prompts using basic string concatenation. We quickly hit limits with this, because it was hard to compose features and also hard to makes sure our prompts stayed within the context window of language models. To solve this, we built the [@vscode/prompt-tsx](https://github.com/microsoft/vscode-prompt-tsx) library, which lets you do some useful things:

- **TSX-based Prompt Rendering**: Compose prompts using TSX components, making them more readable and maintainable.
- **Priority-based Pruning**: Automatically prune less important parts of prompts to fit within the model's context window.
- **Flexible Token Management**: Use properties like `flexGrow`, `flexReserve`, and `flexBasis` to cooperatively use token budgets.
- **Tool Integration**: Integrate with VS Code's language model tools API.

For a complete overview of all features and detailed usage instructions, please refer to the [full README](https://github.com/microsoft/vscode-prompt-tsx/blob/main/README.md). On this page, we'll work through a few practical examples of prompt design with the library. The complete code for these examples can also be found [in the prompt-tsx repo](https://github.com/microsoft/vscode-prompt-tsx/tree/main/examples).

## History Element: Managing Priorities

Including conversation history in your prompt is important as it allows the user to ask follow-up questions to previous messages. However, you want to make sure its priority is treated appropriately because history can grow very large over time. We've found that the pattern which makes the most sense is usually to prioritize, in order:

1. The base prompt instructions
2. The current user query
3. The last couple of turns of chat history
4. Any supporting data
5. As much of the remaining history as you can fit

For this reason, you'll split the history into two parts in the prompt, where recent prompt turns are prioritized above general contextual information.

### Step 1: Define the HistoryMessages Component

You'll need to list history messages, so let's define a `HistoryMessages` component that displays those. You may need to expand this if you deal with more complex data types, but this provides a good starting point.

This example uses the `PrioritizedList` helper component which automatically assigns ascending or descending priorities to each of its children.

```tsx
import {
	UserMessage,
	AssistantMessage,
	PromptElement,
	BasePromptElementProps,
	PrioritizedList,
} from '@vscode/prompt-tsx';
import { ChatContext, ChatRequestTurn, ChatResponseTurn, ChatResponseMarkdownPart } from 'vscode';

interface IHistoryMessagesProps extends BasePromptElementProps {
	history: ChatContext['history'];
}

export class HistoryMessages extends PromptElement<IHistoryMessagesProps> {
	render(): PromptPiece {
		const history: (UserMessage | AssistantMessage)[] = [];
		for (const turn of this.props.history) {
			if (turn instanceof ChatRequestTurn) {
				history.push(<UserMessage>{turn.prompt}</UserMessage>);
			} else if (turn instanceof ChatResponseTurn) {
				history.push(
					<AssistantMessage name={turn.participant}>
						{chatResponseToMarkdown(turn)}
					</AssistantMessage>
				);
			}
		}
		return (
			<PrioritizedList priority={0} descending={false}>
				{history}
			</PrioritizedList>
		);
	}
}
```

### Step 2: Define the Prompt Component

Now, define a `MyPrompt` component that includes the base instructions, user query, and history messages with appropriate priorities. Priority values are local among siblings, but remember that we want to trim older messages in the history before touching anything else in the prompt, so you need to split up two `<HistoryMessages>` elements:

```tsx
import {
	SystemMessage,
	UserMessage,
	PromptElement,
	BasePromptElementProps,
} from '@vscode/prompt-tsx';

interface IMyPromptProps extends BasePromptElementProps {
	history: ChatContext['history'];
	userQuery: string;
}

export class MyPrompt extends PromptElement<IMyPromptProps> {
	render() {
		return (
			<>
				<SystemMessage priority={100}>
					Here are your base instructions. They have the highest priority because you want to make
					sure they're always included!
				</SystemMessage>
				{/* Older messages in the history have the lowest priority since they're less relevant */}
				<HistoryMessages history={this.props.history.slice(0, -2)} priority={0} />
				{/* The last 2 history messages are preferred over any workspace context you have below */}
				<HistoryMessages history={this.props.history.slice(-2)} priority={80} />
				{/* The user query is right behind the system message in priority */}
				<UserMessage priority={90}>{this.props.userQuery}</UserMessage>
				<UserMessage priority={70}>
					With a slightly lower priority, you can include some contextual data about the workspace
					or files here...
				</UserMessage>
			</>
		);
	}
}
```

Now, all older history messages will be pruned before the library will try to prune other elements of the prompt.

### Step 3: Define the History Component

To make consumption a little easier, define a `History` component that wraps the history messages and uses the `passPriority` attribute to act as a pass-through container. With `passPriority`, its children are treated as if they were direct children of the containing element for prioritization purposes.

```tsx
import { PromptElement, BasePromptElementProps } from '@vscode/prompt-tsx';

interface IHistoryProps extends BasePromptElementProps {
	history: ChatContext['history'];
	newer: number; // last 2 message priority values
	older: number; // previous message priority values
	passPriority: true; // require this prop be set!
}

export class History extends PromptElement<IHistoryProps> {
	render(): PromptPiece {
		return (
			<>
				<HistoryMessages history={this.props.history.slice(0, -2)} priority={this.props.older} />
				<HistoryMessages history={this.props.history.slice(-2)} priority={this.props.newer} />
			</>
		);
	}
}
```

Now, you can use and reuse this single element to include chat history:

```tsx
<History history={this.props.history} passPriority older={0} newer={80}/>
```

## File Contents: Growing to Fit

In this example, you want to include the contents of all files the user is currently looking at in their prompt. But, these files could be big, to the point where including all of them would lead to their text being pruned! This example shows you how to use the `flexGrow` property to cooperatively size the file contents to fit within the token budget.

### Step 2: Define the Base Instructions and User Query

First, you define a `SystemMessage` component that includes the base instructions. This component has the highest priority to ensure it is always included.

```tsx
<SystemMessage priority={100}>Here are your base instructions.</SystemMessage>
```

You then include the user query using the `UserMessage` component. This component has a high priority to ensure it is included right after the base instructions.

```tsx
<UserMessage priority={90}>{this.props.userQuery}</UserMessage>
```

### Step 4: Include the File Contents

Finally, you include the file contents using the `FileContext` component. You assign it a [`flexGrow`](https://github.com/microsoft/vscode-prompt-tsx?tab=readme-ov-file#flex-behavior) value of `1` to ensure it is rendered after the base instructions, user query, and history.

```tsx
<FileContext priority={70} flexGrow={1} files={this.props.files} />
```

With a `flexGrow` value, the element will get any _unused_ token budget in its `PromptSizing` object that's passed into its `render()` and `prepare()` calls. You can read more about the behavior of flex elements in [prompt-tsx's readme](https://github.com/microsoft/vscode-prompt-tsx?tab=readme-ov-file#flex-behavior).

### Step 5: Include the History

Next, include the history messages using the `History` component that you created in the last example. This is a little trickier, since you do want some history to be shown, but also want the file contents to take up the majority of the prompt.

Therefore, assign it a `flexGrow` value of `2` to ensure it is rendered after all other elements, including `<FileContext />`. But, also set a `flexReserve` value of `"/5"` to reserve 1/5th of the total budget for history.

```tsx
<History
	history={this.props.history}
	passPriority
	older={0}
	newer={80}
	flexGrow={2}
	flexReserve="/5"
/>
```

### Step 5: Combine the Elements

Now, combine all the elements into the `MyPrompt` component.

```tsx
import {
	SystemMessage,
	UserMessage,
	PromptElement,
	BasePromptElementProps,
} from '@vscode/prompt-tsx';
import { History } from './history';

interface IFilesToInclude {
	document: TextDocument;
	line: number;
}

interface IMyPromptProps extends BasePromptElementProps {
	history: ChatContext['history'];
	userQuery: string;
	files: IFilesToInclude[];
}

export class MyPrompt extends PromptElement<IMyPromptProps> {
	render() {
		return (
			<>
				<SystemMessage priority={100}>Here are your base instructions.</SystemMessage>
				<History
					history={this.props.history}
					passPriority
					older={0}
					newer={80}
					flexGrow={2}
					flexReserve="/5"
				/>
				<UserMessage priority={90}>{this.props.userQuery}</UserMessage>
				<FileContext priority={70} flexGrow={1} files={this.props.files} />
			</>
		);
	}
}
```

### Step 6: Define the FileContext Component

Finally, define a `FileContext` component that includes the contents of the files the user is currently looking at. Because you used `flexGrow`, you can implement logic that will get as many of the lines around the 'interesting' line for each file using the information in `PromptSizing`.

We've omitted the logic behind `getExpandedFiles` for brevity here, but you can check it out in the [example repo](https://github.com/microsoft/vscode-prompt-tsx/blob/5501d54a5b9a7608582e8419cd968a82ca317cc9/examples/file-contents.tsx#L103).

```tsx
import { PromptElement, BasePromptElementProps, PromptSizing, PromptPiece } from '@vscode/prompt-tsx';

class FileContext extends PromptElement<{ files: IFilesToInclude[] } & BasePromptElementProps> {
	async render(_state: void, sizing: PromptSizing): Promise<PromptPiece> {
		const files = await this.getExpandedFiles(sizing);
		return <>{files.map(f => f.toString())}</>;
	}

	private async getExpandedFiles(sizing: PromptSizing) {
		// Implementation details are summarized here.
		// Refer to the repo for the complete implementation.
	}
}
```

### Summary

In this example, you created a `MyPrompt` component that includes base instructions, user query, history messages, and file contents with different priorities and `flexGrow` values. You also created a `FileContext` component that includes the contents of the files the user is currently looking at and uses the `flexGrow` property to cooperatively size the file contents to fit within the token budget.

By following this pattern, you can ensure that the most important parts of your prompt are always included, while less important parts are pruned as needed to fit within the model's context window. For the complete implementation details of the `getExpandedFiles` method and the `FileContextTracker` class, please refer to the [prompt-tsx repo](https://github.com/microsoft/vscode-prompt-tsx/tree/main/examples).
