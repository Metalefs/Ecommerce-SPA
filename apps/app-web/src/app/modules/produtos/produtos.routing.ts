import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExibicaoProdutoComponent } from './page/exibicao-produto/exibicao-produto.component';
import { ProdutosComponent } from './page/produtos.component';

export const routes: Routes = [
  {
    path: 'produtos',
    component: ProdutosComponent,
    pathMatch: 'full',
    data: { animation:'isRight' }
  },
  {
    path: 'produtos/:id',
    component: ExibicaoProdutoComponent,
    pathMatch: 'full',
    data: { animation:'flip' }
  },
  {
    path: 'produtos/:id/:orcamentoId',
    component: ExibicaoProdutoComponent,
    pathMatch: 'full',
    // data: { animation:'isRight' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosPageRoutes {}
