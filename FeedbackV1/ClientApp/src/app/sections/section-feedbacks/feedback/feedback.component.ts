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

 

  ngOnInit() {
    
  }

  

}
