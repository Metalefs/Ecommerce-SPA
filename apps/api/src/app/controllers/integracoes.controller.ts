import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';
const IntegracoesRouter = express();

let IntegracoesService: Services.IntegracoesService = new Services.IntegracoesService();

IntegracoesRouter.get(RouteDictionary.Integracoes, async (req: any, res) => {
  try {
    res.send(await IntegracoesService.LerUltimo());
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.post(RouteDictionary.Integracoes, async (req: any, res) => {
  try {
    res.send(await IntegracoesService.Inserir(await UsuarioLogado(req,res), req.body.item.Integracoes));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.put(RouteDictionary.Integracoes, async (req: any, res) => {
  try {
    res.send(await IntegracoesService.Alterar(await UsuarioLogado(req,res), req.body.item.Integracoes));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.delete(RouteDictionary.Integracoes, async (req: any, res) => {
  try {
    res.send(await IntegracoesService.Deletar(await UsuarioLogado(req,res), req.query.id));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
});
export {
  IntegracoesRouter
}
