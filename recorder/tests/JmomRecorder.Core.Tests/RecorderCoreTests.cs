using JmomRecorder.Core;

namespace JmomRecorder.Core.Tests;

[TestClass]
public sealed class RecorderCoreTests
{
    [TestMethod]
    public void NormalizeCode_AcceptsSpacesAndLowerCase()
    {
        Assert.AreEqual("7K3P-W9QM", RecorderInput.NormalizeCode("7k3p w9qm"));
    }

    [TestMethod]
    public void NormalizeCode_RejectsWrongLengthOrAmbiguousCharacters()
    {
        Assert.ThrowsExactly<ArgumentException>(() => RecorderInput.NormalizeCode("123"));
        Assert.ThrowsExactly<ArgumentException>(() => RecorderInput.NormalizeCode("OI01-ABCD"));
    }

    [TestMethod]
    public void NormalizePlatformUrl_RemovesTrailingSlash()
    {
        Assert.AreEqual("http://host:3050", RecorderInput.NormalizePlatformUrl("http://host:3050/"));
    }

    [TestMethod]
    public void NormalizePlatformUrl_RejectsUnsupportedSchemesAndCredentials()
    {
        Assert.ThrowsExactly<ArgumentException>(() => RecorderInput.NormalizePlatformUrl("file:///tmp"));
        Assert.ThrowsExactly<ArgumentException>(() => RecorderInput.NormalizePlatformUrl("http://user:pass@host:3050"));
    }

    [TestMethod]
    public void ProcessSpec_UsesPathsRelativeToPortableRoot()
    {
        var spec = RecorderProcessSpec.Create(@"D:\JMOM录制器", "http://host:3050/", "7k3p w9qm");

        Assert.IsTrue(spec.FileName.EndsWith(@"runtime\node.exe", StringComparison.OrdinalIgnoreCase));
        Assert.AreEqual(Path.GetFullPath(@"D:\JMOM录制器"), spec.WorkingDirectory);
        CollectionAssert.Contains(spec.Arguments.ToList(), Path.Combine(spec.WorkingDirectory, "app", "portable-record-runner.mjs"));
        CollectionAssert.Contains(spec.Arguments.ToList(), "http://host:3050");
        CollectionAssert.Contains(spec.Arguments.ToList(), "7K3P-W9QM");
    }

    [TestMethod]
    public void ExecutionProcessSpec_UsesPortableExecutionRunner()
    {
        var spec = RecorderProcessSpec.CreateExecution(@"D:\JMOM录制器", "http://host:3050/", "7k3p w9qm");

        CollectionAssert.Contains(spec.Arguments.ToList(), Path.Combine(spec.WorkingDirectory, "app", "portable-execution-runner.mjs"));
        CollectionAssert.Contains(spec.Arguments.ToList(), "7K3P-W9QM");
    }

    [TestMethod]
    public void LaunchRequest_ParsesRecordAndExecuteUris()
    {
        var executeRequest = RecorderLaunchRequest.Parse("jmom-recorder://execute?platform=http%3A%2F%2Fhost%3A3050&code=7K3P-W9QM");
        Assert.AreEqual(RecorderLaunchMode.Execute, executeRequest.Mode);
        Assert.AreEqual("http://host:3050", executeRequest.PlatformUrl);
        Assert.AreEqual("7K3P-W9QM", executeRequest.Code);

        var recordRequest = RecorderLaunchRequest.Parse("jmom-recorder://record?platform=http%3A%2F%2Fhost%3A3050%2F&code=7k3p%20w9qm");
        Assert.AreEqual(RecorderLaunchMode.Record, recordRequest.Mode);
        Assert.AreEqual("http://host:3050", recordRequest.PlatformUrl);
        Assert.AreEqual("7K3P-W9QM", recordRequest.Code);
    }

    [TestMethod]
    public void LaunchRequest_TryParseRejectsInvalidCommandLineUri()
    {
        Assert.IsFalse(RecorderLaunchRequest.TryParse("https://host:3050", out var wrongScheme));
        Assert.IsNull(wrongScheme);
        Assert.IsFalse(RecorderLaunchRequest.TryParse("jmom-recorder://delete?platform=http://host:3050&code=7K3P-W9QM", out var wrongMode));
        Assert.IsNull(wrongMode);
    }

    [TestMethod]
    public void LaunchRequest_RejectsExtraFieldsAndNonOriginPlatform()
    {
        Assert.ThrowsExactly<ArgumentException>(() => RecorderLaunchRequest.Parse(
            "jmom-recorder://execute?platform=https%3A%2F%2Fhost%2Fprivate%3Ftoken%3Dsecret&code=7K3P-W9QM"));
        Assert.ThrowsExactly<ArgumentException>(() => RecorderLaunchRequest.Parse(
            "jmom-recorder://execute?platform=https%3A%2F%2Fhost&code=7K3P-W9QM&script=secret"));
        Assert.ThrowsExactly<ArgumentException>(() => RecorderLaunchRequest.Parse(
            "jmom-recorder://execute/path?platform=https%3A%2F%2Fhost&code=7K3P-W9QM"));
    }

    [TestMethod]
    public void ProtocolRegistration_UsesCurrentUserAndQuotedExecutable()
    {
        var spec = ProtocolRegistration.CreateSpec(@"D:\JMOM录制器\JMOM录制器.exe");

        Assert.AreEqual(@"Software\Classes\jmom-recorder", spec.RootKeyPath);
        Assert.AreEqual("\"D:\\JMOM录制器\\JMOM录制器.exe\" \"%1\"", spec.Command);
    }

    [TestMethod]
    public async Task SettingsStore_RoundTripsPlatformUrl()
    {
        var root = Path.Combine(Path.GetTempPath(), $"jmom-recorder-{Guid.NewGuid():N}");
        try
        {
            var store = new RecorderSettingsStore(root);
            await store.SaveAsync(new RecorderSettings("http://host:3050/"));

            var loaded = await store.LoadAsync();

            Assert.IsNotNull(loaded);
            Assert.AreEqual("http://host:3050", loaded.PlatformUrl);
            Assert.IsTrue(File.Exists(Path.Combine(root, "data", "config.json")));
        }
        finally
        {
            if (Directory.Exists(root)) Directory.Delete(root, true);
        }
    }

    [TestMethod]
    public void OutputEvent_ParsesStatusWithoutExposingUnknownFields()
    {
        const string line = "{\"type\":\"error\",\"stage\":\"uploading\",\"code\":\"UPLOAD_FAILED\",\"message\":\"上传失败\",\"retryable\":true,\"token\":\"secret\"}";

        var parsed = RecorderOutputEvent.TryParse(line, out var outputEvent);

        Assert.IsTrue(parsed);
        Assert.IsNotNull(outputEvent);
        Assert.AreEqual("error", outputEvent.Type);
        Assert.AreEqual("UPLOAD_FAILED", outputEvent.Code);
        Assert.AreEqual("上传失败", outputEvent.Message);
        Assert.IsTrue(outputEvent.Retryable);
        Assert.IsFalse(outputEvent.GetType().GetProperties().Any(property => property.Name.Contains("Token", StringComparison.OrdinalIgnoreCase)));
    }

    [TestMethod]
    public void OutputEvent_RejectsNonJsonLines()
    {
        Assert.IsFalse(RecorderOutputEvent.TryParse("playwright output", out var outputEvent));
        Assert.IsNull(outputEvent);
    }
}
