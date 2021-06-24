import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';

const OrcamentoRouter = express();

let OrcamentoService: Services.OrcamentoService = new Services.OrcamentoService();

OrcamentoRouter.get(RouteDictionary.Orcamento, async (req: any, res) => {
  try {
    res.send(await OrcamentoService.Ler());
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
}).get(RouteDictionary.Pedidos, async (req: any, res) => {
  try {
    res.send(await OrcamentoService.FiltrarOrcamentosPorUsuario(await UsuarioLogado(req, res)));
  }
  catch (err) {
  ErrorHandler.DefaultException(err, res)
}
}).post(RouteDictionary.Orcamento, async (req: any, res) => {
  try {
    res.send(await OrcamentoService.Inserir(null, req.body.payload.item.Orcamento));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
}).put(RouteDictionary.Orcamento, async (req: any, res) => {
  try {
    res.send(await OrcamentoService.Alterar(await UsuarioLogado(req, res), req.body.item.Orcamento));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
}).delete(RouteDictionary.Orcamento, async (req: any, res) => {
  try {
    res.send(await OrcamentoService.Deletar(await UsuarioLogado(req, res), req.query.id));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
});
export {
  OrcamentoRouter
}
