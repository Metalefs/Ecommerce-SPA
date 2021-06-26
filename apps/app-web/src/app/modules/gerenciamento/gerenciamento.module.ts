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
import { EditarSobreComponent } from './page/editar-sobre/editar-sobre.component';
import { EditarInformacoesContatoComponent } from './page/editar-infocontato/editar-informacoescontato.component';

import { GerenciamentoPageRoutes } from './gerenciamento.routing';
import { EditarTemaComponent } from './page/editar-tema/editar-tema.component';
import { EditarServicoComponent } from './page/editar-servico/editar-servico.component';
import { EditarCategoriaComponent } from './page/editar-categoria/editar-categoria.component';
import { EditarClientesComponent } from './page/editar-clientes/editar-clientes.component';
import { CriarCategoriaDialogComponent } from './page/editar-categoria/DialogComponents/criar-dialog/criar-dialog.component';
import { CriarClienteDialogComponent } from './page/editar-clientes/DialogComponents/criar-cliente-dialog/criar-cliente-dialog.component';

import { DashboardComponent } from './page/dashboard/dashboard.component';

import { EditarProdutoModule } from './page/editar-produto/editar-produto.module';
import { EdicaoCardBlogComponent } from './page/editar-blog/edicao-card-blog/edicao-card-blog.component';
import { EdicaoCardClienteComponent } from './page/editar-clientes/components/edicao-card-cliente/edicao-card-cliente.component';
import { EditarMensagemComponent } from './page/editar-mensagem/editar-mensagem.component';
import { EditarEmailsComponent } from './page/editar-emails/editar-emails.component';
import { EditarImagemComponent } from './page/editar-imagem/editar-imagem.component';
import { EditarCarouselComponent } from './page/editar-carousel/editar-carousel.component';
import { EditarItemCarouselComponent } from './page/editar-carousel/editar-item-carousel/editar-item-carousel.component';
import { CriarItemCarouselDialogComponent } from './page/editar-carousel/dialogComponents/criar-item-carousel-dialog/criar-item-carousel-dialog.component';
import { EditarCarouselDialogComponent } from './page/editar-carousel/dialogComponents/editar-carousel-dialog/editar-carousel-dialog.component';
import { EditarOrcamentoComponent } from './page/editar-orcamento/editar-orcamento.component';
import { EditarBlogComponent } from './page/editar-blog/editar-blog.component';
import { CriarPostComponent } from './page/editar-blog/dialogs/criar-post/criar-post.component';
import { EditarPostComponent } from './page/editar-blog/dialogs/editar-post/editar-post.component';

import { EditarIntegracoesComponent } from './page/editar-integracoes/editar-integracoes.component';
import { EditarIntegracaoDialogComponent } from './page/editar-integracoes/dialogs/editar-integracao-dialog/editar-integracao-dialog.component';
import { OrcamentoDetailComponent } from './page/editar-orcamento/orcamento-detail/orcamento-detail.component';
import { EditorModule } from '../../shared/components/editor/editor/editor.module';

import { EditarEstampaComponent } from './page/editar-estampa/editar-estampa.component';
import { CardProdutoModule } from '../../shared/components/card-produto/card-produto.module';

@NgModule({
  declarations: [
    GerenciamentoComponent,
    EditarSobreComponent,
    EditarInformacoesContatoComponent,
    EditarTemaComponent,
    EditarServicoComponent,
    EditarCategoriaComponent,
    CriarCategoriaDialogComponent,
    DashboardComponent,
    EdicaoCardBlogComponent,
    EditarClientesComponent,
    EdicaoCardClienteComponent,
    CriarClienteDialogComponent,
    EditarMensagemComponent,
    EditarEmailsComponent,
    EditarImagemComponent,
    EditarCarouselComponent,
    EditarItemCarouselComponent,
    CriarItemCarouselDialogComponent,
    EditarCarouselDialogComponent,
    EditarOrcamentoComponent,
    EditarIntegracoesComponent,
    EditarBlogComponent,
    EditarPostComponent,
    CriarPostComponent,
    EditarIntegracaoDialogComponent,
    OrcamentoDetailComponent,
    EditarEstampaComponent,
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
    EditarCategoriaComponent,
    CriarPostComponent,
    EditarPostComponent,
    CriarCategoriaDialogComponent,
    CriarClienteDialogComponent,
    EditarClientesComponent,
    EditarMensagemComponent,
    EditarBlogComponent,
    OrcamentoDetailComponent,
    SharedModule,
    CardProdutoModule,
    EditorModule,
    CKEditorModule,
    NgxSliderModule,
    MatTableFilterModule
  ]
})
export class GerenciamentoModule { }
