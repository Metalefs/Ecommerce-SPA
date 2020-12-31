import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';

import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EscreverComentarioComponent } from './escrever-comentario.component';
@NgModule({
  declarations: [EscreverComentarioComponent],
  imports: [
    MaterialModule,
    CommonModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EscreverComentarioComponent,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class EscreverComentarioModule { }
