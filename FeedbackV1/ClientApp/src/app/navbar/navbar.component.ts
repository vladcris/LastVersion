import { FeedbacksService } from './../_services/feedbacks.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { Feedback } from '../_models/feedback.model';
import { PaginatedResult } from '../_models/pagination';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  model: any = {};
  feedbacks: Feedback[];
  pending = false;
  constructor(public authService: AuthService,
              private alertify: AlertifyService,
              private feedbacksService: FeedbacksService,
              private router: Router) { }

  ngOnInit() {
     this.loadPending();
     this.checkPending();
  }

  login(form: NgForm) {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Registration succesful!');
      this.loadPending();
    },
    error => {
      this.alertify.error('Registration failed!');
    }, () => {
      this.router.navigate(['/all']);
    }
    );

  }

  loggedIn() {
   return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
    this.loadPending();
  }

  loadPending() {
    if (this.loggedIn && localStorage.getItem('token') !== null) {
          this.feedbacksService.getMyFeedbacks(this.authService.decodedToken.nameid, 1, 10)
                          .subscribe((res: PaginatedResult<Feedback[]>) => {
                            this.feedbacks = res.result;
                           // console.log(this.feedbacks);
                            if (this.feedbacks[0].pending === true) {
                            this.pending = true;
                          }
                          }, error => {
                            this.alertify.error(error);
                          });
        } else {
      this.pending = false;
    }

  }


  checkPending() {
    if (this.pending === true) {
     // console.log(this.pending);
      this.pending = true;
    } else {
      this.pending = false;
    }
    return this.pending;
    }
  }

