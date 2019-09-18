import { FeedbacksService } from './../_services/feedbacks.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Feedback } from '../_models/feedback.model';

@Injectable()
export class ReceiverFeedbacksResolver implements Resolve<Feedback[]> {
    pageNumber = 1;
    pageSize = 5;
    userParams: any = {
      pending: false
    };
  constructor(private feedbacksService: FeedbacksService,
              private router: Router,
              private alertify: AlertifyService ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Feedback[]> {
    // tslint:disable-next-line:no-string-literal
    return this.feedbacksService.getFeedbackReceiver(route.params['id'], this.pageNumber, this.pageSize, this.userParams).pipe(
      catchError(error => {
        this.alertify.error('Problem retreving data!');
        this.router.navigate(['/all']);
        return of(null);
      })
    );
  }
}
