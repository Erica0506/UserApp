import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,  Router } from '@angular/router';
import { LoginStatusService } from './login-status.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  constructor(@Inject(LoginStatusService) private LoginStatusService: LoginStatusService,
    @Inject(Router) private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
      //alert(this.LoginStatusService.isLoggedIn );
      if(this.LoginStatusService.isLoggedIn == false){
        alert("You must login to access")
        this.router.navigateByUrl("/")
      }
    return this.LoginStatusService.isLoggedIn;
    }
}
