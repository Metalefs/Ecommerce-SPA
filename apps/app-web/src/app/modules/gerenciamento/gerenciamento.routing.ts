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


export const routes: Routes = [
  {
    path: "gerenciamento",
    component: GerenciamentoComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        // canActivate: [AuthGuard],
        component: EditarProdutoComponent,
      },
      {
        path: "orcamento",
        // canActivate: [AuthGuard],
        component: EditarOrcamentoComponent,
      },
      {
        path: 'categoria',
        // canActivate: [AuthGuard],
        component: EditarCategoriaComponent,
        pathMatch: 'full',
      },
      {
        path: 'cliente',
        // canActivate: [AuthGuard],
        component: EditarClientesComponent,
        pathMatch: 'full',
      },
      {
        path: 'sobre',
        // canActivate: [AuthGuard],
        component: EditarSobreComponent,
        pathMatch: 'full',
      },
      {
        path: 'informacaocontato',
        // canActivate: [AuthGuard],
        component: EditarInformacoesContatoComponent,
        pathMatch: 'full',
      },
      {
        path: 'servico',
        // canActivate: [AuthGuard],
        component: EditarServicoComponent,
        pathMatch: 'full',
      },
      {
        path: 'carrosel',
        // canActivate: [AuthGuard],
        component: EditarCarouselComponent,
        pathMatch: 'full',
      },
      {
        path: 'mensagem',
        // canActivate: [AuthGuard],
        component: EditarMensagemComponent,
        pathMatch: 'full',
      },
      {
        path: 'emails',
        // canActivate: [AuthGuard],
        component: EditarEmailsComponent,
        pathMatch: 'full',
      },
      {
        path: 'imagens',
        // canActivate: [AuthGuard],
        component: EditarImagemComponent,
        pathMatch: 'full',
      },
      {
        path: 'tema',
        // canActivate: [AuthGuard],
        component: EditarTemaComponent,
        pathMatch: 'full',
      }
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciamentoPageRoutes {}
