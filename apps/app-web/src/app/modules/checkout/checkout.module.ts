import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CheckoutComponent } from './page/checkout/checkout.component';
import { ConfirmacaoComponent } from './page/confirmacao/confirmacao.component';
import { DadosComponent } from './page/dados/dados.component';
import { SharedModule } from '../../shared/shared.module';
import { CheckoutPageRoutes } from './checkout.routing';
import { EnderecoComponent } from './page/endereco/endereco.component';

import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './page/payment/payment.component';
@NgModule({
  declarations: [CheckoutComponent,ConfirmacaoComponent,DadosComponent, EnderecoComponent, PaymentComponent],
  imports: [
    CheckoutPageRoutes,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class CheckoutModule { }
