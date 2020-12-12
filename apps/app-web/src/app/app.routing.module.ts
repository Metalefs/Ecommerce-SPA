import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutModule } from './layout/layout.module';
import { GerenciamentoModule } from './modules/gerenciamento/gerenciamento.module';
import { LoginModule } from './modules/login/login.module';
import { UnderConstructionModule } from './modules/under-construction/under-construction.module';
import { InicioModule } from './modules/inicio/inicio.module';
import { EmpresaModule } from './modules/empresa/empresa.module';
import { ServicoModule } from './modules/servico/servico.module';
import { ShowcaseModule } from './modules/showcase/showcase.module';
import { ProdutosModule } from './modules/produtos/produtos.module';
import { OrcamentoModule } from './modules/orcamento/orcamento.module';
import { CheckoutModule } from './modules/checkout/checkout.module';
import { PerfilModule } from './modules/perfil/perfil.module';

import { PagenotfoundModule } from './modules/pagenotfound/pagenotfound.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: 'pagenotfound' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LayoutModule,
    LoginModule,
    GerenciamentoModule,
    UnderConstructionModule,
    InicioModule,
    EmpresaModule,
    ServicoModule,
    ShowcaseModule,
    ProdutosModule,
    OrcamentoModule,
    CheckoutModule,
    PerfilModule,
    PagenotfoundModule
  ],
  exports: [
    RouterModule,
    LayoutModule,
    LoginModule,
    GerenciamentoModule,
    UnderConstructionModule,
    InicioModule,
    EmpresaModule,
    ServicoModule,
    ShowcaseModule,
    ProdutosModule,
    OrcamentoModule,
    PerfilModule,
    PagenotfoundModule
  ],

})
export class AppRoutingModule { }
