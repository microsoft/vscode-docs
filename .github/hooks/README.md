# Agent feedback tracking

The agent feedback hook captures local correction signals so recurring issues can become repository guidance.

## How it works

The hook uses four agent lifecycle events:

1. `SessionStart` checks for pending corrections. If any exist, it directs the agent to invoke the review skill and present proposed guidance for approval before handling the new task.
2. `PreToolUse` snapshots user-facing Markdown before the agent edits it.
3. `Stop` records the resulting content and the line ranges changed by the agent.
4. `UserPromptSubmit` compares the agent result with the current files and captures later manual edits that overlap or directly adjoin those ranges. It also records follow-up chat messages as candidate feedback.

The transcript is a fallback source for feedback submitted through plan or comment UI flows that do not produce an ordinary prompt event.

The tracker covers Markdown under:

* `api/`
* `blogs/`
* `docs/`
* `release-notes/`
* `remote/`

Edits elsewhere are ignored.

## Signal quality

Overlapping file edits are high-confidence correction signals. Follow-up chat messages are lower-confidence candidates because they might be new requests or one-time plan changes.

At the start of the next agent session, pending signals automatically invoke the `review-agent-corrections` skill. You can also ask the agent to review corrections at any time. The skill classifies and correlates pending signals, proposes a change to the narrowest existing instruction or hook, and waits for explicit approval before editing tracked files.

## Local storage and privacy

Raw snapshots, diffs, and chat messages are stored under the path returned by:

```powershell
git rev-parse --git-path agent-feedback
```

This places the data in private Git metadata for both normal clones and worktrees. Raw evidence is not stored in the working tree and must not be committed.

The tracker retains the latest 100 events and prunes older events automatically.

## Inspect and manage events

List pending events:

```powershell
node .github/hooks/track-agent-feedback.js pending
```

List all retained events:

```powershell
node .github/hooks/track-agent-feedback.js all
```

Record review decisions:

```powershell
node .github/hooks/track-agent-feedback.js acknowledge <event-id>
node .github/hooks/track-agent-feedback.js dismiss <event-id>
node .github/hooks/track-agent-feedback.js defer <event-id>
```

Use `acknowledge` only after approved guidance is applied. Use `dismiss` for feedback that should not become reusable guidance. `defer` leaves an event pending and records when it was deferred.

To remove all local feedback data, delete the directory printed by `git rev-parse --git-path agent-feedback`.

## Failure behavior

Tracking failures produce a warning but do not block prompts or edits. A warning means the current correction signal might not have been recorded.

The detector identifies candidates, not intent. Human review decides whether a signal is reusable, already covered, better enforced by a deterministic hook, or unrelated to future work.
