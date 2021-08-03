import { CupomDesconto, Integracoes, Orcamento, Produto, Usuario } from 'libs/data/src/lib/classes';
import { TipoUsuario } from 'libs/data/src/lib/enums';
import { MercadoPagoCheckout, MercadoPagoPayment, MercadoPagoRefund, mp_checkout_items, mp_checkout_payer, mp_payment_methods, mp_shipments } from 'libs/data/src/lib/interfaces';
import { mp_checkout_payer_address, mp_shipping } from 'libs/data/src/lib/interfaces/mercadoPagoCheckout';
import { mp_payment_additional_info, mp_payment_additional_info_payer, mp_payment_additional_info_payer_address, mp_payment_payer } from 'libs/data/src/lib/interfaces/mercadoPagoPayment';
import { ActualSearchPaymentResponse } from 'libs/data/src/lib/interfaces/mercadoPagoSearchPaymentResult';
import { IntegracoesService } from '../domain/integracoes.service';
import { TipoDesconto } from '../../../../../../libs/data/src/lib/classes/cupom-desconto';

const CALLBACK_URL = "https://www.personalizadoslopes.com.br/checkout/success";

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
let MP_AT: Integracoes;
export class MercadoPagoService {

  FindPaymentById(id:string|number):MercadoPagoPayment{
    const filters = {
      id:id
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
  FindPlanById(id:string|number){

  }
  FindSubscriptionById(id:string|number){

  }
  FindInvoiceById(id:string|number){

  }
  FindMerchantOrderById(id:string|number){
    const filters = {
      id:id
    };

    return mercadopago.merchant_order.search({
      qs: filters
    }).then(function (data) {
      return data;
    }).catch(function (error) {
      console.log(error);
      return error
    });
  }

  async getAllPayments(user: Usuario): Promise<MercadoPagoPayment[]> {
    if (user.Tipo !== TipoUsuario.admin)
      return;

    const filters = {
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

  async searchPayment(payment_id): Promise<ActualSearchPaymentResponse> {
    const filters = {
      site_id: 'MLB',
      id: payment_id
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

  async cancel(payment_id: number) {
    return mercadopago.payment.update({
      id: payment_id,
      status: "cancelled"
    }).then(x => x).catch();
  }

  async refund(payment_id: number): Promise<MercadoPagoRefund> {
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
      const init_point = response.body.init_point
      const id = response.body.id;
      return { result: init_point, id };
    }).catch(error => {
      console.log(error);
      return error
    });
  }

  obterPagamento(orcamento: Orcamento, ipAdress: string, paymentMethod: string = "pix"): MercadoPagoPayment {
    return {
      additional_info: this.getAdditionalInfo(orcamento, ipAdress),
      description: "Pagamento de produto",
      external_reference: '',
      installments: this.getInstallments(orcamento),
      metadata: {},
      order: { type: "mercadopago" },
      payer: this.getPaymentPayer(orcamento),
      payment_method_id: paymentMethod,
      transaction_amount: this.getTransactionAmount(orcamento),
      binary_mode: true,
      statement_descriptor: MP_AT.ResumoCartao,
      callback_url: CALLBACK_URL,
    }
  }

  getPaymentPayer(orcamento: Orcamento): mp_payment_payer {
    return {
      ...this.getAdditionalInfoPayer(orcamento)
    }
  }

  getPreference(orcamento: Orcamento, cupom?:CupomDesconto): MercadoPagoCheckout {
    return {
      items: this.getItems(orcamento,cupom[0]),
      payer: this.getPayer(orcamento),
      payment_methods: this.getPaymentMethod(orcamento, MP_AT),
      //shipments: this.getShipments(orcamento),
      back_urls: {
        success: "https://www.personalizadoslopes.com.br/checkout/success",
        failure: "https://www.personalizadoslopes.com.br/checkout/failure",
        pending: "https://www.personalizadoslopes.com.br/checkout/pending"
      },
      statement_descriptor: MP_AT.ResumoCartao,
      additional_info: '',
      auto_return: MP_AT.auto_return,
      binary_mode: MP_AT.binary_mode,
      // client_id: parseInt(MP_AT.client_id.toString()),
      // collector_id: parseInt(MP_AT.collector_id.toString()),
      // client_secret: MP_AT.client_secret,
      notification_url: "https://personalizadoslopes-api.herokuapp.com/hook",
    };
  }

  getAdditionalInfo(orcamento: Orcamento, ipAdress: string): mp_payment_additional_info {
    return {
      ip_address: ipAdress,
      items: this.getItems(orcamento),
      payer: this.getAdditionalInfoPayer(orcamento),
      shipments: { receiver_address: this.getRecieverAdress(orcamento) },
    }
  }

  getInstallments(orcamento: Orcamento): number {
    return 6;
  }

  getItems(orcamento: Orcamento, cupom?:CupomDesconto): mp_checkout_items[] {

    const items: mp_checkout_items[] = [];
    console.log(cupom)
    orcamento.Produto.forEach(produto => {
      if(cupom){
        switch(+cupom.Tipo){
          case(TipoDesconto.Preco):{
            produto.Produto.Preco -= cupom.Valor;
            produto.Produto.Nome += ` (${(cupom.Valor)} reais off com cupom ${cupom.Codigo})`;
            break;
          }
          case(TipoDesconto.Porcentagem):{
            produto.Produto.Preco -= (produto.Produto.Preco * cupom.Valor) /100;
            produto.Produto.Nome += ` (${(cupom.Valor)}% off com cupom ${cupom.Codigo})`;
            console.log('porcentagem desconto',(produto.Produto.Preco * cupom.Valor) /100)
            break;
          }
        }
      }
      console.log(produto.Produto.Preco)
      items.push(
        {
          id: produto.Produto._id,
          title: produto.Produto.Nome,
          description: produto.Produto.Subtitulo,
          category_id: "fashion",
          quantity: produto.Produto.Quantidade,
          currency_id: 'BRL',
          unit_price: produto.Produto.Preco,
          pictures: [{ source: produto.Produto.Imagem[0] }],
        }
      )
    })
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

  getAdditionalInfoPayer(orcamento: Orcamento): mp_payment_additional_info_payer {
    return {
      entity_type: 'individual',
      type: 'customer',
      identification: {
        type: "CPF",
        number: orcamento.Usuario.CPF
      },
      phone: {
        area_code: orcamento.Usuario.Telefone.substr(0, 2),
        number: orcamento.Usuario.Telefone.substr(3)
      },
      email: orcamento.Usuario.Email,
      first_name: orcamento.Usuario.Nome,
      last_name: orcamento.Usuario.Nome.split(" ")?.splice(0, 1)?.reduce((a, b, i) => a + " " + b) ?? "",
      address: this.getAdditionalInfoPayerAdress(orcamento),
    }
  }

  getAdditionalInfoPayerAdress(orcamento: Orcamento): mp_payment_additional_info_payer_address {
    return {
      street_name: orcamento.Usuario.EnderecoEntrega.Rua,
      street_number: parseInt(orcamento.Usuario.EnderecoEntrega.Numero,10),
      zip_code: orcamento.Usuario.EnderecoEntrega.CEP,
    }
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
        number: parseInt(orcamento.Usuario.Telefone.substr(3),10)
      },

      identification: {
        type: "CPF",
        number: orcamento.Usuario.CPF
      },

      address: this.getCheckoutPayerAdress(orcamento)
    }
  }

  getCheckoutPayerAdress(orcamento: Orcamento): mp_checkout_payer_address {
    return {
      street_name: orcamento.Usuario.EnderecoEntrega.Rua,
      street_number: parseInt(orcamento.Usuario.EnderecoEntrega.Numero,10),
      zip_code: orcamento.Usuario.EnderecoEntrega.CEP,
      neighborhood: orcamento.Usuario.EnderecoEntrega.Bairro,
      federal_unit: 'Brazil',
      city: orcamento.Usuario.EnderecoEntrega.Cidade,
    }
  }

  getShipments(orcamento: Orcamento): mp_shipments {
    return {
      mode: 'custom',
      //local_pickup: false,
      // modes: [
      //   "custom",
      //   "not_specified",
      //   "me1",
      //   "me2"
      // ],
      //dimensions: orcamento.Dimensoes,
      //default_shipping_method:0,
      free_shipping: false,
      cost: this.getShippingCost(orcamento),
      receiver_address: this.getRecieverAdress(orcamento)
    }
  }

  getRecieverAdress(orcamento: Orcamento) {
    return {
      zip_code: orcamento.Usuario.EnderecoEntrega.CEP,
      street_name: orcamento.Usuario.EnderecoEntrega.Rua,
      city_name: orcamento.Usuario.EnderecoEntrega.Cidade,
      state_name: orcamento.Usuario.EnderecoEntrega.Estado,
      street_number: parseInt(orcamento.Usuario.EnderecoEntrega.Numero,10),
      floor: orcamento.Usuario.EnderecoEntrega.Complemento ?? "",
      apartment: orcamento.Usuario.EnderecoEntrega.Complemento ?? "",
      country_name: 'Brasil',
    }
  }

  getShipping(produto: Produto, orcamento: Orcamento): mp_shipping {
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

  getTransactionAmount(orcamento: Orcamento): number {
    return orcamento.Preco;
  }

  getShippingCost(orcamento: Orcamento): number {
    return 25;
  }

  unicoProduto(orcamento: Orcamento): boolean {
    return orcamento.Produto.length === 1 && (orcamento.Produto[0].Produto?.Parcelas || 0) > 0
  }
}

(async function configure() {
  const integracoesService = new IntegracoesService();
  MP_AT = await integracoesService.LerUltimo() as Integracoes;
  mercadopago.configure({
    access_token: MP_AT.MP_access_token,
    // client_secret: MP_AT.client_secret
  });
})();
