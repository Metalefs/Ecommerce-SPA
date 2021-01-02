import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './page/checkout/checkout.component';
import { ConfirmacaoComponent } from './page/confirmacao/confirmacao.component';
import { DadosComponent } from './page/dados/dados.component';
import { EnderecoComponent } from './page/endereco/endereco.component';
import { ResultadoPagamentoComponent } from './page/resultado-pagamento/resultado-pagamento.component';
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
        data: { animation:'isLeft' },
      },
      {
        path: "dados",
        // canActivate: [AuthGuard],
        component: DadosComponent,
        data: { animation:'isLeft' },
      },
      {
        path: "endereco",
        // canActivate: [AuthGuard],
        component: EnderecoComponent,
        data: { animation:'isLeft' },
      },
      {
        path: "success",
        // canActivate: [AuthGuard],
        component: ResultadoPagamentoComponent,
        data: { animation:'isLeft' },
      },
      {
        path: "failure",
        // canActivate: [AuthGuard],
        component: ResultadoPagamentoComponent,
        data: { animation:'isLeft' },
      },
      {
        path: "pending",
        // canActivate: [AuthGuard],
        component: ResultadoPagamentoComponent,
        data: { animation:'isLeft' },
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutPageRoutes {}
