import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarRatingModule } from 'angular-star-rating';
import { ExibirComentarioComponent } from './exibir-comentario.component';
import { CardComentarioModule } from '../card-comentario/card-comentario.module';

@NgModule({
  declarations: [ExibirComentarioComponent],
  imports: [
    CommonModule,
    CardComentarioModule,
    StarRatingModule.forRoot(),
  ],
  exports: [
    ExibirComentarioComponent,
    CardComentarioModule,
    StarRatingModule
  ]
})

export class ExibirComentarioModule { }
