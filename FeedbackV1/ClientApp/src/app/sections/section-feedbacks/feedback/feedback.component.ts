import { Component, OnInit, Input} from '@angular/core';
import { Feedback } from 'src/app/_models/feedback.model';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  @Input() feedbackInput: Feedback;
  constructor(private route: ActivatedRoute ) { }

    ngOnInit() {
  }


}
