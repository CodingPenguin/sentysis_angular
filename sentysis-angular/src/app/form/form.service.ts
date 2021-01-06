import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { YtUrl } from './form-url';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class FormService {
  ytUrls = 'http://www.sentysis-flask.herokuapp.com/api/ytUrls';
  constructor(
    private http: HttpClient,
  ) { }

  addYtUrl(ytUrl: YtUrl): Observable<YtUrl> {
    return this.http.post<YtUrl>(this.ytUrls, ytUrl, httpOptions);
  }
}
