import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import {map} from 'rxjs/add/operator';

@Injectable()
export class EmployeesService {


constructor(private http: HttpClient) { }

getValues() {
   return this.http.get('http://localhost:5000/api/employees');
  }

}


