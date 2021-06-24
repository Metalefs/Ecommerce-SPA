import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';

const MensagemRouter = express();

let MensagemService: Services.MensagemService = new Services.MensagemService();

MensagemRouter.get(RouteDictionary.Mensagem, async (req: any, res) => {
  try {
    res.send(await MensagemService.Ler());
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
}).post(RouteDictionary.Mensagem, async (req: any, res) => {
  try {
    res.send(await MensagemService.Inserir(await UsuarioLogado(req,res), req.body.item.Mensagem));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
}).put(RouteDictionary.Mensagem, async (req: any, res) => {
  try {
    res.send(await MensagemService.Alterar(await UsuarioLogado(req,res), req.body.item.Mensagem));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
}).delete(RouteDictionary.Mensagem, async (req: any, res) => {
  try {
    res.send(await MensagemService.Deletar(await UsuarioLogado(req,res), req.query.id));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
});
export {
  MensagemRouter
}
