import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosComponent } from './page/produtos.component';

import { ProdutosPageRoutes } from './produtos.routing';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareButtonModule } from 'ngx-sharebuttons/button';

import { SharedModule } from '../../shared/shared.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShareModule } from 'ngx-sharebuttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { ExibicaoProdutoComponent } from './page/exibicao-produto/exibicao-produto.component';
import { FiltroCategoriaDialogComponent } from './page/dialogs/filtro-categoria-dialog/filtro-categoria-dialog.component';
import { FiltroOrdenacaoDialogComponent } from './page/dialogs/filtro-ordenacao-dialog/filtro-ordenacao-dialog.component';

@NgModule({
  declarations: [ProdutosComponent, ExibicaoProdutoComponent, FiltroCategoriaDialogComponent, FiltroOrdenacaoDialogComponent],
  imports: [
    CommonModule,
    ProdutosPageRoutes,
    SharedModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule,
    FontAwesomeModule,
    ShareButtonsModule,
    ShareModule,
    ShareButtonModule,
    ShareIconsModule,
  ],
  exports: [
    FontAwesomeModule,
    ShareButtonsModule,
    ShareModule,
    ShareButtonModule,
  ]
})
export class ProdutosModule { }
