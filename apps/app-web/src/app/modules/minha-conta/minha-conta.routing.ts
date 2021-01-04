import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/interceptor';
import { PerfilComponent } from './page/perfil/page/perfil.component';
import { PedidosComponent } from './page/pedidos/page/pedidos.component';
import { MinhaContaComponent } from './page/minha-conta/minha-conta.component';
export const routes: Routes = [
  {
    path: 'minha-conta',
    component: MinhaContaComponent,
    data: { animation:'isLeft' },
    canActivate: [AuthGuard],
    children:[
      {
        path: 'perfil',
        component: PerfilComponent,
        data: { animation:'isLeft' }
      },
      {
        path: 'pedidos',
        component: PedidosComponent,
        data: { animation:'isLeft' }
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinhaContaPageRoutes {}
