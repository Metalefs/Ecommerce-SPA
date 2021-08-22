import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../../services";

import * as express from 'express';
import BaseController from '../base.controller';
import { ensureIsAdmin } from '../../middleware/ensure-is-admin';
import { ErrorHandler } from '../../_handlers/error-handler';
import { UsuarioLogado } from '../../_handlers/Authentication';
import { EnviarCodRastreamentoRequest } from 'libs/data/src/lib/interfaces';
import { Pedido } from 'libs/data/src/lib/classes';
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
    const result = await PedidoService.Filtrar({'Usuario.CPF':usuario.CPF});
    res.send(result);
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.get(RouteDictionary.Pedidos.Raiz + ":id", FiltrarPorId)
.put(RouteDictionary.Pedidos.Raiz, ensureIsAdmin, PedidoCtrl.Editar)
.put(RouteDictionary.Pedidos.Raiz + RouteDictionary.Pedidos.CodigoRastreamento, ensureIsAdmin, EnviarCodigoRastreamento)
.post(RouteDictionary.Pedidos.Raiz, ensureIsAdmin, PedidoCtrl.Incluir)
.delete(RouteDictionary.Pedidos.Raiz + `:id`, ensureIsAdmin, PedidoCtrl.Remover);
async function FiltrarPorId(req, res){
  if (req.params.id)
  PedidoService.FiltrarPorId(req.params.id)
      .then(result => res.send(result))
      .catch(err => ErrorHandler.DefaultException(err, res))
  else
    ErrorHandler.DefaultException("unknown", res);
}
async function EnviarCodigoRastreamento(req,res){
 const codRequest = req.body as EnviarCodRastreamentoRequest;
 console.log(codRequest);
 PedidoService.EnviarCodigoRastreamento(res.locals.user, codRequest.idPedido, codRequest.codRastreamento)
  .then(result => res.send(result))
  .catch(err => ErrorHandler.DefaultException(err, res))
}
export {
  PedidoRouter
}
