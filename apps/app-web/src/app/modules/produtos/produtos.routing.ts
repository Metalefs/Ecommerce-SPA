import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExibicaoProdutoComponent } from './page/exibicao-produto/exibicao-produto.component';
import { ProdutosComponent } from './page/produtos.component';

export const routes: Routes = [
  {
    path: '',
    component: ProdutosComponent,
    data: { animation:'isRight', title: 'Produtos' }
  },
  {
    path: ':id',
    component: ExibicaoProdutoComponent,
    pathMatch: 'full',
    data: { animation:'isUp', title: 'Produto -' }
  },
  {
    path: ':id/:orcamentoId',
    component: ExibicaoProdutoComponent,
    pathMatch: 'full',
    data: { title: 'Produto -' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosPageRoutes {}
