import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';

import { SharedModule } from '../../../shared/shared.module';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { MegaMenuComponent } from './components/mega-menu/mega-menu.component';
@NgModule({
  declarations: [HeaderComponent, MegaMenuComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule
  ],
  exports:[
    HeaderComponent,
    NgxPageScrollModule,
    NgxPageScrollCoreModule
  ]
})
export class HeaderModule { }
