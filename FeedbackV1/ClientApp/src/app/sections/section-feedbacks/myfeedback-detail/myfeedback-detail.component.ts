import { Component, OnInit } from '@angular/core';
import {Feedback} from 'src/app/_models/feedback.model';
import { FeedbacksService } from 'src/app/_services/feedbacks.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-myfeedback-detail',
  templateUrl: './myfeedback-detail.component.html',
  styleUrls: ['./myfeedback-detail.component.css']
})
export class MyfeedbackDetailComponent implements OnInit {

  feedback: Feedback;

  constructor(private feedbackService: FeedbacksService,
              private route: ActivatedRoute) { }
  adjectives = ['bad', 'decent', 'good', 'very good'];
  max = 4;
  isReadonly = true;

  ngOnInit() {
    this.loadFeedback();
  }

  loadFeedback() {
    // tslint:disable-next-line:no-string-literal
    this.feedbackService.getFeedback(this.route.snapshot.params['feeD_ID']).subscribe((feedback: Feedback) => {
      this.feedback = feedback;
     // console.log(this.feedback);
    });
  }

}
