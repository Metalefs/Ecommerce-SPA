import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../../services";
import * as express from 'express';

import { ErrorHandler } from '../../_handlers/error-handler';
import { ensureIsAdmin } from '../../middleware/ensure-is-admin';
import BaseController from '../base.controller';

const EstampaRouter = express();
let EstampaService: Services.EstampaService = new Services.EstampaService();

export class EstampaController extends BaseController {
  constructor(service:Services.CarouselService) {
    super(service)
  }
}

const EstampaCtrl = new EstampaController(EstampaService)
EstampaRouter.get(RouteDictionary.Estampa.Raiz, FiltrarEstampa)
.get(RouteDictionary.Estampa.Raiz + ":id", FiltrarPorId)
.put(RouteDictionary.Estampa.Raiz, ensureIsAdmin, EstampaCtrl.Editar)
.post(RouteDictionary.Estampa.Raiz, ensureIsAdmin, EstampaCtrl.Incluir)
.delete(RouteDictionary.Estampa.Raiz + `:id`, ensureIsAdmin, EstampaCtrl.Remover);

export {
  EstampaRouter
}

function FiltrarEstampa(req, res) {
  if (req.query.src) EstampaService.Filtrar({ Src: req.query.src }).then(result => res.send(result)).catch(err => ErrorHandler.DefaultException(err, res));

  if (req.query.nome) EstampaService.Filtrar({ Src: req.query.nome }).then(result => res.send(result)).catch(err => ErrorHandler.DefaultException(err, res));

  if (req.query.idCategoria) EstampaService.Filtrar({ IdCategoria:  RegExp(decodeURI(req.query.idCategoria).replace('\\', '').split(',').join('|'), 'gi') }).then(result => res.send(result)).catch(err => ErrorHandler.DefaultException(err, res));

  else EstampaService.Ler().then(result => res.send(result)).catch(err => ErrorHandler.DefaultException(err, res));
}

async function FiltrarPorId(req, res){
  if (req.params.id)
  EstampaService.FiltrarPorId(req.params.id)
      .then(result => res.send(result))
      .catch(err => ErrorHandler.DefaultException(err, res))
  else
    ErrorHandler.DefaultException("unknown", res);
}
