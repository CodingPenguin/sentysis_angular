export class YtResponse {
  title: string = '';
  comments: YtComments[] = [];
  avgLikesCount: number = 0;
  weightedMean: number = 0;
  weightedStdDev: number = 0;

  constructor(data: any) {

    const keys = Object.keys(this);
    keys.forEach((key: string) => {
      if (data[key] !== undefined) {
        (this as any)[key] = data[key];
      }
    });
    
    // these fields did not auto-assign so i did it manually
    this.avgLikesCount = data.statistics["avg_likes_count"]; 
    this.weightedMean = data.statistics["weighted_mean"];
    this.weightedStdDev = data.statistics["weighted_std_dev"];
  }
}

export class YtComments {
  value: string = '';
  sentiment: number = 0;
  likes: number = 0;

  constructor(data: any) {

    const keys = Object.keys(this);
    keys.forEach((key: string) => {
      if (data[key] !== undefined) {
        (this as any)[key] = data[key];
      }
    });
  }
}