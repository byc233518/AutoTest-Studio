namespace JmomRecorder.Core;

public enum RecorderLaunchMode
{
    Record,
    Execute
}

public sealed record RecorderLaunchRequest(
    RecorderLaunchMode Mode,
    string PlatformUrl,
    string Code)
{
    public static RecorderLaunchRequest Parse(string value)
    {
        if (!Uri.TryCreate(value, UriKind.Absolute, out var uri)
            || (!string.Equals(uri.Scheme, "autotest-recorder", StringComparison.OrdinalIgnoreCase)
                && !string.Equals(uri.Scheme, "jmom-recorder", StringComparison.OrdinalIgnoreCase)))
        {
            throw new ArgumentException("启动地址无效", nameof(value));
        }
        if (!string.IsNullOrEmpty(uri.UserInfo)
            || uri.Port != -1
            || (!string.IsNullOrEmpty(uri.AbsolutePath) && uri.AbsolutePath != "/")
            || !string.IsNullOrEmpty(uri.Fragment))
        {
            throw new ArgumentException("启动地址格式无效", nameof(value));
        }

        var mode = uri.Host.ToLowerInvariant() switch
        {
            "record" => RecorderLaunchMode.Record,
            "execute" => RecorderLaunchMode.Execute,
            _ => throw new ArgumentException("启动模式无效", nameof(value))
        };
        var query = ParseQuery(uri.Query);
        return new RecorderLaunchRequest(
            mode,
            NormalizePlatformOrigin(query["platform"]),
            RecorderInput.NormalizeCode(query["code"]));
    }

    public static bool TryParse(string? value, out RecorderLaunchRequest? request)
    {
        request = null;
        if (string.IsNullOrWhiteSpace(value)) return false;
        try
        {
            request = Parse(value);
            return true;
        }
        catch (Exception error) when (error is ArgumentException or FormatException)
        {
            return false;
        }
    }

    private static string NormalizePlatformOrigin(string? value)
    {
        var normalized = RecorderInput.NormalizePlatformUrl(value);
        if (!Uri.TryCreate(normalized, UriKind.Absolute, out var uri)
            || !string.IsNullOrEmpty(uri.UserInfo)
            || !string.IsNullOrEmpty(uri.Query)
            || !string.IsNullOrEmpty(uri.Fragment)
            || (!string.IsNullOrEmpty(uri.AbsolutePath) && uri.AbsolutePath != "/"))
        {
            throw new ArgumentException("平台地址必须是 origin", nameof(value));
        }
        return uri.GetLeftPart(UriPartial.Authority).TrimEnd('/');
    }

    private static Dictionary<string, string> ParseQuery(string query)
    {
        var values = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        foreach (var part in query.TrimStart('?').Split('&', StringSplitOptions.RemoveEmptyEntries))
        {
            var separator = part.IndexOf('=');
            var key = Uri.UnescapeDataString(separator >= 0 ? part[..separator] : part);
            var value = Uri.UnescapeDataString(separator >= 0 ? part[(separator + 1)..] : string.Empty);
            if (!string.Equals(key, "platform", StringComparison.Ordinal)
                && !string.Equals(key, "code", StringComparison.Ordinal))
            {
                throw new ArgumentException("启动参数包含不支持的字段", nameof(query));
            }
            if (!values.TryAdd(key, value))
            {
                throw new ArgumentException("启动参数不能重复", nameof(query));
            }
        }
        if (values.Count != 2) throw new ArgumentException("启动参数缺少平台地址或操作码", nameof(query));
        return values;
    }
}
