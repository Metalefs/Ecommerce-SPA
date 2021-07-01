import * as express from 'express';

import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import { UsuarioLogado } from '../_handlers/Authentication';

const InformacoesContatoRouter = express();

let InformacoesContatoService: Services.InformacoesContatoService = new Services.InformacoesContatoService();

InformacoesContatoRouter.get(RouteDictionary.InformacoesContato, async (req: any, res) => {
  InformacoesContatoService.LerPrimeiro()
  .then(result => res.send(result))
  .catch(err => ErrorHandler.DefaultException(err, res));
})

.post(RouteDictionary.InformacoesContato, async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex => ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    InformacoesContatoService.Inserir(usuario, req.body.item.InformacoesContato)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
})

.put(RouteDictionary.InformacoesContato, async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex => ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    InformacoesContatoService.Alterar(usuario, req.body.item.InformacoesContato)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
})

.delete(RouteDictionary.InformacoesContato + ":id", async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex =>ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    InformacoesContatoService.Deletar(usuario, req.params.id)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
});
export {
  InformacoesContatoRouter
}
