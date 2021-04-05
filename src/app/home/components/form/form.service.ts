import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { YtVideoId } from './form-ytvideoid';

const URL = {
  'production': 'http://sentysis-flask.herokuapp.com/api/ytVideoIds',
  'local': 'http://127.0.0.1:5000/api/ytVideoIds' 
};

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class FormService {
  ytVideoIds = URL['local']
  constructor(
    private http: HttpClient,
  ) { }

  addYtVideoId(ytVideoId: YtVideoId): Observable<YtVideoId> {
    const ytVideoIdData = {
      "videoId": ytVideoId
    };
    console.log(ytVideoIdData);
    return this.http.post<YtVideoId>(this.ytVideoIds, ytVideoIdData, httpOptions);
  }
}
