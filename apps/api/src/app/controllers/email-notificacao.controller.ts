import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import * as express from 'express';
import BaseController from './base.controller';
import { ensureIsAdmin } from '../middleware/ensure-is-admin';

const EmailNotificacaoRouter = express();
let EmailNotificacaoService: Services.EmailNotificacaoService = new Services.EmailNotificacaoService();

export class EmailNotificacaoController extends BaseController {
  constructor(service:Services.CarouselService) {
    super(service)
  }
}

const EmailNotificacaoCtrl = new EmailNotificacaoController(EmailNotificacaoService)
EmailNotificacaoRouter.get(RouteDictionary.EmailNotificacao, EmailNotificacaoCtrl.Ler)
.put(RouteDictionary.EmailNotificacao, ensureIsAdmin, EmailNotificacaoCtrl.Editar)
.post(RouteDictionary.EmailNotificacao, ensureIsAdmin, EmailNotificacaoCtrl.Incluir)
.delete(RouteDictionary.EmailNotificacao + `:id`, ensureIsAdmin, EmailNotificacaoCtrl.Remover);

export {
  EmailNotificacaoRouter
}
