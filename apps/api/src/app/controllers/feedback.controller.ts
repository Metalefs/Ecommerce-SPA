import * as Services from "../services";
import * as express from 'express';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { ErrorHandler } from '../_handlers/error-handler';
import { UsuarioLogado } from '../_handlers/Authentication';

import BaseController from './base.controller';
import { ensureIsAdmin } from "../middleware/ensure-is-admin";

const FeedbackRouter = express();

let FeedbackService: Services.FeedbackService = new Services.FeedbackService();

export class FeedbackController extends BaseController {
  constructor(service:Services.FeedbackService) {
    super(service);
  }
}

const FeedbackCtrl = new FeedbackController(FeedbackService)

FeedbackRouter.get(RouteDictionary.Feedback,FeedbackCtrl.Ler)
.get(RouteDictionary.Feedback, async (req: any, res) => {
  try {
    const usuario = await UsuarioLogado(req, res);
    const result = await FeedbackService.FiltrarFeedbacksPorUsuario(usuario);
    res.send(result);
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.put(RouteDictionary.Feedback, ensureIsAdmin, FeedbackCtrl.Editar)
.post(RouteDictionary.Feedback, FeedbackCtrl.Incluir)
.delete(RouteDictionary.Feedback + `:id`, ensureIsAdmin, FeedbackCtrl.Remover);

export {
  FeedbackRouter
}
