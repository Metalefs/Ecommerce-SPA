import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as express from 'express';
import * as Services from "../../services";
import { ErrorHandler } from '../../_handlers/error-handler';
import { escapeRegex } from '../../_handlers/regexescape';
import { ensureIsAdmin } from '../../middleware/ensure-is-admin';
import BaseController from '../base.controller';

let CategoriaService: Services.CategoriaService = new Services.CategoriaService();
const CategoriaRouter = express();
export class CategoriaController extends BaseController {
  constructor(service:Services.CarouselService) {
    super(service)
  }
}

const CategoriaCtrl = new CategoriaController(CategoriaService)
CategoriaRouter.get(RouteDictionary.Categoria, async (req: any, res) => {
  try {
    if (req.query.nicho) {
      let Nicho = new RegExp(decodeURI(escapeRegex(req.query.nicho)), 'gi');
      CategoriaService.Filtrar({ Nicho: Nicho }).then(result => res.send(result));
    }
    else
      CategoriaService.Ler().then(result => res.send(result));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.put(RouteDictionary.Categoria, ensureIsAdmin, CategoriaCtrl.Editar)
.post(RouteDictionary.Categoria, ensureIsAdmin, CategoriaCtrl.Incluir)
.delete(RouteDictionary.Categoria + `:id`, ensureIsAdmin, CategoriaCtrl.Remover);

export {
  CategoriaRouter
}
