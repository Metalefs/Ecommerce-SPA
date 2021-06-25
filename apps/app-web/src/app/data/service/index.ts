import { SobreService } from './SobreService';
import { ProdutoService } from './ProdutoService';
import { ServicoService } from './ServicoService';
import { OrcamentoService } from './OrcamentoService';

import { ComentarioProdutoService } from './comentarios/comentarioProdutoService';

export {
  SobreService,
  ProdutoService,
  ServicoService,
  OrcamentoService,
  ComentarioProdutoService
}

export let Services = [
  SobreService,
  ProdutoService,
  ServicoService,
  OrcamentoService,
  ComentarioProdutoService
]
