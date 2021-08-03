import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareButtonModule } from 'ngx-sharebuttons/button';

import { SharedModule } from '../../shared.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PrimeNgModule } from '../../primeng.module';
import { MaterialModule } from '../../material.module';


import { FiltroCategoriaMobileComponent } from './filtro-categoria-mobile/filtro-categoria-mobile.component';
import { FiltroNomeProdutoComponent } from './filtro-nome-produto/filtro-nome-produto.component';
import { ExibicaoCategoriasAtivasComponent } from './exibicao-categorias-ativas/exibicao-categorias-ativas.component';
import { SelecaoCategoriaProdutoComponent } from './selecao-categoria-produto/selecao-categoria-produto.component';
import { CheckboxCoresProdutoComponent } from './checkbox-cores-produto/checkbox-cores-produto.component';
import { SelecaoStatusProdutoComponent } from './selecao-status-produto/selecao-status-produto.component';
import { SelecaoFaixaPrecoProdutoComponent } from './selecao-faixa-preco-produto/selecao-faixa-preco-produto.component';
import { SelecaoQuantidadeProdutosComponent } from './selecao-quantidade-produtos/selecao-quantidade-produtos.component';
import { SelecaoOrdenacaoProdutoComponent } from './selecao-ordenacao-produto/selecao-ordenacao-produto.component';
import { NenhumProdutoEncontradoComponent } from './nenhum-produto-encontrado/nenhum-produto-encontrado.component';
import { ExibicaoQuantidadeProdutosFiltradosComponent } from './exibicao-quantidade-produtos-filtrados/exibicao-quantidade-produtos-filtrados.component';
import { FiltroCorProdutoComponent } from './filtro-cor-produto/filtro-cor-produto.component';
import { FiltroFornecedorProdutoComponent } from './filtro-fornecedor-produto/filtro-fornecedor-produto.component';

@NgModule({
  imports: [
    CommonModule,
    ShareButtonsModule,
    ShareButtonModule,
    SharedModule,
    FontAwesomeModule,
    ShareIconsModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule,
    NgxSliderModule,
    PrimeNgModule,
    MaterialModule,
  ],
  declarations: [
    FiltroCategoriaMobileComponent,
    FiltroNomeProdutoComponent,
    ExibicaoCategoriasAtivasComponent,
    SelecaoCategoriaProdutoComponent,
    CheckboxCoresProdutoComponent,
    SelecaoStatusProdutoComponent,
    SelecaoFaixaPrecoProdutoComponent,
    SelecaoQuantidadeProdutosComponent,
    SelecaoOrdenacaoProdutoComponent,
    NenhumProdutoEncontradoComponent,
    ExibicaoQuantidadeProdutosFiltradosComponent,
    FiltroCorProdutoComponent,
    FiltroFornecedorProdutoComponent,
  ],
  exports: [ FiltroCategoriaMobileComponent,
    FiltroNomeProdutoComponent,
    ExibicaoCategoriasAtivasComponent,
    SelecaoCategoriaProdutoComponent,
    CheckboxCoresProdutoComponent,
    SelecaoStatusProdutoComponent,
    SelecaoFaixaPrecoProdutoComponent,
    SelecaoQuantidadeProdutosComponent,
    SelecaoOrdenacaoProdutoComponent,
    NenhumProdutoEncontradoComponent,
    ExibicaoQuantidadeProdutosFiltradosComponent,
    FiltroCorProdutoComponent,
    FiltroFornecedorProdutoComponent,],
})
export class ProdutoShared {}
