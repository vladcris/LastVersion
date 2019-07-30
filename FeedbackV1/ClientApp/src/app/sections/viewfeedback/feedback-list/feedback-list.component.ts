import { Component, OnInit } from '@angular/core';
import { Feedback } from '../feedback.module';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbacks: Feedback[];
  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.feedbacks = this.feedbackService.getFeedbacks();
  }



}
