import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarRatingModule } from 'angular-star-rating';
import { CardComentarioComponent } from './card-comentario.component';
import { MaterialModule } from '../../material.module';

import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EscreverComentarioComponent } from '../escrever-comentario/escrever-comentario.component';
@NgModule({
  declarations: [CardComentarioComponent],
  imports: [
    MaterialModule,
    CommonModule,
    StarRatingModule.forRoot(),
    CKEditorModule,
    FormsModule,
    EscreverComentarioComponent,
    ReactiveFormsModule
  ],
  exports: [
    CardComentarioComponent,
    EscreverComentarioComponent,
    StarRatingModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class CardComentarioModule { }
