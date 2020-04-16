using System;

namespace SimVodServer.API.Repositories.Models
{
    public class VodSearchDto
    {
        public VodSearchDto(string videoTitle, string videoGuid, long duration, DateTime uploadDateTime)
        {
            VideoTitle = videoTitle;
            VideoGuid = videoGuid;
            Duration = duration;
            UploadDateTime = uploadDateTime;
        }

        public string VideoTitle { get; set; }
        public string VideoGuid { get; set; }
        public long Duration { get; set; }
        public DateTime UploadDateTime { get; set; }
    }
}
