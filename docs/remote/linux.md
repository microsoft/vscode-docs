---
Order: 7
Area: remote
TOCTitle: Linux Prerequisites
PageTitle: Linux Prerequisites for Visual Studio Code Remote Development
ContentId: 7ec8dedf-0659-437e-98f1-2d27f5e243eb
MetaDescription: Linux Prerequisites for VS Code Remote - SSH, Remote - Containers, and Remote - WSL
DateApproved: 6/5/2019
---
# Remote Development with Linux

Linux is a highly variable environment and the large number of server, container, and desktop distributions can make it difficult to know what is supported. Visual Studio Code Remote Development has prerequisites for the specific host / container / WSL distribution you will be connecting to.

If you are using a recent **64-bit x86** stable/LTS version of:

* **Ubuntu** (14.04+)
* **Debian** (8+)
* **CentOS / RHEL** (7+)

then the VS Code Remote Development extensions should work without additional dependencies.

However, if you are using a non-standard configuration or downstream distribution, you may run into issues. This document provides information on requirements as well as tips to help you get up and running even if your configuration is only community-supported.

Note that **other extensions may have dependencies** beyond those requirements listed here, so if you encounter an issue that only occurs with a particular extension, **contact the extension authors** for information on their native dependencies.

## Local Linux prerequisites

If you are running Linux locally, the [VS Code prerequisites](/docs/supporting/requirements.md) drive most of the requirements.

In addition, specific Remote Development extensions have further requirements:

* **Remote - SSH:** `ssh` needs to be in the path. The shell binary is typically in the `openssh-client` package.
* **Remote - Docker:** `docker` and `docker-compose` need to be in the path. Follow the [install instructions for your Linux distribution](https://docs.docker.com/install/#supported-platforms). (Note that the Ubuntu Snap package is not supported.)

## Remote host / container / WSL Linux prerequisites

**64-bit x86 glibc-based** Linux distributions are supported and most prerequisites are driven by the [Node.js](https://nodejs.org/en/docs/meta/topics/dependencies/) runtime (and by extension [V8](https://v8docs.nodesource.com)) shipped in the server component automatically installed on each remote endpoint.

| Distribution | Base Requirements | SSH Requirements | Notes |
|--------------|-------------------|------------------|-------|
| General |  kernel >= 3.10, glibc >=2.17, libstdc++ >= 3.4.18, Python 2.6 or 2.7, tar | OpenSSH server, `bash`, and `curl` or `wget` | Run `ldd --version` to check the glibc version. Run `strings /usr/lib64/libstdc++.so.6 | grep GLIBCXX` to see if libstdc++ 3.4.18 is available. `musl` is not currently supported.|
| Ubuntu 14.04+, Debian 8+, and downstream distributions | `libc6 libstdc++6 python-minimal ca-certificates tar` | `openssh-server bash` and `curl` or `wget` | Requires kernel >= 3.10, glibc >= 2.17, libstdc++ >= 3.4.18. Debian < 8 and Ubuntu < 14.04 do not meet this requirement.  |
| RHEL / CentOS 7+ | `glibc libgcc libstdc++ python ca-certificates tar` | `openssh-server bash` and `curl` or `wget` |   Requires kernel >= 3.10, glibc >= 2.17, libstdc++ >= 3.4.18.  RHEL / CentOS < 7 does not meet this requirement without using a [workaround to upgrade](#updating-glibc-and-libstdc-on-rhel-centos-6). |

## Tips by Linux distribution

The following is a list of distributions and any base requirements that may be missing. End-of-life versions of distributions are not included.

| Server Distribution | Docker Image | Missing libraries | Additional steps |
|---------------------|--------------|-------------------|------------------|
| ❌ Alpine Linux (64-bit) | `alpine:latest` | Not glibc based. |  |
| ✅ CentOS 7 Server (64-bit) | `centos:7` | &lt;none&gt; | &lt;none&gt; |
| ⚠️ CentOS 6 Server (64-bit) | `centos:6` | `glibc` >= 2.17, `libstdc++` >= 3.4.18 | [Requires a workaround](#updating-glibc-and-libstdc-on-rhel-centos-6). |
| ✅ Debian 9 Server (64-bit) | `debian:9` | &lt;none&gt; | &lt;none&gt; |
| ✅ Debian 8 Server (64-bit) | `debian:8` | &lt;none&gt; | &lt;none&gt; |
| ✅ openSUSE Leap Server 15 (64-bit) |   `opensuse/leap:15` | Docker image is missing `tar`. |  &lt;none&gt; |
| ✅ openSUSE Leap Server 42.3 (64-bit) |  `opensuse/leap:42.3` | Docker image is missing `tar`. |  &lt;none&gt; |
| ✅ Oracle Linux 7 (64-bit) | `oraclelinux:7` | &lt;none&gt; | &lt;none&gt; |
| ⚠️ Oracle Linux 6 (64-bit) | `oraclelinux:6` | `glibc` >= 2.17, `libstdc++` >= 3.4.18. Docker image is missing `tar`. |  [Requires a workaround](#updating-glibc-and-libstdc-on-rhel-centos-6). |
| ✅ RedHat Enterprise Linux 7 (64-bit) |  | &lt;none&gt; | &lt;none&gt; |
| ⚠️ RedHat Enterprise Linux 6 (64-bit) |  | `glibc` >= 2.17, `libstdc++` >= 3.4.18 | [Requires a workaround](#updating-glibc-and-libstdc-on-rhel-centos-6). |
| ✅ SUSE Linux Enterprise Server 15 (64-bit) |  |  &lt;none&gt; |  &lt;none&gt; |
| ✅ SUSE Linux Enterprise Server 12 (64-bit) |  |  &lt;none&gt; |  &lt;none&gt; |
| ❌ SUSE Linux Enterprise Server 11 (64-bit) |  |  `glibc` >= 2.17, `libstdc++` >= 3.4.18 | Might work compiling glibc from source, but untested. |
| ✅ Ubuntu Server 19.04 (64-bit) | `ubuntu:19.04` | &lt;none&gt;  | &lt;none&gt; |
| ✅ Ubuntu Server 18.04 (64-bit) | `ubuntu:18.04` | &lt;none&gt;  | &lt;none&gt; |
| ✅ Ubuntu Server 16.04 (64-bit) | `ubuntu:16.04` | &lt;none&gt;  | &lt;none&gt; |
| ✅ Ubuntu Server 14.04 (64-bit) | `ubuntu:14.04` | &lt;none&gt;  | &lt;none&gt; |

## Updating glibc and libstdc++ on RHEL / CentOS 6

RHEL / CentOS 6 ships with glibc 2.12 and libstdc++ 3.4.13 that does not meet the requirements for the server installed on the remote host. RHEL / CentOS 6 goes out of support [in 2020](https://endoflife.software/operating-systems/linux/centos), so we strongly recommend **upgrading to RHEL / CentOS 7** or higher.

However, as a workaround, you can either build glibc manually or use the following script to install updated binaries. The bash script below will upgrade these libraries without having to build them. It is adapted from information in [this article](https://serverkurma.com/linux/how-to-update-glibc-newer-version-on-centos-6-x/), [this gist](https://gist.github.com/harv/f86690fcad94f655906ee9e37c85b174), and this [Fedora copr project](https://copr.fedorainfracloud.org/coprs/mosquito/myrepo-el6/). The article also includes instructions for manually building glibc if you would prefer not to use the binaries from the article.

Do not run this script on anything mission critical **without a rollback strategy** since it does update libraries that other applications depend on.

For servers, run the following script and restart the server so the updates take effect.

```bash
# Update glibc and static libs
wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-2.17-55.el6.x86_64.rpm
wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-common-2.17-55.el6.x86_64.rpm
wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-devel-2.17-55.el6.x86_64.rpm
wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-headers-2.17-55.el6.x86_64.rpm
wget https://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-utils-2.17-55.el6.x86_64.rpm
wget https://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-static-2.17-55.el6.x86_64.rpm
sudo rpm -Uh --force --nodeps \
    glibc-2.17-55.el6.x86_64.rpm \
    glibc-common-2.17-55.el6.x86_64.rpm \
    glibc-devel-2.17-55.el6.x86_64.rpm \
    glibc-headers-2.17-55.el6.x86_64.rpm \
    glibc-static-2.17-55.el6.x86_64.rpm \
    glibc-utils-2.17-55.el6.x86_64.rpm

# Update libstdc++
wget https://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/gcc-4.8.2-16.3.fc20/libstdc++-4.8.2-16.3.el6.x86_64.rpm
wget  https://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/gcc-4.8.2-16.3.fc20/libstdc++-devel-4.8.2-16.3.el6.x86_64.rpm
wget https://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/gcc-4.8.2-16.3.fc20/libstdc++-static-4.8.2-16.3.el6.x86_64.rpm
sudo rpm -Uh \
    libstdc++-4.8.2-16.3.el6.x86_64.rpm \
    libstdc++-devel-4.8.2-16.3.el6.x86_64.rpm \
    libstdc++-static-4.8.2-16.3.el6.x86_64.rpm
```

In a container environment, you can add similar contents to a Dockerfile:

```Dockerfile
FROM centos:6

RUN yum -y install wget tar

# Update glibc
RUN wget -q http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-2.17-55.el6.x86_64.rpm \
    && wget -q http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-common-2.17-55.el6.x86_64.rpm \
    && wget -q http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-devel-2.17-55.el6.x86_64.rpm \
    && wget -q http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-headers-2.17-55.el6.x86_64.rpm \
    && wget -q https://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-utils-2.17-55.el6.x86_64.rpm \
    && wget -q https://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-static-2.17-55.el6.x86_64.rpm \
    && rpm -Uh --force --nodeps \
        glibc-2.17-55.el6.x86_64.rpm \
        glibc-common-2.17-55.el6.x86_64.rpm \
        glibc-devel-2.17-55.el6.x86_64.rpm \
        glibc-headers-2.17-55.el6.x86_64.rpm \
        glibc-static-2.17-55.el6.x86_64.rpm \
        glibc-utils-2.17-55.el6.x86_64.rpm \
    && rm *.rpm

# Update libstdc++
RUN  wget -q https://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/gcc-4.8.2-16.3.fc20/libstdc++-4.8.2-16.3.el6.x86_64.rpm \
    && wget -q https://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/gcc-4.8.2-16.3.fc20/libstdc++-devel-4.8.2-16.3.el6.x86_64.rpm \
    && wget -q https://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/gcc-4.8.2-16.3.fc20/libstdc++-static-4.8.2-16.3.el6.x86_64.rpm \
    && rpm -Uh \
        libstdc++-4.8.2-16.3.el6.x86_64.rpm \
        libstdc++-devel-4.8.2-16.3.el6.x86_64.rpm \
        libstdc++-static-4.8.2-16.3.el6.x86_64.rpm \
    && rm *.rpm

# Set the default shell to bash instead of sh
ENV SHELL /bin/bash
```

## Questions or feedback

* See [Tips and Tricks](/docs/remote/troubleshooting.md#containers-tips) or the [FAQ](/docs/remote/faq.md).
* Search on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode-remote).
* Add a [feature request](https://aka.ms/vscode-remote/feature-requests) or [report a problem](https://aka.ms/vscode-remote/issues/new).
* Create a [development container definition](https://aka.ms/vscode-dev-containers) for others to use.
* Contribute to [our documentation](https://github.com/Microsoft/vscode-docs) or [VS Code itself](https://github.com/Microsoft/vscode).
* See our [CONTRIBUTING](https://aka.ms/vscode-remote/contributing) guide for details.
