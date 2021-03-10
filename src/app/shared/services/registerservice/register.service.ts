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
    return this.http.post("https://alakart.cloud/training/user/regist?info="+user+"", user);
  }
}

// registerUser(user : User){
//   const body: User = {
//     UserName: user.UserName,
//     Password: user.Password,
//     Email: user.Email,
//     FirstName: user.FirstName,
//     LastName: user.LastName
//   }
//   return this.http.post(this.rootUrl + '/api/User/Register', body);
// }
//`${environment.apiUrl}/users/register`