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
import { UserListComponent } from './user-list/user-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UserslistComponent } from './userslist/userslist.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
//import { LayoutComponent } from './acount/layout/layout.component';

var myroutes: Routes = [
  { path: "", component: LoginComponent},
  { path: "login", component: LoginComponent},
  { path: "home", component: HomeComponent, canActivate: [LoginAuthService]},
  { path: "users", component: UserslistComponent , canActivate: [LoginAuthService]},
  { path: "register", component: RegisterComponent, canDeactivate: [CanDeactivateGuardService]},
]
var myroutes2 = RouterModule.forRoot(myroutes)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    UserslistComponent,
    DialogBoxComponent,
    //LayoutComponent
   
  ],
  imports: [
    BrowserModule,
    //AppRoutingModule, 
    RouterModule, 
    myroutes2,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule ,
    MatDialogModule,
    MatButtonModule
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
