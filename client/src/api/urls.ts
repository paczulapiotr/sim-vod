const playlistFileName = "playlist.m3u8";

const apiUrl = "http://localhost:5000";

export function vodUrl(vodGuid: string) {
  return `${apiUrl}/api/vod/${vodGuid}/${playlistFileName}`;
}

export function searchUrl(title: string, page: number, pageSize: number) {
  return `${apiUrl}/api/vod/search?title=${title}&page=${page}&pageSize=${pageSize}`;
}

export function uploadUrl(fileName: string) {
  return `${apiUrl}/api/vod/upload`;
}
