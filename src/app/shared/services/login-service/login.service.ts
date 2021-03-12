import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs'
import { User } from '../../classes/user/user';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userSubject!: BehaviorSubject<any>;
  public user!: Observable<User>;

  constructor(@Inject(HttpClient) private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
  }
  public get userValue(): User {
    return this.userSubject.value;
  }

  getUsers(uid: any, password: any): Observable<User[]> {
    return this.http.get<User[]>("https://alakart.cloud/training/user/logon?usr=" + uid + "&password=" + password + "", { responseType: "json" })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));

  }
  // can also use link format below
  // `https://alakart.cloud/training/user/logon?usr=${uid}&password=${password}`, 
}
