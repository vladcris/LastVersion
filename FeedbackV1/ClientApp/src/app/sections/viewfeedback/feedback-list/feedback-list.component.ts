import { Pagination } from './../../../_models/pagination';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FeedbacksService } from 'src/app/_services/feedbacks.service';
import { Feedback } from 'src/app/_models/feedback.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../_services/auth.service';
import { PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbacks: any[];
  users: User[];
  user: any = {};
  userFeedbacks: any = {};
  loadFeed = false;
  pagination: Pagination;


  constructor(private feedbackService: FeedbacksService,
              private authService: AuthService,
              private alertify: AlertifyService,
              private router: ActivatedRoute) { }



  ngOnInit() {
    this.router.data.subscribe(data => {
      // tslint:disable-next-line:no-string-literal
      this.users = data['users'];
    });

    this.router.data.subscribe(data => {
      // tslint:disable-next-line:no-string-literal
      this.feedbacks = data['feedbacks'].result;
      // tslint:disable-next-line:no-string-literal
      this.pagination = data['feedbacks'].pagination;
      this.pagination.currentPage = 1;
      this.pagination.itemsPerPage = 6;
    });
    // this.loadFeedbacks();

  }


  loadFeedbacks() {
    this.feedbackService.getFeedbackReceiver(this.user.user, this.pagination.currentPage, this.pagination.itemsPerPage)
                        .subscribe((res: PaginatedResult<Feedback[]>) => {
      this.feedbacks = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error('loadFeedback');
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadFeedbacks();
  }

  onChange() {
    this.loadFeedbacks();
    this.loadFeed = true;
  }


}
