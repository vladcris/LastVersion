import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-section-all',
  templateUrl: './section-all.component.html',
  styleUrls: ['./section-all.component.css'],
})
export class SectionAllComponent implements OnInit {
 users: User[];

 constructor(private http: HttpClient,
             private userService: UserService,
             private alertify: AlertifyService) { }

 ngOnInit() {
    this.loadUsers();
 }

 loadUsers() {
  this.userService.getUsers().subscribe((response: User[]) => {
    this.users = response;
  }, error => {
    this.alertify.error(error);
  });

 }


}
