using System.Collections.Generic;
using System.Threading.Tasks;
using SimVodServer.API.Repositories.Models;
using SimVodServer.Common;

namespace SimVodServer.API.Repositories
{
    public interface IVodRepository
    {
        Task<IEnumerable<VodSearchDto>> GetVodsAsync(string title, int take, int skip);

        Task<int> GetVodsCountAsync(string title);

        Task AddVodAsync(string guid, string videoTitle, long duration, int width, int height, IEnumerable<Resolution> resolutions);
    }
}
