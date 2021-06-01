import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BehaviorSubject } from 'rxjs';
import { YtResponse, YtComment} from '../../home-ytresponse';

import { HomeService } from '../../home.service';

import { getVideoId } from './helpers/form-helpers';

/* MODAL CODE */

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
        <h4 class="modal-title">There was an error :(</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <p>Please enter a valid YouTube URL.</p>
    </div>
    <!--<div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>-->
  `,
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

/* END MODAL CODE */

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
    private modalService: NgbModal,
  ) {
    this.youtubeForm = this.formBuilder.group({
      videoUrl: ['']
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.homeService.ngUnsubscribe.next();
    this.homeService.ngUnsubscribe.complete();
  }

  onSubmit(ytUrl): void {
    if (!ytUrl) {
      document.getElementById('loader').style.display = 'none';
      this.modalService.open(NgbdModalContent);
      this.youtubeForm.reset();
      return;
    }

    if (!ytUrl.videoUrl) {
      document.getElementById('loader').style.display = 'none';
      this.modalService.open(NgbdModalContent);
      this.youtubeForm.reset();
      return;
    }

    this.isDisabled = true;
    document.getElementById('loader').style.display = 'block';
    const newYtUrl = ytUrl.videoUrl;
    const videoId = getVideoId(newYtUrl);

    if(!videoId) {
      document.getElementById('loader').style.display = 'none';
      this.isDisabled = false;
      this.modalService.open(NgbdModalContent);
      this.youtubeForm.reset();
      return;
    }

    this.homeService.fetchComments(videoId, () => this.onComplete());
  }

  onComplete() {
    this.youtubeForm.reset()
    this.isDisabled = false;
    document.getElementById('loader').style.display = 'none';
  } 
}
