import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { SharedModule } from '../../shared/shared.module';


import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule
  ],
  exports:[
    FooterComponent,
    NgxPageScrollModule,
    NgxPageScrollCoreModule
  ]
})
export class FooterModule { }
