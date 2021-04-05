import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { tap, first } from 'rxjs/operators';

import { YtVideoId } from './form-ytvideoid';
import { FormService } from './form.service';

import { getVideoId, extractVideoId } from './helpers/form-helpers';

@Component({
  selector: 'home-form',
  providers: [FormService],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  ytVideoIds: YtVideoId[] = [];
  youtubeForm;
  getVideoId = getVideoId;
  extractVideoId = extractVideoId;


  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService
  ) {
    this.youtubeForm = this.formBuilder.group({
      videoUrl: ['']
    });
    this.ytVideoIds = [];
  }
  ngOnInit() {}

  onSubmit(newYtUrl) {
    let stringYtUrl = newYtUrl.videoUrl;
    if(typeof stringYtUrl == 'string'){
      if(getVideoId(stringYtUrl) === "") {
        console.log("WRONG");
      }
      else {
        const videoId = extractVideoId(stringYtUrl);
        this.formService
        .addYtVideoId(videoId)
        .pipe(
          first(),
          tap(data => console.log({data}))
        )
        .subscribe(ytVideoId => this.ytVideoIds.push(ytVideoId));
        this.youtubeForm.reset();
      }
    }
    this.youtubeForm.reset();
  }

}
