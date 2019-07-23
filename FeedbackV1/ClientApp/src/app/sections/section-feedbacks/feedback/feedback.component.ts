import { Component, OnInit, Input} from '@angular/core';
import { Feedback } from 'src/app/shared/feedback';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  @Input() feedbackInput : Feedback;
  constructor() { }

  color: string;
  buttonText: string;

  ngOnInit() {
    this.setFeedbackStatus(this.feedbackInput.isOnline);
  }

  setFeedbackStatus(isOnline: boolean){
    if(isOnline){
      this.feedbackInput.isOnline = true;
      this.color  = '#66BB6A';
      this.buttonText = 'Inspect';
    }else{
      this.feedbackInput.isOnline = false;
      this.color = '#FF6B6B';
      this.buttonText = 'Give';
    }
  }

  toggleStatus(onlineStatus: boolean) {
    this.setFeedbackStatus(!onlineStatus);
  }
  

}
