using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using SimVodServer.API.Services;

namespace SimVodServer.API.UseCases
{
    public class GetFileUsecase
    {
        public FilesManager _vodFilesManager { get; set; }

        public GetFileUsecase(IConfiguration configuration)
        {
            _vodFilesManager = new FilesManager(configuration.GetVodFolderPath());
        }

        public Task<Stream> RunAsync(string folder, string file)
        {
            return _vodFilesManager.LoadAsync(folder, file);
        }
    }
}
