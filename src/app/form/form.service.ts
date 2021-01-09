import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { YtVideoId } from './form-ytvideoid';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class FormService {
  ytVideoIds = 'sentysis-flask.herokuapp.com/api/ytVideoIds';
  constructor(
    private http: HttpClient,
  ) { }

  addYtVideoId(ytVideoId: YtVideoId): Observable<YtVideoId> {
    return this.http.post<YtVideoId>(this.ytVideoIds, ytVideoId, httpOptions);
  }
}
