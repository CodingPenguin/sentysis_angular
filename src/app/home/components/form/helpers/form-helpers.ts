
export function getVideoId(ytUrl) {
  const regExp = /(youtu(?:\.be|be\.com)\/(?:.*v(?:\/|=)|(?:.*\/)?)([\w'-]+))/i;
  if(!ytUrl.match(regExp)) {
    return false;
  }
  const videoId = extractVideoId(ytUrl);
  if(!videoId) {
    return false;
  }
  return videoId;
}

export function extractVideoId(ytUrl) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = ytUrl.match(regExp);
  if (!(match && match[7].length == 11)) {
    return false;
  }
  return match[7];
}
