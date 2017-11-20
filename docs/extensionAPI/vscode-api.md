---
Order: 6
Area: extensionapi
TOCTitle: vscode namespace API
ContentId: 8CEBCDF8-4F0A-4C81-A904-3DEA43480EA6
PageTitle: Visual Studio Code API Reference
DateApproved: 11/8/2017
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
the <a href="https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette">command palette</a>.</li>
<li>keybinding - Use the <code>keybindings</code>-section in <code>package.json</code> to enable
<a href="https://code.visualstudio.com/docs/getstarted/keybindings#_customizing-shortcuts">keybindings</a>
for your extension.</li>
</ul>
<p>Commands from other extensions and from the editor itself are accessible to an extension. However,
when invoking an editor command not all argument types are supported.</p>
<p>This is a sample that registers a command handler and adds an entry for that command to the palette. First
register a command handler with the identifier <code>extension.sayHello</code>.</p>

<pre><code class="lang-javascript">commands.registerCommand(<span class="hljs-string">'extension.sayHello'</span>, () =&gt; {
    <span class="hljs-built_in">window</span>.showInformationMessage(<span class="hljs-string">'Hello World!'</span>);
});
</code></pre>
<p>Second, bind the command identifier to a title under which it will show in the palette (<code>package.json</code>).</p>

<pre><code class="lang-json">{
    <span class="hljs-attr">"contributes"</span>: {
        <span class="hljs-attr">"commands"</span>: [{
            <span class="hljs-attr">"command"</span>: <span class="hljs-string">"extension.sayHello"</span>,
            <span class="hljs-attr">"title"</span>: <span class="hljs-string">"Hello World"</span>
        }]
    }
}
</code></pre>
</div>

#### Functions



<a name="commands.executeCommand"></a><span class="ts" id=1438 data-target="#details-1438" data-toggle="collapse"><span class="ident">executeCommand</span><span>&lt;</span>T<span>&gt;</span><span>(</span><span class="ident">command</span><span>: </span><a class="type-intrinsic">string</a>, <span>...</span><span class="ident">rest</span><span>: </span><a class="type-intrinsic">any</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span>
<div class="details collapse" id="details-1438">
<div class="comment"><p>Executes the command denoted by the given command identifier.</p>
<ul>
<li><em>Note 1:</em> When executing an editor command not all types are allowed to
be passed as arguments. Allowed are the primitive types <code>string</code>, <code>boolean</code>,
<code>number</code>, <code>undefined</code>, and <code>null</code>, as well as <a href="#Position"><code>Position</code></a>, <a href="#Range"><code>Range</code></a>, <a href="#Uri"><code>Uri</code></a> and <a href="#Location"><code>Location</code></a>.</li>
<li><em>Note 2:</em> There are no restrictions when executing commands that have been contributed
by extensions.</li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="command"></a><span class="ts" id=1440 data-target="#details-1440" data-toggle="collapse"><span class="ident">command</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>Identifier of the command to execute.</p>
</div></td></tr>
<tr><td><a name="rest"></a><span class="ts" id=1441 data-target="#details-1441" data-toggle="collapse"><span>...</span><span class="ident">rest</span><span>: </span><a class="type-intrinsic">any</a>[]</span></td><td><div class="comment"><p>Parameters passed to the command function.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves to the returned value of the given command. <code>undefined</code> when
the command handler function doesn&#39;t return anything.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="commands.getCommands"></a><span class="ts" id=1443 data-target="#details-1443" data-toggle="collapse"><span class="ident">getCommands</span><span>(</span><span class="ident">filterInternal</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a>[]&gt;</span>
<div class="details collapse" id="details-1443">
<div class="comment"><p>Retrieve the list of all available commands. Commands starting an underscore are
treated as internal commands.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="filterInternal"></a><span class="ts" id=1444 data-target="#details-1444" data-toggle="collapse"><span class="ident">filterInternal</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p>Set <code>true</code> to not see internal commands (starting with an underscore)</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a>[]&gt;</span></td><td><div class="comment"><p>Thenable that resolves to a list of command ids.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="commands.registerCommand"></a><span class="ts" id=1420 data-target="#details-1420" data-toggle="collapse"><span class="ident">registerCommand</span><span>(</span><span class="ident">command</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">callback</span><span>: </span>(args: <a class="type-intrinsic">any</a>[]) =&gt; <a class="type-intrinsic">any</a>, <span class="ident">thisArg</span><span>?</span><span>: </span><a class="type-intrinsic">any</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1420">
<div class="comment"><p>Registers a command that can be invoked via a keyboard shortcut,
a menu item, an action, or directly.</p>
<p>Registering a command with an existing command identifier twice
will cause an error.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="command"></a><span class="ts" id=1421 data-target="#details-1421" data-toggle="collapse"><span class="ident">command</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A unique identifier for the command.</p>
</div></td></tr>
<tr><td><a name="callback"></a><span class="ts" id=1422 data-target="#details-1422" data-toggle="collapse"><span class="ident">callback</span><span>: </span>(args: <a class="type-intrinsic">any</a>[]) =&gt; <a class="type-intrinsic">any</a></span></td><td><div class="comment"><p>A command handler function.</p>
</div></td></tr>
<tr><td><a name="thisArg"></a><span class="ts" id=1426 data-target="#details-1426" data-toggle="collapse"><span class="ident">thisArg</span><span>?</span><span>: </span><a class="type-intrinsic">any</a></span></td><td><div class="comment"><p>The <code>this</code> context used when invoking the handler function.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>Disposable which unregisters this command on disposal.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="commands.registerTextEditorCommand"></a><span class="ts" id=1428 data-target="#details-1428" data-toggle="collapse"><span class="ident">registerTextEditorCommand</span><span>(</span><span class="ident">command</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">callback</span><span>: </span>(textEditor: <a class="type-ref" href="#TextEditor">TextEditor</a>, edit: <a class="type-ref" href="#TextEditorEdit">TextEditorEdit</a>, args: <a class="type-intrinsic">any</a>[]) =&gt; <a class="type-intrinsic">void</a>, <span class="ident">thisArg</span><span>?</span><span>: </span><a class="type-intrinsic">any</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1428">
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
<tr><td><a name="command"></a><span class="ts" id=1429 data-target="#details-1429" data-toggle="collapse"><span class="ident">command</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A unique identifier for the command.</p>
</div></td></tr>
<tr><td><a name="callback"></a><span class="ts" id=1430 data-target="#details-1430" data-toggle="collapse"><span class="ident">callback</span><span>: </span>(textEditor: <a class="type-ref" href="#TextEditor">TextEditor</a>, edit: <a class="type-ref" href="#TextEditorEdit">TextEditorEdit</a>, args: <a class="type-intrinsic">any</a>[]) =&gt; <a class="type-intrinsic">void</a></span></td><td><div class="comment"><p>A command handler function with access to an <a href="#TextEditor">editor</a> and an <a href="#TextEditorEdit">edit</a>.</p>
</div></td></tr>
<tr><td><a name="thisArg"></a><span class="ts" id=1436 data-target="#details-1436" data-toggle="collapse"><span class="ident">thisArg</span><span>?</span><span>: </span><a class="type-intrinsic">any</a></span></td><td><div class="comment"><p>The <code>this</code> context used when invoking the handler function.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>Disposable which unregisters this command on disposal.</p>
</div></td></tr>
</table>
</div>
</div>

## debug



<div class="comment"><p>Namespace for dealing with debug sessions.</p>
</div>

#### Variables



<a name="debug.activeDebugSession"></a><span class="ts" id=1749 data-target="#details-1749" data-toggle="collapse"><span class="ident">activeDebugSession</span><span>: </span><a class="type-ref" href="#DebugSession">DebugSession</a> &#124; <a class="type-intrinsic">undefined</a></span>
<div class="details collapse" id="details-1749">
<div class="comment"><p>The currently active <a href="#DebugSession">debug session</a> or <code>undefined</code>. The active debug session is the one
represented by the debug action floating window or the one currently shown in the drop down menu of the debug action floating window.
If no debug session is active, the value is <code>undefined</code>.</p>
</div>
</div>

#### Events



<a name="debug.onDidChangeActiveDebugSession"></a><span class="ts" id=1750 data-target="#details-1750" data-toggle="collapse"><span class="ident">onDidChangeActiveDebugSession</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#DebugSession">DebugSession</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span>
<div class="details collapse" id="details-1750">
<div class="comment"><p>An <a href="#Event">event</a> which fires when the <a href="#debug.activeDebugSession">active debug session</a>
has changed. <em>Note</em> that the event also fires when the active debug session changes
to <code>undefined</code>.</p>
</div>
</div>



<a name="debug.onDidReceiveDebugSessionCustomEvent"></a><span class="ts" id=1752 data-target="#details-1752" data-toggle="collapse"><span class="ident">onDidReceiveDebugSessionCustomEvent</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#DebugSessionCustomEvent">DebugSessionCustomEvent</a>&gt;</span>
<div class="details collapse" id="details-1752">
<div class="comment"><p>An <a href="#Event">event</a> which fires when a custom DAP event is received from the <a href="#DebugSession">debug session</a>.</p>
</div>
</div>



<a name="debug.onDidStartDebugSession"></a><span class="ts" id=1751 data-target="#details-1751" data-toggle="collapse"><span class="ident">onDidStartDebugSession</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#DebugSession">DebugSession</a>&gt;</span>
<div class="details collapse" id="details-1751">
<div class="comment"><p>An <a href="#Event">event</a> which fires when a new <a href="#DebugSession">debug session</a> has been started.</p>
</div>
</div>



<a name="debug.onDidTerminateDebugSession"></a><span class="ts" id=1753 data-target="#details-1753" data-toggle="collapse"><span class="ident">onDidTerminateDebugSession</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#DebugSession">DebugSession</a>&gt;</span>
<div class="details collapse" id="details-1753">
<div class="comment"><p>An <a href="#Event">event</a> which fires when a <a href="#DebugSession">debug session</a> has terminated.</p>
</div>
</div>

#### Functions



<a name="debug.registerDebugConfigurationProvider"></a><span class="ts" id=1755 data-target="#details-1755" data-toggle="collapse"><span class="ident">registerDebugConfigurationProvider</span><span>(</span><span class="ident">debugType</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#DebugConfigurationProvider">DebugConfigurationProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1755">
<div class="comment"><p>Register a <a href="#DebugConfigurationProvider">debug configuration provider</a> for a specifc debug type.
More than one provider can be registered for the same type.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="debugType"></a><span class="ts" id=1756 data-target="#details-1756" data-toggle="collapse"><span class="ident">debugType</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"></div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1757 data-target="#details-1757" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#DebugConfigurationProvider">DebugConfigurationProvider</a></span></td><td><div class="comment"><p>The <a href="#DebugConfigurationProvider">debug configuration provider</a> to register.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="debug.startDebugging"></a><span class="ts" id=1746 data-target="#details-1746" data-toggle="collapse"><span class="ident">startDebugging</span><span>(</span><span class="ident">folder</span><span>: </span><a class="type-ref" href="#WorkspaceFolder">WorkspaceFolder</a> &#124; <a class="type-intrinsic">undefined</a>, <span class="ident">nameOrConfiguration</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#DebugConfiguration">DebugConfiguration</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">boolean</a>&gt;</span>
<div class="details collapse" id="details-1746">
<div class="comment"><p>Start debugging by using either a named launch or named compound configuration,
or by directly passing a <a href="#DebugConfiguration">DebugConfiguration</a>.
The named configurations are looked up in &#39;.vscode/launch.json&#39; found in the given folder.
Before debugging starts, all unsaved files are saved and the launch configurations are brought up-to-date.
Folder specific variables used in the configuration (e.g. &#39;${workspaceFolder}&#39;) are resolved against the given folder.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="folder"></a><span class="ts" id=1747 data-target="#details-1747" data-toggle="collapse"><span class="ident">folder</span><span>: </span><a class="type-ref" href="#WorkspaceFolder">WorkspaceFolder</a> &#124; <a class="type-intrinsic">undefined</a></span></td><td><div class="comment"><p>The <a href="#WorkspaceFolder">workspace folder</a> for looking up named configurations and resolving variables or <code>undefined</code> for a non-folder setup.</p>
</div></td></tr>
<tr><td><a name="nameOrConfiguration"></a><span class="ts" id=1748 data-target="#details-1748" data-toggle="collapse"><span class="ident">nameOrConfiguration</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#DebugConfiguration">DebugConfiguration</a></span></td><td><div class="comment"><p>Either the name of a debug or compound configuration or a <a href="#DebugConfiguration">DebugConfiguration</a> object.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">boolean</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves when debugging could be successfully started.</p>
</div></td></tr>
</table>
</div>
</div>

## env



<div class="comment"><p>Namespace describing the environment the editor runs in.</p>
</div>

#### Variables



<a name="env.appName"></a><span class="ts" id=1413 data-target="#details-1413" data-toggle="collapse"><span class="ident">appName</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1413">
<div class="comment"><p>The application name of the editor, like &#39;VS Code&#39;.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="env.appRoot"></a><span class="ts" id=1414 data-target="#details-1414" data-toggle="collapse"><span class="ident">appRoot</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1414">
<div class="comment"><p>The application root folder from which the editor is running.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="env.language"></a><span class="ts" id=1415 data-target="#details-1415" data-toggle="collapse"><span class="ident">language</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1415">
<div class="comment"><p>Represents the preferred user-language, like <code>de-CH</code>, <code>fr</code>, or <code>en-US</code>.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="env.machineId"></a><span class="ts" id=1416 data-target="#details-1416" data-toggle="collapse"><span class="ident">machineId</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1416">
<div class="comment"><p>A unique identifier for the computer.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="env.sessionId"></a><span class="ts" id=1417 data-target="#details-1417" data-toggle="collapse"><span class="ident">sessionId</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1417">
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



<a name="extensions.all"></a><span class="ts" id=1765 data-target="#details-1765" data-toggle="collapse"><span class="ident">all</span><span>: </span><a class="type-ref" href="#Extension">Extension</a>&lt;<a class="type-intrinsic">any</a>&gt;[]</span>
<div class="details collapse" id="details-1765">
<div class="comment"><p>All extensions currently known to the system.</p>
</div>
</div>

#### Functions



<a name="extensions.getExtension"></a><span class="ts" id=1760 data-target="#details-1760" data-toggle="collapse"><span class="ident">getExtension</span><span>(</span><span class="ident">extensionId</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#Extension">Extension</a>&lt;<a class="type-intrinsic">any</a>&gt; &#124; <a class="type-intrinsic">undefined</a></span>
<div class="details collapse" id="details-1760">
<div class="comment"><p>Get an extension by its full identifier in the form of: <code>publisher.name</code>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="extensionId"></a><span class="ts" id=1761 data-target="#details-1761" data-toggle="collapse"><span class="ident">extensionId</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>An extension identifier.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Extension">Extension</a>&lt;<a class="type-intrinsic">any</a>&gt; &#124; <a class="type-intrinsic">undefined</a></span></td><td><div class="comment"><p>An extension or <code>undefined</code>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="extensions.getExtension"></a><span class="ts" id=1762 data-target="#details-1762" data-toggle="collapse"><span class="ident">getExtension</span><span>&lt;</span>T<span>&gt;</span><span>(</span><span class="ident">extensionId</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#Extension">Extension</a>&lt;<a class="type-intrinsic">T</a>&gt; &#124; <a class="type-intrinsic">undefined</a></span>
<div class="details collapse" id="details-1762">
<div class="comment"><p>Get an extension its full identifier in the form of: <code>publisher.name</code>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="extensionId"></a><span class="ts" id=1764 data-target="#details-1764" data-toggle="collapse"><span class="ident">extensionId</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>An extension identifier.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Extension">Extension</a>&lt;<a class="type-intrinsic">T</a>&gt; &#124; <a class="type-intrinsic">undefined</a></span></td><td><div class="comment"><p>An extension or <code>undefined</code>.</p>
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



<a name="languages.createDiagnosticCollection"></a><span class="ts" id=1656 data-target="#details-1656" data-toggle="collapse"><span class="ident">createDiagnosticCollection</span><span>(</span><span class="ident">name</span><span>?</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#DiagnosticCollection">DiagnosticCollection</a></span>
<div class="details collapse" id="details-1656">
<div class="comment"><p>Create a diagnostics collection.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="name"></a><span class="ts" id=1657 data-target="#details-1657" data-toggle="collapse"><span class="ident">name</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The <a href="#DiagnosticCollection.name">name</a> of the collection.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#DiagnosticCollection">DiagnosticCollection</a></span></td><td><div class="comment"><p>A new diagnostic collection.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.getLanguages"></a><span class="ts" id=1650 data-target="#details-1650" data-toggle="collapse"><span class="ident">getLanguages</span><span>(</span><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a>[]&gt;</span>
<div class="details collapse" id="details-1650">
<div class="comment"><p>Return the identifiers of all known languages.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a>[]&gt;</span></td><td><div class="comment"><p>Promise resolving to an array of identifier strings.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.match"></a><span class="ts" id=1652 data-target="#details-1652" data-toggle="collapse"><span class="ident">match</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a><span>)</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-1652">
<div class="comment"><p>Compute the match between a document <a href="#DocumentSelector">selector</a> and a document. Values
greater than zero mean the selector matches the document.</p>
<p>A match is computed according to these rules:</p>
<ol>
<li>When <a href="#DocumentSelector"><code>DocumentSelector</code></a> is an array, compute the match for each contained <code>DocumentFilter</code> or language identifier and take the maximum value.</li>
<li>A string will be desugared to become the <code>language</code>-part of a <a href="#DocumentFilter"><code>DocumentFilter</code></a>, so <code>&quot;fooLang&quot;</code> is like <code>{ language: &quot;fooLang&quot; }</code>.</li>
<li>A <a href="#DocumentFilter"><code>DocumentFilter</code></a> will be matched against the document by comparing its parts with the document. The following rules apply:<ol>
<li>When the <code>DocumentFilter</code> is empty (<code>{}</code>) the result is <code>0</code></li>
<li>When <code>scheme</code>, <code>language</code>, or <code>pattern</code> are defined but one doesn’t match, the result is <code>0</code></li>
<li>Matching against <code>*</code> gives a score of <code>5</code>, matching via equality or via a glob-pattern gives a score of <code>10</code></li>
<li>The result is the maximun value of each match</li>
</ol>
</li>
</ol>
<p>Samples:</p>

<pre><code class="lang-js"><span class="hljs-comment">// default document from disk (file-scheme)</span>
doc.uri; <span class="hljs-comment">//'file:///my/file.js'</span>
doc.languageId; <span class="hljs-comment">// 'javascript'</span>
match(<span class="hljs-string">'javascript'</span>, doc); <span class="hljs-comment">// 10;</span>
match({<span class="hljs-attr">language</span>: <span class="hljs-string">'javascript'</span>}, doc); <span class="hljs-comment">// 10;</span>
match({<span class="hljs-attr">language</span>: <span class="hljs-string">'javascript'</span>, <span class="hljs-attr">scheme</span>: <span class="hljs-string">'file'</span>}, doc); <span class="hljs-comment">// 10;</span>
match(<span class="hljs-string">'*'</span>, doc); <span class="hljs-comment">// 5</span>
match(<span class="hljs-string">'fooLang'</span>, doc); <span class="hljs-comment">// 0</span>
match([<span class="hljs-string">'fooLang'</span>, <span class="hljs-string">'*'</span>], doc); <span class="hljs-comment">// 5</span>

<span class="hljs-comment">// virtual document, e.g. from git-index</span>
doc.uri; <span class="hljs-comment">// 'git:/my/file.js'</span>
doc.languageId; <span class="hljs-comment">// 'javascript'</span>
match(<span class="hljs-string">'javascript'</span>, doc); <span class="hljs-comment">// 10;</span>
match({<span class="hljs-attr">language</span>: <span class="hljs-string">'javascript'</span>, <span class="hljs-attr">scheme</span>: <span class="hljs-string">'git'</span>}, doc); <span class="hljs-comment">// 10;</span>
match(<span class="hljs-string">'*'</span>, doc); <span class="hljs-comment">// 5</span>
</code></pre>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1653 data-target="#details-1653" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A document selector.</p>
</div></td></tr>
<tr><td><a name="document"></a><span class="ts" id=1654 data-target="#details-1654" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>A text document.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>A number <code>&gt;0</code> when the selector matches and <code>0</code> when the selector does not match.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerCodeActionsProvider"></a><span class="ts" id=1664 data-target="#details-1664" data-toggle="collapse"><span class="ident">registerCodeActionsProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#CodeActionProvider">CodeActionProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1664">
<div class="comment"><p>Register a code action provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1665 data-target="#details-1665" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1666 data-target="#details-1666" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#CodeActionProvider">CodeActionProvider</a></span></td><td><div class="comment"><p>A code action provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerCodeLensProvider"></a><span class="ts" id=1668 data-target="#details-1668" data-toggle="collapse"><span class="ident">registerCodeLensProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#CodeLensProvider">CodeLensProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1668">
<div class="comment"><p>Register a code lens provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1669 data-target="#details-1669" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1670 data-target="#details-1670" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#CodeLensProvider">CodeLensProvider</a></span></td><td><div class="comment"><p>A code lens provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerColorProvider"></a><span class="ts" id=1730 data-target="#details-1730" data-toggle="collapse"><span class="ident">registerColorProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#DocumentColorProvider">DocumentColorProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1730">
<div class="comment"><p>Register a color provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1731 data-target="#details-1731" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1732 data-target="#details-1732" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#DocumentColorProvider">DocumentColorProvider</a></span></td><td><div class="comment"><p>A color provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerCompletionItemProvider"></a><span class="ts" id=1659 data-target="#details-1659" data-toggle="collapse"><span class="ident">registerCompletionItemProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#CompletionItemProvider">CompletionItemProvider</a>, <span>...</span><span class="ident">triggerCharacters</span><span>: </span><a class="type-intrinsic">string</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1659">
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
<tr><td><a name="selector"></a><span class="ts" id=1660 data-target="#details-1660" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1661 data-target="#details-1661" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#CompletionItemProvider">CompletionItemProvider</a></span></td><td><div class="comment"><p>A completion provider.</p>
</div></td></tr>
<tr><td><a name="triggerCharacters"></a><span class="ts" id=1662 data-target="#details-1662" data-toggle="collapse"><span>...</span><span class="ident">triggerCharacters</span><span>: </span><a class="type-intrinsic">string</a>[]</span></td><td><div class="comment"><p>Trigger completion when the user types one of the characters, like <code>.</code> or <code>:</code>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerDefinitionProvider"></a><span class="ts" id=1672 data-target="#details-1672" data-toggle="collapse"><span class="ident">registerDefinitionProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#DefinitionProvider">DefinitionProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1672">
<div class="comment"><p>Register a definition provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1673 data-target="#details-1673" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1674 data-target="#details-1674" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#DefinitionProvider">DefinitionProvider</a></span></td><td><div class="comment"><p>A definition provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerDocumentFormattingEditProvider"></a><span class="ts" id=1707 data-target="#details-1707" data-toggle="collapse"><span class="ident">registerDocumentFormattingEditProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#DocumentFormattingEditProvider">DocumentFormattingEditProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1707">
<div class="comment"><p>Register a formatting provider for a document.</p>
<p>Multiple providers can be registered for a language. In that case providers are sorted
by their <a href="#languages.match">score</a> and the best-matching provider is used. Failure
of the selected provider will cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1708 data-target="#details-1708" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1709 data-target="#details-1709" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#DocumentFormattingEditProvider">DocumentFormattingEditProvider</a></span></td><td><div class="comment"><p>A document formatting edit provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerDocumentHighlightProvider"></a><span class="ts" id=1688 data-target="#details-1688" data-toggle="collapse"><span class="ident">registerDocumentHighlightProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#DocumentHighlightProvider">DocumentHighlightProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1688">
<div class="comment"><p>Register a document highlight provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are sorted
by their <a href="#languages.match">score</a> and groups sequentially asked for document highlights.
The process stops when a provider returns a <code>non-falsy</code> or <code>non-failure</code> result.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1689 data-target="#details-1689" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1690 data-target="#details-1690" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#DocumentHighlightProvider">DocumentHighlightProvider</a></span></td><td><div class="comment"><p>A document highlight provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerDocumentLinkProvider"></a><span class="ts" id=1726 data-target="#details-1726" data-toggle="collapse"><span class="ident">registerDocumentLinkProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#DocumentLinkProvider">DocumentLinkProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1726">
<div class="comment"><p>Register a document link provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1727 data-target="#details-1727" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1728 data-target="#details-1728" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#DocumentLinkProvider">DocumentLinkProvider</a></span></td><td><div class="comment"><p>A document link provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerDocumentRangeFormattingEditProvider"></a><span class="ts" id=1711 data-target="#details-1711" data-toggle="collapse"><span class="ident">registerDocumentRangeFormattingEditProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#DocumentRangeFormattingEditProvider">DocumentRangeFormattingEditProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1711">
<div class="comment"><p>Register a formatting provider for a document range.</p>
<p><em>Note:</em> A document range provider is also a <a href="#DocumentFormattingEditProvider">document formatter</a>
which means there is no need to <a href="registerDocumentFormattingEditProvider">register</a> a document
formatter when also registering a range provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are sorted
by their <a href="#languages.match">score</a> and the best-matching provider is used. Failure
of the selected provider will cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1712 data-target="#details-1712" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1713 data-target="#details-1713" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#DocumentRangeFormattingEditProvider">DocumentRangeFormattingEditProvider</a></span></td><td><div class="comment"><p>A document range formatting edit provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerDocumentSymbolProvider"></a><span class="ts" id=1692 data-target="#details-1692" data-toggle="collapse"><span class="ident">registerDocumentSymbolProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#DocumentSymbolProvider">DocumentSymbolProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1692">
<div class="comment"><p>Register a document symbol provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1693 data-target="#details-1693" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1694 data-target="#details-1694" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#DocumentSymbolProvider">DocumentSymbolProvider</a></span></td><td><div class="comment"><p>A document symbol provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerHoverProvider"></a><span class="ts" id=1684 data-target="#details-1684" data-toggle="collapse"><span class="ident">registerHoverProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#HoverProvider">HoverProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1684">
<div class="comment"><p>Register a hover provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1685 data-target="#details-1685" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1686 data-target="#details-1686" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#HoverProvider">HoverProvider</a></span></td><td><div class="comment"><p>A hover provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerImplementationProvider"></a><span class="ts" id=1676 data-target="#details-1676" data-toggle="collapse"><span class="ident">registerImplementationProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#ImplementationProvider">ImplementationProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1676">
<div class="comment"><p>Register an implementation provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1677 data-target="#details-1677" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1678 data-target="#details-1678" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#ImplementationProvider">ImplementationProvider</a></span></td><td><div class="comment"><p>An implementation provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerOnTypeFormattingEditProvider"></a><span class="ts" id=1715 data-target="#details-1715" data-toggle="collapse"><span class="ident">registerOnTypeFormattingEditProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#OnTypeFormattingEditProvider">OnTypeFormattingEditProvider</a>, <span class="ident">firstTriggerCharacter</span><span>: </span><a class="type-intrinsic">string</a>, <span>...</span><span class="ident">moreTriggerCharacter</span><span>: </span><a class="type-intrinsic">string</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1715">
<div class="comment"><p>Register a formatting provider that works on type. The provider is active when the user enables the setting <code>editor.formatOnType</code>.</p>
<p>Multiple providers can be registered for a language. In that case providers are sorted
by their <a href="#languages.match">score</a> and the best-matching provider is used. Failure
of the selected provider will cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1716 data-target="#details-1716" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1717 data-target="#details-1717" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#OnTypeFormattingEditProvider">OnTypeFormattingEditProvider</a></span></td><td><div class="comment"><p>An on type formatting edit provider.</p>
</div></td></tr>
<tr><td><a name="firstTriggerCharacter"></a><span class="ts" id=1718 data-target="#details-1718" data-toggle="collapse"><span class="ident">firstTriggerCharacter</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A character on which formatting should be triggered, like <code>}</code>.</p>
</div></td></tr>
<tr><td><a name="moreTriggerCharacter"></a><span class="ts" id=1719 data-target="#details-1719" data-toggle="collapse"><span>...</span><span class="ident">moreTriggerCharacter</span><span>: </span><a class="type-intrinsic">string</a>[]</span></td><td><div class="comment"><p>More trigger characters.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerReferenceProvider"></a><span class="ts" id=1699 data-target="#details-1699" data-toggle="collapse"><span class="ident">registerReferenceProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#ReferenceProvider">ReferenceProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1699">
<div class="comment"><p>Register a reference provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1700 data-target="#details-1700" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1701 data-target="#details-1701" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#ReferenceProvider">ReferenceProvider</a></span></td><td><div class="comment"><p>A reference provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerRenameProvider"></a><span class="ts" id=1703 data-target="#details-1703" data-toggle="collapse"><span class="ident">registerRenameProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#RenameProvider">RenameProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1703">
<div class="comment"><p>Register a reference provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are sorted
by their <a href="#languages.match">score</a> and the best-matching provider is used. Failure
of the selected provider will cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1704 data-target="#details-1704" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1705 data-target="#details-1705" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#RenameProvider">RenameProvider</a></span></td><td><div class="comment"><p>A rename provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerSignatureHelpProvider"></a><span class="ts" id=1721 data-target="#details-1721" data-toggle="collapse"><span class="ident">registerSignatureHelpProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#SignatureHelpProvider">SignatureHelpProvider</a>, <span>...</span><span class="ident">triggerCharacters</span><span>: </span><a class="type-intrinsic">string</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1721">
<div class="comment"><p>Register a signature help provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are sorted
by their <a href="#languages.match">score</a> and called sequentially until a provider returns a
valid result.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1722 data-target="#details-1722" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1723 data-target="#details-1723" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#SignatureHelpProvider">SignatureHelpProvider</a></span></td><td><div class="comment"><p>A signature help provider.</p>
</div></td></tr>
<tr><td><a name="triggerCharacters"></a><span class="ts" id=1724 data-target="#details-1724" data-toggle="collapse"><span>...</span><span class="ident">triggerCharacters</span><span>: </span><a class="type-intrinsic">string</a>[]</span></td><td><div class="comment"><p>Trigger signature help when the user types one of the characters, like <code>,</code> or <code>(</code>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerTypeDefinitionProvider"></a><span class="ts" id=1680 data-target="#details-1680" data-toggle="collapse"><span class="ident">registerTypeDefinitionProvider</span><span>(</span><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#TypeDefinitionProvider">TypeDefinitionProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1680">
<div class="comment"><p>Register a type definition provider.</p>
<p>Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="selector"></a><span class="ts" id=1681 data-target="#details-1681" data-toggle="collapse"><span class="ident">selector</span><span>: </span><a class="type-ref" href="#DocumentSelector">DocumentSelector</a></span></td><td><div class="comment"><p>A selector that defines the documents this provider is applicable to.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1682 data-target="#details-1682" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#TypeDefinitionProvider">TypeDefinitionProvider</a></span></td><td><div class="comment"><p>A type definition provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.registerWorkspaceSymbolProvider"></a><span class="ts" id=1696 data-target="#details-1696" data-toggle="collapse"><span class="ident">registerWorkspaceSymbolProvider</span><span>(</span><span class="ident">provider</span><span>: </span><a class="type-ref" href="#WorkspaceSymbolProvider">WorkspaceSymbolProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1696">
<div class="comment"><p>Register a workspace symbol provider.</p>
<p>Multiple providers can be registered. In that case providers are asked in parallel and
the results are merged. A failing provider (rejected promise or exception) will not cause
a failure of the whole operation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="provider"></a><span class="ts" id=1697 data-target="#details-1697" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#WorkspaceSymbolProvider">WorkspaceSymbolProvider</a></span></td><td><div class="comment"><p>A workspace symbol provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="languages.setLanguageConfiguration"></a><span class="ts" id=1734 data-target="#details-1734" data-toggle="collapse"><span class="ident">setLanguageConfiguration</span><span>(</span><span class="ident">language</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">configuration</span><span>: </span><a class="type-ref" href="#LanguageConfiguration">LanguageConfiguration</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1734">
<div class="comment"><p>Set a <a href="#LanguageConfiguration">language configuration</a> for a language.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="language"></a><span class="ts" id=1735 data-target="#details-1735" data-toggle="collapse"><span class="ident">language</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A language identifier like <code>typescript</code>.</p>
</div></td></tr>
<tr><td><a name="configuration"></a><span class="ts" id=1736 data-target="#details-1736" data-toggle="collapse"><span class="ident">configuration</span><span>: </span><a class="type-ref" href="#LanguageConfiguration">LanguageConfiguration</a></span></td><td><div class="comment"><p>Language configuration.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unsets this configuration.</p>
</div></td></tr>
</table>
</div>
</div>

## scm



<div class="comment"></div>

#### Variables



<a name="scm.inputBox"></a><span class="ts" id=1738 data-target="#details-1738" data-toggle="collapse"><span class="ident">inputBox</span><span>: </span><a class="type-ref" href="#SourceControlInputBox">SourceControlInputBox</a></span>
<div class="details collapse" id="details-1738">
<div class="comment"><p><del>The <a href="#SourceControlInputBox">input box</a> for the last source control
created by the extension.</del></p>
<ul>
<li><em>deprecated</em> - Use SourceControl.inputBox instead</li>
</ul>
</div>
</div>

#### Functions



<a name="scm.createSourceControl"></a><span class="ts" id=1740 data-target="#details-1740" data-toggle="collapse"><span class="ident">createSourceControl</span><span>(</span><span class="ident">id</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">rootUri</span><span>?</span><span>: </span><a class="type-ref" href="#Uri">Uri</a><span>)</span><span>: </span><a class="type-ref" href="#SourceControl">SourceControl</a></span>
<div class="details collapse" id="details-1740">
<div class="comment"><p>Creates a new <a href="#SourceControl">source control</a> instance.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="id"></a><span class="ts" id=1741 data-target="#details-1741" data-toggle="collapse"><span class="ident">id</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>An <code>id</code> for the source control. Something short, eg: <code>git</code>.</p>
</div></td></tr>
<tr><td><a name="label"></a><span class="ts" id=1742 data-target="#details-1742" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A human-readable string for the source control. Eg: <code>Git</code>.</p>
</div></td></tr>
<tr><td><a name="rootUri"></a><span class="ts" id=1743 data-target="#details-1743" data-toggle="collapse"><span class="ident">rootUri</span><span>?</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>An optional Uri of the root of the source control. Eg: <code>Uri.parse(workspaceRoot)</code>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#SourceControl">SourceControl</a></span></td><td><div class="comment"><p>An instance of <a href="#SourceControl">source control</a>.</p>
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



<a name="window.activeTextEditor"></a><span class="ts" id=1446 data-target="#details-1446" data-toggle="collapse"><span class="ident">activeTextEditor</span><span>: </span><a class="type-ref" href="#TextEditor">TextEditor</a> &#124; <a class="type-intrinsic">undefined</a></span>
<div class="details collapse" id="details-1446">
<div class="comment"><p>The currently active editor or <code>undefined</code>. The active editor is the one
that currently has focus or, when none has focus, the one that has changed
input most recently.</p>
</div>
</div>



<a name="window.state"></a><span class="ts" id=1454 data-target="#details-1454" data-toggle="collapse"><span class="ident">state</span><span>: </span><a class="type-ref" href="#WindowState">WindowState</a></span>
<div class="details collapse" id="details-1454">
<div class="comment"><p>Represents the current window&#39;s state.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="window.visibleTextEditors"></a><span class="ts" id=1447 data-target="#details-1447" data-toggle="collapse"><span class="ident">visibleTextEditors</span><span>: </span><a class="type-ref" href="#TextEditor">TextEditor</a>[]</span>
<div class="details collapse" id="details-1447">
<div class="comment"><p>The currently visible editors or an empty array.</p>
</div>
</div>

#### Events



<a name="window.onDidChangeActiveTextEditor"></a><span class="ts" id=1448 data-target="#details-1448" data-toggle="collapse"><span class="ident">onDidChangeActiveTextEditor</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#TextEditor">TextEditor</a>&gt;</span>
<div class="details collapse" id="details-1448">
<div class="comment"><p>An <a href="#Event">event</a> which fires when the <a href="#window.activeTextEditor">active editor</a>
has changed. <em>Note</em> that the event also fires when the active editor changes
to <code>undefined</code>.</p>
</div>
</div>



<a name="window.onDidChangeTextEditorOptions"></a><span class="ts" id=1451 data-target="#details-1451" data-toggle="collapse"><span class="ident">onDidChangeTextEditorOptions</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#TextEditorOptionsChangeEvent">TextEditorOptionsChangeEvent</a>&gt;</span>
<div class="details collapse" id="details-1451">
<div class="comment"><p>An <a href="#Event">event</a> which fires when the options of an editor have changed.</p>
</div>
</div>



<a name="window.onDidChangeTextEditorSelection"></a><span class="ts" id=1450 data-target="#details-1450" data-toggle="collapse"><span class="ident">onDidChangeTextEditorSelection</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#TextEditorSelectionChangeEvent">TextEditorSelectionChangeEvent</a>&gt;</span>
<div class="details collapse" id="details-1450">
<div class="comment"><p>An <a href="#Event">event</a> which fires when the selection in an editor has changed.</p>
</div>
</div>



<a name="window.onDidChangeTextEditorViewColumn"></a><span class="ts" id=1452 data-target="#details-1452" data-toggle="collapse"><span class="ident">onDidChangeTextEditorViewColumn</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#TextEditorViewColumnChangeEvent">TextEditorViewColumnChangeEvent</a>&gt;</span>
<div class="details collapse" id="details-1452">
<div class="comment"><p>An <a href="#Event">event</a> which fires when the view column of an editor has changed.</p>
</div>
</div>



<a name="window.onDidChangeVisibleTextEditors"></a><span class="ts" id=1449 data-target="#details-1449" data-toggle="collapse"><span class="ident">onDidChangeVisibleTextEditors</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#TextEditor">TextEditor</a>[]&gt;</span>
<div class="details collapse" id="details-1449">
<div class="comment"><p>An <a href="#Event">event</a> which fires when the array of <a href="#window.visibleTextEditors">visible editors</a>
has changed.</p>
</div>
</div>



<a name="window.onDidChangeWindowState"></a><span class="ts" id=1455 data-target="#details-1455" data-toggle="collapse"><span class="ident">onDidChangeWindowState</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#WindowState">WindowState</a>&gt;</span>
<div class="details collapse" id="details-1455">
<div class="comment"><p>An <a href="#Event">event</a> which fires when the focus state of the current window
changes. The value of the event represents whether the window is focused.</p>
</div>
</div>



<a name="window.onDidCloseTerminal"></a><span class="ts" id=1453 data-target="#details-1453" data-toggle="collapse"><span class="ident">onDidCloseTerminal</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#Terminal">Terminal</a>&gt;</span>
<div class="details collapse" id="details-1453">
<div class="comment"><p>An <a href="#Event">event</a> which fires when a terminal is disposed.</p>
</div>
</div>

#### Functions



<a name="window.createOutputChannel"></a><span class="ts" id=1545 data-target="#details-1545" data-toggle="collapse"><span class="ident">createOutputChannel</span><span>(</span><span class="ident">name</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#OutputChannel">OutputChannel</a></span>
<div class="details collapse" id="details-1545">
<div class="comment"><p>Create a new <a href="#OutputChannel">output channel</a> with the given name.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="name"></a><span class="ts" id=1546 data-target="#details-1546" data-toggle="collapse"><span class="ident">name</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>Human-readable string which will be used to represent the channel in the UI.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#OutputChannel">OutputChannel</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="window.createStatusBarItem"></a><span class="ts" id=1574 data-target="#details-1574" data-toggle="collapse"><span class="ident">createStatusBarItem</span><span>(</span><span class="ident">alignment</span><span>?</span><span>: </span><a class="type-ref" href="#StatusBarAlignment">StatusBarAlignment</a>, <span class="ident">priority</span><span>?</span><span>: </span><a class="type-intrinsic">number</a><span>)</span><span>: </span><a class="type-ref" href="#StatusBarItem">StatusBarItem</a></span>
<div class="details collapse" id="details-1574">
<div class="comment"><p>Creates a status bar <a href="#StatusBarItem">item</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="alignment"></a><span class="ts" id=1575 data-target="#details-1575" data-toggle="collapse"><span class="ident">alignment</span><span>?</span><span>: </span><a class="type-ref" href="#StatusBarAlignment">StatusBarAlignment</a></span></td><td><div class="comment"><p>The alignment of the item.</p>
</div></td></tr>
<tr><td><a name="priority"></a><span class="ts" id=1576 data-target="#details-1576" data-toggle="collapse"><span class="ident">priority</span><span>?</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>The priority of the item. Higher values mean the item should be shown more to the left.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#StatusBarItem">StatusBarItem</a></span></td><td><div class="comment"><p>A new status bar item.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.createTerminal"></a><span class="ts" id=1578 data-target="#details-1578" data-toggle="collapse"><span class="ident">createTerminal</span><span>(</span><span class="ident">name</span><span>?</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">shellPath</span><span>?</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">shellArgs</span><span>?</span><span>: </span><a class="type-intrinsic">string</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Terminal">Terminal</a></span>
<div class="details collapse" id="details-1578">
<div class="comment"><p>Creates a <a href="#Terminal">Terminal</a>. The cwd of the terminal will be the workspace directory
if it exists, regardless of whether an explicit customStartPath setting exists.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="name"></a><span class="ts" id=1579 data-target="#details-1579" data-toggle="collapse"><span class="ident">name</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>Optional human-readable string which will be used to represent the terminal in the UI.</p>
</div></td></tr>
<tr><td><a name="shellPath"></a><span class="ts" id=1580 data-target="#details-1580" data-toggle="collapse"><span class="ident">shellPath</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>Optional path to a custom shell executable to be used in the terminal.</p>
</div></td></tr>
<tr><td><a name="shellArgs"></a><span class="ts" id=1581 data-target="#details-1581" data-toggle="collapse"><span class="ident">shellArgs</span><span>?</span><span>: </span><a class="type-intrinsic">string</a>[]</span></td><td><div class="comment"><p>Optional args for the custom shell executable, this does not work on Windows (see #8429)</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Terminal">Terminal</a></span></td><td><div class="comment"><p>A new Terminal.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.createTerminal"></a><span class="ts" id=1582 data-target="#details-1582" data-toggle="collapse"><span class="ident">createTerminal</span><span>(</span><span class="ident">options</span><span>: </span><a class="type-ref" href="#TerminalOptions">TerminalOptions</a><span>)</span><span>: </span><a class="type-ref" href="#Terminal">Terminal</a></span>
<div class="details collapse" id="details-1582">
<div class="comment"><p>Creates a <a href="#Terminal">Terminal</a>. The cwd of the terminal will be the workspace directory
if it exists, regardless of whether an explicit customStartPath setting exists.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="options"></a><span class="ts" id=1583 data-target="#details-1583" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#TerminalOptions">TerminalOptions</a></span></td><td><div class="comment"><p>A TerminalOptions object describing the characteristics of the new terminal.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Terminal">Terminal</a></span></td><td><div class="comment"><p>A new Terminal.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.createTextEditorDecorationType"></a><span class="ts" id=1468 data-target="#details-1468" data-toggle="collapse"><span class="ident">createTextEditorDecorationType</span><span>(</span><span class="ident">options</span><span>: </span><a class="type-ref" href="#DecorationRenderOptions">DecorationRenderOptions</a><span>)</span><span>: </span><a class="type-ref" href="#TextEditorDecorationType">TextEditorDecorationType</a></span>
<div class="details collapse" id="details-1468">
<div class="comment"><p>Create a TextEditorDecorationType that can be used to add decorations to text editors.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="options"></a><span class="ts" id=1469 data-target="#details-1469" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#DecorationRenderOptions">DecorationRenderOptions</a></span></td><td><div class="comment"><p>Rendering options for the decoration type.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TextEditorDecorationType">TextEditorDecorationType</a></span></td><td><div class="comment"><p>A new decoration type instance.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.registerTreeDataProvider"></a><span class="ts" id=1585 data-target="#details-1585" data-toggle="collapse"><span class="ident">registerTreeDataProvider</span><span>&lt;</span>T<span>&gt;</span><span>(</span><span class="ident">viewId</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">treeDataProvider</span><span>: </span><a class="type-ref" href="#TreeDataProvider">TreeDataProvider</a>&lt;<a class="type-intrinsic">T</a>&gt;<span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1585">
<div class="comment"><p>Register a <a href="#TreeDataProvider">TreeDataProvider</a> for the view contributed using the extension point <code>views</code>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="viewId"></a><span class="ts" id=1587 data-target="#details-1587" data-toggle="collapse"><span class="ident">viewId</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>Id of the view contributed using the extension point <code>views</code>.</p>
</div></td></tr>
<tr><td><a name="treeDataProvider"></a><span class="ts" id=1588 data-target="#details-1588" data-toggle="collapse"><span class="ident">treeDataProvider</span><span>: </span><a class="type-ref" href="#TreeDataProvider">TreeDataProvider</a>&lt;<a class="type-intrinsic">T</a>&gt;</span></td><td><div class="comment"><p>A <a href="#TreeDataProvider">TreeDataProvider</a> that provides tree data for the view</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="window.setStatusBarMessage"></a><span class="ts" id=1548 data-target="#details-1548" data-toggle="collapse"><span class="ident">setStatusBarMessage</span><span>(</span><span class="ident">text</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">hideAfterTimeout</span><span>: </span><a class="type-intrinsic">number</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1548">
<div class="comment"><p>Set a message to the status bar. This is a short hand for the more powerful
status bar <a href="#window.createStatusBarItem">items</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="text"></a><span class="ts" id=1549 data-target="#details-1549" data-toggle="collapse"><span class="ident">text</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The message to show, supports icon substitution as in status bar <a href="#StatusBarItem.text">items</a>.</p>
</div></td></tr>
<tr><td><a name="hideAfterTimeout"></a><span class="ts" id=1550 data-target="#details-1550" data-toggle="collapse"><span class="ident">hideAfterTimeout</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>Timeout in milliseconds after which the message will be disposed.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A disposable which hides the status bar message.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.setStatusBarMessage"></a><span class="ts" id=1551 data-target="#details-1551" data-toggle="collapse"><span class="ident">setStatusBarMessage</span><span>(</span><span class="ident">text</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">hideWhenDone</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">any</a>&gt;<span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1551">
<div class="comment"><p>Set a message to the status bar. This is a short hand for the more powerful
status bar <a href="#window.createStatusBarItem">items</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="text"></a><span class="ts" id=1552 data-target="#details-1552" data-toggle="collapse"><span class="ident">text</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The message to show, supports icon substitution as in status bar <a href="#StatusBarItem.text">items</a>.</p>
</div></td></tr>
<tr><td><a name="hideWhenDone"></a><span class="ts" id=1553 data-target="#details-1553" data-toggle="collapse"><span class="ident">hideWhenDone</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">any</a>&gt;</span></td><td><div class="comment"><p>Thenable on which completion (resolve or reject) the message will be disposed.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A disposable which hides the status bar message.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.setStatusBarMessage"></a><span class="ts" id=1554 data-target="#details-1554" data-toggle="collapse"><span class="ident">setStatusBarMessage</span><span>(</span><span class="ident">text</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1554">
<div class="comment"><p>Set a message to the status bar. This is a short hand for the more powerful
status bar <a href="#window.createStatusBarItem">items</a>.</p>
<p><em>Note</em> that status bar messages stack and that they must be disposed when no
longer used.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="text"></a><span class="ts" id=1555 data-target="#details-1555" data-toggle="collapse"><span class="ident">text</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The message to show, supports icon substitution as in status bar <a href="#StatusBarItem.text">items</a>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A disposable which hides the status bar message.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showErrorMessage"></a><span class="ts" id=1505 data-target="#details-1505" data-toggle="collapse"><span class="ident">showErrorMessage</span><span>(</span><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a>, <span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">string</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span>
<div class="details collapse" id="details-1505">
<div class="comment"><p>Show an error message.</p>
<ul>
<li><em>see</em> - <a href="#window.showInformationMessage">showInformationMessage</a></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="message"></a><span class="ts" id=1506 data-target="#details-1506" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The message to show.</p>
</div></td></tr>
<tr><td><a name="items"></a><span class="ts" id=1507 data-target="#details-1507" data-toggle="collapse"><span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">string</a>[]</span></td><td><div class="comment"><p>A set of items that will be rendered as actions in the message.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves to the selected item or <code>undefined</code> when being dismissed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showErrorMessage"></a><span class="ts" id=1508 data-target="#details-1508" data-toggle="collapse"><span class="ident">showErrorMessage</span><span>(</span><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">options</span><span>: </span><a class="type-ref" href="#MessageOptions">MessageOptions</a>, <span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">string</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span>
<div class="details collapse" id="details-1508">
<div class="comment"><p>Show an error message.</p>
<ul>
<li><em>see</em> - <a href="#window.showInformationMessage">showInformationMessage</a></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="message"></a><span class="ts" id=1509 data-target="#details-1509" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The message to show.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=1510 data-target="#details-1510" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#MessageOptions">MessageOptions</a></span></td><td><div class="comment"><p>Configures the behaviour of the message.</p>
</div></td></tr>
<tr><td><a name="items"></a><span class="ts" id=1511 data-target="#details-1511" data-toggle="collapse"><span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">string</a>[]</span></td><td><div class="comment"><p>A set of items that will be rendered as actions in the message.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves to the selected item or <code>undefined</code> when being dismissed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showErrorMessage"></a><span class="ts" id=1512 data-target="#details-1512" data-toggle="collapse"><span class="ident">showErrorMessage</span><span>&lt;</span>T extends <a class="type-ref" href="#MessageItem">MessageItem</a><span>&gt;</span><span>(</span><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a>, <span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">T</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span>
<div class="details collapse" id="details-1512">
<div class="comment"><p>Show an error message.</p>
<ul>
<li><em>see</em> - <a href="#window.showInformationMessage">showInformationMessage</a></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="message"></a><span class="ts" id=1514 data-target="#details-1514" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The message to show.</p>
</div></td></tr>
<tr><td><a name="items"></a><span class="ts" id=1515 data-target="#details-1515" data-toggle="collapse"><span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">T</a>[]</span></td><td><div class="comment"><p>A set of items that will be rendered as actions in the message.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves to the selected item or <code>undefined</code> when being dismissed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showErrorMessage"></a><span class="ts" id=1516 data-target="#details-1516" data-toggle="collapse"><span class="ident">showErrorMessage</span><span>&lt;</span>T extends <a class="type-ref" href="#MessageItem">MessageItem</a><span>&gt;</span><span>(</span><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">options</span><span>: </span><a class="type-ref" href="#MessageOptions">MessageOptions</a>, <span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">T</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span>
<div class="details collapse" id="details-1516">
<div class="comment"><p>Show an error message.</p>
<ul>
<li><em>see</em> - <a href="#window.showInformationMessage">showInformationMessage</a></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="message"></a><span class="ts" id=1518 data-target="#details-1518" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The message to show.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=1519 data-target="#details-1519" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#MessageOptions">MessageOptions</a></span></td><td><div class="comment"><p>Configures the behaviour of the message.</p>
</div></td></tr>
<tr><td><a name="items"></a><span class="ts" id=1520 data-target="#details-1520" data-toggle="collapse"><span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">T</a>[]</span></td><td><div class="comment"><p>A set of items that will be rendered as actions in the message.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves to the selected item or <code>undefined</code> when being dismissed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showInformationMessage"></a><span class="ts" id=1471 data-target="#details-1471" data-toggle="collapse"><span class="ident">showInformationMessage</span><span>(</span><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a>, <span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">string</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span>
<div class="details collapse" id="details-1471">
<div class="comment"><p>Show an information message to users. Optionally provide an array of items which will be presented as
clickable buttons.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="message"></a><span class="ts" id=1472 data-target="#details-1472" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The message to show.</p>
</div></td></tr>
<tr><td><a name="items"></a><span class="ts" id=1473 data-target="#details-1473" data-toggle="collapse"><span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">string</a>[]</span></td><td><div class="comment"><p>A set of items that will be rendered as actions in the message.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves to the selected item or <code>undefined</code> when being dismissed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showInformationMessage"></a><span class="ts" id=1474 data-target="#details-1474" data-toggle="collapse"><span class="ident">showInformationMessage</span><span>(</span><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">options</span><span>: </span><a class="type-ref" href="#MessageOptions">MessageOptions</a>, <span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">string</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span>
<div class="details collapse" id="details-1474">
<div class="comment"><p>Show an information message to users. Optionally provide an array of items which will be presented as
clickable buttons.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="message"></a><span class="ts" id=1475 data-target="#details-1475" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The message to show.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=1476 data-target="#details-1476" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#MessageOptions">MessageOptions</a></span></td><td><div class="comment"><p>Configures the behaviour of the message.</p>
</div></td></tr>
<tr><td><a name="items"></a><span class="ts" id=1477 data-target="#details-1477" data-toggle="collapse"><span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">string</a>[]</span></td><td><div class="comment"><p>A set of items that will be rendered as actions in the message.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves to the selected item or <code>undefined</code> when being dismissed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showInformationMessage"></a><span class="ts" id=1478 data-target="#details-1478" data-toggle="collapse"><span class="ident">showInformationMessage</span><span>&lt;</span>T extends <a class="type-ref" href="#MessageItem">MessageItem</a><span>&gt;</span><span>(</span><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a>, <span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">T</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span>
<div class="details collapse" id="details-1478">
<div class="comment"><p>Show an information message.</p>
<ul>
<li><em>see</em> - <a href="#window.showInformationMessage">showInformationMessage</a></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="message"></a><span class="ts" id=1480 data-target="#details-1480" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The message to show.</p>
</div></td></tr>
<tr><td><a name="items"></a><span class="ts" id=1481 data-target="#details-1481" data-toggle="collapse"><span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">T</a>[]</span></td><td><div class="comment"><p>A set of items that will be rendered as actions in the message.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves to the selected item or <code>undefined</code> when being dismissed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showInformationMessage"></a><span class="ts" id=1482 data-target="#details-1482" data-toggle="collapse"><span class="ident">showInformationMessage</span><span>&lt;</span>T extends <a class="type-ref" href="#MessageItem">MessageItem</a><span>&gt;</span><span>(</span><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">options</span><span>: </span><a class="type-ref" href="#MessageOptions">MessageOptions</a>, <span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">T</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span>
<div class="details collapse" id="details-1482">
<div class="comment"><p>Show an information message.</p>
<ul>
<li><em>see</em> - <a href="#window.showInformationMessage">showInformationMessage</a></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="message"></a><span class="ts" id=1484 data-target="#details-1484" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The message to show.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=1485 data-target="#details-1485" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#MessageOptions">MessageOptions</a></span></td><td><div class="comment"><p>Configures the behaviour of the message.</p>
</div></td></tr>
<tr><td><a name="items"></a><span class="ts" id=1486 data-target="#details-1486" data-toggle="collapse"><span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">T</a>[]</span></td><td><div class="comment"><p>A set of items that will be rendered as actions in the message.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves to the selected item or <code>undefined</code> when being dismissed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showInputBox"></a><span class="ts" id=1541 data-target="#details-1541" data-toggle="collapse"><span class="ident">showInputBox</span><span>(</span><span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#InputBoxOptions">InputBoxOptions</a>, <span class="ident">token</span><span>?</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span>
<div class="details collapse" id="details-1541">
<div class="comment"><p>Opens an input box to ask the user for input.</p>
<p>The returned value will be <code>undefined</code> if the input box was canceled (e.g. pressing ESC). Otherwise the
returned value will be the string typed by the user or an empty string if the user did not type
anything but dismissed the input box with OK.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="options"></a><span class="ts" id=1542 data-target="#details-1542" data-toggle="collapse"><span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#InputBoxOptions">InputBoxOptions</a></span></td><td><div class="comment"><p>Configures the behavior of the input box.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=1543 data-target="#details-1543" data-toggle="collapse"><span class="ident">token</span><span>?</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A token that can be used to signal cancellation.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span></td><td><div class="comment"><p>A promise that resolves to a string the user provided or to <code>undefined</code> in case of dismissal.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showOpenDialog"></a><span class="ts" id=1535 data-target="#details-1535" data-toggle="collapse"><span class="ident">showOpenDialog</span><span>(</span><span class="ident">options</span><span>: </span><a class="type-ref" href="#OpenDialogOptions">OpenDialogOptions</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#Uri">Uri</a>[] &#124; <a class="type-intrinsic">undefined</a>&gt;</span>
<div class="details collapse" id="details-1535">
<div class="comment"><p>Shows a file open dialog to the user which allows to select a file
for opening-purposes.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="options"></a><span class="ts" id=1536 data-target="#details-1536" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#OpenDialogOptions">OpenDialogOptions</a></span></td><td><div class="comment"><p>Options that control the dialog.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#Uri">Uri</a>[] &#124; <a class="type-intrinsic">undefined</a>&gt;</span></td><td><div class="comment"><p>A promise that resolves to the selected resources or <code>undefined</code>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showQuickPick"></a><span class="ts" id=1522 data-target="#details-1522" data-toggle="collapse"><span class="ident">showQuickPick</span><span>(</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">string</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a>[]&gt;, <span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#QuickPickOptions">QuickPickOptions</a>, <span class="ident">token</span><span>?</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span>
<div class="details collapse" id="details-1522">
<div class="comment"><p>Shows a selection list.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="items"></a><span class="ts" id=1523 data-target="#details-1523" data-toggle="collapse"><span class="ident">items</span><span>: </span><a class="type-intrinsic">string</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a>[]&gt;</span></td><td><div class="comment"><p>An array of strings, or a promise that resolves to an array of strings.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=1524 data-target="#details-1524" data-toggle="collapse"><span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#QuickPickOptions">QuickPickOptions</a></span></td><td><div class="comment"><p>Configures the behavior of the selection list.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=1525 data-target="#details-1525" data-toggle="collapse"><span class="ident">token</span><span>?</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A token that can be used to signal cancellation.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span></td><td><div class="comment"><p>A promise that resolves to the selection or <code>undefined</code>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showQuickPick"></a><span class="ts" id=1526 data-target="#details-1526" data-toggle="collapse"><span class="ident">showQuickPick</span><span>&lt;</span>T extends <a class="type-ref" href="#QuickPickItem">QuickPickItem</a><span>&gt;</span><span>(</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">T</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">T</a>[]&gt;, <span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#QuickPickOptions">QuickPickOptions</a>, <span class="ident">token</span><span>?</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span>
<div class="details collapse" id="details-1526">
<div class="comment"><p>Shows a selection list.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="items"></a><span class="ts" id=1528 data-target="#details-1528" data-toggle="collapse"><span class="ident">items</span><span>: </span><a class="type-intrinsic">T</a>[] &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">T</a>[]&gt;</span></td><td><div class="comment"><p>An array of items, or a promise that resolves to an array of items.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=1529 data-target="#details-1529" data-toggle="collapse"><span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#QuickPickOptions">QuickPickOptions</a></span></td><td><div class="comment"><p>Configures the behavior of the selection list.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=1530 data-target="#details-1530" data-toggle="collapse"><span class="ident">token</span><span>?</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A token that can be used to signal cancellation.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span></td><td><div class="comment"><p>A promise that resolves to the selected item or <code>undefined</code>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showSaveDialog"></a><span class="ts" id=1538 data-target="#details-1538" data-toggle="collapse"><span class="ident">showSaveDialog</span><span>(</span><span class="ident">options</span><span>: </span><a class="type-ref" href="#SaveDialogOptions">SaveDialogOptions</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#Uri">Uri</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span>
<div class="details collapse" id="details-1538">
<div class="comment"><p>Shows a file save dialog to the user which allows to select a file
for saving-purposes.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="options"></a><span class="ts" id=1539 data-target="#details-1539" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#SaveDialogOptions">SaveDialogOptions</a></span></td><td><div class="comment"><p>Options that control the dialog.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#Uri">Uri</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span></td><td><div class="comment"><p>A promise that resolves to the selected resource or <code>undefined</code>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showTextDocument"></a><span class="ts" id=1457 data-target="#details-1457" data-toggle="collapse"><span class="ident">showTextDocument</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">column</span><span>?</span><span>: </span><a class="type-ref" href="#ViewColumn">ViewColumn</a>, <span class="ident">preserveFocus</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextEditor">TextEditor</a>&gt;</span>
<div class="details collapse" id="details-1457">
<div class="comment"><p>Show the given document in a text editor. A <a href="#ViewColumn">column</a> can be provided
to control where the editor is being shown. Might change the <a href="#window.activeTextEditor">active editor</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=1458 data-target="#details-1458" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>A text document to be shown.</p>
</div></td></tr>
<tr><td><a name="column"></a><span class="ts" id=1459 data-target="#details-1459" data-toggle="collapse"><span class="ident">column</span><span>?</span><span>: </span><a class="type-ref" href="#ViewColumn">ViewColumn</a></span></td><td><div class="comment"><p>A view column in which the <a href="#TextEditor">editor</a> should be shown. The default is the <a href="#ViewColumn.One">one</a>, other values
are adjusted to be <code>Min(column, columnCount + 1)</code>, the <a href="#ViewColumn.Active">active</a>-column is
not adjusted.</p>
</div></td></tr>
<tr><td><a name="preserveFocus"></a><span class="ts" id=1460 data-target="#details-1460" data-toggle="collapse"><span class="ident">preserveFocus</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p>When <code>true</code> the editor will not take focus.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextEditor">TextEditor</a>&gt;</span></td><td><div class="comment"><p>A promise that resolves to an <a href="#TextEditor">editor</a>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showTextDocument"></a><span class="ts" id=1461 data-target="#details-1461" data-toggle="collapse"><span class="ident">showTextDocument</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#TextDocumentShowOptions">TextDocumentShowOptions</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextEditor">TextEditor</a>&gt;</span>
<div class="details collapse" id="details-1461">
<div class="comment"><p>Show the given document in a text editor. <a href="#TextDocumentShowOptions">Options</a> can be provided
to control options of the editor is being shown. Might change the <a href="#window.activeTextEditor">active editor</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=1462 data-target="#details-1462" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>A text document to be shown.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=1463 data-target="#details-1463" data-toggle="collapse"><span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#TextDocumentShowOptions">TextDocumentShowOptions</a></span></td><td><div class="comment"><p>(#TextDocumentShowOptions) to configure the behavior of showing the <a href="#TextEditor">editor</a>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextEditor">TextEditor</a>&gt;</span></td><td><div class="comment"><p>A promise that resolves to an <a href="#TextEditor">editor</a>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showTextDocument"></a><span class="ts" id=1464 data-target="#details-1464" data-toggle="collapse"><span class="ident">showTextDocument</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a>, <span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#TextDocumentShowOptions">TextDocumentShowOptions</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextEditor">TextEditor</a>&gt;</span>
<div class="details collapse" id="details-1464">
<div class="comment"><p>A short-hand for <code>openTextDocument(uri).then(document =&gt; showTextDocument(document, options))</code>.</p>
<ul>
<li><em>see</em> - <a href="#openTextDocument">openTextDocument</a></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=1465 data-target="#details-1465" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A resource identifier.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=1466 data-target="#details-1466" data-toggle="collapse"><span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#TextDocumentShowOptions">TextDocumentShowOptions</a></span></td><td><div class="comment"><p>(#TextDocumentShowOptions) to configure the behavior of showing the <a href="#TextEditor">editor</a>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextEditor">TextEditor</a>&gt;</span></td><td><div class="comment"><p>A promise that resolves to an <a href="#TextEditor">editor</a>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showWarningMessage"></a><span class="ts" id=1488 data-target="#details-1488" data-toggle="collapse"><span class="ident">showWarningMessage</span><span>(</span><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a>, <span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">string</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span>
<div class="details collapse" id="details-1488">
<div class="comment"><p>Show a warning message.</p>
<ul>
<li><em>see</em> - <a href="#window.showInformationMessage">showInformationMessage</a></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="message"></a><span class="ts" id=1489 data-target="#details-1489" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The message to show.</p>
</div></td></tr>
<tr><td><a name="items"></a><span class="ts" id=1490 data-target="#details-1490" data-toggle="collapse"><span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">string</a>[]</span></td><td><div class="comment"><p>A set of items that will be rendered as actions in the message.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves to the selected item or <code>undefined</code> when being dismissed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showWarningMessage"></a><span class="ts" id=1491 data-target="#details-1491" data-toggle="collapse"><span class="ident">showWarningMessage</span><span>(</span><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">options</span><span>: </span><a class="type-ref" href="#MessageOptions">MessageOptions</a>, <span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">string</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span>
<div class="details collapse" id="details-1491">
<div class="comment"><p>Show a warning message.</p>
<ul>
<li><em>see</em> - <a href="#window.showInformationMessage">showInformationMessage</a></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="message"></a><span class="ts" id=1492 data-target="#details-1492" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The message to show.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=1493 data-target="#details-1493" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#MessageOptions">MessageOptions</a></span></td><td><div class="comment"><p>Configures the behaviour of the message.</p>
</div></td></tr>
<tr><td><a name="items"></a><span class="ts" id=1494 data-target="#details-1494" data-toggle="collapse"><span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">string</a>[]</span></td><td><div class="comment"><p>A set of items that will be rendered as actions in the message.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves to the selected item or <code>undefined</code> when being dismissed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showWarningMessage"></a><span class="ts" id=1495 data-target="#details-1495" data-toggle="collapse"><span class="ident">showWarningMessage</span><span>&lt;</span>T extends <a class="type-ref" href="#MessageItem">MessageItem</a><span>&gt;</span><span>(</span><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a>, <span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">T</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span>
<div class="details collapse" id="details-1495">
<div class="comment"><p>Show a warning message.</p>
<ul>
<li><em>see</em> - <a href="#window.showInformationMessage">showInformationMessage</a></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="message"></a><span class="ts" id=1497 data-target="#details-1497" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The message to show.</p>
</div></td></tr>
<tr><td><a name="items"></a><span class="ts" id=1498 data-target="#details-1498" data-toggle="collapse"><span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">T</a>[]</span></td><td><div class="comment"><p>A set of items that will be rendered as actions in the message.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves to the selected item or <code>undefined</code> when being dismissed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showWarningMessage"></a><span class="ts" id=1499 data-target="#details-1499" data-toggle="collapse"><span class="ident">showWarningMessage</span><span>&lt;</span>T extends <a class="type-ref" href="#MessageItem">MessageItem</a><span>&gt;</span><span>(</span><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">options</span><span>: </span><a class="type-ref" href="#MessageOptions">MessageOptions</a>, <span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">T</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span>
<div class="details collapse" id="details-1499">
<div class="comment"><p>Show a warning message.</p>
<ul>
<li><em>see</em> - <a href="#window.showInformationMessage">showInformationMessage</a></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="message"></a><span class="ts" id=1501 data-target="#details-1501" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The message to show.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=1502 data-target="#details-1502" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#MessageOptions">MessageOptions</a></span></td><td><div class="comment"><p>Configures the behaviour of the message.</p>
</div></td></tr>
<tr><td><a name="items"></a><span class="ts" id=1503 data-target="#details-1503" data-toggle="collapse"><span>...</span><span class="ident">items</span><span>: </span><a class="type-intrinsic">T</a>[]</span></td><td><div class="comment"><p>A set of items that will be rendered as actions in the message.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves to the selected item or <code>undefined</code> when being dismissed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.showWorkspaceFolderPick"></a><span class="ts" id=1532 data-target="#details-1532" data-toggle="collapse"><span class="ident">showWorkspaceFolderPick</span><span>(</span><span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#WorkspaceFolderPickOptions">WorkspaceFolderPickOptions</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#WorkspaceFolder">WorkspaceFolder</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span>
<div class="details collapse" id="details-1532">
<div class="comment"><p>Shows a selection list of <a href="#workspace.workspaceFolders">workspace folders</a> to pick from.
Returns <code>undefined</code> if no folder is open.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="options"></a><span class="ts" id=1533 data-target="#details-1533" data-toggle="collapse"><span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#WorkspaceFolderPickOptions">WorkspaceFolderPickOptions</a></span></td><td><div class="comment"><p>Configures the behavior of the workspace folder list.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#WorkspaceFolder">WorkspaceFolder</a> &#124; <a class="type-intrinsic">undefined</a>&gt;</span></td><td><div class="comment"><p>A promise that resolves to the workspace folder or <code>undefined</code>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.withProgress"></a><span class="ts" id=1564 data-target="#details-1564" data-toggle="collapse"><span class="ident">withProgress</span><span>&lt;</span>R<span>&gt;</span><span>(</span><span class="ident">options</span><span>: </span><a class="type-ref" href="#ProgressOptions">ProgressOptions</a>, <span class="ident">task</span><span>: </span>(progress: <a class="type-ref" href="#Progress">Progress</a>&lt;{message: <a class="type-intrinsic">string</a>}&gt;) =&gt; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">R</a>&gt;<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">R</a>&gt;</span>
<div class="details collapse" id="details-1564">
<div class="comment"><p>Show progress in the editor. Progress is shown while running the given callback
and while the promise it returned isn&#39;t resolved nor rejected. The location at which
progress should show (and other details) is defined via the passed <a href="#ProgressOptions"><code>ProgressOptions</code></a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="options"></a><span class="ts" id=1566 data-target="#details-1566" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#ProgressOptions">ProgressOptions</a></span></td><td><div class="comment"></div></td></tr>
<tr><td><a name="task"></a><span class="ts" id=1567 data-target="#details-1567" data-toggle="collapse"><span class="ident">task</span><span>: </span>(progress: <a class="type-ref" href="#Progress">Progress</a>&lt;{message: <a class="type-intrinsic">string</a>}&gt;) =&gt; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">R</a>&gt;</span></td><td><div class="comment"><p>A callback returning a promise. Progress state can be reported with
the provided <a href="#Progress">progress</a>-object.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">R</a>&gt;</span></td><td><div class="comment"><p>The thenable the task-callback returned.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="window.withScmProgress"></a><span class="ts" id=1557 data-target="#details-1557" data-toggle="collapse"><span class="ident">withScmProgress</span><span>&lt;</span>R<span>&gt;</span><span>(</span><span class="ident">task</span><span>: </span>(progress: <a class="type-ref" href="#Progress">Progress</a>&lt;<a class="type-intrinsic">number</a>&gt;) =&gt; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">R</a>&gt;<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">R</a>&gt;</span>
<div class="details collapse" id="details-1557">
<div class="comment"><p><del>Show progress in the Source Control viewlet while running the given callback and while
its returned promise isn&#39;t resolve or rejected.</del></p>
<ul>
<li><em>deprecated</em> - Use <code>withProgress</code> instead.</li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="task"></a><span class="ts" id=1559 data-target="#details-1559" data-toggle="collapse"><span class="ident">task</span><span>: </span>(progress: <a class="type-ref" href="#Progress">Progress</a>&lt;<a class="type-intrinsic">number</a>&gt;) =&gt; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">R</a>&gt;</span></td><td><div class="comment"><p>A callback returning a promise. Progress increments can be reported with
the provided <a href="#Progress">progress</a>-object.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">R</a>&gt;</span></td><td><div class="comment"><p>The thenable the task did rseturn.</p>
</div></td></tr>
</table>
</div>
</div>

## workspace



<div class="comment"><p>Namespace for dealing with the current workspace. A workspace is the representation
of the folder that has been opened. There is no workspace when just a file but not a
folder has been opened.</p>
<p>The workspace offers support for <a href="#workspace.createFileSystemWatcher">listening</a> to fs
events and for <a href="#workspace.findFiles">finding</a> files. Both perform well and run <em>outside</em>
the editor-process so that they should be always used instead of nodejs-equivalents.</p>
</div>

#### Variables



<a name="workspace.name"></a><span class="ts" id=1592 data-target="#details-1592" data-toggle="collapse"><span class="ident">name</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a></span>
<div class="details collapse" id="details-1592">
<div class="comment"><p>The name of the workspace. <code>undefined</code> when no folder
has been opened.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="workspace.rootPath"></a><span class="ts" id=1590 data-target="#details-1590" data-toggle="collapse"><span class="ident">rootPath</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a></span>
<div class="details collapse" id="details-1590">
<div class="comment"><p><del>The folder that is open in the editor. <code>undefined</code> when no folder
has been opened.</del></p>
<ul>
<li><em>deprecated</em> - Use <a href="#workspace.workspaceFolders"><code>workspaceFolders</code></a> instead.</li>
</ul>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="workspace.textDocuments"></a><span class="ts" id=1619 data-target="#details-1619" data-toggle="collapse"><span class="ident">textDocuments</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>[]</span>
<div class="details collapse" id="details-1619">
<div class="comment"><p>All text documents currently known to the system.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>



<a name="workspace.workspaceFolders"></a><span class="ts" id=1591 data-target="#details-1591" data-toggle="collapse"><span class="ident">workspaceFolders</span><span>: </span><a class="type-ref" href="#WorkspaceFolder">WorkspaceFolder</a>[] &#124; <a class="type-intrinsic">undefined</a></span>
<div class="details collapse" id="details-1591">
<div class="comment"><p>List of workspace folders or <code>undefined</code> when no folder is open.
<em>Note</em> that the first entry corresponds to the value of <code>rootPath</code>.</p>
<ul>
<li><em>readonly</em></li>
</ul>
</div>
</div>

#### Events



<a name="workspace.onDidChangeConfiguration"></a><span class="ts" id=1643 data-target="#details-1643" data-toggle="collapse"><span class="ident">onDidChangeConfiguration</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#ConfigurationChangeEvent">ConfigurationChangeEvent</a>&gt;</span>
<div class="details collapse" id="details-1643">
<div class="comment"><p>An event that is emitted when the <a href="#WorkspaceConfiguration">configuration</a> changed.</p>
</div>
</div>



<a name="workspace.onDidChangeTextDocument"></a><span class="ts" id=1636 data-target="#details-1636" data-toggle="collapse"><span class="ident">onDidChangeTextDocument</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#TextDocumentChangeEvent">TextDocumentChangeEvent</a>&gt;</span>
<div class="details collapse" id="details-1636">
<div class="comment"><p>An event that is emitted when a <a href="#TextDocument">text document</a> is changed. This usually happens
when the <a href="#TextDocument.getText">contents</a> changes but also when other things like the
<a href="#TextDocument.isDirty">dirty</a>-state changes.</p>
</div>
</div>



<a name="workspace.onDidChangeWorkspaceFolders"></a><span class="ts" id=1593 data-target="#details-1593" data-toggle="collapse"><span class="ident">onDidChangeWorkspaceFolders</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#WorkspaceFoldersChangeEvent">WorkspaceFoldersChangeEvent</a>&gt;</span>
<div class="details collapse" id="details-1593">
<div class="comment"><p>An event that is emitted when a workspace folder is added or removed.</p>
</div>
</div>



<a name="workspace.onDidCloseTextDocument"></a><span class="ts" id=1635 data-target="#details-1635" data-toggle="collapse"><span class="ident">onDidCloseTextDocument</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#TextDocument">TextDocument</a>&gt;</span>
<div class="details collapse" id="details-1635">
<div class="comment"><p>An event that is emitted when a <a href="#TextDocument">text document</a> is disposed.</p>
</div>
</div>



<a name="workspace.onDidOpenTextDocument"></a><span class="ts" id=1634 data-target="#details-1634" data-toggle="collapse"><span class="ident">onDidOpenTextDocument</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#TextDocument">TextDocument</a>&gt;</span>
<div class="details collapse" id="details-1634">
<div class="comment"><p>An event that is emitted when a <a href="#TextDocument">text document</a> is opened.</p>
</div>
</div>



<a name="workspace.onDidSaveTextDocument"></a><span class="ts" id=1638 data-target="#details-1638" data-toggle="collapse"><span class="ident">onDidSaveTextDocument</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#TextDocument">TextDocument</a>&gt;</span>
<div class="details collapse" id="details-1638">
<div class="comment"><p>An event that is emitted when a <a href="#TextDocument">text document</a> is saved to disk.</p>
</div>
</div>



<a name="workspace.onWillSaveTextDocument"></a><span class="ts" id=1637 data-target="#details-1637" data-toggle="collapse"><span class="ident">onWillSaveTextDocument</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#TextDocumentWillSaveEvent">TextDocumentWillSaveEvent</a>&gt;</span>
<div class="details collapse" id="details-1637">
<div class="comment"><p>An event that is emitted when a <a href="#TextDocument">text document</a> will be saved to disk.</p>
<p><em>Note 1:</em> Subscribers can delay saving by registering asynchronous work. For the sake of data integrity the editor
might save without firing this event. For instance when shutting down with dirty files.</p>
<p><em>Note 2:</em> Subscribers are called sequentially and they can <a href="#TextDocumentWillSaveEvent.waitUntil">delay</a> saving
by registering asynchronous work. Protection against misbehaving listeners is implemented as such:</p>
<ul>
<li>there is an overall time budget that all listeners share and if that is exhausted no further listener is called</li>
<li>listeners that take a long time or produce errors frequently will not be called anymore</li>
</ul>
<p>The current thresholds are 1.5 seconds as overall time budget and a listener can misbehave 3 times before being ignored.</p>
</div>
</div>

#### Functions



<a name="workspace.applyEdit"></a><span class="ts" id=1617 data-target="#details-1617" data-toggle="collapse"><span class="ident">applyEdit</span><span>(</span><span class="ident">edit</span><span>: </span><a class="type-ref" href="#WorkspaceEdit">WorkspaceEdit</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">boolean</a>&gt;</span>
<div class="details collapse" id="details-1617">
<div class="comment"><p>Make changes to one or many resources as defined by the given
<a href="#WorkspaceEdit">workspace edit</a>.</p>
<p>When applying a workspace edit, the editor implements an &#39;all-or-nothing&#39;-strategy,
that means failure to load one document or make changes to one document will cause
the edit to be rejected.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="edit"></a><span class="ts" id=1618 data-target="#details-1618" data-toggle="collapse"><span class="ident">edit</span><span>: </span><a class="type-ref" href="#WorkspaceEdit">WorkspaceEdit</a></span></td><td><div class="comment"><p>A workspace edit.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">boolean</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves when the edit could be applied.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="workspace.asRelativePath"></a><span class="ts" id=1598 data-target="#details-1598" data-toggle="collapse"><span class="ident">asRelativePath</span><span>(</span><span class="ident">pathOrUri</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#Uri">Uri</a>, <span class="ident">includeWorkspaceFolder</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a><span>)</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1598">
<div class="comment"><p>Returns a path that is relative to the workspace folder or folders.</p>
<p>When there are no <a href="#workspace.workspaceFolders">workspace folders</a> or when the path
is not contained in them, the input is returned.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="pathOrUri"></a><span class="ts" id=1599 data-target="#details-1599" data-toggle="collapse"><span class="ident">pathOrUri</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A path or uri. When a uri is given its <a href="#Uri.fsPath">fsPath</a> is used.</p>
</div></td></tr>
<tr><td><a name="includeWorkspaceFolder"></a><span class="ts" id=1600 data-target="#details-1600" data-toggle="collapse"><span class="ident">includeWorkspaceFolder</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p>When <code>true</code> and when the given path is contained inside a
workspace folder the name of the workspace is prepended. Defaults to <code>true</code> when there are
multiple workspace folders and <code>false</code> otherwise.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A path relative to the root or the input.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="workspace.createFileSystemWatcher"></a><span class="ts" id=1602 data-target="#details-1602" data-toggle="collapse"><span class="ident">createFileSystemWatcher</span><span>(</span><span class="ident">globPattern</span><span>: </span><a class="type-ref" href="#GlobPattern">GlobPattern</a>, <span class="ident">ignoreCreateEvents</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a>, <span class="ident">ignoreChangeEvents</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a>, <span class="ident">ignoreDeleteEvents</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a><span>)</span><span>: </span><a class="type-ref" href="#FileSystemWatcher">FileSystemWatcher</a></span>
<div class="details collapse" id="details-1602">
<div class="comment"><p>Creates a file system watcher.</p>
<p>A glob pattern that filters the file events on their absolute path must be provided. Optionally,
flags to ignore certain kinds of events can be provided. To stop listening to events the watcher must be disposed.</p>
<p><em>Note</em> that only files within the current <a href="#workspace.workspaceFolders">workspace folders</a> can be watched.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="globPattern"></a><span class="ts" id=1603 data-target="#details-1603" data-toggle="collapse"><span class="ident">globPattern</span><span>: </span><a class="type-ref" href="#GlobPattern">GlobPattern</a></span></td><td><div class="comment"><p>A <a href="#GlobPattern">glob pattern</a> that is applied to the absolute paths of created, changed,
and deleted files. Use a <a href="#RelativePattern">relative pattern</a> to limit events to a certain <a href="#WorkspaceFolder">workspace folder</a>.</p>
</div></td></tr>
<tr><td><a name="ignoreCreateEvents"></a><span class="ts" id=1604 data-target="#details-1604" data-toggle="collapse"><span class="ident">ignoreCreateEvents</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p>Ignore when files have been created.</p>
</div></td></tr>
<tr><td><a name="ignoreChangeEvents"></a><span class="ts" id=1605 data-target="#details-1605" data-toggle="collapse"><span class="ident">ignoreChangeEvents</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p>Ignore when files have been changed.</p>
</div></td></tr>
<tr><td><a name="ignoreDeleteEvents"></a><span class="ts" id=1606 data-target="#details-1606" data-toggle="collapse"><span class="ident">ignoreDeleteEvents</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p>Ignore when files have been deleted.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#FileSystemWatcher">FileSystemWatcher</a></span></td><td><div class="comment"><p>A new file system watcher instance.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="workspace.findFiles"></a><span class="ts" id=1608 data-target="#details-1608" data-toggle="collapse"><span class="ident">findFiles</span><span>(</span><span class="ident">include</span><span>: </span><a class="type-ref" href="#GlobPattern">GlobPattern</a>, <span class="ident">exclude</span><span>?</span><span>: </span><a class="type-ref" href="#GlobPattern">GlobPattern</a>, <span class="ident">maxResults</span><span>?</span><span>: </span><a class="type-intrinsic">number</a>, <span class="ident">token</span><span>?</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#Uri">Uri</a>[]&gt;</span>
<div class="details collapse" id="details-1608">
<div class="comment"><p>Find files across all <a href="#workspace.workspaceFolders">workspace folders</a> in the workspace.</p>
<ul>
<li><em>sample</em> - <code>findFiles(&#39;**∕*.js&#39;, &#39;**∕node_modules∕**&#39;, 10)</code></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="include"></a><span class="ts" id=1609 data-target="#details-1609" data-toggle="collapse"><span class="ident">include</span><span>: </span><a class="type-ref" href="#GlobPattern">GlobPattern</a></span></td><td><div class="comment"><p>A <a href="#GlobPattern">glob pattern</a> that defines the files to search for. The glob pattern
will be matched against the file paths of resulting matches relative to their workspace. Use a <a href="#RelativePattern">relative pattern</a>
to restrict the search results to a <a href="#WorkspaceFolder">workspace folder</a>.</p>
</div></td></tr>
<tr><td><a name="exclude"></a><span class="ts" id=1610 data-target="#details-1610" data-toggle="collapse"><span class="ident">exclude</span><span>?</span><span>: </span><a class="type-ref" href="#GlobPattern">GlobPattern</a></span></td><td><div class="comment"><p>A <a href="#GlobPattern">glob pattern</a> that defines files and folders to exclude. The glob pattern
will be matched against the file paths of resulting matches relative to their workspace.</p>
</div></td></tr>
<tr><td><a name="maxResults"></a><span class="ts" id=1611 data-target="#details-1611" data-toggle="collapse"><span class="ident">maxResults</span><span>?</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>An upper-bound for the result.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=1612 data-target="#details-1612" data-toggle="collapse"><span class="ident">token</span><span>?</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A token that can be used to signal cancellation to the underlying search engine.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#Uri">Uri</a>[]&gt;</span></td><td><div class="comment"><p>A thenable that resolves to an array of resource identifiers. Will return no results if no
<a href="#workspace.workspaceFolders">workspace folders</a> are opened.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="workspace.getConfiguration"></a><span class="ts" id=1640 data-target="#details-1640" data-toggle="collapse"><span class="ident">getConfiguration</span><span>(</span><span class="ident">section</span><span>?</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">resource</span><span>?</span><span>: </span><a class="type-ref" href="#Uri">Uri</a><span>)</span><span>: </span><a class="type-ref" href="#WorkspaceConfiguration">WorkspaceConfiguration</a></span>
<div class="details collapse" id="details-1640">
<div class="comment"><p>Get a workspace configuration object.</p>
<p>When a section-identifier is provided only that part of the configuration
is returned. Dots in the section-identifier are interpreted as child-access,
like <code>{ myExt: { setting: { doIt: true }}}</code> and <code>getConfiguration(&#39;myExt.setting&#39;).get(&#39;doIt&#39;) === true</code>.</p>
<p>When a resource is provided, configuration scoped to that resource is returned.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="section"></a><span class="ts" id=1641 data-target="#details-1641" data-toggle="collapse"><span class="ident">section</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A dot-separated identifier.</p>
</div></td></tr>
<tr><td><a name="resource"></a><span class="ts" id=1642 data-target="#details-1642" data-toggle="collapse"><span class="ident">resource</span><span>?</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A resource for which the configuration is asked for</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#WorkspaceConfiguration">WorkspaceConfiguration</a></span></td><td><div class="comment"><p>The full configuration or a subset.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="workspace.getWorkspaceFolder"></a><span class="ts" id=1595 data-target="#details-1595" data-toggle="collapse"><span class="ident">getWorkspaceFolder</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a><span>)</span><span>: </span><a class="type-ref" href="#WorkspaceFolder">WorkspaceFolder</a> &#124; <a class="type-intrinsic">undefined</a></span>
<div class="details collapse" id="details-1595">
<div class="comment"><p>Returns the <a href="#WorkspaceFolder">workspace folder</a> that contains a given uri.</p>
<ul>
<li>returns <code>undefined</code> when the given uri doesn&#39;t match any workspace folder</li>
<li>returns the <em>input</em> when the given uri is a workspace folder itself</li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=1596 data-target="#details-1596" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>An uri.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#WorkspaceFolder">WorkspaceFolder</a> &#124; <a class="type-intrinsic">undefined</a></span></td><td><div class="comment"><p>A workspace folder or <code>undefined</code></p>
</div></td></tr>
</table>
</div>
</div>



<a name="workspace.openTextDocument"></a><span class="ts" id=1621 data-target="#details-1621" data-toggle="collapse"><span class="ident">openTextDocument</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextDocument">TextDocument</a>&gt;</span>
<div class="details collapse" id="details-1621">
<div class="comment"><p>Opens a document. Will return early if this document is already open. Otherwise
the document is loaded and the <a href="#workspace.onDidOpenTextDocument">didOpen</a>-event fires.</p>
<p>The document is denoted by an <a href="#Uri">uri</a>. Depending on the <a href="#Uri.scheme">scheme</a> the
following rules apply:</p>
<ul>
<li><code>file</code>-scheme: Open a file on disk, will be rejected if the file does not exist or cannot be loaded.</li>
<li><code>untitled</code>-scheme: A new file that should be saved on disk, e.g. <code>untitled:c:\frodo\new.js</code>. The language
will be derived from the file name.</li>
<li>For all other schemes the registered text document content <a href="#TextDocumentContentProvider">providers</a> are consulted.</li>
</ul>
<p><em>Note</em> that the lifecycle of the returned document is owned by the editor and not by the extension. That means an
<a href="#workspace.onDidCloseTextDocument"><code>onDidClose</code></a>-event can occur at any time after opening it.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=1622 data-target="#details-1622" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>Identifies the resource to open.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextDocument">TextDocument</a>&gt;</span></td><td><div class="comment"><p>A promise that resolves to a <a href="#TextDocument">document</a>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="workspace.openTextDocument"></a><span class="ts" id=1623 data-target="#details-1623" data-toggle="collapse"><span class="ident">openTextDocument</span><span>(</span><span class="ident">fileName</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextDocument">TextDocument</a>&gt;</span>
<div class="details collapse" id="details-1623">
<div class="comment"><p>A short-hand for <code>openTextDocument(Uri.file(fileName))</code>.</p>
<ul>
<li><em>see</em> - <a href="#openTextDocument">openTextDocument</a></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="fileName"></a><span class="ts" id=1624 data-target="#details-1624" data-toggle="collapse"><span class="ident">fileName</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A name of a file on disk.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextDocument">TextDocument</a>&gt;</span></td><td><div class="comment"><p>A promise that resolves to a <a href="#TextDocument">document</a>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="workspace.openTextDocument"></a><span class="ts" id=1625 data-target="#details-1625" data-toggle="collapse"><span class="ident">openTextDocument</span><span>(</span><span class="ident">options</span><span>?</span><span>: </span>{content: <a class="type-intrinsic">string</a>, language: <a class="type-intrinsic">string</a>}<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextDocument">TextDocument</a>&gt;</span>
<div class="details collapse" id="details-1625">
<div class="comment"><p>Opens an untitled text document. The editor will prompt the user for a file
path when the document is to be saved. The <code>options</code> parameter allows to
specify the <em>language</em> and/or the <em>content</em> of the document.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="options"></a><span class="ts" id=1626 data-target="#details-1626" data-toggle="collapse"><span class="ident">options</span><span>?</span><span>: </span>{content: <a class="type-intrinsic">string</a>, language: <a class="type-intrinsic">string</a>}</span></td><td><div class="comment"><p>Options to control how the document will be created.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextDocument">TextDocument</a>&gt;</span></td><td><div class="comment"><p>A promise that resolves to a <a href="#TextDocument">document</a>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="workspace.registerTaskProvider"></a><span class="ts" id=1645 data-target="#details-1645" data-toggle="collapse"><span class="ident">registerTaskProvider</span><span>(</span><span class="ident">type</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#TaskProvider">TaskProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1645">
<div class="comment"><p>Register a task provider.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="type"></a><span class="ts" id=1646 data-target="#details-1646" data-toggle="collapse"><span class="ident">type</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The task kind type this provider is registered for.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1647 data-target="#details-1647" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#TaskProvider">TaskProvider</a></span></td><td><div class="comment"><p>A task provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="workspace.registerTextDocumentContentProvider"></a><span class="ts" id=1631 data-target="#details-1631" data-toggle="collapse"><span class="ident">registerTextDocumentContentProvider</span><span>(</span><span class="ident">scheme</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">provider</span><span>: </span><a class="type-ref" href="#TextDocumentContentProvider">TextDocumentContentProvider</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-1631">
<div class="comment"><p>Register a text document content provider.</p>
<p>Only one provider can be registered per scheme.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="scheme"></a><span class="ts" id=1632 data-target="#details-1632" data-toggle="collapse"><span class="ident">scheme</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The uri-scheme to register for.</p>
</div></td></tr>
<tr><td><a name="provider"></a><span class="ts" id=1633 data-target="#details-1633" data-toggle="collapse"><span class="ident">provider</span><span>: </span><a class="type-ref" href="#TextDocumentContentProvider">TextDocumentContentProvider</a></span></td><td><div class="comment"><p>A content provider.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A <a href="#Disposable">disposable</a> that unregisters this provider when being disposed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="workspace.saveAll"></a><span class="ts" id=1614 data-target="#details-1614" data-toggle="collapse"><span class="ident">saveAll</span><span>(</span><span class="ident">includeUntitled</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">boolean</a>&gt;</span>
<div class="details collapse" id="details-1614">
<div class="comment"><p>Save all dirty files.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="includeUntitled"></a><span class="ts" id=1615 data-target="#details-1615" data-toggle="collapse"><span class="ident">includeUntitled</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p>Also save files that have been created during this session.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">boolean</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves when the files have been saved.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="CancellationToken"></a><span class="code-item" id=407>CancellationToken</span>



<div class="comment"><p>A cancellation token is passed to an asynchronous or long running
operation to request cancellation, like cancelling a request
for completion items because the user continued to type.</p>
<p>To get an instance of a <code>CancellationToken</code> use a
<a href="#CancellationTokenSource">CancellationTokenSource</a>.</p>
</div>

#### Properties



<a name="CancellationToken.isCancellationRequested"></a><span class="ts" id=408 data-target="#details-408" data-toggle="collapse"><span class="ident">isCancellationRequested</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-408">
<div class="comment"><p>Is <code>true</code> when the token has been cancelled, <code>false</code> otherwise.</p>
</div>
</div>



<a name="CancellationToken.onCancellationRequested"></a><span class="ts" id=409 data-target="#details-409" data-toggle="collapse"><span class="ident">onCancellationRequested</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-intrinsic">any</a>&gt;</span>
<div class="details collapse" id="details-409">
<div class="comment"><p>An <a href="#Event">event</a> which fires upon cancellation.</p>
</div>
</div>

### <a name="CancellationTokenSource"></a><span class="code-item" id=410>CancellationTokenSource</span>



<div class="comment"><p>A cancellation source creates and controls a <a href="#CancellationToken">cancellation token</a>.</p>
</div>

#### Properties



<a name="CancellationTokenSource.token"></a><span class="ts" id=411 data-target="#details-411" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span>
<div class="details collapse" id="details-411">
<div class="comment"><p>The cancellation token of this source.</p>
</div>
</div>

#### Methods



<a name="CancellationTokenSource.cancel"></a><span class="ts" id=413 data-target="#details-413" data-toggle="collapse"><span class="ident">cancel</span><span>(</span><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-413">
<div class="comment"><p>Signal cancellation on the token.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="CancellationTokenSource.dispose"></a><span class="ts" id=415 data-target="#details-415" data-toggle="collapse"><span class="ident">dispose</span><span>(</span><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-415">
<div class="comment"><p>Dispose object and free resources. Will call <a href="#CancellationTokenSource.cancel">cancel</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="CharacterPair"></a><span class="code-item" id=1411>CharacterPair</span>



<div class="comment"><p>A tuple of two characters, like a pair of
opening and closing brackets.</p>
</div>



<a name="CharacterPair"></a><span class="ts" id=1411 data-target="#details-1411" data-toggle="collapse"><span class="ident">CharacterPair</span><span>: </span>[<a class="type-intrinsic">string</a>, <a class="type-intrinsic">string</a>]</span>

### <a name="CodeActionContext"></a><span class="code-item" id=529>CodeActionContext</span>



<div class="comment"><p>Contains additional diagnostic information about the context in which
a <a href="#CodeActionProvider.provideCodeActions">code action</a> is run.</p>
</div>

#### Properties



<a name="CodeActionContext.diagnostics"></a><span class="ts" id=530 data-target="#details-530" data-toggle="collapse"><span class="ident">diagnostics</span><span>: </span><a class="type-ref" href="#Diagnostic">Diagnostic</a>[]</span>
<div class="details collapse" id="details-530">
<div class="comment"><p>An array of diagnostics.</p>
</div>
</div>

### <a name="CodeActionProvider"></a><span class="code-item" id=531>CodeActionProvider</span>



<div class="comment"><p>The code action interface defines the contract between extensions and
the <a href="https://code.visualstudio.com/docs/editor/editingevolved#_code-action">light bulb</a> feature.</p>
<p>A code action can be any command that is <a href="#commands.getCommands">known</a> to the system.</p>
</div>

#### Methods



<a name="CodeActionProvider.provideCodeActions"></a><span class="ts" id=533 data-target="#details-533" data-toggle="collapse"><span class="ident">provideCodeActions</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">context</span><span>: </span><a class="type-ref" href="#CodeActionContext">CodeActionContext</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#Command">Command</a>[]&gt;</span>
<div class="details collapse" id="details-533">
<div class="comment"><p>Provide commands for the given document and range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=534 data-target="#details-534" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="range"></a><span class="ts" id=535 data-target="#details-535" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>The range for which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="context"></a><span class="ts" id=536 data-target="#details-536" data-toggle="collapse"><span class="ident">context</span><span>: </span><a class="type-ref" href="#CodeActionContext">CodeActionContext</a></span></td><td><div class="comment"><p>Context carrying additional information.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=537 data-target="#details-537" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#Command">Command</a>[]&gt;</span></td><td><div class="comment"><p>An array of commands or a thenable of such. The lack of a result can be
signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="CodeLens"></a><span class="code-item" id=538>CodeLens</span>



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



<a name="CodeLens.new CodeLens"></a><span class="ts" id=543 data-target="#details-543" data-toggle="collapse"><span class="ident">new CodeLens</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">command</span><span>?</span><span>: </span><a class="type-ref" href="#Command">Command</a><span>)</span><span>: </span><a class="type-ref" href="#CodeLens">CodeLens</a></span>
<div class="details collapse" id="details-543">
<div class="comment"><p>Creates a new code lens object.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=544 data-target="#details-544" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>The range to which this code lens applies.</p>
</div></td></tr>
<tr><td><a name="command"></a><span class="ts" id=545 data-target="#details-545" data-toggle="collapse"><span class="ident">command</span><span>?</span><span>: </span><a class="type-ref" href="#Command">Command</a></span></td><td><div class="comment"><p>The command associated to this code lens.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#CodeLens">CodeLens</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="CodeLens.command"></a><span class="ts" id=540 data-target="#details-540" data-toggle="collapse"><span class="ident">command</span><span>?</span><span>: </span><a class="type-ref" href="#Command">Command</a></span>
<div class="details collapse" id="details-540">
<div class="comment"><p>The command this code lens represents.</p>
</div>
</div>



<a name="CodeLens.isResolved"></a><span class="ts" id=541 data-target="#details-541" data-toggle="collapse"><span class="ident">isResolved</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-541">
<div class="comment"><p><code>true</code> when there is a command associated.</p>
</div>
</div>



<a name="CodeLens.range"></a><span class="ts" id=539 data-target="#details-539" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-539">
<div class="comment"><p>The range in which this code lens is valid. Should only span a single line.</p>
</div>
</div>

### <a name="CodeLensProvider"></a><span class="code-item" id=546>CodeLensProvider</span>



<div class="comment"><p>A code lens provider adds <a href="#Command">commands</a> to source text. The commands will be shown
as dedicated horizontal lines in between the source text.</p>
</div>

#### Events



<a name="CodeLensProvider.onDidChangeCodeLenses"></a><span class="ts" id=547 data-target="#details-547" data-toggle="collapse"><span class="ident">onDidChangeCodeLenses</span><span>?</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-intrinsic">void</a>&gt;</span>
<div class="details collapse" id="details-547">
<div class="comment"><p>An optional event to signal that the code lenses from this provider have changed.</p>
</div>
</div>

#### Methods



<a name="CodeLensProvider.provideCodeLenses"></a><span class="ts" id=549 data-target="#details-549" data-toggle="collapse"><span class="ident">provideCodeLenses</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#CodeLens">CodeLens</a>[]&gt;</span>
<div class="details collapse" id="details-549">
<div class="comment"><p>Compute a list of <a href="#CodeLens">lenses</a>. This call should return as fast as possible and if
computing the commands is expensive implementors should only return code lens objects with the
range set and implement <a href="#CodeLensProvider.resolveCodeLens">resolve</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=550 data-target="#details-550" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=551 data-target="#details-551" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#CodeLens">CodeLens</a>[]&gt;</span></td><td><div class="comment"><p>An array of code lenses or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="CodeLensProvider.resolveCodeLens"></a><span class="ts" id=553 data-target="#details-553" data-toggle="collapse"><span class="ident">resolveCodeLens</span><span>(</span><span class="ident">codeLens</span><span>: </span><a class="type-ref" href="#CodeLens">CodeLens</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#CodeLens">CodeLens</a>&gt;</span>
<div class="details collapse" id="details-553">
<div class="comment"><p>This function will be called for each visible code lens, usually when scrolling and after
calls to <a href="#CodeLensProvider.provideCodeLenses">compute</a>-lenses.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="codeLens"></a><span class="ts" id=554 data-target="#details-554" data-toggle="collapse"><span class="ident">codeLens</span><span>: </span><a class="type-ref" href="#CodeLens">CodeLens</a></span></td><td><div class="comment"><p>code lens that must be resolved.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=555 data-target="#details-555" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#CodeLens">CodeLens</a>&gt;</span></td><td><div class="comment"><p>The given, resolved code lens or thenable that resolves to such.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="Color"></a><span class="code-item" id=903>Color</span>



<div class="comment"><p>Represents a color in RGBA space.</p>
</div>

#### Constructors



<a name="Color.new Color"></a><span class="ts" id=909 data-target="#details-909" data-toggle="collapse"><span class="ident">new Color</span><span>(</span><span class="ident">red</span><span>: </span><a class="type-intrinsic">number</a>, <span class="ident">green</span><span>: </span><a class="type-intrinsic">number</a>, <span class="ident">blue</span><span>: </span><a class="type-intrinsic">number</a>, <span class="ident">alpha</span><span>: </span><a class="type-intrinsic">number</a><span>)</span><span>: </span><a class="type-ref" href="#Color">Color</a></span>
<div class="details collapse" id="details-909">
<div class="comment"><p>Creates a new color instance.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="red"></a><span class="ts" id=910 data-target="#details-910" data-toggle="collapse"><span class="ident">red</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>The red component.</p>
</div></td></tr>
<tr><td><a name="green"></a><span class="ts" id=911 data-target="#details-911" data-toggle="collapse"><span class="ident">green</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>The green component.</p>
</div></td></tr>
<tr><td><a name="blue"></a><span class="ts" id=912 data-target="#details-912" data-toggle="collapse"><span class="ident">blue</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>The bluew component.</p>
</div></td></tr>
<tr><td><a name="alpha"></a><span class="ts" id=913 data-target="#details-913" data-toggle="collapse"><span class="ident">alpha</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>The alpha component.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Color">Color</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="Color.alpha"></a><span class="ts" id=907 data-target="#details-907" data-toggle="collapse"><span class="ident">alpha</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-907">
<div class="comment"><p>The alpha component of this color in the range [0-1].</p>
</div>
</div>



<a name="Color.blue"></a><span class="ts" id=906 data-target="#details-906" data-toggle="collapse"><span class="ident">blue</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-906">
<div class="comment"><p>The blue component of this color in the range [0-1].</p>
</div>
</div>



<a name="Color.green"></a><span class="ts" id=905 data-target="#details-905" data-toggle="collapse"><span class="ident">green</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-905">
<div class="comment"><p>The green component of this color in the range [0-1].</p>
</div>
</div>



<a name="Color.red"></a><span class="ts" id=904 data-target="#details-904" data-toggle="collapse"><span class="ident">red</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-904">
<div class="comment"><p>The red component of this color in the range [0-1].</p>
</div>
</div>

### <a name="ColorInformation"></a><span class="code-item" id=914>ColorInformation</span>



<div class="comment"><p>Represents a color range from a document.</p>
</div>

#### Constructors



<a name="ColorInformation.new ColorInformation"></a><span class="ts" id=918 data-target="#details-918" data-toggle="collapse"><span class="ident">new ColorInformation</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">color</span><span>: </span><a class="type-ref" href="#Color">Color</a><span>)</span><span>: </span><a class="type-ref" href="#ColorInformation">ColorInformation</a></span>
<div class="details collapse" id="details-918">
<div class="comment"><p>Creates a new color range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=919 data-target="#details-919" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>The range the color appears in. Must not be empty.</p>
</div></td></tr>
<tr><td><a name="color"></a><span class="ts" id=920 data-target="#details-920" data-toggle="collapse"><span class="ident">color</span><span>: </span><a class="type-ref" href="#Color">Color</a></span></td><td><div class="comment"><p>The value of the color.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ColorInformation">ColorInformation</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="ColorInformation.color"></a><span class="ts" id=916 data-target="#details-916" data-toggle="collapse"><span class="ident">color</span><span>: </span><a class="type-ref" href="#Color">Color</a></span>
<div class="details collapse" id="details-916">
<div class="comment"><p>The actual color value for this color range.</p>
</div>
</div>



<a name="ColorInformation.range"></a><span class="ts" id=915 data-target="#details-915" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-915">
<div class="comment"><p>The range in the document where this color appers.</p>
</div>
</div>

### <a name="ColorPresentation"></a><span class="code-item" id=921>ColorPresentation</span>



<div class="comment"><p>A color presentation object describes how a <a href="#Color"><code>color</code></a> should be represented as text and what
edits are required to refer to it from source code.</p>
<p>For some languages one color can have multiple presentations, e.g. css can represent the color red with
the constant <code>Red</code>, the hex-value <code>#ff0000</code>, or in rgba and hsla forms. In csharp other representations
apply, e.g <code>System.Drawing.Color.Red</code>.</p>
</div>

#### Constructors



<a name="ColorPresentation.new ColorPresentation"></a><span class="ts" id=926 data-target="#details-926" data-toggle="collapse"><span class="ident">new ColorPresentation</span><span>(</span><span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#ColorPresentation">ColorPresentation</a></span>
<div class="details collapse" id="details-926">
<div class="comment"><p>Creates a new color presentation.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="label"></a><span class="ts" id=927 data-target="#details-927" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The label of this color presentation.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ColorPresentation">ColorPresentation</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="ColorPresentation.additionalTextEdits"></a><span class="ts" id=924 data-target="#details-924" data-toggle="collapse"><span class="ident">additionalTextEdits</span><span>?</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a>[]</span>
<div class="details collapse" id="details-924">
<div class="comment"><p>An optional array of additional <a href="#TextEdit">text edits</a> that are applied when
selecting this color presentation. Edits must not overlap with the main <a href="#ColorPresentation.textEdit">edit</a> nor with themselves.</p>
</div>
</div>



<a name="ColorPresentation.label"></a><span class="ts" id=922 data-target="#details-922" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-922">
<div class="comment"><p>The label of this color presentation. It will be shown on the color
picker header. By default this is also the text that is inserted when selecting
this color presentation.</p>
</div>
</div>



<a name="ColorPresentation.textEdit"></a><span class="ts" id=923 data-target="#details-923" data-toggle="collapse"><span class="ident">textEdit</span><span>?</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a></span>
<div class="details collapse" id="details-923">
<div class="comment"><p>An <a href="#TextEdit">edit</a> which is applied to a document when selecting
this presentation for the color.  When <code>falsy</code> the <a href="#ColorPresentation.label">label</a>
is used.</p>
</div>
</div>

### <a name="Command"></a><span class="code-item" id=26>Command</span>



<div class="comment"><p>Represents a reference to a command. Provides a title which
will be used to represent a command in the UI and, optionally,
an array of arguments which will be passed to the command handler
function when invoked.</p>
</div>

#### Properties



<a name="Command.arguments"></a><span class="ts" id=30 data-target="#details-30" data-toggle="collapse"><span class="ident">arguments</span><span>?</span><span>: </span><a class="type-intrinsic">any</a>[]</span>
<div class="details collapse" id="details-30">
<div class="comment"><p>Arguments that the command handler should be
invoked with.</p>
</div>
</div>



<a name="Command.command"></a><span class="ts" id=28 data-target="#details-28" data-toggle="collapse"><span class="ident">command</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-28">
<div class="comment"><p>The identifier of the actual command handler.</p>
<ul>
<li><em>see</em> - <a href="#commands.registerCommand">commands.registerCommand</a>.</li>
</ul>
</div>
</div>



<a name="Command.title"></a><span class="ts" id=27 data-target="#details-27" data-toggle="collapse"><span class="ident">title</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-27">
<div class="comment"><p>Title of the command, like <code>save</code>.</p>
</div>
</div>



<a name="Command.tooltip"></a><span class="ts" id=29 data-target="#details-29" data-toggle="collapse"><span class="ident">tooltip</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-29">
<div class="comment"><p>A tooltip for for command, when represented in the UI.</p>
</div>
</div>

### <a name="CommentRule"></a><span class="code-item" id=941>CommentRule</span>



<div class="comment"><p>Describes how comments for a language work.</p>
</div>

#### Properties



<a name="CommentRule.blockComment"></a><span class="ts" id=943 data-target="#details-943" data-toggle="collapse"><span class="ident">blockComment</span><span>?</span><span>: </span><a class="type-ref" href="#CharacterPair">CharacterPair</a></span>
<div class="details collapse" id="details-943">
<div class="comment"><p>The block comment character pair, like <code>/* block comment *&amp;#47;</code></p>
</div>
</div>



<a name="CommentRule.lineComment"></a><span class="ts" id=942 data-target="#details-942" data-toggle="collapse"><span class="ident">lineComment</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-942">
<div class="comment"><p>The line comment token, like <code>// this is a comment</code></p>
</div>
</div>

### <a name="CompletionContext"></a><span class="code-item" id=873>CompletionContext</span>



<div class="comment"><p>Contains additional information about the context in which
<a href="#CompletionItemProvider.provideCompletionItems">completion provider</a> is triggered.</p>
</div>

#### Properties



<a name="CompletionContext.triggerCharacter"></a><span class="ts" id=875 data-target="#details-875" data-toggle="collapse"><span class="ident">triggerCharacter</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-875">
<div class="comment"><p>Character that triggered the completion item provider.</p>
<p><code>undefined</code> if provider was not triggered by a character.</p>
<p>The trigger character is already in the document when the completion provider is triggered.</p>
</div>
</div>



<a name="CompletionContext.triggerKind"></a><span class="ts" id=874 data-target="#details-874" data-toggle="collapse"><span class="ident">triggerKind</span><span>: </span><a class="type-ref" href="#CompletionTriggerKind">CompletionTriggerKind</a></span>
<div class="details collapse" id="details-874">
<div class="comment"><p>How the completion was triggered.</p>
</div>
</div>

### <a name="CompletionItem"></a><span class="code-item" id=846>CompletionItem</span>



<div class="comment"><p>A completion item represents a text snippet that is proposed to complete text that is being typed.</p>
<p>It is suffient to create a completion item from just a <a href="#CompletionItem.label">label</a>. In that
case the completion item will replace the <a href="#TextDocument.getWordRangeAtPosition">word</a>
until the cursor with the given label or <a href="#CompletionItem.insertText">insertText</a>. Otherwise the
the given <a href="#CompletionItem.textEdit">edit</a> is used.</p>
<p>When selecting a completion item in the editor its defined or synthesized text edit will be applied
to <em>all</em> cursors/selections whereas <a href="CompletionItem.additionalTextEdits">additionalTextEdits</a> will be
applied as provided.</p>
<ul>
<li><em>see</em> - <a href="#CompletionItemProvider.provideCompletionItems">CompletionItemProvider.provideCompletionItems</a></li>
</ul>
<ul>
<li><em>see</em> - <a href="#CompletionItemProvider.resolveCompletionItem">CompletionItemProvider.resolveCompletionItem</a></li>
</ul>
</div>

#### Constructors



<a name="CompletionItem.new CompletionItem"></a><span class="ts" id=860 data-target="#details-860" data-toggle="collapse"><span class="ident">new CompletionItem</span><span>(</span><span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">kind</span><span>?</span><span>: </span><a class="type-ref" href="#CompletionItemKind">CompletionItemKind</a><span>)</span><span>: </span><a class="type-ref" href="#CompletionItem">CompletionItem</a></span>
<div class="details collapse" id="details-860">
<div class="comment"><p>Creates a new completion item.</p>
<p>Completion items must have at least a <a href="#CompletionItem.label">label</a> which then
will be used as insert text as well as for sorting and filtering.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="label"></a><span class="ts" id=861 data-target="#details-861" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The label of the completion.</p>
</div></td></tr>
<tr><td><a name="kind"></a><span class="ts" id=862 data-target="#details-862" data-toggle="collapse"><span class="ident">kind</span><span>?</span><span>: </span><a class="type-ref" href="#CompletionItemKind">CompletionItemKind</a></span></td><td><div class="comment"><p>The <a href="#CompletionItemKind">kind</a> of the completion.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#CompletionItem">CompletionItem</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="CompletionItem.additionalTextEdits"></a><span class="ts" id=857 data-target="#details-857" data-toggle="collapse"><span class="ident">additionalTextEdits</span><span>?</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a>[]</span>
<div class="details collapse" id="details-857">
<div class="comment"><p>An optional array of additional <a href="#TextEdit">text edits</a> that are applied when
selecting this completion. Edits must not overlap with the main <a href="#CompletionItem.textEdit">edit</a>
nor with themselves.</p>
</div>
</div>



<a name="CompletionItem.command"></a><span class="ts" id=858 data-target="#details-858" data-toggle="collapse"><span class="ident">command</span><span>?</span><span>: </span><a class="type-ref" href="#Command">Command</a></span>
<div class="details collapse" id="details-858">
<div class="comment"><p>An optional <a href="#Command">command</a> that is executed <em>after</em> inserting this completion. <em>Note</em> that
additional modifications to the current document should be described with the
<a href="#CompletionItem.additionalTextEdits">additionalTextEdits</a>-property.</p>
</div>
</div>



<a name="CompletionItem.commitCharacters"></a><span class="ts" id=855 data-target="#details-855" data-toggle="collapse"><span class="ident">commitCharacters</span><span>?</span><span>: </span><a class="type-intrinsic">string</a>[]</span>
<div class="details collapse" id="details-855">
<div class="comment"><p>An optional set of characters that when pressed while this completion is active will accept it first and
then type that character. <em>Note</em> that all commit characters should have <code>length=1</code> and that superfluous
characters will be ignored.</p>
</div>
</div>



<a name="CompletionItem.detail"></a><span class="ts" id=849 data-target="#details-849" data-toggle="collapse"><span class="ident">detail</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-849">
<div class="comment"><p>A human-readable string with additional information
about this item, like type or symbol information.</p>
</div>
</div>



<a name="CompletionItem.documentation"></a><span class="ts" id=850 data-target="#details-850" data-toggle="collapse"><span class="ident">documentation</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#MarkdownString">MarkdownString</a></span>
<div class="details collapse" id="details-850">
<div class="comment"><p>A human-readable string that represents a doc-comment.</p>
</div>
</div>



<a name="CompletionItem.filterText"></a><span class="ts" id=852 data-target="#details-852" data-toggle="collapse"><span class="ident">filterText</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-852">
<div class="comment"><p>A string that should be used when filtering a set of
completion items. When <code>falsy</code> the <a href="#CompletionItem.label">label</a>
is used.</p>
</div>
</div>



<a name="CompletionItem.insertText"></a><span class="ts" id=853 data-target="#details-853" data-toggle="collapse"><span class="ident">insertText</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#SnippetString">SnippetString</a></span>
<div class="details collapse" id="details-853">
<div class="comment"><p>A string or snippet that should be inserted in a document when selecting
this completion. When <code>falsy</code> the <a href="#CompletionItem.label">label</a>
is used.</p>
</div>
</div>



<a name="CompletionItem.kind"></a><span class="ts" id=848 data-target="#details-848" data-toggle="collapse"><span class="ident">kind</span><span>?</span><span>: </span><a class="type-ref" href="#CompletionItemKind">CompletionItemKind</a></span>
<div class="details collapse" id="details-848">
<div class="comment"><p>The kind of this completion item. Based on the kind
an icon is chosen by the editor.</p>
</div>
</div>



<a name="CompletionItem.label"></a><span class="ts" id=847 data-target="#details-847" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-847">
<div class="comment"><p>The label of this completion item. By default
this is also the text that is inserted when selecting
this completion.</p>
</div>
</div>



<a name="CompletionItem.range"></a><span class="ts" id=854 data-target="#details-854" data-toggle="collapse"><span class="ident">range</span><span>?</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-854">
<div class="comment"><p>A range of text that should be replaced by this completion item.</p>
<p>Defaults to a range from the start of the <a href="#TextDocument.getWordRangeAtPosition">current word</a> to the
current position.</p>
<p><em>Note:</em> The range must be a <a href="#Range.isSingleLine">single line</a> and it must
<a href="#Range.contains">contain</a> the position at which completion has been <a href="#CompletionItemProvider.provideCompletionItems">requested</a>.</p>
</div>
</div>



<a name="CompletionItem.sortText"></a><span class="ts" id=851 data-target="#details-851" data-toggle="collapse"><span class="ident">sortText</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-851">
<div class="comment"><p>A string that should be used when comparing this item
with other items. When <code>falsy</code> the <a href="#CompletionItem.label">label</a>
is used.</p>
</div>
</div>



<a name="CompletionItem.textEdit"></a><span class="ts" id=856 data-target="#details-856" data-toggle="collapse"><span class="ident">textEdit</span><span>?</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a></span>
<div class="details collapse" id="details-856">
<div class="comment"><ul>
<li><em>deprecated</em> - Use <code>CompletionItem.insertText</code> and <code>CompletionItem.range</code> instead.</li>
</ul>
<p><del>An <a href="#TextEdit">edit</a> which is applied to a document when selecting
this completion. When an edit is provided the value of
<a href="#CompletionItem.insertText">insertText</a> is ignored.</del></p>
<p><del>The <a href="#Range">range</a> of the edit must be single-line and on the same
line completions were <a href="#CompletionItemProvider.provideCompletionItems">requested</a> at.</del></p>
</div>
</div>

### <a name="CompletionItemKind"></a><span class="code-item" id=820>CompletionItemKind</span>



<div class="comment"><p>Completion item kinds.</p>
</div>

#### Enumeration members



<a name="CompletionItemKind.Class"></a><span class="ts" id=827 data-target="#details-827" data-toggle="collapse"><span class="ident">Class</span></span>
<div class="details collapse" id="details-827">
<em>6</em>
</div>



<a name="CompletionItemKind.Color"></a><span class="ts" id=836 data-target="#details-836" data-toggle="collapse"><span class="ident">Color</span></span>
<div class="details collapse" id="details-836">
<em>15</em>
</div>



<a name="CompletionItemKind.Constant"></a><span class="ts" id=841 data-target="#details-841" data-toggle="collapse"><span class="ident">Constant</span></span>
<div class="details collapse" id="details-841">
<em>20</em>
</div>



<a name="CompletionItemKind.Constructor"></a><span class="ts" id=824 data-target="#details-824" data-toggle="collapse"><span class="ident">Constructor</span></span>
<div class="details collapse" id="details-824">
<em>3</em>
</div>



<a name="CompletionItemKind.Enum"></a><span class="ts" id=833 data-target="#details-833" data-toggle="collapse"><span class="ident">Enum</span></span>
<div class="details collapse" id="details-833">
<em>12</em>
</div>



<a name="CompletionItemKind.EnumMember"></a><span class="ts" id=840 data-target="#details-840" data-toggle="collapse"><span class="ident">EnumMember</span></span>
<div class="details collapse" id="details-840">
<em>19</em>
</div>



<a name="CompletionItemKind.Event"></a><span class="ts" id=843 data-target="#details-843" data-toggle="collapse"><span class="ident">Event</span></span>
<div class="details collapse" id="details-843">
<em>22</em>
</div>



<a name="CompletionItemKind.Field"></a><span class="ts" id=825 data-target="#details-825" data-toggle="collapse"><span class="ident">Field</span></span>
<div class="details collapse" id="details-825">
<em>4</em>
</div>



<a name="CompletionItemKind.File"></a><span class="ts" id=838 data-target="#details-838" data-toggle="collapse"><span class="ident">File</span></span>
<div class="details collapse" id="details-838">
<em>16</em>
</div>



<a name="CompletionItemKind.Folder"></a><span class="ts" id=839 data-target="#details-839" data-toggle="collapse"><span class="ident">Folder</span></span>
<div class="details collapse" id="details-839">
<em>18</em>
</div>



<a name="CompletionItemKind.Function"></a><span class="ts" id=823 data-target="#details-823" data-toggle="collapse"><span class="ident">Function</span></span>
<div class="details collapse" id="details-823">
<em>2</em>
</div>



<a name="CompletionItemKind.Interface"></a><span class="ts" id=828 data-target="#details-828" data-toggle="collapse"><span class="ident">Interface</span></span>
<div class="details collapse" id="details-828">
<em>7</em>
</div>



<a name="CompletionItemKind.Keyword"></a><span class="ts" id=834 data-target="#details-834" data-toggle="collapse"><span class="ident">Keyword</span></span>
<div class="details collapse" id="details-834">
<em>13</em>
</div>



<a name="CompletionItemKind.Method"></a><span class="ts" id=822 data-target="#details-822" data-toggle="collapse"><span class="ident">Method</span></span>
<div class="details collapse" id="details-822">
<em>1</em>
</div>



<a name="CompletionItemKind.Module"></a><span class="ts" id=829 data-target="#details-829" data-toggle="collapse"><span class="ident">Module</span></span>
<div class="details collapse" id="details-829">
<em>8</em>
</div>



<a name="CompletionItemKind.Operator"></a><span class="ts" id=844 data-target="#details-844" data-toggle="collapse"><span class="ident">Operator</span></span>
<div class="details collapse" id="details-844">
<em>23</em>
</div>



<a name="CompletionItemKind.Property"></a><span class="ts" id=830 data-target="#details-830" data-toggle="collapse"><span class="ident">Property</span></span>
<div class="details collapse" id="details-830">
<em>9</em>
</div>



<a name="CompletionItemKind.Reference"></a><span class="ts" id=837 data-target="#details-837" data-toggle="collapse"><span class="ident">Reference</span></span>
<div class="details collapse" id="details-837">
<em>17</em>
</div>



<a name="CompletionItemKind.Snippet"></a><span class="ts" id=835 data-target="#details-835" data-toggle="collapse"><span class="ident">Snippet</span></span>
<div class="details collapse" id="details-835">
<em>14</em>
</div>



<a name="CompletionItemKind.Struct"></a><span class="ts" id=842 data-target="#details-842" data-toggle="collapse"><span class="ident">Struct</span></span>
<div class="details collapse" id="details-842">
<em>21</em>
</div>



<a name="CompletionItemKind.Text"></a><span class="ts" id=821 data-target="#details-821" data-toggle="collapse"><span class="ident">Text</span></span>
<div class="details collapse" id="details-821">
<em>0</em>
</div>



<a name="CompletionItemKind.TypeParameter"></a><span class="ts" id=845 data-target="#details-845" data-toggle="collapse"><span class="ident">TypeParameter</span></span>
<div class="details collapse" id="details-845">
<em>24</em>
</div>



<a name="CompletionItemKind.Unit"></a><span class="ts" id=831 data-target="#details-831" data-toggle="collapse"><span class="ident">Unit</span></span>
<div class="details collapse" id="details-831">
<em>10</em>
</div>



<a name="CompletionItemKind.Value"></a><span class="ts" id=832 data-target="#details-832" data-toggle="collapse"><span class="ident">Value</span></span>
<div class="details collapse" id="details-832">
<em>11</em>
</div>



<a name="CompletionItemKind.Variable"></a><span class="ts" id=826 data-target="#details-826" data-toggle="collapse"><span class="ident">Variable</span></span>
<div class="details collapse" id="details-826">
<em>5</em>
</div>

### <a name="CompletionItemProvider"></a><span class="code-item" id=876>CompletionItemProvider</span>



<div class="comment"><p>The completion item provider interface defines the contract between extensions and
<a href="https://code.visualstudio.com/docs/editor/intellisense">IntelliSense</a>.</p>
<p>When computing <em>complete</em> completion items is expensive, providers can optionally implement
the <code>resolveCompletionItem</code>-function. In that case it is enough to return completion
items with a <a href="#CompletionItem.label">label</a> from the
<a href="#CompletionItemProvider.provideCompletionItems">provideCompletionItems</a>-function. Subsequently,
when a completion item is shown in the UI and gains focus this provider is asked to resolve
the item, like adding <a href="#CompletionItem.documentation">doc-comment</a> or <a href="#CompletionItem.detail">details</a>.</p>
<p>Providers are asked for completions either explicitly by a user gesture or -depending on the configuration-
implicitly when typing words or trigger characters.</p>
</div>

#### Methods



<a name="CompletionItemProvider.provideCompletionItems"></a><span class="ts" id=878 data-target="#details-878" data-toggle="collapse"><span class="ident">provideCompletionItems</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a>, <span class="ident">context</span><span>: </span><a class="type-ref" href="#CompletionContext">CompletionContext</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#CompletionItem">CompletionItem</a>[] &#124; <a class="type-ref" href="#CompletionList">CompletionList</a>&gt;</span>
<div class="details collapse" id="details-878">
<div class="comment"><p>Provide completion items for the given position and document.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=879 data-target="#details-879" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="position"></a><span class="ts" id=880 data-target="#details-880" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The position at which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=881 data-target="#details-881" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><td><a name="context"></a><span class="ts" id=882 data-target="#details-882" data-toggle="collapse"><span class="ident">context</span><span>: </span><a class="type-ref" href="#CompletionContext">CompletionContext</a></span></td><td><div class="comment"><p>How the completion was triggered.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#CompletionItem">CompletionItem</a>[] &#124; <a class="type-ref" href="#CompletionList">CompletionList</a>&gt;</span></td><td><div class="comment"><p>An array of completions, a <a href="#CompletionList">completion list</a>, or a thenable that resolves to either.
The lack of a result can be signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="CompletionItemProvider.resolveCompletionItem"></a><span class="ts" id=884 data-target="#details-884" data-toggle="collapse"><span class="ident">resolveCompletionItem</span><span>(</span><span class="ident">item</span><span>: </span><a class="type-ref" href="#CompletionItem">CompletionItem</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#CompletionItem">CompletionItem</a>&gt;</span>
<div class="details collapse" id="details-884">
<div class="comment"><p>Given a completion item fill in more data, like <a href="#CompletionItem.documentation">doc-comment</a>
or <a href="#CompletionItem.detail">details</a>.</p>
<p>The editor will only resolve a completion item once.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="item"></a><span class="ts" id=885 data-target="#details-885" data-toggle="collapse"><span class="ident">item</span><span>: </span><a class="type-ref" href="#CompletionItem">CompletionItem</a></span></td><td><div class="comment"><p>A completion item currently active in the UI.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=886 data-target="#details-886" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#CompletionItem">CompletionItem</a>&gt;</span></td><td><div class="comment"><p>The resolved completion item or a thenable that resolves to of such. It is OK to return the given
<code>item</code>. When no result is returned, the given <code>item</code> will be used.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="CompletionList"></a><span class="code-item" id=863>CompletionList</span>



<div class="comment"><p>Represents a collection of <a href="#CompletionItem">completion items</a> to be presented
in the editor.</p>
</div>

#### Constructors



<a name="CompletionList.new CompletionList"></a><span class="ts" id=867 data-target="#details-867" data-toggle="collapse"><span class="ident">new CompletionList</span><span>(</span><span class="ident">items</span><span>?</span><span>: </span><a class="type-ref" href="#CompletionItem">CompletionItem</a>[], <span class="ident">isIncomplete</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a><span>)</span><span>: </span><a class="type-ref" href="#CompletionList">CompletionList</a></span>
<div class="details collapse" id="details-867">
<div class="comment"><p>Creates a new completion list.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="items"></a><span class="ts" id=868 data-target="#details-868" data-toggle="collapse"><span class="ident">items</span><span>?</span><span>: </span><a class="type-ref" href="#CompletionItem">CompletionItem</a>[]</span></td><td><div class="comment"><p>The completion items.</p>
</div></td></tr>
<tr><td><a name="isIncomplete"></a><span class="ts" id=869 data-target="#details-869" data-toggle="collapse"><span class="ident">isIncomplete</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p>The list is not complete.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#CompletionList">CompletionList</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="CompletionList.isIncomplete"></a><span class="ts" id=864 data-target="#details-864" data-toggle="collapse"><span class="ident">isIncomplete</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-864">
<div class="comment"><p>This list it not complete. Further typing should result in recomputing
this list.</p>
</div>
</div>



<a name="CompletionList.items"></a><span class="ts" id=865 data-target="#details-865" data-toggle="collapse"><span class="ident">items</span><span>: </span><a class="type-ref" href="#CompletionItem">CompletionItem</a>[]</span>
<div class="details collapse" id="details-865">
<div class="comment"><p>The completion items.</p>
</div>
</div>

### <a name="CompletionTriggerKind"></a><span class="code-item" id=870>CompletionTriggerKind</span>



<div class="comment"><p>How a <a href="#CompletionItemProvider">completion provider</a> was triggered</p>
</div>

#### Enumeration members



<a name="CompletionTriggerKind.Invoke"></a><span class="ts" id=871 data-target="#details-871" data-toggle="collapse"><span class="ident">Invoke</span></span>
<div class="details collapse" id="details-871">
<em>0</em>
</div>



<a name="CompletionTriggerKind.TriggerCharacter"></a><span class="ts" id=872 data-target="#details-872" data-toggle="collapse"><span class="ident">TriggerCharacter</span></span>
<div class="details collapse" id="details-872">
<em>1</em>
</div>

### <a name="ConfigurationChangeEvent"></a><span class="code-item" id=1326>ConfigurationChangeEvent</span>



<div class="comment"><p>An event describing the change in Configuration</p>
</div>

#### Methods



<a name="ConfigurationChangeEvent.affectsConfiguration"></a><span class="ts" id=1328 data-target="#details-1328" data-toggle="collapse"><span class="ident">affectsConfiguration</span><span>(</span><span class="ident">section</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">resource</span><span>?</span><span>: </span><a class="type-ref" href="#Uri">Uri</a><span>)</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-1328">
<div class="comment"><p>Returns <code>true</code> if the given section for the given resource (if provided) is affected.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="section"></a><span class="ts" id=1329 data-target="#details-1329" data-toggle="collapse"><span class="ident">section</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>Configuration name, supports <em>dotted</em> names.</p>
</div></td></tr>
<tr><td><a name="resource"></a><span class="ts" id=1330 data-target="#details-1330" data-toggle="collapse"><span class="ident">resource</span><span>?</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A resource Uri.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p><code>true</code> if the given section for the given resource (if provided) is affected.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="ConfigurationTarget"></a><span class="code-item" id=984>ConfigurationTarget</span>



<div class="comment"><p>The configuration target</p>
</div>

#### Enumeration members



<a name="ConfigurationTarget.Global"></a><span class="ts" id=985 data-target="#details-985" data-toggle="collapse"><span class="ident">Global</span></span>
<div class="details collapse" id="details-985">
<em>1</em>
</div>



<a name="ConfigurationTarget.Workspace"></a><span class="ts" id=986 data-target="#details-986" data-toggle="collapse"><span class="ident">Workspace</span></span>
<div class="details collapse" id="details-986">
<em>2</em>
</div>



<a name="ConfigurationTarget.WorkspaceFolder"></a><span class="ts" id=987 data-target="#details-987" data-toggle="collapse"><span class="ident">WorkspaceFolder</span></span>
<div class="details collapse" id="details-987">
<em>3</em>
</div>

### <a name="DebugConfiguration"></a><span class="code-item" id=1374>DebugConfiguration</span>



<div class="comment"><p>Configuration for a debug session.</p>
</div>

#### Properties



<a name="DebugConfiguration.name"></a><span class="ts" id=1376 data-target="#details-1376" data-toggle="collapse"><span class="ident">name</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1376">
<div class="comment"><p>The name of the debug session.</p>
</div>
</div>



<a name="DebugConfiguration.request"></a><span class="ts" id=1377 data-target="#details-1377" data-toggle="collapse"><span class="ident">request</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1377">
<div class="comment"><p>The request type of the debug session.</p>
</div>
</div>



<a name="DebugConfiguration.type"></a><span class="ts" id=1375 data-target="#details-1375" data-toggle="collapse"><span class="ident">type</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1375">
<div class="comment"><p>The type of the debug session.</p>
</div>
</div>

### <a name="DebugConfigurationProvider"></a><span class="code-item" id=1392>DebugConfigurationProvider</span>



<div class="comment"><p>A debug configuration provider allows to add the initial debug configurations to a newly created launch.json
and to resolve a launch configuration before it is used to start a new debug session.
A debug configuration provider is registered via #debug.registerDebugConfigurationProvider.</p>
</div>

#### Methods



<a name="DebugConfigurationProvider.provideDebugConfigurations"></a><span class="ts" id=1394 data-target="#details-1394" data-toggle="collapse"><span class="ident">provideDebugConfigurations</span><span>(</span><span class="ident">folder</span><span>: </span><a class="type-ref" href="#WorkspaceFolder">WorkspaceFolder</a> &#124; <a class="type-intrinsic">undefined</a>, <span class="ident">token</span><span>?</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#DebugConfiguration">DebugConfiguration</a>[]&gt;</span>
<div class="details collapse" id="details-1394">
<div class="comment"><p>Provides initial <a href="#DebugConfiguration">debug configuration</a>. If more than one debug configuration provider is
registered for the same type, debug configurations are concatenated in arbitrary order.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="folder"></a><span class="ts" id=1395 data-target="#details-1395" data-toggle="collapse"><span class="ident">folder</span><span>: </span><a class="type-ref" href="#WorkspaceFolder">WorkspaceFolder</a> &#124; <a class="type-intrinsic">undefined</a></span></td><td><div class="comment"><p>The workspace folder for which the configurations are used or undefined for a folderless setup.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=1396 data-target="#details-1396" data-toggle="collapse"><span class="ident">token</span><span>?</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#DebugConfiguration">DebugConfiguration</a>[]&gt;</span></td><td><div class="comment"><p>An array of <a href="#DebugConfiguration">debug configurations</a>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="DebugConfigurationProvider.resolveDebugConfiguration"></a><span class="ts" id=1398 data-target="#details-1398" data-toggle="collapse"><span class="ident">resolveDebugConfiguration</span><span>(</span><span class="ident">folder</span><span>: </span><a class="type-ref" href="#WorkspaceFolder">WorkspaceFolder</a> &#124; <a class="type-intrinsic">undefined</a>, <span class="ident">debugConfiguration</span><span>: </span><a class="type-ref" href="#DebugConfiguration">DebugConfiguration</a>, <span class="ident">token</span><span>?</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#DebugConfiguration">DebugConfiguration</a>&gt;</span>
<div class="details collapse" id="details-1398">
<div class="comment"><p>Resolves a <a href="#DebugConfiguration">debug configuration</a> by filling in missing values or by adding/changing/removing attributes.
If more than one debug configuration provider is registered for the same type, the resolveDebugConfiguration calls are chained
in arbitrary order and the initial debug configuration is piped through the chain.
Returning the value &#39;undefined&#39; prevents the debug session from starting.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="folder"></a><span class="ts" id=1399 data-target="#details-1399" data-toggle="collapse"><span class="ident">folder</span><span>: </span><a class="type-ref" href="#WorkspaceFolder">WorkspaceFolder</a> &#124; <a class="type-intrinsic">undefined</a></span></td><td><div class="comment"><p>The workspace folder from which the configuration originates from or undefined for a folderless setup.</p>
</div></td></tr>
<tr><td><a name="debugConfiguration"></a><span class="ts" id=1400 data-target="#details-1400" data-toggle="collapse"><span class="ident">debugConfiguration</span><span>: </span><a class="type-ref" href="#DebugConfiguration">DebugConfiguration</a></span></td><td><div class="comment"><p>The <a href="#DebugConfiguration">debug configuration</a> to resolve.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=1401 data-target="#details-1401" data-toggle="collapse"><span class="ident">token</span><span>?</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#DebugConfiguration">DebugConfiguration</a>&gt;</span></td><td><div class="comment"><p>The resolved debug configuration or undefined.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="DebugSession"></a><span class="code-item" id=1380>DebugSession</span>



<div class="comment"><p>A debug session.</p>
</div>

#### Properties



<a name="DebugSession.id"></a><span class="ts" id=1381 data-target="#details-1381" data-toggle="collapse"><span class="ident">id</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1381">
<div class="comment"><p>The unique ID of this debug session.</p>
</div>
</div>



<a name="DebugSession.name"></a><span class="ts" id=1383 data-target="#details-1383" data-toggle="collapse"><span class="ident">name</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1383">
<div class="comment"><p>The debug session&#39;s name from the <a href="#DebugConfiguration">debug configuration</a>.</p>
</div>
</div>



<a name="DebugSession.type"></a><span class="ts" id=1382 data-target="#details-1382" data-toggle="collapse"><span class="ident">type</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1382">
<div class="comment"><p>The debug session&#39;s type from the <a href="#DebugConfiguration">debug configuration</a>.</p>
</div>
</div>

#### Methods



<a name="DebugSession.customRequest"></a><span class="ts" id=1385 data-target="#details-1385" data-toggle="collapse"><span class="ident">customRequest</span><span>(</span><span class="ident">command</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">args</span><span>?</span><span>: </span><a class="type-intrinsic">any</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">any</a>&gt;</span>
<div class="details collapse" id="details-1385">
<div class="comment"><p>Send a custom request to the debug adapter.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="command"></a><span class="ts" id=1386 data-target="#details-1386" data-toggle="collapse"><span class="ident">command</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"></div></td></tr>
<tr><td><a name="args"></a><span class="ts" id=1387 data-target="#details-1387" data-toggle="collapse"><span class="ident">args</span><span>?</span><span>: </span><a class="type-intrinsic">any</a></span></td><td><div class="comment"></div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">any</a>&gt;</span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="DebugSessionCustomEvent"></a><span class="code-item" id=1388>DebugSessionCustomEvent</span>



<div class="comment"><p>A custom Debug Adapter Protocol event received from a <a href="#DebugSession">debug session</a>.</p>
</div>

#### Properties



<a name="DebugSessionCustomEvent.body"></a><span class="ts" id=1391 data-target="#details-1391" data-toggle="collapse"><span class="ident">body</span><span>?</span><span>: </span><a class="type-intrinsic">any</a></span>
<div class="details collapse" id="details-1391">
<div class="comment"><p>Event specific information.</p>
</div>
</div>



<a name="DebugSessionCustomEvent.event"></a><span class="ts" id=1390 data-target="#details-1390" data-toggle="collapse"><span class="ident">event</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1390">
<div class="comment"><p>Type of event.</p>
</div>
</div>



<a name="DebugSessionCustomEvent.session"></a><span class="ts" id=1389 data-target="#details-1389" data-toggle="collapse"><span class="ident">session</span><span>: </span><a class="type-ref" href="#DebugSession">DebugSession</a></span>
<div class="details collapse" id="details-1389">
<div class="comment"><p>The <a href="#DebugSession">debug session</a> for which the custom event was received.</p>
</div>
</div>

### <a name="DecorationInstanceRenderOptions"></a><span class="code-item" id=313>DecorationInstanceRenderOptions</span>



<div class="comment"></div>

#### Properties



<a name="DecorationInstanceRenderOptions.after"></a><span class="ts" id=317 data-target="#details-317" data-toggle="collapse"><span class="ident">after</span><span>?</span><span>: </span><a class="type-ref" href="#ThemableDecorationAttachmentRenderOptions">ThemableDecorationAttachmentRenderOptions</a></span>
<div class="details collapse" id="details-317">
<div class="comment"><p>Defines the rendering options of the attachment that is inserted after the decorated text</p>
</div>
</div>



<a name="DecorationInstanceRenderOptions.before"></a><span class="ts" id=316 data-target="#details-316" data-toggle="collapse"><span class="ident">before</span><span>?</span><span>: </span><a class="type-ref" href="#ThemableDecorationAttachmentRenderOptions">ThemableDecorationAttachmentRenderOptions</a></span>
<div class="details collapse" id="details-316">
<div class="comment"><p>Defines the rendering options of the attachment that is inserted before the decorated text</p>
</div>
</div>



<a name="DecorationInstanceRenderOptions.dark"></a><span class="ts" id=315 data-target="#details-315" data-toggle="collapse"><span class="ident">dark</span><span>?</span><span>: </span><a class="type-ref" href="#ThemableDecorationInstanceRenderOptions">ThemableDecorationInstanceRenderOptions</a></span>
<div class="details collapse" id="details-315">
<div class="comment"><p>Overwrite options for dark themes.</p>
</div>
</div>



<a name="DecorationInstanceRenderOptions.light"></a><span class="ts" id=314 data-target="#details-314" data-toggle="collapse"><span class="ident">light</span><span>?</span><span>: </span><a class="type-ref" href="#ThemableDecorationInstanceRenderOptions">ThemableDecorationInstanceRenderOptions</a></span>
<div class="details collapse" id="details-314">
<div class="comment"><p>Overwrite options for light themes.</p>
</div>
</div>

### <a name="DecorationOptions"></a><span class="code-item" id=306>DecorationOptions</span>



<div class="comment"><p>Represents options for a specific decoration in a <a href="#TextEditorDecorationType">decoration set</a>.</p>
</div>

#### Properties



<a name="DecorationOptions.hoverMessage"></a><span class="ts" id=308 data-target="#details-308" data-toggle="collapse"><span class="ident">hoverMessage</span><span>?</span><span>: </span><a class="type-ref" href="#MarkedString">MarkedString</a> &#124; <a class="type-ref" href="#MarkedString">MarkedString</a>[]</span>
<div class="details collapse" id="details-308">
<div class="comment"><p>A message that should be rendered when hovering over the decoration.</p>
</div>
</div>



<a name="DecorationOptions.range"></a><span class="ts" id=307 data-target="#details-307" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-307">
<div class="comment"><p>Range to which this decoration is applied. The range must not be empty.</p>
</div>
</div>



<a name="DecorationOptions.renderOptions"></a><span class="ts" id=309 data-target="#details-309" data-toggle="collapse"><span class="ident">renderOptions</span><span>?</span><span>: </span><a class="type-ref" href="#DecorationInstanceRenderOptions">DecorationInstanceRenderOptions</a></span>
<div class="details collapse" id="details-309">
<div class="comment"><p>Render options applied to the current decoration. For performance reasons, keep the
number of decoration specific options small, and use decoration types whereever possible.</p>
</div>
</div>

### <a name="DecorationRangeBehavior"></a><span class="code-item" id=234>DecorationRangeBehavior</span>



<div class="comment"><p>Describes the behavior of decorations when typing/editing at their edges.</p>
</div>

#### Enumeration members



<a name="DecorationRangeBehavior.ClosedClosed"></a><span class="ts" id=236 data-target="#details-236" data-toggle="collapse"><span class="ident">ClosedClosed</span></span>
<div class="details collapse" id="details-236">
<em>1</em>
</div>



<a name="DecorationRangeBehavior.ClosedOpen"></a><span class="ts" id=238 data-target="#details-238" data-toggle="collapse"><span class="ident">ClosedOpen</span></span>
<div class="details collapse" id="details-238">
<em>3</em>
</div>



<a name="DecorationRangeBehavior.OpenClosed"></a><span class="ts" id=237 data-target="#details-237" data-toggle="collapse"><span class="ident">OpenClosed</span></span>
<div class="details collapse" id="details-237">
<em>2</em>
</div>



<a name="DecorationRangeBehavior.OpenOpen"></a><span class="ts" id=235 data-target="#details-235" data-toggle="collapse"><span class="ident">OpenOpen</span></span>
<div class="details collapse" id="details-235">
<em>0</em>
</div>

### <a name="DecorationRenderOptions"></a><span class="code-item" id=280>DecorationRenderOptions</span>



<div class="comment"><p>Represents rendering styles for a <a href="#TextEditorDecorationType">text editor decoration</a>.</p>
</div>

#### Properties



<a name="DecorationRenderOptions.after"></a><span class="ts" id=305 data-target="#details-305" data-toggle="collapse"><span class="ident">after</span><span>?</span><span>: </span><a class="type-ref" href="#ThemableDecorationAttachmentRenderOptions">ThemableDecorationAttachmentRenderOptions</a></span>
<div class="details collapse" id="details-305">
<div class="comment"><p>Defines the rendering options of the attachment that is inserted after the decorated text</p>
</div>
</div>



<a name="DecorationRenderOptions.backgroundColor"></a><span class="ts" id=286 data-target="#details-286" data-toggle="collapse"><span class="ident">backgroundColor</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#ThemeColor">ThemeColor</a></span>
<div class="details collapse" id="details-286">
<div class="comment"><p>Background color of the decoration. Use rgba() and define transparent background colors to play well with other decorations.
Alternatively a color from the color registry can be <a href="#ThemeColor">referenced</a>.</p>
</div>
</div>



<a name="DecorationRenderOptions.before"></a><span class="ts" id=304 data-target="#details-304" data-toggle="collapse"><span class="ident">before</span><span>?</span><span>: </span><a class="type-ref" href="#ThemableDecorationAttachmentRenderOptions">ThemableDecorationAttachmentRenderOptions</a></span>
<div class="details collapse" id="details-304">
<div class="comment"><p>Defines the rendering options of the attachment that is inserted before the decorated text</p>
</div>
</div>



<a name="DecorationRenderOptions.border"></a><span class="ts" id=291 data-target="#details-291" data-toggle="collapse"><span class="ident">border</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-291">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="DecorationRenderOptions.borderColor"></a><span class="ts" id=292 data-target="#details-292" data-toggle="collapse"><span class="ident">borderColor</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#ThemeColor">ThemeColor</a></span>
<div class="details collapse" id="details-292">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.
Better use &#39;border&#39; for setting one or more of the individual border properties.</p>
</div>
</div>



<a name="DecorationRenderOptions.borderRadius"></a><span class="ts" id=293 data-target="#details-293" data-toggle="collapse"><span class="ident">borderRadius</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-293">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.
Better use &#39;border&#39; for setting one or more of the individual border properties.</p>
</div>
</div>



<a name="DecorationRenderOptions.borderSpacing"></a><span class="ts" id=294 data-target="#details-294" data-toggle="collapse"><span class="ident">borderSpacing</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-294">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.
Better use &#39;border&#39; for setting one or more of the individual border properties.</p>
</div>
</div>



<a name="DecorationRenderOptions.borderStyle"></a><span class="ts" id=295 data-target="#details-295" data-toggle="collapse"><span class="ident">borderStyle</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-295">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.
Better use &#39;border&#39; for setting one or more of the individual border properties.</p>
</div>
</div>



<a name="DecorationRenderOptions.borderWidth"></a><span class="ts" id=296 data-target="#details-296" data-toggle="collapse"><span class="ident">borderWidth</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-296">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.
Better use &#39;border&#39; for setting one or more of the individual border properties.</p>
</div>
</div>



<a name="DecorationRenderOptions.color"></a><span class="ts" id=299 data-target="#details-299" data-toggle="collapse"><span class="ident">color</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#ThemeColor">ThemeColor</a></span>
<div class="details collapse" id="details-299">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="DecorationRenderOptions.cursor"></a><span class="ts" id=298 data-target="#details-298" data-toggle="collapse"><span class="ident">cursor</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-298">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="DecorationRenderOptions.dark"></a><span class="ts" id=285 data-target="#details-285" data-toggle="collapse"><span class="ident">dark</span><span>?</span><span>: </span><a class="type-ref" href="#ThemableDecorationRenderOptions">ThemableDecorationRenderOptions</a></span>
<div class="details collapse" id="details-285">
<div class="comment"><p>Overwrite options for dark themes.</p>
</div>
</div>



<a name="DecorationRenderOptions.gutterIconPath"></a><span class="ts" id=301 data-target="#details-301" data-toggle="collapse"><span class="ident">gutterIconPath</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#Uri">Uri</a></span>
<div class="details collapse" id="details-301">
<div class="comment"><p>An <strong>absolute path</strong> or an URI to an image to be rendered in the gutter.</p>
</div>
</div>



<a name="DecorationRenderOptions.gutterIconSize"></a><span class="ts" id=302 data-target="#details-302" data-toggle="collapse"><span class="ident">gutterIconSize</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-302">
<div class="comment"><p>Specifies the size of the gutter icon.
Available values are &#39;auto&#39;, &#39;contain&#39;, &#39;cover&#39; and any percentage value.
For further information: <a href="https://msdn.microsoft.com/en-us/library/jj127316(v=vs.85).aspx">https://msdn.microsoft.com/en-us/library/jj127316(v=vs.85).aspx</a></p>
</div>
</div>



<a name="DecorationRenderOptions.isWholeLine"></a><span class="ts" id=281 data-target="#details-281" data-toggle="collapse"><span class="ident">isWholeLine</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-281">
<div class="comment"><p>Should the decoration be rendered also on the whitespace after the line text.
Defaults to <code>false</code>.</p>
</div>
</div>



<a name="DecorationRenderOptions.letterSpacing"></a><span class="ts" id=300 data-target="#details-300" data-toggle="collapse"><span class="ident">letterSpacing</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-300">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="DecorationRenderOptions.light"></a><span class="ts" id=284 data-target="#details-284" data-toggle="collapse"><span class="ident">light</span><span>?</span><span>: </span><a class="type-ref" href="#ThemableDecorationRenderOptions">ThemableDecorationRenderOptions</a></span>
<div class="details collapse" id="details-284">
<div class="comment"><p>Overwrite options for light themes.</p>
</div>
</div>



<a name="DecorationRenderOptions.outline"></a><span class="ts" id=287 data-target="#details-287" data-toggle="collapse"><span class="ident">outline</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-287">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="DecorationRenderOptions.outlineColor"></a><span class="ts" id=288 data-target="#details-288" data-toggle="collapse"><span class="ident">outlineColor</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#ThemeColor">ThemeColor</a></span>
<div class="details collapse" id="details-288">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.
Better use &#39;outline&#39; for setting one or more of the individual outline properties.</p>
</div>
</div>



<a name="DecorationRenderOptions.outlineStyle"></a><span class="ts" id=289 data-target="#details-289" data-toggle="collapse"><span class="ident">outlineStyle</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-289">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.
Better use &#39;outline&#39; for setting one or more of the individual outline properties.</p>
</div>
</div>



<a name="DecorationRenderOptions.outlineWidth"></a><span class="ts" id=290 data-target="#details-290" data-toggle="collapse"><span class="ident">outlineWidth</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-290">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.
Better use &#39;outline&#39; for setting one or more of the individual outline properties.</p>
</div>
</div>



<a name="DecorationRenderOptions.overviewRulerColor"></a><span class="ts" id=303 data-target="#details-303" data-toggle="collapse"><span class="ident">overviewRulerColor</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#ThemeColor">ThemeColor</a></span>
<div class="details collapse" id="details-303">
<div class="comment"><p>The color of the decoration in the overview ruler. Use rgba() and define transparent colors to play well with other decorations.</p>
</div>
</div>



<a name="DecorationRenderOptions.overviewRulerLane"></a><span class="ts" id=283 data-target="#details-283" data-toggle="collapse"><span class="ident">overviewRulerLane</span><span>?</span><span>: </span><a class="type-ref" href="#OverviewRulerLane">OverviewRulerLane</a></span>
<div class="details collapse" id="details-283">
<div class="comment"><p>The position in the overview ruler where the decoration should be rendered.</p>
</div>
</div>



<a name="DecorationRenderOptions.rangeBehavior"></a><span class="ts" id=282 data-target="#details-282" data-toggle="collapse"><span class="ident">rangeBehavior</span><span>?</span><span>: </span><a class="type-ref" href="#DecorationRangeBehavior">DecorationRangeBehavior</a></span>
<div class="details collapse" id="details-282">
<div class="comment"><p>Customize the growing behavior of the decoration when edits occur at the edges of the decoration&#39;s range.
Defaults to <code>DecorationRangeBehavior.OpenOpen</code>.</p>
</div>
</div>



<a name="DecorationRenderOptions.textDecoration"></a><span class="ts" id=297 data-target="#details-297" data-toggle="collapse"><span class="ident">textDecoration</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-297">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>

### <a name="Definition"></a><span class="code-item" id=1406>Definition</span>



<div class="comment"><p>The definition of a symbol represented as one or many <a href="#Location">locations</a>.
For most programming languages there is only one location at which a symbol is
defined.</p>
</div>



<a name="Definition"></a><span class="ts" id=1406 data-target="#details-1406" data-toggle="collapse"><span class="ident">Definition</span><span>: </span><a class="type-ref" href="#Location">Location</a> &#124; <a class="type-ref" href="#Location">Location</a>[]</span>

### <a name="DefinitionProvider"></a><span class="code-item" id=556>DefinitionProvider</span>



<div class="comment"><p>The definition provider interface defines the contract between extensions and
the <a href="https://code.visualstudio.com/docs/editor/editingevolved#_go-to-definition">go to definition</a>
and peek definition features.</p>
</div>

#### Methods



<a name="DefinitionProvider.provideDefinition"></a><span class="ts" id=558 data-target="#details-558" data-toggle="collapse"><span class="ident">provideDefinition</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#Definition">Definition</a>&gt;</span>
<div class="details collapse" id="details-558">
<div class="comment"><p>Provide the definition of the symbol at the given position and document.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=559 data-target="#details-559" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="position"></a><span class="ts" id=560 data-target="#details-560" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The position at which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=561 data-target="#details-561" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#Definition">Definition</a>&gt;</span></td><td><div class="comment"><p>A definition or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code> or <code>null</code>.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="Diagnostic"></a><span class="code-item" id=1029>Diagnostic</span>



<div class="comment"><p>Represents a diagnostic, such as a compiler error or warning. Diagnostic objects
are only valid in the scope of a file.</p>
</div>

#### Constructors



<a name="Diagnostic.new Diagnostic"></a><span class="ts" id=1036 data-target="#details-1036" data-toggle="collapse"><span class="ident">new Diagnostic</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">severity</span><span>?</span><span>: </span><a class="type-ref" href="#DiagnosticSeverity">DiagnosticSeverity</a><span>)</span><span>: </span><a class="type-ref" href="#Diagnostic">Diagnostic</a></span>
<div class="details collapse" id="details-1036">
<div class="comment"><p>Creates a new diagnostic object.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=1037 data-target="#details-1037" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>The range to which this diagnostic applies.</p>
</div></td></tr>
<tr><td><a name="message"></a><span class="ts" id=1038 data-target="#details-1038" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The human-readable message.</p>
</div></td></tr>
<tr><td><a name="severity"></a><span class="ts" id=1039 data-target="#details-1039" data-toggle="collapse"><span class="ident">severity</span><span>?</span><span>: </span><a class="type-ref" href="#DiagnosticSeverity">DiagnosticSeverity</a></span></td><td><div class="comment"><p>The severity, default is <a href="#DiagnosticSeverity.Error">error</a>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Diagnostic">Diagnostic</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="Diagnostic.code"></a><span class="ts" id=1034 data-target="#details-1034" data-toggle="collapse"><span class="ident">code</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-1034">
<div class="comment"><p>A code or identifier for this diagnostics. Will not be surfaced
to the user, but should be used for later processing, e.g. when
providing <a href="#CodeActionContext">code actions</a>.</p>
</div>
</div>



<a name="Diagnostic.message"></a><span class="ts" id=1031 data-target="#details-1031" data-toggle="collapse"><span class="ident">message</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1031">
<div class="comment"><p>The human-readable message.</p>
</div>
</div>



<a name="Diagnostic.range"></a><span class="ts" id=1030 data-target="#details-1030" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-1030">
<div class="comment"><p>The range to which this diagnostic applies.</p>
</div>
</div>



<a name="Diagnostic.severity"></a><span class="ts" id=1033 data-target="#details-1033" data-toggle="collapse"><span class="ident">severity</span><span>: </span><a class="type-ref" href="#DiagnosticSeverity">DiagnosticSeverity</a></span>
<div class="details collapse" id="details-1033">
<div class="comment"><p>The severity, default is <a href="#DiagnosticSeverity.Error">error</a>.</p>
</div>
</div>



<a name="Diagnostic.source"></a><span class="ts" id=1032 data-target="#details-1032" data-toggle="collapse"><span class="ident">source</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1032">
<div class="comment"><p>A human-readable string describing the source of this
diagnostic, e.g. &#39;typescript&#39; or &#39;super lint&#39;.</p>
</div>
</div>

### <a name="DiagnosticCollection"></a><span class="code-item" id=1040>DiagnosticCollection</span>



<div class="comment"><p>A diagnostics collection is a container that manages a set of
<a href="#Diagnostic">diagnostics</a>. Diagnostics are always scopes to a
diagnostics collection and a resource.</p>
<p>To get an instance of a <code>DiagnosticCollection</code> use
<a href="#languages.createDiagnosticCollection">createDiagnosticCollection</a>.</p>
</div>

#### Properties



<a name="DiagnosticCollection.name"></a><span class="ts" id=1041 data-target="#details-1041" data-toggle="collapse"><span class="ident">name</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1041">
<div class="comment"><p>The name of this diagnostic collection, for instance <code>typescript</code>. Every diagnostic
from this collection will be associated with this name. Also, the task framework uses this
name when defining <a href="https://code.visualstudio.com/docs/editor/tasks#_defining-a-problem-matcher">problem matchers</a>.</p>
</div>
</div>

#### Methods



<a name="DiagnosticCollection.clear"></a><span class="ts" id=1052 data-target="#details-1052" data-toggle="collapse"><span class="ident">clear</span><span>(</span><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1052">
<div class="comment"><p>Remove all diagnostics from this collection. The same
as calling <code>#set(undefined)</code>;</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="DiagnosticCollection.delete"></a><span class="ts" id=1049 data-target="#details-1049" data-toggle="collapse"><span class="ident">delete</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1049">
<div class="comment"><p>Remove all diagnostics from this collection that belong
to the provided <code>uri</code>. The same as <code>#set(uri, undefined)</code>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=1050 data-target="#details-1050" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A resource identifier.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="DiagnosticCollection.dispose"></a><span class="ts" id=1069 data-target="#details-1069" data-toggle="collapse"><span class="ident">dispose</span><span>(</span><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1069">
<div class="comment"><p>Dispose and free associated resources. Calls
<a href="#DiagnosticCollection.clear">clear</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="DiagnosticCollection.forEach"></a><span class="ts" id=1054 data-target="#details-1054" data-toggle="collapse"><span class="ident">forEach</span><span>(</span><span class="ident">callback</span><span>: </span>(uri: <a class="type-ref" href="#Uri">Uri</a>, diagnostics: <a class="type-ref" href="#Diagnostic">Diagnostic</a>[], collection: <a class="type-ref" href="#DiagnosticCollection">DiagnosticCollection</a>) =&gt; <a class="type-intrinsic">any</a>, <span class="ident">thisArg</span><span>?</span><span>: </span><a class="type-intrinsic">any</a><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1054">
<div class="comment"><p>Iterate over each entry in this collection.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="callback"></a><span class="ts" id=1055 data-target="#details-1055" data-toggle="collapse"><span class="ident">callback</span><span>: </span>(uri: <a class="type-ref" href="#Uri">Uri</a>, diagnostics: <a class="type-ref" href="#Diagnostic">Diagnostic</a>[], collection: <a class="type-ref" href="#DiagnosticCollection">DiagnosticCollection</a>) =&gt; <a class="type-intrinsic">any</a></span></td><td><div class="comment"><p>Function to execute for each entry.</p>
</div></td></tr>
<tr><td><a name="thisArg"></a><span class="ts" id=1061 data-target="#details-1061" data-toggle="collapse"><span class="ident">thisArg</span><span>?</span><span>: </span><a class="type-intrinsic">any</a></span></td><td><div class="comment"><p>The <code>this</code> context used when invoking the handler function.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="DiagnosticCollection.get"></a><span class="ts" id=1063 data-target="#details-1063" data-toggle="collapse"><span class="ident">get</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a><span>)</span><span>: </span><a class="type-ref" href="#Diagnostic">Diagnostic</a>[] &#124; <a class="type-intrinsic">undefined</a></span>
<div class="details collapse" id="details-1063">
<div class="comment"><p>Get the diagnostics for a given resource. <em>Note</em> that you cannot
modify the diagnostics-array returned from this call.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=1064 data-target="#details-1064" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A resource identifier.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Diagnostic">Diagnostic</a>[] &#124; <a class="type-intrinsic">undefined</a></span></td><td><div class="comment"><p>An immutable array of <a href="#Diagnostic">diagnostics</a> or <code>undefined</code>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="DiagnosticCollection.has"></a><span class="ts" id=1066 data-target="#details-1066" data-toggle="collapse"><span class="ident">has</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a><span>)</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-1066">
<div class="comment"><p>Check if this collection contains diagnostics for a
given resource.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=1067 data-target="#details-1067" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A resource identifier.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p><code>true</code> if this collection has diagnostic for the given resource.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="DiagnosticCollection.set"></a><span class="ts" id=1043 data-target="#details-1043" data-toggle="collapse"><span class="ident">set</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a>, <span class="ident">diagnostics</span><span>: </span><a class="type-ref" href="#Diagnostic">Diagnostic</a>[] &#124; <a class="type-intrinsic">undefined</a><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1043">
<div class="comment"><p>Assign diagnostics for given resource. Will replace
existing diagnostics for that resource.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=1044 data-target="#details-1044" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A resource identifier.</p>
</div></td></tr>
<tr><td><a name="diagnostics"></a><span class="ts" id=1045 data-target="#details-1045" data-toggle="collapse"><span class="ident">diagnostics</span><span>: </span><a class="type-ref" href="#Diagnostic">Diagnostic</a>[] &#124; <a class="type-intrinsic">undefined</a></span></td><td><div class="comment"><p>Array of diagnostics or <code>undefined</code></p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="DiagnosticCollection.set"></a><span class="ts" id=1046 data-target="#details-1046" data-toggle="collapse"><span class="ident">set</span><span>(</span><span class="ident">entries</span><span>: </span>[<a class="type-ref" href="#Uri">Uri</a>, <a class="type-ref" href="#Diagnostic">Diagnostic</a>[] &#124; <a class="type-intrinsic">undefined</a>][]<span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1046">
<div class="comment"><p>Replace all entries in this collection.</p>
<p>Diagnostics of multiple tuples of the same uri will be merged, e.g
<code>[[file1, [d1]], [file1, [d2]]]</code> is equivalent to <code>[[file1, [d1, d2]]]</code>.
If a diagnostics item is <code>undefined</code> as in <code>[file1, undefined]</code>
all previous but not subsequent diagnostics are removed.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="entries"></a><span class="ts" id=1047 data-target="#details-1047" data-toggle="collapse"><span class="ident">entries</span><span>: </span>[<a class="type-ref" href="#Uri">Uri</a>, <a class="type-ref" href="#Diagnostic">Diagnostic</a>[] &#124; <a class="type-intrinsic">undefined</a>][]</span></td><td><div class="comment"><p>An array of tuples, like <code>[[file1, [d1, d2]], [file2, [d3, d4, d5]]]</code>, or <code>undefined</code>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="DiagnosticSeverity"></a><span class="code-item" id=1024>DiagnosticSeverity</span>



<div class="comment"><p>Represents the severity of diagnostics.</p>
</div>

#### Enumeration members



<a name="DiagnosticSeverity.Error"></a><span class="ts" id=1025 data-target="#details-1025" data-toggle="collapse"><span class="ident">Error</span></span>
<div class="details collapse" id="details-1025">
<em>0</em>
</div>



<a name="DiagnosticSeverity.Hint"></a><span class="ts" id=1028 data-target="#details-1028" data-toggle="collapse"><span class="ident">Hint</span></span>
<div class="details collapse" id="details-1028">
<em>3</em>
</div>



<a name="DiagnosticSeverity.Information"></a><span class="ts" id=1027 data-target="#details-1027" data-toggle="collapse"><span class="ident">Information</span></span>
<div class="details collapse" id="details-1027">
<em>2</em>
</div>



<a name="DiagnosticSeverity.Warning"></a><span class="ts" id=1026 data-target="#details-1026" data-toggle="collapse"><span class="ident">Warning</span></span>
<div class="details collapse" id="details-1026">
<em>1</em>
</div>

### <a name="Disposable"></a><span class="code-item" id=416>Disposable</span>



<div class="comment"><p>Represents a type which can release resources, such
as event listening or a timer.</p>
</div>

#### Static



<a name="Disposable.from"></a><span class="ts" id=418 data-target="#details-418" data-toggle="collapse"><span class="ident">from</span><span>(</span><span>...</span><span class="ident">disposableLikes</span><span>: </span>{dispose: () =&gt; <a class="type-intrinsic">any</a>}[]<span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-418">
<div class="comment"><p>Combine many disposable-likes into one. Use this method
when having objects with a dispose function which are not
instances of Disposable.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="disposableLikes"></a><span class="ts" id=419 data-target="#details-419" data-toggle="collapse"><span>...</span><span class="ident">disposableLikes</span><span>: </span>{dispose: () =&gt; <a class="type-intrinsic">any</a>}[]</span></td><td><div class="comment"><p>Objects that have at least a <code>dispose</code>-function member.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>Returns a new disposable which, upon dispose, will
dispose all provided disposables.</p>
</div></td></tr>
</table>
</div>
</div>

#### Constructors



<a name="Disposable.new Disposable"></a><span class="ts" id=425 data-target="#details-425" data-toggle="collapse"><span class="ident">new Disposable</span><span>(</span><span class="ident">callOnDispose</span><span>: </span><a class="type-ref" href="#Function">Function</a><span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-425">
<div class="comment"><p>Creates a new Disposable calling the provided function
on dispose.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="callOnDispose"></a><span class="ts" id=426 data-target="#details-426" data-toggle="collapse"><span class="ident">callOnDispose</span><span>: </span><a class="type-ref" href="#Function">Function</a></span></td><td><div class="comment"><p>Function that disposes something.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Methods



<a name="Disposable.dispose"></a><span class="ts" id=428 data-target="#details-428" data-toggle="collapse"><span class="ident">dispose</span><span>(</span><span>)</span><span>: </span><a class="type-intrinsic">any</a></span>
<div class="details collapse" id="details-428">
<div class="comment"><p>Dispose this object.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">any</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="DocumentColorProvider"></a><span class="code-item" id=928>DocumentColorProvider</span>



<div class="comment"><p>The document color provider defines the contract between extensions and feature of
picking and modifying colors in the editor.</p>
</div>

#### Methods



<a name="DocumentColorProvider.provideColorPresentations"></a><span class="ts" id=934 data-target="#details-934" data-toggle="collapse"><span class="ident">provideColorPresentations</span><span>(</span><span class="ident">color</span><span>: </span><a class="type-ref" href="#Color">Color</a>, <span class="ident">context</span><span>: </span>{document: <a class="type-ref" href="#TextDocument">TextDocument</a>, range: <a class="type-ref" href="#Range">Range</a>}, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#ColorPresentation">ColorPresentation</a>[]&gt;</span>
<div class="details collapse" id="details-934">
<div class="comment"><p>Provide <a href="#ColorPresentation">representations</a> for a color.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="color"></a><span class="ts" id=935 data-target="#details-935" data-toggle="collapse"><span class="ident">color</span><span>: </span><a class="type-ref" href="#Color">Color</a></span></td><td><div class="comment"><p>The color to show and insert.</p>
</div></td></tr>
<tr><td><a name="context"></a><span class="ts" id=936 data-target="#details-936" data-toggle="collapse"><span class="ident">context</span><span>: </span>{document: <a class="type-ref" href="#TextDocument">TextDocument</a>, range: <a class="type-ref" href="#Range">Range</a>}</span></td><td><div class="comment"><p>A context object with additional information</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=940 data-target="#details-940" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#ColorPresentation">ColorPresentation</a>[]&gt;</span></td><td><div class="comment"><p>An array of color presentations or a thenable that resolves to such. The lack of a result
can be signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="DocumentColorProvider.provideDocumentColors"></a><span class="ts" id=930 data-target="#details-930" data-toggle="collapse"><span class="ident">provideDocumentColors</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#ColorInformation">ColorInformation</a>[]&gt;</span>
<div class="details collapse" id="details-930">
<div class="comment"><p>Provide colors for the given document.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=931 data-target="#details-931" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=932 data-target="#details-932" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#ColorInformation">ColorInformation</a>[]&gt;</span></td><td><div class="comment"><p>An array of <a href="#ColorInformation">color informations</a> or a thenable that resolves to such. The lack of a result
can be signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="DocumentFilter"></a><span class="code-item" id=525>DocumentFilter</span>



<div class="comment"><p>A document filter denotes a document by different properties like
the <a href="#TextDocument.languageId">language</a>, the <a href="#Uri.scheme">scheme</a> of
its resource, or a glob-pattern that is applied to the <a href="#TextDocument.fileName">path</a>.</p>
<ul>
<li><em>sample</em> - A language filter that applies to typescript files on disk: <code>{ language: &#39;typescript&#39;, scheme: &#39;file&#39; }</code></li>
</ul>
<ul>
<li><em>sample</em> - A language filter that applies to all package.json paths: <code>{ language: &#39;json&#39;, pattern: &#39;**∕package.json&#39; }</code></li>
</ul>
</div>

#### Properties



<a name="DocumentFilter.language"></a><span class="ts" id=526 data-target="#details-526" data-toggle="collapse"><span class="ident">language</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-526">
<div class="comment"><p>A language id, like <code>typescript</code>.</p>
</div>
</div>



<a name="DocumentFilter.pattern"></a><span class="ts" id=528 data-target="#details-528" data-toggle="collapse"><span class="ident">pattern</span><span>?</span><span>: </span><a class="type-ref" href="#GlobPattern">GlobPattern</a></span>
<div class="details collapse" id="details-528">
<div class="comment"><p>A <a href="#GlobPattern">glob pattern</a> that is matched on the absolute path of the document. Use a <a href="#RelativePattern">relative pattern</a>
to filter documents to a <a href="#WorkspaceFolder">workspace folder</a>.</p>
</div>
</div>



<a name="DocumentFilter.scheme"></a><span class="ts" id=527 data-target="#details-527" data-toggle="collapse"><span class="ident">scheme</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-527">
<div class="comment"><p>A Uri <a href="#Uri.scheme">scheme</a>, like <code>file</code> or <code>untitled</code>.</p>
</div>
</div>

### <a name="DocumentFormattingEditProvider"></a><span class="code-item" id=774>DocumentFormattingEditProvider</span>



<div class="comment"><p>The document formatting provider interface defines the contract between extensions and
the formatting-feature.</p>
</div>

#### Methods



<a name="DocumentFormattingEditProvider.provideDocumentFormattingEdits"></a><span class="ts" id=776 data-target="#details-776" data-toggle="collapse"><span class="ident">provideDocumentFormattingEdits</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">options</span><span>: </span><a class="type-ref" href="#FormattingOptions">FormattingOptions</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#TextEdit">TextEdit</a>[]&gt;</span>
<div class="details collapse" id="details-776">
<div class="comment"><p>Provide formatting edits for a whole document.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=777 data-target="#details-777" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=778 data-target="#details-778" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#FormattingOptions">FormattingOptions</a></span></td><td><div class="comment"><p>Options controlling formatting.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=779 data-target="#details-779" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#TextEdit">TextEdit</a>[]&gt;</span></td><td><div class="comment"><p>A set of text edits or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="DocumentHighlight"></a><span class="code-item" id=607>DocumentHighlight</span>



<div class="comment"><p>A document highlight is a range inside a text document which deserves
special attention. Usually a document highlight is visualized by changing
the background color of its range.</p>
</div>

#### Constructors



<a name="DocumentHighlight.new DocumentHighlight"></a><span class="ts" id=611 data-target="#details-611" data-toggle="collapse"><span class="ident">new DocumentHighlight</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">kind</span><span>?</span><span>: </span><a class="type-ref" href="#DocumentHighlightKind">DocumentHighlightKind</a><span>)</span><span>: </span><a class="type-ref" href="#DocumentHighlight">DocumentHighlight</a></span>
<div class="details collapse" id="details-611">
<div class="comment"><p>Creates a new document highlight object.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=612 data-target="#details-612" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>The range the highlight applies to.</p>
</div></td></tr>
<tr><td><a name="kind"></a><span class="ts" id=613 data-target="#details-613" data-toggle="collapse"><span class="ident">kind</span><span>?</span><span>: </span><a class="type-ref" href="#DocumentHighlightKind">DocumentHighlightKind</a></span></td><td><div class="comment"><p>The highlight kind, default is <a href="#DocumentHighlightKind.Text">text</a>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#DocumentHighlight">DocumentHighlight</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="DocumentHighlight.kind"></a><span class="ts" id=609 data-target="#details-609" data-toggle="collapse"><span class="ident">kind</span><span>?</span><span>: </span><a class="type-ref" href="#DocumentHighlightKind">DocumentHighlightKind</a></span>
<div class="details collapse" id="details-609">
<div class="comment"><p>The highlight kind, default is <a href="#DocumentHighlightKind.Text">text</a>.</p>
</div>
</div>



<a name="DocumentHighlight.range"></a><span class="ts" id=608 data-target="#details-608" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-608">
<div class="comment"><p>The range this highlight applies to.</p>
</div>
</div>

### <a name="DocumentHighlightKind"></a><span class="code-item" id=603>DocumentHighlightKind</span>



<div class="comment"><p>A document highlight kind.</p>
</div>

#### Enumeration members



<a name="DocumentHighlightKind.Read"></a><span class="ts" id=605 data-target="#details-605" data-toggle="collapse"><span class="ident">Read</span></span>
<div class="details collapse" id="details-605">
<em>1</em>
</div>



<a name="DocumentHighlightKind.Text"></a><span class="ts" id=604 data-target="#details-604" data-toggle="collapse"><span class="ident">Text</span></span>
<div class="details collapse" id="details-604">
<em>0</em>
</div>



<a name="DocumentHighlightKind.Write"></a><span class="ts" id=606 data-target="#details-606" data-toggle="collapse"><span class="ident">Write</span></span>
<div class="details collapse" id="details-606">
<em>2</em>
</div>

### <a name="DocumentHighlightProvider"></a><span class="code-item" id=614>DocumentHighlightProvider</span>



<div class="comment"><p>The document highlight provider interface defines the contract between extensions and
the word-highlight-feature.</p>
</div>

#### Methods



<a name="DocumentHighlightProvider.provideDocumentHighlights"></a><span class="ts" id=616 data-target="#details-616" data-toggle="collapse"><span class="ident">provideDocumentHighlights</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#DocumentHighlight">DocumentHighlight</a>[]&gt;</span>
<div class="details collapse" id="details-616">
<div class="comment"><p>Provide a set of document highlights, like all occurrences of a variable or
all exit-points of a function.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=617 data-target="#details-617" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="position"></a><span class="ts" id=618 data-target="#details-618" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The position at which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=619 data-target="#details-619" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#DocumentHighlight">DocumentHighlight</a>[]&gt;</span></td><td><div class="comment"><p>An array of document highlights or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="DocumentLink"></a><span class="code-item" id=887>DocumentLink</span>



<div class="comment"><p>A document link is a range in a text document that links to an internal or external resource, like another
text document or a web site.</p>
</div>

#### Constructors



<a name="DocumentLink.new DocumentLink"></a><span class="ts" id=891 data-target="#details-891" data-toggle="collapse"><span class="ident">new DocumentLink</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">target</span><span>?</span><span>: </span><a class="type-ref" href="#Uri">Uri</a><span>)</span><span>: </span><a class="type-ref" href="#DocumentLink">DocumentLink</a></span>
<div class="details collapse" id="details-891">
<div class="comment"><p>Creates a new document link.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=892 data-target="#details-892" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>The range the document link applies to. Must not be empty.</p>
</div></td></tr>
<tr><td><a name="target"></a><span class="ts" id=893 data-target="#details-893" data-toggle="collapse"><span class="ident">target</span><span>?</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>The uri the document link points to.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#DocumentLink">DocumentLink</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="DocumentLink.range"></a><span class="ts" id=888 data-target="#details-888" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-888">
<div class="comment"><p>The range this link applies to.</p>
</div>
</div>



<a name="DocumentLink.target"></a><span class="ts" id=889 data-target="#details-889" data-toggle="collapse"><span class="ident">target</span><span>?</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span>
<div class="details collapse" id="details-889">
<div class="comment"><p>The uri this link points to.</p>
</div>
</div>

### <a name="DocumentLinkProvider"></a><span class="code-item" id=894>DocumentLinkProvider</span>



<div class="comment"><p>The document link provider defines the contract between extensions and feature of showing
links in the editor.</p>
</div>

#### Methods



<a name="DocumentLinkProvider.provideDocumentLinks"></a><span class="ts" id=896 data-target="#details-896" data-toggle="collapse"><span class="ident">provideDocumentLinks</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#DocumentLink">DocumentLink</a>[]&gt;</span>
<div class="details collapse" id="details-896">
<div class="comment"><p>Provide links for the given document. Note that the editor ships with a default provider that detects
<code>http(s)</code> and <code>file</code> links.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=897 data-target="#details-897" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=898 data-target="#details-898" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#DocumentLink">DocumentLink</a>[]&gt;</span></td><td><div class="comment"><p>An array of <a href="#DocumentLink">document links</a> or a thenable that resolves to such. The lack of a result
can be signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="DocumentLinkProvider.resolveDocumentLink"></a><span class="ts" id=900 data-target="#details-900" data-toggle="collapse"><span class="ident">resolveDocumentLink</span><span>(</span><span class="ident">link</span><span>: </span><a class="type-ref" href="#DocumentLink">DocumentLink</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#DocumentLink">DocumentLink</a>&gt;</span>
<div class="details collapse" id="details-900">
<div class="comment"><p>Given a link fill in its <a href="#DocumentLink.target">target</a>. This method is called when an incomplete
link is selected in the UI. Providers can implement this method and return incomple links
(without target) from the <a href="#DocumentLinkProvider.provideDocumentLinks"><code>provideDocumentLinks</code></a> method which
often helps to improve performance.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="link"></a><span class="ts" id=901 data-target="#details-901" data-toggle="collapse"><span class="ident">link</span><span>: </span><a class="type-ref" href="#DocumentLink">DocumentLink</a></span></td><td><div class="comment"><p>The link that is to be resolved.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=902 data-target="#details-902" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#DocumentLink">DocumentLink</a>&gt;</span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="DocumentRangeFormattingEditProvider"></a><span class="code-item" id=780>DocumentRangeFormattingEditProvider</span>



<div class="comment"><p>The document formatting provider interface defines the contract between extensions and
the formatting-feature.</p>
</div>

#### Methods



<a name="DocumentRangeFormattingEditProvider.provideDocumentRangeFormattingEdits"></a><span class="ts" id=782 data-target="#details-782" data-toggle="collapse"><span class="ident">provideDocumentRangeFormattingEdits</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">options</span><span>: </span><a class="type-ref" href="#FormattingOptions">FormattingOptions</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#TextEdit">TextEdit</a>[]&gt;</span>
<div class="details collapse" id="details-782">
<div class="comment"><p>Provide formatting edits for a range in a document.</p>
<p>The given range is a hint and providers can decide to format a smaller
or larger range. Often this is done by adjusting the start and end
of the range to full syntax nodes.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=783 data-target="#details-783" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="range"></a><span class="ts" id=784 data-target="#details-784" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>The range which should be formatted.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=785 data-target="#details-785" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#FormattingOptions">FormattingOptions</a></span></td><td><div class="comment"><p>Options controlling formatting.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=786 data-target="#details-786" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#TextEdit">TextEdit</a>[]&gt;</span></td><td><div class="comment"><p>A set of text edits or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="DocumentSelector"></a><span class="code-item" id=1404>DocumentSelector</span>



<div class="comment"><p>A language selector is the combination of one or many language identifiers
and <a href="#DocumentFilter">language filters</a>.</p>
<ul>
<li><em>sample</em> - <code>let sel:DocumentSelector = &#39;typescript&#39;</code>;</li>
</ul>
<ul>
<li><em>sample</em> - <code>let sel:DocumentSelector = [&#39;typescript&#39;, { language: &#39;json&#39;, pattern: &#39;**∕tsconfig.json&#39; }]</code>;</li>
</ul>
</div>



<a name="DocumentSelector"></a><span class="ts" id=1404 data-target="#details-1404" data-toggle="collapse"><span class="ident">DocumentSelector</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#DocumentFilter">DocumentFilter</a> &#124; <a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#DocumentFilter">DocumentFilter</a>[]</span>

### <a name="DocumentSymbolProvider"></a><span class="code-item" id=664>DocumentSymbolProvider</span>



<div class="comment"><p>The document symbol provider interface defines the contract between extensions and
the <a href="https://code.visualstudio.com/docs/editor/editingevolved#_go-to-symbol">go to symbol</a>-feature.</p>
</div>

#### Methods



<a name="DocumentSymbolProvider.provideDocumentSymbols"></a><span class="ts" id=666 data-target="#details-666" data-toggle="collapse"><span class="ident">provideDocumentSymbols</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#SymbolInformation">SymbolInformation</a>[]&gt;</span>
<div class="details collapse" id="details-666">
<div class="comment"><p>Provide symbol information for the given document.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=667 data-target="#details-667" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=668 data-target="#details-668" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#SymbolInformation">SymbolInformation</a>[]&gt;</span></td><td><div class="comment"><p>An array of document highlights or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="EndOfLine"></a><span class="code-item" id=355>EndOfLine</span>



<div class="comment"><p>Represents an end of line character sequence in a <a href="#TextDocument">document</a>.</p>
</div>

#### Enumeration members



<a name="EndOfLine.CRLF"></a><span class="ts" id=357 data-target="#details-357" data-toggle="collapse"><span class="ident">CRLF</span></span>
<div class="details collapse" id="details-357">
<em>2</em>
</div>



<a name="EndOfLine.LF"></a><span class="ts" id=356 data-target="#details-356" data-toggle="collapse"><span class="ident">LF</span></span>
<div class="details collapse" id="details-356">
<em>1</em>
</div>

### <a name="EnterAction"></a><span class="code-item" id=954>EnterAction</span>



<div class="comment"><p>Describes what to do when pressing Enter.</p>
</div>

#### Properties



<a name="EnterAction.appendText"></a><span class="ts" id=956 data-target="#details-956" data-toggle="collapse"><span class="ident">appendText</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-956">
<div class="comment"><p>Describes text to be appended after the new line and after the indentation.</p>
</div>
</div>



<a name="EnterAction.indentAction"></a><span class="ts" id=955 data-target="#details-955" data-toggle="collapse"><span class="ident">indentAction</span><span>: </span><a class="type-ref" href="#IndentAction">IndentAction</a></span>
<div class="details collapse" id="details-955">
<div class="comment"><p>Describe what to do with the indentation.</p>
</div>
</div>



<a name="EnterAction.removeText"></a><span class="ts" id=957 data-target="#details-957" data-toggle="collapse"><span class="ident">removeText</span><span>?</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-957">
<div class="comment"><p>Describes the number of characters to remove from the new line&#39;s indentation.</p>
</div>
</div>

### <a name="Event"></a><span class="code-item" id=429>Event&lt;T&gt;</span>



<div class="comment"><p>Represents a typed event.</p>
<p>A function that represents an event to which you subscribe by calling it with
a listener function as argument.</p>
<ul>
<li><em>sample</em> - <code>item.onDidChange(function(event) { console.log(&quot;Event happened: &quot; + event); });</code></li>
</ul>
</div>



<a name="__call"></a><span class="ts" id=431 data-target="#details-431" data-toggle="collapse"><span>(</span><span class="ident">listener</span><span>: </span>(e: <a class="type-intrinsic">T</a>) =&gt; <a class="type-intrinsic">any</a>, <span class="ident">thisArgs</span><span>?</span><span>: </span><a class="type-intrinsic">any</a>, <span class="ident">disposables</span><span>?</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-431">
<div class="comment"><p>A function that represents an event to which you subscribe by calling it with
a listener function as argument.</p>
<p>A function that represents an event to which you subscribe by calling it with
a listener function as argument.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="listener"></a><span class="ts" id=432 data-target="#details-432" data-toggle="collapse"><span class="ident">listener</span><span>: </span>(e: <a class="type-intrinsic">T</a>) =&gt; <a class="type-intrinsic">any</a></span></td><td><div class="comment"><p>The listener function will be called when the event happens.</p>
</div></td></tr>
<tr><td><a name="thisArgs"></a><span class="ts" id=436 data-target="#details-436" data-toggle="collapse"><span class="ident">thisArgs</span><span>?</span><span>: </span><a class="type-intrinsic">any</a></span></td><td><div class="comment"><p>The <code>this</code>-argument which will be used when calling the event listener.</p>
</div></td></tr>
<tr><td><a name="disposables"></a><span class="ts" id=437 data-target="#details-437" data-toggle="collapse"><span class="ident">disposables</span><span>?</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a>[]</span></td><td><div class="comment"><p>An array to which a <a href="#Disposable">disposable</a> will be added.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>A disposable which unsubscribes the event listener.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="EventEmitter"></a><span class="code-item" id=438>EventEmitter&lt;T&gt;</span>



<div class="comment"><p>An event emitter can be used to create and manage an <a href="#Event">event</a> for others
to subscribe to. One emitter always owns one event.</p>
<p>Use this class if you want to provide event from within your extension, for instance
inside a <a href="#TextDocumentContentProvider">TextDocumentContentProvider</a> or when providing
API to other extensions.</p>
</div>

#### Properties



<a name="EventEmitter.event"></a><span class="ts" id=440 data-target="#details-440" data-toggle="collapse"><span class="ident">event</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-intrinsic">T</a>&gt;</span>
<div class="details collapse" id="details-440">
<div class="comment"><p>The event listeners can subscribe to.</p>
</div>
</div>

#### Methods



<a name="EventEmitter.dispose"></a><span class="ts" id=445 data-target="#details-445" data-toggle="collapse"><span class="ident">dispose</span><span>(</span><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-445">
<div class="comment"><p>Dispose this object and free resources.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="EventEmitter.fire"></a><span class="ts" id=442 data-target="#details-442" data-toggle="collapse"><span class="ident">fire</span><span>(</span><span class="ident">data</span><span>?</span><span>: </span><a class="type-intrinsic">T</a><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-442">
<div class="comment"><p>Notify all subscribers of the <a href="EventEmitter#event">event</a>. Failure
of one or more listener will not fail this function call.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="data"></a><span class="ts" id=443 data-target="#details-443" data-toggle="collapse"><span class="ident">data</span><span>?</span><span>: </span><a class="type-intrinsic">T</a></span></td><td><div class="comment"><p>The event object.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="Extension"></a><span class="code-item" id=1130>Extension&lt;T&gt;</span>



<div class="comment"><p>Represents an extension.</p>
<p>To get an instance of an <code>Extension</code> use <a href="#extensions.getExtension">getExtension</a>.</p>
</div>

#### Properties



<a name="Extension.exports"></a><span class="ts" id=1136 data-target="#details-1136" data-toggle="collapse"><span class="ident">exports</span><span>: </span><a class="type-intrinsic">T</a></span>
<div class="details collapse" id="details-1136">
<div class="comment"><p>The public API exported by this extension. It is an invalid action
to access this field before this extension has been activated.</p>
</div>
</div>



<a name="Extension.extensionPath"></a><span class="ts" id=1133 data-target="#details-1133" data-toggle="collapse"><span class="ident">extensionPath</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1133">
<div class="comment"><p>The absolute file path of the directory containing this extension.</p>
</div>
</div>



<a name="Extension.id"></a><span class="ts" id=1132 data-target="#details-1132" data-toggle="collapse"><span class="ident">id</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1132">
<div class="comment"><p>The canonical extension identifier in the form of: <code>publisher.name</code>.</p>
</div>
</div>



<a name="Extension.isActive"></a><span class="ts" id=1134 data-target="#details-1134" data-toggle="collapse"><span class="ident">isActive</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-1134">
<div class="comment"><p><code>true</code> if the extension has been activated.</p>
</div>
</div>



<a name="Extension.packageJSON"></a><span class="ts" id=1135 data-target="#details-1135" data-toggle="collapse"><span class="ident">packageJSON</span><span>: </span><a class="type-intrinsic">any</a></span>
<div class="details collapse" id="details-1135">
<div class="comment"><p>The parsed contents of the extension&#39;s package.json.</p>
</div>
</div>

#### Methods



<a name="Extension.activate"></a><span class="ts" id=1138 data-target="#details-1138" data-toggle="collapse"><span class="ident">activate</span><span>(</span><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">T</a>&gt;</span>
<div class="details collapse" id="details-1138">
<div class="comment"><p>Activates this extension and returns its public API.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">T</a>&gt;</span></td><td><div class="comment"><p>A promise that will resolve when this extension has been activated.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="ExtensionContext"></a><span class="code-item" id=1139>ExtensionContext</span>



<div class="comment"><p>An extension context is a collection of utilities private to an
extension.</p>
<p>An instance of an <code>ExtensionContext</code> is provided as the first
parameter to the <code>activate</code>-call of an extension.</p>
</div>

#### Properties



<a name="ExtensionContext.extensionPath"></a><span class="ts" id=1146 data-target="#details-1146" data-toggle="collapse"><span class="ident">extensionPath</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1146">
<div class="comment"><p>The absolute file path of the directory containing the extension.</p>
</div>
</div>



<a name="ExtensionContext.globalState"></a><span class="ts" id=1145 data-target="#details-1145" data-toggle="collapse"><span class="ident">globalState</span><span>: </span><a class="type-ref" href="#Memento">Memento</a></span>
<div class="details collapse" id="details-1145">
<div class="comment"><p>A memento object that stores state independent
of the current opened <a href="#workspace.workspaceFolders">workspace</a>.</p>
</div>
</div>



<a name="ExtensionContext.storagePath"></a><span class="ts" id=1150 data-target="#details-1150" data-toggle="collapse"><span class="ident">storagePath</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a></span>
<div class="details collapse" id="details-1150">
<div class="comment"><p>An absolute file path of a workspace specific directory in which the extension
can store private state. The directory might not exist on disk and creation is
up to the extension. However, the parent directory is guaranteed to be existent.</p>
<p>Use <a href="#ExtensionContext.workspaceState"><code>workspaceState</code></a> or
<a href="#ExtensionContext.globalState"><code>globalState</code></a> to store key value data.</p>
</div>
</div>



<a name="ExtensionContext.subscriptions"></a><span class="ts" id=1140 data-target="#details-1140" data-toggle="collapse"><span class="ident">subscriptions</span><span>: </span>{dispose}[]</span>
<div class="details collapse" id="details-1140">
<div class="comment"><p>An array to which disposables can be added. When this
extension is deactivated the disposables will be disposed.</p>
</div>
</div>



<a name="ExtensionContext.workspaceState"></a><span class="ts" id=1144 data-target="#details-1144" data-toggle="collapse"><span class="ident">workspaceState</span><span>: </span><a class="type-ref" href="#Memento">Memento</a></span>
<div class="details collapse" id="details-1144">
<div class="comment"><p>A memento object that stores state in the context
of the currently opened <a href="#workspace.workspaceFolders">workspace</a>.</p>
</div>
</div>

#### Methods



<a name="ExtensionContext.asAbsolutePath"></a><span class="ts" id=1148 data-target="#details-1148" data-toggle="collapse"><span class="ident">asAbsolutePath</span><span>(</span><span class="ident">relativePath</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1148">
<div class="comment"><p>Get the absolute path of a resource contained in the extension.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="relativePath"></a><span class="ts" id=1149 data-target="#details-1149" data-toggle="collapse"><span class="ident">relativePath</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A relative path to a resource contained in the extension.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The absolute path of the resource.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="FileSystemWatcher"></a><span class="code-item" id=446>FileSystemWatcher</span>



<div class="comment"><p>A file system watcher notifies about changes to files and folders
on disk.</p>
<p>To get an instance of a <code>FileSystemWatcher</code> use
<a href="#workspace.createFileSystemWatcher">createFileSystemWatcher</a>.</p>
</div>

#### Events



<a name="FileSystemWatcher.onDidChange"></a><span class="ts" id=451 data-target="#details-451" data-toggle="collapse"><span class="ident">onDidChange</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#Uri">Uri</a>&gt;</span>
<div class="details collapse" id="details-451">
<div class="comment"><p>An event which fires on file/folder change.</p>
</div>
</div>



<a name="FileSystemWatcher.onDidCreate"></a><span class="ts" id=450 data-target="#details-450" data-toggle="collapse"><span class="ident">onDidCreate</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#Uri">Uri</a>&gt;</span>
<div class="details collapse" id="details-450">
<div class="comment"><p>An event which fires on file/folder creation.</p>
</div>
</div>



<a name="FileSystemWatcher.onDidDelete"></a><span class="ts" id=452 data-target="#details-452" data-toggle="collapse"><span class="ident">onDidDelete</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#Uri">Uri</a>&gt;</span>
<div class="details collapse" id="details-452">
<div class="comment"><p>An event which fires on file/folder deletion.</p>
</div>
</div>

#### Static



<a name="FileSystemWatcher.from"></a><span class="ts" id=454 data-target="#details-454" data-toggle="collapse"><span class="ident">from</span><span>(</span><span>...</span><span class="ident">disposableLikes</span><span>: </span>{dispose: () =&gt; <a class="type-intrinsic">any</a>}[]<span>)</span><span>: </span><a class="type-ref" href="#Disposable">Disposable</a></span>
<div class="details collapse" id="details-454">
<div class="comment"><p>Combine many disposable-likes into one. Use this method
when having objects with a dispose function which are not
instances of Disposable.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="disposableLikes"></a><span class="ts" id=455 data-target="#details-455" data-toggle="collapse"><span>...</span><span class="ident">disposableLikes</span><span>: </span>{dispose: () =&gt; <a class="type-intrinsic">any</a>}[]</span></td><td><div class="comment"><p>Objects that have at least a <code>dispose</code>-function member.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Disposable">Disposable</a></span></td><td><div class="comment"><p>Returns a new disposable which, upon dispose, will
dispose all provided disposables.</p>
</div></td></tr>
</table>
</div>
</div>

#### Constructors



<a name="FileSystemWatcher.new FileSystemWatcher"></a><span class="ts" id=461 data-target="#details-461" data-toggle="collapse"><span class="ident">new FileSystemWatcher</span><span>(</span><span class="ident">callOnDispose</span><span>: </span><a class="type-ref" href="#Function">Function</a><span>)</span><span>: </span><a class="type-ref" href="#FileSystemWatcher">FileSystemWatcher</a></span>
<div class="details collapse" id="details-461">
<div class="comment"><p>Creates a new Disposable calling the provided function
on dispose.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="callOnDispose"></a><span class="ts" id=462 data-target="#details-462" data-toggle="collapse"><span class="ident">callOnDispose</span><span>: </span><a class="type-ref" href="#Function">Function</a></span></td><td><div class="comment"><p>Function that disposes something.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#FileSystemWatcher">FileSystemWatcher</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="FileSystemWatcher.ignoreChangeEvents"></a><span class="ts" id=448 data-target="#details-448" data-toggle="collapse"><span class="ident">ignoreChangeEvents</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-448">
<div class="comment"><p>true if this file system watcher has been created such that
it ignores change file system events.</p>
</div>
</div>



<a name="FileSystemWatcher.ignoreCreateEvents"></a><span class="ts" id=447 data-target="#details-447" data-toggle="collapse"><span class="ident">ignoreCreateEvents</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-447">
<div class="comment"><p>true if this file system watcher has been created such that
it ignores creation file system events.</p>
</div>
</div>



<a name="FileSystemWatcher.ignoreDeleteEvents"></a><span class="ts" id=449 data-target="#details-449" data-toggle="collapse"><span class="ident">ignoreDeleteEvents</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-449">
<div class="comment"><p>true if this file system watcher has been created such that
it ignores delete file system events.</p>
</div>
</div>

#### Methods



<a name="FileSystemWatcher.dispose"></a><span class="ts" id=464 data-target="#details-464" data-toggle="collapse"><span class="ident">dispose</span><span>(</span><span>)</span><span>: </span><a class="type-intrinsic">any</a></span>
<div class="details collapse" id="details-464">
<div class="comment"><p>Dispose this object.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">any</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="FormattingOptions"></a><span class="code-item" id=769>FormattingOptions</span>



<div class="comment"><p>Value-object describing what options formatting should use.</p>
</div>

#### Properties



<a name="FormattingOptions.insertSpaces"></a><span class="ts" id=771 data-target="#details-771" data-toggle="collapse"><span class="ident">insertSpaces</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-771">
<div class="comment"><p>Prefer spaces over tabs.</p>
</div>
</div>



<a name="FormattingOptions.tabSize"></a><span class="ts" id=770 data-target="#details-770" data-toggle="collapse"><span class="ident">tabSize</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-770">
<div class="comment"><p>Size of a tab in spaces.</p>
</div>
</div>

### <a name="GlobPattern"></a><span class="code-item" id=1403>GlobPattern</span>



<div class="comment"><p>A file glob pattern to match file paths against. This can either be a glob pattern string
(like <code>**∕*.{ts,js}</code> or <code>*.{ts,js}</code>) or a <a href="#RelativePattern">relative pattern</a>.</p>
</div>



<a name="GlobPattern"></a><span class="ts" id=1403 data-target="#details-1403" data-toggle="collapse"><span class="ident">GlobPattern</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#RelativePattern">RelativePattern</a></span>

### <a name="Hover"></a><span class="code-item" id=590>Hover</span>



<div class="comment"><p>A hover represents additional information for a symbol or word. Hovers are
rendered in a tooltip-like widget.</p>
</div>

#### Constructors



<a name="Hover.new Hover"></a><span class="ts" id=594 data-target="#details-594" data-toggle="collapse"><span class="ident">new Hover</span><span>(</span><span class="ident">contents</span><span>: </span><a class="type-ref" href="#MarkedString">MarkedString</a> &#124; <a class="type-ref" href="#MarkedString">MarkedString</a>[], <span class="ident">range</span><span>?</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-ref" href="#Hover">Hover</a></span>
<div class="details collapse" id="details-594">
<div class="comment"><p>Creates a new hover object.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="contents"></a><span class="ts" id=595 data-target="#details-595" data-toggle="collapse"><span class="ident">contents</span><span>: </span><a class="type-ref" href="#MarkedString">MarkedString</a> &#124; <a class="type-ref" href="#MarkedString">MarkedString</a>[]</span></td><td><div class="comment"><p>The contents of the hover.</p>
</div></td></tr>
<tr><td><a name="range"></a><span class="ts" id=596 data-target="#details-596" data-toggle="collapse"><span class="ident">range</span><span>?</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>The range to which the hover applies.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Hover">Hover</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="Hover.contents"></a><span class="ts" id=591 data-target="#details-591" data-toggle="collapse"><span class="ident">contents</span><span>: </span><a class="type-ref" href="#MarkedString">MarkedString</a>[]</span>
<div class="details collapse" id="details-591">
<div class="comment"><p>The contents of this hover.</p>
</div>
</div>



<a name="Hover.range"></a><span class="ts" id=592 data-target="#details-592" data-toggle="collapse"><span class="ident">range</span><span>?</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-592">
<div class="comment"><p>The range to which this hover applies. When missing, the
editor will use the range at the current position or the
current position itself.</p>
</div>
</div>

### <a name="HoverProvider"></a><span class="code-item" id=597>HoverProvider</span>



<div class="comment"><p>The hover provider interface defines the contract between extensions and
the <a href="https://code.visualstudio.com/docs/editor/intellisense">hover</a>-feature.</p>
</div>

#### Methods



<a name="HoverProvider.provideHover"></a><span class="ts" id=599 data-target="#details-599" data-toggle="collapse"><span class="ident">provideHover</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#Hover">Hover</a>&gt;</span>
<div class="details collapse" id="details-599">
<div class="comment"><p>Provide a hover for the given position and document. Multiple hovers at the same
position will be merged by the editor. A hover can have a range which defaults
to the word range at the position when omitted.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=600 data-target="#details-600" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="position"></a><span class="ts" id=601 data-target="#details-601" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The position at which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=602 data-target="#details-602" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#Hover">Hover</a>&gt;</span></td><td><div class="comment"><p>A hover or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code> or <code>null</code>.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="ImplementationProvider"></a><span class="code-item" id=562>ImplementationProvider</span>



<div class="comment"><p>The implemenetation provider interface defines the contract between extensions and
the go to implementation feature.</p>
</div>

#### Methods



<a name="ImplementationProvider.provideImplementation"></a><span class="ts" id=564 data-target="#details-564" data-toggle="collapse"><span class="ident">provideImplementation</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#Definition">Definition</a>&gt;</span>
<div class="details collapse" id="details-564">
<div class="comment"><p>Provide the implementations of the symbol at the given position and document.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=565 data-target="#details-565" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="position"></a><span class="ts" id=566 data-target="#details-566" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The position at which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=567 data-target="#details-567" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#Definition">Definition</a>&gt;</span></td><td><div class="comment"><p>A definition or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code> or <code>null</code>.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="IndentAction"></a><span class="code-item" id=949>IndentAction</span>



<div class="comment"><p>Describes what to do with the indentation when pressing Enter.</p>
</div>

#### Enumeration members



<a name="IndentAction.Indent"></a><span class="ts" id=951 data-target="#details-951" data-toggle="collapse"><span class="ident">Indent</span></span>
<div class="details collapse" id="details-951">
<em>1</em>
</div>



<a name="IndentAction.IndentOutdent"></a><span class="ts" id=952 data-target="#details-952" data-toggle="collapse"><span class="ident">IndentOutdent</span></span>
<div class="details collapse" id="details-952">
<em>2</em>
</div>



<a name="IndentAction.None"></a><span class="ts" id=950 data-target="#details-950" data-toggle="collapse"><span class="ident">None</span></span>
<div class="details collapse" id="details-950">
<em>0</em>
</div>



<a name="IndentAction.Outdent"></a><span class="ts" id=953 data-target="#details-953" data-toggle="collapse"><span class="ident">Outdent</span></span>
<div class="details collapse" id="details-953">
<em>3</em>
</div>

### <a name="IndentationRule"></a><span class="code-item" id=944>IndentationRule</span>



<div class="comment"><p>Describes indentation rules for a language.</p>
</div>

#### Properties



<a name="IndentationRule.decreaseIndentPattern"></a><span class="ts" id=945 data-target="#details-945" data-toggle="collapse"><span class="ident">decreaseIndentPattern</span><span>: </span><a class="type-ref" href="#RegExp">RegExp</a></span>
<div class="details collapse" id="details-945">
<div class="comment"><p>If a line matches this pattern, then all the lines after it should be unindendented once (until another rule matches).</p>
</div>
</div>



<a name="IndentationRule.increaseIndentPattern"></a><span class="ts" id=946 data-target="#details-946" data-toggle="collapse"><span class="ident">increaseIndentPattern</span><span>: </span><a class="type-ref" href="#RegExp">RegExp</a></span>
<div class="details collapse" id="details-946">
<div class="comment"><p>If a line matches this pattern, then all the lines after it should be indented once (until another rule matches).</p>
</div>
</div>



<a name="IndentationRule.indentNextLinePattern"></a><span class="ts" id=947 data-target="#details-947" data-toggle="collapse"><span class="ident">indentNextLinePattern</span><span>?</span><span>: </span><a class="type-ref" href="#RegExp">RegExp</a></span>
<div class="details collapse" id="details-947">
<div class="comment"><p>If a line matches this pattern, then <strong>only the next line</strong> after it should be indented once.</p>
</div>
</div>



<a name="IndentationRule.unIndentedLinePattern"></a><span class="ts" id=948 data-target="#details-948" data-toggle="collapse"><span class="ident">unIndentedLinePattern</span><span>?</span><span>: </span><a class="type-ref" href="#RegExp">RegExp</a></span>
<div class="details collapse" id="details-948">
<div class="comment"><p>If a line matches this pattern, then its indentation should not be changed and it should not be evaluated against the other rules.</p>
</div>
</div>

### <a name="InputBoxOptions"></a><span class="code-item" id=508>InputBoxOptions</span>



<div class="comment"><p>Options to configure the behavior of the input box UI.</p>
</div>

#### Properties



<a name="InputBoxOptions.ignoreFocusOut"></a><span class="ts" id=514 data-target="#details-514" data-toggle="collapse"><span class="ident">ignoreFocusOut</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-514">
<div class="comment"><p>Set to <code>true</code> to keep the input box open when focus moves to another part of the editor or to another window.</p>
</div>
</div>



<a name="InputBoxOptions.password"></a><span class="ts" id=513 data-target="#details-513" data-toggle="collapse"><span class="ident">password</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-513">
<div class="comment"><p>Set to <code>true</code> to show a password prompt that will not show the typed value.</p>
</div>
</div>



<a name="InputBoxOptions.placeHolder"></a><span class="ts" id=512 data-target="#details-512" data-toggle="collapse"><span class="ident">placeHolder</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-512">
<div class="comment"><p>An optional string to show as place holder in the input box to guide the user what to type.</p>
</div>
</div>



<a name="InputBoxOptions.prompt"></a><span class="ts" id=511 data-target="#details-511" data-toggle="collapse"><span class="ident">prompt</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-511">
<div class="comment"><p>The text to display underneath the input box.</p>
</div>
</div>



<a name="InputBoxOptions.value"></a><span class="ts" id=509 data-target="#details-509" data-toggle="collapse"><span class="ident">value</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-509">
<div class="comment"><p>The value to prefill in the input box.</p>
</div>
</div>



<a name="InputBoxOptions.valueSelection"></a><span class="ts" id=510 data-target="#details-510" data-toggle="collapse"><span class="ident">valueSelection</span><span>?</span><span>: </span>[<a class="type-intrinsic">number</a>, <a class="type-intrinsic">number</a>]</span>
<div class="details collapse" id="details-510">
<div class="comment"><p>Selection of the prefilled <a href="#InputBoxOptions.value"><code>value</code></a>. Defined as tuple of two number where the
first is the inclusive start index and the second the exclusive end index. When <code>undefined</code> the whole
word will be selected, when empty (start equals end) only the cursor will be set,
otherwise the defined range will be selected.</p>
</div>
</div>

#### Methods



<a name="InputBoxOptions.validateInput"></a><span class="ts" id=516 data-target="#details-516" data-toggle="collapse"><span class="ident">validateInput</span><span>(</span><span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a> &#124; <a class="type-intrinsic">null</a> &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a> &#124; <a class="type-intrinsic">null</a>&gt;</span>
<div class="details collapse" id="details-516">
<div class="comment"><p>An optional function that will be called to validate input and to give a hint
to the user.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="value"></a><span class="ts" id=517 data-target="#details-517" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The current value of the input box.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a> &#124; <a class="type-intrinsic">null</a> &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a> &#124; <a class="type-intrinsic">null</a>&gt;</span></td><td><div class="comment"><p>A human readable string which is presented as diagnostic message.
Return <code>undefined</code>, <code>null</code>, or the empty string when &#39;value&#39; is valid.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="LanguageConfiguration"></a><span class="code-item" id=962>LanguageConfiguration</span>



<div class="comment"><p>The language configuration interfaces defines the contract between extensions
and various editor features, like automatic bracket insertion, automatic indentation etc.</p>
</div>

#### Properties



<a name="LanguageConfiguration.___characterPairSupport"></a><span class="ts" id=977 data-target="#details-977" data-toggle="collapse"><span class="ident">___characterPairSupport</span><span>?</span><span>: </span>{autoClosingPairs: {close: <a class="type-intrinsic">string</a>, notIn: <a class="type-intrinsic">string</a>[], open: <a class="type-intrinsic">string</a>}[]}</span>
<div class="details collapse" id="details-977">
<div class="comment"><p><strong>Deprecated</strong> Do not use.</p>
<ul>
<li><em>deprecated</em> - * Use the the autoClosingPairs property in the language configuration file instead.</li>
</ul>
</div>
</div>



<a name="LanguageConfiguration.___electricCharacterSupport"></a><span class="ts" id=968 data-target="#details-968" data-toggle="collapse"><span class="ident">___electricCharacterSupport</span><span>?</span><span>: </span>{brackets: <a class="type-intrinsic">any</a>, docComment: {close: <a class="type-intrinsic">string</a>, lineStart: <a class="type-intrinsic">string</a>, open: <a class="type-intrinsic">string</a>, scope: <a class="type-intrinsic">string</a>}}</span>
<div class="details collapse" id="details-968">
<div class="comment"><p><strong>Deprecated</strong> Do not use.</p>
<ul>
<li><em>deprecated</em> - Will be replaced by a better API soon.</li>
</ul>
</div>
</div>



<a name="LanguageConfiguration.brackets"></a><span class="ts" id=964 data-target="#details-964" data-toggle="collapse"><span class="ident">brackets</span><span>?</span><span>: </span><a class="type-ref" href="#CharacterPair">CharacterPair</a>[]</span>
<div class="details collapse" id="details-964">
<div class="comment"><p>The language&#39;s brackets.
This configuration implicitly affects pressing Enter around these brackets.</p>
</div>
</div>



<a name="LanguageConfiguration.comments"></a><span class="ts" id=963 data-target="#details-963" data-toggle="collapse"><span class="ident">comments</span><span>?</span><span>: </span><a class="type-ref" href="#CommentRule">CommentRule</a></span>
<div class="details collapse" id="details-963">
<div class="comment"><p>The language&#39;s comment settings.</p>
</div>
</div>



<a name="LanguageConfiguration.indentationRules"></a><span class="ts" id=966 data-target="#details-966" data-toggle="collapse"><span class="ident">indentationRules</span><span>?</span><span>: </span><a class="type-ref" href="#IndentationRule">IndentationRule</a></span>
<div class="details collapse" id="details-966">
<div class="comment"><p>The language&#39;s indentation settings.</p>
</div>
</div>



<a name="LanguageConfiguration.onEnterRules"></a><span class="ts" id=967 data-target="#details-967" data-toggle="collapse"><span class="ident">onEnterRules</span><span>?</span><span>: </span><a class="type-ref" href="#OnEnterRule">OnEnterRule</a>[]</span>
<div class="details collapse" id="details-967">
<div class="comment"><p>The language&#39;s rules to be evaluated when pressing Enter.</p>
</div>
</div>



<a name="LanguageConfiguration.wordPattern"></a><span class="ts" id=965 data-target="#details-965" data-toggle="collapse"><span class="ident">wordPattern</span><span>?</span><span>: </span><a class="type-ref" href="#RegExp">RegExp</a></span>
<div class="details collapse" id="details-965">
<div class="comment"><p>The language&#39;s word definition.
If the language supports Unicode identifiers (e.g. JavaScript), it is preferable
to provide a word definition that uses exclusion of known separators.
e.g.: A regex that matches anything except known separators (and dot is allowed to occur in a floating point number):
  /(-?\d<em>.\d\w</em>)|([^`~!\@@#\%\^\&amp;*()-\=+[{]}\|\;\:\&#39;\&quot;\,.\&lt;>\/\?\s]+)/g</p>
</div>
</div>

### <a name="Location"></a><span class="code-item" id=1017>Location</span>



<div class="comment"><p>Represents a location inside a resource, such as a line
inside a text file.</p>
</div>

#### Constructors



<a name="Location.new Location"></a><span class="ts" id=1021 data-target="#details-1021" data-toggle="collapse"><span class="ident">new Location</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a>, <span class="ident">rangeOrPosition</span><span>: </span><a class="type-ref" href="#Range">Range</a> &#124; <a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-ref" href="#Location">Location</a></span>
<div class="details collapse" id="details-1021">
<div class="comment"><p>Creates a new location object.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=1022 data-target="#details-1022" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>The resource identifier.</p>
</div></td></tr>
<tr><td><a name="rangeOrPosition"></a><span class="ts" id=1023 data-target="#details-1023" data-toggle="collapse"><span class="ident">rangeOrPosition</span><span>: </span><a class="type-ref" href="#Range">Range</a> &#124; <a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The range or position. Positions will be converted to an empty range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Location">Location</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="Location.range"></a><span class="ts" id=1019 data-target="#details-1019" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-1019">
<div class="comment"><p>The document range of this locations.</p>
</div>
</div>



<a name="Location.uri"></a><span class="ts" id=1018 data-target="#details-1018" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span>
<div class="details collapse" id="details-1018">
<div class="comment"><p>The resource identifier of this location.</p>
</div>
</div>

### <a name="MarkdownString"></a><span class="code-item" id=574>MarkdownString</span>



<div class="comment"><p>The MarkdownString represents human readable text that supports formatting via the
markdown syntax. Standard markdown is supported, also tables, but no embedded html.</p>
</div>

#### Constructors



<a name="MarkdownString.new MarkdownString"></a><span class="ts" id=578 data-target="#details-578" data-toggle="collapse"><span class="ident">new MarkdownString</span><span>(</span><span class="ident">value</span><span>?</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#MarkdownString">MarkdownString</a></span>
<div class="details collapse" id="details-578">
<div class="comment"><p>Creates a new markdown string with the given value.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="value"></a><span class="ts" id=579 data-target="#details-579" data-toggle="collapse"><span class="ident">value</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>Optional, initial value.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#MarkdownString">MarkdownString</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="MarkdownString.isTrusted"></a><span class="ts" id=576 data-target="#details-576" data-toggle="collapse"><span class="ident">isTrusted</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-576">
<div class="comment"><p>Indicates that this markdown string is from a trusted source. Only <em>trusted</em>
markdown supports links that execute commands, e.g. <code>[Run it](command:myCommandId)</code>.</p>
</div>
</div>



<a name="MarkdownString.value"></a><span class="ts" id=575 data-target="#details-575" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-575">
<div class="comment"><p>The markdown string.</p>
</div>
</div>

#### Methods



<a name="MarkdownString.appendCodeblock"></a><span class="ts" id=587 data-target="#details-587" data-toggle="collapse"><span class="ident">appendCodeblock</span><span>(</span><span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">language</span><span>?</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#MarkdownString">MarkdownString</a></span>
<div class="details collapse" id="details-587">
<div class="comment"><p>Appends the given string as codeblock using the provided language.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="value"></a><span class="ts" id=588 data-target="#details-588" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A code snippet.</p>
</div></td></tr>
<tr><td><a name="language"></a><span class="ts" id=589 data-target="#details-589" data-toggle="collapse"><span class="ident">language</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>An optional <a href="#languages.getLanguages">language identifier</a>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#MarkdownString">MarkdownString</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="MarkdownString.appendMarkdown"></a><span class="ts" id=584 data-target="#details-584" data-toggle="collapse"><span class="ident">appendMarkdown</span><span>(</span><span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#MarkdownString">MarkdownString</a></span>
<div class="details collapse" id="details-584">
<div class="comment"><p>Appends the given string &#39;as is&#39; to this markdown string.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="value"></a><span class="ts" id=585 data-target="#details-585" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>Markdown string.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#MarkdownString">MarkdownString</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="MarkdownString.appendText"></a><span class="ts" id=581 data-target="#details-581" data-toggle="collapse"><span class="ident">appendText</span><span>(</span><span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#MarkdownString">MarkdownString</a></span>
<div class="details collapse" id="details-581">
<div class="comment"><p>Appends and escapes the given string to this markdown string.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="value"></a><span class="ts" id=582 data-target="#details-582" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>Plain text.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#MarkdownString">MarkdownString</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="MarkedString"></a><span class="code-item" id=1407>MarkedString</span>



<div class="comment"><p><del>MarkedString can be used to render human readable text. It is either a markdown string
or a code-block that provides a language and a code snippet. Note that
markdown strings will be sanitized - that means html will be escaped.</del></p>
<ul>
<li><em>deprecated</em> - This type is deprecated, please use <a href="#MarkdownString"><code>MarkdownString</code></a> instead.</li>
</ul>
</div>



<a name="MarkedString"></a><span class="ts" id=1407 data-target="#details-1407" data-toggle="collapse"><span class="ident">MarkedString</span><span>: </span><a class="type-ref" href="#MarkdownString">MarkdownString</a> &#124; <a class="type-intrinsic">string</a> &#124; {language: <a class="type-intrinsic">string</a>, value: <a class="type-intrinsic">string</a>}</span>

### <a name="Memento"></a><span class="code-item" id=1151>Memento</span>



<div class="comment"><p>A memento represents a storage utility. It can store and retrieve
values.</p>
</div>

#### Methods



<a name="Memento.get"></a><span class="ts" id=1153 data-target="#details-1153" data-toggle="collapse"><span class="ident">get</span><span>&lt;</span>T<span>&gt;</span><span>(</span><span class="ident">key</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a></span>
<div class="details collapse" id="details-1153">
<div class="comment"><p>Return a value.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="key"></a><span class="ts" id=1155 data-target="#details-1155" data-toggle="collapse"><span class="ident">key</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A string.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a></span></td><td><div class="comment"><p>The stored value or <code>undefined</code>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Memento.get"></a><span class="ts" id=1156 data-target="#details-1156" data-toggle="collapse"><span class="ident">get</span><span>&lt;</span>T<span>&gt;</span><span>(</span><span class="ident">key</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">defaultValue</span><span>: </span><a class="type-intrinsic">T</a><span>)</span><span>: </span><a class="type-intrinsic">T</a></span>
<div class="details collapse" id="details-1156">
<div class="comment"><p>Return a value.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="key"></a><span class="ts" id=1158 data-target="#details-1158" data-toggle="collapse"><span class="ident">key</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A string.</p>
</div></td></tr>
<tr><td><a name="defaultValue"></a><span class="ts" id=1159 data-target="#details-1159" data-toggle="collapse"><span class="ident">defaultValue</span><span>: </span><a class="type-intrinsic">T</a></span></td><td><div class="comment"><p>A value that should be returned when there is no
value (<code>undefined</code>) with the given key.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">T</a></span></td><td><div class="comment"><p>The stored value or the defaultValue.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Memento.update"></a><span class="ts" id=1161 data-target="#details-1161" data-toggle="collapse"><span class="ident">update</span><span>(</span><span class="ident">key</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">value</span><span>: </span><a class="type-intrinsic">any</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">void</a>&gt;</span>
<div class="details collapse" id="details-1161">
<div class="comment"><p>Store a value. The value must be JSON-stringifyable.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="key"></a><span class="ts" id=1162 data-target="#details-1162" data-toggle="collapse"><span class="ident">key</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A string.</p>
</div></td></tr>
<tr><td><a name="value"></a><span class="ts" id=1163 data-target="#details-1163" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-intrinsic">any</a></span></td><td><div class="comment"><p>A value. MUST not contain cyclic references.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">void</a>&gt;</span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="MessageItem"></a><span class="code-item" id=503>MessageItem</span>



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



<a name="MessageItem.isCloseAffordance"></a><span class="ts" id=505 data-target="#details-505" data-toggle="collapse"><span class="ident">isCloseAffordance</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-505">
<div class="comment"><p>Indicates that this item replaces the default
&#39;Close&#39; action.</p>
</div>
</div>



<a name="MessageItem.title"></a><span class="ts" id=504 data-target="#details-504" data-toggle="collapse"><span class="ident">title</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-504">
<div class="comment"><p>A short title like &#39;Retry&#39;, &#39;Open Log&#39; etc.</p>
</div>
</div>

### <a name="MessageOptions"></a><span class="code-item" id=506>MessageOptions</span>



<div class="comment"><p>Options to configure the behavior of the message.</p>
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



<a name="MessageOptions.modal"></a><span class="ts" id=507 data-target="#details-507" data-toggle="collapse"><span class="ident">modal</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-507">
<div class="comment"><p>Indicates that this message should be modal.</p>
</div>
</div>

### <a name="OnEnterRule"></a><span class="code-item" id=958>OnEnterRule</span>



<div class="comment"><p>Describes a rule to be evaluated when pressing Enter.</p>
</div>

#### Properties



<a name="OnEnterRule.action"></a><span class="ts" id=961 data-target="#details-961" data-toggle="collapse"><span class="ident">action</span><span>: </span><a class="type-ref" href="#EnterAction">EnterAction</a></span>
<div class="details collapse" id="details-961">
<div class="comment"><p>The action to execute.</p>
</div>
</div>



<a name="OnEnterRule.afterText"></a><span class="ts" id=960 data-target="#details-960" data-toggle="collapse"><span class="ident">afterText</span><span>?</span><span>: </span><a class="type-ref" href="#RegExp">RegExp</a></span>
<div class="details collapse" id="details-960">
<div class="comment"><p>This rule will only execute if the text after the cursor matches this regular expression.</p>
</div>
</div>



<a name="OnEnterRule.beforeText"></a><span class="ts" id=959 data-target="#details-959" data-toggle="collapse"><span class="ident">beforeText</span><span>: </span><a class="type-ref" href="#RegExp">RegExp</a></span>
<div class="details collapse" id="details-959">
<div class="comment"><p>This rule will only execute if the text before the cursor matches this regular expression.</p>
</div>
</div>

### <a name="OnTypeFormattingEditProvider"></a><span class="code-item" id=787>OnTypeFormattingEditProvider</span>



<div class="comment"><p>The document formatting provider interface defines the contract between extensions and
the formatting-feature.</p>
</div>

#### Methods



<a name="OnTypeFormattingEditProvider.provideOnTypeFormattingEdits"></a><span class="ts" id=789 data-target="#details-789" data-toggle="collapse"><span class="ident">provideOnTypeFormattingEdits</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">ch</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">options</span><span>: </span><a class="type-ref" href="#FormattingOptions">FormattingOptions</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#TextEdit">TextEdit</a>[]&gt;</span>
<div class="details collapse" id="details-789">
<div class="comment"><p>Provide formatting edits after a character has been typed.</p>
<p>The given position and character should hint to the provider
what range the position to expand to, like find the matching <code>{</code>
when <code>}</code> has been entered.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=790 data-target="#details-790" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="position"></a><span class="ts" id=791 data-target="#details-791" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The position at which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="ch"></a><span class="ts" id=792 data-target="#details-792" data-toggle="collapse"><span class="ident">ch</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The character that has been typed.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=793 data-target="#details-793" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#FormattingOptions">FormattingOptions</a></span></td><td><div class="comment"><p>Options controlling formatting.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=794 data-target="#details-794" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#TextEdit">TextEdit</a>[]&gt;</span></td><td><div class="comment"><p>A set of text edits or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="OpenDialogOptions"></a><span class="code-item" id=486>OpenDialogOptions</span>



<div class="comment"><p>Options to configure the behaviour of a file open dialog.</p>
<ul>
<li>Note 1: A dialog can select files, folders, or both. This is not true for Windows
which enforces to open either files or folder, but <em>not both</em>.</li>
<li>Note 2: Explictly setting <code>canSelectFiles</code> and <code>canSelectFolders</code> to <code>false</code> is futile
and the editor then silently adjusts the options to select files.</li>
</ul>
</div>

#### Properties



<a name="OpenDialogOptions.canSelectFiles"></a><span class="ts" id=489 data-target="#details-489" data-toggle="collapse"><span class="ident">canSelectFiles</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-489">
<div class="comment"><p>Allow to select files, defaults to <code>true</code>.</p>
</div>
</div>



<a name="OpenDialogOptions.canSelectFolders"></a><span class="ts" id=490 data-target="#details-490" data-toggle="collapse"><span class="ident">canSelectFolders</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-490">
<div class="comment"><p>Allow to select folders, defaults to <code>false</code>.</p>
</div>
</div>



<a name="OpenDialogOptions.canSelectMany"></a><span class="ts" id=491 data-target="#details-491" data-toggle="collapse"><span class="ident">canSelectMany</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-491">
<div class="comment"><p>Allow to select many files or folders.</p>
</div>
</div>



<a name="OpenDialogOptions.defaultUri"></a><span class="ts" id=487 data-target="#details-487" data-toggle="collapse"><span class="ident">defaultUri</span><span>?</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span>
<div class="details collapse" id="details-487">
<div class="comment"><p>The resource the dialog shows when opened.</p>
</div>
</div>



<a name="OpenDialogOptions.filters"></a><span class="ts" id=492 data-target="#details-492" data-toggle="collapse"><span class="ident">filters</span><span>?</span><span>: </span></span>
<div class="details collapse" id="details-492">
<div class="comment"><p>A set of file filters that are used by the dialog. Each entry is a human readable label,
like &quot;TypeScript&quot;, and an array of extensions, e.g.</p>

<pre><code class="lang-ts">{
    <span class="hljs-string">'Images'</span>: [<span class="hljs-string">'png'</span>, <span class="hljs-string">'jpg'</span>]
    <span class="hljs-string">'TypeScript'</span>: [<span class="hljs-string">'ts'</span>, <span class="hljs-string">'tsx'</span>]
}
</code></pre>
</div>
</div>



<a name="OpenDialogOptions.openLabel"></a><span class="ts" id=488 data-target="#details-488" data-toggle="collapse"><span class="ident">openLabel</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-488">
<div class="comment"><p>A human-readable string for the open button.</p>
</div>
</div>

### <a name="OutputChannel"></a><span class="code-item" id=1075>OutputChannel</span>



<div class="comment"><p>An output channel is a container for readonly textual information.</p>
<p>To get an instance of an <code>OutputChannel</code> use
<a href="#window.createOutputChannel">createOutputChannel</a>.</p>
</div>

#### Properties



<a name="OutputChannel.name"></a><span class="ts" id=1076 data-target="#details-1076" data-toggle="collapse"><span class="ident">name</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1076">
<div class="comment"><p>The human-readable name of this output channel.</p>
</div>
</div>

#### Methods



<a name="OutputChannel.append"></a><span class="ts" id=1078 data-target="#details-1078" data-toggle="collapse"><span class="ident">append</span><span>(</span><span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1078">
<div class="comment"><p>Append the given value to the channel.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="value"></a><span class="ts" id=1079 data-target="#details-1079" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A string, falsy values will not be printed.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="OutputChannel.appendLine"></a><span class="ts" id=1081 data-target="#details-1081" data-toggle="collapse"><span class="ident">appendLine</span><span>(</span><span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1081">
<div class="comment"><p>Append the given value and a line feed character
to the channel.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="value"></a><span class="ts" id=1082 data-target="#details-1082" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A string, falsy values will be printed.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="OutputChannel.clear"></a><span class="ts" id=1084 data-target="#details-1084" data-toggle="collapse"><span class="ident">clear</span><span>(</span><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1084">
<div class="comment"><p>Removes all output from the channel.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="OutputChannel.dispose"></a><span class="ts" id=1094 data-target="#details-1094" data-toggle="collapse"><span class="ident">dispose</span><span>(</span><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1094">
<div class="comment"><p>Dispose and free associated resources.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="OutputChannel.hide"></a><span class="ts" id=1092 data-target="#details-1092" data-toggle="collapse"><span class="ident">hide</span><span>(</span><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1092">
<div class="comment"><p>Hide this channel from the UI.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="OutputChannel.show"></a><span class="ts" id=1086 data-target="#details-1086" data-toggle="collapse"><span class="ident">show</span><span>(</span><span class="ident">preserveFocus</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1086">
<div class="comment"><p>Reveal this channel in the UI.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="preserveFocus"></a><span class="ts" id=1087 data-target="#details-1087" data-toggle="collapse"><span class="ident">preserveFocus</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p>When <code>true</code> the channel will not take focus.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="OutputChannel.show"></a><span class="ts" id=1088 data-target="#details-1088" data-toggle="collapse"><span class="ident">show</span><span>(</span><span class="ident">column</span><span>?</span><span>: </span><a class="type-ref" href="#ViewColumn">ViewColumn</a>, <span class="ident">preserveFocus</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1088">
<div class="comment"><p><del>Reveal this channel in the UI.</del></p>
<ul>
<li><em>deprecated</em> - Use the overload with just one parameter (<code>show(preserveFocus?: boolean): void</code>).</li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="column"></a><span class="ts" id=1089 data-target="#details-1089" data-toggle="collapse"><span class="ident">column</span><span>?</span><span>: </span><a class="type-ref" href="#ViewColumn">ViewColumn</a></span></td><td><div class="comment"><p>This argument is <strong>deprecated</strong> and will be ignored.</p>
</div></td></tr>
<tr><td><a name="preserveFocus"></a><span class="ts" id=1090 data-target="#details-1090" data-toggle="collapse"><span class="ident">preserveFocus</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p>When <code>true</code> the channel will not take focus.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="OverviewRulerLane"></a><span class="code-item" id=229>OverviewRulerLane</span>



<div class="comment"><p>Represents different positions for rendering a decoration in an <a href="#DecorationRenderOptions.overviewRulerLane">overview ruler</a>.
The overview ruler supports three lanes.</p>
</div>

#### Enumeration members



<a name="OverviewRulerLane.Center"></a><span class="ts" id=231 data-target="#details-231" data-toggle="collapse"><span class="ident">Center</span></span>
<div class="details collapse" id="details-231">
<em>2</em>
</div>



<a name="OverviewRulerLane.Full"></a><span class="ts" id=233 data-target="#details-233" data-toggle="collapse"><span class="ident">Full</span></span>
<div class="details collapse" id="details-233">
<em>7</em>
</div>



<a name="OverviewRulerLane.Left"></a><span class="ts" id=230 data-target="#details-230" data-toggle="collapse"><span class="ident">Left</span></span>
<div class="details collapse" id="details-230">
<em>1</em>
</div>



<a name="OverviewRulerLane.Right"></a><span class="ts" id=232 data-target="#details-232" data-toggle="collapse"><span class="ident">Right</span></span>
<div class="details collapse" id="details-232">
<em>4</em>
</div>

### <a name="ParameterInformation"></a><span class="code-item" id=795>ParameterInformation</span>



<div class="comment"><p>Represents a parameter of a callable-signature. A parameter can
have a label and a doc-comment.</p>
</div>

#### Constructors



<a name="ParameterInformation.new ParameterInformation"></a><span class="ts" id=799 data-target="#details-799" data-toggle="collapse"><span class="ident">new ParameterInformation</span><span>(</span><span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">documentation</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#MarkdownString">MarkdownString</a><span>)</span><span>: </span><a class="type-ref" href="#ParameterInformation">ParameterInformation</a></span>
<div class="details collapse" id="details-799">
<div class="comment"><p>Creates a new parameter information object.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="label"></a><span class="ts" id=800 data-target="#details-800" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A label string.</p>
</div></td></tr>
<tr><td><a name="documentation"></a><span class="ts" id=801 data-target="#details-801" data-toggle="collapse"><span class="ident">documentation</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#MarkdownString">MarkdownString</a></span></td><td><div class="comment"><p>A doc string.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ParameterInformation">ParameterInformation</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="ParameterInformation.documentation"></a><span class="ts" id=797 data-target="#details-797" data-toggle="collapse"><span class="ident">documentation</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#MarkdownString">MarkdownString</a></span>
<div class="details collapse" id="details-797">
<div class="comment"><p>The human-readable doc-comment of this signature. Will be shown
in the UI but can be omitted.</p>
</div>
</div>



<a name="ParameterInformation.label"></a><span class="ts" id=796 data-target="#details-796" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-796">
<div class="comment"><p>The label of this signature. Will be shown in
the UI.</p>
</div>
</div>

### <a name="Position"></a><span class="code-item" id=74>Position</span>



<div class="comment"><p>Represents a line and character position, such as
the position of the cursor.</p>
<p>Position objects are <strong>immutable</strong>. Use the <a href="#Position.with">with</a> or
<a href="#Position.translate">translate</a> methods to derive new positions
from an existing position.</p>
</div>

#### Constructors



<a name="Position.new Position"></a><span class="ts" id=78 data-target="#details-78" data-toggle="collapse"><span class="ident">new Position</span><span>(</span><span class="ident">line</span><span>: </span><a class="type-intrinsic">number</a>, <span class="ident">character</span><span>: </span><a class="type-intrinsic">number</a><span>)</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-78">
<div class="comment"></div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="line"></a><span class="ts" id=79 data-target="#details-79" data-toggle="collapse"><span class="ident">line</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>A zero-based line value.</p>
</div></td></tr>
<tr><td><a name="character"></a><span class="ts" id=80 data-target="#details-80" data-toggle="collapse"><span class="ident">character</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>A zero-based character value.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="Position.character"></a><span class="ts" id=76 data-target="#details-76" data-toggle="collapse"><span class="ident">character</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-76">
<div class="comment"><p>The zero-based character value.</p>
</div>
</div>



<a name="Position.line"></a><span class="ts" id=75 data-target="#details-75" data-toggle="collapse"><span class="ident">line</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-75">
<div class="comment"><p>The zero-based line value.</p>
</div>
</div>

#### Methods



<a name="Position.compareTo"></a><span class="ts" id=97 data-target="#details-97" data-toggle="collapse"><span class="ident">compareTo</span><span>(</span><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-97">
<div class="comment"><p>Compare this to <code>other</code>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="other"></a><span class="ts" id=98 data-target="#details-98" data-toggle="collapse"><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>A number smaller than zero if this position is before the given position,
a number greater than zero if this position is after the given position, or zero when
this and the given position are equal.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Position.isAfter"></a><span class="ts" id=88 data-target="#details-88" data-toggle="collapse"><span class="ident">isAfter</span><span>(</span><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-88">
<div class="comment"><p>Check if <code>other</code> is after this position.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="other"></a><span class="ts" id=89 data-target="#details-89" data-toggle="collapse"><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p><code>true</code> if position is on a greater line
or on the same line on a greater character.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Position.isAfterOrEqual"></a><span class="ts" id=91 data-target="#details-91" data-toggle="collapse"><span class="ident">isAfterOrEqual</span><span>(</span><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-91">
<div class="comment"><p>Check if <code>other</code> is after or equal to this position.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="other"></a><span class="ts" id=92 data-target="#details-92" data-toggle="collapse"><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p><code>true</code> if position is on a greater line
or on the same line on a greater or equal character.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Position.isBefore"></a><span class="ts" id=82 data-target="#details-82" data-toggle="collapse"><span class="ident">isBefore</span><span>(</span><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-82">
<div class="comment"><p>Check if <code>other</code> is before this position.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="other"></a><span class="ts" id=83 data-target="#details-83" data-toggle="collapse"><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p><code>true</code> if position is on a smaller line
or on the same line on a smaller character.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Position.isBeforeOrEqual"></a><span class="ts" id=85 data-target="#details-85" data-toggle="collapse"><span class="ident">isBeforeOrEqual</span><span>(</span><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-85">
<div class="comment"><p>Check if <code>other</code> is before or equal to this position.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="other"></a><span class="ts" id=86 data-target="#details-86" data-toggle="collapse"><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p><code>true</code> if position is on a smaller line
or on the same line on a smaller or equal character.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Position.isEqual"></a><span class="ts" id=94 data-target="#details-94" data-toggle="collapse"><span class="ident">isEqual</span><span>(</span><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-94">
<div class="comment"><p>Check if <code>other</code> equals this position.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="other"></a><span class="ts" id=95 data-target="#details-95" data-toggle="collapse"><span class="ident">other</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p><code>true</code> if the line and character of the given position are equal to
the line and character of this position.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Position.translate"></a><span class="ts" id=100 data-target="#details-100" data-toggle="collapse"><span class="ident">translate</span><span>(</span><span class="ident">lineDelta</span><span>?</span><span>: </span><a class="type-intrinsic">number</a>, <span class="ident">characterDelta</span><span>?</span><span>: </span><a class="type-intrinsic">number</a><span>)</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-100">
<div class="comment"><p>Create a new position relative to this position.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="lineDelta"></a><span class="ts" id=101 data-target="#details-101" data-toggle="collapse"><span class="ident">lineDelta</span><span>?</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>Delta value for the line value, default is <code>0</code>.</p>
</div></td></tr>
<tr><td><a name="characterDelta"></a><span class="ts" id=102 data-target="#details-102" data-toggle="collapse"><span class="ident">characterDelta</span><span>?</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>Delta value for the character value, default is <code>0</code>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position which line and character is the sum of the current line and
character and the corresponding deltas.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Position.translate"></a><span class="ts" id=103 data-target="#details-103" data-toggle="collapse"><span class="ident">translate</span><span>(</span><span class="ident">change</span><span>: </span>{characterDelta: <a class="type-intrinsic">number</a>, lineDelta: <a class="type-intrinsic">number</a>}<span>)</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-103">
<div class="comment"><p>Derived a new position relative to this position.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="change"></a><span class="ts" id=104 data-target="#details-104" data-toggle="collapse"><span class="ident">change</span><span>: </span>{characterDelta: <a class="type-intrinsic">number</a>, lineDelta: <a class="type-intrinsic">number</a>}</span></td><td><div class="comment"><p>An object that describes a delta to this position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position that reflects the given delta. Will return <code>this</code> position if the change
is not changing anything.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Position.with"></a><span class="ts" id=109 data-target="#details-109" data-toggle="collapse"><span class="ident">with</span><span>(</span><span class="ident">line</span><span>?</span><span>: </span><a class="type-intrinsic">number</a>, <span class="ident">character</span><span>?</span><span>: </span><a class="type-intrinsic">number</a><span>)</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-109">
<div class="comment"><p>Create a new position derived from this position.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="line"></a><span class="ts" id=110 data-target="#details-110" data-toggle="collapse"><span class="ident">line</span><span>?</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>Value that should be used as line value, default is the <a href="#Position.line">existing value</a></p>
</div></td></tr>
<tr><td><a name="character"></a><span class="ts" id=111 data-target="#details-111" data-toggle="collapse"><span class="ident">character</span><span>?</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>Value that should be used as character value, default is the <a href="#Position.character">existing value</a></p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position where line and character are replaced by the given values.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Position.with"></a><span class="ts" id=112 data-target="#details-112" data-toggle="collapse"><span class="ident">with</span><span>(</span><span class="ident">change</span><span>: </span>{character: <a class="type-intrinsic">number</a>, line: <a class="type-intrinsic">number</a>}<span>)</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-112">
<div class="comment"><p>Derived a new position from this position.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="change"></a><span class="ts" id=113 data-target="#details-113" data-toggle="collapse"><span class="ident">change</span><span>: </span>{character: <a class="type-intrinsic">number</a>, line: <a class="type-intrinsic">number</a>}</span></td><td><div class="comment"><p>An object that describes a change to this position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position that reflects the given change. Will return <code>this</code> position if the change
is not changing anything.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="ProcessExecution"></a><span class="code-item" id=1196>ProcessExecution</span>



<div class="comment"><p>The execution of a task happens as an external process
without shell interaction.</p>
</div>

#### Constructors



<a name="ProcessExecution.new ProcessExecution"></a><span class="ts" id=1198 data-target="#details-1198" data-toggle="collapse"><span class="ident">new ProcessExecution</span><span>(</span><span class="ident">process</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#ProcessExecutionOptions">ProcessExecutionOptions</a><span>)</span><span>: </span><a class="type-ref" href="#ProcessExecution">ProcessExecution</a></span>
<div class="details collapse" id="details-1198">
<div class="comment"><p>Creates a process execution.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="process"></a><span class="ts" id=1199 data-target="#details-1199" data-toggle="collapse"><span class="ident">process</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The process to start.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=1200 data-target="#details-1200" data-toggle="collapse"><span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#ProcessExecutionOptions">ProcessExecutionOptions</a></span></td><td><div class="comment"><p>Optional options for the started process.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProcessExecution">ProcessExecution</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="ProcessExecution.new ProcessExecution"></a><span class="ts" id=1201 data-target="#details-1201" data-toggle="collapse"><span class="ident">new ProcessExecution</span><span>(</span><span class="ident">process</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">args</span><span>: </span><a class="type-intrinsic">string</a>[], <span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#ProcessExecutionOptions">ProcessExecutionOptions</a><span>)</span><span>: </span><a class="type-ref" href="#ProcessExecution">ProcessExecution</a></span>
<div class="details collapse" id="details-1201">
<div class="comment"><p>Creates a process execution.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="process"></a><span class="ts" id=1202 data-target="#details-1202" data-toggle="collapse"><span class="ident">process</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The process to start.</p>
</div></td></tr>
<tr><td><a name="args"></a><span class="ts" id=1203 data-target="#details-1203" data-toggle="collapse"><span class="ident">args</span><span>: </span><a class="type-intrinsic">string</a>[]</span></td><td><div class="comment"><p>Arguments to be passed to the process.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=1204 data-target="#details-1204" data-toggle="collapse"><span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#ProcessExecutionOptions">ProcessExecutionOptions</a></span></td><td><div class="comment"><p>Optional options for the started process.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProcessExecution">ProcessExecution</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="ProcessExecution.args"></a><span class="ts" id=1206 data-target="#details-1206" data-toggle="collapse"><span class="ident">args</span><span>: </span><a class="type-intrinsic">string</a>[]</span>
<div class="details collapse" id="details-1206">
<div class="comment"><p>The arguments passed to the process. Defaults to an empty array.</p>
</div>
</div>



<a name="ProcessExecution.options"></a><span class="ts" id=1207 data-target="#details-1207" data-toggle="collapse"><span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#ProcessExecutionOptions">ProcessExecutionOptions</a></span>
<div class="details collapse" id="details-1207">
<div class="comment"><p>The process options used when the process is executed.
Defaults to undefined.</p>
</div>
</div>



<a name="ProcessExecution.process"></a><span class="ts" id=1205 data-target="#details-1205" data-toggle="collapse"><span class="ident">process</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1205">
<div class="comment"><p>The process to be executed.</p>
</div>
</div>

### <a name="ProcessExecutionOptions"></a><span class="code-item" id=1190>ProcessExecutionOptions</span>



<div class="comment"><p>Options for a process execution</p>
</div>

#### Properties



<a name="ProcessExecutionOptions.cwd"></a><span class="ts" id=1191 data-target="#details-1191" data-toggle="collapse"><span class="ident">cwd</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1191">
<div class="comment"><p>The current working directory of the executed program or shell.
If omitted the tools current workspace root is used.</p>
</div>
</div>



<a name="ProcessExecutionOptions.env"></a><span class="ts" id=1192 data-target="#details-1192" data-toggle="collapse"><span class="ident">env</span><span>?</span><span>: </span></span>
<div class="details collapse" id="details-1192">
<div class="comment"><p>The additional environment of the executed program or shell. If omitted
the parent process&#39; environment is used. If provided it is merged with
the parent process&#39; environment.</p>
</div>
</div>

### <a name="Progress"></a><span class="code-item" id=1111>Progress&lt;T&gt;</span>



<div class="comment"><p>Defines a generalized way of reporting progress updates.</p>
</div>

#### Methods



<a name="Progress.report"></a><span class="ts" id=1114 data-target="#details-1114" data-toggle="collapse"><span class="ident">report</span><span>(</span><span class="ident">value</span><span>: </span><a class="type-intrinsic">T</a><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1114">
<div class="comment"><p>Report a progress update.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="value"></a><span class="ts" id=1115 data-target="#details-1115" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-intrinsic">T</a></span></td><td><div class="comment"><p>A progress item, like a message or an updated percentage value</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="ProgressLocation"></a><span class="code-item" id=1294>ProgressLocation</span>



<div class="comment"><p>A location in the editor at which progress information can be shown. It depends on the
location how progress is visually represented.</p>
</div>

#### Enumeration members



<a name="ProgressLocation.SourceControl"></a><span class="ts" id=1295 data-target="#details-1295" data-toggle="collapse"><span class="ident">SourceControl</span></span>
<div class="details collapse" id="details-1295">
<em>1</em>
</div>



<a name="ProgressLocation.Window"></a><span class="ts" id=1296 data-target="#details-1296" data-toggle="collapse"><span class="ident">Window</span></span>
<div class="details collapse" id="details-1296">
<em>10</em>
</div>

### <a name="ProgressOptions"></a><span class="code-item" id=1297>ProgressOptions</span>



<div class="comment"><p>Value-object describing where and how progress should show.</p>
</div>

#### Properties



<a name="ProgressOptions.location"></a><span class="ts" id=1298 data-target="#details-1298" data-toggle="collapse"><span class="ident">location</span><span>: </span><a class="type-ref" href="#ProgressLocation">ProgressLocation</a></span>
<div class="details collapse" id="details-1298">
<div class="comment"><p>The location at which progress should show.</p>
</div>
</div>



<a name="ProgressOptions.title"></a><span class="ts" id=1299 data-target="#details-1299" data-toggle="collapse"><span class="ident">title</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1299">
<div class="comment"><p>A human-readable string which will be used to describe the
operation.</p>
</div>
</div>

### <a name="ProviderResult"></a><span class="code-item" id=1405>ProviderResult</span>



<div class="comment"><p>A provider result represents the values a provider, like the <a href="#HoverProvider"><code>HoverProvider</code></a>,
may return. For once this is the actual result type <code>T</code>, like <code>Hover</code>, or a thenable that resolves
to that type <code>T</code>. In addition, <code>null</code> and <code>undefined</code> can be returned - either directly or from a
thenable.</p>
<p>The snippets below are all valid implementions of the <a href="#HoverProvider"><code>HoverProvider</code></a>:</p>

<pre><code class="lang-ts"><span class="hljs-keyword">let</span> a: HoverProvider = {
    provideHover(doc, pos, token): ProviderResult&lt;Hover&gt; {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Hover(<span class="hljs-string">'Hello World'</span>);
    }
}

<span class="hljs-keyword">let</span> b: HoverProvider = {
    provideHover(doc, pos, token): ProviderResult&lt;Hover&gt; {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
            resolve(<span class="hljs-keyword">new</span> Hover(<span class="hljs-string">'Hello World'</span>));
         });
    }
}

<span class="hljs-keyword">let</span> c: HoverProvider = {
    provideHover(doc, pos, token): ProviderResult&lt;Hover&gt; {
        <span class="hljs-keyword">return</span>; <span class="hljs-comment">// undefined</span>
    }
}
</code></pre>
</div>



<a name="ProviderResult"></a><span class="ts" id=1405 data-target="#details-1405" data-toggle="collapse"><span class="ident">ProviderResult</span><span>: </span><a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a> &#124; <a class="type-intrinsic">null</a> &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a> &#124; <a class="type-intrinsic">null</a>&gt;</span>

### <a name="QuickDiffProvider"></a><span class="code-item" id=1333>QuickDiffProvider</span>



<div class="comment"></div>

#### Methods



<a name="QuickDiffProvider.provideOriginalResource"></a><span class="ts" id=1335 data-target="#details-1335" data-toggle="collapse"><span class="ident">provideOriginalResource</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#Uri">Uri</a>&gt;</span>
<div class="details collapse" id="details-1335">
<div class="comment"><p>Provide a <a href="#Uri">uri</a> to the original resource of any given resource uri.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=1336 data-target="#details-1336" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>The uri of the resource open in a text editor.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=1337 data-target="#details-1337" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#Uri">Uri</a>&gt;</span></td><td><div class="comment"><p>A thenable that resolves to uri of the matching original resource.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="QuickPickItem"></a><span class="code-item" id=471>QuickPickItem</span>



<div class="comment"><p>Represents an item that can be selected from
a list of items.</p>
</div>

#### Properties



<a name="QuickPickItem.description"></a><span class="ts" id=473 data-target="#details-473" data-toggle="collapse"><span class="ident">description</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-473">
<div class="comment"><p>A human readable string which is rendered less prominent.</p>
</div>
</div>



<a name="QuickPickItem.detail"></a><span class="ts" id=474 data-target="#details-474" data-toggle="collapse"><span class="ident">detail</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-474">
<div class="comment"><p>A human readable string which is rendered less prominent.</p>
</div>
</div>



<a name="QuickPickItem.label"></a><span class="ts" id=472 data-target="#details-472" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-472">
<div class="comment"><p>A human readable string which is rendered prominent.</p>
</div>
</div>

### <a name="QuickPickOptions"></a><span class="code-item" id=475>QuickPickOptions</span>



<div class="comment"><p>Options to configure the behavior of the quick pick UI.</p>
</div>

#### Events



<a name="QuickPickOptions.onDidSelectItem"></a><span class="ts" id=481 data-target="#details-481" data-toggle="collapse"><span class="ident">onDidSelectItem</span><span>(</span><span class="ident">item</span><span>: </span><a class="type-ref" href="#QuickPickItem">QuickPickItem</a> &#124; <a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-intrinsic">any</a></span>
<div class="details collapse" id="details-481">
<div class="comment"><p>An optional function that is invoked whenever an item is selected.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="item"></a><span class="ts" id=482 data-target="#details-482" data-toggle="collapse"><span class="ident">item</span><span>: </span><a class="type-ref" href="#QuickPickItem">QuickPickItem</a> &#124; <a class="type-intrinsic">string</a></span></td><td><div class="comment"></div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">any</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="QuickPickOptions.ignoreFocusOut"></a><span class="ts" id=479 data-target="#details-479" data-toggle="collapse"><span class="ident">ignoreFocusOut</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-479">
<div class="comment"><p>Set to <code>true</code> to keep the picker open when focus moves to another part of the editor or to another window.</p>
</div>
</div>



<a name="QuickPickOptions.matchOnDescription"></a><span class="ts" id=476 data-target="#details-476" data-toggle="collapse"><span class="ident">matchOnDescription</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-476">
<div class="comment"><p>An optional flag to include the description when filtering the picks.</p>
</div>
</div>



<a name="QuickPickOptions.matchOnDetail"></a><span class="ts" id=477 data-target="#details-477" data-toggle="collapse"><span class="ident">matchOnDetail</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-477">
<div class="comment"><p>An optional flag to include the detail when filtering the picks.</p>
</div>
</div>



<a name="QuickPickOptions.placeHolder"></a><span class="ts" id=478 data-target="#details-478" data-toggle="collapse"><span class="ident">placeHolder</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-478">
<div class="comment"><p>An optional string to show as place holder in the input box to guide the user what to pick on.</p>
</div>
</div>

### <a name="Range"></a><span class="code-item" id=117>Range</span>



<div class="comment"><p>A range represents an ordered pair of two positions.
It is guaranteed that <a href="#Range.start">start</a>.isBeforeOrEqual(<a href="#Range.end">end</a>)</p>
<p>Range objects are <strong>immutable</strong>. Use the <a href="#Range.with">with</a>,
<a href="#Range.intersection">intersection</a>, or <a href="#Range.union">union</a> methods
to derive new ranges from an existing range.</p>
</div>

#### Constructors



<a name="Range.new Range"></a><span class="ts" id=121 data-target="#details-121" data-toggle="collapse"><span class="ident">new Range</span><span>(</span><span class="ident">start</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">end</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-121">
<div class="comment"><p>Create a new range from two positions. If <code>start</code> is not
before or equal to <code>end</code>, the values will be swapped.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="start"></a><span class="ts" id=122 data-target="#details-122" data-toggle="collapse"><span class="ident">start</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><td><a name="end"></a><span class="ts" id=123 data-target="#details-123" data-toggle="collapse"><span class="ident">end</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="Range.new Range"></a><span class="ts" id=124 data-target="#details-124" data-toggle="collapse"><span class="ident">new Range</span><span>(</span><span class="ident">startLine</span><span>: </span><a class="type-intrinsic">number</a>, <span class="ident">startCharacter</span><span>: </span><a class="type-intrinsic">number</a>, <span class="ident">endLine</span><span>: </span><a class="type-intrinsic">number</a>, <span class="ident">endCharacter</span><span>: </span><a class="type-intrinsic">number</a><span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-124">
<div class="comment"><p>Create a new range from number coordinates. It is a shorter equivalent of
using <code>new Range(new Position(startLine, startCharacter), new Position(endLine, endCharacter))</code></p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="startLine"></a><span class="ts" id=125 data-target="#details-125" data-toggle="collapse"><span class="ident">startLine</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>A zero-based line value.</p>
</div></td></tr>
<tr><td><a name="startCharacter"></a><span class="ts" id=126 data-target="#details-126" data-toggle="collapse"><span class="ident">startCharacter</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>A zero-based character value.</p>
</div></td></tr>
<tr><td><a name="endLine"></a><span class="ts" id=127 data-target="#details-127" data-toggle="collapse"><span class="ident">endLine</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>A zero-based line value.</p>
</div></td></tr>
<tr><td><a name="endCharacter"></a><span class="ts" id=128 data-target="#details-128" data-toggle="collapse"><span class="ident">endCharacter</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>A zero-based character value.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="Range.end"></a><span class="ts" id=119 data-target="#details-119" data-toggle="collapse"><span class="ident">end</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-119">
<div class="comment"><p>The end position. It is after or equal to <a href="#Range.start">start</a>.</p>
</div>
</div>



<a name="Range.isEmpty"></a><span class="ts" id=129 data-target="#details-129" data-toggle="collapse"><span class="ident">isEmpty</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-129">
<div class="comment"><p><code>true</code> if <code>start</code> and <code>end</code> are equal.</p>
</div>
</div>



<a name="Range.isSingleLine"></a><span class="ts" id=130 data-target="#details-130" data-toggle="collapse"><span class="ident">isSingleLine</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-130">
<div class="comment"><p><code>true</code> if <code>start.line</code> and <code>end.line</code> are equal.</p>
</div>
</div>



<a name="Range.start"></a><span class="ts" id=118 data-target="#details-118" data-toggle="collapse"><span class="ident">start</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-118">
<div class="comment"><p>The start position. It is before or equal to <a href="#Range.end">end</a>.</p>
</div>
</div>

#### Methods



<a name="Range.contains"></a><span class="ts" id=132 data-target="#details-132" data-toggle="collapse"><span class="ident">contains</span><span>(</span><span class="ident">positionOrRange</span><span>: </span><a class="type-ref" href="#Position">Position</a> &#124; <a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-132">
<div class="comment"><p>Check if a position or a range is contained in this range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="positionOrRange"></a><span class="ts" id=133 data-target="#details-133" data-toggle="collapse"><span class="ident">positionOrRange</span><span>: </span><a class="type-ref" href="#Position">Position</a> &#124; <a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A position or a range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p><code>true</code> if the position or range is inside or equal
to this range.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Range.intersection"></a><span class="ts" id=138 data-target="#details-138" data-toggle="collapse"><span class="ident">intersection</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a> &#124; <a class="type-intrinsic">undefined</a></span>
<div class="details collapse" id="details-138">
<div class="comment"><p>Intersect <code>range</code> with this range and returns a new range or <code>undefined</code>
if the ranges have no overlap.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=139 data-target="#details-139" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a> &#124; <a class="type-intrinsic">undefined</a></span></td><td><div class="comment"><p>A range of the greater start and smaller end positions. Will
return undefined when there is no overlap.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Range.isEqual"></a><span class="ts" id=135 data-target="#details-135" data-toggle="collapse"><span class="ident">isEqual</span><span>(</span><span class="ident">other</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-135">
<div class="comment"><p>Check if <code>other</code> equals this range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="other"></a><span class="ts" id=136 data-target="#details-136" data-toggle="collapse"><span class="ident">other</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p><code>true</code> when start and end are <a href="#Position.isEqual">equal</a> to
start and end of this range.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Range.union"></a><span class="ts" id=141 data-target="#details-141" data-toggle="collapse"><span class="ident">union</span><span>(</span><span class="ident">other</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-141">
<div class="comment"><p>Compute the union of <code>other</code> with this range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="other"></a><span class="ts" id=142 data-target="#details-142" data-toggle="collapse"><span class="ident">other</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range of smaller start position and the greater end position.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Range.with"></a><span class="ts" id=144 data-target="#details-144" data-toggle="collapse"><span class="ident">with</span><span>(</span><span class="ident">start</span><span>?</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">end</span><span>?</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-144">
<div class="comment"><p>Derived a new range from this range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="start"></a><span class="ts" id=145 data-target="#details-145" data-toggle="collapse"><span class="ident">start</span><span>?</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position that should be used as start. The default value is the <a href="#Range.start">current start</a>.</p>
</div></td></tr>
<tr><td><a name="end"></a><span class="ts" id=146 data-target="#details-146" data-toggle="collapse"><span class="ident">end</span><span>?</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position that should be used as end. The default value is the <a href="#Range.end">current end</a>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range derived from this range with the given start and end position.
If start and end are not different <code>this</code> range will be returned.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Range.with"></a><span class="ts" id=147 data-target="#details-147" data-toggle="collapse"><span class="ident">with</span><span>(</span><span class="ident">change</span><span>: </span>{end: <a class="type-ref" href="#Position">Position</a>, start: <a class="type-ref" href="#Position">Position</a>}<span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-147">
<div class="comment"><p>Derived a new range from this range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="change"></a><span class="ts" id=148 data-target="#details-148" data-toggle="collapse"><span class="ident">change</span><span>: </span>{end: <a class="type-ref" href="#Position">Position</a>, start: <a class="type-ref" href="#Position">Position</a>}</span></td><td><div class="comment"><p>An object that describes a change to this range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range that reflects the given change. Will return <code>this</code> range if the change
is not changing anything.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="ReferenceContext"></a><span class="code-item" id=678>ReferenceContext</span>



<div class="comment"><p>Value-object that contains additional information when
requesting references.</p>
</div>

#### Properties



<a name="ReferenceContext.includeDeclaration"></a><span class="ts" id=679 data-target="#details-679" data-toggle="collapse"><span class="ident">includeDeclaration</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-679">
<div class="comment"><p>Include the declaration of the current symbol.</p>
</div>
</div>

### <a name="ReferenceProvider"></a><span class="code-item" id=680>ReferenceProvider</span>



<div class="comment"><p>The reference provider interface defines the contract between extensions and
the <a href="https://code.visualstudio.com/docs/editor/editingevolved#_peek">find references</a>-feature.</p>
</div>

#### Methods



<a name="ReferenceProvider.provideReferences"></a><span class="ts" id=682 data-target="#details-682" data-toggle="collapse"><span class="ident">provideReferences</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">context</span><span>: </span><a class="type-ref" href="#ReferenceContext">ReferenceContext</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#Location">Location</a>[]&gt;</span>
<div class="details collapse" id="details-682">
<div class="comment"><p>Provide a set of project-wide references for the given position and document.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=683 data-target="#details-683" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="position"></a><span class="ts" id=684 data-target="#details-684" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The position at which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="context"></a><span class="ts" id=685 data-target="#details-685" data-toggle="collapse"><span class="ident">context</span><span>: </span><a class="type-ref" href="#ReferenceContext">ReferenceContext</a></span></td><td><div class="comment"></div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=686 data-target="#details-686" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#Location">Location</a>[]&gt;</span></td><td><div class="comment"><p>An array of locations or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="RelativePattern"></a><span class="code-item" id=518>RelativePattern</span>



<div class="comment"><p>A relative pattern is a helper to construct glob patterns that are matched
relatively to a base path. The base path can either be an absolute file path
or a <a href="#WorkspaceFolder">workspace folder</a>.</p>
</div>

#### Constructors



<a name="RelativePattern.new RelativePattern"></a><span class="ts" id=522 data-target="#details-522" data-toggle="collapse"><span class="ident">new RelativePattern</span><span>(</span><span class="ident">base</span><span>: </span><a class="type-ref" href="#WorkspaceFolder">WorkspaceFolder</a> &#124; <a class="type-intrinsic">string</a>, <span class="ident">pattern</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#RelativePattern">RelativePattern</a></span>
<div class="details collapse" id="details-522">
<div class="comment"><p>Creates a new relative pattern object with a base path and pattern to match. This pattern
will be matched on file paths relative to the base path.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="base"></a><span class="ts" id=523 data-target="#details-523" data-toggle="collapse"><span class="ident">base</span><span>: </span><a class="type-ref" href="#WorkspaceFolder">WorkspaceFolder</a> &#124; <a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A base file path to which this pattern will be matched against relatively.</p>
</div></td></tr>
<tr><td><a name="pattern"></a><span class="ts" id=524 data-target="#details-524" data-toggle="collapse"><span class="ident">pattern</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A file glob pattern like <code>*.{ts,js}</code> that will be matched on file paths
relative to the base path.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#RelativePattern">RelativePattern</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="RelativePattern.base"></a><span class="ts" id=519 data-target="#details-519" data-toggle="collapse"><span class="ident">base</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-519">
<div class="comment"><p>A base file path to which this pattern will be matched against relatively.</p>
</div>
</div>



<a name="RelativePattern.pattern"></a><span class="ts" id=520 data-target="#details-520" data-toggle="collapse"><span class="ident">pattern</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-520">
<div class="comment"><p>A file glob pattern like <code>*.{ts,js}</code> that will be matched on file paths
relative to the base path.</p>
<p>Example: Given a base of <code>/home/work/folder</code> and a file path of <code>/home/work/folder/index.js</code>,
the file glob pattern will match on <code>index.js</code>.</p>
</div>
</div>

### <a name="RenameProvider"></a><span class="code-item" id=762>RenameProvider</span>



<div class="comment"><p>The rename provider interface defines the contract between extensions and
the <a href="https://code.visualstudio.com/docs/editor/editingevolved#_rename-symbol">rename</a>-feature.</p>
</div>

#### Methods



<a name="RenameProvider.provideRenameEdits"></a><span class="ts" id=764 data-target="#details-764" data-toggle="collapse"><span class="ident">provideRenameEdits</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">newName</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#WorkspaceEdit">WorkspaceEdit</a>&gt;</span>
<div class="details collapse" id="details-764">
<div class="comment"><p>Provide an edit that describes changes that have to be made to one
or many resources to rename a symbol to a different name.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=765 data-target="#details-765" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="position"></a><span class="ts" id=766 data-target="#details-766" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The position at which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="newName"></a><span class="ts" id=767 data-target="#details-767" data-toggle="collapse"><span class="ident">newName</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The new name of the symbol. If the given name is not valid, the provider must return a rejected promise.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=768 data-target="#details-768" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#WorkspaceEdit">WorkspaceEdit</a>&gt;</span></td><td><div class="comment"><p>A workspace edit or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code> or <code>null</code>.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="SaveDialogOptions"></a><span class="code-item" id=496>SaveDialogOptions</span>



<div class="comment"><p>Options to configure the behaviour of a file save dialog.</p>
</div>

#### Properties



<a name="SaveDialogOptions.defaultUri"></a><span class="ts" id=497 data-target="#details-497" data-toggle="collapse"><span class="ident">defaultUri</span><span>?</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span>
<div class="details collapse" id="details-497">
<div class="comment"><p>The resource the dialog shows when opened.</p>
</div>
</div>



<a name="SaveDialogOptions.filters"></a><span class="ts" id=499 data-target="#details-499" data-toggle="collapse"><span class="ident">filters</span><span>?</span><span>: </span></span>
<div class="details collapse" id="details-499">
<div class="comment"><p>A set of file filters that are used by the dialog. Each entry is a human readable label,
like &quot;TypeScript&quot;, and an array of extensions, e.g.</p>

<pre><code class="lang-ts">{
    <span class="hljs-string">'Images'</span>: [<span class="hljs-string">'png'</span>, <span class="hljs-string">'jpg'</span>]
    <span class="hljs-string">'TypeScript'</span>: [<span class="hljs-string">'ts'</span>, <span class="hljs-string">'tsx'</span>]
}
</code></pre>
</div>
</div>



<a name="SaveDialogOptions.saveLabel"></a><span class="ts" id=498 data-target="#details-498" data-toggle="collapse"><span class="ident">saveLabel</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-498">
<div class="comment"><p>A human-readable string for the save button.</p>
</div>
</div>

### <a name="Selection"></a><span class="code-item" id=152>Selection</span>



<div class="comment"><p>Represents a text selection in an editor.</p>
</div>

#### Constructors



<a name="Selection.new Selection"></a><span class="ts" id=156 data-target="#details-156" data-toggle="collapse"><span class="ident">new Selection</span><span>(</span><span class="ident">anchor</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">active</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-ref" href="#Selection">Selection</a></span>
<div class="details collapse" id="details-156">
<div class="comment"><p>Create a selection from two postions.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="anchor"></a><span class="ts" id=157 data-target="#details-157" data-toggle="collapse"><span class="ident">anchor</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><td><a name="active"></a><span class="ts" id=158 data-target="#details-158" data-toggle="collapse"><span class="ident">active</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Selection">Selection</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="Selection.new Selection"></a><span class="ts" id=159 data-target="#details-159" data-toggle="collapse"><span class="ident">new Selection</span><span>(</span><span class="ident">anchorLine</span><span>: </span><a class="type-intrinsic">number</a>, <span class="ident">anchorCharacter</span><span>: </span><a class="type-intrinsic">number</a>, <span class="ident">activeLine</span><span>: </span><a class="type-intrinsic">number</a>, <span class="ident">activeCharacter</span><span>: </span><a class="type-intrinsic">number</a><span>)</span><span>: </span><a class="type-ref" href="#Selection">Selection</a></span>
<div class="details collapse" id="details-159">
<div class="comment"><p>Create a selection from four coordinates.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="anchorLine"></a><span class="ts" id=160 data-target="#details-160" data-toggle="collapse"><span class="ident">anchorLine</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>A zero-based line value.</p>
</div></td></tr>
<tr><td><a name="anchorCharacter"></a><span class="ts" id=161 data-target="#details-161" data-toggle="collapse"><span class="ident">anchorCharacter</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>A zero-based character value.</p>
</div></td></tr>
<tr><td><a name="activeLine"></a><span class="ts" id=162 data-target="#details-162" data-toggle="collapse"><span class="ident">activeLine</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>A zero-based line value.</p>
</div></td></tr>
<tr><td><a name="activeCharacter"></a><span class="ts" id=163 data-target="#details-163" data-toggle="collapse"><span class="ident">activeCharacter</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>A zero-based character value.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Selection">Selection</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="Selection.active"></a><span class="ts" id=154 data-target="#details-154" data-toggle="collapse"><span class="ident">active</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-154">
<div class="comment"><p>The position of the cursor.
This position might be before or after <a href="#Selection.anchor">anchor</a>.</p>
</div>
</div>



<a name="Selection.anchor"></a><span class="ts" id=153 data-target="#details-153" data-toggle="collapse"><span class="ident">anchor</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-153">
<div class="comment"><p>The position at which the selection starts.
This position might be before or after <a href="#Selection.active">active</a>.</p>
</div>
</div>



<a name="Selection.end"></a><span class="ts" id=166 data-target="#details-166" data-toggle="collapse"><span class="ident">end</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-166">
<div class="comment"><p>The end position. It is after or equal to <a href="#Range.start">start</a>.</p>
</div>
</div>



<a name="Selection.isEmpty"></a><span class="ts" id=167 data-target="#details-167" data-toggle="collapse"><span class="ident">isEmpty</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-167">
<div class="comment"><p><code>true</code> if <code>start</code> and <code>end</code> are equal.</p>
</div>
</div>



<a name="Selection.isReversed"></a><span class="ts" id=164 data-target="#details-164" data-toggle="collapse"><span class="ident">isReversed</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-164">
<div class="comment"><p>A selection is reversed if <a href="#Selection.active">active</a>.isBefore(<a href="#Selection.anchor">anchor</a>).</p>
</div>
</div>



<a name="Selection.isSingleLine"></a><span class="ts" id=168 data-target="#details-168" data-toggle="collapse"><span class="ident">isSingleLine</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-168">
<div class="comment"><p><code>true</code> if <code>start.line</code> and <code>end.line</code> are equal.</p>
</div>
</div>



<a name="Selection.start"></a><span class="ts" id=165 data-target="#details-165" data-toggle="collapse"><span class="ident">start</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-165">
<div class="comment"><p>The start position. It is before or equal to <a href="#Range.end">end</a>.</p>
</div>
</div>

#### Methods



<a name="Selection.contains"></a><span class="ts" id=170 data-target="#details-170" data-toggle="collapse"><span class="ident">contains</span><span>(</span><span class="ident">positionOrRange</span><span>: </span><a class="type-ref" href="#Position">Position</a> &#124; <a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-170">
<div class="comment"><p>Check if a position or a range is contained in this range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="positionOrRange"></a><span class="ts" id=171 data-target="#details-171" data-toggle="collapse"><span class="ident">positionOrRange</span><span>: </span><a class="type-ref" href="#Position">Position</a> &#124; <a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A position or a range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p><code>true</code> if the position or range is inside or equal
to this range.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Selection.intersection"></a><span class="ts" id=176 data-target="#details-176" data-toggle="collapse"><span class="ident">intersection</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a> &#124; <a class="type-intrinsic">undefined</a></span>
<div class="details collapse" id="details-176">
<div class="comment"><p>Intersect <code>range</code> with this range and returns a new range or <code>undefined</code>
if the ranges have no overlap.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=177 data-target="#details-177" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a> &#124; <a class="type-intrinsic">undefined</a></span></td><td><div class="comment"><p>A range of the greater start and smaller end positions. Will
return undefined when there is no overlap.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Selection.isEqual"></a><span class="ts" id=173 data-target="#details-173" data-toggle="collapse"><span class="ident">isEqual</span><span>(</span><span class="ident">other</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-173">
<div class="comment"><p>Check if <code>other</code> equals this range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="other"></a><span class="ts" id=174 data-target="#details-174" data-toggle="collapse"><span class="ident">other</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p><code>true</code> when start and end are <a href="#Position.isEqual">equal</a> to
start and end of this range.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Selection.union"></a><span class="ts" id=179 data-target="#details-179" data-toggle="collapse"><span class="ident">union</span><span>(</span><span class="ident">other</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-179">
<div class="comment"><p>Compute the union of <code>other</code> with this range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="other"></a><span class="ts" id=180 data-target="#details-180" data-toggle="collapse"><span class="ident">other</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range of smaller start position and the greater end position.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Selection.with"></a><span class="ts" id=182 data-target="#details-182" data-toggle="collapse"><span class="ident">with</span><span>(</span><span class="ident">start</span><span>?</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">end</span><span>?</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-182">
<div class="comment"><p>Derived a new range from this range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="start"></a><span class="ts" id=183 data-target="#details-183" data-toggle="collapse"><span class="ident">start</span><span>?</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position that should be used as start. The default value is the <a href="#Range.start">current start</a>.</p>
</div></td></tr>
<tr><td><a name="end"></a><span class="ts" id=184 data-target="#details-184" data-toggle="collapse"><span class="ident">end</span><span>?</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position that should be used as end. The default value is the <a href="#Range.end">current end</a>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range derived from this range with the given start and end position.
If start and end are not different <code>this</code> range will be returned.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Selection.with"></a><span class="ts" id=185 data-target="#details-185" data-toggle="collapse"><span class="ident">with</span><span>(</span><span class="ident">change</span><span>: </span>{end: <a class="type-ref" href="#Position">Position</a>, start: <a class="type-ref" href="#Position">Position</a>}<span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-185">
<div class="comment"><p>Derived a new range from this range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="change"></a><span class="ts" id=186 data-target="#details-186" data-toggle="collapse"><span class="ident">change</span><span>: </span>{end: <a class="type-ref" href="#Position">Position</a>, start: <a class="type-ref" href="#Position">Position</a>}</span></td><td><div class="comment"><p>An object that describes a change to this range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range that reflects the given change. Will return <code>this</code> range if the change
is not changing anything.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="ShellExecution"></a><span class="code-item" id=1216>ShellExecution</span>



<div class="comment"></div>

#### Constructors



<a name="ShellExecution.new ShellExecution"></a><span class="ts" id=1218 data-target="#details-1218" data-toggle="collapse"><span class="ident">new ShellExecution</span><span>(</span><span class="ident">commandLine</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#ShellExecutionOptions">ShellExecutionOptions</a><span>)</span><span>: </span><a class="type-ref" href="#ShellExecution">ShellExecution</a></span>
<div class="details collapse" id="details-1218">
<div class="comment"><p>Creates a process execution.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="commandLine"></a><span class="ts" id=1219 data-target="#details-1219" data-toggle="collapse"><span class="ident">commandLine</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The command line to execute.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=1220 data-target="#details-1220" data-toggle="collapse"><span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#ShellExecutionOptions">ShellExecutionOptions</a></span></td><td><div class="comment"><p>Optional options for the started the shell.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ShellExecution">ShellExecution</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="ShellExecution.commandLine"></a><span class="ts" id=1221 data-target="#details-1221" data-toggle="collapse"><span class="ident">commandLine</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1221">
<div class="comment"><p>The shell command line</p>
</div>
</div>



<a name="ShellExecution.options"></a><span class="ts" id=1222 data-target="#details-1222" data-toggle="collapse"><span class="ident">options</span><span>?</span><span>: </span><a class="type-ref" href="#ShellExecutionOptions">ShellExecutionOptions</a></span>
<div class="details collapse" id="details-1222">
<div class="comment"><p>The shell options used when the command line is executed in a shell.
Defaults to undefined.</p>
</div>
</div>

### <a name="ShellExecutionOptions"></a><span class="code-item" id=1208>ShellExecutionOptions</span>



<div class="comment"><p>Options for a shell execution</p>
</div>

#### Properties



<a name="ShellExecutionOptions.cwd"></a><span class="ts" id=1211 data-target="#details-1211" data-toggle="collapse"><span class="ident">cwd</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1211">
<div class="comment"><p>The current working directory of the executed shell.
If omitted the tools current workspace root is used.</p>
</div>
</div>



<a name="ShellExecutionOptions.env"></a><span class="ts" id=1212 data-target="#details-1212" data-toggle="collapse"><span class="ident">env</span><span>?</span><span>: </span></span>
<div class="details collapse" id="details-1212">
<div class="comment"><p>The additional environment of the executed shell. If omitted
the parent process&#39; environment is used. If provided it is merged with
the parent process&#39; environment.</p>
</div>
</div>



<a name="ShellExecutionOptions.executable"></a><span class="ts" id=1209 data-target="#details-1209" data-toggle="collapse"><span class="ident">executable</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1209">
<div class="comment"><p>The shell executable.</p>
</div>
</div>



<a name="ShellExecutionOptions.shellArgs"></a><span class="ts" id=1210 data-target="#details-1210" data-toggle="collapse"><span class="ident">shellArgs</span><span>?</span><span>: </span><a class="type-intrinsic">string</a>[]</span>
<div class="details collapse" id="details-1210">
<div class="comment"><p>The arguments to be passed to the shell executable used to run the task.</p>
</div>
</div>

### <a name="SignatureHelp"></a><span class="code-item" id=810>SignatureHelp</span>



<div class="comment"><p>Signature help represents the signature of something
callable. There can be multiple signatures but only one
active and only one active parameter.</p>
</div>

#### Properties



<a name="SignatureHelp.activeParameter"></a><span class="ts" id=813 data-target="#details-813" data-toggle="collapse"><span class="ident">activeParameter</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-813">
<div class="comment"><p>The active parameter of the active signature.</p>
</div>
</div>



<a name="SignatureHelp.activeSignature"></a><span class="ts" id=812 data-target="#details-812" data-toggle="collapse"><span class="ident">activeSignature</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-812">
<div class="comment"><p>The active signature.</p>
</div>
</div>



<a name="SignatureHelp.signatures"></a><span class="ts" id=811 data-target="#details-811" data-toggle="collapse"><span class="ident">signatures</span><span>: </span><a class="type-ref" href="#SignatureInformation">SignatureInformation</a>[]</span>
<div class="details collapse" id="details-811">
<div class="comment"><p>One or more signatures.</p>
</div>
</div>

### <a name="SignatureHelpProvider"></a><span class="code-item" id=814>SignatureHelpProvider</span>



<div class="comment"><p>The signature help provider interface defines the contract between extensions and
the <a href="https://code.visualstudio.com/docs/editor/intellisense">parameter hints</a>-feature.</p>
</div>

#### Methods



<a name="SignatureHelpProvider.provideSignatureHelp"></a><span class="ts" id=816 data-target="#details-816" data-toggle="collapse"><span class="ident">provideSignatureHelp</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#SignatureHelp">SignatureHelp</a>&gt;</span>
<div class="details collapse" id="details-816">
<div class="comment"><p>Provide help for the signature at the given position and document.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=817 data-target="#details-817" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="position"></a><span class="ts" id=818 data-target="#details-818" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The position at which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=819 data-target="#details-819" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#SignatureHelp">SignatureHelp</a>&gt;</span></td><td><div class="comment"><p>Signature help or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code> or <code>null</code>.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="SignatureInformation"></a><span class="code-item" id=802>SignatureInformation</span>



<div class="comment"><p>Represents the signature of something callable. A signature
can have a label, like a function-name, a doc-comment, and
a set of parameters.</p>
</div>

#### Constructors



<a name="SignatureInformation.new SignatureInformation"></a><span class="ts" id=807 data-target="#details-807" data-toggle="collapse"><span class="ident">new SignatureInformation</span><span>(</span><span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">documentation</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#MarkdownString">MarkdownString</a><span>)</span><span>: </span><a class="type-ref" href="#SignatureInformation">SignatureInformation</a></span>
<div class="details collapse" id="details-807">
<div class="comment"><p>Creates a new signature information object.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="label"></a><span class="ts" id=808 data-target="#details-808" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A label string.</p>
</div></td></tr>
<tr><td><a name="documentation"></a><span class="ts" id=809 data-target="#details-809" data-toggle="collapse"><span class="ident">documentation</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#MarkdownString">MarkdownString</a></span></td><td><div class="comment"><p>A doc string.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#SignatureInformation">SignatureInformation</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="SignatureInformation.documentation"></a><span class="ts" id=804 data-target="#details-804" data-toggle="collapse"><span class="ident">documentation</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#MarkdownString">MarkdownString</a></span>
<div class="details collapse" id="details-804">
<div class="comment"><p>The human-readable doc-comment of this signature. Will be shown
in the UI but can be omitted.</p>
</div>
</div>



<a name="SignatureInformation.label"></a><span class="ts" id=803 data-target="#details-803" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-803">
<div class="comment"><p>The label of this signature. Will be shown in
the UI.</p>
</div>
</div>



<a name="SignatureInformation.parameters"></a><span class="ts" id=805 data-target="#details-805" data-toggle="collapse"><span class="ident">parameters</span><span>: </span><a class="type-ref" href="#ParameterInformation">ParameterInformation</a>[]</span>
<div class="details collapse" id="details-805">
<div class="comment"><p>The parameters of this signature.</p>
</div>
</div>

### <a name="SnippetString"></a><span class="code-item" id=737>SnippetString</span>



<div class="comment"><p>A snippet string is a template which allows to insert text
and to control the editor cursor when insertion happens.</p>
<p>A snippet can define tab stops and placeholders with <code>$1</code>, <code>$2</code>
and <code>${3:foo}</code>. <code>$0</code> defines the final tab stop, it defaults to
the end of the snippet. Variables are defined with <code>$name</code> and
<code>${name:default value}</code>. The full snippet syntax is documented
<a href="http://code.visualstudio.com/docs/editor/userdefinedsnippets#_creating-your-own-snippets">here</a>.</p>
</div>

#### Constructors



<a name="SnippetString.new SnippetString"></a><span class="ts" id=740 data-target="#details-740" data-toggle="collapse"><span class="ident">new SnippetString</span><span>(</span><span class="ident">value</span><span>?</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#SnippetString">SnippetString</a></span>
<div class="details collapse" id="details-740">
<div class="comment"></div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="value"></a><span class="ts" id=741 data-target="#details-741" data-toggle="collapse"><span class="ident">value</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"></div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#SnippetString">SnippetString</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="SnippetString.value"></a><span class="ts" id=738 data-target="#details-738" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-738">
<div class="comment"><p>The snippet string.</p>
</div>
</div>

#### Methods



<a name="SnippetString.appendPlaceholder"></a><span class="ts" id=749 data-target="#details-749" data-toggle="collapse"><span class="ident">appendPlaceholder</span><span>(</span><span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a> &#124; (snippet: <a class="type-ref" href="#SnippetString">SnippetString</a>) =&gt; <a class="type-intrinsic">any</a>, <span class="ident">number</span><span>?</span><span>: </span><a class="type-intrinsic">number</a><span>)</span><span>: </span><a class="type-ref" href="#SnippetString">SnippetString</a></span>
<div class="details collapse" id="details-749">
<div class="comment"><p>Builder-function that appends a placeholder (<code>${1:value}</code>) to
the <a href="#SnippetString.value"><code>value</code></a> of this snippet string.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="value"></a><span class="ts" id=750 data-target="#details-750" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a> &#124; (snippet: <a class="type-ref" href="#SnippetString">SnippetString</a>) =&gt; <a class="type-intrinsic">any</a></span></td><td><div class="comment"><p>The value of this placeholder - either a string or a function
with which a nested snippet can be created.</p>
</div></td></tr>
<tr><td><a name="number"></a><span class="ts" id=754 data-target="#details-754" data-toggle="collapse"><span class="ident">number</span><span>?</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>The number of this tabstop, defaults to an auto-incremet
value starting at 1.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#SnippetString">SnippetString</a></span></td><td><div class="comment"><p>This snippet string.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="SnippetString.appendTabstop"></a><span class="ts" id=746 data-target="#details-746" data-toggle="collapse"><span class="ident">appendTabstop</span><span>(</span><span class="ident">number</span><span>?</span><span>: </span><a class="type-intrinsic">number</a><span>)</span><span>: </span><a class="type-ref" href="#SnippetString">SnippetString</a></span>
<div class="details collapse" id="details-746">
<div class="comment"><p>Builder-function that appends a tabstop (<code>$1</code>, <code>$2</code> etc) to
the <a href="#SnippetString.value"><code>value</code></a> of this snippet string.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="number"></a><span class="ts" id=747 data-target="#details-747" data-toggle="collapse"><span class="ident">number</span><span>?</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>The number of this tabstop, defaults to an auto-incremet
value starting at 1.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#SnippetString">SnippetString</a></span></td><td><div class="comment"><p>This snippet string.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="SnippetString.appendText"></a><span class="ts" id=743 data-target="#details-743" data-toggle="collapse"><span class="ident">appendText</span><span>(</span><span class="ident">string</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#SnippetString">SnippetString</a></span>
<div class="details collapse" id="details-743">
<div class="comment"><p>Builder-function that appends the given string to
the <a href="#SnippetString.value"><code>value</code></a> of this snippet string.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="string"></a><span class="ts" id=744 data-target="#details-744" data-toggle="collapse"><span class="ident">string</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A value to append &#39;as given&#39;. The string will be escaped.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#SnippetString">SnippetString</a></span></td><td><div class="comment"><p>This snippet string.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="SnippetString.appendVariable"></a><span class="ts" id=756 data-target="#details-756" data-toggle="collapse"><span class="ident">appendVariable</span><span>(</span><span class="ident">name</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">defaultValue</span><span>: </span><a class="type-intrinsic">string</a> &#124; (snippet: <a class="type-ref" href="#SnippetString">SnippetString</a>) =&gt; <a class="type-intrinsic">any</a><span>)</span><span>: </span><a class="type-ref" href="#SnippetString">SnippetString</a></span>
<div class="details collapse" id="details-756">
<div class="comment"><p>Builder-function that appends a variable (<code>${VAR}</code>) to
the <a href="#SnippetString.value"><code>value</code></a> of this snippet string.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="name"></a><span class="ts" id=757 data-target="#details-757" data-toggle="collapse"><span class="ident">name</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The name of the variable - excluding the <code>$</code>.</p>
</div></td></tr>
<tr><td><a name="defaultValue"></a><span class="ts" id=758 data-target="#details-758" data-toggle="collapse"><span class="ident">defaultValue</span><span>: </span><a class="type-intrinsic">string</a> &#124; (snippet: <a class="type-ref" href="#SnippetString">SnippetString</a>) =&gt; <a class="type-intrinsic">any</a></span></td><td><div class="comment"><p>The default value which is used when the variable name cannot
be resolved - either a string or a function with which a nested snippet can be created.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#SnippetString">SnippetString</a></span></td><td><div class="comment"><p>This snippet string.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="SourceControl"></a><span class="code-item" id=1358>SourceControl</span>



<div class="comment"><p>An source control is able to provide <a href="#SourceControlResourceState">resource states</a>
to the editor and interact with the editor in several source control related ways.</p>
</div>

#### Properties



<a name="SourceControl.acceptInputCommand"></a><span class="ts" id=1366 data-target="#details-1366" data-toggle="collapse"><span class="ident">acceptInputCommand</span><span>?</span><span>: </span><a class="type-ref" href="#Command">Command</a></span>
<div class="details collapse" id="details-1366">
<div class="comment"><p>Optional accept input command.</p>
<p>This command will be invoked when the user accepts the value
in the Source Control input.</p>
</div>
</div>



<a name="SourceControl.commitTemplate"></a><span class="ts" id=1365 data-target="#details-1365" data-toggle="collapse"><span class="ident">commitTemplate</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1365">
<div class="comment"><p>Optional commit template string.</p>
<p>The Source Control viewlet will populate the Source Control
input with this value when appropriate.</p>
</div>
</div>



<a name="SourceControl.count"></a><span class="ts" id=1363 data-target="#details-1363" data-toggle="collapse"><span class="ident">count</span><span>?</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-1363">
<div class="comment"><p>The UI-visible count of <a href="#SourceControlResourceState">resource states</a> of
this source control.</p>
<p>Equals to the total number of <a href="#SourceControlResourceState">resource state</a>
of this source control, if undefined.</p>
</div>
</div>



<a name="SourceControl.id"></a><span class="ts" id=1359 data-target="#details-1359" data-toggle="collapse"><span class="ident">id</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1359">
<div class="comment"><p>The id of this source control.</p>
</div>
</div>



<a name="SourceControl.inputBox"></a><span class="ts" id=1362 data-target="#details-1362" data-toggle="collapse"><span class="ident">inputBox</span><span>: </span><a class="type-ref" href="#SourceControlInputBox">SourceControlInputBox</a></span>
<div class="details collapse" id="details-1362">
<div class="comment"><p>The <a href="#SourceControlInputBox">input box</a> for this source control.</p>
</div>
</div>



<a name="SourceControl.label"></a><span class="ts" id=1360 data-target="#details-1360" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1360">
<div class="comment"><p>The human-readable label of this source control.</p>
</div>
</div>



<a name="SourceControl.quickDiffProvider"></a><span class="ts" id=1364 data-target="#details-1364" data-toggle="collapse"><span class="ident">quickDiffProvider</span><span>?</span><span>: </span><a class="type-ref" href="#QuickDiffProvider">QuickDiffProvider</a></span>
<div class="details collapse" id="details-1364">
<div class="comment"><p>An optional <a href="#QuickDiffProvider">quick diff provider</a>.</p>
</div>
</div>



<a name="SourceControl.rootUri"></a><span class="ts" id=1361 data-target="#details-1361" data-toggle="collapse"><span class="ident">rootUri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a> &#124; <a class="type-intrinsic">undefined</a></span>
<div class="details collapse" id="details-1361">
<div class="comment"><p>The (optional) Uri of the root of this source control.</p>
</div>
</div>



<a name="SourceControl.statusBarCommands"></a><span class="ts" id=1367 data-target="#details-1367" data-toggle="collapse"><span class="ident">statusBarCommands</span><span>?</span><span>: </span><a class="type-ref" href="#Command">Command</a>[]</span>
<div class="details collapse" id="details-1367">
<div class="comment"><p>Optional status bar commands.</p>
<p>These commands will be displayed in the editor&#39;s status bar.</p>
</div>
</div>

#### Methods



<a name="SourceControl.createResourceGroup"></a><span class="ts" id=1369 data-target="#details-1369" data-toggle="collapse"><span class="ident">createResourceGroup</span><span>(</span><span class="ident">id</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#SourceControlResourceGroup">SourceControlResourceGroup</a></span>
<div class="details collapse" id="details-1369">
<div class="comment"><p>Create a new <a href="#SourceControlResourceGroup">resource group</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="id"></a><span class="ts" id=1370 data-target="#details-1370" data-toggle="collapse"><span class="ident">id</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"></div></td></tr>
<tr><td><a name="label"></a><span class="ts" id=1371 data-target="#details-1371" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"></div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#SourceControlResourceGroup">SourceControlResourceGroup</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="SourceControl.dispose"></a><span class="ts" id=1373 data-target="#details-1373" data-toggle="collapse"><span class="ident">dispose</span><span>(</span><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1373">
<div class="comment"><p>Dispose this source control.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="SourceControlInputBox"></a><span class="code-item" id=1331>SourceControlInputBox</span>



<div class="comment"><p>Represents the input box in the Source Control viewlet.</p>
</div>

#### Properties



<a name="SourceControlInputBox.value"></a><span class="ts" id=1332 data-target="#details-1332" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1332">
<div class="comment"><p>Setter and getter for the contents of the input box.</p>
</div>
</div>

### <a name="SourceControlResourceDecorations"></a><span class="code-item" id=1340>SourceControlResourceDecorations</span>



<div class="comment"><p>The decorations for a <a href="#SourceControlResourceState">source control resource state</a>.
Can be independently specified for light and dark themes.</p>
</div>

#### Properties



<a name="SourceControlResourceDecorations.dark"></a><span class="ts" id=1345 data-target="#details-1345" data-toggle="collapse"><span class="ident">dark</span><span>?</span><span>: </span><a class="type-ref" href="#SourceControlResourceThemableDecorations">SourceControlResourceThemableDecorations</a></span>
<div class="details collapse" id="details-1345">
<div class="comment"><p>The dark theme decorations.</p>
</div>
</div>



<a name="SourceControlResourceDecorations.faded"></a><span class="ts" id=1342 data-target="#details-1342" data-toggle="collapse"><span class="ident">faded</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-1342">
<div class="comment"><p>Whether the <a href="#SourceControlResourceState">source control resource state</a> should
be faded in the UI.</p>
</div>
</div>



<a name="SourceControlResourceDecorations.iconPath"></a><span class="ts" id=1346 data-target="#details-1346" data-toggle="collapse"><span class="ident">iconPath</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#Uri">Uri</a></span>
<div class="details collapse" id="details-1346">
<div class="comment"><p>The icon path for a specific
<a href="#SourceControlResourceState">source control resource state</a>.</p>
</div>
</div>



<a name="SourceControlResourceDecorations.light"></a><span class="ts" id=1344 data-target="#details-1344" data-toggle="collapse"><span class="ident">light</span><span>?</span><span>: </span><a class="type-ref" href="#SourceControlResourceThemableDecorations">SourceControlResourceThemableDecorations</a></span>
<div class="details collapse" id="details-1344">
<div class="comment"><p>The light theme decorations.</p>
</div>
</div>



<a name="SourceControlResourceDecorations.strikeThrough"></a><span class="ts" id=1341 data-target="#details-1341" data-toggle="collapse"><span class="ident">strikeThrough</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-1341">
<div class="comment"><p>Whether the <a href="#SourceControlResourceState">source control resource state</a> should
be striked-through in the UI.</p>
</div>
</div>



<a name="SourceControlResourceDecorations.tooltip"></a><span class="ts" id=1343 data-target="#details-1343" data-toggle="collapse"><span class="ident">tooltip</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1343">
<div class="comment"><p>The title for a specific
<a href="#SourceControlResourceState">source control resource state</a>.</p>
</div>
</div>

### <a name="SourceControlResourceGroup"></a><span class="code-item" id=1351>SourceControlResourceGroup</span>



<div class="comment"><p>A source control resource group is a collection of
<a href="#SourceControlResourceState">source control resource states</a>.</p>
</div>

#### Properties



<a name="SourceControlResourceGroup.hideWhenEmpty"></a><span class="ts" id=1354 data-target="#details-1354" data-toggle="collapse"><span class="ident">hideWhenEmpty</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-1354">
<div class="comment"><p>Whether this source control resource group is hidden when it contains
no <a href="#SourceControlResourceState">source control resource states</a>.</p>
</div>
</div>



<a name="SourceControlResourceGroup.id"></a><span class="ts" id=1352 data-target="#details-1352" data-toggle="collapse"><span class="ident">id</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1352">
<div class="comment"><p>The id of this source control resource group.</p>
</div>
</div>



<a name="SourceControlResourceGroup.label"></a><span class="ts" id=1353 data-target="#details-1353" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1353">
<div class="comment"><p>The label of this source control resource group.</p>
</div>
</div>



<a name="SourceControlResourceGroup.resourceStates"></a><span class="ts" id=1355 data-target="#details-1355" data-toggle="collapse"><span class="ident">resourceStates</span><span>: </span><a class="type-ref" href="#SourceControlResourceState">SourceControlResourceState</a>[]</span>
<div class="details collapse" id="details-1355">
<div class="comment"><p>This group&#39;s collection of
<a href="#SourceControlResourceState">source control resource states</a>.</p>
</div>
</div>

#### Methods



<a name="SourceControlResourceGroup.dispose"></a><span class="ts" id=1357 data-target="#details-1357" data-toggle="collapse"><span class="ident">dispose</span><span>(</span><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1357">
<div class="comment"><p>Dispose this source control resource group.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="SourceControlResourceState"></a><span class="code-item" id=1347>SourceControlResourceState</span>



<div class="comment"><p>An source control resource state represents the state of an underlying workspace
resource within a certain <a href="#SourceControlResourceGroup">source control group</a>.</p>
</div>

#### Properties



<a name="SourceControlResourceState.command"></a><span class="ts" id=1349 data-target="#details-1349" data-toggle="collapse"><span class="ident">command</span><span>?</span><span>: </span><a class="type-ref" href="#Command">Command</a></span>
<div class="details collapse" id="details-1349">
<div class="comment"><p>The <a href="#Command">command</a> which should be run when the resource
state is open in the Source Control viewlet.</p>
</div>
</div>



<a name="SourceControlResourceState.decorations"></a><span class="ts" id=1350 data-target="#details-1350" data-toggle="collapse"><span class="ident">decorations</span><span>?</span><span>: </span><a class="type-ref" href="#SourceControlResourceDecorations">SourceControlResourceDecorations</a></span>
<div class="details collapse" id="details-1350">
<div class="comment"><p>The <a href="#SourceControlResourceDecorations">decorations</a> for this source control
resource state.</p>
</div>
</div>



<a name="SourceControlResourceState.resourceUri"></a><span class="ts" id=1348 data-target="#details-1348" data-toggle="collapse"><span class="ident">resourceUri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span>
<div class="details collapse" id="details-1348">
<div class="comment"><p>The <a href="#Uri">uri</a> of the underlying resource inside the workspace.</p>
</div>
</div>

### <a name="SourceControlResourceThemableDecorations"></a><span class="code-item" id=1338>SourceControlResourceThemableDecorations</span>



<div class="comment"><p>The theme-aware decorations for a
<a href="#SourceControlResourceState">source control resource state</a>.</p>
</div>

#### Properties



<a name="SourceControlResourceThemableDecorations.iconPath"></a><span class="ts" id=1339 data-target="#details-1339" data-toggle="collapse"><span class="ident">iconPath</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#Uri">Uri</a></span>
<div class="details collapse" id="details-1339">
<div class="comment"><p>The icon path for a specific
<a href="#SourceControlResourceState">source control resource state</a>.</p>
</div>
</div>

### <a name="StatusBarAlignment"></a><span class="code-item" id=1095>StatusBarAlignment</span>



<div class="comment"><p>Represents the alignment of status bar items.</p>
</div>

#### Enumeration members



<a name="StatusBarAlignment.Left"></a><span class="ts" id=1096 data-target="#details-1096" data-toggle="collapse"><span class="ident">Left</span></span>
<div class="details collapse" id="details-1096">
<em>1</em>
</div>



<a name="StatusBarAlignment.Right"></a><span class="ts" id=1097 data-target="#details-1097" data-toggle="collapse"><span class="ident">Right</span></span>
<div class="details collapse" id="details-1097">
<em>2</em>
</div>

### <a name="StatusBarItem"></a><span class="code-item" id=1098>StatusBarItem</span>



<div class="comment"><p>A status bar item is a status bar contribution that can
show text and icons and run a command on click.</p>
</div>

#### Properties



<a name="StatusBarItem.alignment"></a><span class="ts" id=1099 data-target="#details-1099" data-toggle="collapse"><span class="ident">alignment</span><span>: </span><a class="type-ref" href="#StatusBarAlignment">StatusBarAlignment</a></span>
<div class="details collapse" id="details-1099">
<div class="comment"><p>The alignment of this item.</p>
</div>
</div>



<a name="StatusBarItem.color"></a><span class="ts" id=1103 data-target="#details-1103" data-toggle="collapse"><span class="ident">color</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#ThemeColor">ThemeColor</a> &#124; <a class="type-intrinsic">undefined</a></span>
<div class="details collapse" id="details-1103">
<div class="comment"><p>The foreground color for this entry.</p>
</div>
</div>



<a name="StatusBarItem.command"></a><span class="ts" id=1104 data-target="#details-1104" data-toggle="collapse"><span class="ident">command</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a></span>
<div class="details collapse" id="details-1104">
<div class="comment"><p>The identifier of a command to run on click. The command must be
<a href="#commands.getCommands">known</a>.</p>
</div>
</div>



<a name="StatusBarItem.priority"></a><span class="ts" id=1100 data-target="#details-1100" data-toggle="collapse"><span class="ident">priority</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-1100">
<div class="comment"><p>The priority of this item. Higher value means the item should
be shown more to the left.</p>
</div>
</div>



<a name="StatusBarItem.text"></a><span class="ts" id=1101 data-target="#details-1101" data-toggle="collapse"><span class="ident">text</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1101">
<div class="comment"><p>The text to show for the entry. You can embed icons in the text by leveraging the syntax:</p>
<p><code>My text $(icon-name) contains icons like $(icon&#39;name) this one.</code></p>
<p>Where the icon-name is taken from the <a href="https://octicons.github.com">octicon</a> icon set, e.g.
<code>light-bulb</code>, <code>thumbsup</code>, <code>zap</code> etc.</p>
</div>
</div>



<a name="StatusBarItem.tooltip"></a><span class="ts" id=1102 data-target="#details-1102" data-toggle="collapse"><span class="ident">tooltip</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">undefined</a></span>
<div class="details collapse" id="details-1102">
<div class="comment"><p>The tooltip text when you hover over this entry.</p>
</div>
</div>

#### Methods



<a name="StatusBarItem.dispose"></a><span class="ts" id=1110 data-target="#details-1110" data-toggle="collapse"><span class="ident">dispose</span><span>(</span><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1110">
<div class="comment"><p>Dispose and free associated resources. Call
<a href="#StatusBarItem.hide">hide</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="StatusBarItem.hide"></a><span class="ts" id=1108 data-target="#details-1108" data-toggle="collapse"><span class="ident">hide</span><span>(</span><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1108">
<div class="comment"><p>Hide the entry in the status bar.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="StatusBarItem.show"></a><span class="ts" id=1106 data-target="#details-1106" data-toggle="collapse"><span class="ident">show</span><span>(</span><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1106">
<div class="comment"><p>Shows the entry in the status bar.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="SymbolInformation"></a><span class="code-item" id=647>SymbolInformation</span>



<div class="comment"><p>Represents information about programming constructs like variables, classes,
interfaces etc.</p>
</div>

#### Constructors



<a name="SymbolInformation.new SymbolInformation"></a><span class="ts" id=653 data-target="#details-653" data-toggle="collapse"><span class="ident">new SymbolInformation</span><span>(</span><span class="ident">name</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">kind</span><span>: </span><a class="type-ref" href="#SymbolKind">SymbolKind</a>, <span class="ident">containerName</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">location</span><span>: </span><a class="type-ref" href="#Location">Location</a><span>)</span><span>: </span><a class="type-ref" href="#SymbolInformation">SymbolInformation</a></span>
<div class="details collapse" id="details-653">
<div class="comment"><p>Creates a new symbol information object.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="name"></a><span class="ts" id=654 data-target="#details-654" data-toggle="collapse"><span class="ident">name</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The name of the symbol.</p>
</div></td></tr>
<tr><td><a name="kind"></a><span class="ts" id=655 data-target="#details-655" data-toggle="collapse"><span class="ident">kind</span><span>: </span><a class="type-ref" href="#SymbolKind">SymbolKind</a></span></td><td><div class="comment"><p>The kind of the symbol.</p>
</div></td></tr>
<tr><td><a name="containerName"></a><span class="ts" id=656 data-target="#details-656" data-toggle="collapse"><span class="ident">containerName</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The name of the symbol containing the symbol.</p>
</div></td></tr>
<tr><td><a name="location"></a><span class="ts" id=657 data-target="#details-657" data-toggle="collapse"><span class="ident">location</span><span>: </span><a class="type-ref" href="#Location">Location</a></span></td><td><div class="comment"><p>The the location of the symbol.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#SymbolInformation">SymbolInformation</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="SymbolInformation.new SymbolInformation"></a><span class="ts" id=658 data-target="#details-658" data-toggle="collapse"><span class="ident">new SymbolInformation</span><span>(</span><span class="ident">name</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">kind</span><span>: </span><a class="type-ref" href="#SymbolKind">SymbolKind</a>, <span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">uri</span><span>?</span><span>: </span><a class="type-ref" href="#Uri">Uri</a>, <span class="ident">containerName</span><span>?</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#SymbolInformation">SymbolInformation</a></span>
<div class="details collapse" id="details-658">
<div class="comment"><p><del>Creates a new symbol information object.</del></p>
<ul>
<li><em>deprecated</em> - Please use the constructor taking a <a href="#Location">location</a> object.</li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="name"></a><span class="ts" id=659 data-target="#details-659" data-toggle="collapse"><span class="ident">name</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The name of the symbol.</p>
</div></td></tr>
<tr><td><a name="kind"></a><span class="ts" id=660 data-target="#details-660" data-toggle="collapse"><span class="ident">kind</span><span>: </span><a class="type-ref" href="#SymbolKind">SymbolKind</a></span></td><td><div class="comment"><p>The kind of the symbol.</p>
</div></td></tr>
<tr><td><a name="range"></a><span class="ts" id=661 data-target="#details-661" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>The range of the location of the symbol.</p>
</div></td></tr>
<tr><td><a name="uri"></a><span class="ts" id=662 data-target="#details-662" data-toggle="collapse"><span class="ident">uri</span><span>?</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>The resource of the location of symbol, defaults to the current document.</p>
</div></td></tr>
<tr><td><a name="containerName"></a><span class="ts" id=663 data-target="#details-663" data-toggle="collapse"><span class="ident">containerName</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The name of the symbol containing the symbol.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#SymbolInformation">SymbolInformation</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="SymbolInformation.containerName"></a><span class="ts" id=649 data-target="#details-649" data-toggle="collapse"><span class="ident">containerName</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-649">
<div class="comment"><p>The name of the symbol containing this symbol.</p>
</div>
</div>



<a name="SymbolInformation.kind"></a><span class="ts" id=650 data-target="#details-650" data-toggle="collapse"><span class="ident">kind</span><span>: </span><a class="type-ref" href="#SymbolKind">SymbolKind</a></span>
<div class="details collapse" id="details-650">
<div class="comment"><p>The kind of this symbol.</p>
</div>
</div>



<a name="SymbolInformation.location"></a><span class="ts" id=651 data-target="#details-651" data-toggle="collapse"><span class="ident">location</span><span>: </span><a class="type-ref" href="#Location">Location</a></span>
<div class="details collapse" id="details-651">
<div class="comment"><p>The location of this symbol.</p>
</div>
</div>



<a name="SymbolInformation.name"></a><span class="ts" id=648 data-target="#details-648" data-toggle="collapse"><span class="ident">name</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-648">
<div class="comment"><p>The name of this symbol.</p>
</div>
</div>

### <a name="SymbolKind"></a><span class="code-item" id=620>SymbolKind</span>



<div class="comment"><p>A symbol kind.</p>
</div>

#### Enumeration members



<a name="SymbolKind.Array"></a><span class="ts" id=638 data-target="#details-638" data-toggle="collapse"><span class="ident">Array</span></span>
<div class="details collapse" id="details-638">
<em>17</em>
</div>



<a name="SymbolKind.Boolean"></a><span class="ts" id=637 data-target="#details-637" data-toggle="collapse"><span class="ident">Boolean</span></span>
<div class="details collapse" id="details-637">
<em>16</em>
</div>



<a name="SymbolKind.Class"></a><span class="ts" id=625 data-target="#details-625" data-toggle="collapse"><span class="ident">Class</span></span>
<div class="details collapse" id="details-625">
<em>4</em>
</div>



<a name="SymbolKind.Constant"></a><span class="ts" id=634 data-target="#details-634" data-toggle="collapse"><span class="ident">Constant</span></span>
<div class="details collapse" id="details-634">
<em>13</em>
</div>



<a name="SymbolKind.Constructor"></a><span class="ts" id=629 data-target="#details-629" data-toggle="collapse"><span class="ident">Constructor</span></span>
<div class="details collapse" id="details-629">
<em>8</em>
</div>



<a name="SymbolKind.Enum"></a><span class="ts" id=630 data-target="#details-630" data-toggle="collapse"><span class="ident">Enum</span></span>
<div class="details collapse" id="details-630">
<em>9</em>
</div>



<a name="SymbolKind.EnumMember"></a><span class="ts" id=642 data-target="#details-642" data-toggle="collapse"><span class="ident">EnumMember</span></span>
<div class="details collapse" id="details-642">
<em>21</em>
</div>



<a name="SymbolKind.Event"></a><span class="ts" id=644 data-target="#details-644" data-toggle="collapse"><span class="ident">Event</span></span>
<div class="details collapse" id="details-644">
<em>23</em>
</div>



<a name="SymbolKind.Field"></a><span class="ts" id=628 data-target="#details-628" data-toggle="collapse"><span class="ident">Field</span></span>
<div class="details collapse" id="details-628">
<em>7</em>
</div>



<a name="SymbolKind.File"></a><span class="ts" id=621 data-target="#details-621" data-toggle="collapse"><span class="ident">File</span></span>
<div class="details collapse" id="details-621">
<em>0</em>
</div>



<a name="SymbolKind.Function"></a><span class="ts" id=632 data-target="#details-632" data-toggle="collapse"><span class="ident">Function</span></span>
<div class="details collapse" id="details-632">
<em>11</em>
</div>



<a name="SymbolKind.Interface"></a><span class="ts" id=631 data-target="#details-631" data-toggle="collapse"><span class="ident">Interface</span></span>
<div class="details collapse" id="details-631">
<em>10</em>
</div>



<a name="SymbolKind.Key"></a><span class="ts" id=640 data-target="#details-640" data-toggle="collapse"><span class="ident">Key</span></span>
<div class="details collapse" id="details-640">
<em>19</em>
</div>



<a name="SymbolKind.Method"></a><span class="ts" id=626 data-target="#details-626" data-toggle="collapse"><span class="ident">Method</span></span>
<div class="details collapse" id="details-626">
<em>5</em>
</div>



<a name="SymbolKind.Module"></a><span class="ts" id=622 data-target="#details-622" data-toggle="collapse"><span class="ident">Module</span></span>
<div class="details collapse" id="details-622">
<em>1</em>
</div>



<a name="SymbolKind.Namespace"></a><span class="ts" id=623 data-target="#details-623" data-toggle="collapse"><span class="ident">Namespace</span></span>
<div class="details collapse" id="details-623">
<em>2</em>
</div>



<a name="SymbolKind.Null"></a><span class="ts" id=641 data-target="#details-641" data-toggle="collapse"><span class="ident">Null</span></span>
<div class="details collapse" id="details-641">
<em>20</em>
</div>



<a name="SymbolKind.Number"></a><span class="ts" id=636 data-target="#details-636" data-toggle="collapse"><span class="ident">Number</span></span>
<div class="details collapse" id="details-636">
<em>15</em>
</div>



<a name="SymbolKind.Object"></a><span class="ts" id=639 data-target="#details-639" data-toggle="collapse"><span class="ident">Object</span></span>
<div class="details collapse" id="details-639">
<em>18</em>
</div>



<a name="SymbolKind.Operator"></a><span class="ts" id=645 data-target="#details-645" data-toggle="collapse"><span class="ident">Operator</span></span>
<div class="details collapse" id="details-645">
<em>24</em>
</div>



<a name="SymbolKind.Package"></a><span class="ts" id=624 data-target="#details-624" data-toggle="collapse"><span class="ident">Package</span></span>
<div class="details collapse" id="details-624">
<em>3</em>
</div>



<a name="SymbolKind.Property"></a><span class="ts" id=627 data-target="#details-627" data-toggle="collapse"><span class="ident">Property</span></span>
<div class="details collapse" id="details-627">
<em>6</em>
</div>



<a name="SymbolKind.String"></a><span class="ts" id=635 data-target="#details-635" data-toggle="collapse"><span class="ident">String</span></span>
<div class="details collapse" id="details-635">
<em>14</em>
</div>



<a name="SymbolKind.Struct"></a><span class="ts" id=643 data-target="#details-643" data-toggle="collapse"><span class="ident">Struct</span></span>
<div class="details collapse" id="details-643">
<em>22</em>
</div>



<a name="SymbolKind.TypeParameter"></a><span class="ts" id=646 data-target="#details-646" data-toggle="collapse"><span class="ident">TypeParameter</span></span>
<div class="details collapse" id="details-646">
<em>25</em>
</div>



<a name="SymbolKind.Variable"></a><span class="ts" id=633 data-target="#details-633" data-toggle="collapse"><span class="ident">Variable</span></span>
<div class="details collapse" id="details-633">
<em>12</em>
</div>

### <a name="Task"></a><span class="code-item" id=1226>Task</span>



<div class="comment"><p>A task to execute</p>
</div>

#### Constructors



<a name="Task.new Task"></a><span class="ts" id=1228 data-target="#details-1228" data-toggle="collapse"><span class="ident">new Task</span><span>(</span><span class="ident">taskDefinition</span><span>: </span><a class="type-ref" href="#TaskDefinition">TaskDefinition</a>, <span class="ident">name</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">source</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">execution</span><span>?</span><span>: </span><a class="type-ref" href="#ProcessExecution">ProcessExecution</a> &#124; <a class="type-ref" href="#ShellExecution">ShellExecution</a>, <span class="ident">problemMatchers</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">string</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Task">Task</a></span>
<div class="details collapse" id="details-1228">
<div class="comment"><p><del>Creates a new task.</del></p>
<ul>
<li><em>deprecated</em> - Use the new constructors that allow specifying a target for the task.</li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="taskDefinition"></a><span class="ts" id=1229 data-target="#details-1229" data-toggle="collapse"><span class="ident">taskDefinition</span><span>: </span><a class="type-ref" href="#TaskDefinition">TaskDefinition</a></span></td><td><div class="comment"></div></td></tr>
<tr><td><a name="name"></a><span class="ts" id=1230 data-target="#details-1230" data-toggle="collapse"><span class="ident">name</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The task&#39;s name. Is presented in the user interface.</p>
</div></td></tr>
<tr><td><a name="source"></a><span class="ts" id=1231 data-target="#details-1231" data-toggle="collapse"><span class="ident">source</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The task&#39;s source (e.g. &#39;gulp&#39;, &#39;npm&#39;, ...). Is presented in the user interface.</p>
</div></td></tr>
<tr><td><a name="execution"></a><span class="ts" id=1232 data-target="#details-1232" data-toggle="collapse"><span class="ident">execution</span><span>?</span><span>: </span><a class="type-ref" href="#ProcessExecution">ProcessExecution</a> &#124; <a class="type-ref" href="#ShellExecution">ShellExecution</a></span></td><td><div class="comment"><p>The process or shell execution.</p>
</div></td></tr>
<tr><td><a name="problemMatchers"></a><span class="ts" id=1233 data-target="#details-1233" data-toggle="collapse"><span class="ident">problemMatchers</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">string</a>[]</span></td><td><div class="comment"><p>the names of problem matchers to use, like &#39;$tsc&#39;
 or &#39;$eslint&#39;. Problem matchers can be contributed by an extension using
 the <code>problemMatchers</code> extension point.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Task">Task</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="Task.new Task"></a><span class="ts" id=1234 data-target="#details-1234" data-toggle="collapse"><span class="ident">new Task</span><span>(</span><span class="ident">taskDefinition</span><span>: </span><a class="type-ref" href="#TaskDefinition">TaskDefinition</a>, <span class="ident">target</span><span>: </span><a class="type-ref" href="#WorkspaceFolder">WorkspaceFolder</a> &#124; <a class="type-ref" href="#Global">Global</a> &#124; <a class="type-ref" href="#Workspace">Workspace</a>, <span class="ident">name</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">source</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">execution</span><span>?</span><span>: </span><a class="type-ref" href="#ProcessExecution">ProcessExecution</a> &#124; <a class="type-ref" href="#ShellExecution">ShellExecution</a>, <span class="ident">problemMatchers</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">string</a>[]<span>)</span><span>: </span><a class="type-ref" href="#Task">Task</a></span>
<div class="details collapse" id="details-1234">
<div class="comment"><p>Creates a new task.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="taskDefinition"></a><span class="ts" id=1235 data-target="#details-1235" data-toggle="collapse"><span class="ident">taskDefinition</span><span>: </span><a class="type-ref" href="#TaskDefinition">TaskDefinition</a></span></td><td><div class="comment"></div></td></tr>
<tr><td><a name="target"></a><span class="ts" id=1236 data-target="#details-1236" data-toggle="collapse"><span class="ident">target</span><span>: </span><a class="type-ref" href="#WorkspaceFolder">WorkspaceFolder</a> &#124; <a class="type-ref" href="#Global">Global</a> &#124; <a class="type-ref" href="#Workspace">Workspace</a></span></td><td><div class="comment"><p>Specifies the task&#39;s target. It is either a global or a workspace task or a task for a specific workspace folder.</p>
</div></td></tr>
<tr><td><a name="name"></a><span class="ts" id=1237 data-target="#details-1237" data-toggle="collapse"><span class="ident">name</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The task&#39;s name. Is presented in the user interface.</p>
</div></td></tr>
<tr><td><a name="source"></a><span class="ts" id=1238 data-target="#details-1238" data-toggle="collapse"><span class="ident">source</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The task&#39;s source (e.g. &#39;gulp&#39;, &#39;npm&#39;, ...). Is presented in the user interface.</p>
</div></td></tr>
<tr><td><a name="execution"></a><span class="ts" id=1239 data-target="#details-1239" data-toggle="collapse"><span class="ident">execution</span><span>?</span><span>: </span><a class="type-ref" href="#ProcessExecution">ProcessExecution</a> &#124; <a class="type-ref" href="#ShellExecution">ShellExecution</a></span></td><td><div class="comment"><p>The process or shell execution.</p>
</div></td></tr>
<tr><td><a name="problemMatchers"></a><span class="ts" id=1240 data-target="#details-1240" data-toggle="collapse"><span class="ident">problemMatchers</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-intrinsic">string</a>[]</span></td><td><div class="comment"><p>the names of problem matchers to use, like &#39;$tsc&#39;
 or &#39;$eslint&#39;. Problem matchers can be contributed by an extension using
 the <code>problemMatchers</code> extension point.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Task">Task</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="Task.definition"></a><span class="ts" id=1241 data-target="#details-1241" data-toggle="collapse"><span class="ident">definition</span><span>: </span><a class="type-ref" href="#TaskDefinition">TaskDefinition</a></span>
<div class="details collapse" id="details-1241">
<div class="comment"><p>The task&#39;s definition.</p>
</div>
</div>



<a name="Task.execution"></a><span class="ts" id=1244 data-target="#details-1244" data-toggle="collapse"><span class="ident">execution</span><span>: </span><a class="type-ref" href="#ProcessExecution">ProcessExecution</a> &#124; <a class="type-ref" href="#ShellExecution">ShellExecution</a></span>
<div class="details collapse" id="details-1244">
<div class="comment"><p>The task&#39;s execution engine</p>
</div>
</div>



<a name="Task.group"></a><span class="ts" id=1247 data-target="#details-1247" data-toggle="collapse"><span class="ident">group</span><span>?</span><span>: </span><a class="type-ref" href="#TaskGroup">TaskGroup</a></span>
<div class="details collapse" id="details-1247">
<div class="comment"><p>The task group this tasks belongs to. See TaskGroup
for a predefined set of available groups.
Defaults to undefined meaning that the task doesn&#39;t
belong to any special group.</p>
</div>
</div>



<a name="Task.isBackground"></a><span class="ts" id=1245 data-target="#details-1245" data-toggle="collapse"><span class="ident">isBackground</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-1245">
<div class="comment"><p>Whether the task is a background task or not.</p>
</div>
</div>



<a name="Task.name"></a><span class="ts" id=1243 data-target="#details-1243" data-toggle="collapse"><span class="ident">name</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1243">
<div class="comment"><p>The task&#39;s name</p>
</div>
</div>



<a name="Task.presentationOptions"></a><span class="ts" id=1248 data-target="#details-1248" data-toggle="collapse"><span class="ident">presentationOptions</span><span>: </span><a class="type-ref" href="#TaskPresentationOptions">TaskPresentationOptions</a></span>
<div class="details collapse" id="details-1248">
<div class="comment"><p>The presentation options. Defaults to an empty literal.</p>
</div>
</div>



<a name="Task.problemMatchers"></a><span class="ts" id=1249 data-target="#details-1249" data-toggle="collapse"><span class="ident">problemMatchers</span><span>: </span><a class="type-intrinsic">string</a>[]</span>
<div class="details collapse" id="details-1249">
<div class="comment"><p>The problem matchers attached to the task. Defaults to an empty
array.</p>
</div>
</div>



<a name="Task.scope"></a><span class="ts" id=1242 data-target="#details-1242" data-toggle="collapse"><span class="ident">scope</span><span>?</span><span>: </span><a class="type-ref" href="#Global">Global</a> &#124; <a class="type-ref" href="#Workspace">Workspace</a> &#124; <a class="type-ref" href="#WorkspaceFolder">WorkspaceFolder</a></span>
<div class="details collapse" id="details-1242">
<div class="comment"><p>The task&#39;s scope.</p>
</div>
</div>



<a name="Task.source"></a><span class="ts" id=1246 data-target="#details-1246" data-toggle="collapse"><span class="ident">source</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1246">
<div class="comment"><p>A human-readable string describing the source of this
shell task, e.g. &#39;gulp&#39; or &#39;npm&#39;.</p>
</div>
</div>

### <a name="TaskDefinition"></a><span class="code-item" id=1186>TaskDefinition</span>



<div class="comment"><p>A structure that defines a task kind in the system.
The value must be JSON-stringifyable.</p>
</div>

#### Properties



<a name="TaskDefinition.type"></a><span class="ts" id=1187 data-target="#details-1187" data-toggle="collapse"><span class="ident">type</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1187">
<div class="comment"><p>The task definition describing the task provided by an extension.
Usually a task provider defines more properties to identify
a task. They need to be defined in the package.json of the
extension under the &#39;taskDefinitions&#39; extension point. The npm
task definition for example looks like this</p>

<pre><code class="lang-typescript"><span class="hljs-keyword">interface</span> NpmTaskDefinition <span class="hljs-keyword">extends</span> TaskDefinition {
    script: <span class="hljs-built_in">string</span>;
}
</code></pre>
</div>
</div>

### <a name="TaskGroup"></a><span class="code-item" id=1177>TaskGroup</span>



<div class="comment"><p>A grouping for tasks. The editor by default supports the
&#39;Clean&#39;, &#39;Build&#39;, &#39;RebuildAll&#39; and &#39;Test&#39; group.</p>
</div>

#### Static



<a name="TaskGroup.Build"></a><span class="ts" id=1179 data-target="#details-1179" data-toggle="collapse"><span class="ident">Build</span><span>: </span><a class="type-ref" href="#TaskGroup">TaskGroup</a></span>
<div class="details collapse" id="details-1179">
<div class="comment"><p>The build task group;</p>
</div>
</div>



<a name="TaskGroup.Clean"></a><span class="ts" id=1178 data-target="#details-1178" data-toggle="collapse"><span class="ident">Clean</span><span>: </span><a class="type-ref" href="#TaskGroup">TaskGroup</a></span>
<div class="details collapse" id="details-1178">
<div class="comment"><p>The clean task group;</p>
</div>
</div>



<a name="TaskGroup.Rebuild"></a><span class="ts" id=1180 data-target="#details-1180" data-toggle="collapse"><span class="ident">Rebuild</span><span>: </span><a class="type-ref" href="#TaskGroup">TaskGroup</a></span>
<div class="details collapse" id="details-1180">
<div class="comment"><p>The rebuild all task group;</p>
</div>
</div>



<a name="TaskGroup.Test"></a><span class="ts" id=1181 data-target="#details-1181" data-toggle="collapse"><span class="ident">Test</span><span>: </span><a class="type-ref" href="#TaskGroup">TaskGroup</a></span>
<div class="details collapse" id="details-1181">
<div class="comment"><p>The test all task group;</p>
</div>
</div>

#### Constructors



<a name="TaskGroup.new TaskGroup"></a><span class="ts" id=1183 data-target="#details-1183" data-toggle="collapse"><span class="ident">new TaskGroup</span><span>(</span><span class="ident">id</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#TaskGroup">TaskGroup</a></span>
<div class="details collapse" id="details-1183">
<div class="comment"></div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="id"></a><span class="ts" id=1184 data-target="#details-1184" data-toggle="collapse"><span class="ident">id</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"></div></td></tr>
<tr><td><a name="label"></a><span class="ts" id=1185 data-target="#details-1185" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"></div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TaskGroup">TaskGroup</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="TaskPanelKind"></a><span class="code-item" id=1168>TaskPanelKind</span>



<div class="comment"><p>Controls how the task channel is used between tasks</p>
</div>

#### Enumeration members



<a name="TaskPanelKind.Dedicated"></a><span class="ts" id=1170 data-target="#details-1170" data-toggle="collapse"><span class="ident">Dedicated</span></span>
<div class="details collapse" id="details-1170">
<em>2</em>
</div>



<a name="TaskPanelKind.New"></a><span class="ts" id=1171 data-target="#details-1171" data-toggle="collapse"><span class="ident">New</span></span>
<div class="details collapse" id="details-1171">
<em>3</em>
</div>



<a name="TaskPanelKind.Shared"></a><span class="ts" id=1169 data-target="#details-1169" data-toggle="collapse"><span class="ident">Shared</span></span>
<div class="details collapse" id="details-1169">
<em>1</em>
</div>

### <a name="TaskPresentationOptions"></a><span class="code-item" id=1172>TaskPresentationOptions</span>



<div class="comment"><p>Controls how the task is presented in the UI.</p>
</div>

#### Properties



<a name="TaskPresentationOptions.echo"></a><span class="ts" id=1174 data-target="#details-1174" data-toggle="collapse"><span class="ident">echo</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-1174">
<div class="comment"><p>Controls whether the command associated with the task is echoed
in the user interface.</p>
</div>
</div>



<a name="TaskPresentationOptions.focus"></a><span class="ts" id=1175 data-target="#details-1175" data-toggle="collapse"><span class="ident">focus</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-1175">
<div class="comment"><p>Controls whether the panel showing the task output is taking focus.</p>
</div>
</div>



<a name="TaskPresentationOptions.panel"></a><span class="ts" id=1176 data-target="#details-1176" data-toggle="collapse"><span class="ident">panel</span><span>?</span><span>: </span><a class="type-ref" href="#TaskPanelKind">TaskPanelKind</a></span>
<div class="details collapse" id="details-1176">
<div class="comment"><p>Controls if the task panel is used for this task only (dedicated),
shared between tasks (shared) or if a new panel is created on
every task execution (new). Defaults to <code>TaskInstanceKind.Shared</code></p>
</div>
</div>



<a name="TaskPresentationOptions.reveal"></a><span class="ts" id=1173 data-target="#details-1173" data-toggle="collapse"><span class="ident">reveal</span><span>?</span><span>: </span><a class="type-ref" href="#TaskRevealKind">TaskRevealKind</a></span>
<div class="details collapse" id="details-1173">
<div class="comment"><p>Controls whether the task output is reveal in the user interface.
Defaults to <code>RevealKind.Always</code>.</p>
</div>
</div>

### <a name="TaskProvider"></a><span class="code-item" id=1250>TaskProvider</span>



<div class="comment"><p>A task provider allows to add tasks to the task service.
A task provider is registered via #workspace.registerTaskProvider.</p>
</div>

#### Methods



<a name="TaskProvider.provideTasks"></a><span class="ts" id=1252 data-target="#details-1252" data-toggle="collapse"><span class="ident">provideTasks</span><span>(</span><span class="ident">token</span><span>?</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#Task">Task</a>[]&gt;</span>
<div class="details collapse" id="details-1252">
<div class="comment"><p>Provides tasks.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="token"></a><span class="ts" id=1253 data-target="#details-1253" data-toggle="collapse"><span class="ident">token</span><span>?</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#Task">Task</a>[]&gt;</span></td><td><div class="comment"><p>an array of tasks</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TaskProvider.resolveTask"></a><span class="ts" id=1255 data-target="#details-1255" data-toggle="collapse"><span class="ident">resolveTask</span><span>(</span><span class="ident">task</span><span>: </span><a class="type-ref" href="#Task">Task</a>, <span class="ident">token</span><span>?</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#Task">Task</a>&gt;</span>
<div class="details collapse" id="details-1255">
<div class="comment"><p>Resolves a task that has no <a href="#Task.execution"><code>execution</code></a> set. Tasks are
often created from information found in the <code>task.json</code>-file. Such tasks miss
the information on how to execute them and a task provider must fill in
the missing information in the <code>resolveTask</code>-method.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="task"></a><span class="ts" id=1256 data-target="#details-1256" data-toggle="collapse"><span class="ident">task</span><span>: </span><a class="type-ref" href="#Task">Task</a></span></td><td><div class="comment"><p>The task to resolve.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=1257 data-target="#details-1257" data-toggle="collapse"><span class="ident">token</span><span>?</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#Task">Task</a>&gt;</span></td><td><div class="comment"><p>The resolved task</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="TaskRevealKind"></a><span class="code-item" id=1164>TaskRevealKind</span>



<div class="comment"><p>Controls the behaviour of the terminal&#39;s visibility.</p>
</div>

#### Enumeration members



<a name="TaskRevealKind.Always"></a><span class="ts" id=1165 data-target="#details-1165" data-toggle="collapse"><span class="ident">Always</span></span>
<div class="details collapse" id="details-1165">
<em>1</em>
</div>



<a name="TaskRevealKind.Never"></a><span class="ts" id=1167 data-target="#details-1167" data-toggle="collapse"><span class="ident">Never</span></span>
<div class="details collapse" id="details-1167">
<em>3</em>
</div>



<a name="TaskRevealKind.Silent"></a><span class="ts" id=1166 data-target="#details-1166" data-toggle="collapse"><span class="ident">Silent</span></span>
<div class="details collapse" id="details-1166">
<em>2</em>
</div>

### <a name="TaskScope"></a><span class="code-item" id=1223>TaskScope</span>



<div class="comment"><p>The scope of a task.</p>
</div>

#### Enumeration members



<a name="TaskScope.Global"></a><span class="ts" id=1224 data-target="#details-1224" data-toggle="collapse"><span class="ident">Global</span></span>
<div class="details collapse" id="details-1224">
<em>1</em>
</div>



<a name="TaskScope.Workspace"></a><span class="ts" id=1225 data-target="#details-1225" data-toggle="collapse"><span class="ident">Workspace</span></span>
<div class="details collapse" id="details-1225">
<em>2</em>
</div>

### <a name="Terminal"></a><span class="code-item" id=1116>Terminal</span>



<div class="comment"><p>An individual terminal instance within the integrated terminal.</p>
</div>

#### Properties



<a name="Terminal.name"></a><span class="ts" id=1117 data-target="#details-1117" data-toggle="collapse"><span class="ident">name</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1117">
<div class="comment"><p>The name of the terminal.</p>
</div>
</div>



<a name="Terminal.processId"></a><span class="ts" id=1118 data-target="#details-1118" data-toggle="collapse"><span class="ident">processId</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">number</a>&gt;</span>
<div class="details collapse" id="details-1118">
<div class="comment"><p>The process ID of the shell process.</p>
</div>
</div>

#### Methods



<a name="Terminal.dispose"></a><span class="ts" id=1129 data-target="#details-1129" data-toggle="collapse"><span class="ident">dispose</span><span>(</span><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1129">
<div class="comment"><p>Dispose and free associated resources.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="Terminal.hide"></a><span class="ts" id=1127 data-target="#details-1127" data-toggle="collapse"><span class="ident">hide</span><span>(</span><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1127">
<div class="comment"><p>Hide the terminal panel if this terminal is currently showing.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="Terminal.sendText"></a><span class="ts" id=1120 data-target="#details-1120" data-toggle="collapse"><span class="ident">sendText</span><span>(</span><span class="ident">text</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">addNewLine</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1120">
<div class="comment"><p>Send text to the terminal. The text is written to the stdin of the underlying pty process
(shell) of the terminal.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="text"></a><span class="ts" id=1121 data-target="#details-1121" data-toggle="collapse"><span class="ident">text</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The text to send.</p>
</div></td></tr>
<tr><td><a name="addNewLine"></a><span class="ts" id=1122 data-target="#details-1122" data-toggle="collapse"><span class="ident">addNewLine</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p>Whether to add a new line to the text being sent, this is normally
required to run a command in the terminal. The character(s) added are \n or \r\n
depending on the platform. This defaults to <code>true</code>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="Terminal.show"></a><span class="ts" id=1124 data-target="#details-1124" data-toggle="collapse"><span class="ident">show</span><span>(</span><span class="ident">preserveFocus</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1124">
<div class="comment"><p>Show the terminal panel and reveal this terminal in the UI.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="preserveFocus"></a><span class="ts" id=1125 data-target="#details-1125" data-toggle="collapse"><span class="ident">preserveFocus</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p>When <code>true</code> the terminal will not take focus.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="TerminalOptions"></a><span class="code-item" id=1286>TerminalOptions</span>



<div class="comment"><p>Value-object describing what options a terminal should use.</p>
</div>

#### Properties



<a name="TerminalOptions.env"></a><span class="ts" id=1290 data-target="#details-1290" data-toggle="collapse"><span class="ident">env</span><span>?</span><span>: </span></span>
<div class="details collapse" id="details-1290">
<div class="comment"><p>Object with environment variables that will be added to the VS Code process.</p>
</div>
</div>



<a name="TerminalOptions.name"></a><span class="ts" id=1287 data-target="#details-1287" data-toggle="collapse"><span class="ident">name</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1287">
<div class="comment"><p>A human-readable string which will be used to represent the terminal in the UI.</p>
</div>
</div>



<a name="TerminalOptions.shellArgs"></a><span class="ts" id=1289 data-target="#details-1289" data-toggle="collapse"><span class="ident">shellArgs</span><span>?</span><span>: </span><a class="type-intrinsic">string</a>[]</span>
<div class="details collapse" id="details-1289">
<div class="comment"><p>Args for the custom shell executable, this does not work on Windows (see #8429)</p>
</div>
</div>



<a name="TerminalOptions.shellPath"></a><span class="ts" id=1288 data-target="#details-1288" data-toggle="collapse"><span class="ident">shellPath</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1288">
<div class="comment"><p>A path to a custom shell executable to be used in the terminal.</p>
</div>
</div>

### <a name="TextDocument"></a><span class="code-item" id=38>TextDocument</span>



<div class="comment"><p>Represents a text document, such as a source file. Text documents have
<a href="#TextLine">lines</a> and knowledge about an underlying resource like a file.</p>
</div>

#### Properties



<a name="TextDocument.eol"></a><span class="ts" id=48 data-target="#details-48" data-toggle="collapse"><span class="ident">eol</span><span>: </span><a class="type-ref" href="#EndOfLine">EndOfLine</a></span>
<div class="details collapse" id="details-48">
<div class="comment"><p>The <a href="#EndOfLine">end of line</a> sequence that is predominately
used in this document.</p>
</div>
</div>



<a name="TextDocument.fileName"></a><span class="ts" id=40 data-target="#details-40" data-toggle="collapse"><span class="ident">fileName</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-40">
<div class="comment"><p>The file system path of the associated resource. Shorthand
notation for <a href="#TextDocument.uri">TextDocument.uri.fsPath</a>. Independent of the uri scheme.</p>
</div>
</div>



<a name="TextDocument.isClosed"></a><span class="ts" id=45 data-target="#details-45" data-toggle="collapse"><span class="ident">isClosed</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-45">
<div class="comment"><p><code>true</code> if the document have been closed. A closed document isn&#39;t synchronized anymore
and won&#39;t be re-used when the same resource is opened again.</p>
</div>
</div>



<a name="TextDocument.isDirty"></a><span class="ts" id=44 data-target="#details-44" data-toggle="collapse"><span class="ident">isDirty</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-44">
<div class="comment"><p><code>true</code> if there are unpersisted changes.</p>
</div>
</div>



<a name="TextDocument.isUntitled"></a><span class="ts" id=41 data-target="#details-41" data-toggle="collapse"><span class="ident">isUntitled</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-41">
<div class="comment"><p>Is this document representing an untitled file.</p>
</div>
</div>



<a name="TextDocument.languageId"></a><span class="ts" id=42 data-target="#details-42" data-toggle="collapse"><span class="ident">languageId</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-42">
<div class="comment"><p>The identifier of the language associated with this document.</p>
</div>
</div>



<a name="TextDocument.lineCount"></a><span class="ts" id=49 data-target="#details-49" data-toggle="collapse"><span class="ident">lineCount</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-49">
<div class="comment"><p>The number of lines in this document.</p>
</div>
</div>



<a name="TextDocument.uri"></a><span class="ts" id=39 data-target="#details-39" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span>
<div class="details collapse" id="details-39">
<div class="comment"><p>The associated URI for this document. Most documents have the <strong>file</strong>-scheme, indicating that they
represent files on disk. However, some documents may have other schemes indicating that they are not
available on disk.</p>
</div>
</div>



<a name="TextDocument.version"></a><span class="ts" id=43 data-target="#details-43" data-toggle="collapse"><span class="ident">version</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-43">
<div class="comment"><p>The version number of this document (it will strictly increase after each
change, including undo/redo).</p>
</div>
</div>

#### Methods



<a name="TextDocument.getText"></a><span class="ts" id=62 data-target="#details-62" data-toggle="collapse"><span class="ident">getText</span><span>(</span><span class="ident">range</span><span>?</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-62">
<div class="comment"><p>Get the text of this document. A substring can be retrieved by providing
a range. The range will be <a href="#TextDocument.validateRange">adjusted</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=63 data-target="#details-63" data-toggle="collapse"><span class="ident">range</span><span>?</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>Include only the text included by the range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The text inside the provided range or the entire text.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextDocument.getWordRangeAtPosition"></a><span class="ts" id=65 data-target="#details-65" data-toggle="collapse"><span class="ident">getWordRangeAtPosition</span><span>(</span><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">regex</span><span>?</span><span>: </span><a class="type-ref" href="#RegExp">RegExp</a><span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a> &#124; <a class="type-intrinsic">undefined</a></span>
<div class="details collapse" id="details-65">
<div class="comment"><p>Get a word-range at the given position. By default words are defined by
common separators, like space, -, _, etc. In addition, per languge custom
<a href="#LanguageConfiguration.wordPattern">word definitions</a> can be defined. It
is also possible to provide a custom regular expression.</p>
<ul>
<li><em>Note 1:</em> A custom regular expression must not match the empty string and
if it does, it will be ignored.</li>
<li><em>Note 2:</em> A custom regular expression will fail to match multiline strings
and in the name of speed regular expressions should not match words with
spaces. Use <a href="#TextLine.text"><code>TextLine.text</code></a> for more complex, non-wordy, scenarios.</li>
</ul>
<p>The position will be <a href="#TextDocument.validatePosition">adjusted</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="position"></a><span class="ts" id=66 data-target="#details-66" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><td><a name="regex"></a><span class="ts" id=67 data-target="#details-67" data-toggle="collapse"><span class="ident">regex</span><span>?</span><span>: </span><a class="type-ref" href="#RegExp">RegExp</a></span></td><td><div class="comment"><p>Optional regular expression that describes what a word is.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a> &#124; <a class="type-intrinsic">undefined</a></span></td><td><div class="comment"><p>A range spanning a word, or <code>undefined</code>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextDocument.lineAt"></a><span class="ts" id=51 data-target="#details-51" data-toggle="collapse"><span class="ident">lineAt</span><span>(</span><span class="ident">line</span><span>: </span><a class="type-intrinsic">number</a><span>)</span><span>: </span><a class="type-ref" href="#TextLine">TextLine</a></span>
<div class="details collapse" id="details-51">
<div class="comment"><p>Returns a text line denoted by the line number. Note
that the returned object is <em>not</em> live and changes to the
document are not reflected.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="line"></a><span class="ts" id=52 data-target="#details-52" data-toggle="collapse"><span class="ident">line</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>A line number in [0, lineCount).</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TextLine">TextLine</a></span></td><td><div class="comment"><p>A <a href="#TextLine">line</a>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextDocument.lineAt"></a><span class="ts" id=53 data-target="#details-53" data-toggle="collapse"><span class="ident">lineAt</span><span>(</span><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-ref" href="#TextLine">TextLine</a></span>
<div class="details collapse" id="details-53">
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
<tr><td><a name="position"></a><span class="ts" id=54 data-target="#details-54" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TextLine">TextLine</a></span></td><td><div class="comment"><p>A <a href="#TextLine">line</a>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextDocument.offsetAt"></a><span class="ts" id=56 data-target="#details-56" data-toggle="collapse"><span class="ident">offsetAt</span><span>(</span><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-56">
<div class="comment"><p>Converts the position to a zero-based offset.</p>
<p>The position will be <a href="#TextDocument.validatePosition">adjusted</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="position"></a><span class="ts" id=57 data-target="#details-57" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>A valid zero-based offset.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextDocument.positionAt"></a><span class="ts" id=59 data-target="#details-59" data-toggle="collapse"><span class="ident">positionAt</span><span>(</span><span class="ident">offset</span><span>: </span><a class="type-intrinsic">number</a><span>)</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-59">
<div class="comment"><p>Converts a zero-based offset to a position.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="offset"></a><span class="ts" id=60 data-target="#details-60" data-toggle="collapse"><span class="ident">offset</span><span>: </span><a class="type-intrinsic">number</a></span></td><td><div class="comment"><p>A zero-based offset.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A valid <a href="#Position">position</a>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextDocument.save"></a><span class="ts" id=47 data-target="#details-47" data-toggle="collapse"><span class="ident">save</span><span>(</span><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">boolean</a>&gt;</span>
<div class="details collapse" id="details-47">
<div class="comment"><p>Save the underlying file.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">boolean</a>&gt;</span></td><td><div class="comment"><p>A promise that will resolve to true when the file
has been saved. If the file was not dirty or the save failed,
will return false.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextDocument.validatePosition"></a><span class="ts" id=72 data-target="#details-72" data-toggle="collapse"><span class="ident">validatePosition</span><span>(</span><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a><span>)</span><span>: </span><a class="type-ref" href="#Position">Position</a></span>
<div class="details collapse" id="details-72">
<div class="comment"><p>Ensure a position is contained in the range of this document.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="position"></a><span class="ts" id=73 data-target="#details-73" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The given position or a new, adjusted position.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextDocument.validateRange"></a><span class="ts" id=69 data-target="#details-69" data-toggle="collapse"><span class="ident">validateRange</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-69">
<div class="comment"><p>Ensure a range is completely contained in this document.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=70 data-target="#details-70" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>The given range or a new, adjusted range.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="TextDocumentChangeEvent"></a><span class="code-item" id=1304>TextDocumentChangeEvent</span>



<div class="comment"><p>An event describing a transactional <a href="#TextDocument">document</a> change.</p>
</div>

#### Properties



<a name="TextDocumentChangeEvent.contentChanges"></a><span class="ts" id=1306 data-target="#details-1306" data-toggle="collapse"><span class="ident">contentChanges</span><span>: </span><a class="type-ref" href="#TextDocumentContentChangeEvent">TextDocumentContentChangeEvent</a>[]</span>
<div class="details collapse" id="details-1306">
<div class="comment"><p>An array of content changes.</p>
</div>
</div>



<a name="TextDocumentChangeEvent.document"></a><span class="ts" id=1305 data-target="#details-1305" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span>
<div class="details collapse" id="details-1305">
<div class="comment"><p>The affected document.</p>
</div>
</div>

### <a name="TextDocumentContentChangeEvent"></a><span class="code-item" id=1300>TextDocumentContentChangeEvent</span>



<div class="comment"><p>An event describing an individual change in the text of a <a href="#TextDocument">document</a>.</p>
</div>

#### Properties



<a name="TextDocumentContentChangeEvent.range"></a><span class="ts" id=1301 data-target="#details-1301" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-1301">
<div class="comment"><p>The range that got replaced.</p>
</div>
</div>



<a name="TextDocumentContentChangeEvent.rangeLength"></a><span class="ts" id=1302 data-target="#details-1302" data-toggle="collapse"><span class="ident">rangeLength</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-1302">
<div class="comment"><p>The length of the range that got replaced.</p>
</div>
</div>



<a name="TextDocumentContentChangeEvent.text"></a><span class="ts" id=1303 data-target="#details-1303" data-toggle="collapse"><span class="ident">text</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1303">
<div class="comment"><p>The new text for the range.</p>
</div>
</div>

### <a name="TextDocumentContentProvider"></a><span class="code-item" id=465>TextDocumentContentProvider</span>



<div class="comment"><p>A text document content provider allows to add readonly documents
to the editor, such as source from a dll or generated html from md.</p>
<p>Content providers are <a href="#workspace.registerTextDocumentContentProvider">registered</a>
for a <a href="#Uri.scheme">uri-scheme</a>. When a uri with that scheme is to
be <a href="#workspace.openTextDocument">loaded</a> the content provider is
asked.</p>
</div>

#### Events



<a name="TextDocumentContentProvider.onDidChange"></a><span class="ts" id=466 data-target="#details-466" data-toggle="collapse"><span class="ident">onDidChange</span><span>?</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-ref" href="#Uri">Uri</a>&gt;</span>
<div class="details collapse" id="details-466">
<div class="comment"><p>An event to signal a resource has changed.</p>
</div>
</div>

#### Methods



<a name="TextDocumentContentProvider.provideTextDocumentContent"></a><span class="ts" id=468 data-target="#details-468" data-toggle="collapse"><span class="ident">provideTextDocumentContent</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-intrinsic">string</a>&gt;</span>
<div class="details collapse" id="details-468">
<div class="comment"><p>Provide textual content for a given uri.</p>
<p>The editor will use the returned string-content to create a readonly
<a href="#TextDocument">document</a>. Resources allocated should be released when
the corresponding document has been <a href="#workspace.onDidCloseTextDocument">closed</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=469 data-target="#details-469" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>An uri which scheme matches the scheme this provider was <a href="#workspace.registerTextDocumentContentProvider">registered</a> for.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=470 data-target="#details-470" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-intrinsic">string</a>&gt;</span></td><td><div class="comment"><p>A string or a thenable that resolves to such.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="TextDocumentSaveReason"></a><span class="code-item" id=1307>TextDocumentSaveReason</span>



<div class="comment"><p>Represents reasons why a text document is saved.</p>
</div>

#### Enumeration members



<a name="TextDocumentSaveReason.AfterDelay"></a><span class="ts" id=1309 data-target="#details-1309" data-toggle="collapse"><span class="ident">AfterDelay</span></span>
<div class="details collapse" id="details-1309">
<em>2</em>
</div>



<a name="TextDocumentSaveReason.FocusOut"></a><span class="ts" id=1310 data-target="#details-1310" data-toggle="collapse"><span class="ident">FocusOut</span></span>
<div class="details collapse" id="details-1310">
<em>3</em>
</div>



<a name="TextDocumentSaveReason.Manual"></a><span class="ts" id=1308 data-target="#details-1308" data-toggle="collapse"><span class="ident">Manual</span></span>
<div class="details collapse" id="details-1308">
<em>1</em>
</div>

### <a name="TextDocumentShowOptions"></a><span class="code-item" id=239>TextDocumentShowOptions</span>



<div class="comment"><p>Represents options to configure the behavior of showing a <a href="#TextDocument">document</a> in an <a href="#TextEditor">editor</a>.</p>
</div>

#### Properties



<a name="TextDocumentShowOptions.preserveFocus"></a><span class="ts" id=241 data-target="#details-241" data-toggle="collapse"><span class="ident">preserveFocus</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-241">
<div class="comment"><p>An optional flag that when <code>true</code> will stop the <a href="#TextEditor">editor</a> from taking focus.</p>
</div>
</div>



<a name="TextDocumentShowOptions.preview"></a><span class="ts" id=242 data-target="#details-242" data-toggle="collapse"><span class="ident">preview</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-242">
<div class="comment"><p>An optional flag that controls if an <a href="#TextEditor">editor</a>-tab will be replaced
with the next editor or if it will be kept.</p>
</div>
</div>



<a name="TextDocumentShowOptions.selection"></a><span class="ts" id=243 data-target="#details-243" data-toggle="collapse"><span class="ident">selection</span><span>?</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-243">
<div class="comment"><p>An optional selection to apply for the document in the <a href="#TextEditor">editor</a>.</p>
</div>
</div>



<a name="TextDocumentShowOptions.viewColumn"></a><span class="ts" id=240 data-target="#details-240" data-toggle="collapse"><span class="ident">viewColumn</span><span>?</span><span>: </span><a class="type-ref" href="#ViewColumn">ViewColumn</a></span>
<div class="details collapse" id="details-240">
<div class="comment"><p>An optional view column in which the <a href="#TextEditor">editor</a> should be shown.
The default is the <a href="#ViewColumn.One">one</a>, other values are adjusted to
be <code>Min(column, columnCount + 1)</code>, the <a href="#ViewColumn.Active">active</a>-column is
not adjusted.</p>
</div>
</div>

### <a name="TextDocumentWillSaveEvent"></a><span class="code-item" id=1311>TextDocumentWillSaveEvent</span>



<div class="comment"><p>An event that is fired when a <a href="#TextDocument">document</a> will be saved.</p>
<p>To make modifications to the document before it is being saved, call the
<a href="#TextDocumentWillSaveEvent.waitUntil"><code>waitUntil</code></a>-function with a thenable
that resolves to an array of <a href="#TextEdit">text edits</a>.</p>
</div>

#### Properties



<a name="TextDocumentWillSaveEvent.document"></a><span class="ts" id=1312 data-target="#details-1312" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span>
<div class="details collapse" id="details-1312">
<div class="comment"><p>The document that will be saved.</p>
</div>
</div>



<a name="TextDocumentWillSaveEvent.reason"></a><span class="ts" id=1313 data-target="#details-1313" data-toggle="collapse"><span class="ident">reason</span><span>: </span><a class="type-ref" href="#TextDocumentSaveReason">TextDocumentSaveReason</a></span>
<div class="details collapse" id="details-1313">
<div class="comment"><p>The reason why save was triggered.</p>
</div>
</div>

#### Methods



<a name="TextDocumentWillSaveEvent.waitUntil"></a><span class="ts" id=1315 data-target="#details-1315" data-toggle="collapse"><span class="ident">waitUntil</span><span>(</span><span class="ident">thenable</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextEdit">TextEdit</a>[]&gt;<span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1315">
<div class="comment"><p>Allows to pause the event loop and to apply <a href="#TextEdit">pre-save-edits</a>.
Edits of subsequent calls to this function will be applied in order. The
edits will be <em>ignored</em> if concurrent modifications of the document happened.</p>
<p><em>Note:</em> This function can only be called during event dispatch and not
in an asynchronous manner:</p>

<pre><code class="lang-ts">workspace.onWillSaveTextDocument(<span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> {
    <span class="hljs-comment">// async, will *throw* an error</span>
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> event.waitUntil(promise));

    <span class="hljs-comment">// sync, OK</span>
    event.waitUntil(promise);
})
</code></pre>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="thenable"></a><span class="ts" id=1316 data-target="#details-1316" data-toggle="collapse"><span class="ident">thenable</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TextEdit">TextEdit</a>[]&gt;</span></td><td><div class="comment"><p>A thenable that resolves to <a href="#TextEdit">pre-save-edits</a>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="TextDocumentWillSaveEvent.waitUntil"></a><span class="ts" id=1317 data-target="#details-1317" data-toggle="collapse"><span class="ident">waitUntil</span><span>(</span><span class="ident">thenable</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">any</a>&gt;<span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-1317">
<div class="comment"><p>Allows to pause the event loop until the provided thenable resolved.</p>
<p><em>Note:</em> This function can only be called during event dispatch.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="thenable"></a><span class="ts" id=1318 data-target="#details-1318" data-toggle="collapse"><span class="ident">thenable</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">any</a>&gt;</span></td><td><div class="comment"><p>A thenable that delays saving.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="TextEdit"></a><span class="code-item" id=687>TextEdit</span>



<div class="comment"><p>A text edit represents edits that should be applied
to a document.</p>
</div>

#### Static



<a name="TextEdit.delete"></a><span class="ts" id=697 data-target="#details-697" data-toggle="collapse"><span class="ident">delete</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a></span>
<div class="details collapse" id="details-697">
<div class="comment"><p>Utility to create a delete edit.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=698 data-target="#details-698" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TextEdit">TextEdit</a></span></td><td><div class="comment"><p>A new text edit object.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextEdit.insert"></a><span class="ts" id=693 data-target="#details-693" data-toggle="collapse"><span class="ident">insert</span><span>(</span><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">newText</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a></span>
<div class="details collapse" id="details-693">
<div class="comment"><p>Utility to create an insert edit.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="position"></a><span class="ts" id=694 data-target="#details-694" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position, will become an empty range.</p>
</div></td></tr>
<tr><td><a name="newText"></a><span class="ts" id=695 data-target="#details-695" data-toggle="collapse"><span class="ident">newText</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A string.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TextEdit">TextEdit</a></span></td><td><div class="comment"><p>A new text edit object.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextEdit.replace"></a><span class="ts" id=689 data-target="#details-689" data-toggle="collapse"><span class="ident">replace</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">newText</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a></span>
<div class="details collapse" id="details-689">
<div class="comment"><p>Utility to create a replace edit.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=690 data-target="#details-690" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><td><a name="newText"></a><span class="ts" id=691 data-target="#details-691" data-toggle="collapse"><span class="ident">newText</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A string.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TextEdit">TextEdit</a></span></td><td><div class="comment"><p>A new text edit object.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextEdit.setEndOfLine"></a><span class="ts" id=700 data-target="#details-700" data-toggle="collapse"><span class="ident">setEndOfLine</span><span>(</span><span class="ident">eol</span><span>: </span><a class="type-ref" href="#EndOfLine">EndOfLine</a><span>)</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a></span>
<div class="details collapse" id="details-700">
<div class="comment"><p>Utility to create an eol-edit.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="eol"></a><span class="ts" id=701 data-target="#details-701" data-toggle="collapse"><span class="ident">eol</span><span>: </span><a class="type-ref" href="#EndOfLine">EndOfLine</a></span></td><td><div class="comment"><p>An eol-sequence</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TextEdit">TextEdit</a></span></td><td><div class="comment"><p>A new text edit object.</p>
</div></td></tr>
</table>
</div>
</div>

#### Constructors



<a name="TextEdit.new TextEdit"></a><span class="ts" id=706 data-target="#details-706" data-toggle="collapse"><span class="ident">new TextEdit</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">newText</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a></span>
<div class="details collapse" id="details-706">
<div class="comment"><p>Create a new TextEdit.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=707 data-target="#details-707" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><td><a name="newText"></a><span class="ts" id=708 data-target="#details-708" data-toggle="collapse"><span class="ident">newText</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A string.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TextEdit">TextEdit</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="TextEdit.newEol"></a><span class="ts" id=704 data-target="#details-704" data-toggle="collapse"><span class="ident">newEol</span><span>: </span><a class="type-ref" href="#EndOfLine">EndOfLine</a></span>
<div class="details collapse" id="details-704">
<div class="comment"><p>The eol-sequence used in the document.</p>
<p><em>Note</em> that the eol-sequence will be applied to the
whole document.</p>
</div>
</div>



<a name="TextEdit.newText"></a><span class="ts" id=703 data-target="#details-703" data-toggle="collapse"><span class="ident">newText</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-703">
<div class="comment"><p>The string this edit will insert.</p>
</div>
</div>



<a name="TextEdit.range"></a><span class="ts" id=702 data-target="#details-702" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-702">
<div class="comment"><p>The range this edit applies to.</p>
</div>
</div>

### <a name="TextEditor"></a><span class="code-item" id=318>TextEditor</span>



<div class="comment"><p>Represents an editor that is attached to a <a href="#TextDocument">document</a>.</p>
</div>

#### Properties



<a name="TextEditor.document"></a><span class="ts" id=319 data-target="#details-319" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span>
<div class="details collapse" id="details-319">
<div class="comment"><p>The document associated with this text editor. The document will be the same for the entire lifetime of this text editor.</p>
</div>
</div>



<a name="TextEditor.options"></a><span class="ts" id=322 data-target="#details-322" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#TextEditorOptions">TextEditorOptions</a></span>
<div class="details collapse" id="details-322">
<div class="comment"><p>Text editor options.</p>
</div>
</div>



<a name="TextEditor.selection"></a><span class="ts" id=320 data-target="#details-320" data-toggle="collapse"><span class="ident">selection</span><span>: </span><a class="type-ref" href="#Selection">Selection</a></span>
<div class="details collapse" id="details-320">
<div class="comment"><p>The primary selection on this text editor. Shorthand for <code>TextEditor.selections[0]</code>.</p>
</div>
</div>



<a name="TextEditor.selections"></a><span class="ts" id=321 data-target="#details-321" data-toggle="collapse"><span class="ident">selections</span><span>: </span><a class="type-ref" href="#Selection">Selection</a>[]</span>
<div class="details collapse" id="details-321">
<div class="comment"><p>The selections in this text editor. The primary selection is always at index 0.</p>
</div>
</div>



<a name="TextEditor.viewColumn"></a><span class="ts" id=323 data-target="#details-323" data-toggle="collapse"><span class="ident">viewColumn</span><span>?</span><span>: </span><a class="type-ref" href="#ViewColumn">ViewColumn</a></span>
<div class="details collapse" id="details-323">
<div class="comment"><p>The column in which this editor shows. Will be <code>undefined</code> in case this
isn&#39;t one of the three main editors, e.g an embedded editor.</p>
</div>
</div>

#### Methods



<a name="TextEditor.edit"></a><span class="ts" id=325 data-target="#details-325" data-toggle="collapse"><span class="ident">edit</span><span>(</span><span class="ident">callback</span><span>: </span>(editBuilder: <a class="type-ref" href="#TextEditorEdit">TextEditorEdit</a>) =&gt; <a class="type-intrinsic">void</a>, <span class="ident">options</span><span>?</span><span>: </span>{undoStopAfter: <a class="type-intrinsic">boolean</a>, undoStopBefore: <a class="type-intrinsic">boolean</a>}<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">boolean</a>&gt;</span>
<div class="details collapse" id="details-325">
<div class="comment"><p>Perform an edit on the document associated with this text editor.</p>
<p>The given callback-function is invoked with an <a href="#TextEditorEdit">edit-builder</a> which must
be used to make edits. Note that the edit-builder is only valid while the
callback executes.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="callback"></a><span class="ts" id=326 data-target="#details-326" data-toggle="collapse"><span class="ident">callback</span><span>: </span>(editBuilder: <a class="type-ref" href="#TextEditorEdit">TextEditorEdit</a>) =&gt; <a class="type-intrinsic">void</a></span></td><td><div class="comment"><p>A function which can create edits using an <a href="#TextEditorEdit">edit-builder</a>.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=330 data-target="#details-330" data-toggle="collapse"><span class="ident">options</span><span>?</span><span>: </span>{undoStopAfter: <a class="type-intrinsic">boolean</a>, undoStopBefore: <a class="type-intrinsic">boolean</a>}</span></td><td><div class="comment"><p>The undo/redo behavior around this edit. By default, undo stops will be created before and after this edit.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">boolean</a>&gt;</span></td><td><div class="comment"><p>A promise that resolves with a value indicating if the edits could be applied.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextEditor.hide"></a><span class="ts" id=354 data-target="#details-354" data-toggle="collapse"><span class="ident">hide</span><span>(</span><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-354">
<div class="comment"><p><del>Hide the text editor.</del></p>
<ul>
<li><em>deprecated</em> - Use the command <code>workbench.action.closeActiveEditor</code> instead.
This method shows unexpected behavior and will be removed in the next major update.</li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="TextEditor.insertSnippet"></a><span class="ts" id=335 data-target="#details-335" data-toggle="collapse"><span class="ident">insertSnippet</span><span>(</span><span class="ident">snippet</span><span>: </span><a class="type-ref" href="#SnippetString">SnippetString</a>, <span class="ident">location</span><span>?</span><span>: </span><a class="type-ref" href="#Position">Position</a> &#124; <a class="type-ref" href="#Range">Range</a> &#124; <a class="type-ref" href="#Position">Position</a>[] &#124; <a class="type-ref" href="#Range">Range</a>[], <span class="ident">options</span><span>?</span><span>: </span>{undoStopAfter: <a class="type-intrinsic">boolean</a>, undoStopBefore: <a class="type-intrinsic">boolean</a>}<span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">boolean</a>&gt;</span>
<div class="details collapse" id="details-335">
<div class="comment"><p>Insert a <a href="#SnippetString">snippet</a> and put the editor into snippet mode. &quot;Snippet mode&quot;
means the editor adds placeholders and additionals cursors so that the user can complete
or accept the snippet.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="snippet"></a><span class="ts" id=336 data-target="#details-336" data-toggle="collapse"><span class="ident">snippet</span><span>: </span><a class="type-ref" href="#SnippetString">SnippetString</a></span></td><td><div class="comment"><p>The snippet to insert in this edit.</p>
</div></td></tr>
<tr><td><a name="location"></a><span class="ts" id=337 data-target="#details-337" data-toggle="collapse"><span class="ident">location</span><span>?</span><span>: </span><a class="type-ref" href="#Position">Position</a> &#124; <a class="type-ref" href="#Range">Range</a> &#124; <a class="type-ref" href="#Position">Position</a>[] &#124; <a class="type-ref" href="#Range">Range</a>[]</span></td><td><div class="comment"><p>Position or range at which to insert the snippet, defaults to the current editor selection or selections.</p>
</div></td></tr>
<tr><td><a name="options"></a><span class="ts" id=338 data-target="#details-338" data-toggle="collapse"><span class="ident">options</span><span>?</span><span>: </span>{undoStopAfter: <a class="type-intrinsic">boolean</a>, undoStopBefore: <a class="type-intrinsic">boolean</a>}</span></td><td><div class="comment"><p>The undo/redo behavior around this edit. By default, undo stops will be created before and after this edit.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">boolean</a>&gt;</span></td><td><div class="comment"><p>A promise that resolves with a value indicating if the snippet could be inserted. Note that the promise does not signal
that the snippet is completely filled-in or accepted.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TextEditor.revealRange"></a><span class="ts" id=347 data-target="#details-347" data-toggle="collapse"><span class="ident">revealRange</span><span>(</span><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">revealType</span><span>?</span><span>: </span><a class="type-ref" href="#TextEditorRevealType">TextEditorRevealType</a><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-347">
<div class="comment"><p>Scroll as indicated by <code>revealType</code> in order to reveal the given range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="range"></a><span class="ts" id=348 data-target="#details-348" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><td><a name="revealType"></a><span class="ts" id=349 data-target="#details-349" data-toggle="collapse"><span class="ident">revealType</span><span>?</span><span>: </span><a class="type-ref" href="#TextEditorRevealType">TextEditorRevealType</a></span></td><td><div class="comment"><p>The scrolling strategy for revealing <code>range</code>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="TextEditor.setDecorations"></a><span class="ts" id=343 data-target="#details-343" data-toggle="collapse"><span class="ident">setDecorations</span><span>(</span><span class="ident">decorationType</span><span>: </span><a class="type-ref" href="#TextEditorDecorationType">TextEditorDecorationType</a>, <span class="ident">rangesOrOptions</span><span>: </span><a class="type-ref" href="#Range">Range</a>[] &#124; <a class="type-ref" href="#DecorationOptions">DecorationOptions</a>[]<span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-343">
<div class="comment"><p>Adds a set of decorations to the text editor. If a set of decorations already exists with
the given <a href="#TextEditorDecorationType">decoration type</a>, they will be replaced.</p>
<ul>
<li><em>see</em> - <a href="#window.createTextEditorDecorationType">createTextEditorDecorationType</a>.</li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="decorationType"></a><span class="ts" id=344 data-target="#details-344" data-toggle="collapse"><span class="ident">decorationType</span><span>: </span><a class="type-ref" href="#TextEditorDecorationType">TextEditorDecorationType</a></span></td><td><div class="comment"><p>A decoration type.</p>
</div></td></tr>
<tr><td><a name="rangesOrOptions"></a><span class="ts" id=345 data-target="#details-345" data-toggle="collapse"><span class="ident">rangesOrOptions</span><span>: </span><a class="type-ref" href="#Range">Range</a>[] &#124; <a class="type-ref" href="#DecorationOptions">DecorationOptions</a>[]</span></td><td><div class="comment"><p>Either <a href="#Range">ranges</a> or more detailed <a href="#DecorationOptions">options</a>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="TextEditor.show"></a><span class="ts" id=351 data-target="#details-351" data-toggle="collapse"><span class="ident">show</span><span>(</span><span class="ident">column</span><span>?</span><span>: </span><a class="type-ref" href="#ViewColumn">ViewColumn</a><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-351">
<div class="comment"><p><del>Show the text editor.</del></p>
<ul>
<li><em>deprecated</em> - Use <a href="#window.showTextDocument">window.showTextDocument</a></li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="column"></a><span class="ts" id=352 data-target="#details-352" data-toggle="collapse"><span class="ident">column</span><span>?</span><span>: </span><a class="type-ref" href="#ViewColumn">ViewColumn</a></span></td><td><div class="comment"><p>The <a href="#ViewColumn">column</a> in which to show this editor.
instead. This method shows unexpected behavior and will be removed in the next major update.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="TextEditorCursorStyle"></a><span class="code-item" id=204>TextEditorCursorStyle</span>



<div class="comment"><p>Rendering style of the cursor.</p>
</div>

#### Enumeration members



<a name="TextEditorCursorStyle.Block"></a><span class="ts" id=206 data-target="#details-206" data-toggle="collapse"><span class="ident">Block</span></span>
<div class="details collapse" id="details-206">
<em>2</em>
</div>



<a name="TextEditorCursorStyle.BlockOutline"></a><span class="ts" id=209 data-target="#details-209" data-toggle="collapse"><span class="ident">BlockOutline</span></span>
<div class="details collapse" id="details-209">
<em>5</em>
</div>



<a name="TextEditorCursorStyle.Line"></a><span class="ts" id=205 data-target="#details-205" data-toggle="collapse"><span class="ident">Line</span></span>
<div class="details collapse" id="details-205">
<em>1</em>
</div>



<a name="TextEditorCursorStyle.LineThin"></a><span class="ts" id=208 data-target="#details-208" data-toggle="collapse"><span class="ident">LineThin</span></span>
<div class="details collapse" id="details-208">
<em>4</em>
</div>



<a name="TextEditorCursorStyle.Underline"></a><span class="ts" id=207 data-target="#details-207" data-toggle="collapse"><span class="ident">Underline</span></span>
<div class="details collapse" id="details-207">
<em>3</em>
</div>



<a name="TextEditorCursorStyle.UnderlineThin"></a><span class="ts" id=210 data-target="#details-210" data-toggle="collapse"><span class="ident">UnderlineThin</span></span>
<div class="details collapse" id="details-210">
<em>6</em>
</div>

### <a name="TextEditorDecorationType"></a><span class="code-item" id=220>TextEditorDecorationType</span>



<div class="comment"><p>Represents a handle to a set of decorations
sharing the same <a href="#DecorationRenderOptions">styling options</a> in a <a href="#TextEditor">text editor</a>.</p>
<p>To get an instance of a <code>TextEditorDecorationType</code> use
<a href="#window.createTextEditorDecorationType">createTextEditorDecorationType</a>.</p>
</div>

#### Properties



<a name="TextEditorDecorationType.key"></a><span class="ts" id=221 data-target="#details-221" data-toggle="collapse"><span class="ident">key</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-221">
<div class="comment"><p>Internal representation of the handle.</p>
</div>
</div>

#### Methods



<a name="TextEditorDecorationType.dispose"></a><span class="ts" id=223 data-target="#details-223" data-toggle="collapse"><span class="ident">dispose</span><span>(</span><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-223">
<div class="comment"><p>Remove this decoration type and all decorations on all text editors using it.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="TextEditorEdit"></a><span class="code-item" id=358>TextEditorEdit</span>



<div class="comment"><p>A complex edit that will be applied in one transaction on a TextEditor.
This holds a description of the edits and if the edits are valid (i.e. no overlapping regions, document was not changed in the meantime, etc.)
they can be applied on a <a href="#TextDocument">document</a> associated with a <a href="#TextEditor">text editor</a>.</p>
</div>

#### Methods



<a name="TextEditorEdit.delete"></a><span class="ts" id=368 data-target="#details-368" data-toggle="collapse"><span class="ident">delete</span><span>(</span><span class="ident">location</span><span>: </span><a class="type-ref" href="#Range">Range</a> &#124; <a class="type-ref" href="#Selection">Selection</a><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-368">
<div class="comment"><p>Delete a certain text region.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="location"></a><span class="ts" id=369 data-target="#details-369" data-toggle="collapse"><span class="ident">location</span><span>: </span><a class="type-ref" href="#Range">Range</a> &#124; <a class="type-ref" href="#Selection">Selection</a></span></td><td><div class="comment"><p>The range this operation should remove.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="TextEditorEdit.insert"></a><span class="ts" id=364 data-target="#details-364" data-toggle="collapse"><span class="ident">insert</span><span>(</span><span class="ident">location</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-364">
<div class="comment"><p>Insert text at a location.
You can use \r\n or \n in <code>value</code> and they will be normalized to the current <a href="#TextDocument">document</a>.
Although the equivalent text edit can be made with <a href="#TextEditorEdit.replace">replace</a>, <code>insert</code> will produce a different resulting selection (it will get moved).</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="location"></a><span class="ts" id=365 data-target="#details-365" data-toggle="collapse"><span class="ident">location</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The position where the new text should be inserted.</p>
</div></td></tr>
<tr><td><a name="value"></a><span class="ts" id=366 data-target="#details-366" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The new text this operation should insert.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="TextEditorEdit.replace"></a><span class="ts" id=360 data-target="#details-360" data-toggle="collapse"><span class="ident">replace</span><span>(</span><span class="ident">location</span><span>: </span><a class="type-ref" href="#Position">Position</a> &#124; <a class="type-ref" href="#Range">Range</a> &#124; <a class="type-ref" href="#Selection">Selection</a>, <span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-360">
<div class="comment"><p>Replace a certain text region with a new value.
You can use \r\n or \n in <code>value</code> and they will be normalized to the current <a href="#TextDocument">document</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="location"></a><span class="ts" id=361 data-target="#details-361" data-toggle="collapse"><span class="ident">location</span><span>: </span><a class="type-ref" href="#Position">Position</a> &#124; <a class="type-ref" href="#Range">Range</a> &#124; <a class="type-ref" href="#Selection">Selection</a></span></td><td><div class="comment"><p>The range this operation should remove.</p>
</div></td></tr>
<tr><td><a name="value"></a><span class="ts" id=362 data-target="#details-362" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The new text this operation should insert after removing <code>location</code>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="TextEditorEdit.setEndOfLine"></a><span class="ts" id=371 data-target="#details-371" data-toggle="collapse"><span class="ident">setEndOfLine</span><span>(</span><span class="ident">endOfLine</span><span>: </span><a class="type-ref" href="#EndOfLine">EndOfLine</a><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-371">
<div class="comment"><p>Set the end of line sequence.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="endOfLine"></a><span class="ts" id=372 data-target="#details-372" data-toggle="collapse"><span class="ident">endOfLine</span><span>: </span><a class="type-ref" href="#EndOfLine">EndOfLine</a></span></td><td><div class="comment"><p>The new end of line for the <a href="#TextDocument">document</a>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="TextEditorLineNumbersStyle"></a><span class="code-item" id=211>TextEditorLineNumbersStyle</span>



<div class="comment"><p>Rendering style of the line numbers.</p>
</div>

#### Enumeration members



<a name="TextEditorLineNumbersStyle.Off"></a><span class="ts" id=212 data-target="#details-212" data-toggle="collapse"><span class="ident">Off</span></span>
<div class="details collapse" id="details-212">
<em>0</em>
</div>



<a name="TextEditorLineNumbersStyle.On"></a><span class="ts" id=213 data-target="#details-213" data-toggle="collapse"><span class="ident">On</span></span>
<div class="details collapse" id="details-213">
<em>1</em>
</div>



<a name="TextEditorLineNumbersStyle.Relative"></a><span class="ts" id=214 data-target="#details-214" data-toggle="collapse"><span class="ident">Relative</span></span>
<div class="details collapse" id="details-214">
<em>2</em>
</div>

### <a name="TextEditorOptions"></a><span class="code-item" id=215>TextEditorOptions</span>



<div class="comment"><p>Represents a <a href="#TextEditor">text editor</a>&#39;s <a href="#TextEditor.options">options</a>.</p>
</div>

#### Properties



<a name="TextEditorOptions.cursorStyle"></a><span class="ts" id=218 data-target="#details-218" data-toggle="collapse"><span class="ident">cursorStyle</span><span>?</span><span>: </span><a class="type-ref" href="#TextEditorCursorStyle">TextEditorCursorStyle</a></span>
<div class="details collapse" id="details-218">
<div class="comment"><p>The rendering style of the cursor in this editor.
When getting a text editor&#39;s options, this property will always be present.
When setting a text editor&#39;s options, this property is optional.</p>
</div>
</div>



<a name="TextEditorOptions.insertSpaces"></a><span class="ts" id=217 data-target="#details-217" data-toggle="collapse"><span class="ident">insertSpaces</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a> &#124; <a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-217">
<div class="comment"><p>When pressing Tab insert <a href="#TextEditorOptions.tabSize">n</a> spaces.
When getting a text editor&#39;s options, this property will always be a boolean (resolved).
When setting a text editor&#39;s options, this property is optional and it can be a boolean or <code>&quot;auto&quot;</code>.</p>
</div>
</div>



<a name="TextEditorOptions.lineNumbers"></a><span class="ts" id=219 data-target="#details-219" data-toggle="collapse"><span class="ident">lineNumbers</span><span>?</span><span>: </span><a class="type-ref" href="#TextEditorLineNumbersStyle">TextEditorLineNumbersStyle</a></span>
<div class="details collapse" id="details-219">
<div class="comment"><p>Render relative line numbers w.r.t. the current line number.
When getting a text editor&#39;s options, this property will always be present.
When setting a text editor&#39;s options, this property is optional.</p>
</div>
</div>



<a name="TextEditorOptions.tabSize"></a><span class="ts" id=216 data-target="#details-216" data-toggle="collapse"><span class="ident">tabSize</span><span>?</span><span>: </span><a class="type-intrinsic">number</a> &#124; <a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-216">
<div class="comment"><p>The size in spaces a tab takes. This is used for two purposes:</p>
<ul>
<li>the rendering width of a tab character;</li>
<li>the number of spaces to insert when <a href="#TextEditorOptions.insertSpaces">insertSpaces</a> is true.</li>
</ul>
<p>When getting a text editor&#39;s options, this property will always be a number (resolved).
When setting a text editor&#39;s options, this property is optional and it can be a number or <code>&quot;auto&quot;</code>.</p>
</div>
</div>

### <a name="TextEditorOptionsChangeEvent"></a><span class="code-item" id=198>TextEditorOptionsChangeEvent</span>



<div class="comment"><p>Represents an event describing the change in a <a href="#TextEditor.options">text editor&#39;s options</a>.</p>
</div>

#### Properties



<a name="TextEditorOptionsChangeEvent.options"></a><span class="ts" id=200 data-target="#details-200" data-toggle="collapse"><span class="ident">options</span><span>: </span><a class="type-ref" href="#TextEditorOptions">TextEditorOptions</a></span>
<div class="details collapse" id="details-200">
<div class="comment"><p>The new value for the <a href="#TextEditor.options">text editor&#39;s options</a>.</p>
</div>
</div>



<a name="TextEditorOptionsChangeEvent.textEditor"></a><span class="ts" id=199 data-target="#details-199" data-toggle="collapse"><span class="ident">textEditor</span><span>: </span><a class="type-ref" href="#TextEditor">TextEditor</a></span>
<div class="details collapse" id="details-199">
<div class="comment"><p>The <a href="#TextEditor">text editor</a> for which the options have changed.</p>
</div>
</div>

### <a name="TextEditorRevealType"></a><span class="code-item" id=224>TextEditorRevealType</span>



<div class="comment"><p>Represents different <a href="#TextEditor.revealRange">reveal</a> strategies in a text editor.</p>
</div>

#### Enumeration members



<a name="TextEditorRevealType.AtTop"></a><span class="ts" id=228 data-target="#details-228" data-toggle="collapse"><span class="ident">AtTop</span></span>
<div class="details collapse" id="details-228">
<em>3</em>
</div>



<a name="TextEditorRevealType.Default"></a><span class="ts" id=225 data-target="#details-225" data-toggle="collapse"><span class="ident">Default</span></span>
<div class="details collapse" id="details-225">
<em>0</em>
</div>



<a name="TextEditorRevealType.InCenter"></a><span class="ts" id=226 data-target="#details-226" data-toggle="collapse"><span class="ident">InCenter</span></span>
<div class="details collapse" id="details-226">
<em>1</em>
</div>



<a name="TextEditorRevealType.InCenterIfOutsideViewport"></a><span class="ts" id=227 data-target="#details-227" data-toggle="collapse"><span class="ident">InCenterIfOutsideViewport</span></span>
<div class="details collapse" id="details-227">
<em>2</em>
</div>

### <a name="TextEditorSelectionChangeEvent"></a><span class="code-item" id=194>TextEditorSelectionChangeEvent</span>



<div class="comment"><p>Represents an event describing the change in a <a href="#TextEditor.selections">text editor&#39;s selections</a>.</p>
</div>

#### Properties



<a name="TextEditorSelectionChangeEvent.kind"></a><span class="ts" id=197 data-target="#details-197" data-toggle="collapse"><span class="ident">kind</span><span>?</span><span>: </span><a class="type-ref" href="#TextEditorSelectionChangeKind">TextEditorSelectionChangeKind</a></span>
<div class="details collapse" id="details-197">
<div class="comment"><p>The <a href="#TextEditorSelectionChangeKind">change kind</a> which has triggered this
event. Can be <code>undefined</code>.</p>
</div>
</div>



<a name="TextEditorSelectionChangeEvent.selections"></a><span class="ts" id=196 data-target="#details-196" data-toggle="collapse"><span class="ident">selections</span><span>: </span><a class="type-ref" href="#Selection">Selection</a>[]</span>
<div class="details collapse" id="details-196">
<div class="comment"><p>The new value for the <a href="#TextEditor.selections">text editor&#39;s selections</a>.</p>
</div>
</div>



<a name="TextEditorSelectionChangeEvent.textEditor"></a><span class="ts" id=195 data-target="#details-195" data-toggle="collapse"><span class="ident">textEditor</span><span>: </span><a class="type-ref" href="#TextEditor">TextEditor</a></span>
<div class="details collapse" id="details-195">
<div class="comment"><p>The <a href="#TextEditor">text editor</a> for which the selections have changed.</p>
</div>
</div>

### <a name="TextEditorSelectionChangeKind"></a><span class="code-item" id=190>TextEditorSelectionChangeKind</span>



<div class="comment"><p>Represents sources that can cause <a href="#window.onDidChangeTextEditorSelection">selection change events</a>.</p>
</div>

#### Enumeration members



<a name="TextEditorSelectionChangeKind.Command"></a><span class="ts" id=193 data-target="#details-193" data-toggle="collapse"><span class="ident">Command</span></span>
<div class="details collapse" id="details-193">
<em>3</em>
</div>



<a name="TextEditorSelectionChangeKind.Keyboard"></a><span class="ts" id=191 data-target="#details-191" data-toggle="collapse"><span class="ident">Keyboard</span></span>
<div class="details collapse" id="details-191">
<em>1</em>
</div>



<a name="TextEditorSelectionChangeKind.Mouse"></a><span class="ts" id=192 data-target="#details-192" data-toggle="collapse"><span class="ident">Mouse</span></span>
<div class="details collapse" id="details-192">
<em>2</em>
</div>

### <a name="TextEditorViewColumnChangeEvent"></a><span class="code-item" id=201>TextEditorViewColumnChangeEvent</span>



<div class="comment"><p>Represents an event describing the change of a <a href="#TextEditor.viewColumn">text editor&#39;s view column</a>.</p>
</div>

#### Properties



<a name="TextEditorViewColumnChangeEvent.textEditor"></a><span class="ts" id=202 data-target="#details-202" data-toggle="collapse"><span class="ident">textEditor</span><span>: </span><a class="type-ref" href="#TextEditor">TextEditor</a></span>
<div class="details collapse" id="details-202">
<div class="comment"><p>The <a href="#TextEditor">text editor</a> for which the options have changed.</p>
</div>
</div>



<a name="TextEditorViewColumnChangeEvent.viewColumn"></a><span class="ts" id=203 data-target="#details-203" data-toggle="collapse"><span class="ident">viewColumn</span><span>: </span><a class="type-ref" href="#ViewColumn">ViewColumn</a></span>
<div class="details collapse" id="details-203">
<div class="comment"><p>The new value for the <a href="#TextEditor.viewColumn">text editor&#39;s view column</a>.</p>
</div>
</div>

### <a name="TextLine"></a><span class="code-item" id=31>TextLine</span>



<div class="comment"><p>Represents a line of text, such as a line of source code.</p>
<p>TextLine objects are <strong>immutable</strong>. When a <a href="#TextDocument">document</a> changes,
previously retrieved lines will not represent the latest state.</p>
</div>

#### Properties



<a name="TextLine.firstNonWhitespaceCharacterIndex"></a><span class="ts" id=36 data-target="#details-36" data-toggle="collapse"><span class="ident">firstNonWhitespaceCharacterIndex</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-36">
<div class="comment"><p>The offset of the first character which is not a whitespace character as defined
by <code>/\s/</code>. <strong>Note</strong> that if a line is all whitespaces the length of the line is returned.</p>
</div>
</div>



<a name="TextLine.isEmptyOrWhitespace"></a><span class="ts" id=37 data-target="#details-37" data-toggle="collapse"><span class="ident">isEmptyOrWhitespace</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-37">
<div class="comment"><p>Whether this line is whitespace only, shorthand
for <a href="#TextLine.firstNonWhitespaceCharacterIndex">TextLine.firstNonWhitespaceCharacterIndex</a> === <a href="#TextLine.text">TextLine.text.length</a>.</p>
</div>
</div>



<a name="TextLine.lineNumber"></a><span class="ts" id=32 data-target="#details-32" data-toggle="collapse"><span class="ident">lineNumber</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-32">
<div class="comment"><p>The zero-based line number.</p>
</div>
</div>



<a name="TextLine.range"></a><span class="ts" id=34 data-target="#details-34" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-34">
<div class="comment"><p>The range this line covers without the line separator characters.</p>
</div>
</div>



<a name="TextLine.rangeIncludingLineBreak"></a><span class="ts" id=35 data-target="#details-35" data-toggle="collapse"><span class="ident">rangeIncludingLineBreak</span><span>: </span><a class="type-ref" href="#Range">Range</a></span>
<div class="details collapse" id="details-35">
<div class="comment"><p>The range this line covers with the line separator characters.</p>
</div>
</div>



<a name="TextLine.text"></a><span class="ts" id=33 data-target="#details-33" data-toggle="collapse"><span class="ident">text</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-33">
<div class="comment"><p>The text of this line without the line separator characters.</p>
</div>
</div>

### <a name="ThemableDecorationAttachmentRenderOptions"></a><span class="code-item" id=269>ThemableDecorationAttachmentRenderOptions</span>



<div class="comment"></div>

#### Properties



<a name="ThemableDecorationAttachmentRenderOptions.backgroundColor"></a><span class="ts" id=276 data-target="#details-276" data-toggle="collapse"><span class="ident">backgroundColor</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#ThemeColor">ThemeColor</a></span>
<div class="details collapse" id="details-276">
<div class="comment"><p>CSS styling property that will be applied to the decoration attachment.</p>
</div>
</div>



<a name="ThemableDecorationAttachmentRenderOptions.border"></a><span class="ts" id=272 data-target="#details-272" data-toggle="collapse"><span class="ident">border</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-272">
<div class="comment"><p>CSS styling property that will be applied to the decoration attachment.</p>
</div>
</div>



<a name="ThemableDecorationAttachmentRenderOptions.borderColor"></a><span class="ts" id=273 data-target="#details-273" data-toggle="collapse"><span class="ident">borderColor</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#ThemeColor">ThemeColor</a></span>
<div class="details collapse" id="details-273">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="ThemableDecorationAttachmentRenderOptions.color"></a><span class="ts" id=275 data-target="#details-275" data-toggle="collapse"><span class="ident">color</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#ThemeColor">ThemeColor</a></span>
<div class="details collapse" id="details-275">
<div class="comment"><p>CSS styling property that will be applied to the decoration attachment.</p>
</div>
</div>



<a name="ThemableDecorationAttachmentRenderOptions.contentIconPath"></a><span class="ts" id=271 data-target="#details-271" data-toggle="collapse"><span class="ident">contentIconPath</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#Uri">Uri</a></span>
<div class="details collapse" id="details-271">
<div class="comment"><p>An <strong>absolute path</strong> or an URI to an image to be rendered in the attachment. Either an icon
or a text can be shown, but not both.</p>
</div>
</div>



<a name="ThemableDecorationAttachmentRenderOptions.contentText"></a><span class="ts" id=270 data-target="#details-270" data-toggle="collapse"><span class="ident">contentText</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-270">
<div class="comment"><p>Defines a text content that is shown in the attachment. Either an icon or a text can be shown, but not both.</p>
</div>
</div>



<a name="ThemableDecorationAttachmentRenderOptions.height"></a><span class="ts" id=279 data-target="#details-279" data-toggle="collapse"><span class="ident">height</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-279">
<div class="comment"><p>CSS styling property that will be applied to the decoration attachment.</p>
</div>
</div>



<a name="ThemableDecorationAttachmentRenderOptions.margin"></a><span class="ts" id=277 data-target="#details-277" data-toggle="collapse"><span class="ident">margin</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-277">
<div class="comment"><p>CSS styling property that will be applied to the decoration attachment.</p>
</div>
</div>



<a name="ThemableDecorationAttachmentRenderOptions.textDecoration"></a><span class="ts" id=274 data-target="#details-274" data-toggle="collapse"><span class="ident">textDecoration</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-274">
<div class="comment"><p>CSS styling property that will be applied to the decoration attachment.</p>
</div>
</div>



<a name="ThemableDecorationAttachmentRenderOptions.width"></a><span class="ts" id=278 data-target="#details-278" data-toggle="collapse"><span class="ident">width</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-278">
<div class="comment"><p>CSS styling property that will be applied to the decoration attachment.</p>
</div>
</div>

### <a name="ThemableDecorationInstanceRenderOptions"></a><span class="code-item" id=310>ThemableDecorationInstanceRenderOptions</span>



<div class="comment"></div>

#### Properties



<a name="ThemableDecorationInstanceRenderOptions.after"></a><span class="ts" id=312 data-target="#details-312" data-toggle="collapse"><span class="ident">after</span><span>?</span><span>: </span><a class="type-ref" href="#ThemableDecorationAttachmentRenderOptions">ThemableDecorationAttachmentRenderOptions</a></span>
<div class="details collapse" id="details-312">
<div class="comment"><p>Defines the rendering options of the attachment that is inserted after the decorated text</p>
</div>
</div>



<a name="ThemableDecorationInstanceRenderOptions.before"></a><span class="ts" id=311 data-target="#details-311" data-toggle="collapse"><span class="ident">before</span><span>?</span><span>: </span><a class="type-ref" href="#ThemableDecorationAttachmentRenderOptions">ThemableDecorationAttachmentRenderOptions</a></span>
<div class="details collapse" id="details-311">
<div class="comment"><p>Defines the rendering options of the attachment that is inserted before the decorated text</p>
</div>
</div>

### <a name="ThemableDecorationRenderOptions"></a><span class="code-item" id=248>ThemableDecorationRenderOptions</span>



<div class="comment"><p>Represents theme specific rendering styles for a <a href="#TextEditorDecorationType">text editor decoration</a>.</p>
</div>

#### Properties



<a name="ThemableDecorationRenderOptions.after"></a><span class="ts" id=268 data-target="#details-268" data-toggle="collapse"><span class="ident">after</span><span>?</span><span>: </span><a class="type-ref" href="#ThemableDecorationAttachmentRenderOptions">ThemableDecorationAttachmentRenderOptions</a></span>
<div class="details collapse" id="details-268">
<div class="comment"><p>Defines the rendering options of the attachment that is inserted after the decorated text</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.backgroundColor"></a><span class="ts" id=249 data-target="#details-249" data-toggle="collapse"><span class="ident">backgroundColor</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#ThemeColor">ThemeColor</a></span>
<div class="details collapse" id="details-249">
<div class="comment"><p>Background color of the decoration. Use rgba() and define transparent background colors to play well with other decorations.
Alternatively a color from the color registry can be <a href="#ThemeColor">referenced</a>.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.before"></a><span class="ts" id=267 data-target="#details-267" data-toggle="collapse"><span class="ident">before</span><span>?</span><span>: </span><a class="type-ref" href="#ThemableDecorationAttachmentRenderOptions">ThemableDecorationAttachmentRenderOptions</a></span>
<div class="details collapse" id="details-267">
<div class="comment"><p>Defines the rendering options of the attachment that is inserted before the decorated text</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.border"></a><span class="ts" id=254 data-target="#details-254" data-toggle="collapse"><span class="ident">border</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-254">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.borderColor"></a><span class="ts" id=255 data-target="#details-255" data-toggle="collapse"><span class="ident">borderColor</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#ThemeColor">ThemeColor</a></span>
<div class="details collapse" id="details-255">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.
Better use &#39;border&#39; for setting one or more of the individual border properties.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.borderRadius"></a><span class="ts" id=256 data-target="#details-256" data-toggle="collapse"><span class="ident">borderRadius</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-256">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.
Better use &#39;border&#39; for setting one or more of the individual border properties.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.borderSpacing"></a><span class="ts" id=257 data-target="#details-257" data-toggle="collapse"><span class="ident">borderSpacing</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-257">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.
Better use &#39;border&#39; for setting one or more of the individual border properties.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.borderStyle"></a><span class="ts" id=258 data-target="#details-258" data-toggle="collapse"><span class="ident">borderStyle</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-258">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.
Better use &#39;border&#39; for setting one or more of the individual border properties.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.borderWidth"></a><span class="ts" id=259 data-target="#details-259" data-toggle="collapse"><span class="ident">borderWidth</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-259">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.
Better use &#39;border&#39; for setting one or more of the individual border properties.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.color"></a><span class="ts" id=262 data-target="#details-262" data-toggle="collapse"><span class="ident">color</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#ThemeColor">ThemeColor</a></span>
<div class="details collapse" id="details-262">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.cursor"></a><span class="ts" id=261 data-target="#details-261" data-toggle="collapse"><span class="ident">cursor</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-261">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.gutterIconPath"></a><span class="ts" id=264 data-target="#details-264" data-toggle="collapse"><span class="ident">gutterIconPath</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#Uri">Uri</a></span>
<div class="details collapse" id="details-264">
<div class="comment"><p>An <strong>absolute path</strong> or an URI to an image to be rendered in the gutter.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.gutterIconSize"></a><span class="ts" id=265 data-target="#details-265" data-toggle="collapse"><span class="ident">gutterIconSize</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-265">
<div class="comment"><p>Specifies the size of the gutter icon.
Available values are &#39;auto&#39;, &#39;contain&#39;, &#39;cover&#39; and any percentage value.
For further information: <a href="https://msdn.microsoft.com/en-us/library/jj127316(v=vs.85).aspx">https://msdn.microsoft.com/en-us/library/jj127316(v=vs.85).aspx</a></p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.letterSpacing"></a><span class="ts" id=263 data-target="#details-263" data-toggle="collapse"><span class="ident">letterSpacing</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-263">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.outline"></a><span class="ts" id=250 data-target="#details-250" data-toggle="collapse"><span class="ident">outline</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-250">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.outlineColor"></a><span class="ts" id=251 data-target="#details-251" data-toggle="collapse"><span class="ident">outlineColor</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#ThemeColor">ThemeColor</a></span>
<div class="details collapse" id="details-251">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.
Better use &#39;outline&#39; for setting one or more of the individual outline properties.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.outlineStyle"></a><span class="ts" id=252 data-target="#details-252" data-toggle="collapse"><span class="ident">outlineStyle</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-252">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.
Better use &#39;outline&#39; for setting one or more of the individual outline properties.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.outlineWidth"></a><span class="ts" id=253 data-target="#details-253" data-toggle="collapse"><span class="ident">outlineWidth</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-253">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.
Better use &#39;outline&#39; for setting one or more of the individual outline properties.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.overviewRulerColor"></a><span class="ts" id=266 data-target="#details-266" data-toggle="collapse"><span class="ident">overviewRulerColor</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#ThemeColor">ThemeColor</a></span>
<div class="details collapse" id="details-266">
<div class="comment"><p>The color of the decoration in the overview ruler. Use rgba() and define transparent colors to play well with other decorations.</p>
</div>
</div>



<a name="ThemableDecorationRenderOptions.textDecoration"></a><span class="ts" id=260 data-target="#details-260" data-toggle="collapse"><span class="ident">textDecoration</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-260">
<div class="comment"><p>CSS styling property that will be applied to text enclosed by a decoration.</p>
</div>
</div>

### <a name="ThemeColor"></a><span class="code-item" id=244>ThemeColor</span>



<div class="comment"><p>A reference to one of the workbench colors as defined in <a href="https://code.visualstudio.com/docs/getstarted/theme-color-reference">https://code.visualstudio.com/docs/getstarted/theme-color-reference</a>.
Using a theme color is preferred over a custom color as it gives theme authors and users the possibility to change the color.</p>
</div>

#### Constructors



<a name="ThemeColor.new ThemeColor"></a><span class="ts" id=246 data-target="#details-246" data-toggle="collapse"><span class="ident">new ThemeColor</span><span>(</span><span class="ident">id</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#ThemeColor">ThemeColor</a></span>
<div class="details collapse" id="details-246">
<div class="comment"><p>Creates a reference to a theme color.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="id"></a><span class="ts" id=247 data-target="#details-247" data-toggle="collapse"><span class="ident">id</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>of the color. The available colors are listed in <a href="https://code.visualstudio.com/docs/getstarted/theme-color-reference">https://code.visualstudio.com/docs/getstarted/theme-color-reference</a>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ThemeColor">ThemeColor</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="TreeDataProvider"></a><span class="code-item" id=1260>TreeDataProvider&lt;T&gt;</span>



<div class="comment"><p>A data provider that provides tree data</p>
</div>

#### Events



<a name="TreeDataProvider.onDidChangeTreeData"></a><span class="ts" id=1262 data-target="#details-1262" data-toggle="collapse"><span class="ident">onDidChangeTreeData</span><span>?</span><span>: </span><a class="type-ref" href="#Event">Event</a>&lt;<a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a> &#124; <a class="type-intrinsic">null</a>&gt;</span>
<div class="details collapse" id="details-1262">
<div class="comment"><p>An optional event to signal that an element or root has changed.
To signal that root has changed, do not pass any argument or pass <code>undefined</code> or <code>null</code>.</p>
</div>
</div>

#### Methods



<a name="TreeDataProvider.getChildren"></a><span class="ts" id=1267 data-target="#details-1267" data-toggle="collapse"><span class="ident">getChildren</span><span>(</span><span class="ident">element</span><span>?</span><span>: </span><a class="type-intrinsic">T</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-intrinsic">T</a>[]&gt;</span>
<div class="details collapse" id="details-1267">
<div class="comment"><p>Get the children of <code>element</code> or root if no element is passed.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="element"></a><span class="ts" id=1268 data-target="#details-1268" data-toggle="collapse"><span class="ident">element</span><span>?</span><span>: </span><a class="type-intrinsic">T</a></span></td><td><div class="comment"><p>The element from which the provider gets children. Can be <code>undefined</code>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-intrinsic">T</a>[]&gt;</span></td><td><div class="comment"><p>Children of <code>element</code> or root if no element is passed.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="TreeDataProvider.getTreeItem"></a><span class="ts" id=1264 data-target="#details-1264" data-toggle="collapse"><span class="ident">getTreeItem</span><span>(</span><span class="ident">element</span><span>: </span><a class="type-intrinsic">T</a><span>)</span><span>: </span><a class="type-ref" href="#TreeItem">TreeItem</a> &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TreeItem">TreeItem</a>&gt;</span>
<div class="details collapse" id="details-1264">
<div class="comment"><p>Get <a href="#TreeItem">TreeItem</a> representation of the <code>element</code></p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="element"></a><span class="ts" id=1265 data-target="#details-1265" data-toggle="collapse"><span class="ident">element</span><span>: </span><a class="type-intrinsic">T</a></span></td><td><div class="comment"><p>The element for which <a href="#TreeItem">TreeItem</a> representation is asked for.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TreeItem">TreeItem</a> &#124; <a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-ref" href="#TreeItem">TreeItem</a>&gt;</span></td><td><div class="comment"><p>(#TreeItem) representation of the element</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="TreeItem"></a><span class="code-item" id=1269>TreeItem</span>



<div class="comment"></div>

#### Constructors



<a name="TreeItem.new TreeItem"></a><span class="ts" id=1279 data-target="#details-1279" data-toggle="collapse"><span class="ident">new TreeItem</span><span>(</span><span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">collapsibleState</span><span>?</span><span>: </span><a class="type-ref" href="#TreeItemCollapsibleState">TreeItemCollapsibleState</a><span>)</span><span>: </span><a class="type-ref" href="#TreeItem">TreeItem</a></span>
<div class="details collapse" id="details-1279">
<div class="comment"></div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="label"></a><span class="ts" id=1280 data-target="#details-1280" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A human-readable string describing this item</p>
</div></td></tr>
<tr><td><a name="collapsibleState"></a><span class="ts" id=1281 data-target="#details-1281" data-toggle="collapse"><span class="ident">collapsibleState</span><span>?</span><span>: </span><a class="type-ref" href="#TreeItemCollapsibleState">TreeItemCollapsibleState</a></span></td><td><div class="comment"><p>(#TreeItemCollapsibleState) of the tree item. Default is <a href="#TreeItemCollapsibleState.None">TreeItemCollapsibleState.None</a></p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TreeItem">TreeItem</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="TreeItem.collapsibleState"></a><span class="ts" id=1276 data-target="#details-1276" data-toggle="collapse"><span class="ident">collapsibleState</span><span>?</span><span>: </span><a class="type-ref" href="#TreeItemCollapsibleState">TreeItemCollapsibleState</a></span>
<div class="details collapse" id="details-1276">
<div class="comment"><p><a href="#TreeItemCollapsibleState">TreeItemCollapsibleState</a> of the tree item.</p>
</div>
</div>



<a name="TreeItem.command"></a><span class="ts" id=1275 data-target="#details-1275" data-toggle="collapse"><span class="ident">command</span><span>?</span><span>: </span><a class="type-ref" href="#Command">Command</a></span>
<div class="details collapse" id="details-1275">
<div class="comment"><p>The <a href="#Command">command</a> which should be run when the tree item is selected.</p>
</div>
</div>



<a name="TreeItem.contextValue"></a><span class="ts" id=1277 data-target="#details-1277" data-toggle="collapse"><span class="ident">contextValue</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1277">
<div class="comment"><p>Context value of the tree item. This can be used to contribute item specific actions in the tree.
For example, a tree item is given a context value as <code>folder</code>. When contributing actions to <code>view/item/context</code>
using <code>menus</code> extension point, you can specify context value for key <code>viewItem</code> in <code>when</code> expression like <code>viewItem == folder</code>.</p>

<pre><code>    <span class="hljs-string">"contributes"</span>: {
        <span class="hljs-string">"menus"</span>: {
            <span class="hljs-string">"view/item/context"</span>: [
                {
                    <span class="hljs-string">"command"</span>: <span class="hljs-string">"extension.deleteFolder"</span>,
                    <span class="hljs-string">"when"</span>: <span class="hljs-string">"viewItem == folder"</span>
                }
            ]
        }
    }
</code></pre><p>This will show action <code>extension.deleteFolder</code> only for items with <code>contextValue</code> is <code>folder</code>.</p>
</div>
</div>



<a name="TreeItem.iconPath"></a><span class="ts" id=1271 data-target="#details-1271" data-toggle="collapse"><span class="ident">iconPath</span><span>?</span><span>: </span><a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#Uri">Uri</a> &#124; {dark: <a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#Uri">Uri</a>, light: <a class="type-intrinsic">string</a> &#124; <a class="type-ref" href="#Uri">Uri</a>}</span>
<div class="details collapse" id="details-1271">
<div class="comment"><p>The icon path for the tree item</p>
</div>
</div>



<a name="TreeItem.label"></a><span class="ts" id=1270 data-target="#details-1270" data-toggle="collapse"><span class="ident">label</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1270">
<div class="comment"><p>A human-readable string describing this item</p>
</div>
</div>

### <a name="TreeItemCollapsibleState"></a><span class="code-item" id=1282>TreeItemCollapsibleState</span>



<div class="comment"><p>Collapsible state of the tree item</p>
</div>

#### Enumeration members



<a name="TreeItemCollapsibleState.Collapsed"></a><span class="ts" id=1284 data-target="#details-1284" data-toggle="collapse"><span class="ident">Collapsed</span></span>
<div class="details collapse" id="details-1284">
<em>1</em>
</div>



<a name="TreeItemCollapsibleState.Expanded"></a><span class="ts" id=1285 data-target="#details-1285" data-toggle="collapse"><span class="ident">Expanded</span></span>
<div class="details collapse" id="details-1285">
<em>2</em>
</div>



<a name="TreeItemCollapsibleState.None"></a><span class="ts" id=1283 data-target="#details-1283" data-toggle="collapse"><span class="ident">None</span></span>
<div class="details collapse" id="details-1283">
<em>0</em>
</div>

### <a name="TypeDefinitionProvider"></a><span class="code-item" id=568>TypeDefinitionProvider</span>



<div class="comment"><p>The type definition provider defines the contract between extensions and
the go to type definition feature.</p>
</div>

#### Methods



<a name="TypeDefinitionProvider.provideTypeDefinition"></a><span class="ts" id=570 data-target="#details-570" data-toggle="collapse"><span class="ident">provideTypeDefinition</span><span>(</span><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a>, <span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#Definition">Definition</a>&gt;</span>
<div class="details collapse" id="details-570">
<div class="comment"><p>Provide the type definition of the symbol at the given position and document.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="document"></a><span class="ts" id=571 data-target="#details-571" data-toggle="collapse"><span class="ident">document</span><span>: </span><a class="type-ref" href="#TextDocument">TextDocument</a></span></td><td><div class="comment"><p>The document in which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="position"></a><span class="ts" id=572 data-target="#details-572" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>The position at which the command was invoked.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=573 data-target="#details-573" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#Definition">Definition</a>&gt;</span></td><td><div class="comment"><p>A definition or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code> or <code>null</code>.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="Uri"></a><span class="code-item" id=373>Uri</span>



<div class="comment"><p>A universal resource identifier representing either a file on disk
or another resource, like untitled resources.</p>
</div>

#### Static



<a name="Uri.file"></a><span class="ts" id=375 data-target="#details-375" data-toggle="collapse"><span class="ident">file</span><span>(</span><span class="ident">path</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span>
<div class="details collapse" id="details-375">
<div class="comment"><p>Create an URI from a file system path. The <a href="#Uri.scheme">scheme</a>
will be <code>file</code>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="path"></a><span class="ts" id=376 data-target="#details-376" data-toggle="collapse"><span class="ident">path</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A file system or UNC path.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A new Uri instance.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Uri.parse"></a><span class="ts" id=378 data-target="#details-378" data-toggle="collapse"><span class="ident">parse</span><span>(</span><span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span>
<div class="details collapse" id="details-378">
<div class="comment"><p>Create an URI from a string. Will throw if the given value is not
valid.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="value"></a><span class="ts" id=379 data-target="#details-379" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>The string value of an Uri.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A new Uri instance.</p>
</div></td></tr>
</table>
</div>
</div>

#### Constructors



<a name="Uri.new Uri"></a><span class="ts" id=381 data-target="#details-381" data-toggle="collapse"><span class="ident">new Uri</span><span>(</span><span class="ident">scheme</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">authority</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">path</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">query</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">fragment</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span>
<div class="details collapse" id="details-381">
<div class="comment"><p>Use the <code>file</code> and <code>parse</code> factory functions to create new <code>Uri</code> objects.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="scheme"></a><span class="ts" id=382 data-target="#details-382" data-toggle="collapse"><span class="ident">scheme</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"></div></td></tr>
<tr><td><a name="authority"></a><span class="ts" id=383 data-target="#details-383" data-toggle="collapse"><span class="ident">authority</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"></div></td></tr>
<tr><td><a name="path"></a><span class="ts" id=384 data-target="#details-384" data-toggle="collapse"><span class="ident">path</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"></div></td></tr>
<tr><td><a name="query"></a><span class="ts" id=385 data-target="#details-385" data-toggle="collapse"><span class="ident">query</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"></div></td></tr>
<tr><td><a name="fragment"></a><span class="ts" id=386 data-target="#details-386" data-toggle="collapse"><span class="ident">fragment</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"></div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

#### Properties



<a name="Uri.authority"></a><span class="ts" id=388 data-target="#details-388" data-toggle="collapse"><span class="ident">authority</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-388">
<div class="comment"><p>Authority is the <code>www.msft.com</code> part of <code>http://www.msft.com/some/path?query#fragment</code>.
The part between the first double slashes and the next slash.</p>
</div>
</div>



<a name="Uri.fragment"></a><span class="ts" id=391 data-target="#details-391" data-toggle="collapse"><span class="ident">fragment</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-391">
<div class="comment"><p>Fragment is the <code>fragment</code> part of <code>http://www.msft.com/some/path?query#fragment</code>.</p>
</div>
</div>



<a name="Uri.fsPath"></a><span class="ts" id=392 data-target="#details-392" data-toggle="collapse"><span class="ident">fsPath</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-392">
<div class="comment"><p>The string representing the corresponding file system path of this Uri.</p>
<p>Will handle UNC paths and normalize windows drive letters to lower-case. Also
uses the platform specific path separator. Will <em>not</em> validate the path for
invalid characters and semantics. Will <em>not</em> look at the scheme of this Uri.</p>
</div>
</div>



<a name="Uri.path"></a><span class="ts" id=389 data-target="#details-389" data-toggle="collapse"><span class="ident">path</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-389">
<div class="comment"><p>Path is the <code>/some/path</code> part of <code>http://www.msft.com/some/path?query#fragment</code>.</p>
</div>
</div>



<a name="Uri.query"></a><span class="ts" id=390 data-target="#details-390" data-toggle="collapse"><span class="ident">query</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-390">
<div class="comment"><p>Query is the <code>query</code> part of <code>http://www.msft.com/some/path?query#fragment</code>.</p>
</div>
</div>



<a name="Uri.scheme"></a><span class="ts" id=387 data-target="#details-387" data-toggle="collapse"><span class="ident">scheme</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-387">
<div class="comment"><p>Scheme is the <code>http</code> part of <code>http://www.msft.com/some/path?query#fragment</code>.
The part before the first colon.</p>
</div>
</div>

#### Methods



<a name="Uri.toJSON"></a><span class="ts" id=406 data-target="#details-406" data-toggle="collapse"><span class="ident">toJSON</span><span>(</span><span>)</span><span>: </span><a class="type-intrinsic">any</a></span>
<div class="details collapse" id="details-406">
<div class="comment"><p>Returns a JSON representation of this Uri.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">any</a></span></td><td><div class="comment"><p>An object.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Uri.toString"></a><span class="ts" id=403 data-target="#details-403" data-toggle="collapse"><span class="ident">toString</span><span>(</span><span class="ident">skipEncoding</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a><span>)</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-403">
<div class="comment"><p>Returns a string representation of this Uri. The representation and normalization
of a URI depends on the scheme. The resulting string can be safely used with
<a href="#Uri.parse">Uri.parse</a>.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="skipEncoding"></a><span class="ts" id=404 data-target="#details-404" data-toggle="collapse"><span class="ident">skipEncoding</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p>Do not percentage-encode the result, defaults to <code>false</code>. Note that
    the <code>#</code> and <code>?</code> characters occuring in the path will always be encoded.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A string representation of this Uri.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="Uri.with"></a><span class="ts" id=394 data-target="#details-394" data-toggle="collapse"><span class="ident">with</span><span>(</span><span class="ident">change</span><span>: </span>{authority: <a class="type-intrinsic">string</a>, fragment: <a class="type-intrinsic">string</a>, path: <a class="type-intrinsic">string</a>, query: <a class="type-intrinsic">string</a>, scheme: <a class="type-intrinsic">string</a>}<span>)</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span>
<div class="details collapse" id="details-394">
<div class="comment"><p>Derive a new Uri from this Uri.</p>

<pre><code class="lang-ts"><span class="hljs-keyword">let</span> file = Uri.parse(<span class="hljs-string">'before:some/file/path'</span>);
<span class="hljs-keyword">let</span> other = file.with({ scheme: <span class="hljs-string">'after'</span> });
assert.ok(other.toString() === <span class="hljs-string">'after:some/file/path'</span>);
</code></pre>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="change"></a><span class="ts" id=395 data-target="#details-395" data-toggle="collapse"><span class="ident">change</span><span>: </span>{authority: <a class="type-intrinsic">string</a>, fragment: <a class="type-intrinsic">string</a>, path: <a class="type-intrinsic">string</a>, query: <a class="type-intrinsic">string</a>, scheme: <a class="type-intrinsic">string</a>}</span></td><td><div class="comment"><p>An object that describes a change to this Uri. To unset components use <code>null</code> or
 the empty string.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A new Uri that reflects the given change. Will return <code>this</code> Uri if the change
 is not changing anything.</p>
</div></td></tr>
</table>
</div>
</div>

### <a name="ViewColumn"></a><span class="code-item" id=1070>ViewColumn</span>



<div class="comment"><p>Denotes a column in the editor window. Columns are
used to show editors side by side.</p>
</div>

#### Enumeration members



<a name="ViewColumn.Active"></a><span class="ts" id=1071 data-target="#details-1071" data-toggle="collapse"><span class="ident">Active</span></span>
<div class="details collapse" id="details-1071">
<em> -1</em>
</div>



<a name="ViewColumn.One"></a><span class="ts" id=1072 data-target="#details-1072" data-toggle="collapse"><span class="ident">One</span></span>
<div class="details collapse" id="details-1072">
<em>1</em>
</div>



<a name="ViewColumn.Three"></a><span class="ts" id=1074 data-target="#details-1074" data-toggle="collapse"><span class="ident">Three</span></span>
<div class="details collapse" id="details-1074">
<em>3</em>
</div>



<a name="ViewColumn.Two"></a><span class="ts" id=1073 data-target="#details-1073" data-toggle="collapse"><span class="ident">Two</span></span>
<div class="details collapse" id="details-1073">
<em>2</em>
</div>

### <a name="WindowState"></a><span class="code-item" id=1258>WindowState</span>



<div class="comment"><p>Represents the state of a window.</p>
</div>

#### Properties



<a name="WindowState.focused"></a><span class="ts" id=1259 data-target="#details-1259" data-toggle="collapse"><span class="ident">focused</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-1259">
<div class="comment"><p>Whether the current window is focused.</p>
</div>
</div>

### <a name="WorkspaceConfiguration"></a><span class="code-item" id=988>WorkspaceConfiguration</span>



<div class="comment"><p>Represents the configuration. It is a merged view of</p>
<ul>
<li>Default configuration</li>
<li>Global configuration</li>
<li>Workspace configuration (if available)</li>
<li>Workspace folder configuration of the requested resource (if available)</li>
</ul>
<p><em>Global configuration</em> comes from User Settings and shadows Defaults.</p>
<p><em>Workspace configuration</em> comes from Workspace Settings and shadows Global configuration.</p>
<p><em>Workspace Folder configuration</em> comes from <code>.vscode</code> folder under one of the <a href="#workspace.workspaceFolders">workspace folders</a>.</p>
<p><em>Note:</em> Workspace and Workspace Folder configurations contains <code>launch</code> and <code>tasks</code> settings. Their basename will be
part of the section identifier. The following snippets shows how to retrieve all configurations
from <code>launch.json</code>:</p>

<pre><code class="lang-ts"><span class="hljs-comment">// launch.json configuration</span>
<span class="hljs-keyword">const</span> config = workspace.getConfiguration(<span class="hljs-string">'launch'</span>, vscode.window.activeTextEditor.document.uri);

<span class="hljs-comment">// retrieve values</span>
<span class="hljs-keyword">const</span> values = config.get(<span class="hljs-string">'configurations'</span>);
</code></pre>
<p>Refer to <a href="https://code.visualstudio.com/docs/getstarted/settings">Settings</a> for more information.</p>
</div>

#### Methods



<a name="WorkspaceConfiguration.get"></a><span class="ts" id=990 data-target="#details-990" data-toggle="collapse"><span class="ident">get</span><span>&lt;</span>T<span>&gt;</span><span>(</span><span class="ident">section</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a></span>
<div class="details collapse" id="details-990">
<div class="comment"><p>Return a value from this configuration.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="section"></a><span class="ts" id=992 data-target="#details-992" data-toggle="collapse"><span class="ident">section</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>Configuration name, supports <em>dotted</em> names.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">T</a> &#124; <a class="type-intrinsic">undefined</a></span></td><td><div class="comment"><p>The value <code>section</code> denotes or <code>undefined</code>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="WorkspaceConfiguration.get"></a><span class="ts" id=993 data-target="#details-993" data-toggle="collapse"><span class="ident">get</span><span>&lt;</span>T<span>&gt;</span><span>(</span><span class="ident">section</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">defaultValue</span><span>: </span><a class="type-intrinsic">T</a><span>)</span><span>: </span><a class="type-intrinsic">T</a></span>
<div class="details collapse" id="details-993">
<div class="comment"><p>Return a value from this configuration.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="section"></a><span class="ts" id=995 data-target="#details-995" data-toggle="collapse"><span class="ident">section</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>Configuration name, supports <em>dotted</em> names.</p>
</div></td></tr>
<tr><td><a name="defaultValue"></a><span class="ts" id=996 data-target="#details-996" data-toggle="collapse"><span class="ident">defaultValue</span><span>: </span><a class="type-intrinsic">T</a></span></td><td><div class="comment"><p>A value should be returned when no value could be found, is <code>undefined</code>.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">T</a></span></td><td><div class="comment"><p>The value <code>section</code> denotes or the default.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="WorkspaceConfiguration.has"></a><span class="ts" id=998 data-target="#details-998" data-toggle="collapse"><span class="ident">has</span><span>(</span><span class="ident">section</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-998">
<div class="comment"><p>Check if this configuration has a certain value.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="section"></a><span class="ts" id=999 data-target="#details-999" data-toggle="collapse"><span class="ident">section</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>Configuration name, supports <em>dotted</em> names.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p><code>true</code> if the section doesn&#39;t resolve to <code>undefined</code>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="WorkspaceConfiguration.inspect"></a><span class="ts" id=1001 data-target="#details-1001" data-toggle="collapse"><span class="ident">inspect</span><span>&lt;</span>T<span>&gt;</span><span>(</span><span class="ident">section</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span>{defaultValue: <a class="type-intrinsic">T</a>, globalValue: <a class="type-intrinsic">T</a>, key: <a class="type-intrinsic">string</a>, workspaceFolderValue: <a class="type-intrinsic">T</a>, workspaceValue: <a class="type-intrinsic">T</a>} &#124; <a class="type-intrinsic">undefined</a></span>
<div class="details collapse" id="details-1001">
<div class="comment"><p>Retrieve all information about a configuration setting. A configuration value
often consists of a <em>default</em> value, a global or installation-wide value,
a workspace-specific value and a folder-specific value.</p>
<p>The <em>effective</em> value (returned by <a href="#WorkspaceConfiguration.get"><code>get</code></a>)
is computed like this: <code>defaultValue</code> overwritten by <code>globalValue</code>,
<code>globalValue</code> overwritten by <code>workspaceValue</code>. <code>workspaceValue</code> overwritten by <code>workspaceFolderValue</code>.
Refer to <a href="https://code.visualstudio.com/docs/getstarted/settings">Settings Inheritence</a>
for more information.</p>
<p><em>Note:</em> The configuration name must denote a leaf in the configuration tree
(<code>editor.fontSize</code> vs <code>editor</code>) otherwise no result is returned.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="section"></a><span class="ts" id=1003 data-target="#details-1003" data-toggle="collapse"><span class="ident">section</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>Configuration name, supports <em>dotted</em> names.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts">{defaultValue: <a class="type-intrinsic">T</a>, globalValue: <a class="type-intrinsic">T</a>, key: <a class="type-intrinsic">string</a>, workspaceFolderValue: <a class="type-intrinsic">T</a>, workspaceValue: <a class="type-intrinsic">T</a>} &#124; <a class="type-intrinsic">undefined</a></span></td><td><div class="comment"><p>Information about a configuration setting or <code>undefined</code>.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="WorkspaceConfiguration.update"></a><span class="ts" id=1011 data-target="#details-1011" data-toggle="collapse"><span class="ident">update</span><span>(</span><span class="ident">section</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">value</span><span>: </span><a class="type-intrinsic">any</a>, <span class="ident">configurationTarget</span><span>?</span><span>: </span><a class="type-ref" href="#ConfigurationTarget">ConfigurationTarget</a> &#124; <a class="type-intrinsic">boolean</a><span>)</span><span>: </span><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">void</a>&gt;</span>
<div class="details collapse" id="details-1011">
<div class="comment"><p>Update a configuration value. The updated configuration values are persisted.</p>
<p>A value can be changed in</p>
<ul>
<li><a href="#ConfigurationTarget.Global">Global configuration</a>: Changes the value for all instances of the editor.</li>
<li><a href="#ConfigurationTarget.Workspace">Workspace configuration</a>: Changes the value for current workspace, if available.</li>
<li><a href="#ConfigurationTarget.WorkspaceFolder">Workspace folder configuration</a>: Changes the value for the
<a href="#workspace.workspaceFolders">Workspace folder</a> to which the current <a href="#WorkspaceConfiguration">configuration</a> is scoped to.</li>
</ul>
<p><em>Note 1:</em> Setting a global value in the presence of a more specific workspace value
has no observable effect in that workspace, but in others. Setting a workspace value
in the presence of a more specific folder value has no observable effect for the resources
under respective <a href="#workspace.workspaceFolders">folder</a>, but in others. Refer to
<a href="https://code.visualstudio.com/docs/getstarted/settings">Settings Inheritence</a> for more information.</p>
<p><em>Note 2:</em> To remove a configuration value use <code>undefined</code>, like so: <code>config.update(&#39;somekey&#39;, undefined)</code></p>
<p>Will throw error when</p>
<ul>
<li>Writing a configuration which is not registered.</li>
<li>Writing a configuration to workspace or folder target when no workspace is opened</li>
<li>Writing a configuration to folder target when there is no folder settings</li>
<li>Writing to folder target without passing a resource when getting the configuration (<code>workspace.getConfiguration(section, resource)</code>)</li>
<li>Writing a window configuration to folder target</li>
</ul>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="section"></a><span class="ts" id=1012 data-target="#details-1012" data-toggle="collapse"><span class="ident">section</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>Configuration name, supports <em>dotted</em> names.</p>
</div></td></tr>
<tr><td><a name="value"></a><span class="ts" id=1013 data-target="#details-1013" data-toggle="collapse"><span class="ident">value</span><span>: </span><a class="type-intrinsic">any</a></span></td><td><div class="comment"><p>The new value.</p>
</div></td></tr>
<tr><td><a name="configurationTarget"></a><span class="ts" id=1014 data-target="#details-1014" data-toggle="collapse"><span class="ident">configurationTarget</span><span>?</span><span>: </span><a class="type-ref" href="#ConfigurationTarget">ConfigurationTarget</a> &#124; <a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p>The <a href="#ConfigurationTarget">configuration target</a> or a boolean value.</p>

<pre><code>- If `<span class="javascript"><span class="hljs-literal">true</span></span>` configuration target <span class="hljs-keyword">is</span> `<span class="javascript">ConfigurationTarget.Global</span>`.
- If `<span class="javascript"><span class="hljs-literal">false</span></span>` configuration target <span class="hljs-keyword">is</span> `<span class="javascript">ConfigurationTarget.Workspace</span>`.
- If `<span class="javascript"><span class="hljs-literal">undefined</span></span>` <span class="hljs-keyword">or</span> `<span class="javascript"><span class="hljs-literal">null</span></span>` configuration target <span class="hljs-keyword">is</span>
`<span class="javascript">ConfigurationTarget.WorkspaceFolder</span>` <span class="hljs-keyword">when</span> configuration <span class="hljs-keyword">is</span> resource specific
`<span class="javascript">ConfigurationTarget.Workspace</span>` otherwise.
</code></pre></div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#Thenable">Thenable</a>&lt;<a class="type-intrinsic">void</a>&gt;</span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="WorkspaceEdit"></a><span class="code-item" id=709>WorkspaceEdit</span>



<div class="comment"><p>A workspace edit represents textual changes for many documents.</p>
</div>

#### Properties



<a name="WorkspaceEdit.size"></a><span class="ts" id=710 data-target="#details-710" data-toggle="collapse"><span class="ident">size</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-710">
<div class="comment"><p>The number of affected resources.</p>
</div>
</div>

#### Methods



<a name="WorkspaceEdit.delete"></a><span class="ts" id=722 data-target="#details-722" data-toggle="collapse"><span class="ident">delete</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a>, <span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-722">
<div class="comment"><p>Delete the text at the given range.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=723 data-target="#details-723" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A resource identifier.</p>
</div></td></tr>
<tr><td><a name="range"></a><span class="ts" id=724 data-target="#details-724" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="WorkspaceEdit.entries"></a><span class="ts" id=736 data-target="#details-736" data-toggle="collapse"><span class="ident">entries</span><span>(</span><span>)</span><span>: </span>[<a class="type-ref" href="#Uri">Uri</a>, <a class="type-ref" href="#TextEdit">TextEdit</a>[]][]</span>
<div class="details collapse" id="details-736">
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



<a name="WorkspaceEdit.get"></a><span class="ts" id=733 data-target="#details-733" data-toggle="collapse"><span class="ident">get</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a><span>)</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a>[]</span>
<div class="details collapse" id="details-733">
<div class="comment"><p>Get the text edits for a resource.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=734 data-target="#details-734" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A resource identifier.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#TextEdit">TextEdit</a>[]</span></td><td><div class="comment"><p>An array of text edits.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="WorkspaceEdit.has"></a><span class="ts" id=726 data-target="#details-726" data-toggle="collapse"><span class="ident">has</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a><span>)</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-726">
<div class="comment"><p>Check if this edit affects the given resource.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=727 data-target="#details-727" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A resource identifier.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">boolean</a></span></td><td><div class="comment"><p><code>true</code> if the given resource will be touched by this edit.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="WorkspaceEdit.insert"></a><span class="ts" id=717 data-target="#details-717" data-toggle="collapse"><span class="ident">insert</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a>, <span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a>, <span class="ident">newText</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-717">
<div class="comment"><p>Insert the given text at the given position.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=718 data-target="#details-718" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A resource identifier.</p>
</div></td></tr>
<tr><td><a name="position"></a><span class="ts" id=719 data-target="#details-719" data-toggle="collapse"><span class="ident">position</span><span>: </span><a class="type-ref" href="#Position">Position</a></span></td><td><div class="comment"><p>A position.</p>
</div></td></tr>
<tr><td><a name="newText"></a><span class="ts" id=720 data-target="#details-720" data-toggle="collapse"><span class="ident">newText</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A string.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="WorkspaceEdit.replace"></a><span class="ts" id=712 data-target="#details-712" data-toggle="collapse"><span class="ident">replace</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a>, <span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a>, <span class="ident">newText</span><span>: </span><a class="type-intrinsic">string</a><span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-712">
<div class="comment"><p>Replace the given range with given text for the given resource.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=713 data-target="#details-713" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A resource identifier.</p>
</div></td></tr>
<tr><td><a name="range"></a><span class="ts" id=714 data-target="#details-714" data-toggle="collapse"><span class="ident">range</span><span>: </span><a class="type-ref" href="#Range">Range</a></span></td><td><div class="comment"><p>A range.</p>
</div></td></tr>
<tr><td><a name="newText"></a><span class="ts" id=715 data-target="#details-715" data-toggle="collapse"><span class="ident">newText</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A string.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>



<a name="WorkspaceEdit.set"></a><span class="ts" id=729 data-target="#details-729" data-toggle="collapse"><span class="ident">set</span><span>(</span><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a>, <span class="ident">edits</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a>[]<span>)</span><span>: </span><a class="type-intrinsic">void</a></span>
<div class="details collapse" id="details-729">
<div class="comment"><p>Set (and replace) text edits for a resource.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="uri"></a><span class="ts" id=730 data-target="#details-730" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span></td><td><div class="comment"><p>A resource identifier.</p>
</div></td></tr>
<tr><td><a name="edits"></a><span class="ts" id=731 data-target="#details-731" data-toggle="collapse"><span class="ident">edits</span><span>: </span><a class="type-ref" href="#TextEdit">TextEdit</a>[]</span></td><td><div class="comment"><p>An array of text edits.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-intrinsic">void</a></span></td><td><div class="comment"></div></td></tr>
</table>
</div>
</div>

### <a name="WorkspaceFolder"></a><span class="code-item" id=1322>WorkspaceFolder</span>



<div class="comment"><p>A workspace folder is one of potentially many roots opened by the editor. All workspace folders
are equal which means there is no notion of an active or master workspace folder.</p>
</div>

#### Properties



<a name="WorkspaceFolder.index"></a><span class="ts" id=1325 data-target="#details-1325" data-toggle="collapse"><span class="ident">index</span><span>: </span><a class="type-intrinsic">number</a></span>
<div class="details collapse" id="details-1325">
<div class="comment"><p>The ordinal number of this workspace folder.</p>
</div>
</div>



<a name="WorkspaceFolder.name"></a><span class="ts" id=1324 data-target="#details-1324" data-toggle="collapse"><span class="ident">name</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-1324">
<div class="comment"><p>The name of this workspace folder. Defaults to
the basename of its <a href="#Uri.path">uri-path</a></p>
</div>
</div>



<a name="WorkspaceFolder.uri"></a><span class="ts" id=1323 data-target="#details-1323" data-toggle="collapse"><span class="ident">uri</span><span>: </span><a class="type-ref" href="#Uri">Uri</a></span>
<div class="details collapse" id="details-1323">
<div class="comment"><p>The associated uri for this workspace folder.</p>
<p><em>Note:</em> The <a href="#Uri">Uri</a>-type was intentionally chosen such that future releases of the editor can support
workspace folders that are not stored on the local disk, e.g. <code>ftp://server/workspaces/foo</code>.</p>
</div>
</div>

### <a name="WorkspaceFolderPickOptions"></a><span class="code-item" id=483>WorkspaceFolderPickOptions</span>



<div class="comment"><p>Options to configure the behaviour of the <a href="#WorkspaceFolder">workspace folder</a> pick UI.</p>
</div>

#### Properties



<a name="WorkspaceFolderPickOptions.ignoreFocusOut"></a><span class="ts" id=485 data-target="#details-485" data-toggle="collapse"><span class="ident">ignoreFocusOut</span><span>?</span><span>: </span><a class="type-intrinsic">boolean</a></span>
<div class="details collapse" id="details-485">
<div class="comment"><p>Set to <code>true</code> to keep the picker open when focus moves to another part of the editor or to another window.</p>
</div>
</div>



<a name="WorkspaceFolderPickOptions.placeHolder"></a><span class="ts" id=484 data-target="#details-484" data-toggle="collapse"><span class="ident">placeHolder</span><span>?</span><span>: </span><a class="type-intrinsic">string</a></span>
<div class="details collapse" id="details-484">
<div class="comment"><p>An optional string to show as place holder in the input box to guide the user what to pick on.</p>
</div>
</div>

### <a name="WorkspaceFoldersChangeEvent"></a><span class="code-item" id=1319>WorkspaceFoldersChangeEvent</span>



<div class="comment"><p>An event describing a change to the set of <a href="#workspace.workspaceFolders">workspace folders</a>.</p>
</div>

#### Properties



<a name="WorkspaceFoldersChangeEvent.added"></a><span class="ts" id=1320 data-target="#details-1320" data-toggle="collapse"><span class="ident">added</span><span>: </span><a class="type-ref" href="#WorkspaceFolder">WorkspaceFolder</a>[]</span>
<div class="details collapse" id="details-1320">
<div class="comment"><p>Added workspace folders.</p>
</div>
</div>



<a name="WorkspaceFoldersChangeEvent.removed"></a><span class="ts" id=1321 data-target="#details-1321" data-toggle="collapse"><span class="ident">removed</span><span>: </span><a class="type-ref" href="#WorkspaceFolder">WorkspaceFolder</a>[]</span>
<div class="details collapse" id="details-1321">
<div class="comment"><p>Removed workspace folders.</p>
</div>
</div>

### <a name="WorkspaceSymbolProvider"></a><span class="code-item" id=669>WorkspaceSymbolProvider</span>



<div class="comment"><p>The workspace symbol provider interface defines the contract between extensions and
the <a href="https://code.visualstudio.com/docs/editor/editingevolved#_open-symbol-by-name">symbol search</a>-feature.</p>
</div>

#### Methods



<a name="WorkspaceSymbolProvider.provideWorkspaceSymbols"></a><span class="ts" id=671 data-target="#details-671" data-toggle="collapse"><span class="ident">provideWorkspaceSymbols</span><span>(</span><span class="ident">query</span><span>: </span><a class="type-intrinsic">string</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#SymbolInformation">SymbolInformation</a>[]&gt;</span>
<div class="details collapse" id="details-671">
<div class="comment"><p>Project-wide search for a symbol matching the given query string. It is up to the provider
how to search given the query string, like substring, indexOf etc. To improve performance implementors can
skip the <a href="#SymbolInformation.location">location</a> of symbols and implement <code>resolveWorkspaceSymbol</code> to do that
later.</p>
<p>The <code>query</code>-parameter should be interpreted in a <em>relaxed way</em> as the editor will apply its own highlighting
and scoring on the results. A good rule of thumb is to match case-insensitive and to simply check that the
characters of <em>query</em> appear in their order in a candidate symbol. Don&#39;t use prefix, substring, or similar
strict matching.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="query"></a><span class="ts" id=672 data-target="#details-672" data-toggle="collapse"><span class="ident">query</span><span>: </span><a class="type-intrinsic">string</a></span></td><td><div class="comment"><p>A non-empty query string.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=673 data-target="#details-673" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#SymbolInformation">SymbolInformation</a>[]&gt;</span></td><td><div class="comment"><p>An array of document highlights or a thenable that resolves to such. The lack of a result can be
signaled by returning <code>undefined</code>, <code>null</code>, or an empty array.</p>
</div></td></tr>
</table>
</div>
</div>



<a name="WorkspaceSymbolProvider.resolveWorkspaceSymbol"></a><span class="ts" id=675 data-target="#details-675" data-toggle="collapse"><span class="ident">resolveWorkspaceSymbol</span><span>(</span><span class="ident">symbol</span><span>: </span><a class="type-ref" href="#SymbolInformation">SymbolInformation</a>, <span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a><span>)</span><span>: </span><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#SymbolInformation">SymbolInformation</a>&gt;</span>
<div class="details collapse" id="details-675">
<div class="comment"><p>Given a symbol fill in its <a href="#SymbolInformation.location">location</a>. This method is called whenever a symbol
is selected in the UI. Providers can implement this method and return incomplete symbols from
<a href="#WorkspaceSymbolProvider.provideWorkspaceSymbols"><code>provideWorkspaceSymbols</code></a> which often helps to improve
performance.</p>
</div>
<div class="signature">
<table class="table table-bordered">
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td><a name="symbol"></a><span class="ts" id=676 data-target="#details-676" data-toggle="collapse"><span class="ident">symbol</span><span>: </span><a class="type-ref" href="#SymbolInformation">SymbolInformation</a></span></td><td><div class="comment"><p>The symbol that is to be resolved. Guaranteed to be an instance of an object returned from an
earlier call to <code>provideWorkspaceSymbols</code>.</p>
</div></td></tr>
<tr><td><a name="token"></a><span class="ts" id=677 data-target="#details-677" data-toggle="collapse"><span class="ident">token</span><span>: </span><a class="type-ref" href="#CancellationToken">CancellationToken</a></span></td><td><div class="comment"><p>A cancellation token.</p>
</div></td></tr>
<tr><th>Returns</th><th>Description</th></tr>
<tr><td><span class="ts"><a class="type-ref" href="#ProviderResult">ProviderResult</a>&lt;<a class="type-ref" href="#SymbolInformation">SymbolInformation</a>&gt;</span></td><td><div class="comment"><p>The resolved symbol or a thenable that resolves to that. When no result is returned,
the given <code>symbol</code> is used.</p>
</div></td></tr>
</table>
</div>
</div>

