import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as express from 'express';
import BaseController from './base.controller';
import { TamanhoProdutoService } from '../services';
import { ensureIsAdmin } from '../middleware/ensure-is-admin';

const TamanhoProdutoRouter = express();

export class TamanhoProdutoController extends BaseController {
  constructor(service:TamanhoProdutoService) {
    super(service);
  }
}

const TamanhoProdutoCtrl = new TamanhoProdutoController(new TamanhoProdutoService())

TamanhoProdutoRouter.get(RouteDictionary.TamanhoProduto,TamanhoProdutoCtrl.Ler);
TamanhoProdutoRouter.put(RouteDictionary.TamanhoProduto, ensureIsAdmin, TamanhoProdutoCtrl.Editar);
TamanhoProdutoRouter.post(RouteDictionary.TamanhoProduto, ensureIsAdmin, TamanhoProdutoCtrl.Incluir);
TamanhoProdutoRouter.delete(RouteDictionary.TamanhoProduto + `:id`, ensureIsAdmin, TamanhoProdutoCtrl.Remover);

export {
  TamanhoProdutoRouter
}
