import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginAuthService } from './shared/services/login-service/login-auth.service';

const accountModule = () => import('./acount/account.module').then(x => x.AccountModule);

const routes: Routes = [
  // { path: '', component: HomeComponent },
  // { path: 'account', loadChildren: accountModule },

  // // otherwise redirect to home
  // { path: '**', redirectTo: '' }
];

//, canActivate: [LoginAuthService]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
