import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../material.module';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { EscreverComentarioComponent } from './escrever-comentario.component';
import { EditorModule } from '../../editor/editor/editor.module';

@NgModule({
  declarations: [EscreverComentarioComponent],
  imports: [
    MaterialModule,
    CommonModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EscreverComentarioComponent,
    EditorModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class EscreverComentarioModule { }
