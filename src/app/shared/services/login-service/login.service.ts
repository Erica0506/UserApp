import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs'
import { User } from '../../classes/user/user';
import { map } from 'rxjs/operators';
import { LoginStatusService } from './login-status.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userSubject!: BehaviorSubject<any>;
  public user!: Observable<User>;

  constructor(
    @Inject(HttpClient) private http: HttpClient,
    @Inject(LoginStatusService) public LoginStatusService: LoginStatusService,
    @Inject(Router) private router: Router,
    @Inject(ActivatedRoute) private route: ActivatedRoute) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
  }
  public get userValue(): User {
    return this.userSubject.value;
  }

  checkLogin(uid: any, password: any): Observable<User[]> {

    return this.http.get<User[]>(`https://alakart.cloud/training/user/logon?usr=${uid}&password=${password}`, { responseType: "json" })
      .pipe(map(user => {
        if (uid && password) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
        }
        return user;
      }));
  }
 

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.LoginStatusService.isLoggedIn = false;
    this.userSubject.next(null);
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'login';
    this.router.navigateByUrl(returnUrl);
  }

  update(user: any) {
    console.log(user);
    return this.http.post(`https://alakart.cloud/training/user/update?usr=${user.uid}&info={"uid":"${user.email}","firstname":"${user.firstname}","lastname":"${user.lastname}","email":"${user.email}","password":"${user.password}","phone":"${user.phone}","gender":"${user.gender}","dob":"${user.dob}"}`, {})
  }

  delete(uid: string) {
    console.log(uid);
    return this.http.post(`https://alakart.cloud/training/user/update?usr=${uid}&info={"status":"inactive"}`, {})
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        if (uid == this.userValue.uid) {
          this.logout();
        }
        return x;
      }));
  }

  active(uid: string) {
    console.log(uid);
    return this.http.post(`https://alakart.cloud/training/user/update?usr=${uid}&info={"status":"active"}`, {})
  }

}

// function typeOf(user: User[]): any {
//   throw new Error('Function not implemented.');
// }

