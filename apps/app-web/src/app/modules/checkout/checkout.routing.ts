import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './page/checkout/checkout.component';
import { DadosComponent } from './page/dados/dados.component';
import { EnderecoComponent } from './page/endereco/endereco.component';
export const routes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent,
    pathMatch: 'full',
    data: { animation:'isLeft' },
    children: [
      {
        path: "dados",
        // canActivate: [AuthGuard],
        component: DadosComponent,
      },
      {
        path: "endereco",
        // canActivate: [AuthGuard],
        component: EnderecoComponent,
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutPageRoutes {}
