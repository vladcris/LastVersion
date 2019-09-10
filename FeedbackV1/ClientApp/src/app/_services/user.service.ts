import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  users: User[] = null;
  loadingUsers: boolean = false;
  userRequests: ((_:User[])=>void)[] = [];
constructor(private http: HttpClient) { }

getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl + 'user');
}
  getUsersCached(func:(_:User[])=>void) {
    if (this.loadingUsers == false) {
      this.loadingUsers = true;
      this.userRequests.push(func);
      this.getUsers().subscribe(list => {
        this.users = list;
        this.userRequests.forEach(request => request(list));
      });
    }
    else
      if (this.users == null)
        this.userRequests.push(func);
    else
      func(this.users);

  }
getUser(id): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'user/' + id);
}

getDepartments() {
  return this.http.get(this.baseUrl + 'departament');
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
