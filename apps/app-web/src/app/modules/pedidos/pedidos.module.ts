import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosPageRoutes } from './pedidos.routing';
import { PedidosComponent } from './page/pedidos.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [PedidosComponent],
  imports: [
    CommonModule,
    PedidosPageRoutes,
    SharedModule
  ]
})
export class PedidosModule { }
