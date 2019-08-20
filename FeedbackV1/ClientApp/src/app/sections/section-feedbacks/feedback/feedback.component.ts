import { Component, OnInit, Input} from '@angular/core';
import { Feedback } from 'src/app/_models/feedback.model';
import { ActivatedRoute, Params } from '@angular/router';
import { FeedbackService } from '../../viewfeedback/feedback.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  providers: [FeedbackService]
})
export class FeedbackComponent implements OnInit {
  @Input() feedbackInput: Feedback;
  constructor( private feedbackService: FeedbackService,
               private route: ActivatedRoute ) { }

    ngOnInit() {
  }


}
