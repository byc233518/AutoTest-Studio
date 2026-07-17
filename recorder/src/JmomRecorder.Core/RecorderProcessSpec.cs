namespace JmomRecorder.Core;

public sealed record RecorderProcessSpec(
    string FileName,
    string WorkingDirectory,
    IReadOnlyList<string> Arguments)
{
    public static RecorderProcessSpec Create(string portableRoot, string platformUrl, string recordCode)
    {
        return CreateForRunner(portableRoot, platformUrl, recordCode, "portable-record-runner.mjs");
    }

    public static RecorderProcessSpec CreateExecution(string portableRoot, string platformUrl, string executionCode)
    {
        return CreateForRunner(portableRoot, platformUrl, executionCode, "portable-execution-runner.mjs");
    }

    private static RecorderProcessSpec CreateForRunner(
        string portableRoot,
        string platformUrl,
        string operationCode,
        string runnerFile)
    {
        var root = Path.GetFullPath(portableRoot);
        return new RecorderProcessSpec(
            Path.Combine(root, "runtime", "node.exe"),
            root,
            new[]
            {
                Path.Combine(root, "app", runnerFile),
                "--platform",
                RecorderInput.NormalizePlatformUrl(platformUrl),
                "--code",
                RecorderInput.NormalizeCode(operationCode),
                "--root",
                root
            });
    }
}
