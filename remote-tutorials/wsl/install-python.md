---
Order: 4
Area: wsl
TOCTitle: Install Python
PageTitle: Install Python tools
MetaDescription: Install Python tools into Windows Subsystem for Linux
DateApproved: 6/10/2020
---
# Python development

If you don't have Python already installed, run the following commands to install Python3 and pip, the package manager for Python, into your Linux installation.

```bash
sudo apt update
sudo apt install python3 python3-pip
```

And to verify, run:

```bash
python3 --version
```

Start with the canonical "Hello World" app. Create a new folder called "helloWorld" and then add a Python file that will print a message when run:

```bash
mkdir helloWorld && cd helloWorld
echo 'print("hello from python on ubuntu on windows!")' >> hello.py
python3 hello.py
```

In a remote Linux environment (this WSL distro is technically another machine without UI, that just happens to be running locally on your computer), your development tools and experiences are pretty limited.  You can run [Vim](https://stackoverflow.blog/2017/05/23/stack-overflow-helping-one-million-developers-exit-vim/) in the terminal to edit your file or you can edit the sources on the Windows side through the `\\wsl$` mount:

![\\wsl$ mount](images/wsl/wsl$-mount.png)

The problem with this model is that the Python runtime, pip, or any conda packages for that matter, are not installed on Windows.

![no Python on Windows](images/wsl/no-python-on-windows.png)

Remember, Python is installed in the Linux distro, which means if you're editing Python files on the Windows side, you can't run or debug them unless you install the same Python development stack on Windows. And that defeats the purpose of having an isolated Linux instance set up with all your Python tools and runtimes!

----

<a class="tutorial-next-btn" href="/remote-tutorials/wsl/run-in-wsl">I've installed Python</a> <a class="tutorial-feedback-btn" onclick="reportIssue('remote-tutorials-wsl', 'install-python')" href="javascript:void(0)">I ran into an issue</a>
