import { Component, OnInit} from '@angular/core';
import { Feedback } from './feedback.module';
import { FeedbackService } from './feedback.service';

@Component({
  selector: 'app-viewfeedback',
  templateUrl: './viewfeedback.component.html',
  styleUrls: ['./viewfeedback.component.css'],
  providers: [FeedbackService]
})
export class ViewfeedbackComponent implements OnInit {
 feedbackSelected: Feedback;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {
  //   this.feedbackService.feedbackSelected
  //   .subscribe(
  //   (feedback: Feedback) => {
  //     this.feedbackSelected = feedback;
  // }
  //   );

}

}
