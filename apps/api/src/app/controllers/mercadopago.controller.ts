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

.post(RouteDictionary.Checkout, async (req: any, res) => {
    try {
      let preference = mercadoPagoService.getPreference(req.body.orcamento);
      res.send(await mercadoPagoService.checkout(preference));
    }
    catch (err) {
      ErrorHandler.DefaultException(err, res)
    }
})

.get('/feedback', function(request, response) {
  response.json({
   Payment: request.query.payment_id,
   Status: request.query.status,
   MerchantOrder: request.query.merchant_order_id
 })
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
