import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { LoginStatusService } from './shared/services/login-service/login-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'UserApp';
  constructor(@Inject(LoginStatusService) public LoginStatusService: LoginStatusService,
              @Inject(Router) private router: Router,
              @Inject(ActivatedRoute) private route: ActivatedRoute){

              }
  
  Logout() {
    this.LoginStatusService.isLoggedIn = false;
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'login';
    this.router.navigateByUrl(returnUrl);
    localStorage.removeItem('user');
  }


  ngOnInit(){
    let user= localStorage.getItem("user")
    if(user){
      this.LoginStatusService.isLoggedIn = true;
    }
  }

}
