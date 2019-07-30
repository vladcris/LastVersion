import { Component, OnInit } from '@angular/core';
// import {EmployeesService} from '../_services/employees.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  employees: any;


  constructor(private http: HttpClient  ) { }

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.http.get('http://localhost:5000/api/employees').subscribe(response => {
      this.employees = response;
    }, error => {
      console.log(error);
    });
  }

}
