import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';

import * as express from 'express';
import BaseController from './base.controller';
import { DepartamentoService } from '../services';
import { ensureIsAdmin } from '../middleware/ensure-is-admin';

const DepartamentoRouter = express();

export class DepartamentoController extends BaseController {
  constructor(service:DepartamentoService) {
    super(service);
  }
}

const DepartamentoCtrl = new DepartamentoController(new DepartamentoService())

DepartamentoRouter.get(RouteDictionary.Departamento,DepartamentoCtrl.Ler);
DepartamentoRouter.put(RouteDictionary.Departamento, ensureIsAdmin, DepartamentoCtrl.Editar);
DepartamentoRouter.post(RouteDictionary.Departamento, ensureIsAdmin, DepartamentoCtrl.Incluir);
DepartamentoRouter.delete(RouteDictionary.Departamento + `:id`, ensureIsAdmin, DepartamentoCtrl.Remover);

export {
  DepartamentoRouter
}
