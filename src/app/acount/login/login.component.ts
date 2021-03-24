import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../shared/services/login-service/login.service';
import { LoginStatusService } from '../../shared/services/login-service/login-status.service';
import { first } from 'rxjs/operators'
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg: string = "";
  hide: boolean = true;

  constructor(
    @Inject(LoginService) private myloginservice: LoginService,
    @Inject(LoginStatusService) public LoginStatusService: LoginStatusService,
    private route: ActivatedRoute,
    private router: Router) { }

  form: FormGroup = new FormGroup({
    uid: new FormControl(''),
    password: new FormControl(''),
  });

  CheckLogin(txt1: any) {
    this.myloginservice.checkLogin(this.form.value.uid, this.form.value.password)
    .pipe(first())
    .subscribe(
      (response: any) => { 
        if (!response.error&&response['status']==='active'){
          console.log(response);
          this.msg = "Success Login"
          this.LoginStatusService.isLoggedIn = true;
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';
          this.router.navigateByUrl(returnUrl);
          //this.myobserver.next(res)
        } else {
          this.msg = "Invalid Login"
          this.LoginStatusService.isLoggedIn = false;
          txt1.focus();
        }
      },

      (error: any) => { alert(error); }
    )
  }

  Logout() {
    this.myloginservice.logout()
  }

  ngOnInit(): void {
  }

}
