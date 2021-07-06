import * as express from 'express';

import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { CorProdutoService } from '../services';
import BaseController from './base.controller';

const CorProdutoRouter = express();

export class CorProdutoController extends BaseController {
  constructor(service:CorProdutoService) {
    super(service)
  }
}

const CorProdutoCtrl = new CorProdutoController(new CorProdutoService())

CorProdutoRouter.get(RouteDictionary.CorProduto,CorProdutoCtrl.Ler);
CorProdutoRouter.put(RouteDictionary.CorProduto,CorProdutoCtrl.Editar);
CorProdutoRouter.post(RouteDictionary.CorProduto,CorProdutoCtrl.Incluir);
CorProdutoRouter.delete(RouteDictionary.CorProduto + `:id`,CorProdutoCtrl.Remover);

export {
  CorProdutoRouter
}
