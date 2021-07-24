import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';

import * as express from 'express';
import BaseController from './base.controller';
import { CupomDescontoService } from '../services';
import { ensureIsAdmin } from '../middleware/ensure-is-admin';

const CupomDescontoRouter = express();

export class CupomDescontoController extends BaseController {
  constructor(service:CupomDescontoService) {
    super(service);
  }
}

const CupomDescontoCtrl = new CupomDescontoController(new CupomDescontoService())

CupomDescontoRouter.get(RouteDictionary.CupomDesconto, ensureIsAdmin, CupomDescontoCtrl.Ler);
CupomDescontoRouter.put(RouteDictionary.CupomDesconto, ensureIsAdmin, CupomDescontoCtrl.Editar);
CupomDescontoRouter.post(RouteDictionary.CupomDesconto, ensureIsAdmin, CupomDescontoCtrl.Incluir);
CupomDescontoRouter.delete(RouteDictionary.CupomDesconto + `:id`, ensureIsAdmin, CupomDescontoCtrl.Remover);

export {
  CupomDescontoRouter
}
