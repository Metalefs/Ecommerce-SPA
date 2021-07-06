import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as express from 'express';
import BaseController from './base.controller';
import { TamanhoProdutoService } from '../services';

const TamanhoProdutoRouter = express();

export class TamanhoProdutoController extends BaseController {
  constructor(service:TamanhoProdutoService) {
    super(service);
  }
}

const TamanhoProdutoCtrl = new TamanhoProdutoController(new TamanhoProdutoService())

TamanhoProdutoRouter.get(RouteDictionary.TamanhoProduto,TamanhoProdutoCtrl.Ler);
TamanhoProdutoRouter.put(RouteDictionary.TamanhoProduto,TamanhoProdutoCtrl.Editar);
TamanhoProdutoRouter.post(RouteDictionary.TamanhoProduto,TamanhoProdutoCtrl.Incluir);
TamanhoProdutoRouter.delete(RouteDictionary.TamanhoProduto + `:id`,TamanhoProdutoCtrl.Remover);

export {
  TamanhoProdutoRouter
}
