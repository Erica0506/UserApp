import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../classes/user/user';
import { filter, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(@Inject(HttpClient) private http: HttpClient) { }

  resolve: any;
  reject: any;

  getUsers(){
    this.http.get<User> ("https://alakart.cloud/training/user/list", {responseType: "json"})
      
    .subscribe(this.onAjaxSuccess, this.onAjaxError);
    return new Promise(this.promiseCallback);
  }

  promiseCallback = (resolve: any, reject: any) => {
    this.resolve = resolve;
    this.reject = reject;
  }

  onAjaxSuccess = (response: any) => {
    this.resolve(response);
  }
  onAjaxError = () =>{
    this.reject("Failed");
  }


}
