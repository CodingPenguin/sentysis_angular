
export function getVideoId(ytUrl) {
  let regExp = /(youtu(?:\.be|be\.com)\/(?:.*v(?:\/|=)|(?:.*\/)?)([\w'-]+))/i;
  if(!ytUrl.match(regExp)) {
    alert("There was an error. Please make sure the URL is a YouTube URL.");
    return "";
  }
  const videoId = extractVideoId(ytUrl);
  console.log("Verified and Extracted");
  return videoId;
}

export function extractVideoId(ytUrl) {
  let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  let match = ytUrl.match(regExp);
  if (match && match[7].length == 11) {
    return match[7];
  }
  else {
    alert("Could not extract video ID.");
    return "";
  }
}

export function hello() {
  return "Hello";
}
