import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './page/checkout/checkout.component';
import { ConfirmacaoComponent } from './page/confirmacao/confirmacao.component';
import { DadosComponent } from './page/dados/dados.component';
import { EnderecoComponent } from './page/endereco/endereco.component';
import { ResultadoPagamentoComponent } from './page/resultado-pagamento/resultado-pagamento.component';
export const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    data: { animation:'checkout' },
    children: [
      {
        path: "",
        // canActivate: [AuthGuard],
        component: ConfirmacaoComponent,
        data: { animation:'isLeft', title: 'Checkout' },
      },
      {
        path: "dados",
        // canActivate: [AuthGuard],
        component: DadosComponent,
        data: { animation:'isLeft', title: 'Checkout - Dados pessoais' },
      },
      {
        path: "endereco",
        // canActivate: [AuthGuard],
        component: EnderecoComponent,
        data: { animation:'isLeft', title: 'Checkout - Endereço de entrega' },
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
