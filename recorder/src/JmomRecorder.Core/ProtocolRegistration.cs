using Microsoft.Win32;
using System.Runtime.Versioning;

namespace JmomRecorder.Core;

public sealed record ProtocolRegistrationSpec(string RootKeyPath, string Command);

public static class ProtocolRegistration
{
    private const string RootKeyPath = @"Software\Classes\jmom-recorder";

    public static ProtocolRegistrationSpec CreateSpec(string executablePath)
    {
        var fullPath = Path.GetFullPath(executablePath);
        return new ProtocolRegistrationSpec(RootKeyPath, $"\"{fullPath}\" \"%1\"");
    }

    [SupportedOSPlatform("windows")]
    public static void EnableForCurrentUser(string executablePath)
    {
        var spec = CreateSpec(executablePath);
        using var protocolKey = Registry.CurrentUser.CreateSubKey(spec.RootKeyPath, writable: true)
            ?? throw new InvalidOperationException("无法写入当前用户的协议注册表");
        protocolKey.SetValue(null, "URL:JMOM Recorder Protocol");
        protocolKey.SetValue("URL Protocol", string.Empty);
        using var commandKey = protocolKey.CreateSubKey(@"shell\open\command", writable: true)
            ?? throw new InvalidOperationException("无法写入桌面启动命令");
        commandKey.SetValue(null, spec.Command);
    }
}
