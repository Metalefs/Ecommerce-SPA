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
})
export {
  MercadoPagoController
}
