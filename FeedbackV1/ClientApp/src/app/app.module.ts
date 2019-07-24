import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    
   
    
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
