import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrolltopComponent } from './scrolltop.component';

import { MatIconModule } from '@angular/material/icon';

import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

@NgModule({
  declarations: [ScrolltopComponent],
  imports: [
    CommonModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule,
    MatIconModule
  ],
  exports: [
    ScrolltopComponent
  ]
})
export class ScrolltopModule { }
