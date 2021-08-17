import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../../services";
import { ErrorHandler } from '../../_handlers/error-handler';

import * as express from 'express';
import { ensureIsAdmin } from '../../middleware/ensure-is-admin';
import BaseController from '../base.controller';

const ImagemRouter = express();
let ImagemService: Services.ImagemService = new Services.ImagemService();
export class ImagemController extends BaseController {
  constructor(service:Services.CarouselService) {
    super(service)
  }
}

const ImagemCtrl = new ImagemController(ImagemService)
ImagemRouter.get(RouteDictionary.Imagem, FiltrarImagem)

.post(RouteDictionary.Imagem, async (req: any, res) => {
  ImagemService.InserirSemUsuario(req.body.item)
  .then(result => res.send(result))
  .catch(err => ErrorHandler.DefaultException(err, res));
})

.put(RouteDictionary.Imagem, ensureIsAdmin, ImagemCtrl.Editar)
.delete(RouteDictionary.Imagem + `:id`, ensureIsAdmin, ImagemCtrl.Remover);

export {
  ImagemRouter
}

function FiltrarImagem(req, res) {
  if (req.query.src) ImagemService.Filtrar({ Src: req.query.src }).then(result => res.send(result)).catch(err => ErrorHandler.DefaultException(err, res));

  if (req.query.nome) ImagemService.Filtrar({ Src: req.query.nome }).then(result => res.send(result)).catch(err => ErrorHandler.DefaultException(err, res));

  else ImagemService.Ler().then(result => res.send(result)).catch(err => ErrorHandler.DefaultException(err, res));
}
