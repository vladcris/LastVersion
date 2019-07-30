import { Component, OnInit } from '@angular/core';
import {Feedback} from  '../viewfeedback/feedback.module'
import { FeedbackService } from '../viewfeedback/feedback.service';

// const SAMPLE_SERVERS = [
//   {name: 'robert', date:'dev1', request: true},
//   {name: 'safd', date:'dev1', request: false},
//   {name: 'sfas', date:'dev1', request: true},
//   {name: 'sfa', date:'dev1', request: true},
//   {name: 'SFASD', date:'dev1', request: false},
//   {name: 'SADFA', date:'dev1', request: true},
  
// ]



@Component({
  selector: 'app-section-feedbacks',
  templateUrl: './section-feedbacks.component.html',
  styleUrls: ['./section-feedbacks.component.css'],
  providers:[FeedbackService]
})
export class SectionFeedbacksComponent implements OnInit {
  feedbacks: Feedback[];


  // feedbacks: Feedback[] = SAMPLE_SERVERS;
  constructor(private feedbackService: FeedbackService) { }
  ngOnInit() {
    this.feedbacks = this.feedbackService.getFeedbacks();
    
  }

}
