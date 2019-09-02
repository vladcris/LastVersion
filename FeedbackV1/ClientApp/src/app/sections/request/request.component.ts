import { UserService } from 'src/app/_services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  users: any[];
  employees: any[];
  employee: any = {};
  choose: any = {};

  angajat: any [];
  constructor(private userService: UserService) { }

  ngOnInit() {
   this.loadEmployees();
  }

  loadEmployees() {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  onSelect() {
   this.employees = this.choose.make ? this.users : [];
  }

  onPush() {
    console.log(this.employee);
    this.angajat = this.employee.id;
    console.log(this.angajat);
  }

}
