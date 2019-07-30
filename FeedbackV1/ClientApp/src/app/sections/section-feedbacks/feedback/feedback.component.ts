import { Component, OnInit, Input} from '@angular/core';
import { Feedback } from 'src/app/sections/viewfeedback/feedback.module';
import { ActivatedRoute, Params } from '@angular/router';
import { FeedbackService } from '../../viewfeedback/feedback.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  providers: [FeedbackService]
})
export class FeedbackComponent implements OnInit {
  @Input() angajatid: string;
  @Input() feedbackInput: Feedback;
  feedback: Feedback;
  constructor( private feedbackService: FeedbackService,
               private route: ActivatedRoute ) { }

  // ngOnInit() {
  //   console.log(this.angajatid);


  // }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.angajatid = params.angajatid;
        this.feedback = this.feedbackService.getFeedbackAng(this.angajatid);
        console.log(this.feedback);
      }
    );
  }


}
