import { Integracoes, Orcamento, Produto, Usuario } from 'libs/data/src/lib/classes';
import { TipoUsuario } from 'libs/data/src/lib/enums';
import { MercadoPagoCheckout, MercadoPagoPayment, MercadoPagoRefund, mp_checkout_items, mp_checkout_payer, mp_payment_methods, mp_shipments } from 'libs/data/src/lib/interfaces';
import { mp_payment_additional_info, mp_shipping } from 'libs/data/src/lib/interfaces/mercadoPagoCheckout';
import { ActualSearchPaymentResponse } from 'libs/data/src/lib/interfaces/mercadoPagoSearchPaymentResult';
import { IntegracoesService } from '../domain/integracoes.service';

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
let MP_AT;
(async function configure(){
  let integracoesService = new IntegracoesService();
  MP_AT = await integracoesService.LerUltimo() as Integracoes;
  mercadopago.configure({
    access_token: MP_AT.MP_access_token,
    // client_secret: MP_AT.client_secret
  });
})();

export class MercadoPagoService{

  async getAllPayments(user:Usuario):Promise<MercadoPagoPayment[]>{
    if(user.Tipo != TipoUsuario.admin)
      return;

    var filters = {
      site_id: 'MLB',
    };

    return mercadopago.payment.search({
      qs: filters
    }).then(function (data) {
      return data;
    }).catch(function (error) {
      console.log(error);
      return error
    });
  }

  async searchPayment(payment_id):Promise<ActualSearchPaymentResponse>{
    var filters = {
      site_id: 'MLB',
      id:payment_id
    };

    return mercadopago.payment.search({
      qs: filters
    }).then(function (data) {
      return data.response.results[0];
    }).catch(function (error) {
      console.log(error);
      return error
    });
  }

  async cancel(payment_id:number){
    return mercadopago.payment.update({
        id: payment_id,
        status: "cancelled"
    }).then(x=>{return x}).catch();
  }

  async refund(payment_id:number):Promise<MercadoPagoRefund>{
    return mercadopago.payment.refund(payment_id)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // manipular o erro ...
      console.log(error);
      return error
    });
  }

  async checkout(preference) {
    console.log(preference);
    return mercadopago.preferences.create(preference).then(response => {
      // Este es el checkout generado o link al que nos vamos a posicionar para pagar
      console.log(response.body);
      let init_point = response.body.init_point
      let id = response.body.id;
      return { result: init_point, id };
    }).catch(error => {
      console.log(error);
      return error
    });
  }

  //
  // obterPagamento(orcamento: Orcamento): MercadoPagoPayment {
  //   return {
  //     additional_info: this.getAdditionalInfo(orcamento),
  //     description: "Pagamendo de produto",
  //     installments: this.getInstallments(orcamento),
  //   }
  // }

  getPreference(orcamento: Orcamento): MercadoPagoCheckout {
    return {
      items: this.getItems(orcamento),
      payer: this.getPayer(orcamento),
      // payment_methods: this.getPaymentMethod(orcamento, MP_AT),
      // shipments: this.getShipments(orcamento),
      back_urls: {
        success: "https://www.personalizadoslopes.com.br/checkout/success",
        failure: "https://www.personalizadoslopes.com.br/checkout/failure",
        pending: "https://www.personalizadoslopes.com.br/checkout/pending"
      },
      // statement_descriptor: MP_AT.ResumoCartao,
      // additional_info: '',
      // auto_return: MP_AT.auto_return,
      // binary_mode: MP_AT.binary_mode,
      // client_id: parseInt(MP_AT.client_id.toString()),
      // collector_id: parseInt(MP_AT.collector_id.toString()),
      // client_secret: MP_AT.client_secret,
      auto_return: 'approved'
    };
  }
  getAdditionalInfo(orcamento: Orcamento): mp_payment_additional_info {
    return {
      items: this.getItems(orcamento),
      payer: this.getPayer(orcamento),
      shipments: { receiver_address: this.getRecieverAdress(orcamento) },
      application_fee: 0,
      binary_mode: true,
    }
  }
  getInstallments(orcamento: Orcamento): number {
    return 6;
  }
  getItems(orcamento: Orcamento): mp_checkout_items[] {
    let items: mp_checkout_items[] = [];
    orcamento.Produto.forEach(produto => items.push(
      {
        id: produto.Produto._id,
        title: produto.Produto.Nome,
        description: produto.Produto.Subtitulo,
        category_id: produto.Produto.Categoria.Nome,
        quantity: produto.Produto.Quantidade,
        currency_id: 'BRL',
        unit_price: produto.Produto.PrecoPromocional > 0 ?
          parseFloat(produto.Produto.PrecoPromocional.toFixed(2)) :
          parseFloat(produto.Produto.Preco.toFixed(2)),
        pictures: [{ source: produto.Produto.Imagem[0] }],
        //shipping: this.getShipping(produto.Produto,orcamento)
      }
    ))
    return items;
  }
  getPaymentMethod(orcamento: Orcamento, integracoes: Integracoes): mp_payment_methods {
    return {
      excluded_payment_methods: [
        {
          id: "bolbradesco"
        }
      ],
      excluded_payment_types: [
        {
          id: "ticket"
        }
      ],
      installments: this.getInstalments(integracoes, orcamento)
    }
  }
  getInstalments(integracoes: Integracoes, orcamento: Orcamento): number {
    let installments = integracoes.ParcelasPadrao;

    if (this.unicoProduto(orcamento))
      installments = orcamento.Produto[0].Produto.Parcelas

    return installments;
  }
  getPayer(orcamento: Orcamento): mp_checkout_payer {
    return {
      name: orcamento.Usuario.Nome,
      surname: "",
      email: orcamento.Usuario.Email,
      date_created: orcamento.Usuario.DataCriacao?.toString() ?? new Date().toString(),
      registration_date: orcamento.Usuario.DataCriacao ?? new Date(),
      phone: {
        area_code: orcamento.Usuario.Telefone.substr(0, 2),
        number: parseInt(orcamento.Usuario.Telefone.substr(3))
      },

      identification: {
        type: "CPF",
        number: orcamento.Usuario.CPF
      },

      address: {
        street_name: orcamento.Usuario.EnderecoEntrega.Rua,
        street_number: parseInt(orcamento.Usuario.EnderecoEntrega.Numero),
        zip_code: orcamento.Usuario.EnderecoEntrega.CEP
      }
    }
  }
  getShipments(orcamento: Orcamento): mp_shipments {
    return {
      mode: 'custom',
      local_pickup: false,
      modes: [
        "custom",
        "not_specified",
        "me1",
        "me2"
      ],
      dimensions: orcamento.Dimensoes,
      // default_shipping_method:0,
      // free_shipping:false,
      cost:this.getShippingCost(orcamento),
      receiver_address: this.getRecieverAdress(orcamento)
    }
  }
  getRecieverAdress(orcamento: Orcamento) {
    return {
      zip_code: orcamento.Usuario.EnderecoEntrega.CEP,
      street_name: orcamento.Usuario.EnderecoEntrega.Rua,
      city_name: orcamento.Usuario.EnderecoEntrega.Cidade,
      state_name: orcamento.Usuario.EnderecoEntrega.Estado,
      street_number: parseInt(orcamento.Usuario.EnderecoEntrega.Numero),
      floor: orcamento.Usuario.EnderecoEntrega.Complemento ?? "",
      apartment: orcamento.Usuario.EnderecoEntrega.Complemento ?? "",
      country_name: 'Brasil',
    }
  }
  getShipping(produto: Produto, orcamento:Orcamento): mp_shipping {
    return {
      mode: 'custom',
      local_pick_up: false,
      dimensions: `${produto.Dimensoes.Altura}x${produto.Dimensoes.Largura}x${produto.Dimensoes.Comprimento},${produto.Peso}`,
      free_shipping: false,
      free_methods: [],
      cost: this.getShippingCost(orcamento)

      // default_shipping_method:0,
    }
  }
  getShippingCost(orcamento:Orcamento): number{
    return 25;
  }

  unicoProduto(orcamento: Orcamento): boolean {
    return orcamento.Produto.length == 1 && (orcamento.Produto[0].Produto?.Parcelas || 0) > 0
  }
}
