import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizacaoClientesComponent } from './visualizacao-clientes.component';
import { CardClienteModule } from '../card-cliente/card-cliente.module';


import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
@NgModule({
  declarations: [VisualizacaoClientesComponent],
  imports: [
    CommonModule,
    CardClienteModule,
    SwiperModule
  ],
  exports:[CardClienteModule,VisualizacaoClientesComponent,SwiperModule]
})
export class VisualizacaoClientesModule { }
