# VS Code Docs Writing Guidelines

## Introduction

These are our VS Code documentation writing style guidelines.

## General Style tips

* Get to the point fast.
* Talk like a person.
* Simpler is better.
* Be brief. Give customers just enough information to make decisions confidently. Prune every excess word.

## Capitalization

* Always capitalize proper nouns.
* Lowercase everything except the first word in a sentence, UI label, phrase, heading, or title (including the titles of blogs, articles, and press releases).
* Don’t capitalize the spelled-out form of an acronym unless it's a proper noun.
* Use title-style capitalization for product and service names, book and song titles, article titles in citations, names of blogs, and titles of people (Vice President, for example).
* In programming languages, follow the traditional capitalization of keywords and other special terms.
* Don't use all uppercase for emphasis.
* Don't use all lowercase as a design choice.
* Use sentence-style capitalization for everything except proper nouns.

## Grammar

* Use present-tense verbs—verbs that indicate the action is happening now, like is and open. Avoid will, was, and verbs ending in –ed, which indicate that text isn't in the present tense.
* For most content, write simple statements of fact (called the indicative mood). Use direct commands (imperative mood) for procedures and instructions. Use wishes, hypotheses, and suggestions (subjunctive mood) sparingly.
* Use active voice (where the subject performs the action) whenever you can. In passive voice, the receiver of the action is the subject.
* Match a verb with its subject in person and number.
* Use second person most of the time. Second person often uses the pronoun you, as though you're speaking to the reader.
* Don't use gender-specific singular pronouns (he or she) in generic references. Instead, use you or refer to someone's role.
* Be careful with words ending in –ing, which can play different roles in a phrase. For example, in the phrase meeting requirements, make sure it's clear whether this is a discussion about requirements for a meeting or how to meet requirements.
* Prepositional phrases modify something else in a sentence. For example, in The reading pane displays the content of the selected message, the phrase of the selected message modifies the content. Avoid using consecutive prepositional phrases. Long chains of prepositional phrases are hard to read and interpret.
* Modifiers are words or phrases that modify other words or phrases. Make sure it's clear what they modify. For example, in the phrase the selected text only is modified, the word only could modify text or is modified. Rewrite as only the selected text is modified to clarify.

## Numbers

* Spell out numbers for zero through nine, unless space is limited. Use numerals for 10 and above.
* Spell out numbers at the beginning of a sentence.
* Spell out ordinal numbers such as first, second, and third. Don't add -ly to form adverbs from ordinal numbers.
* Use numerals for numbers the user is directed to type, dimensions, time of day, percentages, coordinates, measurements of distance, temperature, volume, size, and so on.

## Procedures and instructions

### Numbered steps

* Write a complete sentence for each step: capitalize the first word and end the sentence with a period.
* Use imperative verb forms.
* Consider using a heading that tells customers what the procedure will help them do.
* Keep it short—ideally, fit the whole procedure on one screen. Omit unnecessary details. Combine simple actions that occur in the same place in the UI in a single step. Include actions that finalize a step, such as selecting the OK or Apply button, in related steps.
* Make sure the customer knows where the action in the step takes place. Provide a brief phrase if you need to, such as on the Design tab, …. Or provide an introductory step to avoid any confusion: On the ribbon, go to the Design tab.
* If there’s only one step, use the format you use for procedures with multiple steps, but replace the number with a bullet.
* If your editorial style guide allows it, abbreviate simple sequences of menu interactions with right angle brackets. Don’t use bold formatting for the brackets. Include a space before and after each one.

### Interactions with UI

Use the following verbs, which describe any input method—touch, mouse, keyboard, voice, and so on.

* Open, for apps, shortcut menus, files, and folders.
* Close, for apps, blades, dialog boxes, windows, files, and folders.
* Leave, for websites and webpages.
* Go to, for a menu or a particular place in the UI, like search, a ribbon, or a tab.
* Select, for UI options, values, links, and menu items.
* Select and hold, for pressing and holding an element in the UI for about a second.
* Clear, for removing the selection from a checkbox.
* Choose, for an exclusive option in a control where only one value can be chosen.
* Enter, for instructing the reader to type or otherwise enter a value.
* Specify, for instructing a reader to type or select a value, such as in a combo box (in content for technical audiences only).
* Move, for moving something from one place to another by dragging, pasting, or another method.
* Zoom, zoom in, zoom out, for changing the magnification of a screen or window.
* Avoid press, press and hold, and right-click if you can. Try to use an input-neutral verb instead.

## Punctuation

* Stick to short, simple sentences. Sentences that contain lots of punctuation tend to be complex and hard to read.
* End all sentences with a period, even if they're only two words.
* Use only one space after periods, question marks, exclamation marks, and colons.
* Include a colon at the end of a phrase that directly introduces a list.
    * If one or more list elements complete the introductory phrase preceding the colon, use a period after every list element.
    * If all list elements are short phrases (three words or fewer), don’t end them with periods, even if they form a complete sentence together with the list introduction.
    * If one or more list elements are complete sentences, use a period after every element, even if a list element contains three or fewer words.
* Include commas after every item in a series, including the last one.

* Use a comma following an introductory phrase, to join independent clauses with a conjunction, and to surround the year when you use a complete date within a sentence.

* Use an apostrophe to indicate a missing letter in a contraction (such as don’t) and to form the possessive case of a noun (as in Insider’s Guide). Don’t use an apostrophe for the possessive of it (its) to avoid confusion with the contraction it’s.

* When you use a colon in a sentence, lowercase the word that follows it unless it's a proper noun or the first word of a quotation.

* A sentence that contains a semicolon might be complex. Try to rewrite the sentence as multiple sentences or break it into a list.

* Use exclamation points sparingly. Save them for when they count.

* Use question marks sparingly. Customers expect us to give them answers.

* Place closing quotation marks outside commas and periods, inside other punctuation. Exception if punctuation is part of the quoted material, place it inside the quotation marks.

* In general, don’t use hyphens unless leaving them out could result in confusion.

* Don’t use spaces around em dashes (—).

* Don’t use a slash (/) to indicate a choice or as a substitute for or.

## Text formatting

* UI elements, like menu items, dialog names, and names of text boxes, should be in bold text.
* Use bold text for Git repo or branch names when selected or entered in instructions.
* Use italic text to introduce a new term along with a definition or explanation. Italicize the new term the first time you use it, and then use regular text for the definition or explanation.
* Use code style for:
    * Code elements, like method names, property names, and language keywords.
    * SQL commands.
    * NuGet package names.
    * Command-line commands.
    * Database table and column names.
    * Resource names (like virtual machine names) that shouldn't be localized.
    * URLs that you don't want to be selectable.
* In paragraph text or procedural steps, use italic for placeholder text that users substitute with their own information.
* For code placeholders, if you want users to replace part of an input string with their own values, use angle brackets (less than < and greater than > characters) on that placeholder text.
* Don't apply an inline style like italic, bold, or inline code style to headings.
* Don't apply inline style like italic or bold to link text. But when the link text contains a programming element, like a function or operator, enclose the link text in backticks.

## Alerts

* Alerts are a Markdown extension to create block quotes that render with colors and icons that indicate the significance of the content. The following alert types are supported:

    * `[!NOTE]` Information the user should notice even if skimming.
    * `[!TIP]` Optional information to help a user be more successful.
    * `[!IMPORTANT]` Essential information required for user success.
    * `[!CAUTION]` Negative potential consequences of an action.
    * `[!WARNING]` Dangerous certain consequences of an action.

## Links

* Links to other documentation articles should be relative, not absolute. Start relative links with `/docs/` and include the `.md` suffix.
* Links in release notes should be full URLs, not relative. Use the `https://code.visualstudio.com/docs/` domain.
* Links to bookmarks within the same article should be relative and start with `#`.
* Link descriptions should be descriptive and make sense on their own. Don't use "click here" or "this link" or "here".
