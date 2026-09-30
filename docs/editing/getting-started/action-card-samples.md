---
ContentId: 7d3859cb-6d6d-4e44-9d22-f12a84219354
DateApproved: 9/30/2026
MetaDescription: Preview inline and contextual documentation action cards with article, external, and product protocol links.
MetaSocialImage: ../images/codebasics/code-basics-social.png
---
# Action card samples

Use this unlisted page to compare action-card placements and link behaviors. Change the version on any product action to switch all version-aware links between Stable and Insiders. Insiders actions append **(Insiders)** to the button text.

> [!NOTE]
> Sidebar cards appear on desktop. At smaller viewport widths, use the inline cards to test the same actions.

## Default inline card

This card omits the `display` attribute, so it appears in the article. Its actions demonstrate a documentation link and an external link.

{% action-card title="Explore editor resources" %}
Compare an article action with an external action.

* [Read about core editor features](/docs/editing/getting-started/overview.md)
* [View the source repository](https://github.com/microsoft/vscode)
{% /action-card %}

## Contextual sidebar card

On desktop, the following card appears in the **Related** sidebar while this section is active. Its product link opens the settings editor with the selected Stable or Insiders scheme.

{% action-card title="Open editor settings" display="sidebar" %}
Open a specific setting in your preferred {% data variables.product.prodname_vscode_shortname %} edition.

* [Open font size settings](vscode://settings/editor.fontSize)
{% /action-card %}

Scroll between this section and the next section to see the contextual sidebar card change.

## Inline and sidebar tryout card

This card appears in the article and in the contextual sidebar. The tryout uses the same protocol URL produced by an inline tryout macro.

{% action-card title="Try Smart Diff" display="both" %}
Launch the registered Smart Diff onboarding experience.

* [Try Smart Diff Layout](vscode://tryout/editor.smart-diff)
* [Read the editing overview](/docs/editing/codebasics.md)
{% /action-card %}

## Simple inline tryout link

The following inline tryout uses its authored text as the button label. Select Insiders to see **Try Smart Diff Layout (Insiders)**.

`try(editor.smart-diff, Try Smart Diff Layout)`

## Redirect and custom protocol card

The first action wraps a product protocol URL in a `vscode.dev` redirect and receives the Stable or Insiders selector. The second action uses another custom scheme and remains unchanged.

{% action-card title="Compare protocol handling" %}
Compare version-aware URL rewriting with an unchanged custom protocol.

* [Open settings through vscode.dev](https://vscode.dev/redirect?url=vscode%3A%2F%2Fsettings%2Feditor.fontSize)
* [Open an email draft](mailto:?subject=Action%20card%20protocol%20test)
{% /action-card %}
