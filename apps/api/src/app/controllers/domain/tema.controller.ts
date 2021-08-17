import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../../services"
import * as express from 'express';
import BaseController from '../base.controller';
import { ensureIsAdmin } from '../../middleware/ensure-is-admin';
const TemaRouter = express();

let TemaService: Services.TemaService = new Services.TemaService();

export class TemaController extends BaseController {
  constructor(service:Services.TemaService) {
    super(service);
  }
}

const TemaCtrl = new TemaController(TemaService)

TemaRouter.get(RouteDictionary.Tema,TemaCtrl.Ler)
.put(RouteDictionary.Tema, ensureIsAdmin, TemaCtrl.Editar)
.post(RouteDictionary.Tema, ensureIsAdmin, TemaCtrl.Incluir)
.delete(RouteDictionary.Tema + `:id`, ensureIsAdmin, TemaCtrl.Remover);

export {
  TemaRouter
}
