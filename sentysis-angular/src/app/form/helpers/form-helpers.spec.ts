import { getVideoId } from './form-helpers';

describe("TEST getVideoId()", function() {
  // Each spec details which YouTube URL will work.

  it("https://www.youtube.com/watch?v=abcdefghijk should work (Default link)", function() {
    let videoId = getVideoId("https://www.youtube.com/watch?v=abcdefghijk");
    expect(videoId).toBe("abcdefghijk");
  });

  it("http://www.youtube.com/watch?v=abcdefghijk should work (Default link, http:// instead of https://)", function() {
    let videoId = getVideoId("http://www.youtube.com/watch?v=abcdefghijk");
    expect(videoId).toBe("abcdefghijk");
  });

  it("https://www.youtu.be/abcdefghijk should work (youtu.be format instead of youtube.com)", function() {
    let videoId = getVideoId("https://youtu.be/abcdefghijk");
    expect(videoId).toBe("abcdefghijk");
  });

  it("http://www.youtu.be/abcdefghijk should work (youtu.be format instead of youtube.com, http:// instead of https://)", function() {
    let videoId = getVideoId("http://youtu.be/abcdefghijk");
    expect(videoId).toBe("abcdefghijk");
  });

  it("www.youtube.com/watch?v=abcdefghijk should work (No https://)", function() {
    let videoId = getVideoId("www.youtube.com/watch?v=abcdefghijk");
    expect(videoId).toBe("abcdefghijk");
  });

  it("https://youtube.com/watch?v=abcdefghijk should work (No www.)", function() {
    let videoId = getVideoId("https://youtube.com/watch?v=abcdefghijk");
    expect(videoId).toBe("abcdefghijk");
  });

  it("http://youtube.com/watch?v=abcdefghijk should work (No www., http:// instead of https://)", function() {
    let videoId = getVideoId("http://youtube.com/watch?v=abcdefghijk");
    expect(videoId).toBe("abcdefghijk");
  });

  it("youtube.com/watch?v=abcdefghijk should work (No https://www.)", function() {
    let videoId = getVideoId("youtube.com/watch?v=abcdefghijk");
    expect(videoId).toBe("abcdefghijk");
  });

  it("https://www.youtube.com/watch?v=abcdefghijk&t=34s should work (Additional query parameters after YT Video ID in URL)", function() {
    let videoId = getVideoId("https://www.youtube.com/watch?v=abcdefghijk&t=34s");
    expect(videoId).toBe("abcdefghijk");
  });

  it("https://www.youtube.com/watch?v=abcdefghijk&t=34s should work (Additional query parameters after YT Video ID in URL, http:// instead of https://)", function() {
    let videoId = getVideoId("http://www.youtube.com/watch?v=abcdefghijk&t=34s");
    expect(videoId).toBe("abcdefghijk");
  });

});

/*
Currently Unsupported YouTube URLS:
  https://www.youtube.com/watch/abcdefghijk
  https://www.youtube.com/v/abcdefghijk
*/
