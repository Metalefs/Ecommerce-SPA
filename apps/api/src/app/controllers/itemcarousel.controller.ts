import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';

const ItemCarouselRouter = express();

let ItemCarouselService: Services.ItemCarouselService = new Services.ItemCarouselService();

ItemCarouselRouter.get(RouteDictionary.ItemCarousel, async (req: any, res) => {
  ItemCarouselService.LerPrimeiro()
  .then(result => res.send(result))
  .catch(err => ErrorHandler.DefaultException(err, res));
})

.post(RouteDictionary.ItemCarousel, async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex => ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    ItemCarouselService.Inserir(usuario, req.body.item.ItemCarousel)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
})

.put(RouteDictionary.ItemCarousel, async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex => ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    ItemCarouselService.Alterar(usuario, req.body.item.ItemCarousel)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
})

.delete(RouteDictionary.ItemCarousel + ":id", async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex =>ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    ItemCarouselService.Deletar(usuario, req.params.id)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
});

export {
  ItemCarouselRouter
}
