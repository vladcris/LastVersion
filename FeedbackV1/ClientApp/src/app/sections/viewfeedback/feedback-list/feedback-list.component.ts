import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FeedbacksService } from 'src/app/_services/feedbacks.service';
import { Feedback } from 'src/app/_models/feedback.model';
import { Router } from '@angular/router';

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

  constructor(private feedbackService: FeedbacksService,
              private userService: UserService,
              private route: Router) { }



  ngOnInit() {
    this.loadEmployees();
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    this.feedbackService.getFeedbacks().subscribe((res: Feedback[]) => {
      this.feedbacks = res;
      console.log(this.feedbacks);
    });
  }


  loadEmployees() {
    this.userService.getUsers().subscribe((res: User[]) => {
      this.users = res;
      console.log(this.users);
    });
  }

  onChange() {
    this.userFeedbacks = this.feedbacks.filter(m => m.iD_receiver === this.user.user);
    this.loadFeed = true;
    this.route.navigate(['/view/']);
    console.log(this.userFeedbacks);

  }

}
