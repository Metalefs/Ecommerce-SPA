import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarRatingModule } from 'angular-star-rating';
import { CardComentarioProdutoComponent } from './card-comentario-produto.component';
import { MaterialModule } from '../../../../material.module';

import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EscreverComentarioModule } from '../../escrever-comentario/escrever-comentario.module';
@NgModule({
  declarations: [CardComentarioProdutoComponent],
  imports: [
    MaterialModule,
    CommonModule,
    StarRatingModule.forRoot(),
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    EscreverComentarioModule
  ],
  exports: [
    CardComentarioProdutoComponent,
    EscreverComentarioModule,
    StarRatingModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class CardComentarioProdutoModule { }
