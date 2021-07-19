import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";

import * as express from 'express';
import BaseController from './base.controller';
import { ensureIsAdmin } from '../middleware/ensure-is-admin';
import { ErrorHandler } from '../_handlers/error-handler';
import { UsuarioLogado } from '../_handlers/Authentication';
const PedidoRouter = express()

let PedidoService: Services.PedidoService = new Services.PedidoService();

export class PedidoController extends BaseController {
  constructor(service:Services.PedidoService) {
    super(service);
  }
}

const PedidoCtrl = new PedidoController(PedidoService)

PedidoRouter.get(RouteDictionary.Pedidos.Raiz,PedidoCtrl.Ler)
.get(RouteDictionary.Pedidos.PorUsuario, async (req: any, res) => {
  try {
    const usuario = await UsuarioLogado(req, res);
    const result = await PedidoService.Filtrar(usuario);
    res.send(result);
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.put(RouteDictionary.Pedidos.Raiz, ensureIsAdmin, PedidoCtrl.Editar)
.post(RouteDictionary.Pedidos.Raiz, ensureIsAdmin, PedidoCtrl.Incluir)
.delete(RouteDictionary.Pedidos + `:id`, ensureIsAdmin, PedidoCtrl.Remover);

export {
  PedidoRouter
}
