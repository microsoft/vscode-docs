# Profiling an app using Windows Machine Learning

Profiling is a tool designed to help developers and AI engineers to diagnose the CPU, GPU, NPU resource usages of process, ONNX model on different Execution Provider and Windows ML events.

## Prerequisites

- VS Code must be installed. Follow these steps to [set up VS Code](https://code.visualstudio.com/docs/setup/setup-overview).
- AI Toolkit extension must be installed. For more information, see [install AI Toolkit](/docs/intelligentapps/overview.md#install-and-setup).

## Start with "The next session"

In this mode, the profiling tool will profile the next newly start app that is sending out Windows ML events.
This option is ideal for testing a run-once app. In this case, you could start profiling and run the app and the resource usages will be shown up.

![Screenshot that shows how to start by the next session](./images/profiling/the-next-session.png)

> [!Important]
> To receive Windows ML events, the tool needs to be run in admin mode. If VS Code is not started in admin mode, a notification will show up and guide you to restart VS Code. You need to close all other VS Code instances to make the restart in admin mode work.
> ![Secreenshot that show a notification to restart VS Code in admin mode](./images/profiling/the-next-session-admin.png)

> [!NOTE]
> It will profile the next newly start app. For example for python notebook, if the kernel is already running, you need to click restart kernel to make it restart. If not, running new ipynb will not be captured.

## Start with "By Process ID or Name"

In this mode, the profiling tool will profile the process that matches one of the following:

- Process Id: like 12345
- Process Name: usually name of app without `.exe`. The first match will be profiled
- Process Path: like `c:\Users\xxx\Inference.Service.Agent.exe`. The first match will be profiled

This option is ideal for profiling an already running app.

![Screenshot that shows how to start by process id or name](./images/profiling/by-process-id-or-name.png)

## Start with "By Model File"

In this mode, the profiling tool will profile an ONNX model file for the duration on target Execution Provider and you could see the resources it used during running.

This option is ideal for profiling an ONNX model on different EPs.

![Screenshot that shows how to start by model file](./images/profiling/by-model-file.png)

After profiling, a report folder will be created with logs and data.

![Screenshot that show the report data](./images/profiling/by-model-file-result.png)

## Resource Usages View

In the main window, the plot on the top will show usage of CPU, GPU, NPU and Memory. The usage will be updated once per second and kept for 10 minutes. You could use the tools on the top right to navigate the timeline by zoom in, zoom out and pan.

![Screnshot that shows the resrouce usages view](./images/profiling/resource-usage-view.png)

> [!NOTE]
> This features use Performance Counters. To achieve higher accuracy, you could try [Windows Performance Recorder](https://learn.microsoft.com/en-us/windows-hardware/test/wpt/windows-performance-recorder).

## Windows ML Events View

In the main window, the plot on the bottom will show Windows ML events. Its timeline is synced with the resource usages view, so you could easily know how resource is used during certain events.

> [!Important]
> To receive Windows ML events, the tool needs to be run in admin mode. If VS Code is not started in admin mode, a notification will show up and guide you to restart VS Code. You need to close all other VS Code instances to make the restart in admin mode work.
> ![Secreenshot that show a notification to restart VS Code in admin mode](./images/profiling/events-view-admin.png)

Currently, we only show events of the following types:

- Ensure ExecutionProvider Ready: when Windows ML is preparing the EP
- Session Creation: when the session is created
- Inference: when the model inferences on the session

![Screenshot that shows the Windows ML events view](./images/profiling/events-view.png)

## What you learned

In this article, you learned how to:

- Start profiling in different ways
- Inspect the Resource Usages view
- Inspect the Windows ML Events view

## See also

- [How to measure performance of AI models running locally](https://learn.microsoft.com/en-us/windows/ai/npu-devices/#how-to-measure-performance-of-ai-models-running-locally-on-the-device-npu)
- [Performance Monitor](https://learn.microsoft.com/en-us/troubleshoot/windows-server/support-tools/troubleshoot-issues-performance-monitor)
- [ONNX Runtime Tracing](https://onnxruntime.ai/docs/performance/tune-performance/logging_tracing.html)
