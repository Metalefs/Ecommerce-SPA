import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosComponent } from './page/produtos.component';

import { ProdutosPageRoutes } from './produtos.routing';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareButtonModule } from 'ngx-sharebuttons/button';

import { SharedModule } from '../../shared/shared.module';
import { ProdutoShared } from '../../shared/components/produto/produtoShared.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PrimeNgModule } from '../../shared/primeng.module';

import { ExibicaoProdutoComponent } from './page/components/exibicao-produto/exibicao-produto.component';
import { FiltroCategoriaDialogComponent } from './page/components/dialogs/filtro-categoria-dialog/filtro-categoria-dialog.component';
import { FiltroOrdenacaoDialogComponent } from './page/components/dialogs/filtro-ordenacao-dialog/filtro-ordenacao-dialog.component';
import { ExibicaoListaProdutosComponent } from './page/components/exibicao-lista-produtos/exibicao-lista-produtos.component';
import { FavoritosComponent } from './page/components/exibicao-lista-produtos/favoritos/favoritos.component';
import { DataviewProdutosComponent } from './page/components/exibicao-lista-produtos/dataview-produtos/dataview-produtos.component';
import { ComparacaoComponent } from './page/components/exibicao-lista-produtos/comparacao/comparacao.component';

@NgModule({
  declarations: [ProdutosComponent, FiltroCategoriaDialogComponent, FiltroOrdenacaoDialogComponent, ExibicaoProdutoComponent, ExibicaoListaProdutosComponent, FavoritosComponent, DataviewProdutosComponent, ComparacaoComponent],
  imports: [
    CommonModule,
    ProdutosPageRoutes,
    SharedModule,
    NgxSliderModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule,
    FontAwesomeModule,
    ShareButtonsModule,
    ShareButtonModule,
    ShareIconsModule,
    PrimeNgModule,
    ProdutoShared
  ],
  exports: [
    FontAwesomeModule,
    ShareButtonsModule,
    ShareButtonModule,
    PrimeNgModule,
    ProdutoShared
  ]
})
export class ProdutosModule { }
