import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CKEditorModule } from 'ckeditor4-angular';
import { SharedModule } from 'primeng/api';
import { EditorModule } from '../../../../shared/components/editor/editor/editor.module';

import { EditarProdutoComponent } from './editar-produto.component';
import { CriarProdutoDialogComponent } from './DialogComponents/criar-dialog/criar-dialog.component';
import { EditarProdutoDialogComponent } from './DialogComponents/editar-dialog/editar-dialog.component';
import { EditarProdutoFormModule } from './components/editar-produto-form/editar-produto-form.module';
import { MaterialModule } from 'apps/app-web/src/app/shared/material.module';
import { FormsModule } from '@angular/forms';
import { CardProdutoModule } from 'apps/app-web/src/app/shared/components/card-produto/card-produto.module';


@NgModule({
  declarations: [
    EditarProdutoComponent,
    CriarProdutoDialogComponent,
    EditarProdutoDialogComponent,
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
    CardProdutoModule,
  ],
  exports: [
    SharedModule,
    FormsModule,
    EditarProdutoComponent,
    CriarProdutoDialogComponent,
    EditarProdutoDialogComponent,
  ]
})
export class EditarProdutoModule { }
