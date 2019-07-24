import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { SectionAdduserComponent } from './sections/section-adduser/section-adduser.component';
import { SectionAllComponent } from './sections/section-all/section-all.component';
import { SectionFeedbacksComponent } from './sections/section-feedbacks/section-feedbacks.component';
import { ViewfeedbackComponent } from './sections/viewfeedback/viewfeedback.component';

const appRoutes: Routes = [
   { path: 'adduser', component: SectionAdduserComponent },
   { path: 'all', component: SectionAllComponent }, 
   { path: 'feedback', component: SectionFeedbacksComponent }, 
   { path: 'view', component: ViewfeedbackComponent},
 // { path: 'import', component: SectionAdduserComponent }, 
    
    {path: '', redirectTo: '/all', pathMatch: 'full'}
    
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],

    exports: [RouterModule]
})
export class AppRoutingModule{

}