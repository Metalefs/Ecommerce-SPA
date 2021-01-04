import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { Routes, RouterModule } from '@angular/router';

import { CardBlogComponent } from './card-blog.component'
@NgModule({
  declarations: [CardBlogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgxPageScrollModule,
    RouterModule
  ],
  exports:[
    CardBlogComponent,
    MaterialModule
  ]
})
export class CardBlogModule { }
