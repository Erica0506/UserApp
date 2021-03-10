import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, Observer} from 'rxjs'
import { User} from '../../classes/user/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // users: User[] = [
  //   new User("Holly", "Zhou", "holly123", "holly@gmail.com", "h123", 1234567890, "f", "08/21/2020"),
  //   new User("Molly", "Zhou", "molly123", "molly@gmail.com", "m123", 1234567890, "f", "08/21/2020"),
  // ];

  constructor(@Inject(HttpClient) private http:HttpClient) { }

  getUsers(uid: any, password: any): Observable<User[]>{
    return this.http.get<User[]>("https://alakart.cloud/training/user/logon?usr="+uid+"&password="+password+"", {responseType: "json"})
  }

}
