using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;
using SimVodServer.Common;

namespace SimVodServer.Mongo.Documents
{
    public class VodDocument : MongoDocument
    {
        public static string CollectionName = "vod";

        public VodDocument()
        {
        }

        public VodDocument(string guid, string title, long duration, int width, int height, IEnumerable<Resolution> resolutions)
        {
            Guid = guid;
            VideoTitle = title;
            Duration = duration;
            Width = width;
            Height = height;
            Resolutions = resolutions;
            UploadDateTime = DateTime.UtcNow;
        }

        public string Guid { get; set; }

        public string VideoTitle { get; set; }

        public int Width { get; set; }

        public int Height { get; set; }

        public long Duration { get; set; }
        
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime UploadDateTime { get; set; }

        public IEnumerable<Resolution> Resolutions { get; set; }
    }
}
