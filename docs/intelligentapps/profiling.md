---
ContentId: 8105f83b-8291-467e-abac-2344b4f368cd
DateApproved: 12/14/2025
MetaDescription: Profiling Quickstart in AI Toolkit.
---
# Profiling an app using Windows Machine Learning

Profiling is a tool designed to help developers and AI engineers to diagnose the CPU, GPU, NPU resource usages of processes, ONNX model on different execution providers, and Windows ML events.

In this article, you could learn how to start profiling and how to inspect the resource usages view and the events view.

## Prerequisites

- Install the latest version of [Visual Studio Code](/download).
- Install the AI Toolkit VS Code extension. For more information, see [install AI Toolkit](/docs/intelligentapps/overview.md#install-and-setup).

## Profile on app startup

In this mode, the profiling tool profiles the next app that is started and that is sending out Windows ML events.
This option is ideal for testing a run-once app. In this case, you start profiling, then run the app, and the resource usages will begin showing up.

![Screenshot that shows how to start by the next session](./images/profiling/the-next-session-guide.png)

The tool starts profiling a newly started app. This means that for profiling a Python notebook, if the kernel is already running, you need to restart the kernel to begin profiling for it. Just starting a new notebook does not automatically start profiling.

> [!IMPORTANT]
> To receive Windows ML events, the tool needs to be run in admin mode. If VS Code is not started in admin mode, a notification shows up and guides you to restart VS Code. You need to close all other VS Code instances to make the restart in admin mode work.
> ![Screenshot that shows a notification to restart VS Code in admin mode](./images/profiling/the-next-session-admin.png)


## Profile a running app

In this mode, the profiling tool starts profiling an already running app. You can select a process based on these criteria:

- Process ID: like 12345
- Process name: usually the name of app without `.exe`. The first match will be profiled.
- Process path: like `c:\Users\xxx\Inference.Service.Agent.exe`. The first match will be profiled.

This option is ideal for profiling an app that is already running and you're unable to restart it for profiling purposes.

![Screenshot that shows how to start by process id or name](./images/profiling/by-process-id-or-name.png)

## Profile an ONNX model

In this mode, the profiling tool starts profiling an ONNX model file on a target execution provider (EP) or device policy for a given duration. You can see the resource usage while it's running.

This option is ideal for profiling an ONNX model on different EPs or device policies.

![Screenshot that shows how to start by model file](./images/profiling/by-model-file-config.png)

After profiling, a notification shows up to guide you to open or save the report.

![Screenshot that shows the succeeded notification](./images/profiling/by-model-file-succeeded.png)

The report contains detailed profiling statistics and results for the ONNX model.

![Screenshot that shows the report data](./images/profiling/by-model-file-result.png)

## Resource Usages view

In the main window, the plot on the top shows usage of CPU, GPU, NPU, and memory. The usage is updated every second, and kept for 10 minutes. You can use the tools on the top right to navigate the timeline by zooming in, zooming out, and panning.

![Screenshot that shows the resource usages view](./images/profiling/resource-usage-view.png)

> [!NOTE]
> This feature uses performance counters. To achieve higher accuracy, you could also try [Windows Performance Recorder](https://learn.microsoft.com/en-us/windows-hardware/test/wpt/windows-performance-recorder).

## Windows ML Events view

In the main window, the plot on the bottom shows Windows ML events. Its timeline is synced with the Resource Usages view, so you can easily determine how resources are used when certain events occur.

> [!Important]
> To receive Windows ML events, the tool needs to be run in admin mode. If VS Code is not started in admin mode, a notification shows up and guides you to restart VS Code. You need to close all other VS Code instances to make the restart in admin mode work.
> ![Screenshot that shows a notification to restart VS Code in admin mode](./images/profiling/events-view-admin.png)

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
