import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarRatingModule } from 'angular-star-rating';
import { ExibirComentarioComponent } from './exibir-comentario.component';
import { CardComentarioModule } from '../card-comentario/card-comentario.module';
import { CardComentarioProdutoModule } from '../card-comentario-produto/card-comentario-produto.module';

@NgModule({
  declarations: [ExibirComentarioComponent],
  imports: [
    CommonModule,
    CardComentarioModule,
    CardComentarioProdutoModule,
    StarRatingModule.forRoot(),
  ],
  exports: [
    ExibirComentarioComponent,
    CardComentarioModule,
    CardComentarioProdutoModule,
    StarRatingModule
  ]
})

export class ExibirComentarioModule { }
