import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,  Router } from '@angular/router';
import { LoginStatusService } from './login-status.service';
import { LoginService } from './login.service'

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  constructor(
    @Inject(LoginStatusService) private LoginStatusService: LoginStatusService,
    @Inject(Router) private router: Router,
    @Inject(LoginService) private ls: LoginService) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
      //alert(this.LoginStatusService.isLoggedIn );
      if(this.LoginStatusService.isLoggedIn == false){
        alert("You must login to access")
        this.router.navigateByUrl("/")
      } 
      return this.LoginStatusService.isLoggedIn;

    }
}
