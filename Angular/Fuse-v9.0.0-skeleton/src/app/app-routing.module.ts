import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { Login2Component } from './main/authentication/login-2/login-2.component';
import { Register2Component } from './main/authentication/register-2/register-2.component';

const routes: Routes = [
  {
    path: 'sample',
    pathMatch: 'full',
    redirectTo: 'sample'
  },
  {
    path: 'login',
    component: Login2Component
  },
  {
    path: 'register',
    component: Register2Component
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    TranslateModule.forRoot(),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
