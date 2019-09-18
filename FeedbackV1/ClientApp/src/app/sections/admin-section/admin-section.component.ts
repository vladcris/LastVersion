import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../_services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.css']
})
export class AdminSectionComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  users: User[];
  userParams: any = {
    userId: null
  };
  searchKey: string;

  listData: MatTableDataSource<any>;
  displayColumns: string[] = ['department', 'fullName', 'email', 'manager', 'role', 'deleted', 'actions'];


  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      // tslint:disable-next-line:no-string-literal
      this.users = data['users'].result;
    });

    this.userService.getAllUsers(this.userParams).subscribe((data: PaginatedResult<User[]>) => {
      this.users = data.result;
      this.listData = new MatTableDataSource(this.users);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;

  });
  }
}







