import { Pagination, PaginatedResult } from './../../_models/pagination';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-section-all',
  templateUrl: './section-all.component.html',
  styleUrls: ['./section-all.component.css'],
})
export class SectionAllComponent implements OnInit {

  filter: string;
  users: User[];
  userTeam: any = {};
  id: any;
  modalRef: BsModalRef;
  departamente = ['Nothing', 'Suport', 'Development', 'HR', 'Finance'];
  tableLoaded = false;
  userParams: any = {};
  pagination: Pagination;
  reverse = true;
  belongToTeam: boolean;



giveFeedbackForm = new FormGroup({
  sender: new FormControl(),
  reciver: new FormControl(),
  punctuality: new FormControl('', Validators.required),
  id: new FormControl(),
  productivity: new FormControl(),
  commskills: new FormControl(),
  workquality: new FormControl(),
  comments: new FormControl('', [Validators.required]),
  });



 constructor(private userService: UserService,
             private alertify: AlertifyService,
             private modalService: BsModalService,
             private route: ActivatedRoute) { }

 ngOnInit() {
   this.route.data.subscribe(data => {
     // tslint:disable-next-line:no-string-literal
     this.users = data['users'].result;
     this.tableLoaded = true;
   });
   this.loadTeam();



   this.userParams.orderBy = 'asc';
   this.userParams.team = false;
   this.userParams.role = null;

 }


loadUsers() {
  this.userService.getUsers(this.userParams)
                        .subscribe((res: PaginatedResult<User[]>) => {
                          this.users = res.result;
                          this.pagination = res.pagination;
                        }, error => {
                          this.alertify.error(error);
                        });
}

onClick() {
  console.log('salut');
  if ( localStorage.getItem('role') === 'manager' ) {
    this.userParams.team = true;
    this.userParams.role = 'manager';
  } else if (localStorage.getItem('role') === 'employee') {
    this.userParams.team = true;
    this.userParams.role = 'employee';
  } else {
    this.userParams.team = false;
    this.userParams.role = null;
  }
}

isManager(userFromTable) {
  if (  localStorage.getItem('role') === 'manager' ) {

    this.belongToTeam = false;
    this.userTeam.forEach(user => {
      if (user.id === userFromTable) {
        this.belongToTeam = true;
      }
    });
    return this.belongToTeam;
  } else {
    return false;
  }
}

onSort() {
  if (this.userParams.orderBy === 'asc') {
    this.userParams.orderBy = 'desc';
    this.reverse = false;
  } else {
    this.userParams.orderBy = 'asc';
    this.reverse = true;
  }
 // this.userParams.team = false;
  this.loadUsers();
}


 resetFilters() {
    this.userParams.team = false;
    this.userParams.orderBy = null;
    this.filter = null;
    this.loadUsers();
 }

  onDelete(id: any) {
    this.tableLoaded = false;
    this.userService.deleteUser(id).subscribe(() => {
      // console.log(id);

      // this.loadUsers();
      this.alertify.success('User deleted!');
    }, error => {
      this.alertify.error('Error deleting user!');
    });
  }

  // isEmployee() {
  //   return localStorage.getItem('role') !== 'employee';
  // }

  loadTeam() {
    if ( localStorage.getItem('role') === 'manager' ) {
      let params = {
      team: true,
      role: 'manager',
      orderBy: 'asc'
    };
      this.userService.getUsers(params)
                        .subscribe((res: PaginatedResult<User[]>) => {
                          this.userTeam = res.result;
                          this.pagination = res.pagination;
                        }, error => {
                          this.alertify.error(error);
                        });
      params = null;
  }
}



}
