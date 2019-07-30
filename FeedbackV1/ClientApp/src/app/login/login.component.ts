import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  value = true;
  constructor() { }

  ngOnInit() {
  }

  login() {
    if (this.model) {
      console.log('true');
    }
  }

  onPush() {
    this.value = false;
  }
}
