using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimVodServer.API.UseCases;

namespace SimVodServer.API.Controllers
{
    [Route("api/[controller]")]
    public class VodController : Controller
    {
        private readonly SearchForVideosUsecase _searchForVideos;
        private readonly GetFileUsecase _getFile;
        private readonly UploadVideoUsecase _uploadVideo;

        public VodController(SearchForVideosUsecase searchForVideos,
            GetFileUsecase getFile,
            UploadVideoUsecase uploadVideo)
        {
            _searchForVideos = searchForVideos;
            _getFile = getFile;
            _uploadVideo = uploadVideo;
        }

        [HttpPost("[action]")]
        [RequestSizeLimit(1073741824)]
        public async Task<IActionResult> Upload(IFormFile file, string fileName)
        {
            using (var stream = file.OpenReadStream())
            {
                await _uploadVideo.RunAsync(stream, fileName ?? file.FileName);
            }

            return Ok();
        }

        [HttpGet("{folder}/{file}")]
        public async Task<IActionResult> GetFile(string folder, string file)
        {
            if (file == null)
            {
                return BadRequest(new { Error = "Given file does not exist" });
            }

            var fileStream = await _getFile.RunAsync(folder, file);

            return File(fileStream, "application/x-mpegURL");
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Search(string title, int page = 0, int pageSize = 10)
        {
            var toSkip = page * pageSize;
            var data = await _searchForVideos.RunAsync(title, toSkip, pageSize);

            return Ok(data);
        }
    }
}
