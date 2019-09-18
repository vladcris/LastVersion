import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from './../../_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FeedbacksService } from 'src/app/_services/feedbacks.service';
import { User } from '../../_models/user';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  user: User;
  departments: any;
  departmentsSelected: any;
  users: any;
  employees = [];
  employee: any = {};
  depId: any = {};
  choose: any = {};
  id: string;

  form = {
    id_receiver: '',
    pending: false,
    id_manager: ''
  };

  angajat = [];
  angajatName = [];
  constructor(private userService: UserService,
    private feedbacksService: FeedbacksService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadEmployeesByDepartament();
    this.loadDepartments();
    this.loadUser();

  }

  loadUser() {
    this.userService.getUser(this.route.snapshot.params['id']).subscribe(res => {
      this.user = res;
    })
  }

  loadDepartments() {
    this.userService.getDepartments().subscribe(response => {
      this.departments = response;
      // console.log(this.departments);
    });
  }

  loadEmployeesByDepartament() {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  onSelect() {
    this.departmentsSelected = this.choose.make ? this.departments : [];
    console.log(this.choose.make);
  }
  onSelectDepartament() {

    this.employees = this.choose.make ? this.users : [];
   
  }


  onPush(employee) {
    // console.log(this.employee);
    this.angajat.push(employee);
    this.users.forEach(user => {
      if (user.id == employee)
        this.angajatName.push(user.name);
       
    })
    // console.log(this.angajatName);
    // console.log(this.angajat);
  }

  onDelete(item) {
    const index: number = this.angajatName.indexOf(item);
    if (index !== -1) {
      this.angajatName.splice(index, 1);
      this.angajat.splice(index, 1);
    }
  }

  onSubmit() {

    if (this.choose.make == 'request1') {

      this.angajat.forEach(user => {
        this.form.pending = true;
        this.form.id_manager = this.authService.decodedToken.nameid;
        this.form.id_receiver = user;
        // console.log(this.form);
        // tslint:disable-next-line:no-string-literal
        this.feedbacksService.sendRequest1(this.form, this.route.snapshot.params['id']).subscribe(() => {
          this.alertify.success('Request Sent!');
        }, error => {
          this.alertify.error('error');
        });
      })
    } else if (this.choose.make == 'request2') {

      this.angajat.forEach(user => {
        this.form.pending = true;
        this.form.id_manager = this.authService.decodedToken.nameid;
        this.form.id_receiver = this.route.snapshot.params['id'];
        // console.log(this.form);
        this.feedbacksService.sendRequest2(this.form, user).subscribe(() => {
          this.alertify.success('Request Sent!');
        }, error => {
          this.alertify.error('error');
        });
      })
    }

  }
}
