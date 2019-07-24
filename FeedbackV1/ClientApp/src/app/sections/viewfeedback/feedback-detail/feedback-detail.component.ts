import { Component, OnInit } from '@angular/core';
import { Feedback } from '../feedback.module';
import { ActivatedRoute, Params } from '@angular/router';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.css']
})
export class FeedbackDetailComponent implements OnInit {

feedback: Feedback;
id: number;

  constructor( private feedbackService: FeedbackService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.feedback = this.feedbackService.getFeedback(this.id);
      }
    );
  }

}
