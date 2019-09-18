import { Component, OnInit } from '@angular/core';
import {Feedback} from 'src/app/_models/feedback.model';
import { FeedbacksService } from 'src/app/_services/feedbacks.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../_services/user.service';
import { User } from '../../../_models/user';

@Component({
  selector: 'app-myfeedback-detail',
  templateUrl: './myfeedback-detail.component.html',
  styleUrls: ['./myfeedback-detail.component.css']
})
export class MyfeedbackDetailComponent implements OnInit {

  feedback: Feedback;
  receiver: User = null;
  
  constructor(private feedbackService: FeedbacksService,
              private userService: UserService,
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
