import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { MercadoPagoService } from '../services';

const MercadoPagoController = express();

MercadoPagoController.get(RouteDictionary.Checkout, (req: any, res) => {
  try {
    let mercadoPagoService = new MercadoPagoService();
    mercadoPagoService.Ler().then(x=>{
      res.send(x);
    });
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
}).post(RouteDictionary.Checkout, (req: any, res) => {
    try {
      let mercadoPagoService = new MercadoPagoService();
      mercadoPagoService.checkout(req.body.preference).then(x=>{
        res.send(x);
      });
    }
    catch (err) {
      ErrorHandler.DefaultException(err, res)
    }
}).post(RouteDictionary.Refund, (req: any, res) => {
  try {
    let mercadoPagoService = new MercadoPagoService();
    mercadoPagoService.searchPayment(req.body.idPagamento).then(payment=>{

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
