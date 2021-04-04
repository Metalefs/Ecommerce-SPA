import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/interceptor';
import { PerfilComponent } from './page/perfil/page/perfil.component';
import { PedidosComponent } from './page/pedidos/page/pedidos.component';
import { MinhaContaComponent } from './page/minha-conta/minha-conta.component';
export const routes: Routes = [
  {
    path: 'pessoal',
    component: MinhaContaComponent,
    data: { animation:'isLeft' },
    canActivate: [AuthGuard],
    children:[
      {
        path: '',
        component: PerfilComponent,
        data: { animation:'isLeft', title: 'Perfil' }
      },
      {
        path: 'pedidos',
        component: PedidosComponent,
        data: { animation:'isLeft', title: 'Meus pedidos' }
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinhaContaPageRoutes {}
