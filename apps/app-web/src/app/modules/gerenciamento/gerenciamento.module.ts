import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciamentoComponent } from './page/gerenciamento.component';
import { EditarSobreComponent } from './page/editar-sobre/editar-sobre.component';
import { EditarInformacoesContatoComponent } from './page/editar-infocontato/editar-informacoescontato.component';

import { SharedModule } from '../../shared/shared.module';
import { GerenciamentoPageRoutes } from './gerenciamento.routing';
import { EditarProdutoComponent } from './page/editar-produto/editar-produto.component';
import { EditarTemaComponent } from './page/editar-tema/editar-tema.component';
import { EditarServicoComponent } from './page/editar-servico/editar-servico.component';
import { EditarCategoriaComponent } from './page/editar-categoria/editar-categoria.component';
import { EditarClientesComponent } from './page/editar-clientes/editar-clientes.component';
import { CriarProdutoDialogComponent } from './page/editar-produto/DialogComponents/criar-dialog/criar-dialog.component';
import { EditarProdutoDialogComponent } from './page/editar-produto/DialogComponents/editar-dialog/editar-dialog.component';
import { CriarCategoriaDialogComponent } from './page/editar-categoria/DialogComponents/criar-dialog/criar-dialog.component';
import { CriarClienteDialogComponent } from './page/editar-clientes/DialogComponents/criar-cliente-dialog/criar-cliente-dialog.component';

import { DashboardComponent } from './page/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { EdicaoCardProdutoComponent } from './page/editar-produto/components/edicao-card-produto/edicao-card-produto.component';
import { EdicaoCardClienteComponent } from './page/editar-clientes/components/edicao-card-cliente/edicao-card-cliente.component';
import { EditarMensagemComponent } from './page/editar-mensagem/editar-mensagem.component';
import { EditarEmailsComponent } from './page/editar-emails/editar-emails.component';
import { EditarImagemComponent } from './page/editar-imagem/editar-imagem.component';
import { EditarCarouselComponent } from './page/editar-carousel/editar-carousel.component';
import { EditarItemCarouselComponent } from './page/editar-carousel/editar-item-carousel/editar-item-carousel.component';
import { CriarItemCarouselDialogComponent } from './page/editar-carousel/dialogComponents/criar-item-carousel-dialog/criar-item-carousel-dialog.component';
import { EditarCarouselDialogComponent } from './page/editar-carousel/dialogComponents/editar-carousel-dialog/editar-carousel-dialog.component';
import { EditarOrcamentoComponent } from './page/editar-orcamento/editar-orcamento.component';

import { CKEditorModule } from 'ckeditor4-angular';

@NgModule({
  declarations: [
    GerenciamentoComponent,
    EditarSobreComponent,
    EditarInformacoesContatoComponent,
    EditarProdutoComponent,
    EditarTemaComponent,
    EditarServicoComponent,
    EditarCategoriaComponent,
    CriarProdutoDialogComponent,
    EditarProdutoDialogComponent,
    CriarCategoriaDialogComponent,
    DashboardComponent,
    EdicaoCardProdutoComponent,
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
  ],
  imports: [
    CommonModule,
    SharedModule,
    GerenciamentoPageRoutes,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    CKEditorModule
  ],
  exports: [
    GerenciamentoComponent,
    EditarSobreComponent,
    EditarInformacoesContatoComponent,
    EditarProdutoComponent,
    EditarTemaComponent,
    EditarServicoComponent,
    EditarCategoriaComponent,
    CriarProdutoDialogComponent,
    EditarProdutoDialogComponent,
    CriarCategoriaDialogComponent,
    CriarClienteDialogComponent,
    EditarClientesComponent,
    EditarMensagemComponent,
    CKEditorModule
  ]
})
export class GerenciamentoModule { }
