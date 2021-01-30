import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material.module';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import {ExibicaoPerfilComponent} from './exibicao-perfil.component'
@NgModule({
  declarations: [ExibicaoPerfilComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgxMaskModule,

    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ExibicaoPerfilComponent,
    MaterialModule,
    NgxMaskModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ExibicaoPerfilModule { }
