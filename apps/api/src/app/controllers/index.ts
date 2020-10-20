import { CategoriaRouter } from './categoria.controller';
import { InformacoesContatoRouter } from './informacoescontato.controller';
import { OrcamentoRouter } from './orcamento.controller';
import { ProdutoRouter } from './produto.controller';
import { ServicoRouter } from './servico.controller';
import { SobreRouter } from './sobre.controller';
import { TemaRouter } from './tema.controller';
import { EmailNotificacaoRouter } from './email-notificacao.controller';
import { ClienteRouter } from './cliente.controller';
import { MensagemRouter } from './mensagem.controller';
import { ImagemRouter } from './imagem.controller';

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
];
