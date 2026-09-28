using JmomRecorder.Core;

namespace JmomRecorder.App;

internal static class Program
{
    [STAThread]
    private static void Main(string[] args)
    {
        ApplicationConfiguration.Initialize();
        RecorderLaunchRequest.TryParse(args.FirstOrDefault(), out var launchRequest);
        Application.Run(new MainForm(launchRequest));
    }
}
