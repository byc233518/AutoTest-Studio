using System.Diagnostics;
using System.Text;
using JmomRecorder.Core;

namespace JmomRecorder.App;

public sealed class MainForm : Form
{
    private readonly string _portableRoot = Path.GetFullPath(AppContext.BaseDirectory);
    private readonly TextBox _platformText = new() { Dock = DockStyle.Fill };
    private readonly TextBox _codeText = new() { Dock = DockStyle.Fill, CharacterCasing = CharacterCasing.Upper };
    private readonly Button _startButton = new() { Text = "开始录制", AutoSize = true };
    private readonly Button _retryButton = new() { Text = "重试上传", AutoSize = true, Enabled = false };
    private readonly Button _openLogsButton = new() { Text = "打开日志目录", AutoSize = true };
    private readonly Label _statusLabel = new() { Text = "请输入平台地址和录制码", AutoSize = true };
    private readonly TextBox _logText = new()
    {
        Dock = DockStyle.Fill,
        Multiline = true,
        ReadOnly = true,
        ScrollBars = ScrollBars.Vertical,
        BackColor = SystemColors.Window
    };
    private readonly RecorderSettingsStore _settingsStore;
    private Process? _process;
    private string _logFilePath = string.Empty;

    public MainForm()
    {
        _settingsStore = new RecorderSettingsStore(_portableRoot);
        Text = "JMOM 本地录制器";
        StartPosition = FormStartPosition.CenterScreen;
        MinimumSize = new Size(680, 460);
        Size = new Size(760, 520);
        Font = new Font("Microsoft YaHei UI", 10F);
        BuildLayout();
        Shown += async (_, _) => await LoadSettingsAsync();
        FormClosing += OnFormClosing;
    }

    private void BuildLayout()
    {
        var layout = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            Padding = new Padding(20),
            ColumnCount = 2,
            RowCount = 6
        };
        layout.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));
        layout.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100));
        layout.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        layout.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        layout.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        layout.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        layout.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        layout.RowStyles.Add(new RowStyle(SizeType.Percent, 100));

        var title = new Label
        {
            Text = "JMOM 绿色免安装录制器",
            AutoSize = true,
            Font = new Font(Font, FontStyle.Bold)
        };
        layout.Controls.Add(title, 0, 0);
        layout.SetColumnSpan(title, 2);

        layout.Controls.Add(new Label { Text = "平台地址", AutoSize = true, Anchor = AnchorStyles.Left }, 0, 1);
        layout.Controls.Add(_platformText, 1, 1);
        layout.Controls.Add(new Label { Text = "录制码", AutoSize = true, Anchor = AnchorStyles.Left }, 0, 2);
        layout.Controls.Add(_codeText, 1, 2);

        var actions = new FlowLayoutPanel { Dock = DockStyle.Fill, AutoSize = true };
        actions.Controls.Add(_startButton);
        actions.Controls.Add(_retryButton);
        actions.Controls.Add(_openLogsButton);
        layout.Controls.Add(actions, 0, 3);
        layout.SetColumnSpan(actions, 2);

        layout.Controls.Add(_statusLabel, 0, 4);
        layout.SetColumnSpan(_statusLabel, 2);
        layout.Controls.Add(_logText, 0, 5);
        layout.SetColumnSpan(_logText, 2);

        Controls.Add(layout);
        AcceptButton = _startButton;
        _startButton.Click += async (_, _) => await StartRecordingAsync();
        _retryButton.Click += async (_, _) => await RetryUploadAsync();
        _openLogsButton.Click += (_, _) => OpenLogsDirectory();
    }

    private async Task LoadSettingsAsync()
    {
        var settings = await _settingsStore.LoadAsync();
        _platformText.Text = settings?.PlatformUrl ?? "http://localhost:3050";
        _codeText.Focus();
    }

    private async Task StartRecordingAsync()
    {
        if (_process is { HasExited: false }) return;
        RecorderProcessSpec spec;
        try
        {
            spec = RecorderProcessSpec.Create(_portableRoot, _platformText.Text, _codeText.Text);
            if (!File.Exists(spec.FileName)) throw new FileNotFoundException("录制器运行时不完整，请重新下载绿色包", spec.FileName);
            if (!File.Exists(spec.Arguments[0])) throw new FileNotFoundException("录制执行脚本不存在，请重新下载绿色包", spec.Arguments[0]);
            await _settingsStore.SaveAsync(new RecorderSettings(_platformText.Text));
        }
        catch (Exception error)
        {
            MessageBox.Show(this, error.Message, "无法开始录制", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            return;
        }

        PrepareLogFile();
        SetRunning(true);
        SetStatus("正在连接测试平台……");
        AppendLog("开始本地录制");

        var startInfo = new ProcessStartInfo
        {
            FileName = spec.FileName,
            WorkingDirectory = spec.WorkingDirectory,
            UseShellExecute = false,
            CreateNoWindow = true,
            RedirectStandardInput = true,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            StandardOutputEncoding = Encoding.UTF8,
            StandardErrorEncoding = Encoding.UTF8
        };
        foreach (var argument in spec.Arguments) startInfo.ArgumentList.Add(argument);

        _process = new Process { StartInfo = startInfo };
        try
        {
            _process.Start();
            var stdout = ReadOutputAsync(_process.StandardOutput);
            var stderr = ReadErrorAsync(_process.StandardError);
            await _process.WaitForExitAsync();
            await Task.WhenAll(stdout, stderr);
            if (_process.ExitCode != 0 && !_retryButton.Enabled)
            {
                SetStatus("录制未完成，请查看日志后重试");
            }
        }
        catch (Exception error)
        {
            SetStatus("录制器启动失败");
            AppendLog(error.Message);
            MessageBox.Show(this, error.Message, "录制失败", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
        finally
        {
            if (_process is null || _process.HasExited) SetRunning(false);
        }
    }

    private async Task ReadOutputAsync(StreamReader reader)
    {
        while (await reader.ReadLineAsync() is { } line)
        {
            if (!RecorderOutputEvent.TryParse(line, out var outputEvent) || outputEvent is null)
            {
                AppendLog(line);
                continue;
            }
            AppendLog(outputEvent.Message);
            SetStatus(outputEvent.Message);
            if (outputEvent.Type == "retryable") SetRetryEnabled(true);
            if (outputEvent.Type == "completed")
            {
                SetRetryEnabled(false);
                _codeText.BeginInvoke(() => _codeText.Clear());
            }
            if (outputEvent.Type == "error" && !outputEvent.Retryable)
            {
                SetRetryEnabled(false);
            }
        }
    }

    private async Task ReadErrorAsync(StreamReader reader)
    {
        while (await reader.ReadLineAsync() is { } line) AppendLog(line);
    }

    private async Task RetryUploadAsync()
    {
        if (_process is not { HasExited: false })
        {
            SetStatus("录制进程已经结束，请重新发起录制");
            SetRetryEnabled(false);
            return;
        }
        SetRetryEnabled(false);
        SetStatus("正在重试上传……");
        await _process.StandardInput.WriteLineAsync("retry");
        await _process.StandardInput.FlushAsync();
    }

    private void PrepareLogFile()
    {
        var logsDir = Path.Combine(_portableRoot, "data", "logs");
        Directory.CreateDirectory(logsDir);
        _logFilePath = Path.Combine(logsDir, $"recorder-{DateTime.Now:yyyyMMdd-HHmmss}.log");
        _logText.Clear();
    }

    private void AppendLog(string message)
    {
        if (InvokeRequired)
        {
            BeginInvoke(() => AppendLog(message));
            return;
        }
        var line = $"[{DateTime.Now:HH:mm:ss}] {message}";
        _logText.AppendText($"{line}{Environment.NewLine}");
        if (!string.IsNullOrEmpty(_logFilePath))
        {
            File.AppendAllText(_logFilePath, $"{line}{Environment.NewLine}", Encoding.UTF8);
        }
    }

    private void SetStatus(string message)
    {
        if (InvokeRequired)
        {
            BeginInvoke(() => SetStatus(message));
            return;
        }
        _statusLabel.Text = message;
    }

    private void SetRetryEnabled(bool enabled)
    {
        if (InvokeRequired)
        {
            BeginInvoke(() => SetRetryEnabled(enabled));
            return;
        }
        _retryButton.Enabled = enabled;
    }

    private void SetRunning(bool running)
    {
        if (InvokeRequired)
        {
            BeginInvoke(() => SetRunning(running));
            return;
        }
        _platformText.Enabled = !running;
        _codeText.Enabled = !running;
        _startButton.Enabled = !running;
        if (!running) _retryButton.Enabled = false;
    }

    private void OpenLogsDirectory()
    {
        var logsDir = Path.Combine(_portableRoot, "data", "logs");
        Directory.CreateDirectory(logsDir);
        Process.Start(new ProcessStartInfo("explorer.exe", logsDir) { UseShellExecute = true });
    }

    private void OnFormClosing(object? sender, FormClosingEventArgs eventArgs)
    {
        if (_process is not { HasExited: false }) return;
        var result = MessageBox.Show(
            this,
            "录制仍在进行，确定要取消并关闭吗？",
            "确认关闭",
            MessageBoxButtons.YesNo,
            MessageBoxIcon.Question);
        if (result != DialogResult.Yes)
        {
            eventArgs.Cancel = true;
            return;
        }
        try
        {
            _process.StandardInput.WriteLine("cancel");
            _process.Kill(entireProcessTree: true);
        }
        catch
        {
            // 进程可能已经在用户确认期间退出。
        }
    }
}
