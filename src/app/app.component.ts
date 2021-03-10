import { Component, Inject } from '@angular/core';
import { LoginStatusService } from './shared/services/login-service/login-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(@Inject(LoginStatusService) public LoginStatusService: LoginStatusService) { }

  title = 'UserApp';

  Logout() {
    this.LoginStatusService.isLoggedIn = false;
  }

}
