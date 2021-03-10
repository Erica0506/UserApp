import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoginService } from '../../shared/services/login-service/login.service';
import { LoginStatusService } from '../../shared/services/login-service/login-status.service';
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uid: string = "";
  password: string = "";
  msg: string = "";

  users: [] = []

  constructor(@Inject(LoginService) private myloginservice: LoginService,
    @Inject(LoginStatusService) public LoginStatusService: LoginStatusService) { }

  CheckLogin(txt1: any) {
    this.myloginservice.getUsers(this.uid, this.password)
    //.pipe(first())
    .subscribe(this.onAjaxSuccess, this.onAjaxError)
    // if (this.myloginservice.getUsers(this.uid, this.password) == true) {
    //   this.msg = "Success Login"
    //   this.LoginStatusService.isLoggedIn = true;

    // } else {
    //   this.msg = "Invalid Login"
    //   this.LoginStatusService.isLoggedIn = false;
    //   txt1.focus();
    // }
  }

  onAjaxSuccess = (response: any) => { 
    this.users = response; 
    console.log(this.users);

    
       this.msg = "Success Login"
      this.LoginStatusService.isLoggedIn = true;
  }
  onAjaxError = (error: any) => { alert(error); }


  Logout() {
    this.LoginStatusService.isLoggedIn = false;
  }


  ngOnInit(): void {
  }

}
