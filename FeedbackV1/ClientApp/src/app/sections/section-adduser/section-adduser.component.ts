import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../app/_models/user';

@Component({
  selector: 'app-section-adduser',
  templateUrl: './section-adduser.component.html',
  styleUrls: ['./section-adduser.component.css']
})
export class SectionAdduserComponent implements OnInit {
  departments: any;
  registerForm: FormGroup;
  user: any;
  users: User[];
  constructor(private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadDepartments();
    this.createRegisterFrom();
    this.loadUsers();
  }

  createRegisterFrom() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      manager_Id: ['', Validators.required],
      dep_Id: ['', Validators.required],
      role: ['', Validators.required],
      //this.registerForm.get("role").value
      id: [''],
      
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
      
    }, { validator: this.passwordMatchValidator });
    
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }


  loadUsers() {
    this.userService.getUsers().subscribe((response: User[]) => {
      this.users = response;
      //console.log(this.users);
    }, error => {
      this.alertify.error(error);
    });
  }

  loadDepartments() {
    this.userService.getDepartments().subscribe(response => {
      this.departments = response;
     // console.log(this.departments);
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      console.log(this.user);
      this.authService.register(this.user).subscribe( () => {
        this.alertify.success('Registration succesfull');
      }, error => {
        this.alertify.error('error');
      });
    }
    this.router.navigate(['/all']);
    // console.log(this.registerForm.value);
  }

}
