import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/_models/feedback.model';
import { ActivatedRoute, Params } from '@angular/router';
import { FeedbacksService } from 'src/app/_services/feedbacks.service';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.css']
})
export class FeedbackDetailComponent implements OnInit {
feedback: any = {};
id: string;

adjectives = ['bad', 'decent', 'good', 'very good'];
max = 4;
isReadonly = true;

  constructor(private feedbackService: FeedbacksService,
              private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line:no-string-literal
      this.id = params['id'];
      this.loadFeedback();
    });

    // this.route.data.subscribe(data => {
    //   this.feedback = data['feedback'];
    // });

  }

  loadFeedback() {
    // tslint:disable-next-line:no-string-literal
    this.feedbackService.getFeedback(this.id)
    .subscribe((feedback: Feedback) => {
      this.feedback = feedback;
      // console.log(this.feedback);
    });
  }



}
