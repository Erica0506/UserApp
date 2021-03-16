import { Injectable } from '@angular/core';
import { User } from '../../classes/user/user';
import { HttpClient } from '@angular/common/http';
import { Observable , Observer} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    console.log(user);
    return this.http.post(`https://alakart.cloud/training/user/regist?info={"uid":"${user.email}","firstname":"${user.firstname}","lastname":"${user.lastname}","email":"${user.email}","password":"${user.password}","phone":"${user.phone}","gender":"${user.gender}","dob":"${user.dob}","status":"${user.status}"}`,{});
  }
}
