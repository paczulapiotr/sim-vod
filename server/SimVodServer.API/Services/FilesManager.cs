using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SimVodServer.API.Services
{
    public class FilesManager
    {
        private readonly string _folderPath;

        public FilesManager(string folderPath)
        {
            _folderPath = folderPath;
            Directory.CreateDirectory(folderPath); // ensure folder is created
        }

        public async Task<FileInfo> SaveAsync(Stream fileStream, string filename)
        {
            var filePath = Path.Combine(_folderPath, filename);

            using (var file = File.Create(filePath))
            {
                await fileStream.CopyToAsync(file);
                await file.FlushAsync();

                var createdFile = new FileInfo(file.Name);
                
                if(!createdFile.Exists)
                {
                    throw new Exception($"Could not create file {filename}");
                }

                return createdFile;
            }

        }

        public async Task<Stream> LoadAsync(string folder, string file)
        {
            string filePath = Path.Combine(_folderPath, folder, file);
            if (File.Exists(filePath))
                return await Task.FromResult(File.OpenRead(filePath));
            else
                return null;
        }

        public FileInfo GetFile(string fileName)
        {
            string filePath = Path.Combine(_folderPath, fileName);
            
            if (File.Exists(filePath))
                return new FileInfo(filePath);
            else
                return null;
        }

        public bool Exists(string fileName)
        {
            var files = Directory.GetFiles(_folderPath);

            return files.Any(file => file == fileName.ToString());
        }
    }
}
