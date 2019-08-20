import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/_models/feedback.model';
import { ActivatedRoute, Params } from '@angular/router';
import { FeedbacksService } from 'src/app/_services/feedbacks.service';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.css']
})
export class FeedbackDetailComponent implements OnInit {

feedback: Feedback;
id: number;

  constructor( private feedbackService: FeedbacksService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadFeedback();
  }

  loadFeedback() {
    this.feedbackService.getFeedback(this.route.snapshot.params['id'])
    .subscribe((feedback: Feedback) => {
      this.feedback = feedback;
      console.log(this.feedback);
    });
  }

}
