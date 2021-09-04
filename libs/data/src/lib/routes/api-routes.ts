let rota_user = '/usuario';
let rota_produto = '/produtos';
export let RouteDictionary = {

  Produtos: {
    Raiz: rota_produto,
    Filtrar: rota_produto + "/filtrar/",
    Gostar: rota_produto + "/gostar/",
    Rate: rota_produto + "/rate/",
    IncrementarVendas: rota_produto + "/incrementarVenda/",
    IncrementarVisualizacoes: rota_produto + "/incrementarVisualizacoes/",
    EmDestaque: rota_produto + "/destaques/",
    Semelhantes: rota_produto + "/semelhantes/",
  },

  TamanhoProduto:"/tamanhoProduto/",
  FornecedorProduto:"/fornecedorProduto/",
  CorProduto:"/corProduto/",

  Categoria: "/categoria/",
  Departamento: "/departamento/",
  CupomDesconto: "/cupom-desconto/",

  Estampa: {
    Raiz: "/estampa/",
  },

  InformacoesContato: "/informacoesContato/",
  Cliente: "/cliente/",
  Sobre: "/sobre/",
  Servico: "/servico/",

  Pedidos: {
    Raiz:"/pedido/",
    PorUsuario:"/pedido-usuario/",
    CodigoRastreamento:"codigo-rastreamento/",
  },

  Orcamento: {
    Padrao: "/orcamento/",
    PadraoEmail: "/orcamento-email/",
    PorUsuario: "/orcamento-usuario/",
  },
  Feedback: "/feedback/",
  Tema: "/tema/",

  EmailNotificacao: "/emailNotificacao/",
  Mensagem: "/mensagem/",
  Imagem: "/imagem/",

  Carousel: '/carousel/',
  ItemCarousel: '/itemcarousel/',

  Seed: "/seed/",

  Usuario: {
    Usuario: rota_user,
    DeletarConta: rota_user + "/deletarConta/",
    AtualizarConta: rota_user + "/atualizarConta/",
    Login: rota_user + "/login/",
    Registro: rota_user + "/registro/",
    RegistroTemporario: rota_user + "/registroTemporario/",
    RecuperarSenha: rota_user + "/recuperarSenha/",
    TrocarSenha: rota_user + "/trocarSenha/",
  },
  UsuarioBack: {
    Usuario: rota_user,
    DeletarConta: "/deletarConta/",
    AtualizarConta: "/atualizarConta/",
    Login: "/login/",
    Registro: "/registro/",
    RegistroTemporario: "/registroTemporario/",
    RecuperarSenha: "/recuperarSenha/",
    TrocarSenha: "/trocarSenha/",
  },

  Gerenciamento: "/gerenciamento/",
  Integracoes: {
    Raiz: "/integracoes/",
    ChavePublicaMercadoPago: "/mercadoPagoPublicKey/",
    QuantidadeParcelas: "/quantidade-parcelas/",
    ValorMinimoDesconto: "/valor-minimo-desconto/",
  },

  Correios: {
    Raiz:'/correios',
    CalcularPrecoPrazoPorProduto : "/prazo-para-produto/",
    CalcularPrecoPrazoPorCep : "/prazo-para-cep/",
    CalcularPrecoPrazoPorOrcamento : "/prazo-para-orcamento/",
    RastrearEncomendas : "/rastrear-encomenda/",
  },

  Checkout: '/checkout/',
  Refund: '/refund/',
  ListPayments: '/listPayments/'
};
