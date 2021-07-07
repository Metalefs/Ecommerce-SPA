import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CKEditorModule } from 'ckeditor4-angular';
import { EditorModule } from '../../../../shared/components/editor/editor/editor.module';
import { MaterialModule } from 'apps/app-web/src/app/shared/material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'apps/app-web/src/app/shared/shared.module';

import { EditarProdutoComponent } from './editar-produto.component';
import { CriarProdutoDialogComponent } from './DialogComponents/criar-dialog/criar-dialog.component';
import { EditarProdutoDialogComponent } from './DialogComponents/editar-dialog/editar-dialog.component';
import { EditarProdutoFormModule } from './components/editar-produto-form/editar-produto-form.module';

import { CardProdutoModule } from 'apps/app-web/src/app/shared/components/card-produto/card-produto.module';
import { FiltrarEditarProdutoComponent } from './components/filtrar-editar-produto/filtrar-editar-produto.component';

import { EditarCategoriaComponent } from './components/editar-categoria/editar-categoria.component';
import { CriarCategoriaDialogComponent } from './components/editar-categoria/DialogComponents/criar-dialog/criar-dialog.component';

import { EditarEstampaModule } from './components/editar-estampa/editar-estampa.module';
import { EditarTamanhoProdutoComponent } from './components/editar-tamanho-produto/editar-tamanho-produto.component';
import { EditarCorProdutoComponent } from './components/editar-cor-produto/editar-cor-produto.component';
import { EditarFornecedorProdutoComponent } from './components/editar-fornecedor-produto/editar-fornecedor-produto.component';
import { EditarCorProdutoFormComponent } from './components/editar-cor-produto/components/editar-cor-produto-form/editar-cor-produto-form.component';
import { EditarTamanhoProdutoFormComponent } from './components/editar-tamanho-produto/components/editar-tamanho-produto-form/editar-tamanho-produto-form.component';
import { EditarTamanhoProdutoDialogComponent } from './components/editar-tamanho-produto/dialogs/editar-tamanho-produto-dialog/editar-tamanho-produto-dialog.component';

@NgModule({
  declarations: [
    EditarProdutoComponent,
    CriarProdutoDialogComponent,
    EditarProdutoDialogComponent,
    FiltrarEditarProdutoComponent,
    EditarCategoriaComponent,
    CriarCategoriaDialogComponent,
    EditarTamanhoProdutoComponent,
    EditarCorProdutoComponent,
    EditarFornecedorProdutoComponent,
    EditarCorProdutoFormComponent,
    EditarTamanhoProdutoFormComponent,
    EditarTamanhoProdutoDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CKEditorModule,
    NgxSliderModule,
    FormsModule,
    EditorModule,
    EditarProdutoFormModule,
    EditarEstampaModule,
    CardProdutoModule,
  ],
  exports: [
    SharedModule,
    FormsModule,
    EditarProdutoComponent,
    CriarProdutoDialogComponent,
    EditarProdutoDialogComponent,
    FiltrarEditarProdutoComponent,
    EditarTamanhoProdutoComponent,
    EditarCorProdutoComponent,
    EditarFornecedorProdutoComponent
  ]
})
export class EditarProdutoModule { }
