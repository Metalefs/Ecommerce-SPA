import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { SharedModule } from '../../../shared/shared.module';

import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule

  ],
  exports:[
    SharedModule,
    NavbarComponent,
    NgxPageScrollCoreModule,
    NgxPageScrollCoreModule

  ]
})
export class NavbarModule { }
