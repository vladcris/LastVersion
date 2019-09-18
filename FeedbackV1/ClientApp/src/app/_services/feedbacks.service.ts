
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Feedback } from 'src/app/_models/feedback.model';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbacksService {


baseUrl = environment.apiUrl;

  requestSend = new Subject<boolean>();
  reloadMyFeedbacks = new Subject<void>();

constructor(private http: HttpClient) {}

getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.baseUrl + 'Feedbacks');
}

getMyFeedbacks(id, page?, itemsPerPage?): Observable<PaginatedResult<Feedback[]>> {
  const paginatedResult: PaginatedResult<Feedback[]> = new PaginatedResult<Feedback[]>();

  let params = new HttpParams();

  if (page !== null && itemsPerPage !== null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  return this.http.get<Feedback[]>(this.baseUrl + 'myfeedbacks/' + id, {observe: 'response', params})
  .pipe(
    map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
}

getFeedback(id: string): Observable<Feedback> {
  return this.http.get<Feedback>(this.baseUrl + 'Feedbacks/'  + id);
}

updateRequest(id: string, feedback: Feedback) {
  return this.http.put(this.baseUrl + 'feedbacks/' + id, feedback);
}

giveFeedback(form: any) {
  return this.http.post(this.baseUrl + 'feedbacks/', form) ;
}

 sendRequest1(form: any, id: string) {
    return this.http.post(this.baseUrl + 'feedbacks/' + id, form);
  }

 sendRequest2(form: any, id: string) {
    return this.http.post(this.baseUrl + 'myfeedbacks/' + id, form);
  }

  getFeedbackReceiver(id, page?, itemsPerPage?, userParams?): Observable<PaginatedResult<Feedback[]>> {
    const paginatedResult: PaginatedResult<Feedback[]> = new PaginatedResult<Feedback[]>();

    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

    if (userParams !== null ) {
      params = params.append('pending', userParams.pending);
  }

    return this.http.get<Feedback[]>(this.baseUrl + 'receiver/' + id, {observe: 'response', params})
  .pipe(
    map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
}

}




