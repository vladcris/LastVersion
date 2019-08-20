import { Feedback } from './feedback.module';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EventEmitter } from '@angular/core';

@Injectable()
export class FeedbackService {
    feedbackSelected = new EventEmitter<Feedback>();
    feedback: Feedback;


constructor(private http: HttpClient) { }




 private feedbacks: Feedback[] = [
        new Feedback('0001', '1', 3, 4, 4, 3, '0008', '0004', true, 'Comment1'),
        new Feedback('0011', '1', 3, 3, 3, 3, '0008', '0022', true, 'Comment2'),
        new Feedback('0001', '1', 3, 4, 4, 3, '0008', '0004', true, 'Comment3  '),
        new Feedback('0011', '1', 3, 4, 4, 3, '0008', '0022', true, 'Comment5'),
        new Feedback('0011', '1', 3, 3, 3, 3, '0008', '0022', true, 'Comment6'),
        new Feedback('0001', '1', 3, 4, 4, 3, '0008', '0004', true, 'Comment7'),
        new Feedback('0011', '1', 3, 4, 4, 3, '0008', '0022', false, 'Comment8')
    ];


getFeedbacks() {
    return this.feedbacks.slice();
}

getFeedback(index: number) {
    return this.feedbacks[index];
}



getFeedbac() {
    return this.http.get('http://localhost:5000/api/feedbacks');
   }


// getFeedback(index: string) {
//     return this.http.get('http://localhost:5000/api/feedbacks/' + index);
//    }

// getFeedbackAng(angajatid: string) {
//     for (const feedback in this.feedbacks) {
//     if (this.feedback.id === angajatid) {
//     return this.feedback;
//     }
//     }
}



