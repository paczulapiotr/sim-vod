using System.Collections.Generic;

namespace SimVodServer.Common
{
    public class SearchResult<T>
    {
        public SearchResult(IEnumerable<T> data, int totalCount)
        {
            Data = data;
            TotalCount = totalCount;
        }

        public int TotalCount { get; set; }
        public IEnumerable<T> Data { get; set; }
    }
}
