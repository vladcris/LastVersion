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
  feedbacks: Feedback[];
  constructor(private http: HttpClient, private feedbackService: FeedbacksService ) { }

  ngOnInit() {
  this.loadFeedbacks();
  }

  loadFeedbacks() {
    this.feedbackService.getFeedbacks().subscribe((feedbacks: Feedback[]) => {
      this.feedbacks = feedbacks;
      console.log(this.feedbacks);
    });

  }


  // getValues() {
  //   this.http.get('http://localhost:5000/api/Feedbacks').subscribe(response => {
  //     this.employees = response;
  //   }, error => {
  //     console.log(error);
  //   });
  // }

}
