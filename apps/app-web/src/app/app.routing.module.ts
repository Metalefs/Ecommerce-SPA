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
import { BlogModule } from './modules/blog/blog.module';
import { MinhaContaModule } from './modules/minha-conta/minha-conta.module';

import { PagenotfoundModule } from './modules/pagenotfound/pagenotfound.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./modules/inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'gerenciamento/app',
    loadChildren: () => import('./modules/gerenciamento/gerenciamento.module').then(m => m.GerenciamentoModule)
  },
  {
    path: 'empresa',
    loadChildren: () => import('./modules/empresa/empresa.module').then(m => m.EmpresaModule)
  },
  {
    path: 'servicos',
    loadChildren: () => import('./modules/servico/servico.module').then(m => m.ServicoModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./modules/produtos/produtos.module').then(m => m.ProdutosModule)
  },
  {
    path: 'orcamento',
    loadChildren: () => import('./modules/orcamento/orcamento.module').then(m => m.OrcamentoModule)
  },
  {
    path: 'showcase',
    loadChildren: () => import('./modules/showcase/showcase.module').then(m => m.ShowcaseModule)
  },
  {
    path: 'minha-conta',
    loadChildren: () => import('./modules/minha-conta/minha-conta.module').then(m => m.MinhaContaModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./modules/checkout/checkout.module').then(m => m.CheckoutModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule)
  },
  { path: '**', redirectTo: 'pagenotfound' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LayoutModule,
    UnderConstructionModule,
    PagenotfoundModule
  ],
  exports: [
    RouterModule,
    LayoutModule,
    UnderConstructionModule,
    PagenotfoundModule
  ],

})
export class AppRoutingModule { }
