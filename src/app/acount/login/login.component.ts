import { Component, OnInit, Inject } from '@angular/core';
//import { HttpClient } from "@angular/common/http";
import { LoginService } from '../../shared/services/login-service/login.service';
import { LoginStatusService } from '../../shared/services/login-service/login-status.service';
import { first } from 'rxjs/operators'
//import { User } from 'src/app/shared/classes/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uid: string = "";
  password: string = "";
  msg: string = "";

  //users: User[] = []

  constructor(@Inject(LoginService) private myloginservice: LoginService,
    @Inject(LoginStatusService) public LoginStatusService: LoginStatusService) { }

  CheckLogin(txt1: any) {
    this.myloginservice.getUsers(this.uid, this.password)
    .pipe(first())
    .subscribe(
      (response: any) => { 
        console.log(response);

        if (!response.error){
          this.msg = "Success Login"
          this.LoginStatusService.isLoggedIn = true;
          //this.myobserver.next(res)
        } else {
          this.msg = "Invalid Login"
          this.LoginStatusService.isLoggedIn = false;
          txt1.focus();
        }
      },

      (error: any) => { alert(error); }
    )

    // for (var i = 0; i < this.users.length; i++){
    //   if (this.users(uid) == this.uid && this.users["password"] == this.password){
    //     this.msg = "Success Login"
    //     this.LoginStatusService.isLoggedIn = true;
    //   } else {
    //     this.msg = "Invalid Login"
    //     this.LoginStatusService.isLoggedIn = false;
    //      txt1.focus();
    //   }
    // }
  }

  Logout() {
    this.LoginStatusService.isLoggedIn = false;
  }

  ngOnInit(): void {
  }

}
