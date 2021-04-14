import { Component, Inject} from '@angular/core';
import { UsersService } from '../shared/services/user/users.service';
// import { LoginStatusService } from '../shared/services/login-service/login-status.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  users: []=[]
  constructor(@Inject(UsersService) private UsersService: UsersService){}
  getUser(){
    this.UsersService.getUsers().then(this.onPromiseSuccess, this.onPromiseError);
  }
  onPromiseSuccess = (response: any) => {
    this.users = response;
  
    console.log(this.users);
  }

  onPromiseError = () => {
    alert("error");
  }
  //constructor(@Inject(LoginStatusService) public LoginStatusService: LoginStatusService){}
  
  // Logout() {
  //   this.LoginStatusService.isLoggedIn = false;
  //   // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'login';
  //   // this.router.navigateByUrl(returnUrl);
  // }

}
