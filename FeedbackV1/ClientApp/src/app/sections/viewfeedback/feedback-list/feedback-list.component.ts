import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FeedbacksService } from 'src/app/_services/feedbacks.service';
import { Feedback } from 'src/app/_models/feedback.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../_services/auth.service';

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
              private authService: AuthService,
              private userService: UserService,
    private route: Router,
    private router: ActivatedRoute) { }



  ngOnInit() {
    //this.loadEmployees();
   
    //this.loadTeam();
    this.router.data.subscribe(data => {
      this.users = data['users'];
    });
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    this.feedbackService.getFeedbacks().subscribe((res: Feedback[]) => {
      this.feedbacks = res;
     // console.log(this.feedbacks);
    });
  }


  //loadEmployees() {
  //  this.userService.getUsers().subscribe((res: User[]) => {
  //    this.users = res;
  //    console.log(this.users);
  //  });
  //}

  loadTeam() {
    this.userService.getTeam(this.authService.decodedToken.unique_name).subscribe((res: User[]) => {
      this.users = res;
      console.log(name);
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
