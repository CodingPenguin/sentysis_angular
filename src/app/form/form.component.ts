import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { YtVideoId } from './form-ytvideoid';
import { FormService } from './form.service';

import { getVideoId, extractVideoId } from './helpers/form-helpers';

@Component({
  selector: 'app-form',
  providers: [FormService],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  ytVideoIds!: YtVideoId[];
  youtubeForm;
  getVideoId = getVideoId;
  extractVideoId = extractVideoId;


  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService
  ) {
    this.youtubeForm = this.formBuilder.group({
      videoUrl: ''
    });
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
        .subscribe(ytVideoId => this.ytVideoIds.push(ytVideoId));
        this.youtubeForm.reset();
      }
    }
    this.youtubeForm.reset();
  }


/*  getVideoId(ytUrl) {
    let regExp = /(youtu(?:\.be|be\.com)\/(?:.*v(?:\/|=)|(?:.*\/)?)([\w'-]+))/i;
    if(!ytUrl.match(regExp)) {
      alert("There was an error. Please make sure the URL is a YouTube URL.");
      return "";
    }
    this.videoId = this.extractVideoId(ytUrl);
    console.log("Verified and Extracted");
    return this.videoId;
  }

  extractVideoId(ytUrl) {
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/     /*;
    let match = ytUrl.match(regExp);
    if (match && match[7].length == 11) {
      console.log(match[7]);
      return match[7];
    }
    else {
      alert("Could not extract video ID.");
      return "";
    }
  }*/
}
