import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { YtUrl } from './form-url';
import { FormService } from './form.service';

@Component({
  selector: 'app-form',
  providers: [FormService],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  ytUrls!: YtUrl[];
  youtubeForm;
  videoId = '';


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
    if(typeof newYtUrl.videoUrl == 'string'){
      let stringYtUrl = newYtUrl.videoUrl;
      if(this.verifyUrl(stringYtUrl)) {
        console.log('GANGSTA');
        this.formService
        .addYtUrl(newYtUrl)
        .subscribe(ytUrl => this.ytUrls.push(ytUrl));

      }
      else {
        console.log('WRONG');
      }
      this.youtubeForm.reset();
    }
    this.youtubeForm.reset();
  }

  // helper methods

  verifyUrl(ytUrl) {
    let regExp = /(youtu(?:\.be|be\.com)\/(?:.*v(?:\/|=)|(?:.*\/)?)([\w'-]+))/i;
    if(ytUrl.match(regExp)) {
      this.videoId = this.extractVideoId(ytUrl);
      console.log("VIDEO ID EXTRACTED, VIDEO ID -->", this.videoId);
      console.log("Verified and Extracted");
      return true;
    }
    else {
      alert("There was an error. Please make sure the URL is a YouTube URL.");
      return;
    }
  }

  extractVideoId(ytUrl) {
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    let match = ytUrl.match(regExp);
    if (match && match[7].length == 11) {
      console.log(match[7]);
      return match[7];
    }
    else {
      alert("Could not extract video ID.");
      return;
    }
  }
}
