import { Component, OnInit, OnChanges } from '@angular/core';

import { HomeService } from '../../home.service';
import { YtResponse, YtComment } from '../../home-ytresponse';

const fetchPositives = (data: YtResponse) => {
  const positives = [];
  for(let c of data.comments) {
    if(c.sentiment >= 0) {
      positives.push(c);
    }
  }
  return positives;
}

const fetchNegatives = (data: YtResponse) => {
  const negatives = [];
  for(let c of data.comments) {
    if(c.sentiment < 0) {
      negatives.unshift(c);
    }
  }
  return negatives;
}


@Component({
  selector: 'home-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit {
  commentData: YtResponse;
  isShow: boolean = false;
  negativeComments: YtComment[];
  positiveComments: YtComment[];
  avgLikesCount: number;
  weightedMean: number;
  weightedStdDev: number;

  constructor(
    private homeService: HomeService
  ) { }


  ngOnInit() {
    this.homeService
        .commentData
        .subscribe(
          (data: YtResponse) => {
            this.commentData = new YtResponse(data);
            this.isShow = true;
            this.negativeComments = fetchNegatives(data); 
            this.positiveComments = fetchPositives(data);
            this.avgLikesCount = this.commentData['statistics']['avg_likes_count'];
            this.weightedMean = this.commentData['statistics']['weighted_mean'];
            this.weightedStdDev = this.commentData['statistics']['weighted_std_dev'];
          }
        );

  }
}
