---
ContentId: 587745a8-bc1a-4a6c-9570-93c10066cbe2
DateApproved: 9/2/2026
MetaDescription: Explore every VS Code pet interaction and reaction, including chat activity, movement, activation surprises, achievements, colors, and sizing.
MetaSocialImage: ../images/shared/github-copilot-social.png
---

# VS Code pet interactions and reactions

`feature(chat-pet)`

The {% data variables.product.prodname_vscode %} pet sits above the chat input box and reacts as you work with agents. This reference lists the pet's reactions to chat activity, movement, direct interactions, and context-menu actions.

![Screenshot showing the VS Code pet entering and leaving the chat input in Stable blue and Insiders green.](../images/chat-pet/toggle.png)

To learn how to show, hide, and control the pet, see [Personalize chat](/docs/chat/chat-overview.md#use-the-vs-code-pet).

## Chat activity reactions

| Activity | Pet reaction | Preview |
|----------|--------------|---------|
| Move the pointer around the chat input | Its pupils follow the pointer. | ![Screenshot showing the Stable and Insiders pets following a pointer with their eyes.](../images/chat-pet/cursor-gaze.png) |
| Type a prompt | It works at its tiny terminal. | ![Screenshot showing the Stable and Insiders pets typing at a tiny terminal.](../images/chat-pet/typing-v2.png) |
| Wait for a request to run | It thinks with an animated speech bubble. | ![Screenshot showing the Stable and Insiders pets processing a request with an animated speech bubble.](../images/chat-pet/processing.png) |
| Respond to a confirmation or question | It claps when the agent needs your input. | ![Screenshot showing the Stable and Insiders pets clapping when input is needed.](../images/chat-pet/needs-input.png) |
| Leave chat idle for 20 seconds | It falls asleep as a sleep bubble grows and drifts from its nose. Interact with the pet or type in the input box to wake it. | ![Screenshot showing the Stable and Insiders pets sleeping with growing sleep bubbles and waking after an interaction.](../images/chat-pet/sleep-wake-pr330399.png) |
| Finish a response | It performs the button-press celebration. | ![Screenshot showing the Stable and Insiders pets pressing their red buttons.](../images/chat-pet/click-button-v2.png) |

## Movement reactions

| Interaction | Pet reaction | Preview |
|-------------|--------------|---------|
| Drag and drop | The pet follows the pointer until you release it. | ![Screenshot showing the Stable and Insiders pets being lifted and dropped onto the chat input.](../images/chat-pet/drag-drop-v2.png) |
| Flick | The pet continues in the direction of the gesture before gravity pulls it down. | |
| Press `kbstyle(Left)` or `kbstyle(Right)` | The pet hops along the input box until it reaches an edge. | ![Screenshot showing the Stable and Insiders pets hopping right and left with the arrow keys.](../images/chat-pet/keyboard-hop.png) |
| Press `kbstyle(Shift+Left)` or `kbstyle(Shift+Right)` | The pet is thrown toward a wall. | |
| Move the pointer quickly between the pet's left and right sides, or alternate the arrow keys | The pet becomes dizzy. | ![Screenshot showing the Stable and Insiders pets following a rapidly moving pointer and becoming dizzy.](../images/chat-pet/dizzy.png) |
| Drop or throw the pet past the input box | The pet falls into a despawn effect at the bottom of chat, reappears at the top, and lands on the input box. | ![Screenshot showing the Stable and Insiders pets falling into portals, reappearing at the top, and landing on the chat input.](../images/chat-pet/fall-respawn-pr330399.png) |

## Activation reactions

Select the pet while it is resting, or focus it and press `kbstyle(Enter)` or `kbstyle(Space)`, to trigger one of these reactions at random. The pet doesn't immediately repeat its previous reaction.

| Reaction | Behavior | Preview |
|----------|----------|---------|
| Button press | Presses its red button. | ![Screenshot showing the Stable and Insiders pets pressing their red buttons.](../images/chat-pet/click-button-v2.png) |
| Heart | Reacts with hearts. | ![Screenshot showing the Stable and Insiders pets reacting with hearts.](../images/chat-pet/click-love.png) |
| Cool | Puts on sunglasses. | ![Screenshot showing the Stable and Insiders pets putting on sunglasses.](../images/chat-pet/click-cool.png) |
| VS Code | Lies on its side and yaps. | ![Screenshot showing the Stable and Insiders pets lying on their sides and yapping.](../images/chat-pet/click-yap-static.png) |
| Sing | Sings a musical note. | ![Screenshot showing the Stable and Insiders pets singing a musical note.](../images/chat-pet/click-sing-v2.png) |
| Speechless | Becomes speechless. | ![Screenshot showing the Stable and Insiders pets becoming speechless.](../images/chat-pet/click-speechless.png) |
| Worry | Looks worried. | ![Screenshot showing the Stable and Insiders pets looking worried.](../images/chat-pet/click-worry.png) |

## Achievements and context-menu actions

When you unlock an achievement, a gold star appears on the pet for 10 seconds. Select the pet while the star is visible to open **Achievements**.

Open the pet's context menu to access these actions:

| Action | Behavior | Preview |
|--------|----------|---------|
| **Achievements** | View locked and unlocked achievements and their accessory rewards. | |
| **Go on the Run** or **Come Back** | The pet ducks out of sight, occasionally peeks into chat, and returns when called. | ![Screenshot showing the Stable and Insiders pets going on the run, peeking out, and coming back.](../images/chat-pet/on-the-run-v2.png) |
| **Grow**, **Shrink**, or **Reset Size** | Resize the pet in 20 percent steps, or restore its default size. You can shrink it to 40 percent or continue to grow it. | ![Screenshot showing the Stable and Insiders pets growing and shrinking.](../images/chat-pet/grow-shrink.png) |
| **Stable Colors** or **Insiders Colors** | Switch the pet between the Stable blue and Insiders green color variants. | ![Screenshot showing the VS Code pet in Stable blue and Insiders green.](../images/chat-pet/toggle.png) |

## Related resources

* [Use chat in {% data variables.product.prodname_vscode_shortname %}](/docs/chat/chat-overview.md)
* [Use the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md)
