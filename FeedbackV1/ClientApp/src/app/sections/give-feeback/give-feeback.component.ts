import { Component, OnInit, ViewChild } from '@angular/core';
import { FeedbacksService } from 'src/app/_services/feedbacks.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Feedback} from 'src/app/_models/feedback.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-give-feeback',
  templateUrl: './give-feeback.component.html',
  styleUrls: ['./give-feeback.component.css']
})
export class GiveFeebackComponent implements OnInit {
  @ViewChild('requestForm', {static: false}) requestForm: NgForm;
  feedback: Feedback;
  punct = [1, 2, 3, 4];
  constructor(private feedbackService: FeedbacksService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.loadFeedback();
  }

  loadFeedback() {
    // tslint:disable-next-line:no-string-literal
    this.feedbackService.getFeedback(this.route.snapshot.params['feeD_ID'])
    .subscribe((feedback: Feedback) => {
      this.feedback = feedback;
      console.log(this.feedback);
    });

  }

  submitRequest() {
    this.feedback.pending = false;
    // tslint:disable-next-line:no-string-literal
    this.feedbackService.updateRequest(this.route.snapshot.params['feeD_ID'], this.feedback)
    .subscribe(next => {
      this.requestForm.reset(this.feedback);
    });
    // this.feedback.pending = false;
    // console.log(this.feedback);
    // this.requestForm.reset(this.feedback);
    this.router.navigate(['/feedbacks']);
  }
}
