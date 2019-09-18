import { FeedbacksService } from 'src/app/_services/feedbacks.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Feedback } from '../../viewfeedback/feedback.module';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-give',
  templateUrl: './give.component.html',
  styleUrls: ['./give.component.css']
})
export class GiveComponent implements OnInit {
  user: User;
  y = 0;

  feedback: any = {
    id: '',
    feed_id: '',
    id_receiver: '',
    punctuality: '',
    productivity: '',
    commskills: '',
    workquality: '',
    comments: ''
  };

  punct = ['Bad', 'Decent', 'Good', 'Very Good'];
  constructor(private userService: UserService,
              private feedbackService: FeedbacksService,
              private alertify: AlertifyService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      // tslint:disable-next-line:no-string-literal
      this.user = data['user'];
    });
    
  }

  submitRequest() {
    this.feedback.id = this.authService.decodedToken.nameid;
    this.feedback.feed_id = '';
    this.feedback.id_receiver = this.user.id;
    this.feedbackService.giveFeedback(this.feedback).subscribe(() => {
      this.alertify.success('Feedback Sent!');
      this.router.navigate(['/all']);
    }, error => {
        this.alertify.error('error');
      });
    console.log(this.feedback);
  }


}
