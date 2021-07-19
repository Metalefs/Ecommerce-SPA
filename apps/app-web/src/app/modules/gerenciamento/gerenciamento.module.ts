import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';

import { CKEditorModule } from 'ckeditor4-angular';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatTableFilterModule } from 'mat-table-filter';

import { SharedModule } from '../../shared/shared.module';

import { GerenciamentoComponent } from './page/gerenciamento.component';
import { GerenciamentoPageRoutes } from './gerenciamento.routing';

import { EditarSobreComponent } from './page/editar-configuracoes-empresa/components/editar-sobre/editar-sobre.component';
import { EditarInformacoesContatoComponent } from './page/editar-configuracoes-empresa/components/editar-infocontato/editar-informacoescontato.component';
import { EditarTemaComponent } from './page/editar-configuracoes-empresa/components/editar-tema/editar-tema.component';
import { EditarServicoComponent } from './page/editar-configuracoes-empresa/components/editar-servico/editar-servico.component';

import { EditarClientesComponent } from './page/editar-clientes/editar-clientes.component';
import { CriarClienteDialogComponent } from './page/editar-clientes/DialogComponents/criar-cliente-dialog/criar-cliente-dialog.component';

import { DashboardComponent } from './page/dashboard/dashboard.component';

import { EditarProdutoModule } from './page/editar-produto/editar-produto.module';
import { EdicaoCardBlogComponent } from './page/editar-blog/edicao-card-blog/edicao-card-blog.component';
import { EdicaoCardClienteComponent } from './page/editar-clientes/components/edicao-card-cliente/edicao-card-cliente.component';
import { EditarMensagemComponent } from './page/editar-configuracoes-empresa/components/editar-mensagem/editar-mensagem.component';
import { EditarEmailsComponent } from './page/editar-emails/editar-emails.component';

import { EditarImagemComponent } from './page/editar-imagem/editar-imagem.component';
import { EditarCarouselComponent } from './page/editar-imagem/components/editar-carousel/editar-carousel.component';
import { EditarItemCarouselComponent } from './page/editar-imagem/components/editar-carousel/editar-item-carousel/editar-item-carousel.component';
import { CriarItemCarouselDialogComponent } from './page/editar-imagem/components/editar-carousel/dialogComponents/criar-item-carousel-dialog/criar-item-carousel-dialog.component';
import { EditarCarouselDialogComponent } from './page/editar-imagem/components/editar-carousel/dialogComponents/editar-carousel-dialog/editar-carousel-dialog.component';

import { EditarPedidoComponent } from './page/editar-pedido/editar-pedido.component';
import { EditarBlogComponent } from './page/editar-blog/editar-blog.component';
import { CriarPostComponent } from './page/editar-blog/dialogs/criar-post/criar-post.component';
import { EditarPostComponent } from './page/editar-blog/dialogs/editar-post/editar-post.component';

import { EditarIntegracoesComponent } from './page/editar-configuracoes-empresa/components/editar-integracoes/editar-integracoes.component';
import { EditarIntegracaoDialogComponent } from './page/editar-configuracoes-empresa/components/editar-integracoes/dialogs/editar-integracao-dialog/editar-integracao-dialog.component';
import { PedidoDetailComponent } from './page/editar-pedido/pedido-detail/pedido-detail.component';
import { EditorModule } from '../../shared/components/editor/editor/editor.module';

import { CardProdutoModule } from '../../shared/components/card-produto/card-produto.module';
import { EditarConfiguracoesEmpresaComponent } from './page/editar-configuracoes-empresa/editar-configuracoes-empresa.component';

@NgModule({
  declarations: [
    GerenciamentoComponent,
    EditarSobreComponent,
    EditarInformacoesContatoComponent,
    EditarTemaComponent,
    EditarServicoComponent,
    EditarMensagemComponent,
    EditarIntegracoesComponent,
    EditarIntegracaoDialogComponent,
    DashboardComponent,
    EdicaoCardBlogComponent,
    EditarClientesComponent,
    EdicaoCardClienteComponent,
    CriarClienteDialogComponent,
    CriarItemCarouselDialogComponent,
    CriarPostComponent,
    EditarEmailsComponent,
    EditarImagemComponent,
    EditarCarouselComponent,
    EditarItemCarouselComponent,
    EditarCarouselDialogComponent,
    EditarPedidoComponent,
    PedidoDetailComponent,
    EditarBlogComponent,
    EditarPostComponent,
    EditarConfiguracoesEmpresaComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CardProdutoModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CKEditorModule,
    NgxSliderModule,
    LayoutModule,
    EditorModule,
    MatTableFilterModule,
    EditarProdutoModule,
    GerenciamentoPageRoutes,
  ],
  exports: [
    GerenciamentoComponent,
    EditarProdutoModule,
    EditarSobreComponent,
    EditarInformacoesContatoComponent,
    EditarTemaComponent,
    EditarServicoComponent,
    EditarMensagemComponent,
    CriarPostComponent,
    EditarPostComponent,
    CriarClienteDialogComponent,
    EditarClientesComponent,
    EditarBlogComponent,
    EditarPedidoComponent,
    PedidoDetailComponent,
    SharedModule,
    CardProdutoModule,
    EditorModule,
    CKEditorModule,
    NgxSliderModule,
    MatTableFilterModule
  ]
})
export class GerenciamentoModule { }
