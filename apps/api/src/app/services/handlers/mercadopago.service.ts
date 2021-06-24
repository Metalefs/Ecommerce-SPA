import { Usuario } from 'libs/data/src/lib/classes';
import { TipoUsuario } from 'libs/data/src/lib/enums';
import { MercadoPagoPayment, MercadoPagoRefund } from 'libs/data/src/lib/interfaces';
import { ActualSearchPaymentResponse } from 'libs/data/src/lib/interfaces/mercadoPagoSearchPaymentResult';
import { IntegracoesService } from '../domain/integracoes.service';

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
(async function configure(){
  let integracoesService = new IntegracoesService();
  let MP_AT = await integracoesService.Ler();
  mercadopago.configure({
    access_token: MP_AT.MP_access_token
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
}
