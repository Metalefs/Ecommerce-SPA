import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';

const EmailNotificacaoRouter = express();

let EmailNotificacaoService: Services.EmailNotificacaoService = new Services.EmailNotificacaoService();

EmailNotificacaoRouter.get(RouteDictionary.EmailNotificacao, async(req: any, res) => {
  EmailNotificacaoService.Ler()
  .then(result => res.send(result))
  .catch(err => ErrorHandler.DefaultException(err, res));
})

.post(RouteDictionary.EmailNotificacao, async(req: any, res) => {
  EmailNotificacaoService.Inserir(req.body.item.EmailNotificacao)
  .then(result => res.send(result))
  .catch(err => ErrorHandler.DefaultException(err, res))
})

.put(RouteDictionary.EmailNotificacao, async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex => ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    EmailNotificacaoService.Alterar(usuario,req.body.item.EmailNotificacao)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
})

.delete(RouteDictionary.EmailNotificacao + ":id", async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex =>ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    EmailNotificacaoService.Deletar(usuario, req.params.id)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
});

export {
  EmailNotificacaoRouter
}
