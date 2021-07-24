import * as express from 'express';
import * as Services from "../services";
import BaseController from './base.controller';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { ErrorHandler } from '../_handlers/error-handler';

import { Integracoes } from 'libs/data/src/lib/classes';
import { ensureIsAdmin } from '../middleware/ensure-is-admin';

const IntegracoesRouter = express();
let IntegracoesService = new Services.IntegracoesService();

export class IntegracoesController extends BaseController {
  constructor(service:Services.IntegracoesService) {
    super(service)
  }
}
const IntegracoesCtrl = new IntegracoesController(IntegracoesService);
IntegracoesRouter.get(RouteDictionary.Integracoes.Raiz, ensureIsAdmin, async (req: any, res) => {
  IntegracoesService.LerUltimo()
  .then(result => res.send(result))
  .catch(err => ErrorHandler.DefaultException(err, res))
})

.get(RouteDictionary.Integracoes.ChavePublicaMercadoPago, async (req: any, res) => {
  IntegracoesService.LerUltimo()
  .then((result : Integracoes)  => res.send(result.public_key))
  .catch(err => ErrorHandler.DefaultException(err, res))
})
.get(RouteDictionary.Integracoes.QuantidadeParcelas, async (req: any, res) => {
  IntegracoesService.LerUltimo()
  .then((result : Integracoes)  => res.send(result.ParcelasPadrao))
  .catch(err => ErrorHandler.DefaultException(err, res))
})

.put(RouteDictionary.Integracoes.Raiz, ensureIsAdmin, IntegracoesCtrl.Editar)
.post(RouteDictionary.Integracoes.Raiz, ensureIsAdmin, IntegracoesCtrl.Incluir)
.delete(RouteDictionary.Integracoes.Raiz + `:id`, ensureIsAdmin, IntegracoesCtrl.Remover);

export {
  IntegracoesRouter
}
