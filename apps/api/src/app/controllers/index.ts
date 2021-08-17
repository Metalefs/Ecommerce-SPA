import { CategoriaRouter } from './domain/categoria.controller';
import { InformacoesContatoRouter } from './domain/informacoescontato.controller';
import { OrcamentoRouter } from './domain/orcamento.controller';
import { PedidoRouter } from './domain/pedido.controller';
import { FeedbackRouter } from './domain/feedback.controller';
import { ProdutoRouter } from './domain/produto.controller';
import { ServicoRouter } from './domain/servico.controller';
import { SobreRouter } from './domain/sobre.controller';
import { TemaRouter } from './domain/tema.controller';
import { EmailNotificacaoRouter } from './domain/email-notificacao.controller';
import { ClienteRouter } from './domain/cliente.controller';
import { MensagemRouter } from './domain/mensagem.controller';
import { ImagemRouter } from './domain/imagem.controller';
import { ItemCarouselRouter } from './domain/itemcarousel.controller';
import { CarrouselRouter } from './domain/carousel.controller';
import { MercadoPagoController } from './checkout/mercadopago.controller';
import { IntegracoesRouter } from './domain/integracoes.controller';
import { EstampaRouter } from './domain/estampa.controller';
import { TamanhoProdutoRouter } from './domain/tamanho-produto.controller';
import { CorProdutoRouter } from './domain/cor-produto.controller';
import { FornecedorProdutoRouter } from './domain/fornecedor-produto.controller';
import { DepartamentoRouter } from './domain/departamentos.controller';
import { CupomDescontoRouter } from './domain/cupom-desconto.controller';

export let Routers = [
  CategoriaRouter,
  InformacoesContatoRouter,
  OrcamentoRouter,
  ProdutoRouter,
  ClienteRouter,
  ServicoRouter,
  SobreRouter,
  TemaRouter,
  EmailNotificacaoRouter,
  MensagemRouter,
  ImagemRouter,
  ItemCarouselRouter,
  EstampaRouter,
  CarrouselRouter,
  MercadoPagoController,
  IntegracoesRouter,
  TamanhoProdutoRouter,
  CorProdutoRouter,
  FornecedorProdutoRouter,
  PedidoRouter,
  FeedbackRouter,
  DepartamentoRouter,
  CupomDescontoRouter
];
