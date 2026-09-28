using System.Text.Json;

namespace JmomRecorder.Core;

public sealed record RecorderOutputEvent(
    string Type,
    string Message,
    string? Stage,
    string? Code,
    bool Retryable)
{
    public static bool TryParse(string? line, out RecorderOutputEvent? outputEvent)
    {
        outputEvent = null;
        if (string.IsNullOrWhiteSpace(line)) return false;
        try
        {
            using var document = JsonDocument.Parse(line);
            var root = document.RootElement;
            if (!root.TryGetProperty("type", out var typeValue)
                || !root.TryGetProperty("message", out var messageValue))
            {
                return false;
            }
            var type = typeValue.GetString();
            var message = messageValue.GetString();
            if (string.IsNullOrWhiteSpace(type) || string.IsNullOrWhiteSpace(message)) return false;
            outputEvent = new RecorderOutputEvent(
                type,
                message,
                root.TryGetProperty("stage", out var stageValue) ? stageValue.GetString() : null,
                root.TryGetProperty("code", out var codeValue) ? codeValue.GetString() : null,
                root.TryGetProperty("retryable", out var retryValue) && retryValue.ValueKind == JsonValueKind.True);
            return true;
        }
        catch (JsonException)
        {
            return false;
        }
    }
}
