import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SectionAllComponent } from './sections/section-all/section-all.component';
import { SectionFeedbacksComponent } from './sections/section-feedbacks/section-feedbacks.component';
import { SectionAdduserComponent } from './sections/section-adduser/section-adduser.component';
import { ViewfeedbackComponent } from './sections/viewfeedback/viewfeedback.component';
import { FeedbackComponent } from './sections/section-feedbacks/feedback/feedback.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SectionAllComponent,
    SectionFeedbacksComponent,
    SectionAdduserComponent,
    ViewfeedbackComponent,
    FeedbackComponent
    
    
  
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
