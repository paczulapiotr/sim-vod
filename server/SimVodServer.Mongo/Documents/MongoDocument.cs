using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SimVodServer.Mongo.Documents
{
    public abstract class MongoDocument
    {
        [BsonId]
        public ObjectId Id { get; set; }

        public string IdString => Id.ToString();
    }
}
