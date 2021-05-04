import { Component, OnInit, OnChanges } from '@angular/core';

import { HomeService } from '../../home.service';
import { YtResponse, YtComment } from '../../home-ytresponse';

const processComments = (data: YtResponse) => {
  const dividingInt = 0;
  const positives = [];
  const negatives = [];
  

  for (let comment of data.comments) {
    if (comment.sentiment >= dividingInt) {
      positives.push(comment)
    }

    if (comment.sentiment < dividingInt) {
      negatives.unshift(comment);
    }
  }

  return {
    "positives": positives,
    "negatives": negatives,
  }
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
            this.negativeComments = processComments(data)["negatives"]; 
            this.positiveComments = processComments(data)["positives"]; 
          }
        );

  }
}
