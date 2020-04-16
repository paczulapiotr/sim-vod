using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SimVodServer.API.Repositories.Models;
using SimVodServer.Common;
using SimVodServer.Mongo;
using SimVodServer.Mongo.Documents;

namespace SimVodServer.API.Repositories
{
    public class VodRepository : IVodRepository
    {
        private readonly DbClient _db;

        public VodRepository(DbClient db)
        {
            _db = db;
        }

        public async Task AddVodAsync(string guid, string videoTitle, long duration, int width, int height, IEnumerable<Resolution> resolutions)
        {
            await _db.AddVodAsync(new VodDocument(guid, videoTitle, duration, width, height, resolutions));
        }

        public async Task<IEnumerable<VodSearchDto>> GetVodsAsync(string title, int skip, int take)
        {
            var dto = new List<VodSearchDto>();

            await foreach (var vod in _db.GetDocumentsAsync(title, skip, take))
            {
                dto.Add(new VodSearchDto(vod.VideoTitle, vod.Guid, vod.Duration, vod.UploadDateTime));    
            }

            return dto;
        }

        public Task<int> GetVodsCountAsync(string title)
        {
            return _db.CountDocuments(title);
        }
    }
}
