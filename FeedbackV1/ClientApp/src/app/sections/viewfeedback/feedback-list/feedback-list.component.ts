import { Component, OnInit } from '@angular/core';
import { FeedbacksService } from 'src/app/_services/feedbacks.service';
import { Feedback } from 'src/app/_models/feedback.model';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbacks: Feedback[];
  constructor(private feedbackService: FeedbacksService) { }



  ngOnInit() {
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    this.feedbackService.getFeedbacks().subscribe((res: Feedback[]) => {
      this.feedbacks = res;
     // console.log(this.feedbacks);
    });
  }

}
