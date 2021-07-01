import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';

const ImagemRouter = express();
let ImagemService: Services.ImagemService = new Services.ImagemService();

ImagemRouter.get(RouteDictionary.Imagem, FiltrarImagem)

.post(RouteDictionary.Imagem, async (req: any, res) => {
  ImagemService.InserirSemUsuario(req.body.item)
  .then(result => res.send(result))
  .catch(err => ErrorHandler.DefaultException(err, res));
})

.put(RouteDictionary.Imagem, async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex => ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    ImagemService.Alterar(usuario,req.body.item.Imagem)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
})

.delete(RouteDictionary.Imagem + ":id", async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex =>ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    ImagemService.Deletar(usuario, req.params.id)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
});

export {
  ImagemRouter
}

function FiltrarImagem(req, res) {
  if (req.query.src) ImagemService.Filtrar({ Src: req.query.src }).then(result => res.send(result)).catch(err => ErrorHandler.DefaultException(err, res));

  if (req.query.nome) ImagemService.Filtrar({ Src: req.query.nome }).then(result => res.send(result)).catch(err => ErrorHandler.DefaultException(err, res));

  else ImagemService.Ler().then(result => res.send(result)).catch(err => ErrorHandler.DefaultException(err, res));
}
