
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from 'src/app/_models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbacksService {


baseUrl = environment.apiUrl;

constructor(private http: HttpClient) {}

getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.baseUrl + 'Feedbacks');
}

getFeedback(id: string): Observable<Feedback> {
  return this.http.get<Feedback>(this.baseUrl + 'Feedbacks/' + id);
}

updateRequest(id: string, feedback: Feedback) {
  return this.http.put(this.baseUrl + 'feedbacks/' + id, feedback);
}


}

