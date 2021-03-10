import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AcountRoutingModule } from '../acount/acount-routing.module'
import { LayoutComponent } from './layout/layout.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'


@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AcountRoutingModule,
  ]
})
export class AccountModule { }
