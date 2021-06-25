import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CKEditorModule } from 'ckeditor4-angular';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { SharedModule } from '../../../../../../shared/shared.module';

import { DicasCadastroComponent } from './dicas-cadastro/dicas-cadastro.component';
import { DescricaoProdutoComponent } from './descricao-produto/descricao-produto.component';
import { EspecificacaoProdutoComponent } from './especificacao-produto/especificacao-produto.component';
import { EditarProdutoFormComponent } from './editar-produto-form.component';
import { CriacaoTagsComponent } from './criacao-tags/criacao-tags.component';
import { DimensoesProdutoComponent } from './dimensoes-produto/dimensoes-produto.component';
import { EditorModule } from '../../../../../../shared/components/editor/editor/editor.module';
import { TamanhoProdutoComponent } from './tamanho-produto/tamanho-produto.component';
import { CategoriaProdutoComponent } from './categoria-produto/categoria-produto.component';
import { StatusProdutoComponent } from './status-produto/status-produto.component';

@NgModule({
  declarations: [
    DicasCadastroComponent,
    DescricaoProdutoComponent,
    EspecificacaoProdutoComponent,
    EditarProdutoFormComponent,
    CriacaoTagsComponent,
    DimensoesProdutoComponent,
    TamanhoProdutoComponent,
    CategoriaProdutoComponent,
    StatusProdutoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CKEditorModule,
    NgxSliderModule,
    EditorModule
  ],
  exports:[
    DicasCadastroComponent,
    DescricaoProdutoComponent,
    EspecificacaoProdutoComponent,
    EditarProdutoFormComponent,
    EditorModule
  ]
})
export class EditarProdutoFormModule { }
