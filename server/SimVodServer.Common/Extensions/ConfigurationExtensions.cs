using System;
using Microsoft.Extensions.Configuration;

namespace SimVodServer
{
    public static class ConfigurationExtensions
    {
        public static string GetFfmpegPath(this IConfiguration conf)
            => Environment.GetEnvironmentVariable("FFMPEG_PATH") ?? conf["FFMPEG_PATH"];

        public static string GetFfprobe(this IConfiguration conf)
            => Environment.GetEnvironmentVariable("FFPROBE_PATH") ?? conf["FFPROBE_PATH"];

        public static string GetMongoPath(this IConfiguration conf)
            => Environment.GetEnvironmentVariable("MONGO_PATH") ?? conf["MONGO_PATH"];

        public static string GetMongoDbName(this IConfiguration conf)
            => Environment.GetEnvironmentVariable("MONGO_DB_NAME") ?? conf["MONGO_DB_NAME"];

        public static string GetVodFolderPath(this IConfiguration conf)
            => Environment.GetEnvironmentVariable("VOD_FOLDER_PATH") ?? conf["VOD_FOLDER_PATH"];

        public static string GetPreVodFolderPath(this IConfiguration conf)
            => Environment.GetEnvironmentVariable("PREVOD_FOLDER_PATH") ?? conf["PREVOD_FOLDER_PATH"];


    }
}
