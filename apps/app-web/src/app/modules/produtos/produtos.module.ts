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
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PrimeNgModule } from '../../shared/primeng.module';

import { FiltroCategoriaDialogComponent } from './page/dialogs/filtro-categoria-dialog/filtro-categoria-dialog.component';
import { FiltroOrdenacaoDialogComponent } from './page/dialogs/filtro-ordenacao-dialog/filtro-ordenacao-dialog.component';
import { ExibicaoProdutoComponent } from './page/exibicao-produto/exibicao-produto.component';

@NgModule({
  declarations: [ProdutosComponent, FiltroCategoriaDialogComponent, FiltroOrdenacaoDialogComponent, ExibicaoProdutoComponent],
  imports: [
    CommonModule,
    ProdutosPageRoutes,
    SharedModule,
    NgxSliderModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule,
    FontAwesomeModule,
    ShareButtonsModule,
    ShareModule,
    ShareButtonModule,
    ShareIconsModule,
    PrimeNgModule
  ],
  exports: [
    FontAwesomeModule,
    ShareButtonsModule,
    ShareModule,
    ShareButtonModule,
    PrimeNgModule,
  ]
})
export class ProdutosModule { }
