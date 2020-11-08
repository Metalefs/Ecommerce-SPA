import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './page/checkout/checkout.component';
import { ConfirmacaoComponent } from './page/confirmacao/confirmacao.component';
import { DadosComponent } from './page/dados/dados.component';
import { EnderecoComponent } from './page/endereco/endereco.component';
export const routes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent,
    data: { animation:'isLeft' },
    children: [
      {
        path: "",
        // canActivate: [AuthGuard],
        component: ConfirmacaoComponent,
      },
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
