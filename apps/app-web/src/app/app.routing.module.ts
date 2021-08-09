import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutModule } from './components/layout/layout.module';
// import { UnderConstructionModule } from './modules/under-construction/under-construction.module';

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
    path: 'pagenotfound',
    loadChildren: () => import('./modules/pagenotfound/pagenotfound.module').then(m => m.PagenotfoundModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'gerenciamento',
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
    RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  }),
    LayoutModule,
  ],
  exports: [
    RouterModule,
    LayoutModule,
  ],

})
export class AppRoutingModule { }
