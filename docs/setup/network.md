---
Order: 6
Area: setup
TOCTitle: Network
ContentId: 84F36EDE-4D66-4A2E-B4D1-F020C73EB2AD
PageTitle: Setup Visual Studio Code's Network Connection
DateApproved: 3/30/2023
MetaDescription: Setup VS Code's Network Connection.
---
# Network Connections in Visual Studio Code

Visual Studio Code is built on top of [Electron](https://www.electronjs.org) and benefits from all the networking stack capabilities of [Chromium](https://www.chromium.org/). This also means that VS Code users get much of the networking support available in [Google Chrome](https://www.google.com/chrome/index.html).

## Common hostnames

A handful of features within VS Code require network communication to work, such as the auto-update mechanism, querying and installing extensions, and telemetry. For these features to work properly in a proxy environment, you must have the product correctly configured.

If you are behind a firewall that needs to allow specific domains used by VS Code, here's the list of hostnames you should allow communication to go through:

* `update.code.visualstudio.com` - Visual Studio Code download and update server
* `code.visualstudio.com` - Visual Studio Code documentation
* `go.microsoft.com` - Microsoft link forwarding service
* `vscode.blob.core.windows.net` - Visual Studio Code blob storage, used for remote server
* `marketplace.visualstudio.com` - Visual Studio Marketplace
* `*.gallery.vsassets.io` - Visual Studio Marketplace
* `*.gallerycdn.vsassets.io` - Visual Studio Marketplace
* `rink.hockeyapp.net` - Crash reporting service
* `bingsettingssearch.trafficmanager.net` - In-product settings search
* `vscode.search.windows.net` - In-product settings search
* `raw.githubusercontent.com` - GitHub repository raw file access
* `vsmarketplacebadges.dev` - Visual Studio Marketplace badge service
* `az764295.vo.msecnd.net` - Visual Studio Code download CDN
* `download.visualstudio.microsoft.com` - Visual Studio download server, provides dependencies for some VS Code extensions (C++, C#)
* `vscode-sync.trafficmanager.net` - Visual Studio Code Settings Sync service
* `vscode-sync-insiders.trafficmanager.net` - Visual Studio Code Settings Sync service (Insiders)
* `vscode.dev` - Used when logging in with GitHub or Microsoft for an extension or Settings Sync
* `default.exp-tas.com` - Visual Studio Code Experiment Service, used to provide experimental user experiences

## Proxy server support

VS Code has exactly the same proxy server support as Google Chromium. Here's a snippet from [Chromium's documentation](https://www.chromium.org/developers/design-documents/network-settings):

```
"The Chromium network stack uses the system network settings so that users and administrators can control the network settings of all applications easily. The network settings include:

 - proxy settings
 - SSL/TLS settings
 - certificate revocation check settings
 - certificate and private key stores"
```

This means that your proxy settings should be picked up automatically.

Otherwise, you can use the following command-line arguments to control your proxy settings:

```bash
# Disable proxy
--no-proxy-server

# Manual proxy address
--proxy-server=<scheme>=<uri>[:<port>][;...] | <uri>[:<port>] | "direct://"

# Manual PAC address
--proxy-pac-url=<pac-file-url>

# Disable proxy per host
--proxy-bypass-list=(<trailing_domain>|<ip-address>)[:<port>][;...]
```

To learn more about these command-line arguments, see [Chromium Network Settings](https://www.chromium.org/developers/design-documents/network-settings).

### Authenticated proxies

Authenticated proxies should work seamlessly within VS Code with the addition of [PR #22369](https://github.com/microsoft/vscode/pull/22369).

The authentication methods supported are:

* Basic
* Digest
* NTLM
* Negotiate

When using VS Code behind an authenticated HTTP proxy, the following authentication popup should appear:

![proxy](images/network/proxy.png)

Note that SOCKS5 proxy authentication support isn't implemented yet; you can follow the [issue in Chromium's issue tracker](https://bugs.chromium.org/p/chromium/issues/detail?id=256785).

See [Chromium HTTP authentication](https://www.chromium.org/developers/design-documents/http-authentication) to read more about HTTP proxy authentication within VS Code.

### SSL certificates

Often HTTPS proxies rewrite SSL certificates of the incoming requests. Chromium was designed to reject responses which are signed by certificates which it doesn't trust. If you hit any SSL trust issues, there are a few options available for you:

* Since Chromium uses the OS's certificate trust infrastructure, the preferred option is to add your proxy's certificate to your OS's trust chain. See the [Chromium Root Certificate Policy](https://www.chromium.org/Home/chromium-security/root-ca-policy) documentation to learn more.
* If your proxy runs in `localhost`, you can always try the [--allow-insecure-localhost](https://peter.sh/experiments/chromium-command-line-switches/#allow-insecure-localhost) command-line flag.
* If all else fails, you can tell VS Code to ignore all certificate errors using the [--ignore-certificate-errors](https://peter.sh/experiments/chromium-command-line-switches/#ignore-certificate-errors) command-line flag. **Warning:** This is **dangerous** and **not recommended**, since it opens the door to security issues.

## Legacy proxy server support

Extensions don't benefit yet from the same proxy support that VS Code supports. You can follow this issue's development in [GitHub](https://github.com/microsoft/vscode/issues/12588).

Similarly to extensions, a few other VS Code features don't yet fully support proxy networking, namely the CLI interface. The CLI interface is what you get when running `code --install-extension vscodevim.vim` from a command prompt or terminal. You can follow this issue's development in [GitHub](https://github.com/microsoft/vscode/issues/29910).

Due to both of these constraints, the `http.proxy`, `http.proxyStrictSSL` and `http.proxyAuthorization` variables are still part of VS Code's settings, yet they are only respected in these two scenarios.

## Troubleshooting

Here are some helpful links that might help you troubleshoot networking issues in VS Code:

* [Network Settings](https://www.chromium.org/developers/design-documents/network-settings)
* [Debugging problems with the network proxy](https://www.chromium.org/developers/design-documents/network-stack/debugging-net-proxy)
* [Configuring a SOCKS proxy server in Chrome](https://www.chromium.org/developers/design-documents/network-stack/socks-proxy)
* [Proxy settings and fallback (Windows)](https://www.chromium.org/developers/design-documents/network-stack/proxy-settings-fallback)
