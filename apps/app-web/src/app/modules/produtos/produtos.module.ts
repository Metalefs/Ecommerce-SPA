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

import { ExibicaoProdutoComponent } from './page/exibicao-produto/exibicao-produto.component';
import { FiltroCategoriaDialogComponent } from './page/dialogs/filtro-categoria-dialog/filtro-categoria-dialog.component';
import { FiltroOrdenacaoDialogComponent } from './page/dialogs/filtro-ordenacao-dialog/filtro-ordenacao-dialog.component';
import { PreviewProdutoComponent } from './page/components/preview-produto/preview-produto.component';
import { EstatisticasProdutoComponent } from './page/exibicao-produto/components/estatisticas-produto/estatisticas-produto.component';
import { TabInformacaoAvaliacaoProdutoComponent } from './page/exibicao-produto/components/tab-informacao-avaliacao-produto/tab-informacao-avaliacao-produto.component';
import { BotoesCompartilhamentoProdutoComponent } from './page/exibicao-produto/components/botoes-compartilhamento-produto/botoes-compartilhamento-produto.component';
import { AvaliacaoEstrelasProdutoComponent } from './page/exibicao-produto/components/avaliacao-estrelas-produto/avaliacao-estrelas-produto.component';
import { CurtirProdutoComponent } from './page/exibicao-produto/components/curtir-produto/curtir-produto.component';
import { ExibicaoImagemProdutoComponent } from './page/exibicao-produto/components/exibicao-imagem-produto/exibicao-imagem-produto.component';
import { DescricaoRapidaProdutoComponent } from './page/exibicao-produto/components/descricao-rapida-produto/descricao-rapida-produto.component';
import { ExibicaoTagsProdutoComponent } from './page/exibicao-produto/components/exibicao-tags-produto/exibicao-tags-produto.component';
import { AvaliacaoProdutoComponent } from './page/exibicao-produto/components/avaliacao-produto/avaliacao-produto.component';
import { SelecaoQuantidadeProdutoComponent } from './page/exibicao-produto/components/selecao-quantidade-produto/selecao-quantidade-produto.component';
import { SelecaoTamanhoProdutoComponent } from './page/exibicao-produto/components/selecao-tamanho-produto/selecao-tamanho-produto.component';
import { MensagemComprarProdutoDesabilitadoComponent } from './page/exibicao-produto/components/mensagem-comprar-produto-desabilitado/mensagem-comprar-produto-desabilitado.component';
import { BotaoComprarProdutoComponent } from './page/exibicao-produto/components/botao-comprar-produto/botao-comprar-produto.component';
import { BotaoContatoWhatsappComponent } from './page/exibicao-produto/components/botao-contato-whatsapp/botao-contato-whatsapp.component';
import { ExibicaoArtesProdutoComponent } from './page/exibicao-produto/components/exibicao-artes-produto/exibicao-artes-produto.component';
import { ExibicaoDadosPagamentoComponent } from './page/exibicao-produto/components/exibicao-dados-pagamento/exibicao-dados-pagamento.component';
import { ExibicaoBreadcrumbComponent } from './page/exibicao-produto/components/exibicao-breadcrumb/exibicao-breadcrumb.component';
import { BlocoPagamentoProdutoComponent } from './page/exibicao-produto/components/bloco-pagamento-produto/bloco-pagamento-produto.component';
import { SelecaoEstampaComponent } from './page/exibicao-produto/components/selecao-estampa/selecao-estampa.component';

@NgModule({
  declarations: [ProdutosComponent, ExibicaoProdutoComponent, FiltroCategoriaDialogComponent, FiltroOrdenacaoDialogComponent, PreviewProdutoComponent, EstatisticasProdutoComponent, TabInformacaoAvaliacaoProdutoComponent, BotoesCompartilhamentoProdutoComponent, AvaliacaoEstrelasProdutoComponent, CurtirProdutoComponent, ExibicaoImagemProdutoComponent, DescricaoRapidaProdutoComponent, ExibicaoTagsProdutoComponent, AvaliacaoProdutoComponent, SelecaoQuantidadeProdutoComponent, SelecaoTamanhoProdutoComponent, MensagemComprarProdutoDesabilitadoComponent, BotaoComprarProdutoComponent, BotaoContatoWhatsappComponent, ExibicaoArtesProdutoComponent, ExibicaoDadosPagamentoComponent, ExibicaoBreadcrumbComponent, BlocoPagamentoProdutoComponent, SelecaoEstampaComponent],
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
