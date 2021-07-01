let rota_user = '/usuario/';
let rota_produto = '/produto/';
export let RouteDictionary = {
    Produtos: {
      Produto:rota_produto,
      Filtrar:rota_produto+"/filtrarProduto/",
      Gostar:rota_produto+"/gostarproduto/",
      Rate:rota_produto+"/rateproduto/",
      IncrementarVendas:rota_produto+"/incrementarVenda/",
      IncrementarVisualizacoes:rota_produto+"/incrementarVisualizacoes/",
      EmDestaque: rota_produto+"/emDestaque/"
    },

    InformacoesContato:"/informacoesContato/",
    Cliente:"/cliente/",
    Sobre:"/sobre/",
    Servico:"/servico/",

    Orcamento: {
      Padrao:"/orcamento/",
      Pedidos:"/pedido/",
    },

    Categoria:"/categoria/",
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
    Integracoes: "/integracoes/",

    Checkout: '/checkout/',
    Refund: '/refund/',
    ListPayments: '/listPayments/'
};
