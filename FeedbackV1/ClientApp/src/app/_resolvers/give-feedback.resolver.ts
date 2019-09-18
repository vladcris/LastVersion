import { FeedbacksService } from 'src/app/_services/feedbacks.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Feedback } from '../_models/feedback.model';

@Injectable()
export class GiveFeedbackResolver implements Resolve<Feedback> {
  constructor(  private router: Router,
                private feedbacksService: FeedbacksService,
                private alertify: AlertifyService ) { }
  resolve(route: ActivatedRouteSnapshot): Observable<Feedback> {
    // tslint:disable-next-line:no-string-literal
    return this.feedbacksService.getFeedback(route.params['feeD_ID']).pipe(
      catchError(error => {
        this.alertify.error('Problem retreving data!');
        this.router.navigate(['/all']);
        return of(null);
      })
    );
  }
}
