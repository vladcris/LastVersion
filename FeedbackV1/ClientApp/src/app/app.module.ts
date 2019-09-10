import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {EmployeesService} from './/_services/employees.service';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { BsDropdownModule, ModalModule, ProgressbarModule, RatingModule } from 'ngx-bootstrap';
import { UserService } from './_services/user.service';
import { JwtModule } from '@auth0/angular-jwt';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SectionAllComponent } from './sections/section-all/section-all.component';
import { SectionFeedbacksComponent } from './sections/section-feedbacks/section-feedbacks.component';
import { SectionAdduserComponent } from './sections/section-adduser/section-adduser.component';
import { ViewfeedbackComponent } from './sections/viewfeedback/viewfeedback.component';
import { FeedbackComponent } from './sections/section-feedbacks/feedback/feedback.component';
import { AppRoutingModule } from './app-routing.module';
import { FeedbackListComponent } from './sections/viewfeedback/feedback-list/feedback-list.component';
import { FeedbackDetailComponent } from './sections/viewfeedback/feedback-detail/feedback-detail.component';
import { FeedbackItemComponent } from './sections/viewfeedback/feedback-list/feedback-item/feedback-item.component';
import { ViewstartComponent } from './sections/viewfeedback/viewstart/viewstart.component';
import { GiveFeebackComponent } from './sections/give-feeback/give-feeback.component';
import { LoginComponent } from './login/login.component';
import {RequestComponent} from './sections/request/request.component';
import { ImportComponent } from './sections/import/import.component';
import { MyfeedbackDetailComponent } from './sections/section-feedbacks/myfeedback-detail/myfeedback-detail.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { GiveComponent } from './sections/section-all/give/give.component';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { UpdateUserComponent } from './sections/section-all/update-user/update-user.component';
import { UsersTeamResolver } from './_resolvers/users-team.resolver';








export function tokenGetter() {
   return localStorage.getItem('token');
}



@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      SidebarComponent,
      SectionAllComponent,
      SectionFeedbacksComponent,
      SectionAdduserComponent,
      ViewfeedbackComponent,
      FeedbackComponent,
      FeedbackListComponent,
      FeedbackDetailComponent,
      FeedbackItemComponent,
      ViewstartComponent,
      GiveFeebackComponent,
      FeedbackItemComponent,
      LoginComponent,
      RequestComponent,
      ImportComponent,
      MyfeedbackDetailComponent,
      HomeComponent,
      GiveComponent,
      UpdateUserComponent
   ],
   imports: [
      BrowserModule,
       AppRoutingModule,
       Ng2SearchPipeModule, //including into imports
       Ng2OrderModule, // importing the sorting package here
       NgxPaginationModule,
      ReactiveFormsModule,
      FormsModule,
      AppRoutingModule,
      HttpClientModule,
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      ProgressbarModule.forRoot(),
      RatingModule.forRoot(),
      JwtModule.forRoot({
         config: {
            // tslint:disable-next-line:object-literal-shorthand
            tokenGetter: tokenGetter,
          whitelistedDomains: ['localhost:44365'],
          blacklistedRoutes: ['localhost:44365/api/auth']

         }
      })

   ],
   providers: [
      EmployeesService,
      AuthService,
      AlertifyService,
      AuthGuard,
      UserService,
     UserDetailResolver,
     UsersTeamResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
