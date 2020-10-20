import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { ContentLayoutComponent } from './content-layout/page/content-layout.component';
import { HeaderModule } from './header/header.module';
import { NavbarModule } from './navbar/navbar.module';
import { FooterModule } from './footer/footer.module';

@NgModule({
  declarations: [
    ContentLayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HeaderModule,
    FooterModule,
    NavbarModule,
    RouterModule.forChild([])
  ],
  exports:[
    ContentLayoutComponent,
    FooterModule,
    HeaderModule,
    NavbarModule
  ]
})
export class LayoutModule { }
