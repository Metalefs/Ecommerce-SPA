import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';
const ServicoRouter = express();

let ServicoService: Services.ServicoService = new Services.ServicoService();

ServicoRouter.get(RouteDictionary.Servico, async (req: any, res) => {
  try {
    const result = await ServicoService.Ler();
    res.send(result);
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.post(RouteDictionary.Servico, async (req: any, res) => {
  try {
    const usuario = await UsuarioLogado(req, res);
    const result = await ServicoService.Inserir(usuario, req.body.item.Servico);
    res.send(result);
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.put(RouteDictionary.Servico, async (req: any, res) => {
  try {
    const usuario = await UsuarioLogado(req, res);
    const result = await ServicoService.Alterar(usuario, req.body.item.Servico);
    res.send(result);
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.delete(RouteDictionary.Servico, async (req: any, res) => {
  try {
    const usuario = await UsuarioLogado(req, res);
    const result = ServicoService.Deletar(usuario, req.query.id);
    res.send(result);
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
});
export {
  ServicoRouter
}
