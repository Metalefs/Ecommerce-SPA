import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import * as express from 'express';
import { ensureIsAdmin } from '../middleware/ensure-is-admin';
import BaseController from './base.controller';

const ClienteRouter = express();
let ClienteService: Services.ClienteService = new Services.ClienteService();

export class ClienteController extends BaseController {
  constructor(service:Services.CarouselService) {
    super(service)
  }
}

const ClienteCtrl = new ClienteController(ClienteService)
ClienteRouter.get(RouteDictionary.Cliente, ClienteCtrl.Ler)
.put(RouteDictionary.Cliente, ensureIsAdmin, ClienteCtrl.Editar)
.post(RouteDictionary.Cliente, ensureIsAdmin, ClienteCtrl.Incluir)
.delete(RouteDictionary.Cliente + `:id`, ensureIsAdmin, ClienteCtrl.Remover);

export {
  ClienteRouter
}
