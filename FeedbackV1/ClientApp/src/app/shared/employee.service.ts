import { Employee } from 'src/app/shared/employee.model';

export class EmployeeService{

   private employees : Employee [] = [
       new Employee('1','0001','sanvnds@','0008_1','vlad'),
       new Employee('2','0002','SDAS@','0006_2','cristian'),
       new Employee('3','0003','dafdsa@','0017_3','constantini'),
       new Employee('2','0004','smdaflkd@','0001_1','robert'),
       new Employee('1','0001','sanvnds@','0008_1','vlad'),
       new Employee('2','0002','SDAS@','0006_2','cristian'),
       new Employee('3','0003','dafdsa@','0017_3','constantini'),
       new Employee('2','0004','smdaflkd@','0001_1','robert'),
       new Employee('1','0005','jndsaf@','0004_3','brebenel')
   ];



getEmployees(){
    return this.employees.slice();
}

}
