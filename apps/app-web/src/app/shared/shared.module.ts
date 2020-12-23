import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from './material.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



import { DynamicFormModule } from './components/dynamic-form/dynamic-form.module';
import { LoginFormModule } from './components/login/login-form.module';
import { IconeWhatsappComponent } from './components/icone-whatsapp/icone-whatsapp.component';
import { CardProdutoModule } from './components/card-produto/card-produto.module';
import { CardClienteModule } from './components/card-cliente/card-cliente.module';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { VisualizacaoClientesModule } from './components/visualizacao-clientes/visualizacao-clientes.module';
import { SocialNetworkLinksComponent } from './components/social-network-links/social-network-links.component';
import { ScrolltopModule } from './components/scrolltop/scrolltop.module';

import { CountUpModule } from 'ngx-countup';
import { LoadingCubeComponent } from './components/loading-cube/loading-cube.component';
import { CloseBtnComponent } from './components/close-btn/close-btn.component';
import { CheckoutDisplayComponent } from './components/dialogs/checkout-display/checkout-display.component';
import { BotaoEsgotadoComponent } from './components/botao-esgotado/botao-esgotado.component';
import { CaixaObterEmailComponent } from './components/dialogs/caixa-obter-email/caixa-obter-email.component';
import { MercadopagoButtonComponent } from './components/mercadopago-button/mercadopago-button.component';

@NgModule({
  declarations: [IconeWhatsappComponent, SocialNetworkLinksComponent,TestimonialComponent, LoadingCubeComponent, CloseBtnComponent, CheckoutDisplayComponent, BotaoEsgotadoComponent, CaixaObterEmailComponent, MercadopagoButtonComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MaterialModule,
    DynamicFormModule,
    LoginFormModule,
    FormsModule,
    ReactiveFormsModule,
    CardProdutoModule,
    CardClienteModule,
    RouterModule,
    CKEditorModule,
    ScrolltopModule,
    CountUpModule,

    NgxMaskModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FontAwesomeModule,
    MaterialModule,
    DynamicFormModule,
    LoginFormModule,
    FormsModule,
    ReactiveFormsModule,
    CardProdutoModule,
    CardClienteModule,
    VisualizacaoClientesModule,
    IconeWhatsappComponent,
    SocialNetworkLinksComponent,
    RouterModule,
    TestimonialComponent,
    CKEditorModule,
    ScrolltopModule,
    CountUpModule,
    LoadingCubeComponent,
    NgxMaskModule,
    CloseBtnComponent,
    BotaoEsgotadoComponent,
    MercadopagoButtonComponent
  ]
})
export class SharedModule { }
