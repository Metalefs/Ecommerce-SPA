import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';

const ClienteRouter = express();

let ClienteService: Services.ClienteService = new Services.ClienteService();

ClienteRouter.get(RouteDictionary.Cliente, async (req: any, res) => {
  ClienteService.Ler()
  .then(result => res.send(result))
  .catch(err => ErrorHandler.DefaultException(err, res));
})

.post(RouteDictionary.Cliente, async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex => ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    ClienteService.Inserir(usuario, req.body.item.Cliente)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
})

.put(RouteDictionary.Cliente, async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex => ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    ClienteService.Alterar(usuario, req.body.item.Cliente)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
})

.delete(RouteDictionary.Cliente + ":id", async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex =>ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    ClienteService.Deletar(usuario, req.params.id)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
});

export {
  ClienteRouter
}
