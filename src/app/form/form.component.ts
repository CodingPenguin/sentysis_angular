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
  ngOnInit() {
  }

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

  // helper methods for onSubmit()
  verifyUrl(ytUrl) {
    if(ytUrl.includes('https://www.youtube.com/watch?v=') || ytUrl.includes('https://youtu.be/')) {
      console.log('IS YOUTUBE URL');
      this.videoId = this.sliceForVideoId(ytUrl);
      console.log('videoId -->', this.videoId);
      return true;
    }
    else {
      console.log("NOT YOUTUBE URL: " + ytUrl);
      return false;
    }
  }
  sliceForVideoId(ytUrl) {
    console.log ("SLICED");
    return ytUrl.slice(-11); // ex: getVideoId(https://www.youtube.com/watch?v=abcdefghijk) returns 'abcdefghijk'
  }
}
