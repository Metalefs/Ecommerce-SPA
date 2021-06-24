import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';
const ServicoRouter = express();

let ServicoService: Services.ServicoService = new Services.ServicoService();

ServicoRouter.get(RouteDictionary.Servico, async (req: any, res) => {
  try {
    res.send(await ServicoService.Ler());
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
}).post(RouteDictionary.Servico, async (req: any, res) => {
  try {
    res.send(await ServicoService.Inserir(await UsuarioLogado(req, res), req.body.item.Servico));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
}).put(RouteDictionary.Servico, async (req: any, res) => {
  try {
    res.send(await ServicoService.Alterar(await UsuarioLogado(req, res), req.body.item.Servico));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
}).delete(RouteDictionary.Servico, async (req: any, res) => {
  try {
    res.send(ServicoService.Deletar(await UsuarioLogado(req, res), req.query.id));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
});
export {
  ServicoRouter
}
