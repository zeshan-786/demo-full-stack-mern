import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from './authetication/auth.guard';

import { Login2Component } from './main/authentication/login-2/login-2.component';
import { Register2Component } from './main/authentication/register-2/register-2.component';
import { ContactsComponent } from './main/entities/contacts/contacts.component';
import { SampleComponent } from './main/sample/sample.component';

const routes: Routes = [
  {
    path: 'sample',
    pathMatch: 'full',
    component: SampleComponent,
    canActivate: [AuthGuard]
    
  },
  {
    path: 'admins',
    pathMatch: 'full',
    component: ContactsComponent,
    canActivate: [AuthGuard]
    
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
