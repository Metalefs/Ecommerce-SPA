import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';
import { Integracoes } from 'libs/data/src/lib/classes';
const IntegracoesRouter = express();

let IntegracoesService: Services.IntegracoesService = new Services.IntegracoesService();

IntegracoesRouter.get(RouteDictionary.Integracoes.Raiz, async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex => ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    IntegracoesService.LerUltimo()
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
})

.get(RouteDictionary.Integracoes.ChavePublicaMercadoPago, async (req: any, res) => {
  IntegracoesService.LerUltimo()
  .then((result : Integracoes)  => res.send(result.public_key))
  .catch(err => ErrorHandler.DefaultException(err, res))
})

.post(RouteDictionary.Integracoes.Raiz, async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex => ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    IntegracoesService.Inserir(usuario, req.body.item.Integracoes)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
})

.put(RouteDictionary.Integracoes.Raiz, async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex => ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    IntegracoesService.Alterar(usuario, req.body.item.Integracoes)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
})

.delete(RouteDictionary.Integracoes.Raiz + ":id", async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex =>ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    IntegracoesService.Deletar(usuario, req.params.id)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
});

export {
  IntegracoesRouter
}
