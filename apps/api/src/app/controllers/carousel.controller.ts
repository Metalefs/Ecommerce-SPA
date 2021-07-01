import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';

const CarouselRouter = express();
let CarouselService: Services.CarouselService = new Services.CarouselService();

CarouselRouter.get(RouteDictionary.Carousel, async (req: any, res) => {
  CarouselService.LerPrimeiro()
  .then(result => res.send(result))
  .catch(err =>ErrorHandler.DefaultException(err, res));
})

.post(RouteDictionary.Carousel, async (req: any, res) => {
  UsuarioLogado(req, res)
    .catch(ex => {
      ErrorHandler.AuthorizationException(ex, res);
      return;
    })
    .then(usuario => {
      if (usuario)
      CarouselService.Inserir(usuario, req.body.item.Carousel)
          .then(result => res.send(result))
          .catch(err => ErrorHandler.DefaultException(err, res))
    })
})

.put(RouteDictionary.Carousel, async (req: any, res) => {
  UsuarioLogado(req, res)
    .catch(ex => {
      ErrorHandler.AuthorizationException(ex, res);
      return;
    })
    .then(usuario => {
      if (usuario)
      CarouselService.Alterar(usuario, req.body.item.Carousel)
          .then(result => res.send(result))
          .catch(err => ErrorHandler.DefaultException(err, res))
    });
})

.delete(RouteDictionary.Carousel + ":id", async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex =>ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    CarouselService.Deletar(usuario, req.params.id)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
});

export {
  CarouselRouter
}
