import { Component, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    this.authService.login(form.value).subscribe(next => {
      console.log('succesfull');
    }, error => {
      console.log('failed');
    });
    form.reset();
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }


}
