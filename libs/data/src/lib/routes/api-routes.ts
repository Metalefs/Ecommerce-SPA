let rota_user = '/usuario';
let rota_produto = '/produtos';
export let RouteDictionary = {
    Produtos: {
      Produto:rota_produto,
      Filtrar:rota_produto+"/filtrar/",
      Gostar:rota_produto+"/gostar/",
      Rate:rota_produto+"/rate/",
      IncrementarVendas:rota_produto+"/incrementarVenda/",
      IncrementarVisualizacoes:rota_produto+"/incrementarVisualizacoes/",
      EmDestaque: rota_produto+"/destaques/",
      Semelhantes: rota_produto+"/semelhantes/",
    },
    Categoria:"/categoria/",

    Estampa: {
      Raiz: "/estampa",
    },
    InformacoesContato:"/informacoesContato/",
    Cliente:"/cliente/",
    Sobre:"/sobre/",
    Servico:"/servico/",

    Orcamento: {
      Padrao:"/orcamento/",
      Pedidos:"/pedido/",
    },

    Feedback:"/feedback/",
    Tema:"/tema/",

    EmailNotificacao : "/emailNotificacao/",
    Mensagem : "/mensagem/",
    Imagem : "/imagem/",

    Carousel: '/carousel/',
    ItemCarousel: '/itemcarousel/',

    Seed:"/seed/",

    Usuario: {
      Usuario: rota_user,
      DeletarConta: rota_user+"/deletarConta/",
      AtualizarConta:rota_user+"/atualizarConta/",
      Login:rota_user+"/login/",
      Registro:rota_user+"/registro/",
      RegistroTemporario:rota_user+"/registroTemporario/",
      RecuperarSenha:rota_user+"/recuperarSenha/",
      TrocarSenha:rota_user+"/trocarSenha/",
    },

    Gerenciamento:"/gerenciamento/",
    Integracoes: {
      Raiz: "/integracoes/",
      ChavePublicaMercadoPago: "/mercadoPagoPublicKey/"
    },

    Checkout: '/checkout/',
    Refund: '/refund/',
    ListPayments: '/listPayments/'
};
