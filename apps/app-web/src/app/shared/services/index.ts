import { InformacoesContatoService } from './InformacoesContatoService';
import { UsuarioService } from './UsuarioService';
import { EmailNotificacaoService } from './EmailNotificacaoService';
import { CategoriaService } from './CategoriaService';
import { ClienteService } from './ClienteService';
import { TemaService } from './TemaService';
import { MensagemService } from './MensagemService';
import { ImagemService } from './ImagemService';
import { ItemCarouselService } from './ItemCarouselService';
import { CarouselService } from './CarouselService';

import { CEPService } from './CEPService';
import { EstadoService } from './EstadoService';
import { MercadoPagoCheckoutService } from './checkout/MercadoPagoService';
import { IntegracoesService } from './checkout/IntegracoesService';

export {
  InformacoesContatoService,
  UsuarioService,
  EmailNotificacaoService,
  CategoriaService,
  ClienteService,
  TemaService,
  MensagemService,
  ImagemService,
  ItemCarouselService,
  CarouselService,
  CEPService,
  EstadoService,
  MercadoPagoCheckoutService,
  IntegracoesService,
}

export let Services = [
  InformacoesContatoService,
  UsuarioService,
  EmailNotificacaoService,
  CategoriaService,
  TemaService,
  MensagemService,
  ImagemService,
  ItemCarouselService,
  CarouselService,
  MercadoPagoCheckoutService,
  IntegracoesService,
]
