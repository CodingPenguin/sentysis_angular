
export function getVideoId(ytUrl) {
  const regExp = /(youtu(?:\.be|be\.com)\/(?:.*v(?:\/|=)|(?:.*\/)?)([\w'-]+))/i;
  if(!ytUrl.match(regExp)) {
    throw new Error("There was an error. Please make sure the URL is a YouTube URL.");
  }
  const videoId = extractVideoId(ytUrl);
  console.log("Verified and Extracted");
  return videoId;
}

export function extractVideoId(ytUrl) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = ytUrl.match(regExp);
  if (!(match && match[7].length == 11)) {
    throw new Error("Could not extract video ID.");
  }
  return match[7];
}
