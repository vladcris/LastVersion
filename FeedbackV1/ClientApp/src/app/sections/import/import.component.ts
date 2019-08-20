import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/_services/employees.service';

import {  Employee } from 'src/app/_models/employee.model';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  employees: Employee[];
  constructor(private employeeService: EmployeesService) { }

  ngOnInit() {
    this.employeeService.getValues().subscribe((res: Employee[]) => {
      this.employees = res;
      console.log(this.employees);
    });
  }


}
