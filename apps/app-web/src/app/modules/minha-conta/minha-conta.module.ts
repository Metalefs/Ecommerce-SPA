import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinhaContaComponent } from './page/minha-conta/minha-conta.component';
import { PerfilModule } from './page/perfil/perfil.module';
import { PedidosModule } from './page/pedidos/pedidos.module';

import { SharedModule } from '../../shared/shared.module';
import { MinhaContaPageRoutes } from './minha-conta.routing';
import { SidebarComponent } from './page/minha-conta/sidebar/sidebar.component';

@NgModule({
  declarations: [MinhaContaComponent, SidebarComponent],
  imports: [
    CommonModule,
    SharedModule,
    PerfilModule,
    PedidosModule,
    MinhaContaPageRoutes
  ],
  exports:[
    PerfilModule,
    PedidosModule,
  ]
})
export class MinhaContaModule { }
