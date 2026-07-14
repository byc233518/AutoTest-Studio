using System.Text.RegularExpressions;

namespace JmomRecorder.Core;

public static partial class RecorderInput
{
    [GeneratedRegex("^[A-HJ-NP-Z2-9]{8}$", RegexOptions.CultureInvariant)]
    private static partial Regex RecordCodePattern();

    public static string NormalizeCode(string? value)
    {
        var raw = new string((value ?? string.Empty)
            .ToUpperInvariant()
            .Where(char.IsLetterOrDigit)
            .ToArray());
        if (!RecordCodePattern().IsMatch(raw))
        {
            throw new ArgumentException("请输入 8 位录制码", nameof(value));
        }
        return $"{raw[..4]}-{raw[4..]}";
    }

    public static string NormalizePlatformUrl(string? value)
    {
        if (!Uri.TryCreate(value?.Trim(), UriKind.Absolute, out var uri)
            || (uri.Scheme != Uri.UriSchemeHttp && uri.Scheme != Uri.UriSchemeHttps)
            || !string.IsNullOrEmpty(uri.UserInfo))
        {
            throw new ArgumentException("平台地址必须是有效的 HTTP 或 HTTPS 地址", nameof(value));
        }
        return uri.AbsoluteUri.TrimEnd('/');
    }
}
