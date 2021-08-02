import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareButtonModule } from 'ngx-sharebuttons/button';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShareModule } from 'ngx-sharebuttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PrimeNgModule } from '../../primeng.module';
import { MaterialModule } from '../../material.module';

import { EstatisticasProdutoComponent } from './components/estatisticas-produto/estatisticas-produto.component';
import { TabInformacaoAvaliacaoProdutoComponent } from './components/tab-informacao-avaliacao-produto/tab-informacao-avaliacao-produto.component';
import { BotoesCompartilhamentoProdutoComponent } from './components/botoes-compartilhamento-produto/botoes-compartilhamento-produto.component';
import { AvaliacaoEstrelasProdutoComponent } from './components/avaliacao-estrelas-produto/avaliacao-estrelas-produto.component';
import { CurtirProdutoComponent } from './components/curtir-produto/curtir-produto.component';
import { ExibicaoImagemProdutoComponent } from './components/exibicao-imagem-produto/exibicao-imagem-produto.component';
import { DescricaoRapidaProdutoComponent } from './components/descricao-rapida-produto/descricao-rapida-produto.component';
import { ExibicaoTagsProdutoComponent } from './components/exibicao-tags-produto/exibicao-tags-produto.component';
import { AvaliacaoProdutoComponent } from './components/avaliacao-produto/avaliacao-produto.component';
import { SelecaoQuantidadeProdutoComponent } from './components/selecao-quantidade-produto/selecao-quantidade-produto.component';
import { SelecaoTamanhoProdutoComponent } from './components/selecao-tamanho-produto/selecao-tamanho-produto.component';
import { MensagemComprarProdutoDesabilitadoComponent } from './components/mensagem-comprar-produto-desabilitado/mensagem-comprar-produto-desabilitado.component';
import { BotaoComprarProdutoComponent } from './components/botao-comprar-produto/botao-comprar-produto.component';
import { BotaoContatoWhatsappComponent } from './components/botao-contato-whatsapp/botao-contato-whatsapp.component';
import { ExibicaoArtesProdutoComponent } from './components/exibicao-artes-produto/exibicao-artes-produto.component';
import { ExibicaoDadosPagamentoComponent } from './components/exibicao-dados-pagamento/exibicao-dados-pagamento.component';
import { ExibicaoBreadcrumbComponent } from '../exibicao-breadcrumb/exibicao-breadcrumb.component';
import { BlocoPagamentoProdutoComponent } from './components/bloco-pagamento-produto/bloco-pagamento-produto.component';
import { SelecaoEstampaComponent } from './components/selecao-estampa/selecao-estampa.component';
import { VisualizacaoProdutoLojaComponent } from './visualizacao-produto-loja.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
import { GalleryModule } from 'ng-gallery';
import { SlideshowModule } from 'ng-simple-slideshow';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { ExibicaoPrecoProdutoModule } from '../exibicao-preco-produto/exibicao-preco-produto.module';

import { BotaoEsgotadoComponent } from './components/botao-esgotado/botao-esgotado.component';
import { CardEstampaModule } from '../card-estampa/card-estampa.module';
import { CorProdutoSelectorModule } from '../cor-produto-selector/cor-produto-selector.module';

@NgModule({
  declarations: [VisualizacaoProdutoLojaComponent, BotaoEsgotadoComponent, EstatisticasProdutoComponent, TabInformacaoAvaliacaoProdutoComponent, BotoesCompartilhamentoProdutoComponent, AvaliacaoEstrelasProdutoComponent, CurtirProdutoComponent, ExibicaoImagemProdutoComponent, DescricaoRapidaProdutoComponent, ExibicaoTagsProdutoComponent, AvaliacaoProdutoComponent, SelecaoQuantidadeProdutoComponent, SelecaoTamanhoProdutoComponent, MensagemComprarProdutoDesabilitadoComponent, BotaoComprarProdutoComponent, BotaoContatoWhatsappComponent, ExibicaoArtesProdutoComponent, ExibicaoDadosPagamentoComponent, ExibicaoBreadcrumbComponent, BlocoPagamentoProdutoComponent, SelecaoEstampaComponent],
  imports: [
    CommonModule,
    NgxSliderModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule,
    FontAwesomeModule,
    ShareButtonsModule,
    ShareModule,
    ShareButtonModule,
    ShareIconsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule,
    SwiperModule,
    StarRatingModule.forRoot(),
    GalleryModule,
    SlideshowModule,
    PrimeNgModule,
    MaterialModule,
    ExibicaoPrecoProdutoModule,
    CardEstampaModule,
    CorProdutoSelectorModule
  ],
  exports: [
    FontAwesomeModule,
    ShareButtonsModule,
    VisualizacaoProdutoLojaComponent,
    EstatisticasProdutoComponent,
    TabInformacaoAvaliacaoProdutoComponent,
    BotoesCompartilhamentoProdutoComponent,
    AvaliacaoEstrelasProdutoComponent,
    CurtirProdutoComponent,
    ExibicaoImagemProdutoComponent,
    DescricaoRapidaProdutoComponent,
    ExibicaoTagsProdutoComponent,
    AvaliacaoProdutoComponent,
    SelecaoQuantidadeProdutoComponent,
    SelecaoTamanhoProdutoComponent,
    MensagemComprarProdutoDesabilitadoComponent,
    BotaoComprarProdutoComponent,
    BotaoContatoWhatsappComponent,
    ExibicaoArtesProdutoComponent,
    ExibicaoDadosPagamentoComponent,
    ExibicaoBreadcrumbComponent,
    BlocoPagamentoProdutoComponent,
    SelecaoEstampaComponent,
    BotaoEsgotadoComponent,
    CardEstampaModule,
    CorProdutoSelectorModule
  ]
})
export class VisualizacaoProdutoLojaModule { }
