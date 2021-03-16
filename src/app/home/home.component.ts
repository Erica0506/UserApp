import { Component, Inject} from '@angular/core';
// import { LoginStatusService } from '../shared/services/login-service/login-status.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  constructor(){}
  //constructor(@Inject(LoginStatusService) public LoginStatusService: LoginStatusService){}
  
  // Logout() {
  //   this.LoginStatusService.isLoggedIn = false;
  //   // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'login';
  //   // this.router.navigateByUrl(returnUrl);
  // }

}
