import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../../services";
import * as express from 'express';
import BaseController from '../base.controller';
import { ensureIsAdmin } from '../../middleware/ensure-is-admin';

const MensagemRouter = express();

let MensagemService: Services.MensagemService = new Services.MensagemService();

export class MensagemController extends BaseController {
  constructor(service:Services.MensagemService) {
    super(service);
  }
}

const MensagemCtrl = new MensagemController(MensagemService)

MensagemRouter.get(RouteDictionary.Mensagem,MensagemCtrl.Ler)
.put(RouteDictionary.Mensagem,ensureIsAdmin, MensagemCtrl.Editar)
.post(RouteDictionary.Mensagem,ensureIsAdmin, MensagemCtrl.Incluir)
.delete(RouteDictionary.Mensagem + `:id`,ensureIsAdmin, MensagemCtrl.Remover);

export {
  MensagemRouter
}
