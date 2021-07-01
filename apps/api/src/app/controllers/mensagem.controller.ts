import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';

const MensagemRouter = express();

let MensagemService: Services.MensagemService = new Services.MensagemService();

MensagemRouter.get(RouteDictionary.Mensagem, async (req: any, res) => {
  MensagemService.Ler()
  .then(result => res.send(result))
  .catch(err => ErrorHandler.DefaultException(err, res));
})

.post(RouteDictionary.Mensagem, async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex => ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    MensagemService.Inserir(usuario, req.body.item.Mensagem)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
})

.put(RouteDictionary.Mensagem, async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex => ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    MensagemService.Alterar(usuario, req.body.item.Mensagem)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
})

.delete(RouteDictionary.Mensagem + ":id", async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex =>ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    MensagemService.Deletar(usuario, req.params.id)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
});

export {
  MensagemRouter
}
