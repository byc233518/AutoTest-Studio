namespace JmomRecorder.Core;

public sealed record RecorderProcessSpec(
    string FileName,
    string WorkingDirectory,
    IReadOnlyList<string> Arguments)
{
    public static RecorderProcessSpec Create(string portableRoot, string platformUrl, string recordCode)
    {
        var root = Path.GetFullPath(portableRoot);
        return new RecorderProcessSpec(
            Path.Combine(root, "runtime", "node.exe"),
            root,
            new[]
            {
                Path.Combine(root, "app", "portable-record-runner.mjs"),
                "--platform",
                RecorderInput.NormalizePlatformUrl(platformUrl),
                "--code",
                RecorderInput.NormalizeCode(recordCode),
                "--root",
                root
            });
    }
}
