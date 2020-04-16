using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using SimVodServer.Common;

namespace SimVodServer.API.Services
{
    public class VideoConverter
    {
        private const string _playlistFileContent = @"#EXTM3U
#EXT-X-VERSION:3
#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360
360p.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=842x480
480p.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2800000,RESOLUTION=1280x720
720p.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=5000000,RESOLUTION=1920x1080
1080p.m3u8";

        private const string _ffmpegBaseArg = "-hide_banner -y -i {0} "; // {0} video src
        private readonly Dictionary<Resolution, string> _ffmpegResolutionArgs = new Dictionary<Resolution, string> {
            { Resolution.Res360p, $"-vf \"scale=640:360:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1\" -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod -b:v 800k -maxrate 856k -max_muxing_queue_size 9999 -bufsize 1200k -b:a 96k -hls_segment_filename {Path.Combine("{0}", "360p_%03d.ts")} {Path.Combine("{0}","360p.m3u8")} " }, // {0} folder dest for m3u8 file
            { Resolution.Res480p, $"-vf \"scale=842:480:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1\" -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod -b:v 1400k -maxrate 1498k -max_muxing_queue_size 9999 -bufsize 2100k -b:a 128k -hls_segment_filename {Path.Combine("{0}", "480p_%03d.ts")} {Path.Combine("{0}","480p.m3u8")} " }, // {0} folder dest for m3u8 file
            { Resolution.Res720p, $"-vf \"scale=1280:720:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1\" -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod -b:v 2800k -maxrate 2996k -max_muxing_queue_size 9999 -bufsize 4200k -b:a 128k -hls_segment_filename {Path.Combine("{0}", "720p_%03d.ts")} {Path.Combine("{0}","720p.m3u8")} " }, // {0} folder dest for m3u8 file
            { Resolution.Res1080p, $"-vf \"scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1\" -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod -b:v 5000k -maxrate 5350k -max_muxing_queue_size 9999 -bufsize 7500k -b:a 192k -hls_segment_filename {Path.Combine("{0}", "1080p_%03d.ts")} {Path.Combine("{0}","1080p.m3u8")} "} // {0} folder dest for m3u8 file
        };

        private readonly string _ffmpegPath;
        private readonly string _ffprobePath;
        private readonly string _outputPath;

        public VideoConverter(IConfiguration configuration)
        {
            
            _ffmpegPath = configuration.GetFfmpegPath();
            _ffprobePath = configuration.GetFfprobe();
            _outputPath = configuration.GetVodFolderPath();
        }

        private async Task CreatePlaylistFileAsync(string folder)
        {
            using (var file = File.CreateText(Path.Combine(folder, "playlist.m3u8")))
            {
                await file.WriteAsync(_playlistFileContent);

                await file.FlushAsync();
            }
        }

        private string CreateFfmpegArgumentsForResolutions(string src, string folderDest, IEnumerable<Resolution> resolutions)
        {
            if (resolutions.Count() == 0)
            {
                throw new Exception($"There were no resolutions supplied for processing file {src}");
            }

            var argBuilder = new StringBuilder();
            argBuilder.Append(string.Format(_ffmpegBaseArg, src));

            foreach (var res in resolutions)
            {
                argBuilder.Append(string.Format(_ffmpegResolutionArgs[res], folderDest));
            }

            return argBuilder.ToString().Trim();
        }

        private void Mp4ToHls(FileInfo file, string destFolder, IEnumerable<Resolution> resolutions)
        {
            var process = new Process();
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.CreateNoWindow = true;
            process.StartInfo.FileName = _ffmpegPath;
            process.StartInfo.Arguments = CreateFfmpegArgumentsForResolutions(file.FullName, destFolder, resolutions);
            process.Start();

            process.WaitForExit();
            if (process.ExitCode != 0)
            {
                throw new Exception($"Error while processing file: {file.Name}");
            }
            process.Kill();
        }

        public (long duration, int width, int height) GetVideoMetadata(FileInfo file)
        {
            var process = new Process();

            process.StartInfo.UseShellExecute = false;
            process.StartInfo.CreateNoWindow = true;
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.RedirectStandardError = true;
            process.StartInfo.FileName = _ffprobePath;
            process.StartInfo.Arguments = "-v error -select_streams v:0 -show_entries stream=width,height,duration -of default=noprint_wrappers=1 " + file.FullName;
            process.Start();
            var durationSteam = process.StandardOutput;
            var output = durationSteam.ReadToEnd();

            var errorsSteam = process.StandardError;
            var errors = errorsSteam.ReadToEnd();
            process.WaitForExit();

            if (!string.IsNullOrWhiteSpace(errors))
            {
                throw new Exception(errors);
            }

            var width = new Regex(@"width=(?<width>\d*)").Match(output).Groups["width"].Value;
            var height = new Regex(@"height=(?<height>\d*)").Match(output).Groups["height"].Value;
            var duration = new Regex(@"duration=(?<duration>\d*)").Match(output).Groups["duration"].Value;

            return (long.Parse(duration), int.Parse(width), int.Parse(height));
        }

        public async Task ProcessFileAsync(FileInfo file, IEnumerable<Resolution> resolutions)
        {
            var outputFolderPath = Path.Combine(_outputPath, file.Name);

            Directory.CreateDirectory(outputFolderPath);

            if (file.Exists)
            {
                await CreatePlaylistFileAsync(outputFolderPath);

                Mp4ToHls(file, outputFolderPath, resolutions);
            }
        }
    }
}
