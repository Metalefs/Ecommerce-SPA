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
import { ExibicaoPrecoProdutoModule } from '../exibicao-preco-produto/exibicao-preco-produto.module';
import { CardProdutoBtnComprarComponent } from './card-produto-btn-comprar/card-produto-btn-comprar.component';
import { CardProdutoBtnAdicionarCarrinhoComponent } from './card-produto-btn-adicionar-carrinho/card-produto-btn-adicionar-carrinho.component';
import { CardProdutoBtnAbrirModalComponent } from './card-produto-btn-abrir-modal/card-produto-btn-abrir-modal.component';
import { CardProdutoBtnFavoritarComponent } from './card-produto-btn-favoritar/card-produto-btn-favoritar.component';
import { CardProdutoBtnCompararComponent } from './card-produto-btn-comparar/card-produto-btn-comparar.component';
import { UiModule } from '@personalizados-lopes/ui';
import { CardProdutoImagemComponent } from './card-produto-imagem/card-produto-imagem.component';

@NgModule({
  declarations: [CardProdutoComponent, CardProdutoBtnComprarComponent,CardProdutoBtnAdicionarCarrinhoComponent,CardProdutoBtnAbrirModalComponent, CardProdutoBtnFavoritarComponent, CardProdutoBtnCompararComponent, CardProdutoImagemComponent],
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
    ExibicaoPrecoProdutoModule,
    UiModule
  ],
  exports: [
    CardProdutoComponent,
    SlideshowModule,
  ]
})
export class CardProdutoModule { }
