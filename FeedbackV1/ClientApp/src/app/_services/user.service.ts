import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  users: User[] = null;
  loadingUsers = false;
  userRequests: ((_: User[]) => void)[] = [];
constructor(private http: HttpClient) { }

getUsers(userParams?, page?, itemsPerPage?): Observable<PaginatedResult<User[]>> {
  const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

  let params = new HttpParams();

  if (page !== null && itemsPerPage !== null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if (userParams !== null) {

      params = params.append('team', userParams.team);
      params = params.append('orderBy', userParams.orderBy);
      params = params.append('role', userParams.role);
 }

  return this.http.get<User[]>(this.baseUrl + 'user', {observe: 'response', params})
                  .pipe(
                    map(response => {
                      paginatedResult.result = response.body;
                      if (response.headers.get('Pagination') != null) {
                        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                      }
                      return paginatedResult;
                    })
                  );
}

getUsersForName(): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl + 'user');
}

getUser(id): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'user/' + id);
}

GetManagers(): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl + 'user/' + 'managers');
}

getDepartments() {
  return this.http.get(this.baseUrl + 'departament');
  }

getUsersByDepartament(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'request/' + id);
  }

updateRequest(id: string, user: User) {
  return this.http.put(this.baseUrl + 'user/' + id, user);
}

deleteUser(id: string) {
  return this.http.delete(this.baseUrl + 'user/' + id);
  }

getTeam(id): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'Manager/' + id);
  }

}
