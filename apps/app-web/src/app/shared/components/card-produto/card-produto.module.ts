import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CardProdutoComponent } from './card-produto.component';

import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { StarRatingModule } from 'angular-star-rating';
import { GalleryModule } from 'ng-gallery';
import { SwiperModule } from 'ngx-swiper-wrapper';


import { SlideshowModule } from 'ng-simple-slideshow';

@NgModule({
  declarations: [CardProdutoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule,
    SwiperModule,
    StarRatingModule.forRoot(),
    GalleryModule,
    SlideshowModule,
  ],
  exports: [
    CardProdutoComponent,
    SlideshowModule,
  ]
})
export class CardProdutoModule { }
