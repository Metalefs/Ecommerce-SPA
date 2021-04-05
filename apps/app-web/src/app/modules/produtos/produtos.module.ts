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
import { ExibicaoArteProdutoComponent } from './page/dialogs/exibicao-arte-produto/exibicao-arte-produto.component';
import { CostumizationComponent } from './page/dialogs/exibicao-arte-produto/costumization/costumization.component';
import { StockImageComponent } from './page/dialogs/exibicao-arte-produto/costumization/dialogs/stock-image/stock-image.component';
import { ImportacaoComponent } from './page/dialogs/exibicao-arte-produto/costumization/dialogs/importacao/importacao.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PrimeNgModule } from '../../shared/primeng.module';
import { PreviewProdutoComponent } from './page/components/preview-produto/preview-produto.component';

@NgModule({
  declarations: [ProdutosComponent, ExibicaoProdutoComponent, FiltroCategoriaDialogComponent, FiltroOrdenacaoDialogComponent, ExibicaoArteProdutoComponent, CostumizationComponent, StockImageComponent, ImportacaoComponent, PreviewProdutoComponent],
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
