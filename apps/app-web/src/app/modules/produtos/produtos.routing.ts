import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExibicaoProdutoComponent } from './page/components/exibicao-produto/exibicao-produto.component';
import { ProdutosComponent } from './page/produtos.component';

export const routes: Routes = [
  {
    path: '',
    component: ProdutosComponent,
    data: { animation:'', title: 'Produtos' }
  },
  {
    path: ':id',
    component: ExibicaoProdutoComponent,
    pathMatch: 'full',
    data: { animation:'isRight', title: 'Produto -' }
  },
  {
    path: ':id/:orcamentoId',
    component: ExibicaoProdutoComponent,
    pathMatch: 'full',
    data: { animation:'isRight', title: 'Produto -' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosPageRoutes {}
