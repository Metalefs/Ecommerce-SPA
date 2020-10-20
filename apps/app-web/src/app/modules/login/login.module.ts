import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './page/login.component';

import { LoginPageRoutes } from './login.routing';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginPageRoutes,
    SharedModule
  ]
})
export class LoginModule { }
