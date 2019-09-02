import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Feedback} from 'src/app/_models/feedback.model';
import { FeedbacksService } from 'src/app/_services/feedbacks.service';


@Component ({
  selector: 'app-section-feedbacks',
  templateUrl: './section-feedbacks.component.html',
  styleUrls: ['./section-feedbacks.component.css'],
  // providers: [FeedbackService]
})
export class SectionFeedbacksComponent implements OnInit {
  employees: any;
  feedbacks: any[];
  myFeedbacks: any = {};
  constructor(private http: HttpClient,
              private feedbackService: FeedbacksService,
              private auth: AuthService ) { }

  ngOnInit() {
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    this.feedbackService.getFeedbacks().subscribe(feedbacks => {
      this.feedbacks = feedbacks;
      this.myfeedbacks();
    //  console.log(this.feedbacks);
    });
  }

  myfeedbacks() {
    this.myFeedbacks = this.feedbacks.filter(m => m.id === this.auth.decodedToken.nameid);
  //  console.log(this.myFeedbacks);
    console.log(this.auth.decodedToken.nameid);
  }


  // getValues() {
  //   this.http.get('http://localhost:5000/api/Feedbacks').subscribe(response => {
  //     this.employees = response;
  //   }, error => {
  //     console.log(error);
  //   });
  // }

}
