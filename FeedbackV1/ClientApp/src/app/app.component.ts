import { AlertifyService } from './_services/alertify.service';
import { FeedbacksService } from './_services/feedbacks.service';
import { Component, Output, OnInit} from '@angular/core';
import { AuthService } from './_services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { PaginatedResult } from './_models/pagination';
import { Feedback } from './_models/feedback.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  pending = true;
  feedbacks: Feedback[];

  constructor(  private authService: AuthService,
                private feedbacksService: FeedbacksService,
                private alertify: AlertifyService ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }

  }

  loggedIn() {
    return this.authService.loggedIn();
  }


  // loadPending() {
  //   if (this.loggedIn()) {
  //         this.feedbacksService.getMyFeedbacks(localStorage.getItem('id'), 1, 10)
  //                         .subscribe((res: PaginatedResult<Feedback[]>) => {
  //                           this.feedbacks = res.result;
  //                         }, error => {
  //                           this.alertify.error(error);
  //                         });
  //         console.log(this.feedbacks);
  //         this.feedbacks.forEach(element => {
  //       if (element.pending === true) {
  //         this.pending = true;
  //       }
  //     });
  //   } else {
  //     this.pending = false;
  //   }

  //   return this.pending;
  // }


  // checkPending() {
  //   if (this.pending === true) {
  //     console.log(this.pending);
  //     this.pending = true;
  //     return true;
  //   } else {
  //     this.pending = false;
  //   }
  //   return this.pending;
  //   }





}
