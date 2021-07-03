import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { MercadoPagoService } from '../services';
import { UsuarioLogado } from '../_handlers/Authentication';

const MercadoPagoController = express();

let mercadoPagoService = new MercadoPagoService();

MercadoPagoController
.get(RouteDictionary.ListPayments, async (req: any, res) => {
  try {
    res.send(await mercadoPagoService.getAllPayments(await UsuarioLogado(req,res)));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.post("/ipn", (req, res) => {
  res.status(201).send();
  console.log(req.query.id)
})
.post("/hook", (req, res) => {
  res.status(201).send();
  console.log(req.query.id)
})
.post("/process_payment", (req, res) => {

  var payment_data = {
    transaction_amount: Number(req.body.transactionAmount),
    token: req.body.token,
    description: req.body.description,
    installments: Number(req.body.installments),
    payment_method_id: req.body.paymentMethodId,
    issuer_id: req.body.issuerId,
    payer: {
      email: req.body.payer.email,
      identification: {
        type: req.body.payer.identification.docType,
        number: req.body.payer.identification.docNumber
      }
    }
  };
  console.log(payment_data);
  // mercadopago.payment.save(payment_data)
  //   .then(function(response) {
  //     res.status(response.status).json({
  //       status: response.body.status,
  //       message: response.body.status_detail,
  //       id: response.body.id
  //     });
  //   })
  //   .catch(function(error) {
  //     res.status(error.status).send(error);
  //   });
})
.post(RouteDictionary.Checkout, async (req: any, res) => {
    try {
      let preference = mercadoPagoService.getPreference(req.body.orcamento);
      res.send(await mercadoPagoService.checkout(preference));
    }
    catch (err) {
      ErrorHandler.DefaultException(err, res)
    }
})

.post(RouteDictionary.Refund, (req: any, res) => {
  try {
    mercadoPagoService.searchPayment(req.body.idPagamento).then(payment=>{
      console.log(payment);
      switch(payment.status){
        case('approved'):{
          mercadoPagoService.refund(req.body.idPagamento).then(x=>{
            res.send(x);
          });
          break;
        }
        case('pending'):{
          mercadoPagoService.cancel(req.body.idPagamento).then(x=>{
            res.send(x);
          });
          break;
        }
      }
    });
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})

export {
  MercadoPagoController
}
