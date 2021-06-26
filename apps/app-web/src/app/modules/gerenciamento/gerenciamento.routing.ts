import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/guard/auth.guard';
import { EditarCategoriaComponent } from './page/editar-categoria/editar-categoria.component';
import { EditarClientesComponent } from './page/editar-clientes/editar-clientes.component';
import { EditarEmailsComponent } from './page/editar-emails/editar-emails.component';
import { EditarImagemComponent } from './page/editar-imagem/editar-imagem.component';
import { EditarInformacoesContatoComponent } from './page/editar-infocontato/editar-informacoescontato.component';
import { EditarMensagemComponent } from './page/editar-mensagem/editar-mensagem.component';
import { EditarProdutoComponent } from './page/editar-produto/editar-produto.component';
import { EditarServicoComponent } from './page/editar-servico/editar-servico.component';
import { EditarSobreComponent } from './page/editar-sobre/editar-sobre.component';
import { EditarTemaComponent } from './page/editar-tema/editar-tema.component';
import { EditarCarouselComponent } from './page/editar-carousel/editar-carousel.component';
import { GerenciamentoComponent } from './page/gerenciamento.component';
import { EditarOrcamentoComponent } from './page/editar-orcamento/editar-orcamento.component';
import { EditarIntegracoesComponent } from './page/editar-integracoes/editar-integracoes.component';
import { EditarBlogComponent } from './page/editar-blog/editar-blog.component';
import { OrcamentoDetailComponent } from './page/editar-orcamento/orcamento-detail/orcamento-detail.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { EditarEstampaComponent } from './page/editar-estampa/editar-estampa.component';


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
        path: 'categoria',
        // canActivate: [AuthGuard],
        component: EditarCategoriaComponent,
        pathMatch: 'full',
        data: { animation:'isRight', title:'Gerenciamento - categoria' }
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
        path: 'sobre',
        // canActivate: [AuthGuard],
        component: EditarSobreComponent,
        pathMatch: 'full',
        data: { animation:'isRight', title:'Gerenciamento - sobre' }
      },
      {
        path: 'informacaocontato',
        // canActivate: [AuthGuard],
        component: EditarInformacoesContatoComponent,
        pathMatch: 'full',
        data: { animation:'isRight', title:'Gerenciamento - informacaocontato' }
      },
      {
        path: 'servico',
        // canActivate: [AuthGuard],
        component: EditarServicoComponent,
        pathMatch: 'full',
        data: { animation:'isRight', title:'Gerenciamento - servico' }
      },
      {
        path: 'carrosel',
        // canActivate: [AuthGuard],
        component: EditarCarouselComponent,
        pathMatch: 'full',
        data: { animation:'isRight', title:'Gerenciamento - carrosel' }
      },
      {
        path: 'mensagem',
        // canActivate: [AuthGuard],
        component: EditarMensagemComponent,
        pathMatch: 'full',
        data: { animation:'isRight', title:'Gerenciamento - mensagem' }
      },
      {
        path: 'emails',
        // canActivate: [AuthGuard],
        component: EditarEmailsComponent,
        pathMatch: 'full',
        data: { animation:'isRight', title:'Gerenciamento - emails' }
      },
      {
        path: 'imagens',
        // canActivate: [AuthGuard],
        component: EditarImagemComponent,
        pathMatch: 'full',
        data: { animation:'isRight', title:'Gerenciamento - imagens' }
      },
      {
        path: 'integracoes',
        // canActivate: [AuthGuard],
        component: EditarIntegracoesComponent,
        pathMatch: 'full',
        data: { animation:'isRight', title:'Gerenciamento - integracoes' }
      },
      {
        path: 'estampa',
        // canActivate: [AuthGuard],
        component: EditarEstampaComponent,
        pathMatch: 'full',
        data: { animation:'isRight', title:'Gerenciamento - integracoes' }
      },
      {
        path: 'tema',
        // canActivate: [AuthGuard],
        component: EditarTemaComponent,
        pathMatch: 'full',
        data: { animation:'isRight', title:'Gerenciamento - tema' }
      }
    ],

  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciamentoPageRoutes {}
