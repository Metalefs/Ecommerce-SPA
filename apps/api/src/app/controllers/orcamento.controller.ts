import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';

const OrcamentoRouter = express();

let OrcamentoService: Services.OrcamentoService = new Services.OrcamentoService();

OrcamentoRouter.get(RouteDictionary.Orcamento.Padrao, async (req: any, res) => {
  try {
    const result = await OrcamentoService.Ler();
    res.send(result);
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.get(RouteDictionary.Orcamento.Pedidos, async (req: any, res) => {
  try {
    const usuario = await UsuarioLogado(req, res);
    const result = await OrcamentoService.FiltrarOrcamentosPorUsuario(usuario);
    res.send(result);
  }
  catch (err) {
  ErrorHandler.DefaultException(err, res)
}
})
.post(RouteDictionary.Orcamento.Padrao, async (req: any, res) => {
  try {
    const result = await OrcamentoService.Inserir(null, req.body.payload.item.Orcamento);
    res.send(result);
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.put(RouteDictionary.Orcamento.Padrao, async (req: any, res) => {
  try {
    const usuario = await UsuarioLogado(req, res);
    const result = await OrcamentoService.Alterar(usuario, req.body.item.Orcamento);
    res.send(result);
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.delete(RouteDictionary.Orcamento.Padrao, async (req: any, res) => {
  try {
    const usuario = await UsuarioLogado(req, res);
    const result = await OrcamentoService.Deletar(usuario, req.query.id);
    res.send(result);
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
});
export {
  OrcamentoRouter
}
