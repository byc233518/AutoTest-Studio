using System.Text.Json;

namespace JmomRecorder.Core;

public sealed record RecorderSettings(string PlatformUrl);

public sealed class RecorderSettingsStore
{
    private static readonly JsonSerializerOptions JsonOptions = new() { WriteIndented = true };
    private readonly string _filePath;

    public RecorderSettingsStore(string portableRoot)
    {
        _filePath = Path.Combine(Path.GetFullPath(portableRoot), "data", "config.json");
    }

    public async Task<RecorderSettings?> LoadAsync(CancellationToken cancellationToken = default)
    {
        if (!File.Exists(_filePath)) return null;
        try
        {
            await using var stream = File.OpenRead(_filePath);
            return await JsonSerializer.DeserializeAsync<RecorderSettings>(stream, JsonOptions, cancellationToken);
        }
        catch (JsonException)
        {
            return null;
        }
    }

    public async Task SaveAsync(RecorderSettings settings, CancellationToken cancellationToken = default)
    {
        var normalized = settings with {
            PlatformUrl = RecorderInput.NormalizePlatformUrl(settings.PlatformUrl)
        };
        Directory.CreateDirectory(Path.GetDirectoryName(_filePath)!);
        await using var stream = File.Create(_filePath);
        await JsonSerializer.SerializeAsync(stream, normalized, JsonOptions, cancellationToken);
    }
}
