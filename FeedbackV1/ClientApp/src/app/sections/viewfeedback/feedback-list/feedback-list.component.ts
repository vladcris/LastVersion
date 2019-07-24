import { Component, OnInit } from '@angular/core';
import { Feedback } from '../feedback.module';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbacks: Feedback[] = [
    new Feedback('0001', '1', 3,4, 4, 3, '0008','0004',true,'sfdgfsdfs sgdsg'),
    new Feedback('0001', '1', 3,4, 4, 3, '0008','0004',true,'sfdgfsdfs sgdsg')
  ];
  constructor() { }

  ngOnInit() {
  }

}
