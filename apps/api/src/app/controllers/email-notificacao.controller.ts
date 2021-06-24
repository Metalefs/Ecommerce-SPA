import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';

const EmailNotificacaoRouter = express();

let EmailNotificacaoService: Services.EmailNotificacaoService = new Services.EmailNotificacaoService();

EmailNotificacaoRouter.get(RouteDictionary.EmailNotificacao, async(req: any, res) => {
  try {
    res.send(await EmailNotificacaoService.Ler());
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.post(RouteDictionary.EmailNotificacao, async(req: any, res) => {
  try {
    res.send(await EmailNotificacaoService.Inserir(req.body.item));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.put(RouteDictionary.EmailNotificacao, async (req: any, res) => {
  try {
    res.send(await EmailNotificacaoService.Alterar(await UsuarioLogado(req,res), req.body.item.EmailNotificacao));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.delete(RouteDictionary.EmailNotificacao, async (req: any, res) => {
  try {
    res.send(await EmailNotificacaoService.Deletar(await UsuarioLogado(req,res), req.query.id));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
});
export {
  EmailNotificacaoRouter
}
