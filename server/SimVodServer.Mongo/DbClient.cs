using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using SimVodServer.Mongo.Documents;

namespace SimVodServer.Mongo
{
    public class DbClient
    {
        private readonly string _dbName;
        private readonly IConfiguration _configuration;

        public DbClient(IConfiguration configuration)
        {
            _configuration = configuration;
            _dbName = configuration.GetMongoDbName();
        }

        public async Task EnsureCollectionsCreated()
        {
            var database = GetDb();
            var collection = database.GetCollection<VodDocument>(VodDocument.CollectionName);
            if (collection == null)
            {
                await database.CreateCollectionAsync(VodDocument.CollectionName);
            }
        }

        protected IMongoDatabase GetDb()
        {
            var client = new MongoDB.Driver.MongoClient(_configuration.GetMongoPath());
            var database = client.GetDatabase(_dbName);

            return database;
        }

        public async Task<string> AddVodAsync(VodDocument vod)
        {
            var db = GetDb();

            var collection = db.GetCollection<VodDocument>(VodDocument.CollectionName);

            await collection.InsertOneAsync(vod);

            return vod.IdString;
        }


        public async Task<int> CountDocuments(string title)
        {
            var lowercaseFileName = title?.ToLower();
            var db = GetDb();
            var collection = db.GetCollection<VodDocument>(VodDocument.CollectionName);
            return (int)await (string.IsNullOrWhiteSpace(title) 
                ? collection.Find(_ => true)
                : collection.Find(f => f.VideoTitle.ToLower().Contains(lowercaseFileName)))
                .CountDocumentsAsync();
        }

        public async IAsyncEnumerable<VodDocument> GetDocumentsAsync(string title, int skip, int take)
        {
            var lowercaseFileName = title?.ToLower();
            var db = GetDb();
            var collection = db.GetCollection<VodDocument>(VodDocument.CollectionName);
            var documentsCursor = await (string.IsNullOrWhiteSpace(title)
                ? collection.Find(_ => true)
                : collection.Find(f => f.VideoTitle.ToLower().Contains(lowercaseFileName)))
                .SortBy(f => f.VideoTitle)
                .Skip(skip)
                .ToCursorAsync();

            int counter = take;

            while (await documentsCursor.MoveNextAsync())
            {
                foreach (var doc in documentsCursor.Current)
                {
                    if (counter == 0)
                        yield break;
                    --counter;

                    yield return doc;
                }
            }
        }
    }
}
