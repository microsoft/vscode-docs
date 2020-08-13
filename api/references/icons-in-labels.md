---
# DO NOT TOUCH — Managed by doc writer
ContentId: 109a10fc-2d64-44b6-98ce-b8375d245776
DateApproved: 8/13/2020

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Reference of all product icons by id
---

# Product Icon Reference

Visual Studio Code contains a set of built-in icons that are used in views and the editor, but can also be used in hovers, the status bar, and by extensions. These icons are **product icons** as opposed to **file icons**, which are used next to file names throughout the UI.

The product icons that ship with VS Code are contained in the [Codicon icon font](https://github.com/microsoft/vscode-codicons) and form the **default** product icon theme. Extensions can provide new [Product Icon Themes](/api/extension-guides/product-icon-theme) to redefine these icons and give VS Code a new appearance.

In order to allow this, all product icons are identified an ID. The icon identifier is what's used in UI components. The association of icon identifier to an actual icon font glyph is then done in the product icon theme.

## Icons in labels

Icons can be used in Markdown labels in hovers, in the  [StatusBarItem](/api/references/vscode-api#StatusBarItem) text and [QuickPickItem](/api/references/vscode-api#QuickPickItem) label API. The syntax for adding an icon in Markdown is `$(iconIdentifier)`:

```ts
$(alert);
```

You can also embed text and use multiple icons:

```ts
$(eye) $(heart) $(mark-github) GitHub
```

## Animation

You can apply a spinning animation to any icon by appending `~spin` to the icon name:

```ts
$(sync~spin)
```

## Icon Listing

Below are the full listings of the product icons by identifier. The preview shows the default icon as shipped with VS Code, but [Product Icon Themes](/api/extension-guides/product-icon-theme) can replace these.

You can see from the previews that some glyphs appear multiple times for different identifiers. For example, the same right arrow is used for `chevron-left`, `folding-collapsed`, and `breadcrumb-separator`.

That's a choice of the default icon theme but a custom product icon theme has the freedom to style each usage differently.

In order to allow each icon in VS Code to be customized, every icon usage has a separate ID, describing the function of the icon. This is work in progress and more icons will be added in the coming milestones. In order to keep existing themes working, every new icon is defined with a default icon that is used when a theme has no icon definition for a given ID.

<div id="codicon-listing">

| preview     | identifier                        | default                           |
| ----------- | --------------------------------- | --------------------------------- |
|<i class="codicon codicon-chevron-right"></i>|breadcrumb-separator|chevron-right|
|<i class="codicon codicon-close"></i>|dialog-close|close|
|<i class="codicon codicon-error"></i>|dialog-error|error|
|<i class="codicon codicon-info"></i>|dialog-info|info|
|<i class="codicon codicon-warning"></i>|dialog-warning|warning|
|<i class="codicon codicon-add"></i>|diff-insert|add|
|<i class="codicon codicon-remove"></i>|diff-remove|remove|
|<i class="codicon codicon-close"></i>|diff-review-close|close|
|<i class="codicon codicon-add"></i>|diff-review-insert|add|
|<i class="codicon codicon-remove"></i>|diff-review-remove|remove|
|<i class="codicon codicon-close"></i>|find-close|close|
|<i class="codicon codicon-chevron-right"></i>|find-collapsed|chevron-right|
|<i class="codicon codicon-chevron-down"></i>|find-expanded|chevron-down|
|<i class="codicon codicon-arrow-down"></i>|find-next-match|arrow-down|
|<i class="codicon codicon-arrow-up"></i>|find-previous-match|arrow-up|
|<i class="codicon codicon-replace"></i>|find-replace|replace|
|<i class="codicon codicon-replace-all"></i>|find-replace-all|replace-all|
|<i class="codicon codicon-selection"></i>|find-selection|selection|
|<i class="codicon codicon-chevron-right"></i>|folding-collapsed|chevron-right|
|<i class="codicon codicon-chevron-down"></i>|folding-expanded|chevron-down|
|<i class="codicon codicon-chevron-down"></i>|marker-navigation-next|chevron-down|
|<i class="codicon codicon-chevron-up"></i>|marker-navigation-previous|chevron-up|
|<i class="codicon codicon-check"></i>|menu-selection|check|
|<i class="codicon codicon-chevron-right"></i>|menu-submenu|chevron-right|
|<i class="codicon codicon-more"></i>|menubar-more|more|
|<i class="codicon codicon-close"></i>|notifications-clear|close|
|<i class="codicon codicon-clear-all"></i>|notifications-clear-all|clear-all|
|<i class="codicon codicon-chevron-down"></i>|notifications-collapse|chevron-down|
|<i class="codicon codicon-gear"></i>|notifications-configure|gear|
|<i class="codicon codicon-chevron-up"></i>|notifications-expand|chevron-up|
|<i class="codicon codicon-chevron-down"></i>|notifications-hide|chevron-down|
|<i class="codicon codicon-close"></i>|panel-close|close|
|<i class="codicon codicon-chevron-up"></i>|panel-maximize|chevron-up|
|<i class="codicon codicon-chevron-down"></i>|panel-restore|chevron-down|
|<i class="codicon codicon-chevron-down"></i>|parameter-hints-next|chevron-down|
|<i class="codicon codicon-chevron-up"></i>|parameter-hints-previous|chevron-up|
|<i class="codicon codicon-arrow-left"></i>|quick-input-back|arrow-left|
|<i class="codicon codicon-book"></i>|remote-explorer-documentation|book|
|<i class="codicon codicon-twitter"></i>|remote-explorer-feedback|twitter|
|<i class="codicon codicon-star"></i>|remote-explorer-get-started|star|
|<i class="codicon codicon-comment"></i>|remote-explorer-report-issues|comment|
|<i class="codicon codicon-issues"></i>|remote-explorer-review-issues|issues|
|<i class="codicon codicon-triangle-down"></i>|scrollbar-button-down|triangle-down|
|<i class="codicon codicon-triangle-left"></i>|scrollbar-button-left|triangle-left|
|<i class="codicon codicon-triangle-right"></i>|scrollbar-button-right|triangle-right|
|<i class="codicon codicon-triangle-up"></i>|scrollbar-button-up|triangle-up|
|<i class="codicon codicon-clear-all"></i>|search-clear-results|clear-all|
|<i class="codicon codicon-collapse-all"></i>|search-collapse-results|collapse-all|
|<i class="codicon codicon-ellipsis"></i>|search-details|ellipsis|
|<i class="codicon codicon-expand-all"></i>|search-expand-results|expand-all|
|<i class="codicon codicon-go-to-file"></i>|search-goto-file|go-to-file|
|<i class="codicon codicon-chevron-right"></i>|search-hide-replace|chevron-right|
|<i class="codicon codicon-new-file"></i>|search-new-editor|new-file|
|<i class="codicon codicon-refresh"></i>|search-refresh|refresh|
|<i class="codicon codicon-close"></i>|search-remove|close|
|<i class="codicon codicon-replace"></i>|search-replace|replace|
|<i class="codicon codicon-replace-all"></i>|search-replace-all|replace-all|
|<i class="codicon codicon-list-selection"></i>|search-show-context|list-selection|
|<i class="codicon codicon-chevron-down"></i>|search-show-replace|chevron-down|
|<i class="codicon codicon-chevron-right"></i>|suggest-more-info|chevron-right|
|<i class="codicon codicon-more"></i>|toolbar-more|more|
|<i class="codicon codicon-close"></i>|tree-filter-clear|close|
|<i class="codicon codicon-list-selection"></i>|tree-filter-on-type-off|list-selection|
|<i class="codicon codicon-list-filter"></i>|tree-filter-on-type-on|list-filter|
|<i class="codicon codicon-chevron-down"></i>|tree-item-expanded|chevron-down|
|<i class="codicon codicon-loading"></i>|tree-item-loading|loading|
|<i class="codicon codicon-account"></i>|account||
|<i class="codicon codicon-activate-breakpoints"></i>|activate-breakpoints||
|<i class="codicon codicon-add"></i>|add||
|<i class="codicon codicon-alert"></i>|alert||
|<i class="codicon codicon-archive"></i>|archive||
|<i class="codicon codicon-array"></i>|array||
|<i class="codicon codicon-arrow-both"></i>|arrow-both||
|<i class="codicon codicon-arrow-down"></i>|arrow-down||
|<i class="codicon codicon-arrow-left"></i>|arrow-left||
|<i class="codicon codicon-arrow-right"></i>|arrow-right||
|<i class="codicon codicon-arrow-small-down"></i>|arrow-small-down||
|<i class="codicon codicon-arrow-small-left"></i>|arrow-small-left||
|<i class="codicon codicon-arrow-small-right"></i>|arrow-small-right||
|<i class="codicon codicon-arrow-small-up"></i>|arrow-small-up||
|<i class="codicon codicon-arrow-up"></i>|arrow-up||
|<i class="codicon codicon-beaker"></i>|beaker||
|<i class="codicon codicon-bell"></i>|bell||
|<i class="codicon codicon-bell-dot"></i>|bell-dot||
|<i class="codicon codicon-bold"></i>|bold||
|<i class="codicon codicon-book"></i>|book||
|<i class="codicon codicon-bookmark"></i>|bookmark||
|<i class="codicon codicon-briefcase"></i>|briefcase||
|<i class="codicon codicon-broadcast"></i>|broadcast||
|<i class="codicon codicon-browser"></i>|browser||
|<i class="codicon codicon-bug"></i>|bug||
|<i class="codicon codicon-calendar"></i>|calendar||
|<i class="codicon codicon-call-incoming"></i>|call-incoming||
|<i class="codicon codicon-call-outgoing"></i>|call-outgoing||
|<i class="codicon codicon-case-sensitive"></i>|case-sensitive||
|<i class="codicon codicon-check"></i>|check||
|<i class="codicon codicon-checklist"></i>|checklist||
|<i class="codicon codicon-chevron-down"></i>|chevron-down||
|<i class="codicon codicon-chevron-left"></i>|chevron-left||
|<i class="codicon codicon-chevron-right"></i>|chevron-right||
|<i class="codicon codicon-chevron-up"></i>|chevron-up||
|<i class="codicon codicon-chrome-close"></i>|chrome-close||
|<i class="codicon codicon-chrome-maximize"></i>|chrome-maximize||
|<i class="codicon codicon-chrome-minimize"></i>|chrome-minimize||
|<i class="codicon codicon-chrome-restore"></i>|chrome-restore||
|<i class="codicon codicon-circle-filled"></i>|circle-filled||
|<i class="codicon codicon-circle-outline"></i>|circle-outline||
|<i class="codicon codicon-circle-slash"></i>|circle-slash||
|<i class="codicon codicon-circuit-board"></i>|circuit-board||
|<i class="codicon codicon-clear-all"></i>|clear-all||
|<i class="codicon codicon-clippy"></i>|clippy||
|<i class="codicon codicon-clock"></i>|clock||
|<i class="codicon codicon-clone"></i>|clone||
|<i class="codicon codicon-close"></i>|close||
|<i class="codicon codicon-close-all"></i>|close-all||
|<i class="codicon codicon-close-dirty"></i>|close-dirty||
|<i class="codicon codicon-cloud-download"></i>|cloud-download||
|<i class="codicon codicon-cloud-upload"></i>|cloud-upload||
|<i class="codicon codicon-code"></i>|code||
|<i class="codicon codicon-collapse-all"></i>|collapse-all||
|<i class="codicon codicon-color-mode"></i>|color-mode||
|<i class="codicon codicon-comment"></i>|comment||
|<i class="codicon codicon-comment-add"></i>|comment-add||
|<i class="codicon codicon-comment-discussion"></i>|comment-discussion||
|<i class="codicon codicon-compare-changes"></i>|compare-changes||
|<i class="codicon codicon-console"></i>|console||
|<i class="codicon codicon-credit-card"></i>|credit-card||
|<i class="codicon codicon-dash"></i>|dash||
|<i class="codicon codicon-dashboard"></i>|dashboard||
|<i class="codicon codicon-database"></i>|database||
|<i class="codicon codicon-debug"></i>|debug||
|<i class="codicon codicon-debug-alt"></i>|debug-alt||
|<i class="codicon codicon-debug-alt-2"></i>|debug-alt-2||
|<i class="codicon codicon-debug-alternate"></i>|debug-alternate||
|<i class="codicon codicon-debug-breakpoint"></i>|debug-breakpoint||
|<i class="codicon codicon-debug-breakpoint-conditional"></i>|debug-breakpoint-conditional||
|<i class="codicon codicon-debug-breakpoint-conditional-disabled"></i>|debug-breakpoint-conditional-disabled||
|<i class="codicon codicon-debug-breakpoint-conditional-unverified"></i>|debug-breakpoint-conditional-unverified||
|<i class="codicon codicon-debug-breakpoint-data"></i>|debug-breakpoint-data||
|<i class="codicon codicon-debug-breakpoint-data-disabled"></i>|debug-breakpoint-data-disabled||
|<i class="codicon codicon-debug-breakpoint-data-unverified"></i>|debug-breakpoint-data-unverified||
|<i class="codicon codicon-debug-breakpoint-disabled"></i>|debug-breakpoint-disabled||
|<i class="codicon codicon-debug-breakpoint-function"></i>|debug-breakpoint-function||
|<i class="codicon codicon-debug-breakpoint-function-disabled"></i>|debug-breakpoint-function-disabled||
|<i class="codicon codicon-debug-breakpoint-function-unverified"></i>|debug-breakpoint-function-unverified||
|<i class="codicon codicon-debug-breakpoint-log"></i>|debug-breakpoint-log||
|<i class="codicon codicon-debug-breakpoint-log-disabled"></i>|debug-breakpoint-log-disabled||
|<i class="codicon codicon-debug-breakpoint-log-unverified"></i>|debug-breakpoint-log-unverified||
|<i class="codicon codicon-debug-breakpoint-unsupported"></i>|debug-breakpoint-unsupported||
|<i class="codicon codicon-debug-breakpoint-unverified"></i>|debug-breakpoint-unverified||
|<i class="codicon codicon-debug-console"></i>|debug-console||
|<i class="codicon codicon-debug-continue"></i>|debug-continue||
|<i class="codicon codicon-debug-disconnect"></i>|debug-disconnect||
|<i class="codicon codicon-debug-hint"></i>|debug-hint||
|<i class="codicon codicon-debug-pause"></i>|debug-pause||
|<i class="codicon codicon-debug-restart"></i>|debug-restart||
|<i class="codicon codicon-debug-restart-frame"></i>|debug-restart-frame||
|<i class="codicon codicon-debug-reverse-continue"></i>|debug-reverse-continue||
|<i class="codicon codicon-debug-stackframe"></i>|debug-stackframe||
|<i class="codicon codicon-debug-stackframe-active"></i>|debug-stackframe-active||
|<i class="codicon codicon-debug-stackframe-dot"></i>|debug-stackframe-dot||
|<i class="codicon codicon-debug-stackframe-focused"></i>|debug-stackframe-focused||
|<i class="codicon codicon-debug-start"></i>|debug-start||
|<i class="codicon codicon-debug-step-back"></i>|debug-step-back||
|<i class="codicon codicon-debug-step-into"></i>|debug-step-into||
|<i class="codicon codicon-debug-step-out"></i>|debug-step-out||
|<i class="codicon codicon-debug-step-over"></i>|debug-step-over||
|<i class="codicon codicon-debug-stop"></i>|debug-stop||
|<i class="codicon codicon-desktop-download"></i>|desktop-download||
|<i class="codicon codicon-device-camera"></i>|device-camera||
|<i class="codicon codicon-device-camera-video"></i>|device-camera-video||
|<i class="codicon codicon-device-desktop"></i>|device-desktop||
|<i class="codicon codicon-device-mobile"></i>|device-mobile||
|<i class="codicon codicon-diff"></i>|diff||
|<i class="codicon codicon-diff-added"></i>|diff-added||
|<i class="codicon codicon-diff-ignored"></i>|diff-ignored||
|<i class="codicon codicon-diff-modified"></i>|diff-modified||
|<i class="codicon codicon-diff-removed"></i>|diff-removed||
|<i class="codicon codicon-diff-renamed"></i>|diff-renamed||
|<i class="codicon codicon-discard"></i>|discard||
|<i class="codicon codicon-edit"></i>|edit||
|<i class="codicon codicon-editor-layout"></i>|editor-layout||
|<i class="codicon codicon-ellipsis"></i>|ellipsis||
|<i class="codicon codicon-empty-window"></i>|empty-window||
|<i class="codicon codicon-error"></i>|error||
|<i class="codicon codicon-exclude"></i>|exclude||
|<i class="codicon codicon-expand-all"></i>|expand-all||
|<i class="codicon codicon-extensions"></i>|extensions||
|<i class="codicon codicon-eye"></i>|eye||
|<i class="codicon codicon-eye-closed"></i>|eye-closed||
|<i class="codicon codicon-eye-unwatch"></i>|eye-unwatch||
|<i class="codicon codicon-eye-watch"></i>|eye-watch||
|<i class="codicon codicon-feedback"></i>|feedback||
|<i class="codicon codicon-file"></i>|file||
|<i class="codicon codicon-file-add"></i>|file-add||
|<i class="codicon codicon-file-binary"></i>|file-binary||
|<i class="codicon codicon-file-code"></i>|file-code||
|<i class="codicon codicon-file-directory"></i>|file-directory||
|<i class="codicon codicon-file-directory-create"></i>|file-directory-create||
|<i class="codicon codicon-file-media"></i>|file-media||
|<i class="codicon codicon-file-pdf"></i>|file-pdf||
|<i class="codicon codicon-file-submodule"></i>|file-submodule||
|<i class="codicon codicon-file-symlink-directory"></i>|file-symlink-directory||
|<i class="codicon codicon-file-symlink-file"></i>|file-symlink-file||
|<i class="codicon codicon-file-text"></i>|file-text||
|<i class="codicon codicon-file-zip"></i>|file-zip||
|<i class="codicon codicon-files"></i>|files||
|<i class="codicon codicon-filter"></i>|filter||
|<i class="codicon codicon-flame"></i>|flame||
|<i class="codicon codicon-fold"></i>|fold||
|<i class="codicon codicon-fold-down"></i>|fold-down||
|<i class="codicon codicon-fold-up"></i>|fold-up||
|<i class="codicon codicon-folder"></i>|folder||
|<i class="codicon codicon-folder-active"></i>|folder-active||
|<i class="codicon codicon-folder-opened"></i>|folder-opened||
|<i class="codicon codicon-gear"></i>|gear||
|<i class="codicon codicon-gift"></i>|gift||
|<i class="codicon codicon-gist"></i>|gist||
|<i class="codicon codicon-gist-fork"></i>|gist-fork||
|<i class="codicon codicon-gist-new"></i>|gist-new||
|<i class="codicon codicon-gist-private"></i>|gist-private||
|<i class="codicon codicon-gist-secret"></i>|gist-secret||
|<i class="codicon codicon-git-branch"></i>|git-branch||
|<i class="codicon codicon-git-branch-create"></i>|git-branch-create||
|<i class="codicon codicon-git-branch-delete"></i>|git-branch-delete||
|<i class="codicon codicon-git-commit"></i>|git-commit||
|<i class="codicon codicon-git-compare"></i>|git-compare||
|<i class="codicon codicon-git-fork-private"></i>|git-fork-private||
|<i class="codicon codicon-git-merge"></i>|git-merge||
|<i class="codicon codicon-git-pull-request"></i>|git-pull-request||
|<i class="codicon codicon-git-pull-request-abandoned"></i>|git-pull-request-abandoned||
|<i class="codicon codicon-github"></i>|github||
|<i class="codicon codicon-github-action"></i>|github-action||
|<i class="codicon codicon-github-alt"></i>|github-alt||
|<i class="codicon codicon-github-inverted"></i>|github-inverted||
|<i class="codicon codicon-globe"></i>|globe||
|<i class="codicon codicon-go-to-file"></i>|go-to-file||
|<i class="codicon codicon-grabber"></i>|grabber||
|<i class="codicon codicon-graph"></i>|graph||
|<i class="codicon codicon-gripper"></i>|gripper||
|<i class="codicon codicon-group-by-ref-type"></i>|group-by-ref-type||
|<i class="codicon codicon-heart"></i>|heart||
|<i class="codicon codicon-history"></i>|history||
|<i class="codicon codicon-home"></i>|home||
|<i class="codicon codicon-horizontal-rule"></i>|horizontal-rule||
|<i class="codicon codicon-hubot"></i>|hubot||
|<i class="codicon codicon-inbox"></i>|inbox||
|<i class="codicon codicon-info"></i>|info||
|<i class="codicon codicon-issue-closed"></i>|issue-closed||
|<i class="codicon codicon-issue-opened"></i>|issue-opened||
|<i class="codicon codicon-issue-reopened"></i>|issue-reopened||
|<i class="codicon codicon-issues"></i>|issues||
|<i class="codicon codicon-italic"></i>|italic||
|<i class="codicon codicon-jersey"></i>|jersey||
|<i class="codicon codicon-json"></i>|json||
|<i class="codicon codicon-kebab-horizontal"></i>|kebab-horizontal||
|<i class="codicon codicon-kebab-vertical"></i>|kebab-vertical||
|<i class="codicon codicon-key"></i>|key||
|<i class="codicon codicon-keyboard"></i>|keyboard||
|<i class="codicon codicon-law"></i>|law||
|<i class="codicon codicon-library"></i>|library||
|<i class="codicon codicon-light-bulb"></i>|light-bulb||
|<i class="codicon codicon-lightbulb"></i>|lightbulb||
|<i class="codicon codicon-lightbulb-autofix"></i>|lightbulb-autofix||
|<i class="codicon codicon-link"></i>|link||
|<i class="codicon codicon-link-external"></i>|link-external||
|<i class="codicon codicon-list-filter"></i>|list-filter||
|<i class="codicon codicon-list-flat"></i>|list-flat||
|<i class="codicon codicon-list-ordered"></i>|list-ordered||
|<i class="codicon codicon-list-selection"></i>|list-selection||
|<i class="codicon codicon-list-tree"></i>|list-tree||
|<i class="codicon codicon-list-unordered"></i>|list-unordered||
|<i class="codicon codicon-live-share"></i>|live-share||
|<i class="codicon codicon-loading"></i>|loading||
|<i class="codicon codicon-location"></i>|location||
|<i class="codicon codicon-lock"></i>|lock||
|<i class="codicon codicon-log-in"></i>|log-in||
|<i class="codicon codicon-log-out"></i>|log-out||
|<i class="codicon codicon-logo-github"></i>|logo-github||
|<i class="codicon codicon-mail"></i>|mail||
|<i class="codicon codicon-mail-read"></i>|mail-read||
|<i class="codicon codicon-mail-reply"></i>|mail-reply||
|<i class="codicon codicon-mark-github"></i>|mark-github||
|<i class="codicon codicon-markdown"></i>|markdown||
|<i class="codicon codicon-megaphone"></i>|megaphone||
|<i class="codicon codicon-mention"></i>|mention||
|<i class="codicon codicon-menu"></i>|menu||
|<i class="codicon codicon-microscope"></i>|microscope||
|<i class="codicon codicon-milestone"></i>|milestone||
|<i class="codicon codicon-mirror"></i>|mirror||
|<i class="codicon codicon-mirror-private"></i>|mirror-private||
|<i class="codicon codicon-mirror-public"></i>|mirror-public||
|<i class="codicon codicon-more"></i>|more||
|<i class="codicon codicon-mortar-board"></i>|mortar-board||
|<i class="codicon codicon-move"></i>|move||
|<i class="codicon codicon-multiple-windows"></i>|multiple-windows||
|<i class="codicon codicon-mute"></i>|mute||
|<i class="codicon codicon-new-file"></i>|new-file||
|<i class="codicon codicon-new-folder"></i>|new-folder||
|<i class="codicon codicon-no-newline"></i>|no-newline||
|<i class="codicon codicon-note"></i>|note||
|<i class="codicon codicon-octoface"></i>|octoface||
|<i class="codicon codicon-open-preview"></i>|open-preview||
|<i class="codicon codicon-organization"></i>|organization||
|<i class="codicon codicon-organization-filled"></i>|organization-filled||
|<i class="codicon codicon-organization-outline"></i>|organization-outline||
|<i class="codicon codicon-output"></i>|output||
|<i class="codicon codicon-package"></i>|package||
|<i class="codicon codicon-paintcan"></i>|paintcan||
|<i class="codicon codicon-pencil"></i>|pencil||
|<i class="codicon codicon-person"></i>|person||
|<i class="codicon codicon-person-add"></i>|person-add||
|<i class="codicon codicon-person-filled"></i>|person-filled||
|<i class="codicon codicon-person-follow"></i>|person-follow||
|<i class="codicon codicon-person-outline"></i>|person-outline||
|<i class="codicon codicon-pin"></i>|pin||
|<i class="codicon codicon-pinned"></i>|pinned||
|<i class="codicon codicon-play"></i>|play||
|<i class="codicon codicon-plug"></i>|plug||
|<i class="codicon codicon-plus"></i>|plus||
|<i class="codicon codicon-preserve-case"></i>|preserve-case||
|<i class="codicon codicon-preview"></i>|preview||
|<i class="codicon codicon-primitive-dot"></i>|primitive-dot||
|<i class="codicon codicon-primitive-square"></i>|primitive-square||
|<i class="codicon codicon-project"></i>|project||
|<i class="codicon codicon-pulse"></i>|pulse||
|<i class="codicon codicon-question"></i>|question||
|<i class="codicon codicon-quote"></i>|quote||
|<i class="codicon codicon-radio-tower"></i>|radio-tower||
|<i class="codicon codicon-reactions"></i>|reactions||
|<i class="codicon codicon-record-keys"></i>|record-keys||
|<i class="codicon codicon-references"></i>|references||
|<i class="codicon codicon-refresh"></i>|refresh||
|<i class="codicon codicon-regex"></i>|regex||
|<i class="codicon codicon-remote"></i>|remote||
|<i class="codicon codicon-remote-explorer"></i>|remote-explorer||
|<i class="codicon codicon-remove"></i>|remove||
|<i class="codicon codicon-remove-close"></i>|remove-close||
|<i class="codicon codicon-repl"></i>|repl||
|<i class="codicon codicon-replace"></i>|replace||
|<i class="codicon codicon-replace-all"></i>|replace-all||
|<i class="codicon codicon-reply"></i>|reply||
|<i class="codicon codicon-repo"></i>|repo||
|<i class="codicon codicon-repo-clone"></i>|repo-clone||
|<i class="codicon codicon-repo-create"></i>|repo-create||
|<i class="codicon codicon-repo-delete"></i>|repo-delete||
|<i class="codicon codicon-repo-force-push"></i>|repo-force-push||
|<i class="codicon codicon-repo-forked"></i>|repo-forked||
|<i class="codicon codicon-repo-pull"></i>|repo-pull||
|<i class="codicon codicon-repo-push"></i>|repo-push||
|<i class="codicon codicon-repo-sync"></i>|repo-sync||
|<i class="codicon codicon-report"></i>|report||
|<i class="codicon codicon-request-changes"></i>|request-changes||
|<i class="codicon codicon-rocket"></i>|rocket||
|<i class="codicon codicon-root-folder"></i>|root-folder||
|<i class="codicon codicon-root-folder-opened"></i>|root-folder-opened||
|<i class="codicon codicon-rss"></i>|rss||
|<i class="codicon codicon-ruby"></i>|ruby||
|<i class="codicon codicon-run"></i>|run||
|<i class="codicon codicon-run-all"></i>|run-all||
|<i class="codicon codicon-save"></i>|save||
|<i class="codicon codicon-save-all"></i>|save-all||
|<i class="codicon codicon-save-as"></i>|save-as||
|<i class="codicon codicon-screen-full"></i>|screen-full||
|<i class="codicon codicon-screen-normal"></i>|screen-normal||
|<i class="codicon codicon-search"></i>|search||
|<i class="codicon codicon-search-save"></i>|search-save||
|<i class="codicon codicon-search-stop"></i>|search-stop||
|<i class="codicon codicon-selection"></i>|selection||
|<i class="codicon codicon-server"></i>|server||
|<i class="codicon codicon-settings"></i>|settings||
|<i class="codicon codicon-settings-gear"></i>|settings-gear||
|<i class="codicon codicon-shield"></i>|shield||
|<i class="codicon codicon-sign-in"></i>|sign-in||
|<i class="codicon codicon-sign-out"></i>|sign-out||
|<i class="codicon codicon-smiley"></i>|smiley||
|<i class="codicon codicon-sort-precedence"></i>|sort-precedence||
|<i class="codicon codicon-source-control"></i>|source-control||
|<i class="codicon codicon-split-horizontal"></i>|split-horizontal||
|<i class="codicon codicon-split-vertical"></i>|split-vertical||
|<i class="codicon codicon-squirrel"></i>|squirrel||
|<i class="codicon codicon-star"></i>|star||
|<i class="codicon codicon-star-add"></i>|star-add||
|<i class="codicon codicon-star-delete"></i>|star-delete||
|<i class="codicon codicon-star-empty"></i>|star-empty||
|<i class="codicon codicon-star-full"></i>|star-full||
|<i class="codicon codicon-star-half"></i>|star-half||
|<i class="codicon codicon-stop"></i>|stop||
|<i class="codicon codicon-symbol-array"></i>|symbol-array||
|<i class="codicon codicon-symbol-boolean"></i>|symbol-boolean||
|<i class="codicon codicon-symbol-class"></i>|symbol-class||
|<i class="codicon codicon-symbol-color"></i>|symbol-color||
|<i class="codicon codicon-symbol-constant"></i>|symbol-constant||
|<i class="codicon codicon-symbol-constructor"></i>|symbol-constructor||
|<i class="codicon codicon-symbol-enum"></i>|symbol-enum||
|<i class="codicon codicon-symbol-enum-member"></i>|symbol-enum-member||
|<i class="codicon codicon-symbol-event"></i>|symbol-event||
|<i class="codicon codicon-symbol-field"></i>|symbol-field||
|<i class="codicon codicon-symbol-file"></i>|symbol-file||
|<i class="codicon codicon-symbol-folder"></i>|symbol-folder||
|<i class="codicon codicon-symbol-function"></i>|symbol-function||
|<i class="codicon codicon-symbol-interface"></i>|symbol-interface||
|<i class="codicon codicon-symbol-key"></i>|symbol-key||
|<i class="codicon codicon-symbol-keyword"></i>|symbol-keyword||
|<i class="codicon codicon-symbol-method"></i>|symbol-method||
|<i class="codicon codicon-symbol-misc"></i>|symbol-misc||
|<i class="codicon codicon-symbol-module"></i>|symbol-module||
|<i class="codicon codicon-symbol-namespace"></i>|symbol-namespace||
|<i class="codicon codicon-symbol-null"></i>|symbol-null||
|<i class="codicon codicon-symbol-number"></i>|symbol-number||
|<i class="codicon codicon-symbol-numeric"></i>|symbol-numeric||
|<i class="codicon codicon-symbol-object"></i>|symbol-object||
|<i class="codicon codicon-symbol-operator"></i>|symbol-operator||
|<i class="codicon codicon-symbol-package"></i>|symbol-package||
|<i class="codicon codicon-symbol-parameter"></i>|symbol-parameter||
|<i class="codicon codicon-symbol-property"></i>|symbol-property||
|<i class="codicon codicon-symbol-reference"></i>|symbol-reference||
|<i class="codicon codicon-symbol-ruler"></i>|symbol-ruler||
|<i class="codicon codicon-symbol-snippet"></i>|symbol-snippet||
|<i class="codicon codicon-symbol-string"></i>|symbol-string||
|<i class="codicon codicon-symbol-struct"></i>|symbol-struct||
|<i class="codicon codicon-symbol-structure"></i>|symbol-structure||
|<i class="codicon codicon-symbol-text"></i>|symbol-text||
|<i class="codicon codicon-symbol-type-parameter"></i>|symbol-type-parameter||
|<i class="codicon codicon-symbol-unit"></i>|symbol-unit||
|<i class="codicon codicon-symbol-value"></i>|symbol-value||
|<i class="codicon codicon-symbol-variable"></i>|symbol-variable||
|<i class="codicon codicon-sync"></i>|sync||
|<i class="codicon codicon-sync-ignored"></i>|sync-ignored||
|<i class="codicon codicon-tag"></i>|tag||
|<i class="codicon codicon-tag-add"></i>|tag-add||
|<i class="codicon codicon-tag-remove"></i>|tag-remove||
|<i class="codicon codicon-tasklist"></i>|tasklist||
|<i class="codicon codicon-telescope"></i>|telescope||
|<i class="codicon codicon-terminal"></i>|terminal||
|<i class="codicon codicon-text-size"></i>|text-size||
|<i class="codicon codicon-three-bars"></i>|three-bars||
|<i class="codicon codicon-thumbsdown"></i>|thumbsdown||
|<i class="codicon codicon-thumbsup"></i>|thumbsup||
|<i class="codicon codicon-tools"></i>|tools||
|<i class="codicon codicon-trash"></i>|trash||
|<i class="codicon codicon-trashcan"></i>|trashcan||
|<i class="codicon codicon-triangle-down"></i>|triangle-down||
|<i class="codicon codicon-triangle-left"></i>|triangle-left||
|<i class="codicon codicon-triangle-right"></i>|triangle-right||
|<i class="codicon codicon-triangle-up"></i>|triangle-up||
|<i class="codicon codicon-twitter"></i>|twitter||
|<i class="codicon codicon-unfold"></i>|unfold||
|<i class="codicon codicon-ungroup-by-ref-type"></i>|ungroup-by-ref-type||
|<i class="codicon codicon-unlock"></i>|unlock||
|<i class="codicon codicon-unmute"></i>|unmute||
|<i class="codicon codicon-unverified"></i>|unverified||
|<i class="codicon codicon-variable"></i>|variable||
|<i class="codicon codicon-verified"></i>|verified||
|<i class="codicon codicon-versions"></i>|versions||
|<i class="codicon codicon-vm"></i>|vm||
|<i class="codicon codicon-vm-active"></i>|vm-active||
|<i class="codicon codicon-vm-outline"></i>|vm-outline||
|<i class="codicon codicon-vm-running"></i>|vm-running||
|<i class="codicon codicon-warning"></i>|warning||
|<i class="codicon codicon-watch"></i>|watch||
|<i class="codicon codicon-whitespace"></i>|whitespace||
|<i class="codicon codicon-whole-word"></i>|whole-word||
|<i class="codicon codicon-window"></i>|window||
|<i class="codicon codicon-word-wrap"></i>|word-wrap||
|<i class="codicon codicon-wrench"></i>|wrench||
|<i class="codicon codicon-wrench-subaction"></i>|wrench-subaction||
|<i class="codicon codicon-x"></i>|x||
|<i class="codicon codicon-zap"></i>|zap||
|<i class="codicon codicon-zoom-in"></i>|zoom-in||
|<i class="codicon codicon-zoom-out"></i>|zoom-out||
</div>
