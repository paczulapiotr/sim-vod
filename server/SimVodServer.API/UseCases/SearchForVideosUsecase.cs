using System.Threading.Tasks;
using SimVodServer.API.Repositories;
using SimVodServer.API.Repositories.Models;
using SimVodServer.Common;

namespace SimVodServer.API.UseCases
{

    public class SearchForVideosUsecase
    {
        private readonly IVodRepository _vodRepository;

        public SearchForVideosUsecase(IVodRepository vodRepository)
        {
            _vodRepository = vodRepository;
        }

        public async Task<SearchResult<VodSearchDto>> RunAsync(string title, int page, int pageSize)
        {
            var data = await _vodRepository.GetVodsAsync(title, page, pageSize);
            var totalCount = await _vodRepository.GetVodsCountAsync(title);

            return new SearchResult<VodSearchDto>(data, totalCount);
        }
    }
}
