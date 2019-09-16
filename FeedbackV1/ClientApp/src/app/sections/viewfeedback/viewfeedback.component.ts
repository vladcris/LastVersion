import { Component, OnInit} from '@angular/core';
import { Feedback } from './feedback.module';

@Component({
  selector: 'app-viewfeedback',
  templateUrl: './viewfeedback.component.html',
  styleUrls: ['./viewfeedback.component.css'],
})
export class ViewfeedbackComponent implements OnInit {
 feedbackSelected: Feedback;

  constructor() { }

  ngOnInit() {

}

}
