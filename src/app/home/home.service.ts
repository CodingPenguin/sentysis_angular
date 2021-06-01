import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription, of, Subject } from 'rxjs';
import { first, map, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { YtResponse } from './home-ytresponse';

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
export class HomeService {
  commentData = new Subject();
  ngUnsubscribe = new Subject();

  constructor(
    private http: HttpClient,
  ) {}

  private onCatchErr(err: HttpErrorResponse): Observable<any> {
    console.error(err);
    return of(err);
  }

  fetchComments(ytVideoId: string, callback: Function): Subscription {
    const payload: {'videoId': string} = { "videoId": ytVideoId };
    const apiUrl = URL['production'];

    return this.http.post<YtResponse>(apiUrl, payload, httpOptions)
        .pipe(
            takeUntil(this.ngUnsubscribe),
            first(),            
            map((data: YtResponse) => new YtResponse(data)),
            tap((data: YtResponse) => console.info(`GET call to Youtube: `, data))
        ).subscribe(
            (data: YtResponse) => this.commentData.next(data),
            (err: HttpErrorResponse) => this.onCatchErr(err),
            () => { callback(), document.getElementById('loader').style.display = 'none';}
        );
  }
}
