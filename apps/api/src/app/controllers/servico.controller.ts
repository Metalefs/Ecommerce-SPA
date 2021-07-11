import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";

import * as express from 'express';
import BaseController from './base.controller';
import { ensureIsAdmin } from '../middleware/ensure-is-admin';
const ServicoRouter = express()

let ServicoService: Services.ServicoService = new Services.ServicoService();

export class ServicoController extends BaseController {
  constructor(service:Services.ServicoService) {
    super(service);
  }
}

const ServicoCtrl = new ServicoController(ServicoService)

ServicoRouter.get(RouteDictionary.Servico,ServicoCtrl.Ler)
.put(RouteDictionary.Servico, ensureIsAdmin, ServicoCtrl.Editar)
.post(RouteDictionary.Servico, ensureIsAdmin, ServicoCtrl.Incluir)
.delete(RouteDictionary.Servico + `:id`, ensureIsAdmin, ServicoCtrl.Remover);

export {
  ServicoRouter
}
