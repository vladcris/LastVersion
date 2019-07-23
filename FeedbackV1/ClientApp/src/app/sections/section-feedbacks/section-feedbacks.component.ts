import { Component, OnInit } from '@angular/core';
import {Feedback} from '../../shared/feedback';

const SAMPLE_SERVERS = [
  {id: 1, name:'dev1', isOnline: true},
  {id: 2, name:'dev2', isOnline: false},
  {id: 3, name:'dev3', isOnline: true},
  {id: 4, name:'dev4', isOnline: false},
  {id: 1, name:'dev1', isOnline: true},
  {id: 2, name:'dev2', isOnline: false},
  {id: 3, name:'dev3', isOnline: true},
  {id: 4, name:'dev4', isOnline: false}
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
