import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../core/interceptor';
import { PedidosComponent } from './page/pedidos.component';
export const routes: Routes = [
  {
    path: 'pedidos',
    component: PedidosComponent,
    data: { animation:'isLeft' },
    canActivate: [AuthGuard]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosPageRoutes {}
