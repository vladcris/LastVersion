import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
// import {map} from 'rxjs/add/operator';

@Injectable()
export class EmployeesService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getValues() {
   return this.http.get(this.baseUrl + "employees");
  }

}


