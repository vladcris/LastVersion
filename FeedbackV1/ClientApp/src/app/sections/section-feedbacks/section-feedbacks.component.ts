import { Component, OnInit } from '@angular/core';
import {Feedback} from '../../shared/feedback';

const SAMPLE_SERVERS = [
  {name: 'robert', date:'dev1', request: true},
  {name: 'safd', date:'dev1', request: false},
  {name: 'sfas', date:'dev1', request: true},
  {name: 'sfa', date:'dev1', request: true},
  {name: 'SFASD', date:'dev1', request: false},
  {name: 'SADFA', date:'dev1', request: true},
  
]

@Component({
  selector: 'app-section-feedbacks',
  templateUrl: './section-feedbacks.component.html',
  styleUrls: ['./section-feedbacks.component.css']
})
export class SectionFeedbacksComponent implements OnInit {

  constructor() { }

  feedbacks: Feedback[] = SAMPLE_SERVERS;

  ngOnInit() {
  }

}
