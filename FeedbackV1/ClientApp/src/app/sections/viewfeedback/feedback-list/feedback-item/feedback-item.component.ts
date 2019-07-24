import { Component, OnInit, Input } from '@angular/core';
import { Feedback } from '../../feedback.module';



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
