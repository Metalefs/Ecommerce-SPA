import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { Routes, RouterModule } from '@angular/router';
import {CardPedidoComponent} from './card-pedido.component';


@NgModule({
  declarations: [CardPedidoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgxPageScrollModule,
    RouterModule
  ],
  exports:[
    CardPedidoComponent,
    MaterialModule
  ]
})
export class CardPedidoModule { }
