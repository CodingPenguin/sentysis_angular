import { Component, OnInit, OnChanges } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { first } from 'rxjs/operators';

import { HomeService } from '../../home.service';
import { YtResponse } from '../../home-ytresponse';
import { tap, map } from 'rxjs/operators';


@Component({
  selector: 'home-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  commentData: YtResponse;
  isShow: boolean = false;

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.homeService
        .commentData
        .subscribe(
          (data: YtResponse) => {
            this.commentData = data;
            this.isShow = true;
          }
        );
  }
}
