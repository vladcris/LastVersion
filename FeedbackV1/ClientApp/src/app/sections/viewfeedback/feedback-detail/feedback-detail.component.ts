import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/_models/feedback.model';
import { ActivatedRoute, Params } from '@angular/router';
import { FeedbacksService } from 'src/app/_services/feedbacks.service';
import { User } from '../../../_models/user';
import { UserService } from '../../../_services/user.service'

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.css']
})
export class FeedbackDetailComponent implements OnInit {
  receiver: User = null;
feedback: Feedback;
id: string;

adjectives = ['bad', 'decent', 'good', 'very good'];
max = 4;
isReadonly = true;

  constructor(private feedbackService: FeedbacksService,
                private userService: UserService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.loadFeedback();
    })
    
    this.loadFeedback();

  }

  loadFeedback() {
    // tslint:disable-next-line:no-string-literal
    this.feedbackService.getFeedback(this.id)
    .subscribe((feedback: Feedback) => {
      this.feedback = feedback;
      this.loadName();
     // console.log(this.feedback);
    });
  }

  loadName() {
    this.userService.getUsersCached(users => {
      users.forEach((user: User, index: number, array: User[]) => {
        if (user.id == this.feedback.iD_receiver)
          this.receiver = user;
      });
    });
  }

}
