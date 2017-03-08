---
Order: 6
Area: extensionapi
TOCTitle: API vscode namespace
ContentId: 8CEBCDF8-4F0A-4C81-A904-3DEA43480EA6
PageTitle: Visual Studio Code API Reference
DateApproved: 4/14/2016
MetaDescription: Visual Studio Code extensions (plug-ins) API Reference.  
---

# vscode namespace API
## commands



<div class="comment"><p>Namespace for dealing with commands. In short, a command is a function with a
unique identifier. The function is sometimes also called <em>command handler</em>.</p>
<p>Commands can be added to the editor using the <a href="#commands.registerCommand">registerCommand</a>
and <a href="#commands.registerTextEditorCommand">registerTextEditorCommand</a> functions. Commands
can be executed <a href="#commands.executeCommand">manually</a> or from a UI gesture. Those are:</p>
<ul>
<li>palette - Use the <code>commands</code>-section in <code>package.json</code> to make a command show in
the <a href="https://code.visualstudio.com/docs/editor/codebasics#_command-palette">command palette</a>.</li>
<li>keybinding - Use the <code>keybindings</code>-section in <code>package.json</code> to enable
<a href="https://code.visualstudio.com/docs/customization/keybindings#_customizing-shortcuts">keybindings</a>
for your extension.</li>
</ul>
<p>Commands from other extensions and from the editor itself are accessible to an extension. However,
when invoking an editor command not all argument types are supported.</p>
<p>This is a sample that registers a command handler and adds an entry for that command to the palette. First
register a command handler with the identfier <code>extension.sayHello</code>.</p>

<pre><code class="lang-javascript">commands.registerCommand(<span class="hljs-string">'extension.sayHello'</span>, () =&gt; {
        <span class="hljs-built_in">window</span>.showInformationMessage(<span class="hljs-string">'Hello World!'</span>);
});
</code></pre>
<p>Second, bind the command identfier to a title under which it will show in the palette (<code>package.json</code>).</p>

<pre><code class="lang-json">{
"<span class="hljs-attribute">contributes</span>": <span class="hljs-value">{
        "<span class="hljs-attribute">commands</span>": <span class="hljs-value">[{
        "<span class="hljs-attribute">command</span>": <span class="hljs-value"><span class="hljs-string">"extension.sayHello"</span></span>,
        "<span class="hljs-attribute">title</span>": <span class="hljs-value"><span class="hljs-string">"Hello World"</span>
    </span>}]
</span>}</span>
</code></pre>
</div>

#### Functions



<a name="commands.executeCommand"></a><span class="ts" id=905 data-target="#details-905" data-toggle="collapse"><span class="ident">executeCommand</span><span>&lt;</span>T<span>&gt;</span><span>(</span><span class="ident">command</span><span>: </span><a class="type-instrinct">string</a>, <span>...</span><span class="ident">rest</span><span>: </span><a class="type-instrinct">any</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">T</a>&gt;</span>
<div class="details collapse" id="details-905">
<div class="comment"><p>Executes the command denoted by the given command identifier.</p>
<p>When executing an editor command not all types are allowed to
be passed as arguments. Allowed are the primitive types <code>string</code>, <code>boolean</code>,
<code>number</code>, <code>undefined</code>, and <code>null</code>, as well as classes defined in this API.
There are no restrictions when executing commands that have been contributed
by extensions.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="command"></a><span class="ts" id=907 data-target="#details-907" data-toggle="collapse"><span class="ident">command</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>Identifier of the command to execute.</p>
</div></td></tr>
<tr><td><a name="rest"></a><span class="ts" id=908 data-target="#details-908" data-toggle="collapse"><span>...</span><span class="ident">rest</span><span>: </span><a class="type-instrinct">any</a>[]</span></td><td><div class="comment"><p>Parameters passed to the command function.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">T</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves to the returned value of the given command. <code>undefined</code> when
the command handler function doesn&#39;t return anything.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="commands.getCommands"></a><span class="ts" id=910 data-target="#details-910" data-toggle="collapse"><span class="ident">getCommands</span><span>(</span><span class="ident">filterInternal</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">string</a>[]&gt;</span>
<div class="details collapse" id="details-910">
<div class="comment"><p>Retrieve the list of all available commands. Commands starting an underscore are
treated as internal commands.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="filterInternal"></a><span class="ts" id=911 data-target="#details-911" data-toggle="collapse"><span class="ident">filterInternal</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a></span></td><td><div class="comment"><p>Set <code>true</code> to not see internal commands (starting with an underscore)</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">string</a>[]&gt;</span></td><td><div class="comment"><p>Thenable that resolves to a list of command ids.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="commands.registerCommand"></a><span class="ts" id=888 data-target="#details-888" data-toggle="collapse"><span class="ident">registerCommand</span><span>(</span><span class="ident">command</span><span>: </span><a class="type-instrinct">string</a>, <span class="ident">callback</span><span>: </span>(args: <a class="type-instrinct">any</a>[]) =&gt; <a class="type-instrinct">any</a>, <span class="ident">thisArg</span><span>?</span><span>: </span><a class="type-instrinct">any</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-888">
<div class="comment"><p>Registers a command that can be invoked via a keyboard shortcut,
a menu item, an action, or directly.</p>
<p>Registering a command with an existing command identifier twice
will cause an error.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="command"></a><span class="ts" id=889 data-target="#details-889" data-toggle="collapse"><span class="ident">command</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A unique identifier for the command.</p>
</div></td></tr>
<tr><td><a name="callback"></a><span class="ts" id=890 data-target="#details-890" data-toggle="collapse"><span class="ident">callback</span><span>: </span>(args: <a class="type-instrinct">any</a>[]) =&gt; <a class="type-instrinct">any</a></span></td><td><div class="comment"><p>A command handler function.</p>
</div></td></tr>
<tr><td><a name="thisArg"></a><span class="ts" id=894 data-target="#details-894" data-toggle="collapse"><span class="ident">thisArg</span><span>?</span><span>: </span><a class="type-instrinct">any</a></span></td><td><div class="comment"><p>The <code>this</code> context used when invoking the handler function.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>Disposable which unregisters this command on disposal.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="commands.registerTextEditorCommand"></a><span class="ts" id=896 data-target="#details-896" data-toggle="collapse"><span class="ident">registerTextEditorCommand</span><span>(</span><span class="ident">command</span><span>: </span><a class="type-instrinct">string</a>, <span class="ident">callback</span><span>: </span>(textEditor: <a class="type-ref" href="#TextEditor">TextEditor</a>, edit: <a class="type-ref" href="#TextEditorEdit">TextEditorEdit</a>) =&gt; <a class="type-instrinct">void</a>, <span class="ident">thisArg</span><span>?</span><span>: </span><a class="type-instrinct">any</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-896">
<div class="comment"><p>Registers a text editor command that can be invoked via a keyboard shortcut,
a menu item, an action, or directly.</p>
<p>Text editor commands are different from ordinary <a href="#commands.registerCommand">commands</a> as
they only execute when there is an active editor when the command is called. Also, the
command handler of an editor command has access to the active editor and to an
<a href="#TextEditorEdit">edit</a>-builder.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="command"></a><span class="ts" id=897 data-target="#details-897" data-toggle="collapse"><span class="ident">command</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A unique identifier for the command.</p>
</div></td></tr>
<tr><td><a name="callback"></a><span class="ts" id=898 data-target="#details-898" data-toggle="collapse"><span class="ident">callback</span><span>: </span>(textEditor: <a class="type-ref" href="#TextEditor">TextEditor</a>, edit: <a class="type-ref" href="#TextEditorEdit">TextEditorEdit</a>) =&gt; <a class="type-instrinct">void</a></span></td><td><div class="comment"><p>A command handler function with access to an <a href="#TextEditor">editor</a> and an <a href="#TextEditorEdit">edit</a>.</p>
</div></td></tr>
<tr><td><a name="thisArg"></a><span class="ts" id=903 data-target="#details-903" data-toggle="collapse"><span class="ident">thisArg</span><span>?</span><span>: </span><a class="type-instrinct">any</a></span></td><td><div class="comment"><p>The <code>this</code> context used when invoking the handler function.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>Disposable which unregisters this command on disposal.</p>
</div></td></tr>
</table>
</div>
</div>

## env



<div class="comment"><p>Namespace describing the environment the editor runs in.</p>
</div>

#### Variables



<a name="env.language"></a><span class="ts" id=883 data-target="#details-883" data-toggle="collapse"><span class="ident">language</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-883">
<div class="comment"><p>Represents the preferred user-language, like <code>de-CH</code>, <code>fr</code>, or <code>en-US</code>.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="env.machineId"></a><span class="ts" id=884 data-target="#details-884" data-toggle="collapse"><span class="ident">machineId</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-884">
<div class="comment"><p>A unique identifier for the computer.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="env.sessionId"></a><span class="ts" id=885 data-target="#details-885" data-toggle="collapse"><span class="ident">sessionId</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-885">
<div class="comment"><p>A unique identifier for the current session.
Changes each time the editor is started.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>

## extensions



<div class="comment"><p>Namespace for dealing with installed extensions. Extensions are represented
by an <a href="#Extension">extension</a>-interface which allows to reflect on them.</p>
<p>Extension writers can provide APIs to other extensions by returning their API public
surface from the <code>activate</code>-call.</p>

<pre><code class="lang-javascript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">activate</span>(<span class="hljs-params">context: vscode.ExtensionContext</span>) </span>{
        <span class="hljs-keyword">let</span> api = {
            sum(a, b) {
                <span class="hljs-keyword">return</span> a + b;
            },
            mul(a, b) {
                <span class="hljs-keyword">return</span> a * b;
            }
        };
        <span class="hljs-comment">// 'export' public api-surface</span>
        <span class="hljs-keyword">return</span> api;
}
</code></pre>
<p>When depending on the API of another extension add an <code>extensionDependency</code>-entry
to <code>package.json</code>, and use the <a href="#extensions.getExtension">getExtension</a>-function
and the <a href="#Extension.exports">exports</a>-property, like below:</p>

<pre><code class="lang-javascript"><span class="hljs-keyword">let</span> mathExt = extensions.getExtension(<span class="hljs-string">'genius.math'</span>);
<span class="hljs-keyword">let</span> importedApi = mathExt.exports;

<span class="hljs-built_in">console</span>.log(importedApi.mul(<span class="hljs-number">42</span>, <span class="hljs-number">1</span>));
</code></pre>
</div>

#### Variables



<a name="extensions.all"></a><span class="ts" id=1099 data-target="#details-1099" data-toggle="collapse"><span class="ident">all</span><span>: </span><a class="type-ref" href="#Extension">Extension</a>&lt;<a class="type-instrinct">any</a>&gt;[]</span>
<div class="details collapse" id="details-1099">
<div class="comment"><p>All extensions currently known to the system.</p>
</div>
</div>

#### Functions



<a name="extensions.getExtension"></a><span class="ts" id=1094 data-target="#details-1094" data-toggle="collapse"><span class="ident">getExtension</span><span>(</span><span class="ident">extensionId</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-ref" href="#Extension">Extension</a>&lt;<a class="type-instrinct">any</a>&gt;</span>
<div class="details collapse" id="details-1094">
<div class="comment"><p>Get an extension by its full identifier in the form of: <code>publisher.name</code>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="extensionId"></a><span class="ts" id=1095 data-target="#details-1095" data-toggle="collapse"><span class="ident">extensionId</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>An extension identifier.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Extension">Extension</a>&lt;<a class="type-instrinct">any</a>&gt;</span></td><td><div class="comment"><p>An extension or <code>undefined</code>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="extensions.getExtension"></a><span class="ts" id=1096 data-target="#details-1096" data-toggle="collapse"><span class="ident">getExtension</span><span>&lt;</span>T<span>&gt;</span><span>(</span><span class="ident">extensionId</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-ref" href="#Extension">Extension</a>&lt;<a class="type-instrinct">T</a>&gt;</span>
<div class="details collapse" id="details-1096">
<div class="comment"><p>Get an extension its full identifier in the form of: <code>publisher.name</code>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="extensionId"></a><span class="ts" id=1098 data-target="#details-1098" data-toggle="collapse"><span class="ident">extensionId</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>An extension identifier.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Extension">Extension</a>&lt;<a class="type-instrinct">T</a>&gt;</span></td><td><div class="comment"><p>An extension or <code>undefined</code>.</p>
</div></td></tr>
</table>
</div>
</div>

## languages



<div class="comment"><p>Namespace for participating in language-specific editor <a href="https://code.visualstudio.com/docs/editor/editingevolved">features</a>,
like IntelliSense, code actions, diagnostics etc.</p>
<p>Many programming languages exist and there is huge variety in syntaxes, semantics, and paradigms. Despite that, features
like automatic word-completion, code navigation, or code checking have become popular across different tools for different
programming languages.</p>
<p>The editor provides an API that makes it simple to provide such common features by having all UI and actions already in place and
by allowing you to participate by providing data only. For instance, to contribute a hover all you have to do is provide a function
that can be called with a <a href="#TextDocument">TextDocument</a> and a <a href="#Position">Position</a> returning hover info. The rest, like tracking the
mouse, positioning the hover, keeping the hover stable etc. is taken care of by the editor.</p>

<pre><code class="lang-javascript">languages.registerHoverProvider(<span class="hljs-string">'javascript'</span>, {
        provideHover(<span class="hljs-built_in">document</span>, position, token) {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Hover(<span class="hljs-string">'I am a hover!'</span>);
        }
});
</code></pre>
<p>Registration is done using a <a href="#DocumentSelector">document selector</a> which is either a language id, like <code>javascript</code> or
a more complex <a href="#DocumentFilter">filter</a> like <code>{ language: &#39;typescript&#39;, scheme: &#39;file&#39; }</code>. Matching a document against such
a selector will result in a <a href="#languages.match">score</a> that is used to determine if and how a provider shall be used. When
scores are equal the provider that came last wins. For features that allow full arity, like <a href="#languages.registerHoverProvider">hover</a>,
the score is only checked to be <code>&gt;0</code>, for other features, like <a href="#languages.registerCompletionItemProvider">IntelliSense</a> the
score is used for determining the order in which providers are asked to participate.</p>
</div>

#### Functions



<a name="languages.createDiagnosticCollection"></a><span class="ts" id=1027 data-target="#details-1027" data-toggle="collapse"><span class="ident">createDiagnosticCollection</span><span>(</span><span class="ident">name</span><span>?</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-ref" href="#DiagnosticCollection">DiagnosticCollection</a></span>
<div class="details collapse" id="details-1027">
<div class="comment"><p>Create a diagnostics collection.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="name"></a><span class="ts" id=1028 data-target="#details-1028" data-toggle="collapse"><span class="ident">name</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The <a href="#DiagnosticCollection.name">name</a> of the collection.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#DiagnosticCollection">DiagnosticCollection</a></span></td><td><div class="comment"><p>A new diagnostic collection.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.getLanguages"></a><span class="ts" id=1021 data-target="#details-1021" data-toggle="collapse"><span class="ident">getLanguages</span><span>(</span><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">string</a>[]&gt;</span>
<div class="details collapse" id="details-1021">
<div class="comment"><p>Return the identifiers of all known languages.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">string</a>[]&gt;</span></td><td><div class="comment"><p>Promise resolving to an array of identifier strings.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.match"></a><span class="ts" id=1023 data-target="#details-1023" data-toggle="collapse"><span class="ident">match</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a><span>)</span><span>: </span><a class="type-instrinct">number</a></span>
<div class="details collapse" id="details-1023">
<div class="comment"><p>Compute the match between a document <a href="#DocumentSelector">selector</a> and a document. Values
greater than zero mean the selector matches the document. The more individual matches a selector
and a document have, the higher the score is. These are the abstract rules given a <code>selector</code>:</p>

<pre><code>(<span class="hljs-number">1</span>) When <span class="hljs-keyword">selector</span> <span class="hljs-keyword">is</span> an <span class="hljs-keyword">array</span>, return the maximum individual <span class="hljs-keyword">result</span>.
(<span class="hljs-number">2</span>) When <span class="hljs-keyword">selector</span> <span class="hljs-keyword">is</span> a string match that against the [languageId](#TextDocument.languageId).
    (<span class="hljs-number">2.1</span>) When both are equal score <span class="hljs-keyword">is</span> `<span class="hljs-number">10</span>`,
    (<span class="hljs-number">2.2</span>) When the <span class="hljs-keyword">selector</span> <span class="hljs-keyword">is</span> `*` score <span class="hljs-keyword">is</span> `<span class="hljs-number">5</span>`,
    (<span class="hljs-number">2.3</span>) <span class="hljs-keyword">Else</span> score <span class="hljs-keyword">is</span> `<span class="hljs-number">0</span>`.
(<span class="hljs-number">3</span>) When <span class="hljs-keyword">selector</span> <span class="hljs-keyword">is</span> a [filter](#DocumentFilter) every <span class="hljs-keyword">property</span> must score higher `<span class="hljs-number">0</span>`. Iff the score <span class="hljs-keyword">is</span> the sum <span class="hljs-keyword">of</span> the following:
    (<span class="hljs-number">3.1</span>) When [language](#DocumentFilter.language) <span class="hljs-keyword">is</span> <span class="hljs-keyword">set</span> apply rules <span class="hljs-keyword">from</span> <span class="hljs-string">#2</span>, when `<span class="hljs-number">0</span>` the total score <span class="hljs-keyword">is</span> `<span class="hljs-number">0</span>`.
    (<span class="hljs-number">3.2</span>) When [scheme](#Document.scheme) <span class="hljs-keyword">is</span> <span class="hljs-keyword">set</span> <span class="hljs-keyword">and</span> <span class="hljs-keyword">equals</span> the [uri](#TextDocument.uri)-scheme <span class="hljs-keyword">add</span> `<span class="hljs-number">10</span>` <span class="hljs-keyword">to</span> the score, <span class="hljs-keyword">else</span> the total score <span class="hljs-keyword">is</span> `<span class="hljs-number">0</span>`.
    (<span class="hljs-number">3.3</span>) When [pattern](#Document.pattern) <span class="hljs-keyword">is</span> <span class="hljs-keyword">set</span>
        (<span class="hljs-number">3.3</span>.<span class="hljs-number">1</span>) pattern eqauls the [uri](#TextDocument.uri)-fsPath <span class="hljs-keyword">add</span> `<span class="hljs-number">10</span>` <span class="hljs-keyword">to</span> the score,
        (<span class="hljs-number">3.3</span>.<span class="hljs-number">1</span>) <span class="hljs-keyword">if</span> the pattern matches <span class="hljs-keyword">as</span> glob-pattern <span class="hljs-keyword">add</span> `<span class="hljs-number">5</span>` <span class="hljs-keyword">to</span> the score,
        (<span class="hljs-number">3.3</span>.<span class="hljs-number">1</span>) the total score <span class="hljs-keyword">is</span> `<span class="hljs-number">0</span>`
</code></pre></div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1024 data-target="#details-1024" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A document selector.</p>
</div></td></tr>
<tr><td><a name="document"></a><span class="ts" id=1025 data-target="#details-1025" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>A text document.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>A number <code>&gt;0</code> when the selector matches and <code>0</code> when the selector does not match.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerCodeActionsProvider"></a><span class="ts" id=1035 data-target="#details-1035" data-toggle="collapse"><span class="ident">registerCodeActionsProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#CodeActionProvider">CodeActionProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1035">
<div class="comment"><p>Register a code action provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1036 data-target="#details-1036" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1037 data-target="#details-1037" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#CodeActionProvider">CodeActionProvider</a></span></td><td><div class="comment"><p>A code action provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerCodeLensProvider"></a><span class="ts" id=1039 data-target="#details-1039" data-toggle="collapse"><span class="ident">registerCodeLensProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#CodeLensProvider">CodeLensProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1039">
<div class="comment"><p>Register a code lens provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1040 data-target="#details-1040" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1041 data-target="#details-1041" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#CodeLensProvider">CodeLensProvider</a></span></td><td><div class="comment"><p>A code lens provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerCompletionItemProvider"></a><span class="ts" id=1030 data-target="#details-1030" data-toggle="collapse"><span class="ident">registerCompletionItemProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#CompletionItemProvider">CompletionItemProvider</a>, <span>...</span><span class="ident">triggerCharacters</span><span>: </span><a class="type-instrinct">string</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1030">
<div class="comment"><p>Register a completion provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are sorted
by their <a href="#languages.match">score</a> and groups of equal score are sequentially asked for
completion items. The process stops when one or many providers of a group return a
result. A failing provider (rejected promise or exception) will not fail the whole
operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1031 data-target="#details-1031" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1032 data-target="#details-1032" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#CompletionItemProvider">CompletionItemProvider</a></span></td><td><div class="comment"><p>A completion provider.</p>
</div></td></tr>
<tr><td><a name="triggerCharacters"></a><span class="ts" id=1033 data-target="#details-1033" data-toggle="collapse"><span>...</span><span class="ident">triggerCharacters</span><span>: </span><a class="type-instrinct">string</a>[]</span></td><td><div class="comment"><p>Trigger completion when the user types one of the characters, like <code>.</code> or <code>:</code>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerDefinitionProvider"></a><span class="ts" id=1043 data-target="#details-1043" data-toggle="collapse"><span class="ident">registerDefinitionProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#DefinitionProvider">DefinitionProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1043">
<div class="comment"><p>Register a definition provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1044 data-target="#details-1044" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1045 data-target="#details-1045" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#DefinitionProvider">DefinitionProvider</a></span></td><td><div class="comment"><p>A definition provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerDocumentFormattingEditProvider"></a><span class="ts" id=1070 data-target="#details-1070" data-toggle="collapse"><span class="ident">registerDocumentFormattingEditProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#DocumentFormattingEditProvider">DocumentFormattingEditProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1070">
<div class="comment"><p>Register a formatting provider for a document.</p>
<p>Multiple providers can be registered for a language. In that case providers are sorted
by their <a href="#languages.match">score</a> and the result of best-matching provider is used. Failure
of the selected provider will cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1071 data-target="#details-1071" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1072 data-target="#details-1072" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#DocumentFormattingEditProvider">DocumentFormattingEditProvider</a></span></td><td><div class="comment"><p>A document formatting edit provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerDocumentHighlightProvider"></a><span class="ts" id=1051 data-target="#details-1051" data-toggle="collapse"><span class="ident">registerDocumentHighlightProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#DocumentHighlightProvider">DocumentHighlightProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1051">
<div class="comment"><p>Register a document highlight provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are sorted
by their <a href="#languages.match">score</a> and groups sequentially asked for document highlights.
The process stops when a provider returns a <code>non-falsy</code> or <code>non-failure</code> result.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1052 data-target="#details-1052" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1053 data-target="#details-1053" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#DocumentHighlightProvider">DocumentHighlightProvider</a></span></td><td><div class="comment"><p>A document highlight provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerDocumentRangeFormattingEditProvider"></a><span class="ts" id=1074 data-target="#details-1074" data-toggle="collapse"><span class="ident">registerDocumentRangeFormattingEditProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#DocumentRangeFormattingEditProvider">DocumentRangeFormattingEditProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1074">
<div class="comment"><p>Register a formatting provider for a document range.</p>
<p>Multiple providers can be registered for a language. In that case providers are sorted
by their <a href="#languages.match">score</a> and the result of best-matching provider is used. Failure
of the selected provider will cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1075 data-target="#details-1075" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1076 data-target="#details-1076" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#DocumentRangeFormattingEditProvider">DocumentRangeFormattingEditProvider</a></span></td><td><div class="comment"><p>A document range formatting edit provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerDocumentSymbolProvider"></a><span class="ts" id=1055 data-target="#details-1055" data-toggle="collapse"><span class="ident">registerDocumentSymbolProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#DocumentSymbolProvider">DocumentSymbolProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1055">
<div class="comment"><p>Register a document symbol provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1056 data-target="#details-1056" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1057 data-target="#details-1057" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#DocumentSymbolProvider">DocumentSymbolProvider</a></span></td><td><div class="comment"><p>A document symbol provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerHoverProvider"></a><span class="ts" id=1047 data-target="#details-1047" data-toggle="collapse"><span class="ident">registerHoverProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#HoverProvider">HoverProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1047">
<div class="comment"><p>Register a hover provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1048 data-target="#details-1048" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1049 data-target="#details-1049" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#HoverProvider">HoverProvider</a></span></td><td><div class="comment"><p>A hover provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerOnTypeFormattingEditProvider"></a><span class="ts" id=1078 data-target="#details-1078" data-toggle="collapse"><span class="ident">registerOnTypeFormattingEditProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#OnTypeFormattingEditProvider">OnTypeFormattingEditProvider</a>, <span class="ident">firstTriggerCharacter</span><span>: </span><a class="type-instrinct">string</a>, <span>...</span><span class="ident">moreTriggerCharacter</span><span>: </span><a class="type-instrinct">string</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1078">
<div class="comment"><p>Register a formatting provider that works on type. The provider is active when the user enables the setting <code>editor.formatOnType</code>.</p>
<p>Multiple providers can be registered for a language. In that case providers are sorted
by their <a href="#languages.match">score</a> and the result of best-matching provider is used. Failure
of the selected provider will cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1079 data-target="#details-1079" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1080 data-target="#details-1080" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#OnTypeFormattingEditProvider">OnTypeFormattingEditProvider</a></span></td><td><div class="comment"><p>An on type formatting edit provider.</p>
</div></td></tr>
<tr><td><a name="firstTriggerCharacter"></a><span class="ts" id=1081 data-target="#details-1081" data-toggle="collapse"><span class="ident">firstTriggerCharacter</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A character on which formatting should be triggered, like <code>}</code>.</p>
</div></td></tr>
<tr><td><a name="moreTriggerCharacter"></a><span class="ts" id=1082 data-target="#details-1082" data-toggle="collapse"><span>...</span><span class="ident">moreTriggerCharacter</span><span>: </span><a class="type-instrinct">string</a>[]</span></td><td><div class="comment"><p>More trigger characters.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerReferenceProvider"></a><span class="ts" id=1062 data-target="#details-1062" data-toggle="collapse"><span class="ident">registerReferenceProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#ReferenceProvider">ReferenceProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1062">
<div class="comment"><p>Register a reference provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1063 data-target="#details-1063" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1064 data-target="#details-1064" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#ReferenceProvider">ReferenceProvider</a></span></td><td><div class="comment"><p>A reference provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerRenameProvider"></a><span class="ts" id=1066 data-target="#details-1066" data-toggle="collapse"><span class="ident">registerRenameProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#RenameProvider">RenameProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1066">
<div class="comment"><p>Register a reference provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are sorted
by their <a href="#languages.match">score</a> and the result of best-matching provider is used. Failure
of the selected provider will cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1067 data-target="#details-1067" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1068 data-target="#details-1068" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#RenameProvider">RenameProvider</a></span></td><td><div class="comment"><p>A rename provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerSignatureHelpProvider"></a><span class="ts" id=1084 data-target="#details-1084" data-toggle="collapse"><span class="ident">registerSignatureHelpProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#SignatureHelpProvider">SignatureHelpProvider</a>, <span>...</span><span class="ident">triggerCharacters</span><span>: </span><a class="type-instrinct">string</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1084">
<div class="comment"><p>Register a signature help provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are sorted
by their <a href="#languages.match">score</a> and the result of best-matching provider is used. Failure
of the selected provider will cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1085 data-target="#details-1085" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1086 data-target="#details-1086" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#SignatureHelpProvider">SignatureHelpProvider</a></span></td><td><div class="comment"><p>A signature help provider.</p>
</div></td></tr>
<tr><td><a name="triggerCharacters"></a><span class="ts" id=1087 data-target="#details-1087" data-toggle="collapse"><span>...</span><span class="ident">triggerCharacters</span><span>: </span><a class="type-instrinct">string</a>[]</span></td><td><div class="comment"><p>Trigger signature help when the user types one of the characters, like <code>,</code> or <code>(</code>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerWorkspaceSymbolProvider"></a><span class="ts" id=1059 data-target="#details-1059" data-toggle="collapse"><span class="ident">registerWorkspaceSymbolProvider</span><span>(</span><span class="ident">provider</span><span>: </span><a class="type-ref" href="#WorkspaceSymbolProvider">WorkspaceSymbolProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1059">
<div class="comment"><p>Register a workspace symbol provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="provider"></a><span class="ts" id=1060 data-target="#details-1060" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#WorkspaceSymbolProvider">WorkspaceSymbolProvider</a></span></td><td><div class="comment"><p>A workspace symbol provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.setLanguageConfiguration"></a><span class="ts" id=1089 data-target="#details-1089" data-toggle="collapse"><span class="ident">setLanguageConfiguration</span><span>(</span><span class="ident">language</span><span>: </span><a class="type-instrinct">string</a>, <span class="ident">configuration</span><span>: </span><a class="type-ref" href="#LanguageConfiguration">LanguageConfiguration</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1089">
<div class="comment"><p>Set a <a href="#LanguageConfiguration">language configuration</a> for a language.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="language"></a><span class="ts" id=1090 data-target="#details-1090" data-toggle="collapse"><span class="ident">language</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A language identifier like <code>typescript</code>.</p>
</div></td></tr>
<tr><td><a name="configuration"></a><span class="ts" id=1091 data-target="#details-1091" data-toggle="collapse"><span class="ident">configuration</span><span>: </span><a class="type-ref" href="#LanguageConfiguration">LanguageConfiguration</a></span></td><td><div class="comment"><p>Language configuration.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unsets this configuration.</p>
</div></td></tr>
</table>
</div>
</div>

## window



<div class="comment"><p>Namespace for dealing with the current window of the editor. That is visible
and active editors, as well as, UI elements to show messages, selections, and
asking for user input.</p>
</div>

#### Variables



<a name="window.activeTextEditor"></a><span class="ts" id=913 data-target="#details-913" data-toggle="collapse"><span class="ident">activeTextEditor</span><span>: </span><a class="type-ref" href="#TextEditor">TextEditor</a></span>
<div class="details collapse" id="details-913">
<div class="comment"><p>The currently active editor or undefined. The active editor is the one
that currently has focus or, when none has focus, the one that has changed
input most recently.</p>
</div>
</div>



<a name="window.visibleTextEditors"></a><span class="ts" id=914 data-target="#details-914" data-toggle="collapse"><span class="ident">visibleTextEditors</span><span>: </span><a class="type-ref" href="#TextEditor">TextEditor</a>[]</span>
<div class="details collapse" id="details-914">
<div class="comment"><p>The currently visible editors or an empty array.</p>
</div>
</div>

#### Events



<a name="window.onDidChangeActiveTextEditor"></a><span class="ts" id=915 data-target="#details-915" data-toggle="collapse"><span class="ident">onDidChangeActiveTextEditor</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#TextEditor">TextEditor</a>&gt;</span>
<div class="details collapse" id="details-915">
<div class="comment"><p>An <a href="#Event">event</a> which fires when the <a href="#window.activeTextEditor">active editor</a>
has changed.</p>
</div>
</div>



<a name="window.onDidChangeTextEditorOptions"></a><span class="ts" id=917 data-target="#details-917" data-toggle="collapse"><span class="ident">onDidChangeTextEditorOptions</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#TextEditorOptionsChangeEvent">TextEditorOptionsChangeEvent</a>&gt;</span>
<div class="details collapse" id="details-917">
<div class="comment"><p>An <a href="#Event">event</a> which fires when the options of an editor have changed.</p>
</div>
</div>



<a name="window.onDidChangeTextEditorSelection"></a><span class="ts" id=916 data-target="#details-916" data-toggle="collapse"><span class="ident">onDidChangeTextEditorSelection</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#TextEditorSelectionChangeEvent">TextEditorSelectionChangeEvent</a>&gt;</span>
<div class="details collapse" id="details-916">
<div class="comment"><p>An <a href="#Event">event</a> which fires when the selection in an editor has changed.</p>
</div>
</div>



<a name="window.onDidChangeTextEditorViewColumn"></a><span class="ts" id=918 data-target="#details-918" data-toggle="collapse"><span class="ident">onDidChangeTextEditorViewColumn</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#TextEditorViewColumnChangeEvent">TextEditorViewColumnChangeEvent</a>&gt;</span>
<div class="details collapse" id="details-918">
<div class="comment"><p>An <a href="#Event">event</a> which fires when the view column of an editor das changed.</p>
</div>
</div>

#### Functions



<a name="window.createOutputChannel"></a><span class="ts" id=963 data-target="#details-963" data-toggle="collapse"><span class="ident">createOutputChannel</span><span>(</span><span class="ident">name</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-ref" href="#OutputChannel">OutputChannel</a></span>
<div class="details collapse" id="details-963">
<div class="comment"><p>Create a new <a href="#OutputChannel">output channel</a> with the given name.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="name"></a><span class="ts" id=964 data-target="#details-964" data-toggle="collapse"><span class="ident">name</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>Human-readable string which will be used to represent the channel in the UI.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#OutputChannel">OutputChannel</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="window.createStatusBarItem"></a><span class="ts" id=975 data-target="#details-975" data-toggle="collapse"><span class="ident">createStatusBarItem</span><span>(</span><span class="ident">alignment</span><span>?</span><span>: </span><a class="type-ref" href="#StatusBarAlignment">StatusBarAlignment</a>, <span class="ident">priority</span><span>?</span><span>: </span><a class="type-instrinct">number</a><span>)</span><span>: </span><a class="type-ref" href="#StatusBarItem">StatusBarItem</a></span>
<div class="details collapse" id="details-975">
<div class="comment"><p>Creates a status bar <a href="#StatusBarItem">item</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="alignment"></a><span class="ts" id=976 data-target="#details-976" data-toggle="collapse"><span class="ident">alignment</span><span>?</span><span>: </span><a class="type-ref" href="#StatusBarAlignment">StatusBarAlignment</a></span></td><td><div class="comment"><p>The alignment of the item.</p>
</div></td></tr>
<tr><td><a name="priority"></a><span class="ts" id=977 data-target="#details-977" data-toggle="collapse"><span class="ident">priority</span><span>?</span><span>: </span><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>The priority of the item. Higher values mean the item should be shown more to the left.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#StatusBarItem">StatusBarItem</a></span></td><td><div class="comment"><p>A new status bar item.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.createTextEditorDecorationType"></a><span class="ts" id=925 data-target="#details-925" data-toggle="collapse"><span class="ident">createTextEditorDecorationType</span><span>(</span><span class="ident">options</span><span>: </span><a class="type-ref" href="#DecorationRenderOptions">DecorationRenderOptions</a><span>)</span><span>: </span><a class="type-ref" href="#TextEditorDecorationType">TextEditorDecorationType</a></span>
<div class="details collapse" id="details-925">
<div class="comment"><p>Create a TextEditorDecorationType that can be used to add decorations to text editors.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="options"></a><span class="ts" id=926 data-target="#details-926" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#DecorationRenderOptions">DecorationRenderOptions</a></span></td><td><div class="comment"><p>Rendering options for the decoration type.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TextEditorDecorationType">TextEditorDecorationType</a></span></td><td><div class="comment"><p>A new decoration type instance.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.setStatusBarMessage"></a><span class="ts" id=966 data-target="#details-966" data-toggle="collapse"><span class="ident">setStatusBarMessage</span><span>(</span><span class="ident">text</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-966">
<div class="comment"><p>Set a message to the status bar. This is a short hand for the more powerful
status bar <a href="#window.createStatusBarItem">items</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="text"></a><span class="ts" id=967 data-target="#details-967" data-toggle="collapse"><span class="ident">text</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The message to show, support icon subtitution as in status bar <a href="#StatusBarItem.text">items</a>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A disposable which hides the status bar message.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.setStatusBarMessage"></a><span class="ts" id=968 data-target="#details-968" data-toggle="collapse"><span class="ident">setStatusBarMessage</span><span>(</span><span class="ident">text</span><span>: </span><a class="type-instrinct">string</a>, <span class="ident">hideAfterTimeout</span><span>: </span><a class="type-instrinct">number</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-968">
<div class="comment"><p>Set a message to the status bar. This is a short hand for the more powerful
status bar <a href="#window.createStatusBarItem">items</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="text"></a><span class="ts" id=969 data-target="#details-969" data-toggle="collapse"><span class="ident">text</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The message to show, support icon subtitution as in status bar <a href="#StatusBarItem.text">items</a>.</p>
</div></td></tr>
<tr><td><a name="hideAfterTimeout"></a><span class="ts" id=970 data-target="#details-970" data-toggle="collapse"><span class="ident">hideAfterTimeout</span><span>: </span><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>Timeout in milliseconds after which the message will be disposed.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A disposable which hides the status bar message.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.setStatusBarMessage"></a><span class="ts" id=971 data-target="#details-971" data-toggle="collapse"><span class="ident">setStatusBarMessage</span><span>(</span><span class="ident">text</span><span>: </span><a class="type-instrinct">string</a>, <span class="ident">hideWhenDone</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">any</a>&gt;<span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-971">
<div class="comment"><p>Set a message to the status bar. This is a short hand for the more powerful
status bar <a href="#window.createStatusBarItem">items</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="text"></a><span class="ts" id=972 data-target="#details-972" data-toggle="collapse"><span class="ident">text</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The message to show, support icon subtitution as in status bar <a href="#StatusBarItem.text">items</a>.</p>
</div></td></tr>
<tr><td><a name="hideWhenDone"></a><span class="ts" id=973 data-target="#details-973" data-toggle="collapse"><span class="ident">hideWhenDone</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">any</a>&gt;</span></td><td><div class="comment"><p>Thenable on which completion (resolve or reject) the message will be disposed.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A disposable which hides the status bar message.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showErrorMessage"></a><span class="ts" id=944 data-target="#details-944" data-toggle="collapse"><span class="ident">showErrorMessage</span><span>(</span><span class="ident">message</span><span>: </span><a class="type-instrinct">string</a>, <span>...</span><span class="ident">items</span><span>: </span><a class="type-instrinct">string</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">string</a>&gt;</span>
<div class="details collapse" id="details-944">
<div class="comment"><p>Show an error message.</p>
<ul>
<li><em>see</em> - <a href="#window.showInformationMessage">showInformationMessage</a></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="message"></a><span class="ts" id=945 data-target="#details-945" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The message to show.</p>
</div></td></tr>
<tr><td><a name="items"></a><span class="ts" id=946 data-target="#details-946" data-toggle="collapse"><span>...</span><span class="ident">items</span><span>: </span><a class="type-instrinct">string</a>[]</span></td><td><div class="comment"><p>A set of items that will be rendered as actions in the message.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">string</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves to the selected item or <code>undefined</code> when being dismissed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showErrorMessage"></a><span class="ts" id=947 data-target="#details-947" data-toggle="collapse"><span class="ident">showErrorMessage</span><span>&lt;</span>T extends <a class="type-ref" href="#MessageItem">MessageItem</a><span>&gt;</span><span>(</span><span class="ident">message</span><span>: </span><a class="type-instrinct">string</a>, <span>...</span><span class="ident">items</span><span>: </span><a class="type-instrinct">T</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">T</a>&gt;</span>
<div class="details collapse" id="details-947">
<div class="comment"><p>Show an error message.</p>
<ul>
<li><em>see</em> - <a href="#window.showInformationMessage">showInformationMessage</a></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="message"></a><span class="ts" id=949 data-target="#details-949" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The message to show.</p>
</div></td></tr>
<tr><td><a name="items"></a><span class="ts" id=950 data-target="#details-950" data-toggle="collapse"><span>...</span><span class="ident">items</span><span>: </span><a class="type-instrinct">T</a>[]</span></td><td><div class="comment"><p>A set of items that will be rendered as actions in the message.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">T</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves to the selected item or <code>undefined</code> when being dismissed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showInformationMessage"></a><span class="ts" id=928 data-target="#details-928" data-toggle="collapse"><span class="ident">showInformationMessage</span><span>(</span><span class="ident">message</span><span>: </span><a class="type-instrinct">string</a>, <span>...</span><span class="ident">items</span><span>: </span><a class="type-instrinct">string</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">string</a>&gt;</span>
<div class="details collapse" id="details-928">
<div class="comment"><p>Show an information message to users. Optionally provide an array of items which will be presented as
clickable buttons.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="message"></a><span class="ts" id=929 data-target="#details-929" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The message to show.</p>
</div></td></tr>
<tr><td><a name="items"></a><span class="ts" id=930 data-target="#details-930" data-toggle="collapse"><span>...</span><span class="ident">items</span><span>: </span><a class="type-instrinct">string</a>[]</span></td><td><div class="comment"><p>A set of items that will be rendered as actions in the message.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">string</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves to the selected item or <code>undefined</code> when being dismissed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showInformationMessage"></a><span class="ts" id=931 data-target="#details-931" data-toggle="collapse"><span class="ident">showInformationMessage</span><span>&lt;</span>T extends <a class="type-ref" href="#MessageItem">MessageItem</a><span>&gt;</span><span>(</span><span class="ident">message</span><span>: </span><a class="type-instrinct">string</a>, <span>...</span><span class="ident">items</span><span>: </span><a class="type-instrinct">T</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">T</a>&gt;</span>
<div class="details collapse" id="details-931">
<div class="comment"><p>Show an information message.</p>
<ul>
<li><em>see</em> - <a href="#window.showInformationMessage">showInformationMessage</a></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="message"></a><span class="ts" id=933 data-target="#details-933" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The message to show.</p>
</div></td></tr>
<tr><td><a name="items"></a><span class="ts" id=934 data-target="#details-934" data-toggle="collapse"><span>...</span><span class="ident">items</span><span>: </span><a class="type-instrinct">T</a>[]</span></td><td><div class="comment"><p>A set of items that will be rendered as actions in the message.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">T</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves to the selected item or <code>undefined</code> when being dismissed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showInputBox"></a><span class="ts" id=960 data-target="#details-960" data-toggle="collapse"><span class="ident">showInputBox</span><span>(</span><span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#InputBoxOptions">InputBoxOptions</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">string</a>&gt;</span>
<div class="details collapse" id="details-960">
<div class="comment"><p>Opens an input box to ask the user for input.</p>
<p>The returned value will be undefined if the input box was canceled (e.g. pressing ESC). Otherwise the
returned value will be the string typed by the user or an empty string if the user did not type
anything but dismissed the input box with OK.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="options"></a><span class="ts" id=961 data-target="#details-961" data-toggle="collapse"><span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#InputBoxOptions">InputBoxOptions</a></span></td><td><div class="comment"><p>Configures the behavior of the input box.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">string</a>&gt;</span></td><td><div class="comment"><p>A promise that resolves to a string the user provided or to <code>undefined</code> in case of dismissal.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showQuickPick"></a><span class="ts" id=952 data-target="#details-952" data-toggle="collapse"><span class="ident">showQuickPick</span><span>(</span><span class="ident">items</span><span>: </span><a class="type-instrinct">string</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">string</a>[]&gt;, <span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#QuickPickOptions">QuickPickOptions</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">string</a>&gt;</span>
<div class="details collapse" id="details-952">
<div class="comment"><p>Shows a selection list.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="items"></a><span class="ts" id=953 data-target="#details-953" data-toggle="collapse"><span class="ident">items</span><span>: </span><a class="type-instrinct">string</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">string</a>[]&gt;</span></td><td><div class="comment"><p>An array of strings, or a promise that resolves to an array of strings.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=954 data-target="#details-954" data-toggle="collapse"><span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#QuickPickOptions">QuickPickOptions</a></span></td><td><div class="comment"><p>Configures the behavior of the selection list.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">string</a>&gt;</span></td><td><div class="comment"><p>A promise that resolves to the selection or undefined.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showQuickPick"></a><span class="ts" id=955 data-target="#details-955" data-toggle="collapse"><span class="ident">showQuickPick</span><span>&lt;</span>T extends <a class="type-ref" href="#QuickPickItem">QuickPickItem</a><span>&gt;</span><span>(</span><span class="ident">items</span><span>: </span><a class="type-instrinct">T</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">T</a>[]&gt;, <span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#QuickPickOptions">QuickPickOptions</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">T</a>&gt;</span>
<div class="details collapse" id="details-955">
<div class="comment"><p>Shows a selection list.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="items"></a><span class="ts" id=957 data-target="#details-957" data-toggle="collapse"><span class="ident">items</span><span>: </span><a class="type-instrinct">T</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">T</a>[]&gt;</span></td><td><div class="comment"><p>An array of items, or a promise that resolves to an array of items.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=958 data-target="#details-958" data-toggle="collapse"><span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#QuickPickOptions">QuickPickOptions</a></span></td><td><div class="comment"><p>Configures the behavior of the selection list.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">T</a>&gt;</span></td><td><div class="comment"><p>A promise that resolves to the selected item or undefined.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showTextDocument"></a><span class="ts" id=920 data-target="#details-920" data-toggle="collapse"><span class="ident">showTextDocument</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">column</span><span>?</span><span>: </span><a class="type-ref" href="#ViewColumn">ViewColumn</a>, <span class="ident">preserveFocus</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextEditor">TextEditor</a>&gt;</span>
<div class="details collapse" id="details-920">
<div class="comment"><p>Show the given document in a text editor. A <a href="#ViewColumn">column</a> can be provided
to control where the editor is being shown. Might change the <a href="#window.activeTextEditor">active editor</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=921 data-target="#details-921" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>A text document to be shown.</p>
</div></td></tr>
<tr><td><a name="column"></a><span class="ts" id=922 data-target="#details-922" data-toggle="collapse"><span class="ident">column</span><span>?</span><span>: </span><a class="type-ref" href="#ViewColumn">ViewColumn</a></span></td><td><div class="comment"><p>A view column in which the editor should be shown. The default is the <a href="#ViewColumn.One">one</a>, other values
are adjusted to be <strong>Min(column, columnCount + 1)</strong>.</p>
</div></td></tr>
<tr><td><a name="preserveFocus"></a><span class="ts" id=923 data-target="#details-923" data-toggle="collapse"><span class="ident">preserveFocus</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a></span></td><td><div class="comment"><p>When <code>true</code> the editor will not take focus.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextEditor">TextEditor</a>&gt;</span></td><td><div class="comment"><p>A promise that resolves to an <a href="#TextEditor">editor</a>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showWarningMessage"></a><span class="ts" id=936 data-target="#details-936" data-toggle="collapse"><span class="ident">showWarningMessage</span><span>(</span><span class="ident">message</span><span>: </span><a class="type-instrinct">string</a>, <span>...</span><span class="ident">items</span><span>: </span><a class="type-instrinct">string</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">string</a>&gt;</span>
<div class="details collapse" id="details-936">
<div class="comment"><p>Show a warning message.</p>
<ul>
<li><em>see</em> - <a href="#window.showInformationMessage">showInformationMessage</a></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="message"></a><span class="ts" id=937 data-target="#details-937" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The message to show.</p>
</div></td></tr>
<tr><td><a name="items"></a><span class="ts" id=938 data-target="#details-938" data-toggle="collapse"><span>...</span><span class="ident">items</span><span>: </span><a class="type-instrinct">string</a>[]</span></td><td><div class="comment"><p>A set of items that will be rendered as actions in the message.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">string</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves to the selected item or <code>undefined</code> when being dismissed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showWarningMessage"></a><span class="ts" id=939 data-target="#details-939" data-toggle="collapse"><span class="ident">showWarningMessage</span><span>&lt;</span>T extends <a class="type-ref" href="#MessageItem">MessageItem</a><span>&gt;</span><span>(</span><span class="ident">message</span><span>: </span><a class="type-instrinct">string</a>, <span>...</span><span class="ident">items</span><span>: </span><a class="type-instrinct">T</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">T</a>&gt;</span>
<div class="details collapse" id="details-939">
<div class="comment"><p>Show a warning message.</p>
<ul>
<li><em>see</em> - <a href="#window.showInformationMessage">showInformationMessage</a></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="message"></a><span class="ts" id=941 data-target="#details-941" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The message to show.</p>
</div></td></tr>
<tr><td><a name="items"></a><span class="ts" id=942 data-target="#details-942" data-toggle="collapse"><span>...</span><span class="ident">items</span><span>: </span><a class="type-instrinct">T</a>[]</span></td><td><div class="comment"><p>A set of items that will be rendered as actions in the message.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">T</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves to the selected item or <code>undefined</code> when being dismissed.</p>
</div></td></tr>
</table>
</div>
</div>

## workspace



<div class="comment"><p>Namespace for dealing with the current workspace. A workspace is the representation
of the folder that has been opened. There is no workspace when just a file but not a
folder has been opened.</p>
<p>The workspace offers support for <a href="#workspace.createFileSystemWatcher">listening</a> to fs
events and for <a href="#workspace#findFiles">finding</a> files. Both perform well and run <em>outside</em>
the editor-process so that they should be always used instead of nodejs-equivalents.</p>
</div>

#### Variables



<a name="workspace.rootPath"></a><span class="ts" id=985 data-target="#details-985" data-toggle="collapse"><span class="ident">rootPath</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-985">
<div class="comment"><p>The folder that is open in VS Code. <code>undefined</code> when no folder
has been opened.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="workspace.textDocuments"></a><span class="ts" id=1001 data-target="#details-1001" data-toggle="collapse"><span class="ident">textDocuments</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>[]</span>
<div class="details collapse" id="details-1001">
<div class="comment"><p>All text documents currently known to the system.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>

#### Events



<a name="workspace.onDidChangeConfiguration"></a><span class="ts" id=1018 data-target="#details-1018" data-toggle="collapse"><span class="ident">onDidChangeConfiguration</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-instrinct">void</a>&gt;</span>
<div class="details collapse" id="details-1018">
<div class="comment"><p>An event that is emitted when the <a href="#WorkspaceConfiguration">configuration</a> changed.</p>
</div>
</div>



<a name="workspace.onDidChangeTextDocument"></a><span class="ts" id=1013 data-target="#details-1013" data-toggle="collapse"><span class="ident">onDidChangeTextDocument</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#TextDocumentChangeEvent">TextDocumentChangeEvent</a>&gt;</span>
<div class="details collapse" id="details-1013">
<div class="comment"><p>An event that is emitted when a <a href="#TextDocument">text document</a> is changed.</p>
</div>
</div>



<a name="workspace.onDidCloseTextDocument"></a><span class="ts" id=1012 data-target="#details-1012" data-toggle="collapse"><span class="ident">onDidCloseTextDocument</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#TextDocument">TextDocument</a>&gt;</span>
<div class="details collapse" id="details-1012">
<div class="comment"><p>An event that is emitted when a <a href="#TextDocument">text document</a> is disposed.</p>
</div>
</div>



<a name="workspace.onDidOpenTextDocument"></a><span class="ts" id=1011 data-target="#details-1011" data-toggle="collapse"><span class="ident">onDidOpenTextDocument</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#TextDocument">TextDocument</a>&gt;</span>
<div class="details collapse" id="details-1011">
<div class="comment"><p>An event that is emitted when a <a href="#TextDocument">text document</a> is opened.</p>
</div>
</div>



<a name="workspace.onDidSaveTextDocument"></a><span class="ts" id=1014 data-target="#details-1014" data-toggle="collapse"><span class="ident">onDidSaveTextDocument</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#TextDocument">TextDocument</a>&gt;</span>
<div class="details collapse" id="details-1014">
<div class="comment"><p>An event that is emitted when a <a href="#TextDocument">text document</a> is saved to disk.</p>
</div>
</div>

#### Functions



<a name="workspace.applyEdit"></a><span class="ts" id=999 data-target="#details-999" data-toggle="collapse"><span class="ident">applyEdit</span><span>(</span><span class="ident">edit</span><span>: </span><a class="type-ref" href="#WorkspaceEdit">WorkspaceEdit</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">boolean</a>&gt;</span>
<div class="details collapse" id="details-999">
<div class="comment"><p>Make changes to one or many resources as defined by the given
<a href="#WorkspaceEdit">workspace edit</a>.</p>
<p>When applying a workspace edit, the editor implements an &#39;all-or-nothing&#39;-strategy,
that means failure to load one document or make changes to one document will cause
the edit to be rejected.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="edit"></a><span class="ts" id=1000 data-target="#details-1000" data-toggle="collapse"><span class="ident">edit</span><span>: </span><a class="type-ref" href="#WorkspaceEdit">WorkspaceEdit</a></span></td><td><div class="comment"><p>A workspace edit.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">boolean</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves when the edit could be applied.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="workspace.asRelativePath"></a><span class="ts" id=987 data-target="#details-987" data-toggle="collapse"><span class="ident">asRelativePath</span><span>(</span><span class="ident">pathOrUri</span><span>: </span><a class="type-instrinct">string</a> &#124; <a class="type-ref" href="#Uri">Uri</a><span>)</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-987">
<div class="comment"><p>Returns a path that is relative to the workspace root.</p>
<p>When there is no <a href="#workspace.rootPath">workspace root</a> or when the path
is not a child of that folder, the input is returned.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="pathOrUri"></a><span class="ts" id=988 data-target="#details-988" data-toggle="collapse"><span class="ident">pathOrUri</span><span>: </span><a class="type-instrinct">string</a> &#124; <a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A path or uri. When a uri is given its <a href="#Uri.fsPath">fsPath</a> is used.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A path relative to the root or the input.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="workspace.createFileSystemWatcher"></a><span class="ts" id=980 data-target="#details-980" data-toggle="collapse"><span class="ident">createFileSystemWatcher</span><span>(</span><span class="ident">globPattern</span><span>: </span><a class="type-instrinct">string</a>, <span class="ident">ignoreCreateEvents</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a>, <span class="ident">ignoreChangeEvents</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a>, <span class="ident">ignoreDeleteEvents</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a><span>)</span><span>: </span><a class="type-ref" href="#FileSystemWatcher">FileSystemWatcher</a></span>
<div class="details collapse" id="details-980">
<div class="comment"><p>Creates a file system watcher.</p>
<p>A glob pattern that filters the file events must be provided. Optionally, flags to ignore certain
kinds of events can be provided. To stop listening to events the watcher must be disposed.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="globPattern"></a><span class="ts" id=981 data-target="#details-981" data-toggle="collapse"><span class="ident">globPattern</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A glob pattern that is applied to the names of created, changed, and deleted files.</p>
</div></td></tr>
<tr><td><a name="ignoreCreateEvents"></a><span class="ts" id=982 data-target="#details-982" data-toggle="collapse"><span class="ident">ignoreCreateEvents</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a></span></td><td><div class="comment"><p>Ignore when files have been created.</p>
</div></td></tr>
<tr><td><a name="ignoreChangeEvents"></a><span class="ts" id=983 data-target="#details-983" data-toggle="collapse"><span class="ident">ignoreChangeEvents</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a></span></td><td><div class="comment"><p>Ignore when files have been changed.</p>
</div></td></tr>
<tr><td><a name="ignoreDeleteEvents"></a><span class="ts" id=984 data-target="#details-984" data-toggle="collapse"><span class="ident">ignoreDeleteEvents</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a></span></td><td><div class="comment"><p>Ignore when files have been deleted.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#FileSystemWatcher">FileSystemWatcher</a></span></td><td><div class="comment"><p>A new file system watcher instance.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="workspace.findFiles"></a><span class="ts" id=990 data-target="#details-990" data-toggle="collapse"><span class="ident">findFiles</span><span>(</span><span class="ident">include</span><span>: </span><a class="type-instrinct">string</a>, <span class="ident">exclude</span><span>: </span><a class="type-instrinct">string</a>, <span class="ident">maxResults</span><span>?</span><span>: </span><a class="type-instrinct">number</a>, <span class="ident">token</span><span>?</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#Uri">Uri</a>[]&gt;</span>
<div class="details collapse" id="details-990">
<div class="comment"><p>Find files in the workspace.</p>
<ul>
<li><em>sample</em> - <code>findFiles(&#39;**∕*.js&#39;, &#39;**∕node_modules∕**&#39;, 10)</code></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="include"></a><span class="ts" id=991 data-target="#details-991" data-toggle="collapse"><span class="ident">include</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A glob pattern that defines the files to search for.</p>
</div></td></tr>
<tr><td><a name="exclude"></a><span class="ts" id=992 data-target="#details-992" data-toggle="collapse"><span class="ident">exclude</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A glob pattern that defines files and folders to exclude.</p>
</div></td></tr>
<tr><td><a name="maxResults"></a><span class="ts" id=993 data-target="#details-993" data-toggle="collapse"><span class="ident">maxResults</span><span>?</span><span>: </span><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>An upper-bound for the result.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=994 data-target="#details-994" data-toggle="collapse"><span class="ident">token</span><span>?</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A token that can be used to signal cancellation to the underlying search engine.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#Uri">Uri</a>[]&gt;</span></td><td><div class="comment"><p>A thenable that resolves to an array of resource identifiers.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="workspace.getConfiguration"></a><span class="ts" id=1016 data-target="#details-1016" data-toggle="collapse"><span class="ident">getConfiguration</span><span>(</span><span class="ident">section</span><span>?</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-ref" href="#WorkspaceConfiguration">WorkspaceConfiguration</a></span>
<div class="details collapse" id="details-1016">
<div class="comment"><p>Get a configuration object.</p>
<p>When a section-identifier is provided only that part of the configuration
is returned. Dots in the section-identifier are interpreted as child-access,
like <code>{ myExt: { setting: { doIt: true }}}</code> and <code>getConfiguration(&#39;myExt.setting.doIt&#39;) === true</code>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="section"></a><span class="ts" id=1017 data-target="#details-1017" data-toggle="collapse"><span class="ident">section</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A dot-separated identifier.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#WorkspaceConfiguration">WorkspaceConfiguration</a></span></td><td><div class="comment"><p>The full workspace configuration or a subset.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="workspace.openTextDocument"></a><span class="ts" id=1003 data-target="#details-1003" data-toggle="collapse"><span class="ident">openTextDocument</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextDocument">TextDocument</a>&gt;</span>
<div class="details collapse" id="details-1003">
<div class="comment"><p>Opens the denoted document from disk. Will return early if the
document is already open, otherwise the document is loaded and the
<a href="#workspace.onDidOpenTextDocument">open document</a>-event fires.
The document to open is denoted by the <a href="#Uri">uri</a>. Two schemes are supported:</p>
<p>file: A file on disk, will be rejected if the file does not exist or cannot be loaded, e.g. &#39;file:///Users/frodo/r.ini&#39;.
untitled: A new file that should be saved on disk, e.g. &#39;untitled:/Users/frodo/new.js&#39;. The language will be derived from the file name.</p>
<p>Uris with other schemes will make this method return a rejected promise.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=1004 data-target="#details-1004" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>Identifies the resource to open.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextDocument">TextDocument</a>&gt;</span></td><td><div class="comment"><p>A promise that resolves to a <a href="#TextDocument">document</a>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="workspace.openTextDocument"></a><span class="ts" id=1005 data-target="#details-1005" data-toggle="collapse"><span class="ident">openTextDocument</span><span>(</span><span class="ident">fileName</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextDocument">TextDocument</a>&gt;</span>
<div class="details collapse" id="details-1005">
<div class="comment"><p>A short-hand for <code>openTextDocument(Uri.file(fileName))</code>.</p>
<ul>
<li><em>see</em> - <a href="#openTextDocument">openTextDocument</a></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="fileName"></a><span class="ts" id=1006 data-target="#details-1006" data-toggle="collapse"><span class="ident">fileName</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A name of a file on disk.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextDocument">TextDocument</a>&gt;</span></td><td><div class="comment"><p>A promise that resolves to a <a href="#TextDocument">document</a>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="workspace.registerTextDocumentContentProvider"></a><span class="ts" id=1008 data-target="#details-1008" data-toggle="collapse"><span class="ident">registerTextDocumentContentProvider</span><span>(</span><span class="ident">scheme</span><span>: </span><a class="type-instrinct">string</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#TextDocumentContentProvider">TextDocumentContentProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1008">
<div class="comment"><p>Register a text document content provider.</p>
<p>Only one provider can be registered per scheme.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="scheme"></a><span class="ts" id=1009 data-target="#details-1009" data-toggle="collapse"><span class="ident">scheme</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The uri-scheme to register for.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1010 data-target="#details-1010" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#TextDocumentContentProvider">TextDocumentContentProvider</a></span></td><td><div class="comment"><p>A content provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="workspace.saveAll"></a><span class="ts" id=996 data-target="#details-996" data-toggle="collapse"><span class="ident">saveAll</span><span>(</span><span class="ident">includeUntitled</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">boolean</a>&gt;</span>
<div class="details collapse" id="details-996">
<div class="comment"><p>Save all dirty files.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="includeUntitled"></a><span class="ts" id=997 data-target="#details-997" data-toggle="collapse"><span class="ident">includeUntitled</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a></span></td><td><div class="comment"><p>Also save files that have been created during this session.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">boolean</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves when the files have been saved.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="CancellationToken"></a><span class="code-item" id=347>CancellationToken</span>



<div class="comment"><p>A cancellation token is passed to an asynchronous or long running
operation to request cancellation, like cancelling a request
for completion items because the user continued to type.</p>
<p>To get an instance of a <code>CancellationToken</code> use a
<a href="#CancellationTokenSource">CancellationTokenSource</a>.</p>
</div>

#### Properties



<a name="CancellationToken.isCancellationRequested"></a><span class="ts" id=348 data-target="#details-348" data-toggle="collapse"><span class="ident">isCancellationRequested</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-348">
<div class="comment"><p>Is <code>true</code> when the token has been cancelled, <code>false</code> otherwise.</p>
</div>
</div>



<a name="CancellationToken.onCancellationRequested"></a><span class="ts" id=349 data-target="#details-349" data-toggle="collapse"><span class="ident">onCancellationRequested</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-instrinct">any</a>&gt;</span>
<div class="details collapse" id="details-349">
<div class="comment"><p>An <a href="#Event">event</a> which fires upon cancellation.</p>
</div>
</div>

### <a name="CancellationTokenSource"></a><span class="code-item" id=350>CancellationTokenSource</span>



<div class="comment"><p>A cancellation source creates and controls a <a href="#CancellationToken">cancellation token</a>.</p>
</div>

#### Properties



<a name="CancellationTokenSource.token"></a><span class="ts" id=351 data-target="#details-351" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span>
<div class="details collapse" id="details-351">
<div class="comment"><p>The cancellation token of this source.</p>
</div>
</div>

#### Methods



<a name="CancellationTokenSource.cancel"></a><span class="ts" id=353 data-target="#details-353" data-toggle="collapse"><span class="ident">cancel</span><span>(</span><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-353">
<div class="comment"><p>Signal cancellation on the token.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="CancellationTokenSource.dispose"></a><span class="ts" id=355 data-target="#details-355" data-toggle="collapse"><span class="ident">dispose</span><span>(</span><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-355">
<div class="comment"><p>Dispose object and free resources. Will call <a href="#CancellationTokenSource.cancel">cancel</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="CharacterPair"></a><span class="code-item" id=881>CharacterPair</span>



<div class="comment"><p>A tuple of two characters, like a pair of
opening and closing brackets.</p>
</div>



<a name="CharacterPair"></a><span class="ts" id=881 data-target="#details-881" data-toggle="collapse"><span class="ident">CharacterPair</span><span>: </span>[<a class="type-instrinct">string</a>, <a class="type-instrinct">string</a>]</span>

### <a name="CodeActionContext"></a><span class="code-item" id=439>CodeActionContext</span>



<div class="comment"><p>Contains additional diagnostic information about the context in which
a <a href="#CodeActionProvider.provideCodeActions">code action</a> is run.</p>
</div>

#### Properties



<a name="CodeActionContext.diagnostics"></a><span class="ts" id=440 data-target="#details-440" data-toggle="collapse"><span class="ident">diagnostics</span><span>: </span><a class="type-ref" href="#Diagnostic">Diagnostic</a>[]</span>
<div class="details collapse" id="details-440">
<div class="comment"><p>An array of diagnostics.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>

### <a name="CodeActionProvider"></a><span class="code-item" id=441>CodeActionProvider</span>



<div class="comment"><p>The code action interface defines the contract between extensions and
the <a href="https://code.visualstudio.com/docs/editor/editingevolved#_code-action">light bulb</a> feature.</p>
<p>A code action can be any command that is <a href="#commands.getCommands">known</a> to the system.</p>
</div>

#### Methods



<a name="CodeActionProvider.provideCodeActions"></a><span class="ts" id=443 data-target="#details-443" data-toggle="collapse"><span class="ident">provideCodeActions</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">context</span><span>: </span><a class="type-ref" href="#CodeActionContext">CodeActionContext</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#Command">Command</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#Command">Command</a>[]&gt;</span>
<div class="details collapse" id="details-443">
<div class="comment"><p>Provide commands for the given document and range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=444 data-target="#details-444" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="range"></a><span class="ts" id=445 data-target="#details-445" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>The range for which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="context"></a><span class="ts" id=446 data-target="#details-446" data-toggle="collapse"><span class="ident">context</span><span>: </span><a class="type-ref" href="#CodeActionContext">CodeActionContext</a></span></td><td><div class="comment"><p>Context carrying additional information.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=447 data-target="#details-447" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Command">Command</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#Command">Command</a>[]&gt;</span></td><td><div class="comment"><p>An array of commands or a thenable of such. The lack of a result can be
signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="CodeLens"></a><span class="code-item" id=448>CodeLens</span>



<div class="comment"><p>A code lens represents a <a href="#Command">command</a> that should be shown along with
source text, like the number of references, a way to run tests, etc.</p>
<p>A code lens is <em>unresolved</em> when no command is associated to it. For performance
reasons the creation of a code lens and resolving should be done to two stages.</p>
<ul>
<li><em>see</em> - <a href="#CodeLensProvider.provideCodeLenses">CodeLensProvider.provideCodeLenses</a></li>
</ul>
<ul>
<li><em>see</em> - <a href="#CodeLensProvider.resolveCodeLens">CodeLensProvider.resolveCodeLens</a></li>
</ul>
</div>

#### Constructors



<a name="CodeLens.new CodeLens"></a><span class="ts" id=453 data-target="#details-453" data-toggle="collapse"><span class="ident">new CodeLens</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">command</span><span>?</span><span>: </span><a class="type-ref" href="#Command">Command</a><span>)</span><span>: </span><a class="type-ref" href="#CodeLens">CodeLens</a></span>
<div class="details collapse" id="details-453">
<div class="comment"><p>Creates a new code lens object.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=454 data-target="#details-454" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>The range to which this code lens applies.</p>
</div></td></tr>
<tr><td><a name="command"></a><span class="ts" id=455 data-target="#details-455" data-toggle="collapse"><span class="ident">command</span><span>?</span><span>: </span><a class="type-ref" href="#Command">Command</a></span></td><td><div class="comment"><p>The command associated to this code lens.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#CodeLens">CodeLens</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="CodeLens.command"></a><span class="ts" id=450 data-target="#details-450" data-toggle="collapse"><span class="ident">command</span><span>: </span><a class="type-ref" href="#Command">Command</a></span>
<div class="details collapse" id="details-450">
<div class="comment"><p>The command this code lens represents.</p>
</div>
</div>



<a name="CodeLens.isResolved"></a><span class="ts" id=451 data-target="#details-451" data-toggle="collapse"><span class="ident">isResolved</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-451">
<div class="comment"><p><code>true</code> when there is a command associated.</p>
</div>
</div>



<a name="CodeLens.range"></a><span class="ts" id=449 data-target="#details-449" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-449">
<div class="comment"><p>The range in which this code lens is valid. Should only span a single line.</p>
</div>
</div>

### <a name="CodeLensProvider"></a><span class="code-item" id=456>CodeLensProvider</span>



<div class="comment"><p>A code lens provider adds <a href="#Command">commands</a> to source text. The commands will be shown
as dedicated horizontal lines in between the source text.</p>
</div>

#### Methods



<a name="CodeLensProvider.provideCodeLenses"></a><span class="ts" id=458 data-target="#details-458" data-toggle="collapse"><span class="ident">provideCodeLenses</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#CodeLens">CodeLens</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#CodeLens">CodeLens</a>[]&gt;</span>
<div class="details collapse" id="details-458">
<div class="comment"><p>Compute a list of <a href="#CodeLens">lenses</a>. This call should return as fast as possible and if
computing the commands is expensive implementors should only return code lens objects with the
range set and implement <a href="#CodeLensProvider.resolveCodeLens">resolve</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=459 data-target="#details-459" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=460 data-target="#details-460" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#CodeLens">CodeLens</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#CodeLens">CodeLens</a>[]&gt;</span></td><td><div class="comment"><p>An array of code lenses or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="CodeLensProvider.resolveCodeLens"></a><span class="ts" id=462 data-target="#details-462" data-toggle="collapse"><span class="ident">resolveCodeLens</span><span>(</span><span class="ident">codeLens</span><span>: </span><a class="type-ref" href="#CodeLens">CodeLens</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#CodeLens">CodeLens</a> &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#CodeLens">CodeLens</a>&gt;</span>
<div class="details collapse" id="details-462">
<div class="comment"><p>This function will be called for each visible code lens, usually when scrolling and after
calls to <a href="#CodeLensProvider.provideCodeLenses">compute</a>-lenses.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="codeLens"></a><span class="ts" id=463 data-target="#details-463" data-toggle="collapse"><span class="ident">codeLens</span><span>: </span><a class="type-ref" href="#CodeLens">CodeLens</a></span></td><td><div class="comment"><p>code lens that must be resolved.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=464 data-target="#details-464" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#CodeLens">CodeLens</a> &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#CodeLens">CodeLens</a>&gt;</span></td><td><div class="comment"><p>The given, resolved code lens or thenable that resolves to such.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="Command"></a><span class="code-item" id=89>Command</span>



<div class="comment"><p>Represents a reference to a command. Provides a title which
will be used to represent a command in the UI and, optionally,
an array of arguments which will be passed to the command handler
function when invoked.</p>
</div>

#### Properties



<a name="Command.arguments"></a><span class="ts" id=92 data-target="#details-92" data-toggle="collapse"><span class="ident">arguments</span><span>?</span><span>: </span><a class="type-instrinct">any</a>[]</span>
<div class="details collapse" id="details-92">
<div class="comment"><p>Arguments that the command handler should be
invoked with.</p>
</div>
</div>



<a name="Command.command"></a><span class="ts" id=91 data-target="#details-91" data-toggle="collapse"><span class="ident">command</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-91">
<div class="comment"><p>The identifier of the actual command handler.</p>
<ul>
<li><em>see</em> - <a href="#commands.registerCommand">commands.registerCommand</a>.</li>
</ul>
</div>
</div>



<a name="Command.title"></a><span class="ts" id=90 data-target="#details-90" data-toggle="collapse"><span class="ident">title</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-90">
<div class="comment"><p>Title of the command, like <code>save</code>.</p>
</div>
</div>

### <a name="CommentRule"></a><span class="code-item" id=706>CommentRule</span>



<div class="comment"><p>Describes how comments for a language work.</p>
</div>

#### Properties



<a name="CommentRule.blockComment"></a><span class="ts" id=708 data-target="#details-708" data-toggle="collapse"><span class="ident">blockComment</span><span>?</span><span>: </span><a class="type-ref" href="#CharacterPair">CharacterPair</a></span>
<div class="details collapse" id="details-708">
<div class="comment"><p>The block comment character pair, like <code>/* block comment *&amp;#47;</code></p>
</div>
</div>



<a name="CommentRule.lineComment"></a><span class="ts" id=707 data-target="#details-707" data-toggle="collapse"><span class="ident">lineComment</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-707">
<div class="comment"><p>The line comment token, like <code>// this is a comment</code></p>
</div>
</div>

### <a name="CompletionItem"></a><span class="code-item" id=677>CompletionItem</span>



<div class="comment"><p>A completion item represents a text snippet that is
proposed to complete text that is being typed.</p>
<ul>
<li><em>see</em> - <a href="#CompletionItemProvider.provideCompletionItems">CompletionItemProvider.provideCompletionItems</a></li>
</ul>
<ul>
<li><em>see</em> - <a href="#CompletionItemProvider.resolveCompletionItem">CompletionItemProvider.resolveCompletionItem</a></li>
</ul>
</div>

#### Constructors



<a name="CompletionItem.new CompletionItem"></a><span class="ts" id=687 data-target="#details-687" data-toggle="collapse"><span class="ident">new CompletionItem</span><span>(</span><span class="ident">label</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-ref" href="#CompletionItem">CompletionItem</a></span>
<div class="details collapse" id="details-687">
<div class="comment"><p>Creates a new completion item.</p>
<p>Completion items must have at least a <a href="#CompletionItem.label">label</a> which then
will be used as insert text as well as for sorting and filtering.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="label"></a><span class="ts" id=688 data-target="#details-688" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The label of the completion.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#CompletionItem">CompletionItem</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="CompletionItem.detail"></a><span class="ts" id=680 data-target="#details-680" data-toggle="collapse"><span class="ident">detail</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-680">
<div class="comment"><p>A human-readable string with additional information
about this item, like type or symbol information.</p>
</div>
</div>



<a name="CompletionItem.documentation"></a><span class="ts" id=681 data-target="#details-681" data-toggle="collapse"><span class="ident">documentation</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-681">
<div class="comment"><p>A human-readable string that represents a doc-comment.</p>
</div>
</div>



<a name="CompletionItem.filterText"></a><span class="ts" id=683 data-target="#details-683" data-toggle="collapse"><span class="ident">filterText</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-683">
<div class="comment"><p>A string that should be used when filtering a set of
completion items. When <code>falsy</code> the <a href="#CompletionItem.label">label</a>
is used.</p>
</div>
</div>



<a name="CompletionItem.insertText"></a><span class="ts" id=684 data-target="#details-684" data-toggle="collapse"><span class="ident">insertText</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-684">
<div class="comment"><p>A string that should be inserted in a document when selecting
this completion. When <code>falsy</code> the <a href="#CompletionItem.label">label</a>
is used.</p>
</div>
</div>



<a name="CompletionItem.kind"></a><span class="ts" id=679 data-target="#details-679" data-toggle="collapse"><span class="ident">kind</span><span>: </span><a class="type-ref" href="#CompletionItemKind">CompletionItemKind</a></span>
<div class="details collapse" id="details-679">
<div class="comment"><p>The kind of this completion item. Based on the kind
an icon is chosen by the editor.</p>
</div>
</div>



<a name="CompletionItem.label"></a><span class="ts" id=678 data-target="#details-678" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-678">
<div class="comment"><p>The label of this completion item. By default
this is also the text that is inserted when selecting
this completion.</p>
</div>
</div>



<a name="CompletionItem.sortText"></a><span class="ts" id=682 data-target="#details-682" data-toggle="collapse"><span class="ident">sortText</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-682">
<div class="comment"><p>A string that should be used when comparing this item
with other items. When <code>falsy</code> the <a href="#CompletionItem.label">label</a>
is used.</p>
</div>
</div>



<a name="CompletionItem.textEdit"></a><span class="ts" id=685 data-target="#details-685" data-toggle="collapse"><span class="ident">textEdit</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a></span>
<div class="details collapse" id="details-685">
<div class="comment"><p>An <a href="#TextEdit">edit</a> which is applied to a document when selecting
this completion. When an edit is provided the value of
<a href="#CompletionItem.insertText">insertText</a> is ignored.</p>
<p>The <a href="#Range">range</a> of the edit must be single-line and one the same
line completions where <a href="#CompletionItemProvider.provideCompletionItems">requested</a> at.</p>
</div>
</div>

### <a name="CompletionItemKind"></a><span class="code-item" id=658>CompletionItemKind</span>



<div class="comment"><p>Completion item kinds.</p>
</div>

#### Enumeration members



<a name="CompletionItemKind.Class"></a><span class="ts" id=665 data-target="#details-665" data-toggle="collapse"><span class="ident">Class</span></span>
<div class="details collapse" id="details-665">
</div>



<a name="CompletionItemKind.Color"></a><span class="ts" id=674 data-target="#details-674" data-toggle="collapse"><span class="ident">Color</span></span>
<div class="details collapse" id="details-674">
</div>



<a name="CompletionItemKind.Constructor"></a><span class="ts" id=662 data-target="#details-662" data-toggle="collapse"><span class="ident">Constructor</span></span>
<div class="details collapse" id="details-662">
</div>



<a name="CompletionItemKind.Enum"></a><span class="ts" id=671 data-target="#details-671" data-toggle="collapse"><span class="ident">Enum</span></span>
<div class="details collapse" id="details-671">
</div>



<a name="CompletionItemKind.Field"></a><span class="ts" id=663 data-target="#details-663" data-toggle="collapse"><span class="ident">Field</span></span>
<div class="details collapse" id="details-663">
</div>



<a name="CompletionItemKind.File"></a><span class="ts" id=675 data-target="#details-675" data-toggle="collapse"><span class="ident">File</span></span>
<div class="details collapse" id="details-675">
</div>



<a name="CompletionItemKind.Function"></a><span class="ts" id=661 data-target="#details-661" data-toggle="collapse"><span class="ident">Function</span></span>
<div class="details collapse" id="details-661">
</div>



<a name="CompletionItemKind.Interface"></a><span class="ts" id=666 data-target="#details-666" data-toggle="collapse"><span class="ident">Interface</span></span>
<div class="details collapse" id="details-666">
</div>



<a name="CompletionItemKind.Keyword"></a><span class="ts" id=672 data-target="#details-672" data-toggle="collapse"><span class="ident">Keyword</span></span>
<div class="details collapse" id="details-672">
</div>



<a name="CompletionItemKind.Method"></a><span class="ts" id=660 data-target="#details-660" data-toggle="collapse"><span class="ident">Method</span></span>
<div class="details collapse" id="details-660">
</div>



<a name="CompletionItemKind.Module"></a><span class="ts" id=667 data-target="#details-667" data-toggle="collapse"><span class="ident">Module</span></span>
<div class="details collapse" id="details-667">
</div>



<a name="CompletionItemKind.Property"></a><span class="ts" id=668 data-target="#details-668" data-toggle="collapse"><span class="ident">Property</span></span>
<div class="details collapse" id="details-668">
</div>



<a name="CompletionItemKind.Reference"></a><span class="ts" id=676 data-target="#details-676" data-toggle="collapse"><span class="ident">Reference</span></span>
<div class="details collapse" id="details-676">
</div>



<a name="CompletionItemKind.Snippet"></a><span class="ts" id=673 data-target="#details-673" data-toggle="collapse"><span class="ident">Snippet</span></span>
<div class="details collapse" id="details-673">
</div>



<a name="CompletionItemKind.Text"></a><span class="ts" id=659 data-target="#details-659" data-toggle="collapse"><span class="ident">Text</span></span>
<div class="details collapse" id="details-659">
</div>



<a name="CompletionItemKind.Unit"></a><span class="ts" id=669 data-target="#details-669" data-toggle="collapse"><span class="ident">Unit</span></span>
<div class="details collapse" id="details-669">
</div>



<a name="CompletionItemKind.Value"></a><span class="ts" id=670 data-target="#details-670" data-toggle="collapse"><span class="ident">Value</span></span>
<div class="details collapse" id="details-670">
</div>



<a name="CompletionItemKind.Variable"></a><span class="ts" id=664 data-target="#details-664" data-toggle="collapse"><span class="ident">Variable</span></span>
<div class="details collapse" id="details-664">
</div>

### <a name="CompletionItemProvider"></a><span class="code-item" id=696>CompletionItemProvider</span>



<div class="comment"><p>The completion item provider interface defines the contract between extensions and
the <a href="https://code.visualstudio.com/docs/editor/editingevolved#_intellisense">IntelliSense</a>.</p>
<p>When computing <em>complete</em> completion items is expensive, providers can optionally implement
the <code>resolveCompletionItem</code>-function. In that case it is enough to return completion
items with a <a href="#CompletionItem.label">label</a> from the
<a href="#CompletionItemProvider.provideCompletionItems">provideCompletionItems</a>-function. Subsequently,
when a completion item is shown in the UI and gains focus this provider is asked to resolve
the item, like adding <a href="#CompletionItem.documentation">doc-comment</a> or <a href="#CompletionItem.detail">details</a>.</p>
</div>

#### Methods



<a name="CompletionItemProvider.provideCompletionItems"></a><span class="ts" id=698 data-target="#details-698" data-toggle="collapse"><span class="ident">provideCompletionItems</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#CompletionItem">CompletionItem</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#CompletionItem">CompletionItem</a>[]&gt; &#124; <a class="type-ref" href="#CompletionList">CompletionList</a> &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#CompletionList">CompletionList</a>&gt;</span>
<div class="details collapse" id="details-698">
<div class="comment"><p>Provide completion items for the given position and document.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=699 data-target="#details-699" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="position"></a><span class="ts" id=700 data-target="#details-700" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The position at which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=701 data-target="#details-701" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#CompletionItem">CompletionItem</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#CompletionItem">CompletionItem</a>[]&gt; &#124; <a class="type-ref" href="#CompletionList">CompletionList</a> &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#CompletionList">CompletionList</a>&gt;</span></td><td><div class="comment"><p>An array of completions, a <a href="#CompletionList">completion list</a>, or a thenable that resolves to either.
The lack of a result can be signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="CompletionItemProvider.resolveCompletionItem"></a><span class="ts" id=703 data-target="#details-703" data-toggle="collapse"><span class="ident">resolveCompletionItem</span><span>(</span><span class="ident">item</span><span>: </span><a class="type-ref" href="#CompletionItem">CompletionItem</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#CompletionItem">CompletionItem</a> &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#CompletionItem">CompletionItem</a>&gt;</span>
<div class="details collapse" id="details-703">
<div class="comment"><p>Given a completion item fill in more data, like <a href="#CompletionItem.documentation">doc-comment</a>
or <a href="#CompletionItem.detail">details</a>.</p>
<p>The editor will only resolve a completion item once.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="item"></a><span class="ts" id=704 data-target="#details-704" data-toggle="collapse"><span class="ident">item</span><span>: </span><a class="type-ref" href="#CompletionItem">CompletionItem</a></span></td><td><div class="comment"><p>A completion item currently active in the UI.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=705 data-target="#details-705" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#CompletionItem">CompletionItem</a> &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#CompletionItem">CompletionItem</a>&gt;</span></td><td><div class="comment"><p>The resolved completion item or a thenable that resolves to of such. It is OK to return the given
<code>item</code>. When no result is returned, the given <code>item</code> will be used.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="CompletionList"></a><span class="code-item" id=689>CompletionList</span>



<div class="comment"><p>Represents a collection of <a href="#CompletionItem">completion items</a> to be presented
in the editor.</p>
</div>

#### Constructors



<a name="CompletionList.new CompletionList"></a><span class="ts" id=693 data-target="#details-693" data-toggle="collapse"><span class="ident">new CompletionList</span><span>(</span><span class="ident">items</span><span>?</span><span>: </span><a class="type-ref" href="#CompletionItem">CompletionItem</a>[], <span class="ident">isIncomplete</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a><span>)</span><span>: </span><a class="type-ref" href="#CompletionList">CompletionList</a></span>
<div class="details collapse" id="details-693">
<div class="comment"><p>Creates a new completion list.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="items"></a><span class="ts" id=694 data-target="#details-694" data-toggle="collapse"><span class="ident">items</span><span>?</span><span>: </span><a class="type-ref" href="#CompletionItem">CompletionItem</a>[]</span></td><td><div class="comment"><p>The completion items.</p>
</div></td></tr>
<tr><td><a name="isIncomplete"></a><span class="ts" id=695 data-target="#details-695" data-toggle="collapse"><span class="ident">isIncomplete</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a></span></td><td><div class="comment"><p>The list is not complete.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#CompletionList">CompletionList</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="CompletionList.isIncomplete"></a><span class="ts" id=690 data-target="#details-690" data-toggle="collapse"><span class="ident">isIncomplete</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-690">
<div class="comment"><p>This list it not complete. Further typing should result in recomputing
this list.</p>
</div>
</div>



<a name="CompletionList.items"></a><span class="ts" id=691 data-target="#details-691" data-toggle="collapse"><span class="ident">items</span><span>: </span><a class="type-ref" href="#CompletionItem">CompletionItem</a>[]</span>
<div class="details collapse" id="details-691">
<div class="comment"><p>The completion items.</p>
</div>
</div>

### <a name="DecorationOptions"></a><span class="code-item" id=290>DecorationOptions</span>



<div class="comment"><p>Represents options for a specific decoration in a <a href="#TextEditorDecorationType">decoration set</a>.</p>
</div>

#### Properties



<a name="DecorationOptions.hoverMessage"></a><span class="ts" id=292 data-target="#details-292" data-toggle="collapse"><span class="ident">hoverMessage</span><span>: </span><a class="type-ref" href="#MarkedString">MarkedString</a> &#124; <a class="type-ref" href="#MarkedString">MarkedString</a>[]</span>
<div class="details collapse" id="details-292">
<div class="comment"><p>A message that should be rendered when hovering over the decoration.</p>
</div>
</div>



<a name="DecorationOptions.range"></a><span class="ts" id=291 data-target="#details-291" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-291">
<div class="comment"><p>Range to which this decoration is applied.</p>
</div>
</div>

### <a name="DecorationRenderOptions"></a><span class="code-item" id=270>DecorationRenderOptions</span>



<div class="comment"><p>Represents rendering styles for a <a href="#TextEditorDecorationType">text editor decoration</a>.</p>
</div>

#### Properties



<a name="DecorationRenderOptions.backgroundColor"></a><span class="ts" id=275 data-target="#details-275" data-toggle="collapse"><span class="ident">backgroundColor</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-275">
<div class="comment"><p>Background color of the decoration. Use rgba() and define transparent background colors to play well with other decorations.</p>
</div>
</div>



<a name="DecorationRenderOptions.borderColor"></a><span class="ts" id=279 data-target="#details-279" data-toggle="collapse"><span class="ident">borderColor</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-279">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="DecorationRenderOptions.borderRadius"></a><span class="ts" id=280 data-target="#details-280" data-toggle="collapse"><span class="ident">borderRadius</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-280">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="DecorationRenderOptions.borderSpacing"></a><span class="ts" id=281 data-target="#details-281" data-toggle="collapse"><span class="ident">borderSpacing</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-281">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="DecorationRenderOptions.borderStyle"></a><span class="ts" id=282 data-target="#details-282" data-toggle="collapse"><span class="ident">borderStyle</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-282">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="DecorationRenderOptions.borderWidth"></a><span class="ts" id=283 data-target="#details-283" data-toggle="collapse"><span class="ident">borderWidth</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-283">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="DecorationRenderOptions.color"></a><span class="ts" id=286 data-target="#details-286" data-toggle="collapse"><span class="ident">color</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-286">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="DecorationRenderOptions.cursor"></a><span class="ts" id=285 data-target="#details-285" data-toggle="collapse"><span class="ident">cursor</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-285">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="DecorationRenderOptions.dark"></a><span class="ts" id=274 data-target="#details-274" data-toggle="collapse"><span class="ident">dark</span><span>?</span><span>: </span><a class="type-ref" href="#ThemableDecorationRenderOptions">ThemableDecorationRenderOptions</a></span>
<div class="details collapse" id="details-274">
<div class="comment"><p>Overwrite options for dark themes.</p>
</div>
</div>



<a name="DecorationRenderOptions.gutterIconPath"></a><span class="ts" id=288 data-target="#details-288" data-toggle="collapse"><span class="ident">gutterIconPath</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-288">
<div class="comment"><p>An <strong>absolute path</strong> to an image to be rendered in the gutterIconPath.</p>
</div>
</div>



<a name="DecorationRenderOptions.isWholeLine"></a><span class="ts" id=271 data-target="#details-271" data-toggle="collapse"><span class="ident">isWholeLine</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-271">
<div class="comment"><p>Should the decoration be rendered also on the whitespace after the line text.
Defaults to <code>false</code>.</p>
</div>
</div>



<a name="DecorationRenderOptions.letterSpacing"></a><span class="ts" id=287 data-target="#details-287" data-toggle="collapse"><span class="ident">letterSpacing</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-287">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="DecorationRenderOptions.light"></a><span class="ts" id=273 data-target="#details-273" data-toggle="collapse"><span class="ident">light</span><span>?</span><span>: </span><a class="type-ref" href="#ThemableDecorationRenderOptions">ThemableDecorationRenderOptions</a></span>
<div class="details collapse" id="details-273">
<div class="comment"><p>Overwrite options for light themes.</p>
</div>
</div>



<a name="DecorationRenderOptions.outlineColor"></a><span class="ts" id=276 data-target="#details-276" data-toggle="collapse"><span class="ident">outlineColor</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-276">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="DecorationRenderOptions.outlineStyle"></a><span class="ts" id=277 data-target="#details-277" data-toggle="collapse"><span class="ident">outlineStyle</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-277">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="DecorationRenderOptions.outlineWidth"></a><span class="ts" id=278 data-target="#details-278" data-toggle="collapse"><span class="ident">outlineWidth</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-278">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="DecorationRenderOptions.overviewRulerColor"></a><span class="ts" id=289 data-target="#details-289" data-toggle="collapse"><span class="ident">overviewRulerColor</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-289">
<div class="comment"><p>The color of the decoration in the overview ruler. Use rgba() and define transparent colors to play well with other decorations.</p>
</div>
</div>



<a name="DecorationRenderOptions.overviewRulerLane"></a><span class="ts" id=272 data-target="#details-272" data-toggle="collapse"><span class="ident">overviewRulerLane</span><span>?</span><span>: </span><a class="type-ref" href="#OverviewRulerLane">OverviewRulerLane</a></span>
<div class="details collapse" id="details-272">
<div class="comment"><p>The position in the overview ruler where the decoration should be rendered.</p>
</div>
</div>



<a name="DecorationRenderOptions.textDecoration"></a><span class="ts" id=284 data-target="#details-284" data-toggle="collapse"><span class="ident">textDecoration</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-284">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>

### <a name="Definition"></a><span class="code-item" id=876>Definition</span>



<div class="comment"><p>The definition of a symbol represented as one or many <a href="#Location">locations</a>.
For most programming languages there is only one location at which a symbol is
defined.</p>
</div>



<a name="Definition"></a><span class="ts" id=876 data-target="#details-876" data-toggle="collapse"><span class="ident">Definition</span><span>: </span><a class="type-ref" href="#Location">Location</a> &#124; <a class="type-ref" href="#Location">Location</a>[]</span>

### <a name="DefinitionProvider"></a><span class="code-item" id=465>DefinitionProvider</span>



<div class="comment"><p>The definition provider interface defines the contract between extensions and
the <a href="https://code.visualstudio.com/docs/editor/editingevolved#_go-to-definition">go to definition</a>
and peek definition features.</p>
</div>

#### Methods



<a name="DefinitionProvider.provideDefinition"></a><span class="ts" id=467 data-target="#details-467" data-toggle="collapse"><span class="ident">provideDefinition</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#Definition">Definition</a> &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#Definition">Definition</a>&gt;</span>
<div class="details collapse" id="details-467">
<div class="comment"><p>Provide the definition of the symbol at the given position and document.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=468 data-target="#details-468" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="position"></a><span class="ts" id=469 data-target="#details-469" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The position at which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=470 data-target="#details-470" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Definition">Definition</a> &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#Definition">Definition</a>&gt;</span></td><td><div class="comment"><p>A definition or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code> or <code>null</code>.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="Diagnostic"></a><span class="code-item" id=771>Diagnostic</span>



<div class="comment"><p>Represents a diagnostic, such as a compiler error or warning. Diagnostic objects
are only valid in the scope of a file.</p>
</div>

#### Constructors



<a name="Diagnostic.new Diagnostic"></a><span class="ts" id=778 data-target="#details-778" data-toggle="collapse"><span class="ident">new Diagnostic</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">message</span><span>: </span><a class="type-instrinct">string</a>, <span class="ident">severity</span><span>?</span><span>: </span><a class="type-ref" href="#DiagnosticSeverity">DiagnosticSeverity</a><span>)</span><span>: </span><a class="type-ref" href="#Diagnostic">Diagnostic</a></span>
<div class="details collapse" id="details-778">
<div class="comment"><p>Creates a new diagnostic object.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=779 data-target="#details-779" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>The range to which this diagnostic applies.</p>
</div></td></tr>
<tr><td><a name="message"></a><span class="ts" id=780 data-target="#details-780" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The human-readable message.</p>
</div></td></tr>
<tr><td><a name="severity"></a><span class="ts" id=781 data-target="#details-781" data-toggle="collapse"><span class="ident">severity</span><span>?</span><span>: </span><a class="type-ref" href="#DiagnosticSeverity">DiagnosticSeverity</a></span></td><td><div class="comment"><p>The severity, default is <a href="#DiagnosticSeverity.Error">error</a>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Diagnostic">Diagnostic</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="Diagnostic.code"></a><span class="ts" id=776 data-target="#details-776" data-toggle="collapse"><span class="ident">code</span><span>: </span><a class="type-instrinct">string</a> &#124; <a class="type-instrinct">number</a></span>
<div class="details collapse" id="details-776">
<div class="comment"><p>A code or identifier for this diagnostics. Will not be surfaced
to the user, but should be used for later processing, e.g. when
providing <a href="#CodeActionContext">code actions</a>.</p>
</div>
</div>



<a name="Diagnostic.message"></a><span class="ts" id=773 data-target="#details-773" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-773">
<div class="comment"><p>The human-readable message.</p>
</div>
</div>



<a name="Diagnostic.range"></a><span class="ts" id=772 data-target="#details-772" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-772">
<div class="comment"><p>The range to which this diagnostic applies.</p>
</div>
</div>



<a name="Diagnostic.severity"></a><span class="ts" id=775 data-target="#details-775" data-toggle="collapse"><span class="ident">severity</span><span>: </span><a class="type-ref" href="#DiagnosticSeverity">DiagnosticSeverity</a></span>
<div class="details collapse" id="details-775">
<div class="comment"><p>The severity, default is <a href="#DiagnosticSeverity.Error">error</a>.</p>
</div>
</div>



<a name="Diagnostic.source"></a><span class="ts" id=774 data-target="#details-774" data-toggle="collapse"><span class="ident">source</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-774">
<div class="comment"><p>A human-readable string describing the source of this
diagnostic, e.g. &#39;typescript&#39; or &#39;super lint&#39;.</p>
</div>
</div>

### <a name="DiagnosticCollection"></a><span class="code-item" id=782>DiagnosticCollection</span>



<div class="comment"><p>A diagnostics collection is a container that manages a set of
<a href="#Diagnostic">diagnostics</a>. Diagnostics are always scopes to a
a diagnostics collection and a resource.</p>
<p>To get an instance of a <code>DiagnosticCollection</code> use
<a href="#languages.createDiagnosticCollection">createDiagnosticCollection</a>.</p>
</div>

#### Properties



<a name="DiagnosticCollection.name"></a><span class="ts" id=783 data-target="#details-783" data-toggle="collapse"><span class="ident">name</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-783">
<div class="comment"><p>The name of this diagnostic collection, for instance <code>typescript</code>. Every diagnostic
from this collection will be associated with this name. Also, the task framework uses this
name when defining <a href="https://code.visualstudio.com/docs/editor/tasks#_defining-a-problem-matcher">problem matchers</a>.</p>
</div>
</div>

#### Methods



<a name="DiagnosticCollection.clear"></a><span class="ts" id=794 data-target="#details-794" data-toggle="collapse"><span class="ident">clear</span><span>(</span><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-794">
<div class="comment"><p>Remove all diagnostics from this collection. The same
as calling <code>#set(undefined)</code>;</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="DiagnosticCollection.delete"></a><span class="ts" id=789 data-target="#details-789" data-toggle="collapse"><span class="ident">delete</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-789">
<div class="comment"><p>Remove all diagnostics from this collection that belong
to the provided <code>uri</code>. The same as <code>#set(uri, undefined)</code>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=790 data-target="#details-790" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A resource identifier.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="DiagnosticCollection.dispose"></a><span class="ts" id=796 data-target="#details-796" data-toggle="collapse"><span class="ident">dispose</span><span>(</span><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-796">
<div class="comment"><p>Dispose and free associated resources. Calls
<a href="#DiagnosticCollection.clear">clear</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="DiagnosticCollection.set"></a><span class="ts" id=785 data-target="#details-785" data-toggle="collapse"><span class="ident">set</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a>, <span class="ident">diagnostics</span><span>: </span><a class="type-ref" href="#Diagnostic">Diagnostic</a>[]<span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-785">
<div class="comment"><p>Assign diagnostics for given resource. Will replace
existing diagnostics for that resource.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=786 data-target="#details-786" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A resource identifier.</p>
</div></td></tr>
<tr><td><a name="diagnostics"></a><span class="ts" id=787 data-target="#details-787" data-toggle="collapse"><span class="ident">diagnostics</span><span>: </span><a class="type-ref" href="#Diagnostic">Diagnostic</a>[]</span></td><td><div class="comment"><p>Array of diagnostics or <code>undefined</code></p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="DiagnosticCollection.set"></a><span class="ts" id=791 data-target="#details-791" data-toggle="collapse"><span class="ident">set</span><span>(</span><span class="ident">entries</span><span>: </span>[<a class="type-ref" href="#Uri">Uri</a>, <a class="type-ref" href="#Diagnostic">Diagnostic</a>[]][]<span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-791">
<div class="comment"><p>Replace all entries in this collection.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="entries"></a><span class="ts" id=792 data-target="#details-792" data-toggle="collapse"><span class="ident">entries</span><span>: </span>[<a class="type-ref" href="#Uri">Uri</a>, <a class="type-ref" href="#Diagnostic">Diagnostic</a>[]][]</span></td><td><div class="comment"><p>An array of tuples, like <code>[[file1, [d1, d2]], [file2, [d3, d4, d5]]]</code>, or <code>undefined</code>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="DiagnosticSeverity"></a><span class="code-item" id=766>DiagnosticSeverity</span>



<div class="comment"><p>Represents the severity of diagnostics.</p>
</div>

#### Enumeration members



<a name="DiagnosticSeverity.Error"></a><span class="ts" id=767 data-target="#details-767" data-toggle="collapse"><span class="ident">Error</span></span>
<div class="details collapse" id="details-767">
<em>0</em>
</div>



<a name="DiagnosticSeverity.Hint"></a><span class="ts" id=770 data-target="#details-770" data-toggle="collapse"><span class="ident">Hint</span></span>
<div class="details collapse" id="details-770">
<em>3</em>
</div>



<a name="DiagnosticSeverity.Information"></a><span class="ts" id=769 data-target="#details-769" data-toggle="collapse"><span class="ident">Information</span></span>
<div class="details collapse" id="details-769">
<em>2</em>
</div>



<a name="DiagnosticSeverity.Warning"></a><span class="ts" id=768 data-target="#details-768" data-toggle="collapse"><span class="ident">Warning</span></span>
<div class="details collapse" id="details-768">
<em>1</em>
</div>

### <a name="Disposable"></a><span class="code-item" id=356>Disposable</span>



<div class="comment"><p>Represents a type which can release resources, such
as event listening or a timer.</p>
</div>

#### Static



<a name="Disposable.from"></a><span class="ts" id=358 data-target="#details-358" data-toggle="collapse"><span class="ident">from</span><span>(</span><span>...</span><span class="ident">disposableLikes</span><span>: </span>{dispose: () =&gt; <a class="type-instrinct">any</a>}[]<span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-358">
<div class="comment"><p>Combine many disposable-likes into one. Use this method
when having objects with a dispose function which are not
instances of Disposable.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="disposableLikes"></a><span class="ts" id=359 data-target="#details-359" data-toggle="collapse"><span>...</span><span class="ident">disposableLikes</span><span>: </span>{dispose: () =&gt; <a class="type-instrinct">any</a>}[]</span></td><td><div class="comment"><p>Objects that have at least a <code>dispose</code>-function member.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>Returns a new disposable which, upon dispose, will
dispose all provided disposables.</p>
</div></td></tr>
</table>
</div>
</div>

#### Constructors



<a name="Disposable.new Disposable"></a><span class="ts" id=365 data-target="#details-365" data-toggle="collapse"><span class="ident">new Disposable</span><span>(</span><span class="ident">callOnDispose</span><span>: </span><a class="type-ref" href="#Function">Function</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-365">
<div class="comment"><p>Creates a new Disposable calling the provided function
on dispose.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="callOnDispose"></a><span class="ts" id=366 data-target="#details-366" data-toggle="collapse"><span class="ident">callOnDispose</span><span>: </span><a class="type-ref" href="#Function">Function</a></span></td><td><div class="comment"><p>Function that disposes something.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Methods



<a name="Disposable.dispose"></a><span class="ts" id=368 data-target="#details-368" data-toggle="collapse"><span class="ident">dispose</span><span>(</span><span>)</span><span>: </span><a class="type-instrinct">any</a></span>
<div class="details collapse" id="details-368">
<div class="comment"><p>Dispose this object.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">any</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="DocumentFilter"></a><span class="code-item" id=435>DocumentFilter</span>



<div class="comment"><p>A document filter denotes a document by different properties like
the <a href="#TextDocument.languageId">language</a>, the <a href="#Uri.scheme">scheme</a> of
its resource, or a glob-pattern that is applied to the <a href="#TextDocument.fileName">path</a>.</p>
<ul>
<li><em>sample</em> - A language filter that applies to typescript files on disk: <code>{ language: &#39;typescript&#39;, scheme: &#39;file&#39; }</code></li>
</ul>
<ul>
<li><em>sample</em> - A language filter that applies to all package.json paths: <code>{ language: &#39;json&#39;, pattern: &#39;**∕project.json&#39; }</code></li>
</ul>
</div>

#### Properties



<a name="DocumentFilter.language"></a><span class="ts" id=436 data-target="#details-436" data-toggle="collapse"><span class="ident">language</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-436">
<div class="comment"><p>A language id, like <code>typescript</code>.</p>
</div>
</div>



<a name="DocumentFilter.pattern"></a><span class="ts" id=438 data-target="#details-438" data-toggle="collapse"><span class="ident">pattern</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-438">
<div class="comment"><p>A glob pattern, like <code>*.{ts,js}</code>.</p>
</div>
</div>



<a name="DocumentFilter.scheme"></a><span class="ts" id=437 data-target="#details-437" data-toggle="collapse"><span class="ident">scheme</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-437">
<div class="comment"><p>A Uri <a href="#Uri.scheme">scheme</a>, like <code>file</code> or <code>untitled</code>.</p>
</div>
</div>

### <a name="DocumentFormattingEditProvider"></a><span class="code-item" id=612>DocumentFormattingEditProvider</span>



<div class="comment"><p>The document formatting provider interface defines the contract between extensions and
the formatting-feature.</p>
</div>

#### Methods



<a name="DocumentFormattingEditProvider.provideDocumentFormattingEdits"></a><span class="ts" id=614 data-target="#details-614" data-toggle="collapse"><span class="ident">provideDocumentFormattingEdits</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">options</span><span>: </span><a class="type-ref" href="#FormattingOptions">FormattingOptions</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextEdit">TextEdit</a>[]&gt;</span>
<div class="details collapse" id="details-614">
<div class="comment"><p>Provide formatting edits for a whole document.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=615 data-target="#details-615" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=616 data-target="#details-616" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#FormattingOptions">FormattingOptions</a></span></td><td><div class="comment"><p>Options controlling formatting.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=617 data-target="#details-617" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TextEdit">TextEdit</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextEdit">TextEdit</a>[]&gt;</span></td><td><div class="comment"><p>A set of text edits or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="DocumentHighlight"></a><span class="code-item" id=488>DocumentHighlight</span>



<div class="comment"><p>A document highlight is a range inside a text document which deserves
special attention. Usually a document highlight is visualized by changing
the background color of its range.</p>
</div>

#### Constructors



<a name="DocumentHighlight.new DocumentHighlight"></a><span class="ts" id=492 data-target="#details-492" data-toggle="collapse"><span class="ident">new DocumentHighlight</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">kind</span><span>?</span><span>: </span><a class="type-ref" href="#DocumentHighlightKind">DocumentHighlightKind</a><span>)</span><span>: </span><a class="type-ref" href="#DocumentHighlight">DocumentHighlight</a></span>
<div class="details collapse" id="details-492">
<div class="comment"><p>Creates a new document highlight object.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=493 data-target="#details-493" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>The range the highlight applies to.</p>
</div></td></tr>
<tr><td><a name="kind"></a><span class="ts" id=494 data-target="#details-494" data-toggle="collapse"><span class="ident">kind</span><span>?</span><span>: </span><a class="type-ref" href="#DocumentHighlightKind">DocumentHighlightKind</a></span></td><td><div class="comment"><p>The highlight kind, default is <a href="#DocumentHighlightKind.Text">text</a>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#DocumentHighlight">DocumentHighlight</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="DocumentHighlight.kind"></a><span class="ts" id=490 data-target="#details-490" data-toggle="collapse"><span class="ident">kind</span><span>: </span><a class="type-ref" href="#DocumentHighlightKind">DocumentHighlightKind</a></span>
<div class="details collapse" id="details-490">
<div class="comment"><p>The highlight kind, default is <a href="#DocumentHighlightKind.Text">text</a>.</p>
</div>
</div>



<a name="DocumentHighlight.range"></a><span class="ts" id=489 data-target="#details-489" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-489">
<div class="comment"><p>The range this highlight applies to.</p>
</div>
</div>

### <a name="DocumentHighlightKind"></a><span class="code-item" id=484>DocumentHighlightKind</span>



<div class="comment"><p>A document highlight kind.</p>
</div>

#### Enumeration members



<a name="DocumentHighlightKind.Read"></a><span class="ts" id=486 data-target="#details-486" data-toggle="collapse"><span class="ident">Read</span></span>
<div class="details collapse" id="details-486">
</div>



<a name="DocumentHighlightKind.Text"></a><span class="ts" id=485 data-target="#details-485" data-toggle="collapse"><span class="ident">Text</span></span>
<div class="details collapse" id="details-485">
</div>



<a name="DocumentHighlightKind.Write"></a><span class="ts" id=487 data-target="#details-487" data-toggle="collapse"><span class="ident">Write</span></span>
<div class="details collapse" id="details-487">
</div>

### <a name="DocumentHighlightProvider"></a><span class="code-item" id=495>DocumentHighlightProvider</span>



<div class="comment"><p>The document highlight provider interface defines the contract between extensions and
the word-highlight-feature.</p>
</div>

#### Methods



<a name="DocumentHighlightProvider.provideDocumentHighlights"></a><span class="ts" id=497 data-target="#details-497" data-toggle="collapse"><span class="ident">provideDocumentHighlights</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#DocumentHighlight">DocumentHighlight</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#DocumentHighlight">DocumentHighlight</a>[]&gt;</span>
<div class="details collapse" id="details-497">
<div class="comment"><p>Provide a set of document highlights, like all occurrences of a variable or
all exit-points of a function.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=498 data-target="#details-498" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="position"></a><span class="ts" id=499 data-target="#details-499" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The position at which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=500 data-target="#details-500" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#DocumentHighlight">DocumentHighlight</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#DocumentHighlight">DocumentHighlight</a>[]&gt;</span></td><td><div class="comment"><p>An array of document highlights or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="DocumentRangeFormattingEditProvider"></a><span class="code-item" id=618>DocumentRangeFormattingEditProvider</span>



<div class="comment"><p>The document formatting provider interface defines the contract between extensions and
the formatting-feature.</p>
</div>

#### Methods



<a name="DocumentRangeFormattingEditProvider.provideDocumentRangeFormattingEdits"></a><span class="ts" id=620 data-target="#details-620" data-toggle="collapse"><span class="ident">provideDocumentRangeFormattingEdits</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">options</span><span>: </span><a class="type-ref" href="#FormattingOptions">FormattingOptions</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextEdit">TextEdit</a>[]&gt;</span>
<div class="details collapse" id="details-620">
<div class="comment"><p>Provide formatting edits for a range in a document.</p>
<p>The given range is a hint and providers can decide to format a smaller
or larger range. Often this is done by adjusting the start and end
of the range to full syntax nodes.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=621 data-target="#details-621" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="range"></a><span class="ts" id=622 data-target="#details-622" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>The range which should be formatted.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=623 data-target="#details-623" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#FormattingOptions">FormattingOptions</a></span></td><td><div class="comment"><p>Options controlling formatting.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=624 data-target="#details-624" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TextEdit">TextEdit</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextEdit">TextEdit</a>[]&gt;</span></td><td><div class="comment"><p>A set of text edits or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="DocumentSelector"></a><span class="code-item" id=875>DocumentSelector</span>



<div class="comment"><p>A language selector is the combination of one or many language identifiers
and <a href="#LanguageFilter">language filters</a>.</p>
<ul>
<li><em>sample</em> - <code>let sel:DocumentSelector = &#39;typescript&#39;</code>;</li>
</ul>
<ul>
<li><em>sample</em> - <code>let sel:DocumentSelector = [&#39;typescript&#39;, { language: &#39;json&#39;, pattern: &#39;**∕tsconfig.json&#39; }]</code>;</li>
</ul>
</div>



<a name="DocumentSelector"></a><span class="ts" id=875 data-target="#details-875" data-toggle="collapse"><span class="ident">DocumentSelector</span><span>: </span><a class="type-instrinct">string</a> &#124; <a class="type-ref" href="#DocumentFilter">DocumentFilter</a> &#124; <a class="type-instrinct">string</a> &#124; <a class="type-ref" href="#DocumentFilter">DocumentFilter</a>[]</span>

### <a name="DocumentSymbolProvider"></a><span class="code-item" id=535>DocumentSymbolProvider</span>



<div class="comment"><p>The document symbol provider interface defines the contract between extensions and
the <a href="https://code.visualstudio.com/docs/editor/editingevolved#_goto-symbol">go to symbol</a>-feature.</p>
</div>

#### Methods



<a name="DocumentSymbolProvider.provideDocumentSymbols"></a><span class="ts" id=537 data-target="#details-537" data-toggle="collapse"><span class="ident">provideDocumentSymbols</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#SymbolInformation">SymbolInformation</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#SymbolInformation">SymbolInformation</a>[]&gt;</span>
<div class="details collapse" id="details-537">
<div class="comment"><p>Provide symbol information for the given document.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=538 data-target="#details-538" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=539 data-target="#details-539" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#SymbolInformation">SymbolInformation</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#SymbolInformation">SymbolInformation</a>[]&gt;</span></td><td><div class="comment"><p>An array of document highlights or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="EnterAction"></a><span class="code-item" id=719>EnterAction</span>



<div class="comment"><p>Describes what to do when pressing Enter.</p>
</div>

#### Properties



<a name="EnterAction.appendText"></a><span class="ts" id=721 data-target="#details-721" data-toggle="collapse"><span class="ident">appendText</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-721">
<div class="comment"><p>Describes text to be appended after the new line and after the indentation.</p>
</div>
</div>



<a name="EnterAction.indentAction"></a><span class="ts" id=720 data-target="#details-720" data-toggle="collapse"><span class="ident">indentAction</span><span>: </span><a class="type-ref" href="#IndentAction">IndentAction</a></span>
<div class="details collapse" id="details-720">
<div class="comment"><p>Describe what to do with the indentation.</p>
</div>
</div>



<a name="EnterAction.removeText"></a><span class="ts" id=722 data-target="#details-722" data-toggle="collapse"><span class="ident">removeText</span><span>?</span><span>: </span><a class="type-instrinct">number</a></span>
<div class="details collapse" id="details-722">
<div class="comment"><p>Describes the number of characters to remove from the new line&#39;s indentation.</p>
</div>
</div>

### <a name="Event"></a><span class="code-item" id=369>Event&lt;T&gt;</span>



<div class="comment"><p>Represents a typed event.</p>
<p>A function that represents an event to which you subscribe by calling it with
a listener function as argument.</p>
<ul>
<li><em>sample</em> - <code>item.onDidChange(function(event) { console.log(&quot;Event happened: &quot; + event); });</code></li>
</ul>
</div>



<a name="__call"></a><span class="ts" id=371 data-target="#details-371" data-toggle="collapse"><span>(</span><span class="ident">listener</span><span>: </span>(e: <a class="type-instrinct">T</a>) =&gt; <a class="type-instrinct">any</a>, <span class="ident">thisArgs</span><span>?</span><span>: </span><a class="type-instrinct">any</a>, <span class="ident">disposables</span><span>?</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-371">
<div class="comment"><p>A function that represents an event to which you subscribe by calling it with
a listener function as argument.</p>
<p>A function that represents an event to which you subscribe by calling it with
a listener function as argument.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="listener"></a><span class="ts" id=372 data-target="#details-372" data-toggle="collapse"><span class="ident">listener</span><span>: </span>(e: <a class="type-instrinct">T</a>) =&gt; <a class="type-instrinct">any</a></span></td><td><div class="comment"><p>The listener function will be called when the event happens.</p>
</div></td></tr>
<tr><td><a name="thisArgs"></a><span class="ts" id=376 data-target="#details-376" data-toggle="collapse"><span class="ident">thisArgs</span><span>?</span><span>: </span><a class="type-instrinct">any</a></span></td><td><div class="comment"><p>The <code>this</code>-argument which will be used when calling the event listener.</p>
</div></td></tr>
<tr><td><a name="disposables"></a><span class="ts" id=377 data-target="#details-377" data-toggle="collapse"><span class="ident">disposables</span><span>?</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a>[]</span></td><td><div class="comment"><p>An array to which a <a href="#Disposable">disposeable</a> will be added.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A disposable which unsubscribes the event listener.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="EventEmitter"></a><span class="code-item" id=378>EventEmitter&lt;T&gt;</span>



<div class="comment"><p>An event emitter can be used to create and manage an <a href="#Event">event</a> for others
to subscribe to. One emitter always owns one event.</p>
<p>Use this class if you want to provide event from within your extension, for instance
inside a <a href="#TextDocumentContentProvider">TextDocumentContentProvider</a> or when providing
API to other extensions.</p>
</div>

#### Properties



<a name="EventEmitter.event"></a><span class="ts" id=380 data-target="#details-380" data-toggle="collapse"><span class="ident">event</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-instrinct">T</a>&gt;</span>
<div class="details collapse" id="details-380">
<div class="comment"><p>The event listeners can subscribe to.</p>
</div>
</div>

#### Methods



<a name="EventEmitter.dispose"></a><span class="ts" id=385 data-target="#details-385" data-toggle="collapse"><span class="ident">dispose</span><span>(</span><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-385">
<div class="comment"><p>Dispose this object and free resources.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="EventEmitter.fire"></a><span class="ts" id=382 data-target="#details-382" data-toggle="collapse"><span class="ident">fire</span><span>(</span><span class="ident">data</span><span>?</span><span>: </span><a class="type-instrinct">T</a><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-382">
<div class="comment"><p>Notify all subscribers of the <a href="EventEmitter#event">event</a>. Failure
of one or more listener will not fail this function call.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="data"></a><span class="ts" id=383 data-target="#details-383" data-toggle="collapse"><span class="ident">data</span><span>?</span><span>: </span><a class="type-instrinct">T</a></span></td><td><div class="comment"><p>The event object.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="Extension"></a><span class="code-item" id=837>Extension&lt;T&gt;</span>



<div class="comment"><p>Represents an extension.</p>
<p>To get an instance of an <code>Extension</code> use <a href="#extensions.getExtension">getExtension</a>.</p>
</div>

#### Properties



<a name="Extension.exports"></a><span class="ts" id=843 data-target="#details-843" data-toggle="collapse"><span class="ident">exports</span><span>: </span><a class="type-instrinct">T</a></span>
<div class="details collapse" id="details-843">
<div class="comment"><p>The public API exported by this extension. It is an invalid action
to access this field before this extension has been activated.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="Extension.extensionPath"></a><span class="ts" id=840 data-target="#details-840" data-toggle="collapse"><span class="ident">extensionPath</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-840">
<div class="comment"><p>The absolute file path of the directory containing this extension.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="Extension.id"></a><span class="ts" id=839 data-target="#details-839" data-toggle="collapse"><span class="ident">id</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-839">
<div class="comment"><p>The canonical extension identifier in the form of: <code>publisher.name</code>.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="Extension.isActive"></a><span class="ts" id=841 data-target="#details-841" data-toggle="collapse"><span class="ident">isActive</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-841">
<div class="comment"><p><code>true</code> if the extension has been activated.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="Extension.packageJSON"></a><span class="ts" id=842 data-target="#details-842" data-toggle="collapse"><span class="ident">packageJSON</span><span>: </span><a class="type-instrinct">any</a></span>
<div class="details collapse" id="details-842">
<div class="comment"><p>The parsed contents of the extension&#39;s package.json.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>

#### Methods



<a name="Extension.activate"></a><span class="ts" id=845 data-target="#details-845" data-toggle="collapse"><span class="ident">activate</span><span>(</span><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">T</a>&gt;</span>
<div class="details collapse" id="details-845">
<div class="comment"><p>Activates this extension and returns its public API.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">T</a>&gt;</span></td><td><div class="comment"><p>A promise that will resolve when this extension has been activated.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="ExtensionContext"></a><span class="code-item" id=846>ExtensionContext</span>



<div class="comment"><p>An extension context is a collection of utilities private to an
extension.</p>
<p>An instance of an <code>ExtensionContext</code> is provided as the first
parameter to the <code>activate</code>-call of an extension.</p>
</div>

#### Properties



<a name="ExtensionContext.extensionPath"></a><span class="ts" id=853 data-target="#details-853" data-toggle="collapse"><span class="ident">extensionPath</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-853">
<div class="comment"><p>The absolute file path of the directory containing the extension.</p>
</div>
</div>



<a name="ExtensionContext.globalState"></a><span class="ts" id=852 data-target="#details-852" data-toggle="collapse"><span class="ident">globalState</span><span>: </span><a class="type-ref" href="#Memento">Memento</a></span>
<div class="details collapse" id="details-852">
<div class="comment"><p>A memento object that stores state independent
of the current opened <a href="#workspace.path">workspace</a>.</p>
</div>
</div>



<a name="ExtensionContext.subscriptions"></a><span class="ts" id=847 data-target="#details-847" data-toggle="collapse"><span class="ident">subscriptions</span><span>: </span>{dispose}[]</span>
<div class="details collapse" id="details-847">
<div class="comment"><p>An array to which disposables can be added. When this
extension is deactivated the disposables will be disposed.</p>
</div>
</div>



<a name="ExtensionContext.workspaceState"></a><span class="ts" id=851 data-target="#details-851" data-toggle="collapse"><span class="ident">workspaceState</span><span>: </span><a class="type-ref" href="#Memento">Memento</a></span>
<div class="details collapse" id="details-851">
<div class="comment"><p>A memento object that stores state in the context
of the currently opened <a href="#workspace.path">workspace</a>.</p>
</div>
</div>

#### Methods



<a name="ExtensionContext.asAbsolutePath"></a><span class="ts" id=855 data-target="#details-855" data-toggle="collapse"><span class="ident">asAbsolutePath</span><span>(</span><span class="ident">relativePath</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-855">
<div class="comment"><p>Get the absolute path of a resource contained in the extension.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="relativePath"></a><span class="ts" id=856 data-target="#details-856" data-toggle="collapse"><span class="ident">relativePath</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A relative path to a resource contained in the extension.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The absolute path of the resource.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="FileSystemWatcher"></a><span class="code-item" id=386>FileSystemWatcher</span>



<div class="comment"><p>A file system watcher notifies about changes to files and folders
on disk.</p>
<p>To get an instance of a <code>FileSystemWatcher</code> use
<a href="#workspace.createFileSystemWatcher">createFileSystemWatcher</a>.</p>
</div>

#### Events



<a name="FileSystemWatcher.onDidChange"></a><span class="ts" id=391 data-target="#details-391" data-toggle="collapse"><span class="ident">onDidChange</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#Uri">Uri</a>&gt;</span>
<div class="details collapse" id="details-391">
<div class="comment"><p>An event which fires on file/folder change.</p>
</div>
</div>



<a name="FileSystemWatcher.onDidCreate"></a><span class="ts" id=390 data-target="#details-390" data-toggle="collapse"><span class="ident">onDidCreate</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#Uri">Uri</a>&gt;</span>
<div class="details collapse" id="details-390">
<div class="comment"><p>An event which fires on file/folder creation.</p>
</div>
</div>



<a name="FileSystemWatcher.onDidDelete"></a><span class="ts" id=392 data-target="#details-392" data-toggle="collapse"><span class="ident">onDidDelete</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#Uri">Uri</a>&gt;</span>
<div class="details collapse" id="details-392">
<div class="comment"><p>An event which fires on file/folder deletion.</p>
</div>
</div>

#### Static



<a name="FileSystemWatcher.from"></a><span class="ts" id=394 data-target="#details-394" data-toggle="collapse"><span class="ident">from</span><span>(</span><span>...</span><span class="ident">disposableLikes</span><span>: </span>{dispose: () =&gt; <a class="type-instrinct">any</a>}[]<span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-394">
<div class="comment"><p>Combine many disposable-likes into one. Use this method
when having objects with a dispose function which are not
instances of Disposable.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="disposableLikes"></a><span class="ts" id=395 data-target="#details-395" data-toggle="collapse"><span>...</span><span class="ident">disposableLikes</span><span>: </span>{dispose: () =&gt; <a class="type-instrinct">any</a>}[]</span></td><td><div class="comment"><p>Objects that have at least a <code>dispose</code>-function member.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>Returns a new disposable which, upon dispose, will
dispose all provided disposables.</p>
</div></td></tr>
</table>
</div>
</div>

#### Constructors



<a name="FileSystemWatcher.new FileSystemWatcher"></a><span class="ts" id=401 data-target="#details-401" data-toggle="collapse"><span class="ident">new FileSystemWatcher</span><span>(</span><span class="ident">callOnDispose</span><span>: </span><a class="type-ref" href="#Function">Function</a><span>)</span><span>: </span><a class="type-ref" href="#FileSystemWatcher">FileSystemWatcher</a></span>
<div class="details collapse" id="details-401">
<div class="comment"><p>Creates a new Disposable calling the provided function
on dispose.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="callOnDispose"></a><span class="ts" id=402 data-target="#details-402" data-toggle="collapse"><span class="ident">callOnDispose</span><span>: </span><a class="type-ref" href="#Function">Function</a></span></td><td><div class="comment"><p>Function that disposes something.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#FileSystemWatcher">FileSystemWatcher</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="FileSystemWatcher.ignoreChangeEvents"></a><span class="ts" id=388 data-target="#details-388" data-toggle="collapse"><span class="ident">ignoreChangeEvents</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-388">
<div class="comment"><p>true if this file system watcher has been created such that
it ignores change file system events.</p>
</div>
</div>



<a name="FileSystemWatcher.ignoreCreateEvents"></a><span class="ts" id=387 data-target="#details-387" data-toggle="collapse"><span class="ident">ignoreCreateEvents</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-387">
<div class="comment"><p>true if this file system watcher has been created such that
it ignores creation file system events.</p>
</div>
</div>



<a name="FileSystemWatcher.ignoreDeleteEvents"></a><span class="ts" id=389 data-target="#details-389" data-toggle="collapse"><span class="ident">ignoreDeleteEvents</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-389">
<div class="comment"><p>true if this file system watcher has been created such that
it ignores delete file system events.</p>
</div>
</div>

#### Methods



<a name="FileSystemWatcher.dispose"></a><span class="ts" id=404 data-target="#details-404" data-toggle="collapse"><span class="ident">dispose</span><span>(</span><span>)</span><span>: </span><a class="type-instrinct">any</a></span>
<div class="details collapse" id="details-404">
<div class="comment"><p>Dispose this object.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">any</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="FormattingOptions"></a><span class="code-item" id=607>FormattingOptions</span>



<div class="comment"><p>Value-object describing what options formatting should use.</p>
</div>

#### Properties



<a name="FormattingOptions.insertSpaces"></a><span class="ts" id=609 data-target="#details-609" data-toggle="collapse"><span class="ident">insertSpaces</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-609">
<div class="comment"><p>Prefer spaces over tabs.</p>
</div>
</div>



<a name="FormattingOptions.tabSize"></a><span class="ts" id=608 data-target="#details-608" data-toggle="collapse"><span class="ident">tabSize</span><span>: </span><a class="type-instrinct">number</a></span>
<div class="details collapse" id="details-608">
<div class="comment"><p>Size of a tab in spaces.</p>
</div>
</div>

### <a name="Hover"></a><span class="code-item" id=471>Hover</span>



<div class="comment"><p>A hover represents additional information for a symbol or word. Hovers are
rendered in a tooltip-like widget.</p>
</div>

#### Constructors



<a name="Hover.new Hover"></a><span class="ts" id=475 data-target="#details-475" data-toggle="collapse"><span class="ident">new Hover</span><span>(</span><span class="ident">contents</span><span>: </span><a class="type-ref" href="#MarkedString">MarkedString</a> &#124; <a class="type-ref" href="#MarkedString">MarkedString</a>[], <span class="ident">range</span><span>?</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-ref" href="#Hover">Hover</a></span>
<div class="details collapse" id="details-475">
<div class="comment"><p>Creates a new hover object.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="contents"></a><span class="ts" id=476 data-target="#details-476" data-toggle="collapse"><span class="ident">contents</span><span>: </span><a class="type-ref" href="#MarkedString">MarkedString</a> &#124; <a class="type-ref" href="#MarkedString">MarkedString</a>[]</span></td><td><div class="comment"><p>The contents of the hover.</p>
</div></td></tr>
<tr><td><a name="range"></a><span class="ts" id=477 data-target="#details-477" data-toggle="collapse"><span class="ident">range</span><span>?</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>The range to which the hover applies.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Hover">Hover</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="Hover.contents"></a><span class="ts" id=472 data-target="#details-472" data-toggle="collapse"><span class="ident">contents</span><span>: </span><a class="type-ref" href="#MarkedString">MarkedString</a>[]</span>
<div class="details collapse" id="details-472">
<div class="comment"><p>The contents of this hover.</p>
</div>
</div>



<a name="Hover.range"></a><span class="ts" id=473 data-target="#details-473" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-473">
<div class="comment"><p>The range to which this hover applies. When missing, the
editor will use the range at the current position or the
current position itself.</p>
</div>
</div>

### <a name="HoverProvider"></a><span class="code-item" id=478>HoverProvider</span>



<div class="comment"><p>The hover provider interface defines the contract between extensions and
the <a href="https://code.visualstudio.com/docs/editor/editingevolved#_hover">hover</a>-feature.</p>
</div>

#### Methods



<a name="HoverProvider.provideHover"></a><span class="ts" id=480 data-target="#details-480" data-toggle="collapse"><span class="ident">provideHover</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#Hover">Hover</a> &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#Hover">Hover</a>&gt;</span>
<div class="details collapse" id="details-480">
<div class="comment"><p>Provide a hover for the given position and document. Multiple hovers at the same
position will be merged by the editor. A hover can have a range which defaults
to the word range at the position when omitted.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=481 data-target="#details-481" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="position"></a><span class="ts" id=482 data-target="#details-482" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The position at which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=483 data-target="#details-483" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Hover">Hover</a> &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#Hover">Hover</a>&gt;</span></td><td><div class="comment"><p>A hover or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code> or <code>null</code>.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="IndentAction"></a><span class="code-item" id=714>IndentAction</span>



<div class="comment"><p>Describes what to do with the indentation when pressing Enter.</p>
</div>

#### Enumeration members



<a name="IndentAction.Indent"></a><span class="ts" id=716 data-target="#details-716" data-toggle="collapse"><span class="ident">Indent</span></span>
<div class="details collapse" id="details-716">
</div>



<a name="IndentAction.IndentOutdent"></a><span class="ts" id=717 data-target="#details-717" data-toggle="collapse"><span class="ident">IndentOutdent</span></span>
<div class="details collapse" id="details-717">
</div>



<a name="IndentAction.None"></a><span class="ts" id=715 data-target="#details-715" data-toggle="collapse"><span class="ident">None</span></span>
<div class="details collapse" id="details-715">
</div>



<a name="IndentAction.Outdent"></a><span class="ts" id=718 data-target="#details-718" data-toggle="collapse"><span class="ident">Outdent</span></span>
<div class="details collapse" id="details-718">
</div>

### <a name="IndentationRule"></a><span class="code-item" id=709>IndentationRule</span>



<div class="comment"><p>Describes indentation rules for a language.</p>
</div>

#### Properties



<a name="IndentationRule.decreaseIndentPattern"></a><span class="ts" id=710 data-target="#details-710" data-toggle="collapse"><span class="ident">decreaseIndentPattern</span><span>: </span><a class="type-ref" href="#RegExp">RegExp</a></span>
<div class="details collapse" id="details-710">
<div class="comment"><p>If a line matches this pattern, then all the lines after it should be unindendented once (until another rule matches).</p>
</div>
</div>



<a name="IndentationRule.increaseIndentPattern"></a><span class="ts" id=711 data-target="#details-711" data-toggle="collapse"><span class="ident">increaseIndentPattern</span><span>: </span><a class="type-ref" href="#RegExp">RegExp</a></span>
<div class="details collapse" id="details-711">
<div class="comment"><p>If a line matches this pattern, then all the lines after it should be indented once (until another rule matches).</p>
</div>
</div>



<a name="IndentationRule.indentNextLinePattern"></a><span class="ts" id=712 data-target="#details-712" data-toggle="collapse"><span class="ident">indentNextLinePattern</span><span>?</span><span>: </span><a class="type-ref" href="#RegExp">RegExp</a></span>
<div class="details collapse" id="details-712">
<div class="comment"><p>If a line matches this pattern, then <strong>only the next line</strong> after it should be indented once.</p>
</div>
</div>



<a name="IndentationRule.unIndentedLinePattern"></a><span class="ts" id=713 data-target="#details-713" data-toggle="collapse"><span class="ident">unIndentedLinePattern</span><span>?</span><span>: </span><a class="type-ref" href="#RegExp">RegExp</a></span>
<div class="details collapse" id="details-713">
<div class="comment"><p>If a line matches this pattern, then its indentation should not be changed and it should not be evaluated against the other rules.</p>
</div>
</div>

### <a name="InputBoxOptions"></a><span class="code-item" id=426>InputBoxOptions</span>



<div class="comment"><p>Options to configure the behavior of the input box UI.</p>
</div>

#### Properties



<a name="InputBoxOptions.password"></a><span class="ts" id=430 data-target="#details-430" data-toggle="collapse"><span class="ident">password</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-430">
<div class="comment"><p>Set to true to show a password prompt that will not show the typed value.</p>
</div>
</div>



<a name="InputBoxOptions.placeHolder"></a><span class="ts" id=429 data-target="#details-429" data-toggle="collapse"><span class="ident">placeHolder</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-429">
<div class="comment"><p>An optional string to show as place holder in the input box to guide the user what to type.</p>
</div>
</div>



<a name="InputBoxOptions.prompt"></a><span class="ts" id=428 data-target="#details-428" data-toggle="collapse"><span class="ident">prompt</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-428">
<div class="comment"><p>The text to display underneath the input box.</p>
</div>
</div>



<a name="InputBoxOptions.validateInput"></a><span class="ts" id=431 data-target="#details-431" data-toggle="collapse"><span class="ident">validateInput</span><span>?</span><span>: </span>(value: <a class="type-instrinct">string</a>) =&gt; <a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-431">
<div class="comment"><p>An optional function that will be called to valide input and to give a hint
to the user.</p>
<ul>
<li><em>param</em> - The current value of the input box.</li>
</ul>
<ul>
<li><em>returns</em> - A human readable string which is presented as diagnostic message.
Return <code>undefined</code>, <code>null</code>, or the empty string when &#39;value&#39; is valid.</li>
</ul>
</div>
</div>



<a name="InputBoxOptions.value"></a><span class="ts" id=427 data-target="#details-427" data-toggle="collapse"><span class="ident">value</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-427">
<div class="comment"><p>The value to prefill in the input box.</p>
</div>
</div>

### <a name="LanguageConfiguration"></a><span class="code-item" id=727>LanguageConfiguration</span>



<div class="comment"><p>The language configuration interfaces defines the contract between extensions
and various editor features, like automatic bracket insertion, automatic indentation etc.</p>
</div>

#### Properties



<a name="LanguageConfiguration.___characterPairSupport"></a><span class="ts" id=741 data-target="#details-741" data-toggle="collapse"><span class="ident">___characterPairSupport</span><span>?</span><span>: </span>{autoClosingPairs: {close: <a class="type-instrinct">string</a>, notIn: <a class="type-instrinct">string</a>[], open: <a class="type-instrinct">string</a>}[]}</span>
<div class="details collapse" id="details-741">
<div class="comment"><p><strong>Deprecated</strong> Do not use.</p>
<ul>
<li><em>deprecated</em> - Will be replaced by a better API soon.</li>
</ul>
</div>
</div>



<a name="LanguageConfiguration.___electricCharacterSupport"></a><span class="ts" id=733 data-target="#details-733" data-toggle="collapse"><span class="ident">___electricCharacterSupport</span><span>?</span><span>: </span>{docComment: {close: <a class="type-instrinct">string</a>, lineStart: <a class="type-instrinct">string</a>, open: <a class="type-instrinct">string</a>, scope: <a class="type-instrinct">string</a>}}</span>
<div class="details collapse" id="details-733">
<div class="comment"><p><strong>Deprecated</strong> Do not use.</p>
<ul>
<li><em>deprecated</em> - Will be replaced by a better API soon.</li>
</ul>
</div>
</div>



<a name="LanguageConfiguration.brackets"></a><span class="ts" id=729 data-target="#details-729" data-toggle="collapse"><span class="ident">brackets</span><span>?</span><span>: </span><a class="type-ref" href="#CharacterPair">CharacterPair</a>[]</span>
<div class="details collapse" id="details-729">
<div class="comment"><p>The language&#39;s brackets.
This configuration implicitly affects pressing Enter around these brackets.</p>
</div>
</div>



<a name="LanguageConfiguration.comments"></a><span class="ts" id=728 data-target="#details-728" data-toggle="collapse"><span class="ident">comments</span><span>?</span><span>: </span><a class="type-ref" href="#CommentRule">CommentRule</a></span>
<div class="details collapse" id="details-728">
<div class="comment"><p>The language&#39;s comment settings.</p>
</div>
</div>



<a name="LanguageConfiguration.indentationRules"></a><span class="ts" id=731 data-target="#details-731" data-toggle="collapse"><span class="ident">indentationRules</span><span>?</span><span>: </span><a class="type-ref" href="#IndentationRule">IndentationRule</a></span>
<div class="details collapse" id="details-731">
<div class="comment"><p>The language&#39;s indentation settings.</p>
</div>
</div>



<a name="LanguageConfiguration.onEnterRules"></a><span class="ts" id=732 data-target="#details-732" data-toggle="collapse"><span class="ident">onEnterRules</span><span>?</span><span>: </span><a class="type-ref" href="#OnEnterRule">OnEnterRule</a>[]</span>
<div class="details collapse" id="details-732">
<div class="comment"><p>The language&#39;s rules to be evaluated when pressing Enter.</p>
</div>
</div>



<a name="LanguageConfiguration.wordPattern"></a><span class="ts" id=730 data-target="#details-730" data-toggle="collapse"><span class="ident">wordPattern</span><span>?</span><span>: </span><a class="type-ref" href="#RegExp">RegExp</a></span>
<div class="details collapse" id="details-730">
<div class="comment"><p>The language&#39;s word definition.
If the language supports Unicode identifiers (e.g. JavaScript), it is preferable
to provide a word definition that uses exclusion of known separators.
e.g.: A regex that matches anything except known separators (and dot is allowed to occur in a floating point number):
  /(-?\d<em>.\d\w</em>)|([^`~!\@@#\%\^\&amp;*()-\=+[{]}\|\;\:\&#39;\&quot;\,.\&lt;>\/\?\s]+)/g</p>
</div>
</div>

### <a name="Location"></a><span class="code-item" id=759>Location</span>



<div class="comment"><p>Represents a location inside a resource, such as a line
inside a text file.</p>
</div>

#### Constructors



<a name="Location.new Location"></a><span class="ts" id=763 data-target="#details-763" data-toggle="collapse"><span class="ident">new Location</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a>, <span class="ident">rangeOrPosition</span><span>: </span><a class="type-ref" href="#Range">Range</a> &#124; <a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-ref" href="#Location">Location</a></span>
<div class="details collapse" id="details-763">
<div class="comment"><p>Creates a new location object.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=764 data-target="#details-764" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>The resource identifier.</p>
</div></td></tr>
<tr><td><a name="rangeOrPosition"></a><span class="ts" id=765 data-target="#details-765" data-toggle="collapse"><span class="ident">rangeOrPosition</span><span>: </span><a class="type-ref" href="#Range">Range</a> &#124; <a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The range or position. Positions will be converted to an empty range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Location">Location</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="Location.range"></a><span class="ts" id=761 data-target="#details-761" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-761">
<div class="comment"><p>The document range of this locations.</p>
</div>
</div>



<a name="Location.uri"></a><span class="ts" id=760 data-target="#details-760" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span>
<div class="details collapse" id="details-760">
<div class="comment"><p>The resource identifier of this location.</p>
</div>
</div>

### <a name="MarkedString"></a><span class="code-item" id=877>MarkedString</span>



<div class="comment"><p>MarkedString can be used to render human readable text. It is either a markdown string
or a code-block that provides a language and a code snippet. Note that
markdown strings will be sanitized - that means html will be escaped.</p>
</div>



<a name="MarkedString"></a><span class="ts" id=877 data-target="#details-877" data-toggle="collapse"><span class="ident">MarkedString</span><span>: </span><a class="type-instrinct">string</a> &#124; {language: <a class="type-instrinct">string</a>, value: <a class="type-instrinct">string</a>}</span>

### <a name="Memento"></a><span class="code-item" id=857>Memento</span>



<div class="comment"><p>A memento represents a storage utility. It can store and retrieve
values.</p>
</div>

#### Methods



<a name="Memento.get"></a><span class="ts" id=859 data-target="#details-859" data-toggle="collapse"><span class="ident">get</span><span>&lt;</span>T<span>&gt;</span><span>(</span><span class="ident">key</span><span>: </span><a class="type-instrinct">string</a>, <span class="ident">defaultValue</span><span>?</span><span>: </span><a class="type-instrinct">T</a><span>)</span><span>: </span><a class="type-instrinct">T</a></span>
<div class="details collapse" id="details-859">
<div class="comment"><p>Return a value.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="key"></a><span class="ts" id=861 data-target="#details-861" data-toggle="collapse"><span class="ident">key</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A string.</p>
</div></td></tr>
<tr><td><a name="defaultValue"></a><span class="ts" id=862 data-target="#details-862" data-toggle="collapse"><span class="ident">defaultValue</span><span>?</span><span>: </span><a class="type-instrinct">T</a></span></td><td><div class="comment"><p>A value that should be returned when there is no
value (<code>undefined</code>) with the given key.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">T</a></span></td><td><div class="comment"><p>The stored value, <code>undefined</code>, or the defaultValue.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Memento.update"></a><span class="ts" id=864 data-target="#details-864" data-toggle="collapse"><span class="ident">update</span><span>(</span><span class="ident">key</span><span>: </span><a class="type-instrinct">string</a>, <span class="ident">value</span><span>: </span><a class="type-instrinct">any</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">void</a>&gt;</span>
<div class="details collapse" id="details-864">
<div class="comment"><p>Store a value. The value must be JSON-stringifyable.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="key"></a><span class="ts" id=865 data-target="#details-865" data-toggle="collapse"><span class="ident">key</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A string.</p>
</div></td></tr>
<tr><td><a name="value"></a><span class="ts" id=866 data-target="#details-866" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-instrinct">any</a></span></td><td><div class="comment"><p>A value. MUST not contain cyclic references.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">void</a>&gt;</span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="MessageItem"></a><span class="code-item" id=424>MessageItem</span>



<div class="comment"><p>Represents an action that is shown with an information, warning, or
error message.</p>
<ul>
<li><em>see</em> - <a href="#window.showInformationMessage">showInformationMessage</a></li>
</ul>
<ul>
<li><em>see</em> - <a href="#window.showWarningMessage">showWarningMessage</a></li>
</ul>
<ul>
<li><em>see</em> - <a href="#window.showErrorMessage">showErrorMessage</a></li>
</ul>
</div>

#### Properties



<a name="MessageItem.title"></a><span class="ts" id=425 data-target="#details-425" data-toggle="collapse"><span class="ident">title</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-425">
<div class="comment"><p>A short title like &#39;Retry&#39;, &#39;Open Log&#39; etc.</p>
</div>
</div>

### <a name="OnEnterRule"></a><span class="code-item" id=723>OnEnterRule</span>



<div class="comment"><p>Describes a rule to be evaluated when pressing Enter.</p>
</div>

#### Properties



<a name="OnEnterRule.action"></a><span class="ts" id=726 data-target="#details-726" data-toggle="collapse"><span class="ident">action</span><span>: </span><a class="type-ref" href="#EnterAction">EnterAction</a></span>
<div class="details collapse" id="details-726">
<div class="comment"><p>The action to execute.</p>
</div>
</div>



<a name="OnEnterRule.afterText"></a><span class="ts" id=725 data-target="#details-725" data-toggle="collapse"><span class="ident">afterText</span><span>?</span><span>: </span><a class="type-ref" href="#RegExp">RegExp</a></span>
<div class="details collapse" id="details-725">
<div class="comment"><p>This rule will only execute if the text after the cursor matches this regular expression.</p>
</div>
</div>



<a name="OnEnterRule.beforeText"></a><span class="ts" id=724 data-target="#details-724" data-toggle="collapse"><span class="ident">beforeText</span><span>: </span><a class="type-ref" href="#RegExp">RegExp</a></span>
<div class="details collapse" id="details-724">
<div class="comment"><p>This rule will only execute if the text before the cursor matches this regular expression.</p>
</div>
</div>

### <a name="OnTypeFormattingEditProvider"></a><span class="code-item" id=625>OnTypeFormattingEditProvider</span>



<div class="comment"><p>The document formatting provider interface defines the contract between extensions and
the formatting-feature.</p>
</div>

#### Methods



<a name="OnTypeFormattingEditProvider.provideOnTypeFormattingEdits"></a><span class="ts" id=627 data-target="#details-627" data-toggle="collapse"><span class="ident">provideOnTypeFormattingEdits</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">ch</span><span>: </span><a class="type-instrinct">string</a>, <span class="ident">options</span><span>: </span><a class="type-ref" href="#FormattingOptions">FormattingOptions</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextEdit">TextEdit</a>[]&gt;</span>
<div class="details collapse" id="details-627">
<div class="comment"><p>Provide formatting edits after a character has been typed.</p>
<p>The given position and character should hint to the provider
what range the position to expand to, like find the matching <code>{</code>
when <code>}</code> has been entered.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=628 data-target="#details-628" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="position"></a><span class="ts" id=629 data-target="#details-629" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The position at which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="ch"></a><span class="ts" id=630 data-target="#details-630" data-toggle="collapse"><span class="ident">ch</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The character that has been typed.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=631 data-target="#details-631" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#FormattingOptions">FormattingOptions</a></span></td><td><div class="comment"><p>Options controlling formatting.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=632 data-target="#details-632" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TextEdit">TextEdit</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextEdit">TextEdit</a>[]&gt;</span></td><td><div class="comment"><p>A set of text edits or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="OutputChannel"></a><span class="code-item" id=801>OutputChannel</span>



<div class="comment"><p>An output channel is a container for readonly textual information.</p>
<p>To get an instance of an <code>OutputChannel</code> use
<a href="#window.createOutputChannel">createOutputChannel</a>.</p>
</div>

#### Properties



<a name="OutputChannel.name"></a><span class="ts" id=802 data-target="#details-802" data-toggle="collapse"><span class="ident">name</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-802">
<div class="comment"><p>The human-readable name of this output channel.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>

#### Methods



<a name="OutputChannel.append"></a><span class="ts" id=804 data-target="#details-804" data-toggle="collapse"><span class="ident">append</span><span>(</span><span class="ident">value</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-804">
<div class="comment"><p>Append the given value to the channel.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="value"></a><span class="ts" id=805 data-target="#details-805" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A string, falsy values will not be printed.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="OutputChannel.appendLine"></a><span class="ts" id=807 data-target="#details-807" data-toggle="collapse"><span class="ident">appendLine</span><span>(</span><span class="ident">value</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-807">
<div class="comment"><p>Append the given value and a line feed character
to the channel.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="value"></a><span class="ts" id=808 data-target="#details-808" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A string, falsy values will be printed.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="OutputChannel.clear"></a><span class="ts" id=810 data-target="#details-810" data-toggle="collapse"><span class="ident">clear</span><span>(</span><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-810">
<div class="comment"><p>Removes all output from the channel.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="OutputChannel.dispose"></a><span class="ts" id=820 data-target="#details-820" data-toggle="collapse"><span class="ident">dispose</span><span>(</span><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-820">
<div class="comment"><p>Dispose and free associated resources.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="OutputChannel.hide"></a><span class="ts" id=818 data-target="#details-818" data-toggle="collapse"><span class="ident">hide</span><span>(</span><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-818">
<div class="comment"><p>Hide this channel from the UI.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="OutputChannel.show"></a><span class="ts" id=812 data-target="#details-812" data-toggle="collapse"><span class="ident">show</span><span>(</span><span class="ident">column</span><span>?</span><span>: </span><a class="type-ref" href="#ViewColumn">ViewColumn</a>, <span class="ident">preserveFocus</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-812">
<div class="comment"><p>Reveal this channel in the UI.</p>
<ul>
<li><em>deprecated</em> - <strong>This method is deprecated.</strong></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="column"></a><span class="ts" id=813 data-target="#details-813" data-toggle="collapse"><span class="ident">column</span><span>?</span><span>: </span><a class="type-ref" href="#ViewColumn">ViewColumn</a></span></td><td><div class="comment"><p>The column in which to show the channel, default in <a href="#ViewColumn.One">one</a>.</p>
</div></td></tr>
<tr><td><a name="preserveFocus"></a><span class="ts" id=814 data-target="#details-814" data-toggle="collapse"><span class="ident">preserveFocus</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a></span></td><td><div class="comment"><p>When <code>true</code> the channel will not take focus.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="OutputChannel.show"></a><span class="ts" id=815 data-target="#details-815" data-toggle="collapse"><span class="ident">show</span><span>(</span><span class="ident">preservceFocus</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-815">
<div class="comment"><p>Reveal this channel in the UI.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="preservceFocus"></a><span class="ts" id=816 data-target="#details-816" data-toggle="collapse"><span class="ident">preservceFocus</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a></span></td><td><div class="comment"></div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="OverviewRulerLane"></a><span class="code-item" id=249>OverviewRulerLane</span>



<div class="comment"><p>Represents different positions for rendering a decoration in an <a href="#DecorationRenderOptions.overviewRulerLane">overview ruler</a>.
The overview ruler supports three lanes.</p>
</div>

#### Enumeration members



<a name="OverviewRulerLane.Center"></a><span class="ts" id=251 data-target="#details-251" data-toggle="collapse"><span class="ident">Center</span></span>
<div class="details collapse" id="details-251">
<em>2</em>
</div>



<a name="OverviewRulerLane.Full"></a><span class="ts" id=253 data-target="#details-253" data-toggle="collapse"><span class="ident">Full</span></span>
<div class="details collapse" id="details-253">
<em>7</em>
</div>



<a name="OverviewRulerLane.Left"></a><span class="ts" id=250 data-target="#details-250" data-toggle="collapse"><span class="ident">Left</span></span>
<div class="details collapse" id="details-250">
<em>1</em>
</div>



<a name="OverviewRulerLane.Right"></a><span class="ts" id=252 data-target="#details-252" data-toggle="collapse"><span class="ident">Right</span></span>
<div class="details collapse" id="details-252">
<em>4</em>
</div>

### <a name="ParameterInformation"></a><span class="code-item" id=633>ParameterInformation</span>



<div class="comment"><p>Represents a parameter of a callable-signature. A parameter can
have a label and a doc-comment.</p>
</div>

#### Constructors



<a name="ParameterInformation.new ParameterInformation"></a><span class="ts" id=637 data-target="#details-637" data-toggle="collapse"><span class="ident">new ParameterInformation</span><span>(</span><span class="ident">label</span><span>: </span><a class="type-instrinct">string</a>, <span class="ident">documentation</span><span>?</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-ref" href="#ParameterInformation">ParameterInformation</a></span>
<div class="details collapse" id="details-637">
<div class="comment"><p>Creates a new parameter information object.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="label"></a><span class="ts" id=638 data-target="#details-638" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A label string.</p>
</div></td></tr>
<tr><td><a name="documentation"></a><span class="ts" id=639 data-target="#details-639" data-toggle="collapse"><span class="ident">documentation</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A doc string.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ParameterInformation">ParameterInformation</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="ParameterInformation.documentation"></a><span class="ts" id=635 data-target="#details-635" data-toggle="collapse"><span class="ident">documentation</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-635">
<div class="comment"><p>The human-readable doc-comment of this signature. Will be shown
in the UI but can be omitted.</p>
</div>
</div>



<a name="ParameterInformation.label"></a><span class="ts" id=634 data-target="#details-634" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-634">
<div class="comment"><p>The label of this signature. Will be shown in
the UI.</p>
</div>
</div>

### <a name="Position"></a><span class="code-item" id=133>Position</span>



<div class="comment"><p>Represents a line and character position, such as
the position of the cursor.</p>
<p>Position objects are <strong>immutable</strong>. Use the <a href="#Position.with">with</a> or
<a href="#Position.translate">translate</a> methods to derive new positions
from an existing position.</p>
</div>

#### Constructors



<a name="Position.new Position"></a><span class="ts" id=137 data-target="#details-137" data-toggle="collapse"><span class="ident">new Position</span><span>(</span><span class="ident">line</span><span>: </span><a class="type-instrinct">number</a>, <span class="ident">character</span><span>: </span><a class="type-instrinct">number</a><span>)</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-137">
<div class="comment"></div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="line"></a><span class="ts" id=138 data-target="#details-138" data-toggle="collapse"><span class="ident">line</span><span>: </span><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>A zero-based line value.</p>
</div></td></tr>
<tr><td><a name="character"></a><span class="ts" id=139 data-target="#details-139" data-toggle="collapse"><span class="ident">character</span><span>: </span><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>A zero-based character value.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="Position.character"></a><span class="ts" id=135 data-target="#details-135" data-toggle="collapse"><span class="ident">character</span><span>: </span><a class="type-instrinct">number</a></span>
<div class="details collapse" id="details-135">
<div class="comment"><p>The zero-based character value.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="Position.line"></a><span class="ts" id=134 data-target="#details-134" data-toggle="collapse"><span class="ident">line</span><span>: </span><a class="type-instrinct">number</a></span>
<div class="details collapse" id="details-134">
<div class="comment"><p>The zero-based line value.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>

#### Methods



<a name="Position.compareTo"></a><span class="ts" id=156 data-target="#details-156" data-toggle="collapse"><span class="ident">compareTo</span><span>(</span><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-instrinct">number</a></span>
<div class="details collapse" id="details-156">
<div class="comment"><p>Compare this to <code>other</code>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="other"></a><span class="ts" id=157 data-target="#details-157" data-toggle="collapse"><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>A number smaller than zero if this position is before the given position,
a number greater than zero if this position is after the given position, or zero when
this and the given position are equal.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Position.isAfter"></a><span class="ts" id=147 data-target="#details-147" data-toggle="collapse"><span class="ident">isAfter</span><span>(</span><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-147">
<div class="comment"><p>Check if <code>other</code> is after this position.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="other"></a><span class="ts" id=148 data-target="#details-148" data-toggle="collapse"><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">boolean</a></span></td><td><div class="comment"><p><code>true</code> if position is on a greater line
or on the same line on a greater character.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Position.isAfterOrEqual"></a><span class="ts" id=150 data-target="#details-150" data-toggle="collapse"><span class="ident">isAfterOrEqual</span><span>(</span><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-150">
<div class="comment"><p>Check if <code>other</code> is after or equal to this position.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="other"></a><span class="ts" id=151 data-target="#details-151" data-toggle="collapse"><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">boolean</a></span></td><td><div class="comment"><p><code>true</code> if position is on a greater line
or on the same line on a greater or equal character.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Position.isBefore"></a><span class="ts" id=141 data-target="#details-141" data-toggle="collapse"><span class="ident">isBefore</span><span>(</span><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-141">
<div class="comment"><p>Check if <code>other</code> is before this position.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="other"></a><span class="ts" id=142 data-target="#details-142" data-toggle="collapse"><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">boolean</a></span></td><td><div class="comment"><p><code>true</code> if position is on a smaller line
or on the same line on a smaller character.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Position.isBeforeOrEqual"></a><span class="ts" id=144 data-target="#details-144" data-toggle="collapse"><span class="ident">isBeforeOrEqual</span><span>(</span><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-144">
<div class="comment"><p>Check if <code>other</code> is before or equal to this position.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="other"></a><span class="ts" id=145 data-target="#details-145" data-toggle="collapse"><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">boolean</a></span></td><td><div class="comment"><p><code>true</code> if position is on a smaller line
or on the same line on a smaller or equal character.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Position.isEqual"></a><span class="ts" id=153 data-target="#details-153" data-toggle="collapse"><span class="ident">isEqual</span><span>(</span><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-153">
<div class="comment"><p>Check if <code>other</code> equals this position.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="other"></a><span class="ts" id=154 data-target="#details-154" data-toggle="collapse"><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">boolean</a></span></td><td><div class="comment"><p><code>true</code> if the line and character of the given position are equal to
the line and character of this position.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Position.translate"></a><span class="ts" id=159 data-target="#details-159" data-toggle="collapse"><span class="ident">translate</span><span>(</span><span class="ident">lineDelta</span><span>?</span><span>: </span><a class="type-instrinct">number</a>, <span class="ident">characterDelta</span><span>?</span><span>: </span><a class="type-instrinct">number</a><span>)</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-159">
<div class="comment"><p>Create a new position relative to this position.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="lineDelta"></a><span class="ts" id=160 data-target="#details-160" data-toggle="collapse"><span class="ident">lineDelta</span><span>?</span><span>: </span><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>Delta value for the line value, default is <code>0</code>.</p>
</div></td></tr>
<tr><td><a name="characterDelta"></a><span class="ts" id=161 data-target="#details-161" data-toggle="collapse"><span class="ident">characterDelta</span><span>?</span><span>: </span><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>Delta value for the character value, default is <code>0</code>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position which line and character is the sum of the current line and
character and the corresponding deltas.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Position.with"></a><span class="ts" id=163 data-target="#details-163" data-toggle="collapse"><span class="ident">with</span><span>(</span><span class="ident">line</span><span>?</span><span>: </span><a class="type-instrinct">number</a>, <span class="ident">character</span><span>?</span><span>: </span><a class="type-instrinct">number</a><span>)</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-163">
<div class="comment"><p>Create a new position derived from this position.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="line"></a><span class="ts" id=164 data-target="#details-164" data-toggle="collapse"><span class="ident">line</span><span>?</span><span>: </span><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>Value that should be used as line value, default is the <a href="#Position.line">existing value</a></p>
</div></td></tr>
<tr><td><a name="character"></a><span class="ts" id=165 data-target="#details-165" data-toggle="collapse"><span class="ident">character</span><span>?</span><span>: </span><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>Value that should be used as character value, default is the <a href="#Position.character">existing value</a></p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position where line and character are replaced by the given values.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="QuickPickItem"></a><span class="code-item" id=411>QuickPickItem</span>



<div class="comment"><p>Represents an item that can be selected from
a list of items.</p>
</div>

#### Properties



<a name="QuickPickItem.description"></a><span class="ts" id=413 data-target="#details-413" data-toggle="collapse"><span class="ident">description</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-413">
<div class="comment"><p>A human readable string which is rendered less prominent.</p>
</div>
</div>



<a name="QuickPickItem.detail"></a><span class="ts" id=414 data-target="#details-414" data-toggle="collapse"><span class="ident">detail</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-414">
<div class="comment"><p>A human readable string which is rendered less prominent.</p>
</div>
</div>



<a name="QuickPickItem.label"></a><span class="ts" id=412 data-target="#details-412" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-412">
<div class="comment"><p>A human readable string which is rendered prominent.</p>
</div>
</div>

### <a name="QuickPickOptions"></a><span class="code-item" id=415>QuickPickOptions</span>



<div class="comment"><p>Options to configure the behavior of the quick pick UI.</p>
</div>

#### Events



<a name="QuickPickOptions.onDidSelectItem"></a><span class="ts" id=419 data-target="#details-419" data-toggle="collapse"><span class="ident">onDidSelectItem</span><span>?</span><span>: </span>(item: <a class="type-instrinct">T</a> &#124; <a class="type-instrinct">string</a>) =&gt; <a class="type-instrinct">any</a></span>
<div class="details collapse" id="details-419">
<div class="comment"><p>An optional function that is invoked whenever an item is selected.</p>
</div>
</div>

#### Properties



<a name="QuickPickOptions.matchOnDescription"></a><span class="ts" id=416 data-target="#details-416" data-toggle="collapse"><span class="ident">matchOnDescription</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-416">
<div class="comment"><p>An optional flag to include the description when filtering the picks.</p>
</div>
</div>



<a name="QuickPickOptions.matchOnDetail"></a><span class="ts" id=417 data-target="#details-417" data-toggle="collapse"><span class="ident">matchOnDetail</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-417">
<div class="comment"><p>An optional flag to include the detail when filtering the picks.</p>
</div>
</div>



<a name="QuickPickOptions.placeHolder"></a><span class="ts" id=418 data-target="#details-418" data-toggle="collapse"><span class="ident">placeHolder</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-418">
<div class="comment"><p>An optional string to show as place holder in the input box to guide the user what to pick on.</p>
</div>
</div>

### <a name="Range"></a><span class="code-item" id=166>Range</span>



<div class="comment"><p>A range represents an ordered pair of two positions.
It is guaranteed that <a href="#Range.start">start</a>.isBeforeOrEqual(<a href="#Range.end">end</a>)</p>
<p>Range objects are <strong>immutable</strong>. Use the <a href="#Range.with">with</a>,
<a href="#Range.intersection">intersection</a>, or <a href="#Range.union">union</a> methods
to derive new ranges from an existing range.</p>
</div>

#### Constructors



<a name="Range.new Range"></a><span class="ts" id=170 data-target="#details-170" data-toggle="collapse"><span class="ident">new Range</span><span>(</span><span class="ident">start</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">end</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-170">
<div class="comment"><p>Create a new range from two positions. If <code>start</code> is not
before or equal to <code>end</code>, the values will be swapped.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="start"></a><span class="ts" id=171 data-target="#details-171" data-toggle="collapse"><span class="ident">start</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><td><a name="end"></a><span class="ts" id=172 data-target="#details-172" data-toggle="collapse"><span class="ident">end</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="Range.new Range"></a><span class="ts" id=173 data-target="#details-173" data-toggle="collapse"><span class="ident">new Range</span><span>(</span><span class="ident">startLine</span><span>: </span><a class="type-instrinct">number</a>, <span class="ident">startCharacter</span><span>: </span><a class="type-instrinct">number</a>, <span class="ident">endLine</span><span>: </span><a class="type-instrinct">number</a>, <span class="ident">endCharacter</span><span>: </span><a class="type-instrinct">number</a><span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-173">
<div class="comment"><p>Create a new range from number coordinates. It is a shorter equivalent of
using <code>new Range(new Position(startLine, startCharacter), new Position(endLine, endCharacter))</code></p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="startLine"></a><span class="ts" id=174 data-target="#details-174" data-toggle="collapse"><span class="ident">startLine</span><span>: </span><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>A zero-based line value.</p>
</div></td></tr>
<tr><td><a name="startCharacter"></a><span class="ts" id=175 data-target="#details-175" data-toggle="collapse"><span class="ident">startCharacter</span><span>: </span><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>A zero-based character value.</p>
</div></td></tr>
<tr><td><a name="endLine"></a><span class="ts" id=176 data-target="#details-176" data-toggle="collapse"><span class="ident">endLine</span><span>: </span><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>A zero-based line value.</p>
</div></td></tr>
<tr><td><a name="endCharacter"></a><span class="ts" id=177 data-target="#details-177" data-toggle="collapse"><span class="ident">endCharacter</span><span>: </span><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>A zero-based character value.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="Range.end"></a><span class="ts" id=168 data-target="#details-168" data-toggle="collapse"><span class="ident">end</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-168">
<div class="comment"><p>The end position. It is after or equal to <a href="#Range.start">start</a>.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="Range.isEmpty"></a><span class="ts" id=178 data-target="#details-178" data-toggle="collapse"><span class="ident">isEmpty</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-178">
<div class="comment"><p><code>true</code> iff <code>start</code> and <code>end</code> are equal.</p>
</div>
</div>



<a name="Range.isSingleLine"></a><span class="ts" id=179 data-target="#details-179" data-toggle="collapse"><span class="ident">isSingleLine</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-179">
<div class="comment"><p><code>true</code> iff <code>start.line</code> and <code>end.line</code> are equal.</p>
</div>
</div>



<a name="Range.start"></a><span class="ts" id=167 data-target="#details-167" data-toggle="collapse"><span class="ident">start</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-167">
<div class="comment"><p>The start position. It is before or equal to <a href="#Range.end">end</a>.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>

#### Methods



<a name="Range.contains"></a><span class="ts" id=181 data-target="#details-181" data-toggle="collapse"><span class="ident">contains</span><span>(</span><span class="ident">positionOrRange</span><span>: </span><a class="type-ref" href="#Position">Position</a> &#124; <a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-181">
<div class="comment"><p>Check if a position or a range is contained in this range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="positionOrRange"></a><span class="ts" id=182 data-target="#details-182" data-toggle="collapse"><span class="ident">positionOrRange</span><span>: </span><a class="type-ref" href="#Position">Position</a> &#124; <a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A position or a range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">boolean</a></span></td><td><div class="comment"><p><code>true</code> iff the position or range is inside or equal
to this range.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Range.intersection"></a><span class="ts" id=187 data-target="#details-187" data-toggle="collapse"><span class="ident">intersection</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-187">
<div class="comment"><p>Intersect <code>range</code> with this range and returns a new range or <code>undefined</code>
if the ranges have no overlap.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=188 data-target="#details-188" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range of the greater start and smaller end positions. Will
return undefined when there is no overlap.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Range.isEqual"></a><span class="ts" id=184 data-target="#details-184" data-toggle="collapse"><span class="ident">isEqual</span><span>(</span><span class="ident">other</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-184">
<div class="comment"><p>Check if <code>other</code> equals this range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="other"></a><span class="ts" id=185 data-target="#details-185" data-toggle="collapse"><span class="ident">other</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">boolean</a></span></td><td><div class="comment"><p><code>true</code> when start and end are <a href="#Position.isEqual">equal</a> to
start and end of this range.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Range.union"></a><span class="ts" id=190 data-target="#details-190" data-toggle="collapse"><span class="ident">union</span><span>(</span><span class="ident">other</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-190">
<div class="comment"><p>Compute the union of <code>other</code> with this range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="other"></a><span class="ts" id=191 data-target="#details-191" data-toggle="collapse"><span class="ident">other</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range of smaller start position and the greater end position.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Range.with"></a><span class="ts" id=193 data-target="#details-193" data-toggle="collapse"><span class="ident">with</span><span>(</span><span class="ident">start</span><span>?</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">end</span><span>?</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-193">
<div class="comment"><p>Create a new range derived from this range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="start"></a><span class="ts" id=194 data-target="#details-194" data-toggle="collapse"><span class="ident">start</span><span>?</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position that should be used as start. The default value is the <a href="#Range.start">current start</a>.</p>
</div></td></tr>
<tr><td><a name="end"></a><span class="ts" id=195 data-target="#details-195" data-toggle="collapse"><span class="ident">end</span><span>?</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position that should be used as end. The default value is the <a href="#Range.end">current end</a>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range derived from this range with the given start and end position.
If start and end are not different this range will be returned.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="ReferenceContext"></a><span class="code-item" id=545>ReferenceContext</span>



<div class="comment"><p>Value-object that contains additional information when
requesting references.</p>
</div>

#### Properties



<a name="ReferenceContext.includeDeclaration"></a><span class="ts" id=546 data-target="#details-546" data-toggle="collapse"><span class="ident">includeDeclaration</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-546">
<div class="comment"><p>Include the declaration of the current symbol.</p>
</div>
</div>

### <a name="ReferenceProvider"></a><span class="code-item" id=547>ReferenceProvider</span>



<div class="comment"><p>The reference provider interface defines the contract between extensions and
the <a href="https://code.visualstudio.com/docs/editor/editingevolved#_peek">find references</a>-feature.</p>
</div>

#### Methods



<a name="ReferenceProvider.provideReferences"></a><span class="ts" id=549 data-target="#details-549" data-toggle="collapse"><span class="ident">provideReferences</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">context</span><span>: </span><a class="type-ref" href="#ReferenceContext">ReferenceContext</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#Location">Location</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#Location">Location</a>[]&gt;</span>
<div class="details collapse" id="details-549">
<div class="comment"><p>Provide a set of project-wide references for the given position and document.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=550 data-target="#details-550" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="position"></a><span class="ts" id=551 data-target="#details-551" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The position at which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="context"></a><span class="ts" id=552 data-target="#details-552" data-toggle="collapse"><span class="ident">context</span><span>: </span><a class="type-ref" href="#ReferenceContext">ReferenceContext</a></span></td><td><div class="comment"></div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=553 data-target="#details-553" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Location">Location</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#Location">Location</a>[]&gt;</span></td><td><div class="comment"><p>An array of locations or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="RenameProvider"></a><span class="code-item" id=600>RenameProvider</span>



<div class="comment"><p>The rename provider interface defines the contract between extensions and
the <a href="https://code.visualstudio.com/docs/editor/editingevolved#_rename-symbol">rename</a>-feature.</p>
</div>

#### Methods



<a name="RenameProvider.provideRenameEdits"></a><span class="ts" id=602 data-target="#details-602" data-toggle="collapse"><span class="ident">provideRenameEdits</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">newName</span><span>: </span><a class="type-instrinct">string</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#WorkspaceEdit">WorkspaceEdit</a> &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#WorkspaceEdit">WorkspaceEdit</a>&gt;</span>
<div class="details collapse" id="details-602">
<div class="comment"><p>Provide an edit that describes changes that have to be made to one
or many resources to rename a symbol to a different name.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=603 data-target="#details-603" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="position"></a><span class="ts" id=604 data-target="#details-604" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The position at which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="newName"></a><span class="ts" id=605 data-target="#details-605" data-toggle="collapse"><span class="ident">newName</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The new name of the symbol. If the given name is not valid, the provider must return a rejected promise.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=606 data-target="#details-606" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#WorkspaceEdit">WorkspaceEdit</a> &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#WorkspaceEdit">WorkspaceEdit</a>&gt;</span></td><td><div class="comment"><p>A workspace edit or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code> or <code>null</code>.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="Selection"></a><span class="code-item" id=196>Selection</span>



<div class="comment"><p>Represents a text selection in an editor.</p>
</div>

#### Constructors



<a name="Selection.new Selection"></a><span class="ts" id=200 data-target="#details-200" data-toggle="collapse"><span class="ident">new Selection</span><span>(</span><span class="ident">anchor</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">active</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-ref" href="#Selection">Selection</a></span>
<div class="details collapse" id="details-200">
<div class="comment"><p>Create a selection from two postions.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="anchor"></a><span class="ts" id=201 data-target="#details-201" data-toggle="collapse"><span class="ident">anchor</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><td><a name="active"></a><span class="ts" id=202 data-target="#details-202" data-toggle="collapse"><span class="ident">active</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Selection">Selection</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="Selection.new Selection"></a><span class="ts" id=203 data-target="#details-203" data-toggle="collapse"><span class="ident">new Selection</span><span>(</span><span class="ident">anchorLine</span><span>: </span><a class="type-instrinct">number</a>, <span class="ident">anchorCharacter</span><span>: </span><a class="type-instrinct">number</a>, <span class="ident">activeLine</span><span>: </span><a class="type-instrinct">number</a>, <span class="ident">activeCharacter</span><span>: </span><a class="type-instrinct">number</a><span>)</span><span>: </span><a class="type-ref" href="#Selection">Selection</a></span>
<div class="details collapse" id="details-203">
<div class="comment"><p>Create a selection from four coordinates.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="anchorLine"></a><span class="ts" id=204 data-target="#details-204" data-toggle="collapse"><span class="ident">anchorLine</span><span>: </span><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>A zero-based line value.</p>
</div></td></tr>
<tr><td><a name="anchorCharacter"></a><span class="ts" id=205 data-target="#details-205" data-toggle="collapse"><span class="ident">anchorCharacter</span><span>: </span><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>A zero-based character value.</p>
</div></td></tr>
<tr><td><a name="activeLine"></a><span class="ts" id=206 data-target="#details-206" data-toggle="collapse"><span class="ident">activeLine</span><span>: </span><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>A zero-based line value.</p>
</div></td></tr>
<tr><td><a name="activeCharacter"></a><span class="ts" id=207 data-target="#details-207" data-toggle="collapse"><span class="ident">activeCharacter</span><span>: </span><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>A zero-based character value.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Selection">Selection</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="Selection.active"></a><span class="ts" id=198 data-target="#details-198" data-toggle="collapse"><span class="ident">active</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-198">
<div class="comment"><p>The position of the cursor.
This position might be before or after <a href="#Selection.anchor">anchor</a>.</p>
</div>
</div>



<a name="Selection.anchor"></a><span class="ts" id=197 data-target="#details-197" data-toggle="collapse"><span class="ident">anchor</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-197">
<div class="comment"><p>The position at which the selection starts.
This position might be before or after <a href="#Selection.active">active</a>.</p>
</div>
</div>



<a name="Selection.end"></a><span class="ts" id=210 data-target="#details-210" data-toggle="collapse"><span class="ident">end</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-210">
<div class="comment"><p>The end position. It is after or equal to <a href="#Range.start">start</a>.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="Selection.isEmpty"></a><span class="ts" id=211 data-target="#details-211" data-toggle="collapse"><span class="ident">isEmpty</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-211">
<div class="comment"><p><code>true</code> iff <code>start</code> and <code>end</code> are equal.</p>
</div>
</div>



<a name="Selection.isReversed"></a><span class="ts" id=208 data-target="#details-208" data-toggle="collapse"><span class="ident">isReversed</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-208">
<div class="comment"><p>A selection is reversed if <a href="#Selection.active">active</a>.isBefore(<a href="#Selection.anchor">anchor</a>).</p>
</div>
</div>



<a name="Selection.isSingleLine"></a><span class="ts" id=212 data-target="#details-212" data-toggle="collapse"><span class="ident">isSingleLine</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-212">
<div class="comment"><p><code>true</code> iff <code>start.line</code> and <code>end.line</code> are equal.</p>
</div>
</div>



<a name="Selection.start"></a><span class="ts" id=209 data-target="#details-209" data-toggle="collapse"><span class="ident">start</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-209">
<div class="comment"><p>The start position. It is before or equal to <a href="#Range.end">end</a>.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>

#### Methods



<a name="Selection.contains"></a><span class="ts" id=214 data-target="#details-214" data-toggle="collapse"><span class="ident">contains</span><span>(</span><span class="ident">positionOrRange</span><span>: </span><a class="type-ref" href="#Position">Position</a> &#124; <a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-214">
<div class="comment"><p>Check if a position or a range is contained in this range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="positionOrRange"></a><span class="ts" id=215 data-target="#details-215" data-toggle="collapse"><span class="ident">positionOrRange</span><span>: </span><a class="type-ref" href="#Position">Position</a> &#124; <a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A position or a range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">boolean</a></span></td><td><div class="comment"><p><code>true</code> iff the position or range is inside or equal
to this range.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Selection.intersection"></a><span class="ts" id=220 data-target="#details-220" data-toggle="collapse"><span class="ident">intersection</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-220">
<div class="comment"><p>Intersect <code>range</code> with this range and returns a new range or <code>undefined</code>
if the ranges have no overlap.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=221 data-target="#details-221" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range of the greater start and smaller end positions. Will
return undefined when there is no overlap.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Selection.isEqual"></a><span class="ts" id=217 data-target="#details-217" data-toggle="collapse"><span class="ident">isEqual</span><span>(</span><span class="ident">other</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-217">
<div class="comment"><p>Check if <code>other</code> equals this range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="other"></a><span class="ts" id=218 data-target="#details-218" data-toggle="collapse"><span class="ident">other</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">boolean</a></span></td><td><div class="comment"><p><code>true</code> when start and end are <a href="#Position.isEqual">equal</a> to
start and end of this range.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Selection.union"></a><span class="ts" id=223 data-target="#details-223" data-toggle="collapse"><span class="ident">union</span><span>(</span><span class="ident">other</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-223">
<div class="comment"><p>Compute the union of <code>other</code> with this range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="other"></a><span class="ts" id=224 data-target="#details-224" data-toggle="collapse"><span class="ident">other</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range of smaller start position and the greater end position.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Selection.with"></a><span class="ts" id=226 data-target="#details-226" data-toggle="collapse"><span class="ident">with</span><span>(</span><span class="ident">start</span><span>?</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">end</span><span>?</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-226">
<div class="comment"><p>Create a new range derived from this range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="start"></a><span class="ts" id=227 data-target="#details-227" data-toggle="collapse"><span class="ident">start</span><span>?</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position that should be used as start. The default value is the <a href="#Range.start">current start</a>.</p>
</div></td></tr>
<tr><td><a name="end"></a><span class="ts" id=228 data-target="#details-228" data-toggle="collapse"><span class="ident">end</span><span>?</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position that should be used as end. The default value is the <a href="#Range.end">current end</a>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range derived from this range with the given start and end position.
If start and end are not different this range will be returned.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="SignatureHelp"></a><span class="code-item" id=648>SignatureHelp</span>



<div class="comment"><p>Signature help represents the signature of something
callable. There can be multiple signatures but only one
active and only one active parameter.</p>
</div>

#### Properties



<a name="SignatureHelp.activeParameter"></a><span class="ts" id=651 data-target="#details-651" data-toggle="collapse"><span class="ident">activeParameter</span><span>: </span><a class="type-instrinct">number</a></span>
<div class="details collapse" id="details-651">
<div class="comment"><p>The active parameter of the active signature.</p>
</div>
</div>



<a name="SignatureHelp.activeSignature"></a><span class="ts" id=650 data-target="#details-650" data-toggle="collapse"><span class="ident">activeSignature</span><span>: </span><a class="type-instrinct">number</a></span>
<div class="details collapse" id="details-650">
<div class="comment"><p>The active signature.</p>
</div>
</div>



<a name="SignatureHelp.signatures"></a><span class="ts" id=649 data-target="#details-649" data-toggle="collapse"><span class="ident">signatures</span><span>: </span><a class="type-ref" href="#SignatureInformation">SignatureInformation</a>[]</span>
<div class="details collapse" id="details-649">
<div class="comment"><p>One or more signatures.</p>
</div>
</div>

### <a name="SignatureHelpProvider"></a><span class="code-item" id=652>SignatureHelpProvider</span>



<div class="comment"><p>The signature help provider interface defines the contract between extensions and
the <a href="https://code.visualstudio.com/docs/editor/editingevolved#_parameter-hints">parameter hints</a>-feature.</p>
</div>

#### Methods



<a name="SignatureHelpProvider.provideSignatureHelp"></a><span class="ts" id=654 data-target="#details-654" data-toggle="collapse"><span class="ident">provideSignatureHelp</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#SignatureHelp">SignatureHelp</a> &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#SignatureHelp">SignatureHelp</a>&gt;</span>
<div class="details collapse" id="details-654">
<div class="comment"><p>Provide help for the signature at the given position and document.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=655 data-target="#details-655" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="position"></a><span class="ts" id=656 data-target="#details-656" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The position at which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=657 data-target="#details-657" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#SignatureHelp">SignatureHelp</a> &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#SignatureHelp">SignatureHelp</a>&gt;</span></td><td><div class="comment"><p>Signature help or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code> or <code>null</code>.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="SignatureInformation"></a><span class="code-item" id=640>SignatureInformation</span>



<div class="comment"><p>Represents the signature of something callable. A signature
can have a label, like a function-name, a doc-comment, and
a set of parameters.</p>
</div>

#### Constructors



<a name="SignatureInformation.new SignatureInformation"></a><span class="ts" id=645 data-target="#details-645" data-toggle="collapse"><span class="ident">new SignatureInformation</span><span>(</span><span class="ident">label</span><span>: </span><a class="type-instrinct">string</a>, <span class="ident">documentation</span><span>?</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-ref" href="#SignatureInformation">SignatureInformation</a></span>
<div class="details collapse" id="details-645">
<div class="comment"><p>Creates a new signature information object.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="label"></a><span class="ts" id=646 data-target="#details-646" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A label string.</p>
</div></td></tr>
<tr><td><a name="documentation"></a><span class="ts" id=647 data-target="#details-647" data-toggle="collapse"><span class="ident">documentation</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A doc string.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#SignatureInformation">SignatureInformation</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="SignatureInformation.documentation"></a><span class="ts" id=642 data-target="#details-642" data-toggle="collapse"><span class="ident">documentation</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-642">
<div class="comment"><p>The human-readable doc-comment of this signature. Will be shown
in the UI but can be omitted.</p>
</div>
</div>



<a name="SignatureInformation.label"></a><span class="ts" id=641 data-target="#details-641" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-641">
<div class="comment"><p>The label of this signature. Will be shown in
the UI.</p>
</div>
</div>



<a name="SignatureInformation.parameters"></a><span class="ts" id=643 data-target="#details-643" data-toggle="collapse"><span class="ident">parameters</span><span>: </span><a class="type-ref" href="#ParameterInformation">ParameterInformation</a>[]</span>
<div class="details collapse" id="details-643">
<div class="comment"><p>The parameters of this signature.</p>
</div>
</div>

### <a name="StatusBarAlignment"></a><span class="code-item" id=821>StatusBarAlignment</span>



<div class="comment"><p>Represents the alignment of status bar items.</p>
</div>

#### Enumeration members



<a name="StatusBarAlignment.Left"></a><span class="ts" id=822 data-target="#details-822" data-toggle="collapse"><span class="ident">Left</span></span>
<div class="details collapse" id="details-822">
</div>



<a name="StatusBarAlignment.Right"></a><span class="ts" id=823 data-target="#details-823" data-toggle="collapse"><span class="ident">Right</span></span>
<div class="details collapse" id="details-823">
</div>

### <a name="StatusBarItem"></a><span class="code-item" id=824>StatusBarItem</span>



<div class="comment"><p>A status bar item is a status bar contribution that can
show text and icons and run a command on click.</p>
</div>

#### Properties



<a name="StatusBarItem.alignment"></a><span class="ts" id=825 data-target="#details-825" data-toggle="collapse"><span class="ident">alignment</span><span>: </span><a class="type-ref" href="#StatusBarAlignment">StatusBarAlignment</a></span>
<div class="details collapse" id="details-825">
<div class="comment"><p>The alignment of this item.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="StatusBarItem.color"></a><span class="ts" id=829 data-target="#details-829" data-toggle="collapse"><span class="ident">color</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-829">
<div class="comment"><p>The foreground color for this entry.</p>
</div>
</div>



<a name="StatusBarItem.command"></a><span class="ts" id=830 data-target="#details-830" data-toggle="collapse"><span class="ident">command</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-830">
<div class="comment"><p>The identifier of a command to run on click. The command must be
<a href="#commands.getCommands">known</a>.</p>
</div>
</div>



<a name="StatusBarItem.priority"></a><span class="ts" id=826 data-target="#details-826" data-toggle="collapse"><span class="ident">priority</span><span>: </span><a class="type-instrinct">number</a></span>
<div class="details collapse" id="details-826">
<div class="comment"><p>The priority of this item. Higher value means the item should
be shown more to the left.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="StatusBarItem.text"></a><span class="ts" id=827 data-target="#details-827" data-toggle="collapse"><span class="ident">text</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-827">
<div class="comment"><p>The text to show for the entry. You can embed icons in the text by leveraging the syntax:</p>
<p><code>My text $(icon-name) contains icons like $(icon&#39;name) this one.</code></p>
<p>Where the icon-name is taken from the <a href="https://octicons.github.com">octicon</a> icon set, e.g.
<code>light-bulb</code>, <code>thumbsup</code>, <code>zap</code> etc.</p>
</div>
</div>



<a name="StatusBarItem.tooltip"></a><span class="ts" id=828 data-target="#details-828" data-toggle="collapse"><span class="ident">tooltip</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-828">
<div class="comment"><p>The tooltip text when you hover over this entry.</p>
</div>
</div>

#### Methods



<a name="StatusBarItem.dispose"></a><span class="ts" id=836 data-target="#details-836" data-toggle="collapse"><span class="ident">dispose</span><span>(</span><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-836">
<div class="comment"><p>Dispose and free associated resources. Call
<a href="#StatusBarItem.hide">hide</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="StatusBarItem.hide"></a><span class="ts" id=834 data-target="#details-834" data-toggle="collapse"><span class="ident">hide</span><span>(</span><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-834">
<div class="comment"><p>Hide the entry in the status bar.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="StatusBarItem.show"></a><span class="ts" id=832 data-target="#details-832" data-toggle="collapse"><span class="ident">show</span><span>(</span><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-832">
<div class="comment"><p>Shows the entry in the status bar.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="SymbolInformation"></a><span class="code-item" id=523>SymbolInformation</span>



<div class="comment"><p>Represents information about programming constructs like variables, classes,
interfaces etc.</p>
</div>

#### Constructors



<a name="SymbolInformation.new SymbolInformation"></a><span class="ts" id=529 data-target="#details-529" data-toggle="collapse"><span class="ident">new SymbolInformation</span><span>(</span><span class="ident">name</span><span>: </span><a class="type-instrinct">string</a>, <span class="ident">kind</span><span>: </span><a class="type-ref" href="#SymbolKind">SymbolKind</a>, <span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">uri</span><span>?</span><span>: </span><a class="type-ref" href="#Uri">Uri</a>, <span class="ident">containerName</span><span>?</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-ref" href="#SymbolInformation">SymbolInformation</a></span>
<div class="details collapse" id="details-529">
<div class="comment"><p>Creates a new symbol information object.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="name"></a><span class="ts" id=530 data-target="#details-530" data-toggle="collapse"><span class="ident">name</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The name of the symbol.</p>
</div></td></tr>
<tr><td><a name="kind"></a><span class="ts" id=531 data-target="#details-531" data-toggle="collapse"><span class="ident">kind</span><span>: </span><a class="type-ref" href="#SymbolKind">SymbolKind</a></span></td><td><div class="comment"><p>The kind of the symbol.</p>
</div></td></tr>
<tr><td><a name="range"></a><span class="ts" id=532 data-target="#details-532" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>The range of the location of the symbol.</p>
</div></td></tr>
<tr><td><a name="uri"></a><span class="ts" id=533 data-target="#details-533" data-toggle="collapse"><span class="ident">uri</span><span>?</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>The resource of the location of symbol, defaults to the current document.</p>
</div></td></tr>
<tr><td><a name="containerName"></a><span class="ts" id=534 data-target="#details-534" data-toggle="collapse"><span class="ident">containerName</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The name of the symbol containing the symbol.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#SymbolInformation">SymbolInformation</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="SymbolInformation.containerName"></a><span class="ts" id=525 data-target="#details-525" data-toggle="collapse"><span class="ident">containerName</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-525">
<div class="comment"><p>The name of the symbol containing this symbol.</p>
</div>
</div>



<a name="SymbolInformation.kind"></a><span class="ts" id=526 data-target="#details-526" data-toggle="collapse"><span class="ident">kind</span><span>: </span><a class="type-ref" href="#SymbolKind">SymbolKind</a></span>
<div class="details collapse" id="details-526">
<div class="comment"><p>The kind of this symbol.</p>
</div>
</div>



<a name="SymbolInformation.location"></a><span class="ts" id=527 data-target="#details-527" data-toggle="collapse"><span class="ident">location</span><span>: </span><a class="type-ref" href="#Location">Location</a></span>
<div class="details collapse" id="details-527">
<div class="comment"><p>The location of this symbol.</p>
</div>
</div>



<a name="SymbolInformation.name"></a><span class="ts" id=524 data-target="#details-524" data-toggle="collapse"><span class="ident">name</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-524">
<div class="comment"><p>The name of this symbol.</p>
</div>
</div>

### <a name="SymbolKind"></a><span class="code-item" id=501>SymbolKind</span>



<div class="comment"><p>A symbol kind.</p>
</div>

#### Enumeration members



<a name="SymbolKind.Array"></a><span class="ts" id=519 data-target="#details-519" data-toggle="collapse"><span class="ident">Array</span></span>
<div class="details collapse" id="details-519">
</div>



<a name="SymbolKind.Boolean"></a><span class="ts" id=518 data-target="#details-518" data-toggle="collapse"><span class="ident">Boolean</span></span>
<div class="details collapse" id="details-518">
</div>



<a name="SymbolKind.Class"></a><span class="ts" id=506 data-target="#details-506" data-toggle="collapse"><span class="ident">Class</span></span>
<div class="details collapse" id="details-506">
</div>



<a name="SymbolKind.Constant"></a><span class="ts" id=515 data-target="#details-515" data-toggle="collapse"><span class="ident">Constant</span></span>
<div class="details collapse" id="details-515">
</div>



<a name="SymbolKind.Constructor"></a><span class="ts" id=510 data-target="#details-510" data-toggle="collapse"><span class="ident">Constructor</span></span>
<div class="details collapse" id="details-510">
</div>



<a name="SymbolKind.Enum"></a><span class="ts" id=511 data-target="#details-511" data-toggle="collapse"><span class="ident">Enum</span></span>
<div class="details collapse" id="details-511">
</div>



<a name="SymbolKind.Field"></a><span class="ts" id=509 data-target="#details-509" data-toggle="collapse"><span class="ident">Field</span></span>
<div class="details collapse" id="details-509">
</div>



<a name="SymbolKind.File"></a><span class="ts" id=502 data-target="#details-502" data-toggle="collapse"><span class="ident">File</span></span>
<div class="details collapse" id="details-502">
</div>



<a name="SymbolKind.Function"></a><span class="ts" id=513 data-target="#details-513" data-toggle="collapse"><span class="ident">Function</span></span>
<div class="details collapse" id="details-513">
</div>



<a name="SymbolKind.Interface"></a><span class="ts" id=512 data-target="#details-512" data-toggle="collapse"><span class="ident">Interface</span></span>
<div class="details collapse" id="details-512">
</div>



<a name="SymbolKind.Key"></a><span class="ts" id=521 data-target="#details-521" data-toggle="collapse"><span class="ident">Key</span></span>
<div class="details collapse" id="details-521">
</div>



<a name="SymbolKind.Method"></a><span class="ts" id=507 data-target="#details-507" data-toggle="collapse"><span class="ident">Method</span></span>
<div class="details collapse" id="details-507">
</div>



<a name="SymbolKind.Module"></a><span class="ts" id=503 data-target="#details-503" data-toggle="collapse"><span class="ident">Module</span></span>
<div class="details collapse" id="details-503">
</div>



<a name="SymbolKind.Namespace"></a><span class="ts" id=504 data-target="#details-504" data-toggle="collapse"><span class="ident">Namespace</span></span>
<div class="details collapse" id="details-504">
</div>



<a name="SymbolKind.Null"></a><span class="ts" id=522 data-target="#details-522" data-toggle="collapse"><span class="ident">Null</span></span>
<div class="details collapse" id="details-522">
</div>



<a name="SymbolKind.Number"></a><span class="ts" id=517 data-target="#details-517" data-toggle="collapse"><span class="ident">Number</span></span>
<div class="details collapse" id="details-517">
</div>



<a name="SymbolKind.Object"></a><span class="ts" id=520 data-target="#details-520" data-toggle="collapse"><span class="ident">Object</span></span>
<div class="details collapse" id="details-520">
</div>



<a name="SymbolKind.Package"></a><span class="ts" id=505 data-target="#details-505" data-toggle="collapse"><span class="ident">Package</span></span>
<div class="details collapse" id="details-505">
</div>



<a name="SymbolKind.Property"></a><span class="ts" id=508 data-target="#details-508" data-toggle="collapse"><span class="ident">Property</span></span>
<div class="details collapse" id="details-508">
</div>



<a name="SymbolKind.String"></a><span class="ts" id=516 data-target="#details-516" data-toggle="collapse"><span class="ident">String</span></span>
<div class="details collapse" id="details-516">
</div>



<a name="SymbolKind.Variable"></a><span class="ts" id=514 data-target="#details-514" data-toggle="collapse"><span class="ident">Variable</span></span>
<div class="details collapse" id="details-514">
</div>

### <a name="TextDocument"></a><span class="code-item" id=100>TextDocument</span>



<div class="comment"><p>Represents a text document, such as a source file. Text documents have
<a href="#TextLine">lines</a> and knowledge about an underlying resource like a file.</p>
</div>

#### Properties



<a name="TextDocument.fileName"></a><span class="ts" id=102 data-target="#details-102" data-toggle="collapse"><span class="ident">fileName</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-102">
<div class="comment"><p>The file system path of the associated resource. Shorthand
notation for <a href="#TextDocument.uri.fsPath">TextDocument.uri.fsPath</a>. Independent of the uri scheme.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="TextDocument.isDirty"></a><span class="ts" id=106 data-target="#details-106" data-toggle="collapse"><span class="ident">isDirty</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-106">
<div class="comment"><p>true if there are unpersisted changes.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="TextDocument.isUntitled"></a><span class="ts" id=103 data-target="#details-103" data-toggle="collapse"><span class="ident">isUntitled</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-103">
<div class="comment"><p>Is this document representing an untitled file.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="TextDocument.languageId"></a><span class="ts" id=104 data-target="#details-104" data-toggle="collapse"><span class="ident">languageId</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-104">
<div class="comment"><p>The identifier of the language associated with this document.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="TextDocument.lineCount"></a><span class="ts" id=109 data-target="#details-109" data-toggle="collapse"><span class="ident">lineCount</span><span>: </span><a class="type-instrinct">number</a></span>
<div class="details collapse" id="details-109">
<div class="comment"><p>The number of lines in this document.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="TextDocument.uri"></a><span class="ts" id=101 data-target="#details-101" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span>
<div class="details collapse" id="details-101">
<div class="comment"><p>The associated URI for this document. Most documents have the <strong>file</strong>-scheme, indicating that they
represent files on disk. However, some documents may have other schemes indicating that they are not
available on disk.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="TextDocument.version"></a><span class="ts" id=105 data-target="#details-105" data-toggle="collapse"><span class="ident">version</span><span>: </span><a class="type-instrinct">number</a></span>
<div class="details collapse" id="details-105">
<div class="comment"><p>The version number of this document (it will strictly increase after each
change, including undo/redo).</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>

#### Methods



<a name="TextDocument.getText"></a><span class="ts" id=122 data-target="#details-122" data-toggle="collapse"><span class="ident">getText</span><span>(</span><span class="ident">range</span><span>?</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-122">
<div class="comment"><p>Get the text of this document. A substring can be retrieved by providing
a range. The range will be <a href="#TextDocument.validateRange">adjusted</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=123 data-target="#details-123" data-toggle="collapse"><span class="ident">range</span><span>?</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>Include only the text included by the range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The text inside the provided range or the entire text.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextDocument.getWordRangeAtPosition"></a><span class="ts" id=125 data-target="#details-125" data-toggle="collapse"><span class="ident">getWordRangeAtPosition</span><span>(</span><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-125">
<div class="comment"><p>Get a word-range at the given position. By default words are defined by
common separators, like space, -, _, etc. In addition, per languge custom
<a href="#LanguageConfiguration.wordPattern">word definitions</a> can be defined.</p>
<p>The position will be <a href="#TextDocument.validatePosition">adjusted</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="position"></a><span class="ts" id=126 data-target="#details-126" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range spanning a word, or <code>undefined</code>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextDocument.lineAt"></a><span class="ts" id=111 data-target="#details-111" data-toggle="collapse"><span class="ident">lineAt</span><span>(</span><span class="ident">line</span><span>: </span><a class="type-instrinct">number</a><span>)</span><span>: </span><a class="type-ref" href="#TextLine">TextLine</a></span>
<div class="details collapse" id="details-111">
<div class="comment"><p>Returns a text line denoted by the line number. Note
that the returned object is <em>not</em> live and changes to the
document are not reflected.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="line"></a><span class="ts" id=112 data-target="#details-112" data-toggle="collapse"><span class="ident">line</span><span>: </span><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>A line number in [0, lineCount).</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TextLine">TextLine</a></span></td><td><div class="comment"><p>A <a href="#TextLine">line</a>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextDocument.lineAt"></a><span class="ts" id=113 data-target="#details-113" data-toggle="collapse"><span class="ident">lineAt</span><span>(</span><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-ref" href="#TextLine">TextLine</a></span>
<div class="details collapse" id="details-113">
<div class="comment"><p>Returns a text line denoted by the position. Note
that the returned object is <em>not</em> live and changes to the
document are not reflected.</p>
<p>The position will be <a href="#TextDocument.validatePosition">adjusted</a>.</p>
<ul>
<li><em>see</em> - <a href="#TextDocument.lineAt">TextDocument.lineAt</a></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="position"></a><span class="ts" id=114 data-target="#details-114" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TextLine">TextLine</a></span></td><td><div class="comment"><p>A <a href="#TextLine">line</a>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextDocument.offsetAt"></a><span class="ts" id=116 data-target="#details-116" data-toggle="collapse"><span class="ident">offsetAt</span><span>(</span><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-instrinct">number</a></span>
<div class="details collapse" id="details-116">
<div class="comment"><p>Converts the position to a zero-based offset.</p>
<p>The position will be <a href="#TextDocument.validatePosition">adjusted</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="position"></a><span class="ts" id=117 data-target="#details-117" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>A valid zero-based offset.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextDocument.positionAt"></a><span class="ts" id=119 data-target="#details-119" data-toggle="collapse"><span class="ident">positionAt</span><span>(</span><span class="ident">offset</span><span>: </span><a class="type-instrinct">number</a><span>)</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-119">
<div class="comment"><p>Converts a zero-based offset to a position.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="offset"></a><span class="ts" id=120 data-target="#details-120" data-toggle="collapse"><span class="ident">offset</span><span>: </span><a class="type-instrinct">number</a></span></td><td><div class="comment"><p>A zero-based offset.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A valid <a href="#Position">position</a>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextDocument.save"></a><span class="ts" id=108 data-target="#details-108" data-toggle="collapse"><span class="ident">save</span><span>(</span><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">boolean</a>&gt;</span>
<div class="details collapse" id="details-108">
<div class="comment"><p>Save the underlying file.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">boolean</a>&gt;</span></td><td><div class="comment"><p>A promise that will resolve to true when the file
has been saved.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextDocument.validatePosition"></a><span class="ts" id=131 data-target="#details-131" data-toggle="collapse"><span class="ident">validatePosition</span><span>(</span><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-131">
<div class="comment"><p>Ensure a position is contained in the range of this document.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="position"></a><span class="ts" id=132 data-target="#details-132" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The given position or a new, adjusted position.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextDocument.validateRange"></a><span class="ts" id=128 data-target="#details-128" data-toggle="collapse"><span class="ident">validateRange</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-128">
<div class="comment"><p>Ensure a range is completely contained in this document.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=129 data-target="#details-129" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>The given range or a new, adjusted range.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="TextDocumentChangeEvent"></a><span class="code-item" id=871>TextDocumentChangeEvent</span>



<div class="comment"><p>An event describing a transactional <a href="#TextDocument">document</a> change.</p>
</div>

#### Properties



<a name="TextDocumentChangeEvent.contentChanges"></a><span class="ts" id=873 data-target="#details-873" data-toggle="collapse"><span class="ident">contentChanges</span><span>: </span><a class="type-ref" href="#TextDocumentContentChangeEvent">TextDocumentContentChangeEvent</a>[]</span>
<div class="details collapse" id="details-873">
<div class="comment"><p>An array of content changes.</p>
</div>
</div>



<a name="TextDocumentChangeEvent.document"></a><span class="ts" id=872 data-target="#details-872" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span>
<div class="details collapse" id="details-872">
<div class="comment"><p>The affected document.</p>
</div>
</div>

### <a name="TextDocumentContentChangeEvent"></a><span class="code-item" id=867>TextDocumentContentChangeEvent</span>



<div class="comment"><p>An event describing an individual change in the text of a <a href="#TextDocument">document</a>.</p>
</div>

#### Properties



<a name="TextDocumentContentChangeEvent.range"></a><span class="ts" id=868 data-target="#details-868" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-868">
<div class="comment"><p>The range that got replaced.</p>
</div>
</div>



<a name="TextDocumentContentChangeEvent.rangeLength"></a><span class="ts" id=869 data-target="#details-869" data-toggle="collapse"><span class="ident">rangeLength</span><span>: </span><a class="type-instrinct">number</a></span>
<div class="details collapse" id="details-869">
<div class="comment"><p>The length of the range that got replaced.</p>
</div>
</div>



<a name="TextDocumentContentChangeEvent.text"></a><span class="ts" id=870 data-target="#details-870" data-toggle="collapse"><span class="ident">text</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-870">
<div class="comment"><p>The new text for the range.</p>
</div>
</div>

### <a name="TextDocumentContentProvider"></a><span class="code-item" id=405>TextDocumentContentProvider</span>



<div class="comment"><p>A text document content provider allows to add readonly documents
to the editor, such as source from a dll or generated html from md.</p>
<p>Content providers are <a href="#workbench.registerTextDocumentContentProvider">registered</a>
for a <a href="#Uri.scheme">uri-scheme</a>. When a uri with that scheme is to
be <a href="#workbench.openTextDocument">loaded</a> the content provider is
asked.</p>
</div>

#### Events



<a name="TextDocumentContentProvider.onDidChange"></a><span class="ts" id=406 data-target="#details-406" data-toggle="collapse"><span class="ident">onDidChange</span><span>?</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#Uri">Uri</a>&gt;</span>
<div class="details collapse" id="details-406">
<div class="comment"><p>An event to signal a resource has changed.</p>
</div>
</div>

#### Methods



<a name="TextDocumentContentProvider.provideTextDocumentContent"></a><span class="ts" id=408 data-target="#details-408" data-toggle="collapse"><span class="ident">provideTextDocumentContent</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-instrinct">string</a> &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">string</a>&gt;</span>
<div class="details collapse" id="details-408">
<div class="comment"><p>Provide textual content for a given uri.</p>
<p>The editor will use the returned string-content to create a readonly
<a href="TextDocument">document</a>. Resources allocated should be released when
the corresponding document has been <a href="#workbench.onDidCloseTextDocument">closed</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=409 data-target="#details-409" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>An uri which scheme matches the scheme this provider was <a href="#workspace.registerTextDocumentContentProvider">registered</a> for.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=410 data-target="#details-410" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">string</a> &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">string</a>&gt;</span></td><td><div class="comment"><p>A string or a thenable that resolves to such.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="TextEdit"></a><span class="code-item" id=554>TextEdit</span>



<div class="comment"><p>A text edit represents edits that should be applied
to a document.</p>
</div>

#### Static



<a name="TextEdit.delete"></a><span class="ts" id=564 data-target="#details-564" data-toggle="collapse"><span class="ident">delete</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a></span>
<div class="details collapse" id="details-564">
<div class="comment"><p>Utility to create a delete edit.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=565 data-target="#details-565" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TextEdit">TextEdit</a></span></td><td><div class="comment"><p>A new text edit object.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextEdit.insert"></a><span class="ts" id=560 data-target="#details-560" data-toggle="collapse"><span class="ident">insert</span><span>(</span><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">newText</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a></span>
<div class="details collapse" id="details-560">
<div class="comment"><p>Utility to create an insert edit.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="position"></a><span class="ts" id=561 data-target="#details-561" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position, will become an empty range.</p>
</div></td></tr>
<tr><td><a name="newText"></a><span class="ts" id=562 data-target="#details-562" data-toggle="collapse"><span class="ident">newText</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A string.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TextEdit">TextEdit</a></span></td><td><div class="comment"><p>A new text edit object.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextEdit.replace"></a><span class="ts" id=556 data-target="#details-556" data-toggle="collapse"><span class="ident">replace</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">newText</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a></span>
<div class="details collapse" id="details-556">
<div class="comment"><p>Utility to create a replace edit.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=557 data-target="#details-557" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><td><a name="newText"></a><span class="ts" id=558 data-target="#details-558" data-toggle="collapse"><span class="ident">newText</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A string.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TextEdit">TextEdit</a></span></td><td><div class="comment"><p>A new text edit object.</p>
</div></td></tr>
</table>
</div>
</div>

#### Constructors



<a name="TextEdit.new TextEdit"></a><span class="ts" id=569 data-target="#details-569" data-toggle="collapse"><span class="ident">new TextEdit</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">newText</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a></span>
<div class="details collapse" id="details-569">
<div class="comment"><p>Create a new TextEdit.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=570 data-target="#details-570" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><td><a name="newText"></a><span class="ts" id=571 data-target="#details-571" data-toggle="collapse"><span class="ident">newText</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A string.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TextEdit">TextEdit</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="TextEdit.newText"></a><span class="ts" id=567 data-target="#details-567" data-toggle="collapse"><span class="ident">newText</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-567">
<div class="comment"><p>The string this edit will insert.</p>
</div>
</div>



<a name="TextEdit.range"></a><span class="ts" id=566 data-target="#details-566" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-566">
<div class="comment"><p>The range this edit applies to.</p>
</div>
</div>

### <a name="TextEditor"></a><span class="code-item" id=293>TextEditor</span>



<div class="comment"><p>Represents an editor that is attached to a <a href="#TextDocument">document</a>.</p>
</div>

#### Properties



<a name="TextEditor.document"></a><span class="ts" id=294 data-target="#details-294" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span>
<div class="details collapse" id="details-294">
<div class="comment"><p>The document associated with this text editor. The document will be the same for the entire lifetime of this text editor.</p>
</div>
</div>



<a name="TextEditor.options"></a><span class="ts" id=297 data-target="#details-297" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#TextEditorOptions">TextEditorOptions</a></span>
<div class="details collapse" id="details-297">
<div class="comment"><p>Text editor options.</p>
</div>
</div>



<a name="TextEditor.selection"></a><span class="ts" id=295 data-target="#details-295" data-toggle="collapse"><span class="ident">selection</span><span>: </span><a class="type-ref" href="#Selection">Selection</a></span>
<div class="details collapse" id="details-295">
<div class="comment"><p>The primary selection on this text editor. Shorthand for <code>TextEditor.selections[0]</code>.</p>
</div>
</div>



<a name="TextEditor.selections"></a><span class="ts" id=296 data-target="#details-296" data-toggle="collapse"><span class="ident">selections</span><span>: </span><a class="type-ref" href="#Selection">Selection</a>[]</span>
<div class="details collapse" id="details-296">
<div class="comment"><p>The selections in this text editor. The primary selection is always at index 0.</p>
</div>
</div>



<a name="TextEditor.viewColumn"></a><span class="ts" id=298 data-target="#details-298" data-toggle="collapse"><span class="ident">viewColumn</span><span>: </span><a class="type-ref" href="#ViewColumn">ViewColumn</a></span>
<div class="details collapse" id="details-298">
<div class="comment"><p>The column in which this editor shows. Will be <code>undefined</code> in case this
isn&#39;t one of the three main editors, e.g an embedded editor.</p>
</div>
</div>

#### Methods



<a name="TextEditor.edit"></a><span class="ts" id=300 data-target="#details-300" data-toggle="collapse"><span class="ident">edit</span><span>(</span><span class="ident">callback</span><span>: </span>(editBuilder: <a class="type-ref" href="#TextEditorEdit">TextEditorEdit</a>) =&gt; <a class="type-instrinct">void</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">boolean</a>&gt;</span>
<div class="details collapse" id="details-300">
<div class="comment"><p>Perform an edit on the document associated with this text editor.</p>
<p>The given callback-function is invoked with an <a href="#TextEditorEdit">edit-builder</a> which must
be used to make edits. Note that the edit-builder is only valid while the
callback executes.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="callback"></a><span class="ts" id=301 data-target="#details-301" data-toggle="collapse"><span class="ident">callback</span><span>: </span>(editBuilder: <a class="type-ref" href="#TextEditorEdit">TextEditorEdit</a>) =&gt; <a class="type-instrinct">void</a></span></td><td><div class="comment"><p>A function which can make edits using an <a href="#TextEditorEdit">edit-builder</a>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-instrinct">boolean</a>&gt;</span></td><td><div class="comment"><p>A promise that resolves with a value indicating if the edits could be applied.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextEditor.hide"></a><span class="ts" id=317 data-target="#details-317" data-toggle="collapse"><span class="ident">hide</span><span>(</span><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-317">
<div class="comment"><p>Hide the text editor.</p>
<ul>
<li><em>deprecated</em> - <strong>This method is deprecated.</strong> Use the command &#39;workbench.action.closeActiveEditor&#39; instead.
This method shows unexpected behavior and will be removed in the next major update.</li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="TextEditor.revealRange"></a><span class="ts" id=310 data-target="#details-310" data-toggle="collapse"><span class="ident">revealRange</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">revealType</span><span>?</span><span>: </span><a class="type-ref" href="#TextEditorRevealType">TextEditorRevealType</a><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-310">
<div class="comment"><p>Scroll as indicated by <code>revealType</code> in order to reveal the given range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=311 data-target="#details-311" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><td><a name="revealType"></a><span class="ts" id=312 data-target="#details-312" data-toggle="collapse"><span class="ident">revealType</span><span>?</span><span>: </span><a class="type-ref" href="#TextEditorRevealType">TextEditorRevealType</a></span></td><td><div class="comment"><p>The scrolling strategy for revealing <code>range</code>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="TextEditor.setDecorations"></a><span class="ts" id=306 data-target="#details-306" data-toggle="collapse"><span class="ident">setDecorations</span><span>(</span><span class="ident">decorationType</span><span>: </span><a class="type-ref" href="#TextEditorDecorationType">TextEditorDecorationType</a>, <span class="ident">rangesOrOptions</span><span>: </span><a class="type-ref" href="#Range">Range</a>[] &#124; <a class="type-ref" href="#DecorationOptions">DecorationOptions</a>[]<span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-306">
<div class="comment"><p>Adds a set of decorations to the text editor. If a set of decorations already exists with
the given <a href="#TextEditorDecorationType">decoration type</a>, they will be replaced.</p>
<ul>
<li><em>see</em> - <a href="#window.createTextEditorDecorationType">createTextEditorDecorationType</a>.</li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="decorationType"></a><span class="ts" id=307 data-target="#details-307" data-toggle="collapse"><span class="ident">decorationType</span><span>: </span><a class="type-ref" href="#TextEditorDecorationType">TextEditorDecorationType</a></span></td><td><div class="comment"><p>A decoration type.</p>
</div></td></tr>
<tr><td><a name="rangesOrOptions"></a><span class="ts" id=308 data-target="#details-308" data-toggle="collapse"><span class="ident">rangesOrOptions</span><span>: </span><a class="type-ref" href="#Range">Range</a>[] &#124; <a class="type-ref" href="#DecorationOptions">DecorationOptions</a>[]</span></td><td><div class="comment"><p>Either <a href="#Range">ranges</a> or more detailed <a href="#DecorationOptions">options</a>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="TextEditor.show"></a><span class="ts" id=314 data-target="#details-314" data-toggle="collapse"><span class="ident">show</span><span>(</span><span class="ident">column</span><span>?</span><span>: </span><a class="type-ref" href="#ViewColumn">ViewColumn</a><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-314">
<div class="comment"><p>Show the text editor.</p>
<ul>
<li><em>deprecated</em> - <strong>This method is deprecated.</strong> Use <a href="#window.showTextDocument">window.showTextDocument</a>
instead. This method shows unexpected behavior and will be removed in the next major update.</li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="column"></a><span class="ts" id=315 data-target="#details-315" data-toggle="collapse"><span class="ident">column</span><span>?</span><span>: </span><a class="type-ref" href="#ViewColumn">ViewColumn</a></span></td><td><div class="comment"><p>The <a href="#ViewColumn">column</a> in which to show this editor.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="TextEditorDecorationType"></a><span class="code-item" id=241>TextEditorDecorationType</span>



<div class="comment"><p>Represents a handle to a set of decorations
sharing the same <a href="#DecorationRenderOptions">styling options</a> in a <a href="#TextEditor">text editor</a>.</p>
<p>To get an instance of a <code>TextEditorDecorationType</code> use
<a href="#window.createTextEditorDecorationType">createTextEditorDecorationType</a>.</p>
</div>

#### Properties



<a name="TextEditorDecorationType.key"></a><span class="ts" id=242 data-target="#details-242" data-toggle="collapse"><span class="ident">key</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-242">
<div class="comment"><p>Internal representation of the handle.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>

#### Methods



<a name="TextEditorDecorationType.dispose"></a><span class="ts" id=244 data-target="#details-244" data-toggle="collapse"><span class="ident">dispose</span><span>(</span><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-244">
<div class="comment"><p>Remove this decoration type and all decorations on all text editors using it.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="TextEditorEdit"></a><span class="code-item" id=318>TextEditorEdit</span>



<div class="comment"><p>A complex edit that will be applied in one transaction on a TextEditor.
This holds a description of the edits and if the edits are valid (i.e. no overlapping regions, document was not changed in the meantime, etc.)
they can be applied on a <a href="#Document">document</a> associated with a <a href="#TextEditor">text editor</a>.</p>
</div>

#### Methods



<a name="TextEditorEdit.delete"></a><span class="ts" id=328 data-target="#details-328" data-toggle="collapse"><span class="ident">delete</span><span>(</span><span class="ident">location</span><span>: </span><a class="type-ref" href="#Range">Range</a> &#124; <a class="type-ref" href="#Selection">Selection</a><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-328">
<div class="comment"><p>Delete a certain text region.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="location"></a><span class="ts" id=329 data-target="#details-329" data-toggle="collapse"><span class="ident">location</span><span>: </span><a class="type-ref" href="#Range">Range</a> &#124; <a class="type-ref" href="#Selection">Selection</a></span></td><td><div class="comment"><p>The range this operation should remove.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="TextEditorEdit.insert"></a><span class="ts" id=324 data-target="#details-324" data-toggle="collapse"><span class="ident">insert</span><span>(</span><span class="ident">location</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">value</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-324">
<div class="comment"><p>Insert text at a location.
You can use \r\n or \n in <code>value</code> and they will be normalized to the current <a href="#Document">document</a>.
Although the equivalent text edit can be made with <a href="#TextEditorEdit.replace">replace</a>, <code>insert</code> will produce a different resulting selection (it will get moved).</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="location"></a><span class="ts" id=325 data-target="#details-325" data-toggle="collapse"><span class="ident">location</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The position where the new text should be inserted.</p>
</div></td></tr>
<tr><td><a name="value"></a><span class="ts" id=326 data-target="#details-326" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The new text this operation should insert.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="TextEditorEdit.replace"></a><span class="ts" id=320 data-target="#details-320" data-toggle="collapse"><span class="ident">replace</span><span>(</span><span class="ident">location</span><span>: </span><a class="type-ref" href="#Position">Position</a> &#124; <a class="type-ref" href="#Range">Range</a> &#124; <a class="type-ref" href="#Selection">Selection</a>, <span class="ident">value</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-320">
<div class="comment"><p>Replace a certain text region with a new value.
You can use \r\n or \n in <code>value</code> and they will be normalized to the current <a href="#Document">document</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="location"></a><span class="ts" id=321 data-target="#details-321" data-toggle="collapse"><span class="ident">location</span><span>: </span><a class="type-ref" href="#Position">Position</a> &#124; <a class="type-ref" href="#Range">Range</a> &#124; <a class="type-ref" href="#Selection">Selection</a></span></td><td><div class="comment"><p>The range this operation should remove.</p>
</div></td></tr>
<tr><td><a name="value"></a><span class="ts" id=322 data-target="#details-322" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The new text this operation should insert after removing <code>location</code>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="TextEditorOptions"></a><span class="code-item" id=238>TextEditorOptions</span>



<div class="comment"><p>Represents a <a href="#TextEditor">text editor</a>&#39;s <a href="#TextEditor.options">options</a>.</p>
</div>

#### Properties



<a name="TextEditorOptions.insertSpaces"></a><span class="ts" id=240 data-target="#details-240" data-toggle="collapse"><span class="ident">insertSpaces</span><span>?</span><span>: </span><a class="type-instrinct">boolean</a> &#124; <a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-240">
<div class="comment"><p>When pressing Tab insert <a href="#TextEditorOptions.tabSize">n</a> spaces.
When getting a text editor&#39;s options, this property will always be a boolean (resolved).
When setting a text editor&#39;s options, this property is optional and it can be a boolean or <code>&quot;auto&quot;</code>.</p>
</div>
</div>



<a name="TextEditorOptions.tabSize"></a><span class="ts" id=239 data-target="#details-239" data-toggle="collapse"><span class="ident">tabSize</span><span>?</span><span>: </span><a class="type-instrinct">number</a> &#124; <a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-239">
<div class="comment"><p>The size in spaces a tab takes. This is used for two purposes:</p>
<ul>
<li>the rendering width of a tab character;</li>
<li>the number of spaces to insert when <a href="#TextEditorOptions.insertSpaces">insertSpaces</a> is true.
When getting a text editor&#39;s options, this property will always be a number (resolved).
When setting a text editor&#39;s options, this property is optional and it can be a number or <code>&quot;auto&quot;</code>.</li>
</ul>
</div>
</div>

### <a name="TextEditorOptionsChangeEvent"></a><span class="code-item" id=232>TextEditorOptionsChangeEvent</span>



<div class="comment"><p>Represents an event describing the change in a <a href="#TextEditor.options">text editor&#39;s options</a>.</p>
</div>

#### Properties



<a name="TextEditorOptionsChangeEvent.options"></a><span class="ts" id=234 data-target="#details-234" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#TextEditorOptions">TextEditorOptions</a></span>
<div class="details collapse" id="details-234">
<div class="comment"><p>The new value for the <a href="#TextEditor.options">text editor&#39;s options</a>.</p>
</div>
</div>



<a name="TextEditorOptionsChangeEvent.textEditor"></a><span class="ts" id=233 data-target="#details-233" data-toggle="collapse"><span class="ident">textEditor</span><span>: </span><a class="type-ref" href="#TextEditor">TextEditor</a></span>
<div class="details collapse" id="details-233">
<div class="comment"><p>The <a href="#TextEditor">text editor</a> for which the options have changed.</p>
</div>
</div>

### <a name="TextEditorRevealType"></a><span class="code-item" id=245>TextEditorRevealType</span>



<div class="comment"><p>Represents different <a href="#TextEditor.revealRange">reveal</a> strategies in a text editor.</p>
</div>

#### Enumeration members



<a name="TextEditorRevealType.Default"></a><span class="ts" id=246 data-target="#details-246" data-toggle="collapse"><span class="ident">Default</span></span>
<div class="details collapse" id="details-246">
</div>



<a name="TextEditorRevealType.InCenter"></a><span class="ts" id=247 data-target="#details-247" data-toggle="collapse"><span class="ident">InCenter</span></span>
<div class="details collapse" id="details-247">
</div>



<a name="TextEditorRevealType.InCenterIfOutsideViewport"></a><span class="ts" id=248 data-target="#details-248" data-toggle="collapse"><span class="ident">InCenterIfOutsideViewport</span></span>
<div class="details collapse" id="details-248">
</div>

### <a name="TextEditorSelectionChangeEvent"></a><span class="code-item" id=229>TextEditorSelectionChangeEvent</span>



<div class="comment"><p>Represents an event describing the change in a <a href="#TextEditor.selections">text editor&#39;s selections</a>.</p>
</div>

#### Properties



<a name="TextEditorSelectionChangeEvent.selections"></a><span class="ts" id=231 data-target="#details-231" data-toggle="collapse"><span class="ident">selections</span><span>: </span><a class="type-ref" href="#Selection">Selection</a>[]</span>
<div class="details collapse" id="details-231">
<div class="comment"><p>The new value for the <a href="#TextEditor.selections">text editor&#39;s selections</a>.</p>
</div>
</div>



<a name="TextEditorSelectionChangeEvent.textEditor"></a><span class="ts" id=230 data-target="#details-230" data-toggle="collapse"><span class="ident">textEditor</span><span>: </span><a class="type-ref" href="#TextEditor">TextEditor</a></span>
<div class="details collapse" id="details-230">
<div class="comment"><p>The <a href="#TextEditor">text editor</a> for which the selections have changed.</p>
</div>
</div>

### <a name="TextEditorViewColumnChangeEvent"></a><span class="code-item" id=235>TextEditorViewColumnChangeEvent</span>



<div class="comment"><p>Represents an event describing the change of a <a href="#TextEditor.viewColumn">text editor&#39;s view column</a>.</p>
</div>

#### Properties



<a name="TextEditorViewColumnChangeEvent.textEditor"></a><span class="ts" id=236 data-target="#details-236" data-toggle="collapse"><span class="ident">textEditor</span><span>: </span><a class="type-ref" href="#TextEditor">TextEditor</a></span>
<div class="details collapse" id="details-236">
<div class="comment"><p>The <a href="#TextEditor">text editor</a> for which the options have changed.</p>
</div>
</div>



<a name="TextEditorViewColumnChangeEvent.viewColumn"></a><span class="ts" id=237 data-target="#details-237" data-toggle="collapse"><span class="ident">viewColumn</span><span>: </span><a class="type-ref" href="#ViewColumn">ViewColumn</a></span>
<div class="details collapse" id="details-237">
<div class="comment"><p>The new value for the <a href="#TextEditor.viewColumn">text editor&#39;s view column</a>.</p>
</div>
</div>

### <a name="TextLine"></a><span class="code-item" id=93>TextLine</span>



<div class="comment"><p>Represents a line of text, such as a line of source code.</p>
<p>TextLine objects are <strong>immutable</strong>. When a <a href="#TextDocument">document</a> changes,
previously retrieved lines will not represent the latest state.</p>
</div>

#### Properties



<a name="TextLine.firstNonWhitespaceCharacterIndex"></a><span class="ts" id=98 data-target="#details-98" data-toggle="collapse"><span class="ident">firstNonWhitespaceCharacterIndex</span><span>: </span><a class="type-instrinct">number</a></span>
<div class="details collapse" id="details-98">
<div class="comment"><p>The offset of the first character which is not a whitespace character as defined
by <code>/\s/</code>.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="TextLine.isEmptyOrWhitespace"></a><span class="ts" id=99 data-target="#details-99" data-toggle="collapse"><span class="ident">isEmptyOrWhitespace</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-99">
<div class="comment"><p>Whether this line is whitespace only, shorthand
for <a href="#TextLine.firstNonWhitespaceCharacterIndex]">TextLine.firstNonWhitespaceCharacterIndex</a> === <a href="#TextLine.text.length">TextLine.text.length</a>.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="TextLine.lineNumber"></a><span class="ts" id=94 data-target="#details-94" data-toggle="collapse"><span class="ident">lineNumber</span><span>: </span><a class="type-instrinct">number</a></span>
<div class="details collapse" id="details-94">
<div class="comment"><p>The zero-based line number.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="TextLine.range"></a><span class="ts" id=96 data-target="#details-96" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-96">
<div class="comment"><p>The range this line covers without the line separator characters.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="TextLine.rangeIncludingLineBreak"></a><span class="ts" id=97 data-target="#details-97" data-toggle="collapse"><span class="ident">rangeIncludingLineBreak</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-97">
<div class="comment"><p>The range this line covers with the line separator characters.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="TextLine.text"></a><span class="ts" id=95 data-target="#details-95" data-toggle="collapse"><span class="ident">text</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-95">
<div class="comment"><p>The text of this line without the line separator characters.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>

### <a name="ThemableDecorationRenderOptions"></a><span class="code-item" id=254>ThemableDecorationRenderOptions</span>



<div class="comment"><p>Represents theme specific rendering styles for a <a href="#TextEditorDecorationType">text editor decoration</a>.</p>
</div>

#### Properties



<a name="ThemableDecorationRenderOptions.backgroundColor"></a><span class="ts" id=255 data-target="#details-255" data-toggle="collapse"><span class="ident">backgroundColor</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-255">
<div class="comment"><p>Background color of the decoration. Use rgba() and define transparent background colors to play well with other decorations.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.borderColor"></a><span class="ts" id=259 data-target="#details-259" data-toggle="collapse"><span class="ident">borderColor</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-259">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.borderRadius"></a><span class="ts" id=260 data-target="#details-260" data-toggle="collapse"><span class="ident">borderRadius</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-260">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.borderSpacing"></a><span class="ts" id=261 data-target="#details-261" data-toggle="collapse"><span class="ident">borderSpacing</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-261">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.borderStyle"></a><span class="ts" id=262 data-target="#details-262" data-toggle="collapse"><span class="ident">borderStyle</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-262">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.borderWidth"></a><span class="ts" id=263 data-target="#details-263" data-toggle="collapse"><span class="ident">borderWidth</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-263">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.color"></a><span class="ts" id=266 data-target="#details-266" data-toggle="collapse"><span class="ident">color</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-266">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.cursor"></a><span class="ts" id=265 data-target="#details-265" data-toggle="collapse"><span class="ident">cursor</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-265">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.gutterIconPath"></a><span class="ts" id=268 data-target="#details-268" data-toggle="collapse"><span class="ident">gutterIconPath</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-268">
<div class="comment"><p>An <strong>absolute path</strong> to an image to be rendered in the gutterIconPath.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.letterSpacing"></a><span class="ts" id=267 data-target="#details-267" data-toggle="collapse"><span class="ident">letterSpacing</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-267">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.outlineColor"></a><span class="ts" id=256 data-target="#details-256" data-toggle="collapse"><span class="ident">outlineColor</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-256">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.outlineStyle"></a><span class="ts" id=257 data-target="#details-257" data-toggle="collapse"><span class="ident">outlineStyle</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-257">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.outlineWidth"></a><span class="ts" id=258 data-target="#details-258" data-toggle="collapse"><span class="ident">outlineWidth</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-258">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.overviewRulerColor"></a><span class="ts" id=269 data-target="#details-269" data-toggle="collapse"><span class="ident">overviewRulerColor</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-269">
<div class="comment"><p>The color of the decoration in the overview ruler. Use rgba() and define transparent colors to play well with other decorations.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.textDecoration"></a><span class="ts" id=264 data-target="#details-264" data-toggle="collapse"><span class="ident">textDecoration</span><span>?</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-264">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>

### <a name="Uri"></a><span class="code-item" id=330>Uri</span>



<div class="comment"><p>A universal resource identifier representing either a file on disk
or another resource, like untitled resources.</p>
</div>

#### Static



<a name="Uri.file"></a><span class="ts" id=332 data-target="#details-332" data-toggle="collapse"><span class="ident">file</span><span>(</span><span class="ident">path</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span>
<div class="details collapse" id="details-332">
<div class="comment"><p>Create an URI from a file system path. The <a href="#Uri.scheme">scheme</a>
will be <code>file</code>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="path"></a><span class="ts" id=333 data-target="#details-333" data-toggle="collapse"><span class="ident">path</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A file system or UNC path.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A new Uri instance.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Uri.parse"></a><span class="ts" id=335 data-target="#details-335" data-toggle="collapse"><span class="ident">parse</span><span>(</span><span class="ident">value</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span>
<div class="details collapse" id="details-335">
<div class="comment"><p>Create an URI from a string. Will throw if the given value is not
valid.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="value"></a><span class="ts" id=336 data-target="#details-336" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>The string value of an Uri.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A new Uri instance.</p>
</div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="Uri.authority"></a><span class="ts" id=338 data-target="#details-338" data-toggle="collapse"><span class="ident">authority</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-338">
<div class="comment"><p>Authority is the <code>www.msft.com</code> part of <code>http://www.msft.com/some/path?query#fragment</code>.
The part between the first double slashes and the next slash.</p>
</div>
</div>



<a name="Uri.fragment"></a><span class="ts" id=341 data-target="#details-341" data-toggle="collapse"><span class="ident">fragment</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-341">
<div class="comment"><p>Fragment is the <code>fragment</code> part of <code>http://www.msft.com/some/path?query#fragment</code>.</p>
</div>
</div>



<a name="Uri.fsPath"></a><span class="ts" id=342 data-target="#details-342" data-toggle="collapse"><span class="ident">fsPath</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-342">
<div class="comment"><p>The string representing the corresponding file system path of this URI.</p>
<p>Will handle UNC paths and normalize windows drive letters to lower-case. Also
uses the platform specific path separator. Will <em>not</em> validate the path for
invalid characters and semantics. Will <em>not</em> look at the scheme of this URI.</p>
</div>
</div>



<a name="Uri.path"></a><span class="ts" id=339 data-target="#details-339" data-toggle="collapse"><span class="ident">path</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-339">
<div class="comment"><p>Path is the <code>/some/path</code> part of <code>http://www.msft.com/some/path?query#fragment</code>.</p>
</div>
</div>



<a name="Uri.query"></a><span class="ts" id=340 data-target="#details-340" data-toggle="collapse"><span class="ident">query</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-340">
<div class="comment"><p>Query is the <code>query</code> part of <code>http://www.msft.com/some/path?query#fragment</code>.</p>
</div>
</div>



<a name="Uri.scheme"></a><span class="ts" id=337 data-target="#details-337" data-toggle="collapse"><span class="ident">scheme</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-337">
<div class="comment"><p>Scheme is the <code>http</code> part of <code>http://www.msft.com/some/path?query#fragment</code>.
The part before the first colon.</p>
</div>
</div>

#### Methods



<a name="Uri.toJSON"></a><span class="ts" id=346 data-target="#details-346" data-toggle="collapse"><span class="ident">toJSON</span><span>(</span><span>)</span><span>: </span><a class="type-instrinct">any</a></span>
<div class="details collapse" id="details-346">
<div class="comment"><p>Returns a JSON representation of this Uri.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">any</a></span></td><td><div class="comment"><p>An object.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Uri.toString"></a><span class="ts" id=344 data-target="#details-344" data-toggle="collapse"><span class="ident">toString</span><span>(</span><span>)</span><span>: </span><a class="type-instrinct">string</a></span>
<div class="details collapse" id="details-344">
<div class="comment"><p>Returns a canonical representation of this URI. The representation and normalization
of a URI depends on the scheme.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A string that is the encoded version of this Uri.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="ViewColumn"></a><span class="code-item" id=797>ViewColumn</span>



<div class="comment"><p>Denotes a column in the VS Code window. Columns are
used to show editors side by side.</p>
</div>

#### Enumeration members



<a name="ViewColumn.One"></a><span class="ts" id=798 data-target="#details-798" data-toggle="collapse"><span class="ident">One</span></span>
<div class="details collapse" id="details-798">
<em>1</em>
</div>



<a name="ViewColumn.Three"></a><span class="ts" id=800 data-target="#details-800" data-toggle="collapse"><span class="ident">Three</span></span>
<div class="details collapse" id="details-800">
<em>3</em>
</div>



<a name="ViewColumn.Two"></a><span class="ts" id=799 data-target="#details-799" data-toggle="collapse"><span class="ident">Two</span></span>
<div class="details collapse" id="details-799">
<em>2</em>
</div>

### <a name="WorkspaceConfiguration"></a><span class="code-item" id=748>WorkspaceConfiguration</span>



<div class="comment"><p>Represents the workspace configuration. The workspace configuration
is always a merged view of the configuration of the current <a href="#workspace.rootPath">workspace</a>
and the installation-wide configuration.</p>
</div>

#### Methods



<a name="WorkspaceConfiguration.get"></a><span class="ts" id=750 data-target="#details-750" data-toggle="collapse"><span class="ident">get</span><span>&lt;</span>T<span>&gt;</span><span>(</span><span class="ident">section</span><span>: </span><a class="type-instrinct">string</a>, <span class="ident">defaultValue</span><span>?</span><span>: </span><a class="type-instrinct">T</a><span>)</span><span>: </span><a class="type-instrinct">T</a></span>
<div class="details collapse" id="details-750">
<div class="comment"><p>Return a value from this configuration.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="section"></a><span class="ts" id=752 data-target="#details-752" data-toggle="collapse"><span class="ident">section</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>Configuration name, supports <em>dotted</em> names.</p>
</div></td></tr>
<tr><td><a name="defaultValue"></a><span class="ts" id=753 data-target="#details-753" data-toggle="collapse"><span class="ident">defaultValue</span><span>?</span><span>: </span><a class="type-instrinct">T</a></span></td><td><div class="comment"><p>A value should be returned when no value could be found, is <code>undefined</code>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">T</a></span></td><td><div class="comment"><p>The value <code>section</code> denotes or the default.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="WorkspaceConfiguration.has"></a><span class="ts" id=755 data-target="#details-755" data-toggle="collapse"><span class="ident">has</span><span>(</span><span class="ident">section</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-755">
<div class="comment"><p>Check if this configuration has a certain value.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="section"></a><span class="ts" id=756 data-target="#details-756" data-toggle="collapse"><span class="ident">section</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>configuration name, supports <em>dotted</em> names.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">boolean</a></span></td><td><div class="comment"><p><code>true</code> iff the section doesn&#39;t resolve to <code>undefined</code>.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="WorkspaceEdit"></a><span class="code-item" id=572>WorkspaceEdit</span>



<div class="comment"><p>A workspace edit represents textual changes for many documents.</p>
</div>

#### Properties



<a name="WorkspaceEdit.size"></a><span class="ts" id=573 data-target="#details-573" data-toggle="collapse"><span class="ident">size</span><span>: </span><a class="type-instrinct">number</a></span>
<div class="details collapse" id="details-573">
<div class="comment"><p>The number of affected resources.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>

#### Methods



<a name="WorkspaceEdit.delete"></a><span class="ts" id=585 data-target="#details-585" data-toggle="collapse"><span class="ident">delete</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a>, <span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-585">
<div class="comment"><p>Delete the text at the given range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=586 data-target="#details-586" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A resource identifier.</p>
</div></td></tr>
<tr><td><a name="range"></a><span class="ts" id=587 data-target="#details-587" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="WorkspaceEdit.entries"></a><span class="ts" id=599 data-target="#details-599" data-toggle="collapse"><span class="ident">entries</span><span>(</span><span>)</span><span>: </span>[<a class="type-ref" href="#Uri">Uri</a>, <a class="type-ref" href="#TextEdit">TextEdit</a>[]][]</span>
<div class="details collapse" id="details-599">
<div class="comment"><p>Get all text edits grouped by resource.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts">[<a class="type-ref" href="#Uri">Uri</a>, <a class="type-ref" href="#TextEdit">TextEdit</a>[]][]</span></td><td><div class="comment"><p>An array of <code>[Uri, TextEdit[]]</code>-tuples.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="WorkspaceEdit.get"></a><span class="ts" id=596 data-target="#details-596" data-toggle="collapse"><span class="ident">get</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a><span>)</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a>[]</span>
<div class="details collapse" id="details-596">
<div class="comment"><p>Get the text edits for a resource.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=597 data-target="#details-597" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A resource identifier.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TextEdit">TextEdit</a>[]</span></td><td><div class="comment"><p>An array of text edits.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="WorkspaceEdit.has"></a><span class="ts" id=589 data-target="#details-589" data-toggle="collapse"><span class="ident">has</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a><span>)</span><span>: </span><a class="type-instrinct">boolean</a></span>
<div class="details collapse" id="details-589">
<div class="comment"><p>Check if this edit affects the given resource.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=590 data-target="#details-590" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A resource identifier.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">boolean</a></span></td><td><div class="comment"><p><code>true</code> if the given resource will be touched by this edit.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="WorkspaceEdit.insert"></a><span class="ts" id=580 data-target="#details-580" data-toggle="collapse"><span class="ident">insert</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a>, <span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">newText</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-580">
<div class="comment"><p>Insert the given text at the given position.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=581 data-target="#details-581" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A resource identifier.</p>
</div></td></tr>
<tr><td><a name="position"></a><span class="ts" id=582 data-target="#details-582" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><td><a name="newText"></a><span class="ts" id=583 data-target="#details-583" data-toggle="collapse"><span class="ident">newText</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A string.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="WorkspaceEdit.replace"></a><span class="ts" id=575 data-target="#details-575" data-toggle="collapse"><span class="ident">replace</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a>, <span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">newText</span><span>: </span><a class="type-instrinct">string</a><span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-575">
<div class="comment"><p>Replace the given range with given text for the given resource.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=576 data-target="#details-576" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A resource identifier.</p>
</div></td></tr>
<tr><td><a name="range"></a><span class="ts" id=577 data-target="#details-577" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><td><a name="newText"></a><span class="ts" id=578 data-target="#details-578" data-toggle="collapse"><span class="ident">newText</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A string.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="WorkspaceEdit.set"></a><span class="ts" id=592 data-target="#details-592" data-toggle="collapse"><span class="ident">set</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a>, <span class="ident">edits</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a>[]<span>)</span><span>: </span><a class="type-instrinct">void</a></span>
<div class="details collapse" id="details-592">
<div class="comment"><p>Set (and replace) text edits for a resource.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=593 data-target="#details-593" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A resource identifier.</p>
</div></td></tr>
<tr><td><a name="edits"></a><span class="ts" id=594 data-target="#details-594" data-toggle="collapse"><span class="ident">edits</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a>[]</span></td><td><div class="comment"><p>An array of text edits.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-instrinct">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="WorkspaceSymbolProvider"></a><span class="code-item" id=540>WorkspaceSymbolProvider</span>



<div class="comment"><p>The workspace symbol provider interface defines the contract between extensions and
the <a href="https://code.visualstudio.com/docs/editor/editingevolved#_open-symbol-by-name">symbol search</a>-feature.</p>
</div>

#### Methods



<a name="WorkspaceSymbolProvider.provideWorkspaceSymbols"></a><span class="ts" id=542 data-target="#details-542" data-toggle="collapse"><span class="ident">provideWorkspaceSymbols</span><span>(</span><span class="ident">query</span><span>: </span><a class="type-instrinct">string</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#SymbolInformation">SymbolInformation</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#SymbolInformation">SymbolInformation</a>[]&gt;</span>
<div class="details collapse" id="details-542">
<div class="comment"><p>Project-wide search for a symbol matching the given query string. It is up to the provider
how to search given the query string, like substring, indexOf etc.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="query"></a><span class="ts" id=543 data-target="#details-543" data-toggle="collapse"><span class="ident">query</span><span>: </span><a class="type-instrinct">string</a></span></td><td><div class="comment"><p>A non-empty query string.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=544 data-target="#details-544" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#SymbolInformation">SymbolInformation</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#SymbolInformation">SymbolInformation</a>[]&gt;</span></td><td><div class="comment"><p>An array of document highlights or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>

