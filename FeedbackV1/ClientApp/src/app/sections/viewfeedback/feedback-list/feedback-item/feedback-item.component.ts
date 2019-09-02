
import { Component, OnInit, Input } from '@angular/core';
import { Feedback } from 'src/app/_models/feedback.model';



@Component({
  selector: 'app-feedback-item',
  templateUrl: './feedback-item.component.html',
  styleUrls: ['./feedback-item.component.css']
})
export class FeedbackItemComponent implements OnInit {
 @Input() feedback: Feedback;
 @Input() index: number;


  ngOnInit() {
  }

}
