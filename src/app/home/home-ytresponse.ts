export class YtResponse {
  // title: string = '';
  comments: YtComment[] = [];
  statistics: {
    "avgLikesCount": number,
    "weightedMean": number,
    "weightedStdDev": number,
  };

  constructor(data: any) {

    if(!("comments" in data)) {
      throw new Error("No Comments!!!");
    }
    // if(!("title" in data)) {
    //   throw new Error("No TITLE!!!");
    // }
    if(!("statistics" in data)) {
      throw new Error("No STATISTICS!!!");
    }

    this.comments = data.comments.map(comment => new YtComment(comment));
    // this.title = data.title;
    this.statistics = data.statistics;
  }
}

export class YtComment {
  value: string = '';
  sentiment: number = 0;
  likes: number = 0;
  emoji: string = '';

  constructor(data: any) {

    const keys = Object.keys(this);
    keys.forEach((key: string) => {
      if (data[key] !== undefined) {
        (this as any)[key] = data[key];
      }
    });
  }
}