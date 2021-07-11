import * as express from 'express';

import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { ensureIsAdmin } from '../middleware/ensure-is-admin';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';
import BaseController from './base.controller';

const InformacoesContatoRouter = express();

let InformacoesContatoService: Services.InformacoesContatoService = new Services.InformacoesContatoService();

export class InformacoesContatoController extends BaseController {
  constructor(service:Services.InformacoesContatoService) {
    super(service)
  }
}

const InformacoesContatoCtrl = new InformacoesContatoController(InformacoesContatoService)
InformacoesContatoRouter.get(RouteDictionary.InformacoesContato, async (req: any, res) => {
  InformacoesContatoService.LerPrimeiro()
  .then(result => res.send(result))
  .catch(err => ErrorHandler.DefaultException(err, res))})
.put(RouteDictionary.InformacoesContato, ensureIsAdmin, InformacoesContatoCtrl.Editar)
.post(RouteDictionary.InformacoesContato, ensureIsAdmin, InformacoesContatoCtrl.Incluir)
.delete(RouteDictionary.InformacoesContato + `:id`, ensureIsAdmin, InformacoesContatoCtrl.Remover);

export {
  InformacoesContatoRouter
}
