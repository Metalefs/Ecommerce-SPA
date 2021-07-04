import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/guard/auth.guard';
import { EditarClientesComponent } from './page/editar-clientes/editar-clientes.component';
import { EditarEmailsComponent } from './page/editar-emails/editar-emails.component';
import { EditarImagemComponent } from './page/editar-imagem/editar-imagem.component';
import { EditarProdutoComponent } from './page/editar-produto/editar-produto.component';
import { GerenciamentoComponent } from './page/gerenciamento.component';
import { EditarOrcamentoComponent } from './page/editar-orcamento/editar-orcamento.component';
import { EditarBlogComponent } from './page/editar-blog/editar-blog.component';
import { OrcamentoDetailComponent } from './page/editar-orcamento/orcamento-detail/orcamento-detail.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { EditarConfiguracoesEmpresaComponent } from './page/editar-configuracoes-empresa/editar-configuracoes-empresa.component';


export const routes: Routes = [
  {
    path: 'app',
    component: GerenciamentoComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        // pathMatch: 'full',
        component: DashboardComponent,
        data: { animation:'isRight', }
      },
      {
        path: "configuracoes",
        // pathMatch: 'full',
        component: EditarConfiguracoesEmpresaComponent,
        data: { animation:'isRight', title:'Gerenciamento - Configurações' }
      },
      {
        path: "produtos",
        // pathMatch: 'full',
        component: EditarProdutoComponent,
        data: { animation:'isRight', title:'Gerenciamento - produtos'}
      },
      {
        path: "pedidos",
        // pathMatch: 'full',
        component: EditarOrcamentoComponent,
        data: { animation:'isRight', title:'Gerenciamento - pedidos'}
      },
      {
        path: "pedidos/:id",
        pathMatch: 'full',
        component: OrcamentoDetailComponent,
        data: { animation:'isRight', title:'Gerenciamento - pedido'}
      },
      {
        path: 'cliente',
        // canActivate: [AuthGuard],
        component: EditarClientesComponent,
        pathMatch: 'full',
        data: { animation:'isRight', title:'Gerenciamento - cliente' }
      },
      {
        path: 'blog',
        // canActivate: [AuthGuard],
        component: EditarBlogComponent,
        pathMatch: 'full',
        data: { animation:'isRight', title:'Gerenciamento - blog' }
      },
      {
        path: 'imagens',
        // canActivate: [AuthGuard],
        component: EditarImagemComponent,
        pathMatch: 'full',
        data: { animation:'isRight', title:'Gerenciamento - imagens' }
      },
      {
        path: 'emails',
        // canActivate: [AuthGuard],
        component: EditarEmailsComponent,
        pathMatch: 'full',
        data: { animation:'isRight', title:'Gerenciamento - emails' }
      },
    ],

  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciamentoPageRoutes {}
