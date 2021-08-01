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
import { FiltroCategoriaMobileComponent } from './page/filtro-categoria-mobile/filtro-categoria-mobile.component';
import { FiltroNomeProdutoComponent } from './page/filtro-nome-produto/filtro-nome-produto.component';
import { ExibicaoCategoriasAtivasComponent } from './page/exibicao-categorias-ativas/exibicao-categorias-ativas.component';
import { SelecaoCategoriaProdutoComponent } from './page/selecao-categoria-produto/selecao-categoria-produto.component';
import { CheckboxCoresProdutoComponent } from './page/checkbox-cores-produto/checkbox-cores-produto.component';
import { SelecaoStatusProdutoComponent } from './page/selecao-status-produto/selecao-status-produto.component';
import { SelecaoFaixaPrecoProdutoComponent } from './page/selecao-faixa-preco-produto/selecao-faixa-preco-produto.component';
import { SelecaoQuantidadeProdutosComponent } from './page/selecao-quantidade-produtos/selecao-quantidade-produtos.component';
import { SelecaoOrdenacaoProdutoComponent } from './page/selecao-ordenacao-produto/selecao-ordenacao-produto.component';
import { NenhumProdutoEncontradoComponent } from './page/nenhum-produto-encontrado/nenhum-produto-encontrado.component';
import { ExibicaoQuantidadeProdutosFiltradosComponent } from './page/exibicao-quantidade-produtos-filtrados/exibicao-quantidade-produtos-filtrados.component';
import { FiltroCorProdutoComponent } from './page/filtro-cor-produto/filtro-cor-produto.component';
import { ExibicaoListaProdutosComponent } from './page/exibicao-lista-produtos/exibicao-lista-produtos.component';

@NgModule({
  declarations: [ProdutosComponent, FiltroCategoriaDialogComponent, FiltroOrdenacaoDialogComponent, FiltroNomeProdutoComponent, ExibicaoProdutoComponent, FiltroCategoriaMobileComponent, ExibicaoCategoriasAtivasComponent, SelecaoQuantidadeProdutosComponent, SelecaoCategoriaProdutoComponent, CheckboxCoresProdutoComponent, SelecaoOrdenacaoProdutoComponent, SelecaoStatusProdutoComponent, SelecaoFaixaPrecoProdutoComponent, NenhumProdutoEncontradoComponent, ExibicaoQuantidadeProdutosFiltradosComponent, FiltroCorProdutoComponent, ExibicaoListaProdutosComponent],
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
