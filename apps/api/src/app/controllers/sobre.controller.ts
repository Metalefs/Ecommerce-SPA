import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import * as express from 'express';
import { ErrorHandler } from '../_handlers/error-handler';
import BaseController from './base.controller';
import { ensureIsAdmin } from '../middleware/ensure-is-admin';
const SobreRouter = express();

let SobreService: Services.SobreService = new Services.SobreService();

SobreRouter

export class SobreController extends BaseController {
  constructor(service:Services.SobreService) {
    super(service);
  }
}

const SobreCtrl = new SobreController(SobreService)

SobreRouter.get(RouteDictionary.Sobre, async (req: any, res) => {
  try {
    const result = await SobreService.LerPrimeiro();
    res.send(result);
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.put(RouteDictionary.Sobre, ensureIsAdmin, SobreCtrl.Editar)
.post(RouteDictionary.Sobre, ensureIsAdmin, SobreCtrl.Incluir)
.delete(RouteDictionary.Sobre + `:id`, ensureIsAdmin, SobreCtrl.Remover);

export {
  SobreRouter
}
