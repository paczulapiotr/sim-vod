using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using SimVodServer.API.Repositories;
using SimVodServer.API.Services;
using SimVodServer.Common;

namespace SimVodServer.API.UseCases
{

    public class UploadVideoUsecase
    {
        private readonly VideoConverter _videoConverter;
        private readonly FilesManager _preVodFilesManager;
        private readonly IVodRepository _vodRepository;

        public UploadVideoUsecase(IConfiguration configuration, VideoConverter videoConverter, IVodRepository vodRepository)
        {
            _preVodFilesManager = new FilesManager(configuration.GetPreVodFolderPath());
            _videoConverter = videoConverter;
            _vodRepository = vodRepository;
        }

        public async Task RunAsync(Stream fileStream, string videoTitle)
        {
            var guid = CreateFileGuid();

            var file = await StorePreprocessingFileAsync(fileStream, guid);

            var (duration, width, height) = GetFileInfo(file);

            var resolutions = GetAvailableResolutions(width, height);

            await ProcessFileAsync(guid, resolutions);

            await AddVodToDbAsync(guid, videoTitle, duration, width, height, resolutions);

        }

        private async Task ProcessFileAsync(Guid guid, IEnumerable<Resolution> resolutions)
        {
            var file = _preVodFilesManager.GetFile(guid.ToString());

            await _videoConverter.ProcessFileAsync(file, resolutions);
        }

        private async Task AddVodToDbAsync(Guid guid, string videoTitle, long duration, int width, int height, IEnumerable<Resolution> resolutions)
        {
            await _vodRepository.AddVodAsync(guid.ToString(), videoTitle, duration, width, height, resolutions);
        }

        private IEnumerable<Resolution> GetAvailableResolutions(int width, int height)
        {
            return new[] { Resolution.Res360p, Resolution.Res480p, Resolution.Res720p, Resolution.Res1080p }; // TODO
        }

        private (long duration, int width, int height) GetFileInfo(FileInfo file)
        {
            return _videoConverter.GetVideoMetadata(file);
        }

        private async Task<FileInfo> StorePreprocessingFileAsync(Stream fileStream, Guid guid)
        {
            return await _preVodFilesManager.SaveAsync(fileStream, guid.ToString());
        }

        private Guid CreateFileGuid()
        {
            Guid guid;

            do
            {
                guid = Guid.NewGuid();
            }
            while (IsGuidTaken(guid));

            return guid;
        }

        private bool IsGuidTaken(Guid guid)
        {
            return _preVodFilesManager.Exists(guid.ToString());
        }
    }
}
