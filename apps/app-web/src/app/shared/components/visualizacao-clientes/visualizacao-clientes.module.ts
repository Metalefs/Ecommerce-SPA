import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizacaoClientesComponent } from './visualizacao-clientes.component';
import { CardClienteModule } from '../card-cliente/card-cliente.module';


@NgModule({
  declarations: [VisualizacaoClientesComponent],
  imports: [
    CommonModule,
    CardClienteModule
  ],
  exports:[CardClienteModule,VisualizacaoClientesComponent]
})
export class VisualizacaoClientesModule { }
