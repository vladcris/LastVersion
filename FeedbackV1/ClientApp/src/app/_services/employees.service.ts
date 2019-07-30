import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
employees: any;

constructor(private http: HttpClient) { }

getValues() {
  this.http.get('http://localhost:5000/api/employees').subscribe(response => {
    this.employees = response;
  }, error => {
    console.log(error);
  });
}

}
