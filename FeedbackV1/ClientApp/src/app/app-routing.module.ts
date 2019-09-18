import { FeedbackListComponent } from './sections/viewfeedback/feedback-list/feedback-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';

import { SectionAdduserComponent } from './sections/section-adduser/section-adduser.component';
import { SectionAllComponent } from './sections/section-all/section-all.component';
import { SectionFeedbacksComponent } from './sections/section-feedbacks/section-feedbacks.component';
import { ViewfeedbackComponent } from './sections/viewfeedback/viewfeedback.component';
import { ViewstartComponent } from './sections/viewfeedback/viewstart/viewstart.component';
import { FeedbackDetailComponent } from './sections/viewfeedback/feedback-detail/feedback-detail.component';
import { GiveFeebackComponent } from './sections/give-feeback/give-feeback.component';
import {RequestComponent} from './sections/request/request.component';
import { ImportComponent } from './sections/import/import.component';
import {MyfeedbackDetailComponent} from 'src/app/sections/section-feedbacks/myfeedback-detail/myfeedback-detail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GiveComponent } from './sections/section-all/give/give.component';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { UsersTeamResolver } from './_resolvers/users-team.resolver';
import { UpdateUserComponent } from './sections/section-all/update-user/update-user.component';




const appRoutes: Routes = [
   { path: '', component: HomeComponent},
   {
      path: '',
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
         { path: 'all', component: SectionAllComponent},
         { path: 'all/update/:id', component: UpdateUserComponent},
         {path: 'all/:id', component: GiveComponent, resolve: {
            user: UserDetailResolver
         }},
         { path: 'feedbacks', component: SectionFeedbacksComponent},
         { path: 'request/:id', component: RequestComponent},
         { path: 'feedbacks/:feeD_ID', component: MyfeedbackDetailComponent},
         { path: 'adduser', component: SectionAdduserComponent},
         { path: 'login', component: LoginComponent },
        {
          path: 'view', component: ViewfeedbackComponent, resolve: {
            users: UsersTeamResolver
          },
          children: [
            { path: '', component: ViewstartComponent},
           // { path: ':id', component: FeedbackListComponent},
            { path: ':id', component: FeedbackDetailComponent}
         ]},
         { path: 'give-feedback/:feeD_ID', component: GiveFeebackComponent},
         { path: 'import', component: ImportComponent},

      ]
   },
   { path: '**', redirectTo: '', pathMatch: 'full'}

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],

    exports: [RouterModule]
})
export class AppRoutingModule {

}
