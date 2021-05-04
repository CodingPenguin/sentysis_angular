import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { YtResponse, YtComment} from '../../home-ytresponse';

import { HomeService } from '../../home.service';

import { getVideoId } from './helpers/form-helpers';

@Component({
  selector: 'home-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {

  youtubeForm;
  comments: YtComment[] = [];
  weightedStandardDev;
  weightedMean;
  avgLikesCount;
  response = new BehaviorSubject<YtResponse | null>(null);
  isDisabled: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService,
  ) {
    this.youtubeForm = this.formBuilder.group({
      // TODO: Remove before deployment!!
      videoUrl: ['https://www.youtube.com/watch?v=Dn1m-XUO7As']
    });
  }
  ngOnInit() {}

  ngOnDestroy() {
    this.homeService.ngUnsubscribe.next();
    this.homeService.ngUnsubscribe.complete();
  }

  onSubmit(ytUrl): void {
    if (!ytUrl) {
      return;
    }

    if (!ytUrl.videoUrl) {
      return;
    }

    this.isDisabled = true;
    const newYtUrl = ytUrl.videoUrl;
    const videoId = getVideoId(newYtUrl);
    this.homeService.fetchComments(videoId, () => this.onComplete());
  }

  onComplete() {
    this.youtubeForm.reset()
    this.isDisabled = false;
  } 
}
