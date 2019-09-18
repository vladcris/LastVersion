import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FeedbacksService } from 'src/app/_services/feedbacks.service';
import { ActivatedRoute, Router, Params, RouterLink } from '@angular/router';
import {Feedback} from 'src/app/_models/feedback.model';
import { NgForm } from '@angular/forms';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-give-feeback',
  templateUrl: './give-feeback.component.html',
  styleUrls: ['./give-feeback.component.css']
})
export class GiveFeebackComponent implements OnInit {
  @ViewChild('requestForm', {static: false}) requestForm: NgForm;
  feedback: Feedback;
  receiver: User = null;
  requester: User = null;
  punct = ['Bad', 'Decent', 'Good', 'Very Good'];
  constructor(private feedbackService: FeedbacksService,
              private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {

    this.loadFeedback();
 


   }

  loadFeedback() {
    // tslint:disable-next-line:no-string-literal
    this.feedbackService.getFeedback(this.route.snapshot.params['feeD_ID'])
    .subscribe((feedback: Feedback) => {
      this.feedback = feedback;
      this.userService.getUsersCached(users => {
        users.forEach((user: User, index: number, array: User[]) => {
          if (user.id == this.feedback.iD_receiver)
            this.receiver = user;
          if (user.id == this.feedback.iD_manager)
            this.requester = user;
        });
      });
    });

  }

  submitRequest() {
    this.feedback.pending = false;
    // tslint:disable-next-line:no-string-literal
    this.feedbackService.updateRequest(this.route.snapshot.params['feeD_ID'], this.feedback)
    .subscribe(next => {
      this.requestForm.reset(this.feedback);
    });
    // this.feedback.pending = false;
    // console.log(this.feedback);
    // this.requestForm.reset(this.feedback);
    this.router.navigate(['/feedbacks']);
  }
}
