import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';

const EstampaRouter = express();
let EstampaService: Services.EstampaService = new Services.EstampaService();

EstampaRouter.get(RouteDictionary.Estampa.Raiz, FiltrarEstampa)

.post(RouteDictionary.Estampa.Raiz, async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex => ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    EstampaService.Inserir(usuario, req.body.item.Estampa)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
})

.put(RouteDictionary.Estampa.Raiz, async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex => ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    EstampaService.Alterar(usuario,req.body.item.Estampa)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
})

.delete(RouteDictionary.Estampa.Raiz + ":id", async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex =>ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    EstampaService.Deletar(usuario, req.params.id)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
});

export {
  EstampaRouter
}

function FiltrarEstampa(req, res) {
  if (req.query.src) EstampaService.Filtrar({ Src: req.query.src }).then(result => res.send(result)).catch(err => ErrorHandler.DefaultException(err, res));

  if (req.query.nome) EstampaService.Filtrar({ Src: req.query.nome }).then(result => res.send(result)).catch(err => ErrorHandler.DefaultException(err, res));

  else EstampaService.Ler().then(result => res.send(result)).catch(err => ErrorHandler.DefaultException(err, res));
}
