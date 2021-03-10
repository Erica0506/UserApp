import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";

//import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './acount/login/login.component';
import { RegisterComponent } from './acount/register/register.component';

import { LoginService} from './shared/services/login-service/login.service';
import { LoginStatusService } from './shared/services/login-service/login-status.service';
import { LoginAuthService } from './shared/services/login-service/login-auth.service';
import { CanDeactivateGuardService } from './shared/services/registerservice/can-deactivate-guard.service';
import { UsersService } from './shared/services/user/users.service'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';
//import { LayoutComponent } from './acount/layout/layout.component';

var myroutes: Routes = [
  { path: "", component: LoginComponent},
  { path: "login", component: LoginComponent},
  { path: "home", component: HomeComponent, canActivate: [LoginAuthService]},
  { path: "register", component: RegisterComponent, canDeactivate: [CanDeactivateGuardService]},
]
var myroutes2 = RouterModule.forRoot(myroutes)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    //LayoutComponent
   
  ],
  imports: [
    BrowserModule,
    //AppRoutingModule, 
    RouterModule, 
    myroutes2,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [
    LoginService, 
    LoginStatusService, 
    LoginAuthService,
    CanDeactivateGuardService,
    UsersService,
    { provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
