---
# DO NOT TOUCH — Managed by doc writer
ContentId: 109a10fc-2d64-44b6-98ce-b8375d245776
DateApproved: 7/3/2019

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Octicon reference that lists all octicons supported in VS Code
---

# Icons in Labels

You can use [Octicons](https://octicons.github.com/) in your extension using the [`StatusBarItem`](https://code.visualstudio.com/api/references/vscode-api#StatusBarItem) text and [`QuickPickItem`](https://code.visualstudio.com/api/references/vscode-api#QuickPickItem) label API. The syntax for adding an icon is:

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

Below are the full listings of the icons that ships with the product:

### Table Listing

<div id="octicon-listing">

| preview                                                | name                   |
| ------------------------------------------------------ | ---------------------- |
| <i class="octicon octicon-alert"></i>                  | alert                  |
| <i class="octicon octicon-archive"></i>                | archive                |
| <i class="octicon octicon-arrow-both"></i>             | arrow-both             |
| <i class="octicon octicon-arrow-down"></i>             | arrow-down             |
| <i class="octicon octicon-arrow-left"></i>             | arrow-left             |
| <i class="octicon octicon-arrow-right"></i>            | arrow-right            |
| <i class="octicon octicon-arrow-small-down"></i>       | arrow-small-down       |
| <i class="octicon octicon-arrow-small-left"></i>       | arrow-small-left       |
| <i class="octicon octicon-arrow-small-right"></i>      | arrow-small-right      |
| <i class="octicon octicon-arrow-small-up"></i>         | arrow-small-up         |
| <i class="octicon octicon-arrow-up"></i>               | arrow-up               |
| <i class="octicon octicon-beaker"></i>                 | beaker                 |
| <i class="octicon octicon-bell"></i>                   | bell                   |
| <i class="octicon octicon-bold"></i>                   | bold                   |
| <i class="octicon octicon-book"></i>                   | book                   |
| <i class="octicon octicon-bookmark"></i>               | bookmark               |
| <i class="octicon octicon-briefcase"></i>              | briefcase              |
| <i class="octicon octicon-broadcast"></i>              | broadcast              |
| <i class="octicon octicon-browser"></i>                | browser                |
| <i class="octicon octicon-bug"></i>                    | bug                    |
| <i class="octicon octicon-calendar"></i>               | calendar               |
| <i class="octicon octicon-check"></i>                  | check                  |
| <i class="octicon octicon-checklist"></i>              | checklist              |
| <i class="octicon octicon-chevron-down"></i>           | chevron-down           |
| <i class="octicon octicon-chevron-left"></i>           | chevron-left           |
| <i class="octicon octicon-chevron-right"></i>          | chevron-right          |
| <i class="octicon octicon-chevron-up"></i>             | chevron-up             |
| <i class="octicon octicon-circle-slash"></i>           | circle-slash           |
| <i class="octicon octicon-circuit-board"></i>          | circuit-board          |
| <i class="octicon octicon-clippy"></i>                 | clippy                 |
| <i class="octicon octicon-clock"></i>                  | clock                  |
| <i class="octicon octicon-clone"></i>                  | clone                  |
| <i class="octicon octicon-cloud-download"></i>         | cloud-download         |
| <i class="octicon octicon-cloud-upload"></i>           | cloud-upload           |
| <i class="octicon octicon-code"></i>                   | code                   |
| <i class="octicon octicon-color-mode"></i>             | color-mode             |
| <i class="octicon octicon-comment"></i>                | comment                |
| <i class="octicon octicon-comment-discussion"></i>     | comment-discussion     |
| <i class="octicon octicon-credit-card"></i>            | credit-card            |
| <i class="octicon octicon-dash"></i>                   | dash                   |
| <i class="octicon octicon-dashboard"></i>              | dashboard              |
| <i class="octicon octicon-database"></i>               | database               |
| <i class="octicon octicon-desktop-download"></i>       | desktop-download       |
| <i class="octicon octicon-device-camera"></i>          | device-camera          |
| <i class="octicon octicon-device-camera-video"></i>    | device-camera-video    |
| <i class="octicon octicon-device-desktop"></i>         | device-desktop         |
| <i class="octicon octicon-device-mobile"></i>          | device-mobile          |
| <i class="octicon octicon-diff"></i>                   | diff                   |
| <i class="octicon octicon-diff-added"></i>             | diff-added             |
| <i class="octicon octicon-diff-ignored"></i>           | diff-ignored           |
| <i class="octicon octicon-diff-modified"></i>          | diff-modified          |
| <i class="octicon octicon-diff-removed"></i>           | diff-removed           |
| <i class="octicon octicon-diff-renamed"></i>           | diff-renamed           |
| <i class="octicon octicon-ellipsis"></i>               | ellipsis               |
| <i class="octicon octicon-eye"></i>                    | eye                    |
| <i class="octicon octicon-eye-closed"></i>             | eye-closed             |
| <i class="octicon octicon-file"></i>                   | file                   |
| <i class="octicon octicon-file-add"></i>               | file-add               |
| <i class="octicon octicon-file-binary"></i>            | file-binary            |
| <i class="octicon octicon-file-code"></i>              | file-code              |
| <i class="octicon octicon-file-directory"></i>         | file-directory         |
| <i class="octicon octicon-file-directory-create"></i>  | file-directory-create  |
| <i class="octicon octicon-file-media"></i>             | file-media             |
| <i class="octicon octicon-file-pdf"></i>               | file-pdf               |
| <i class="octicon octicon-file-submodule"></i>         | file-submodule         |
| <i class="octicon octicon-file-symlink-directory"></i> | file-symlink-directory |
| <i class="octicon octicon-file-symlink-file"></i>      | file-symlink-file      |
| <i class="octicon octicon-file-text"></i>              | file-text              |
| <i class="octicon octicon-file-zip"></i>               | file-zip               |
| <i class="octicon octicon-flame"></i>                  | flame                  |
| <i class="octicon octicon-fold"></i>                   | fold                   |
| <i class="octicon octicon-fold-down"></i>              | fold-down              |
| <i class="octicon octicon-fold-up"></i>                | fold-up                |
| <i class="octicon octicon-gear"></i>                   | gear                   |
| <i class="octicon octicon-gift"></i>                   | gift                   |
| <i class="octicon octicon-gist"></i>                   | gist                   |
| <i class="octicon octicon-gist-fork"></i>              | gist-fork              |
| <i class="octicon octicon-gist-new"></i>               | gist-new               |
| <i class="octicon octicon-gist-private"></i>           | gist-private           |
| <i class="octicon octicon-gist-secret"></i>            | gist-secret            |
| <i class="octicon octicon-git-branch"></i>             | git-branch             |
| <i class="octicon octicon-git-commit"></i>             | git-commit             |
| <i class="octicon octicon-git-compare"></i>            | git-compare            |
| <i class="octicon octicon-git-fork-private"></i>       | git-fork-private       |
| <i class="octicon octicon-git-merge"></i>              | git-merge              |
| <i class="octicon octicon-git-pull-request"></i>       | git-pull-request       |
| <i class="octicon octicon-github-action"></i>          | github-action          |
| <i class="octicon octicon-globe"></i>                  | globe                  |
| <i class="octicon octicon-grabber"></i>                | grabber                |
| <i class="octicon octicon-graph"></i>                  | graph                  |
| <i class="octicon octicon-heart"></i>                  | heart                  |
| <i class="octicon octicon-history"></i>                | history                |
| <i class="octicon octicon-home"></i>                   | home                   |
| <i class="octicon octicon-horizontal-rule"></i>        | horizontal-rule        |
| <i class="octicon octicon-hubot"></i>                  | hubot                  |
| <i class="octicon octicon-inbox"></i>                  | inbox                  |
| <i class="octicon octicon-info"></i>                   | info                   |
| <i class="octicon octicon-issue-closed"></i>           | issue-closed           |
| <i class="octicon octicon-issue-opened"></i>           | issue-opened           |
| <i class="octicon octicon-issue-reopened"></i>         | issue-reopened         |
| <i class="octicon octicon-italic"></i>                 | italic                 |
| <i class="octicon octicon-jersey"></i>                 | jersey                 |
| <i class="octicon octicon-kebab-horizontal"></i>       | kebab-horizontal       |
| <i class="octicon octicon-kebab-vertical"></i>         | kebab-vertical         |
| <i class="octicon octicon-key"></i>                    | key                    |
| <i class="octicon octicon-keyboard"></i>               | keyboard               |
| <i class="octicon octicon-law"></i>                    | law                    |
| <i class="octicon octicon-light-bulb"></i>             | light-bulb             |
| <i class="octicon octicon-link"></i>                   | link                   |
| <i class="octicon octicon-link-external"></i>          | link-external          |
| <i class="octicon octicon-list-ordered"></i>           | list-ordered           |
| <i class="octicon octicon-list-unordered"></i>         | list-unordered         |
| <i class="octicon octicon-location"></i>               | location               |
| <i class="octicon octicon-lock"></i>                   | lock                   |
| <i class="octicon octicon-log-in"></i>                 | log-in                 |
| <i class="octicon octicon-log-out"></i>                | log-out                |
| <i class="octicon octicon-logo-github"></i>            | logo-github            |
| <i class="octicon octicon-mail"></i>                   | mail                   |
| <i class="octicon octicon-mail-read"></i>              | mail-read              |
| <i class="octicon octicon-mail-reply"></i>             | mail-reply             |
| <i class="octicon octicon-mark-github"></i>            | mark-github            |
| <i class="octicon octicon-markdown"></i>               | markdown               |
| <i class="octicon octicon-megaphone"></i>              | megaphone              |
| <i class="octicon octicon-mention"></i>                | mention                |
| <i class="octicon octicon-microscope"></i>             | microscope             |
| <i class="octicon octicon-milestone"></i>              | milestone              |
| <i class="octicon octicon-mirror"></i>                 | mirror                 |
| <i class="octicon octicon-mirror-private"></i>         | mirror-private         |
| <i class="octicon octicon-mirror-public"></i>          | mirror-public          |
| <i class="octicon octicon-mortar-board"></i>           | mortar-board           |
| <i class="octicon octicon-mute"></i>                   | mute                   |
| <i class="octicon octicon-no-newline"></i>             | no-newline             |
| <i class="octicon octicon-note"></i>                   | note                   |
| <i class="octicon octicon-octoface"></i>               | octoface               |
| <i class="octicon octicon-organization"></i>           | organization           |
| <i class="octicon octicon-organization-filled"></i>    | organization-filled    |
| <i class="octicon octicon-package"></i>                | package                |
| <i class="octicon octicon-paintcan"></i>               | paintcan               |
| <i class="octicon octicon-pencil"></i>                 | pencil                 |
| <i class="octicon octicon-person"></i>                 | person                 |
| <i class="octicon octicon-person-filled"></i>          | person-filled          |
| <i class="octicon octicon-pin"></i>                    | pin                    |
| <i class="octicon octicon-play"></i>                   | play                   |
| <i class="octicon octicon-plug"></i>                   | plug                   |
| <i class="octicon octicon-plus"></i>                   | plus                   |
| <i class="octicon octicon-primitive-dot"></i>          | primitive-dot          |
| <i class="octicon octicon-primitive-square"></i>       | primitive-square       |
| <i class="octicon octicon-project"></i>                | project                |
| <i class="octicon octicon-pulse"></i>                  | pulse                  |
| <i class="octicon octicon-question"></i>               | question               |
| <i class="octicon octicon-quote"></i>                  | quote                  |
| <i class="octicon octicon-radio-tower"></i>            | radio-tower            |
| <i class="octicon octicon-remove-close"></i>           | remove-close           |
| <i class="octicon octicon-reply"></i>                  | reply                  |
| <i class="octicon octicon-repo"></i>                   | repo                   |
| <i class="octicon octicon-repo-clone"></i>             | repo-clone             |
| <i class="octicon octicon-repo-create"></i>            | repo-create            |
| <i class="octicon octicon-repo-force-push"></i>        | repo-force-push        |
| <i class="octicon octicon-repo-forked"></i>            | repo-forked            |
| <i class="octicon octicon-repo-pull"></i>              | repo-pull              |
| <i class="octicon octicon-repo-push"></i>              | repo-push              |
| <i class="octicon octicon-repo-sync"></i>              | repo-sync              |
| <i class="octicon octicon-report"></i>                 | report                 |
| <i class="octicon octicon-request-changes"></i>        | request-changes        |
| <i class="octicon octicon-rocket"></i>                 | rocket                 |
| <i class="octicon octicon-rss"></i>                    | rss                    |
| <i class="octicon octicon-ruby"></i>                   | ruby                   |
| <i class="octicon octicon-screen-full"></i>            | screen-full            |
| <i class="octicon octicon-screen-normal"></i>          | screen-normal          |
| <i class="octicon octicon-search"></i>                 | search                 |
| <i class="octicon octicon-server"></i>                 | server                 |
| <i class="octicon octicon-settings"></i>               | settings               |
| <i class="octicon octicon-shield"></i>                 | shield                 |
| <i class="octicon octicon-sign-in"></i>                | sign-in                |
| <i class="octicon octicon-sign-out"></i>               | sign-out               |
| <i class="octicon octicon-smiley"></i>                 | smiley                 |
| <i class="octicon octicon-squirrel"></i>               | squirrel               |
| <i class="octicon octicon-star"></i>                   | star                   |
| <i class="octicon octicon-stop"></i>                   | stop                   |
| <i class="octicon octicon-sync"></i>                   | sync                   |
| <i class="octicon octicon-tag"></i>                    | tag                    |
| <i class="octicon octicon-tasklist"></i>               | tasklist               |
| <i class="octicon octicon-telescope"></i>              | telescope              |
| <i class="octicon octicon-terminal"></i>               | terminal               |
| <i class="octicon octicon-text-size"></i>              | text-size              |
| <i class="octicon octicon-three-bars"></i>             | three-bars             |
| <i class="octicon octicon-thumbsdown"></i>             | thumbsdown             |
| <i class="octicon octicon-thumbsup"></i>               | thumbsup               |
| <i class="octicon octicon-tools"></i>                  | tools                  |
| <i class="octicon octicon-trashcan"></i>               | trashcan               |
| <i class="octicon octicon-triangle-down"></i>          | triangle-down          |
| <i class="octicon octicon-triangle-left"></i>          | triangle-left          |
| <i class="octicon octicon-triangle-right"></i>         | triangle-right         |
| <i class="octicon octicon-triangle-up"></i>            | triangle-up            |
| <i class="octicon octicon-unfold"></i>                 | unfold                 |
| <i class="octicon octicon-unmute"></i>                 | unmute                 |
| <i class="octicon octicon-unverified"></i>             | unverified             |
| <i class="octicon octicon-verified"></i>               | verified               |
| <i class="octicon octicon-versions"></i>               | versions               |
| <i class="octicon octicon-watch"></i>                  | watch                  |
| <i class="octicon octicon-x"></i>                      | x                      |
| <i class="octicon octicon-zap"></i>                    | zap                    |

### Grid Listing

<div id="octicon-grid">

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-alert"></i>
    </span>
    <br>
    <span class='label'>alert</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-archive"></i>
    </span>
    <br>
    <span class='label'>archive</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-arrow-both"></i>
    </span>
    <br>
    <span class='label'>arrow-both</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-arrow-down"></i>
    </span>
    <br>
    <span class='label'>arrow-down</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-arrow-left"></i>
    </span>
    <br>
    <span class='label'>arrow-left</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-arrow-right"></i>
    </span>
    <br>
    <span class='label'>arrow-right</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-arrow-small-down"></i>
    </span>
    <br>
    <span class='label'>arrow-small-down</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-arrow-small-left"></i>
    </span>
    <br>
    <span class='label'>arrow-small-left</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-arrow-small-right"></i>
    </span>
    <br>
    <span class='label'>arrow-small-right</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-arrow-small-up"></i>
    </span>
    <br>
    <span class='label'>arrow-small-up</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-arrow-up"></i>
    </span>
    <br>
    <span class='label'>arrow-up</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-beaker"></i>
    </span>
    <br>
    <span class='label'>beaker</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-bell"></i>
    </span>
    <br>
    <span class='label'>bell</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-bold"></i>
    </span>
    <br>
    <span class='label'>bold</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-book"></i>
    </span>
    <br>
    <span class='label'>book</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-bookmark"></i>
    </span>
    <br>
    <span class='label'>bookmark</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-briefcase"></i>
    </span>
    <br>
    <span class='label'>briefcase</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-broadcast"></i>
    </span>
    <br>
    <span class='label'>broadcast</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-browser"></i>
    </span>
    <br>
    <span class='label'>browser</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-bug"></i>
    </span>
    <br>
    <span class='label'>bug</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-calendar"></i>
    </span>
    <br>
    <span class='label'>calendar</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-check"></i>
    </span>
    <br>
    <span class='label'>check</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-checklist"></i>
    </span>
    <br>
    <span class='label'>checklist</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-chevron-down"></i>
    </span>
    <br>
    <span class='label'>chevron-down</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-chevron-left"></i>
    </span>
    <br>
    <span class='label'>chevron-left</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-chevron-right"></i>
    </span>
    <br>
    <span class='label'>chevron-right</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-chevron-up"></i>
    </span>
    <br>
    <span class='label'>chevron-up</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-circle-slash"></i>
    </span>
    <br>
    <span class='label'>circle-slash</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-circuit-board"></i>
    </span>
    <br>
    <span class='label'>circuit-board</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-clippy"></i>
    </span>
    <br>
    <span class='label'>clippy</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-clock"></i>
    </span>
    <br>
    <span class='label'>clock</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-cloud-download"></i>
    </span>
    <br>
    <span class='label'>cloud-download</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-cloud-upload"></i>
    </span>
    <br>
    <span class='label'>cloud-upload</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-code"></i>
    </span>
    <br>
    <span class='label'>code</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-color-mode"></i>
    </span>
    <br>
    <span class='label'>color-mode</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-comment-discussion"></i>
    </span>
    <br>
    <span class='label'>comment-discussion</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-comment"></i>
    </span>
    <br>
    <span class='label'>comment</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-credit-card"></i>
    </span>
    <br>
    <span class='label'>credit-card</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-dash"></i>
    </span>
    <br>
    <span class='label'>dash</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-dashboard"></i>
    </span>
    <br>
    <span class='label'>dashboard</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-database"></i>
    </span>
    <br>
    <span class='label'>database</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-desktop-download"></i>
    </span>
    <br>
    <span class='label'>desktop-download</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-device-camera-video"></i>
    </span>
    <br>
    <span class='label'>device-camera-video</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-device-camera"></i>
    </span>
    <br>
    <span class='label'>device-camera</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-device-desktop"></i>
    </span>
    <br>
    <span class='label'>device-desktop</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-device-mobile"></i>
    </span>
    <br>
    <span class='label'>device-mobile</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-diff-added"></i>
    </span>
    <br>
    <span class='label'>diff-added</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-diff-ignored"></i>
    </span>
    <br>
    <span class='label'>diff-ignored</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-diff-modified"></i>
    </span>
    <br>
    <span class='label'>diff-modified</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-diff-removed"></i>
    </span>
    <br>
    <span class='label'>diff-removed</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-diff-renamed"></i>
    </span>
    <br>
    <span class='label'>diff-renamed</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-diff"></i>
    </span>
    <br>
    <span class='label'>diff</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-ellipsis"></i>
    </span>
    <br>
    <span class='label'>ellipsis</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-eye-closed"></i>
    </span>
    <br>
    <span class='label'>eye-closed</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-eye"></i>
    </span>
    <br>
    <span class='label'>eye</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-file-binary"></i>
    </span>
    <br>
    <span class='label'>file-binary</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-file-code"></i>
    </span>
    <br>
    <span class='label'>file-code</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-file-directory"></i>
    </span>
    <br>
    <span class='label'>file-directory</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-file-media"></i>
    </span>
    <br>
    <span class='label'>file-media</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-file-pdf"></i>
    </span>
    <br>
    <span class='label'>file-pdf</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-file-submodule"></i>
    </span>
    <br>
    <span class='label'>file-submodule</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-file-symlink-directory"></i>
    </span>
    <br>
    <span class='label'>file-symlink-directory</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-file-symlink-file"></i>
    </span>
    <br>
    <span class='label'>file-symlink-file</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-file-zip"></i>
    </span>
    <br>
    <span class='label'>file-zip</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-file"></i>
    </span>
    <br>
    <span class='label'>file</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-flame"></i>
    </span>
    <br>
    <span class='label'>flame</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-fold-down"></i>
    </span>
    <br>
    <span class='label'>fold-down</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-fold-up"></i>
    </span>
    <br>
    <span class='label'>fold-up</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-fold"></i>
    </span>
    <br>
    <span class='label'>fold</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-gear"></i>
    </span>
    <br>
    <span class='label'>gear</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-gift"></i>
    </span>
    <br>
    <span class='label'>gift</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-gist-secret"></i>
    </span>
    <br>
    <span class='label'>gist-secret</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-gist"></i>
    </span>
    <br>
    <span class='label'>gist</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-git-branch"></i>
    </span>
    <br>
    <span class='label'>git-branch</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-git-commit"></i>
    </span>
    <br>
    <span class='label'>git-commit</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-git-compare"></i>
    </span>
    <br>
    <span class='label'>git-compare</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-git-merge"></i>
    </span>
    <br>
    <span class='label'>git-merge</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-git-pull-request"></i>
    </span>
    <br>
    <span class='label'>git-pull-request</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-github-action"></i>
    </span>
    <br>
    <span class='label'>github-action</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-globe"></i>
    </span>
    <br>
    <span class='label'>globe</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-grabber"></i>
    </span>
    <br>
    <span class='label'>grabber</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-graph"></i>
    </span>
    <br>
    <span class='label'>graph</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-heart"></i>
    </span>
    <br>
    <span class='label'>heart</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-history"></i>
    </span>
    <br>
    <span class='label'>history</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-home"></i>
    </span>
    <br>
    <span class='label'>home</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-horizontal-rule"></i>
    </span>
    <br>
    <span class='label'>horizontal-rule</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-hubot"></i>
    </span>
    <br>
    <span class='label'>hubot</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-inbox"></i>
    </span>
    <br>
    <span class='label'>inbox</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-info"></i>
    </span>
    <br>
    <span class='label'>info</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-issue-closed"></i>
    </span>
    <br>
    <span class='label'>issue-closed</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-issue-opened"></i>
    </span>
    <br>
    <span class='label'>issue-opened</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-issue-reopened"></i>
    </span>
    <br>
    <span class='label'>issue-reopened</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-italic"></i>
    </span>
    <br>
    <span class='label'>italic</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-jersey"></i>
    </span>
    <br>
    <span class='label'>jersey</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-kebab-horizontal"></i>
    </span>
    <br>
    <span class='label'>kebab-horizontal</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-kebab-vertical"></i>
    </span>
    <br>
    <span class='label'>kebab-vertical</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-key"></i>
    </span>
    <br>
    <span class='label'>key</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-keyboard"></i>
    </span>
    <br>
    <span class='label'>keyboard</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-law"></i>
    </span>
    <br>
    <span class='label'>law</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-light-bulb"></i>
    </span>
    <br>
    <span class='label'>light-bulb</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-link-external"></i>
    </span>
    <br>
    <span class='label'>link-external</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-link"></i>
    </span>
    <br>
    <span class='label'>link</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-list-ordered"></i>
    </span>
    <br>
    <span class='label'>list-ordered</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-list-unordered"></i>
    </span>
    <br>
    <span class='label'>list-unordered</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-location"></i>
    </span>
    <br>
    <span class='label'>location</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-lock"></i>
    </span>
    <br>
    <span class='label'>lock</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-logo-github"></i>
    </span>
    <br>
    <span class='label'>logo-github</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-mail-read"></i>
    </span>
    <br>
    <span class='label'>mail-read</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-mail"></i>
    </span>
    <br>
    <span class='label'>mail</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-mark-github"></i>
    </span>
    <br>
    <span class='label'>mark-github</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-markdown"></i>
    </span>
    <br>
    <span class='label'>markdown</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-megaphone"></i>
    </span>
    <br>
    <span class='label'>megaphone</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-mention"></i>
    </span>
    <br>
    <span class='label'>mention</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-milestone"></i>
    </span>
    <br>
    <span class='label'>milestone</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-mirror"></i>
    </span>
    <br>
    <span class='label'>mirror</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-mortar-board"></i>
    </span>
    <br>
    <span class='label'>mortar-board</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-mute"></i>
    </span>
    <br>
    <span class='label'>mute</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-no-newline"></i>
    </span>
    <br>
    <span class='label'>no-newline</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-note"></i>
    </span>
    <br>
    <span class='label'>note</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-octoface"></i>
    </span>
    <br>
    <span class='label'>octoface</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-organization-filled"></i>
    </span>
    <br>
    <span class='label'>organization-filled</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-organization-outline"></i>
    </span>
    <br>
    <span class='label'>organization-outline</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-package"></i>
    </span>
    <br>
    <span class='label'>package</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-paintcan"></i>
    </span>
    <br>
    <span class='label'>paintcan</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-pencil"></i>
    </span>
    <br>
    <span class='label'>pencil</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-person-filled"></i>
    </span>
    <br>
    <span class='label'>person-filled</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-person-outline"></i>
    </span>
    <br>
    <span class='label'>person-outline</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-pin"></i>
    </span>
    <br>
    <span class='label'>pin</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-play"></i>
    </span>
    <br>
    <span class='label'>play</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-plug"></i>
    </span>
    <br>
    <span class='label'>plug</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-plus"></i>
    </span>
    <br>
    <span class='label'>plus</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-primitive-dot"></i>
    </span>
    <br>
    <span class='label'>primitive-dot</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-primitive-square"></i>
    </span>
    <br>
    <span class='label'>primitive-square</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-project"></i>
    </span>
    <br>
    <span class='label'>project</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-pulse"></i>
    </span>
    <br>
    <span class='label'>pulse</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-question"></i>
    </span>
    <br>
    <span class='label'>question</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-quote"></i>
    </span>
    <br>
    <span class='label'>quote</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-radio-tower"></i>
    </span>
    <br>
    <span class='label'>radio-tower</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-reply"></i>
    </span>
    <br>
    <span class='label'>reply</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-repo-clone"></i>
    </span>
    <br>
    <span class='label'>repo-clone</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-repo-force-push"></i>
    </span>
    <br>
    <span class='label'>repo-force-push</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-repo-forked"></i>
    </span>
    <br>
    <span class='label'>repo-forked</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-repo-pull"></i>
    </span>
    <br>
    <span class='label'>repo-pull</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-repo-push"></i>
    </span>
    <br>
    <span class='label'>repo-push</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-repo"></i>
    </span>
    <br>
    <span class='label'>repo</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-report"></i>
    </span>
    <br>
    <span class='label'>report</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-request-changes"></i>
    </span>
    <br>
    <span class='label'>request-changes</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-rocket"></i>
    </span>
    <br>
    <span class='label'>rocket</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-rss"></i>
    </span>
    <br>
    <span class='label'>rss</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-ruby"></i>
    </span>
    <br>
    <span class='label'>ruby</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-screen-full"></i>
    </span>
    <br>
    <span class='label'>screen-full</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-screen-normal"></i>
    </span>
    <br>
    <span class='label'>screen-normal</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-search"></i>
    </span>
    <br>
    <span class='label'>search</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-server"></i>
    </span>
    <br>
    <span class='label'>server</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-settings"></i>
    </span>
    <br>
    <span class='label'>settings</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-shield"></i>
    </span>
    <br>
    <span class='label'>shield</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-sign-in"></i>
    </span>
    <br>
    <span class='label'>sign-in</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-sign-out"></i>
    </span>
    <br>
    <span class='label'>sign-out</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-smiley"></i>
    </span>
    <br>
    <span class='label'>smiley</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-squirrel"></i>
    </span>
    <br>
    <span class='label'>squirrel</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-star"></i>
    </span>
    <br>
    <span class='label'>star</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-stop"></i>
    </span>
    <br>
    <span class='label'>stop</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-sync"></i>
    </span>
    <br>
    <span class='label'>sync</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-tag"></i>
    </span>
    <br>
    <span class='label'>tag</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-tasklist"></i>
    </span>
    <br>
    <span class='label'>tasklist</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-telescope"></i>
    </span>
    <br>
    <span class='label'>telescope</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-terminal"></i>
    </span>
    <br>
    <span class='label'>terminal</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-text-size"></i>
    </span>
    <br>
    <span class='label'>text-size</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-three-bars"></i>
    </span>
    <br>
    <span class='label'>three-bars</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-thumbsdown"></i>
    </span>
    <br>
    <span class='label'>thumbsdown</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-thumbsup"></i>
    </span>
    <br>
    <span class='label'>thumbsup</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-tools"></i>
    </span>
    <br>
    <span class='label'>tools</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-trashcan"></i>
    </span>
    <br>
    <span class='label'>trashcan</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-triangle-down"></i>
    </span>
    <br>
    <span class='label'>triangle-down</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-triangle-left"></i>
    </span>
    <br>
    <span class='label'>triangle-left</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-triangle-right"></i>
    </span>
    <br>
    <span class='label'>triangle-right</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-triangle-up"></i>
    </span>
    <br>
    <span class='label'>triangle-up</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-unfold"></i>
    </span>
    <br>
    <span class='label'>unfold</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-unmute"></i>
    </span>
    <br>
    <span class='label'>unmute</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-unverified"></i>
    </span>
    <br>
    <span class='label'>unverified</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-verified"></i>
    </span>
    <br>
    <span class='label'>verified</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-versions"></i>
    </span>
    <br>
    <span class='label'>versions</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-watch"></i>
    </span>
    <br>
    <span class='label'>watch</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-x"></i>
    </span>
    <br>
    <span class='label'>x</span>
</div>

<div class="preview">
    <span class="inner">
        <i class="octicon octicon-zap"></i>
    </span>
    <br>
    <span class='label'>zap</span>
</div>

</div>

</div>
