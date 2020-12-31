import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarRatingModule } from 'angular-star-rating';
import { ExibirComentarioProdutoComponent } from './exibir-comentario-produto.component';
import { CardComentarioProdutoModule } from '../card-comentario-produto/card-comentario-produto.module';

@NgModule({
  declarations: [ExibirComentarioProdutoComponent],
  imports: [
    CommonModule,
    CardComentarioProdutoModule,
    StarRatingModule.forRoot(),
  ],
  exports: [
    ExibirComentarioProdutoComponent,
    CardComentarioProdutoModule,
    StarRatingModule
  ]
})

export class ExibirComentarioProdutoModule { }
