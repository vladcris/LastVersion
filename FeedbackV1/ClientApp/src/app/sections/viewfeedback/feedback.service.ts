import { Feedback } from './feedback.module';

import { EventEmitter } from '@angular/core';

export class FeedbackService{
    feedbackSelected = new EventEmitter<Feedback>();

 private feedbacks: Feedback[] = [
        new Feedback('0001', '1', 3,4, 4, 3, '0008','0004',true,'Comment1'),
        new Feedback('0011', '1', 3,3, 3, 3, '0008','0022',true,'Comment2'),
        new Feedback('0001', '1', 3,4, 4, 3, '0008','0004',true,'Comment  sdbafiadsf ksadbnfbndid'),
        new Feedback('0011', '1', 3,4, 4, 3, '0008','0022',true,'Comment4'),
        new Feedback('0011', '1', 3,3, 3, 3, '0008','0022',true,'Comment2'),
        new Feedback('0001', '1', 3,4, 4, 3, '0008','0004',true,'Comment  sdbafiadsf ksadbnfbndid'),
        new Feedback('0011', '1', 3,4, 4, 3, '0008','0022',true,'Comment4')
    ];


getFeedbacks() {
    return this.feedbacks.slice();
}

getFeedback(index: number){
    return this.feedbacks[index];
}


}