import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class RequestResolver implements Resolve<User> {
    userParams: any = {};
  constructor(private userService: UserService,
              private router: Router,
              private alertify: AlertifyService) { }
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
// tslint:disable-next-line:no-string-literal
    this.userParams.userId = route.params['id'];
    return this.userService.getAllUsers(this.userParams).pipe(
      catchError(error => {
        this.alertify.error('Problem retreving data!');
        this.router.navigate(['/all']);
        return of(null);
      })
    );
  }
}
