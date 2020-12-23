// SDK de Mercado Pago
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: 'TEST-5732271634363324-122306-e9306eacc9d93c2e45217186f54ee17a-28731454'
});

export class MercadoPagoService{
  // Agrega credenciales
  makecheckout = (preference) => {
    console.log(preference);
    return mercadopago.preferences.create(preference);
  }
  async checkout(preference) {
    return this.makecheckout(preference).then(response => {
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
