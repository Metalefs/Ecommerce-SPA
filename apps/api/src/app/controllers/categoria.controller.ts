import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { escapeRegex } from '../_handlers/regexescape';
import { UsuarioLogado } from '../_handlers/Authentication';

const CategoriaRouter = express();

let CategoriaService: Services.CategoriaService = new Services.CategoriaService();

CategoriaRouter.get(RouteDictionary.Categoria, async (req: any, res) => {
  try {
    if (req.query.nicho) {
      let Nicho = new RegExp(decodeURI(escapeRegex(req.query.nicho)), 'gi');
      res.send(await CategoriaService.Filtrar({ Nicho: Nicho }));
    }
    else
      res.send(await CategoriaService.Ler())
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.post(RouteDictionary.Categoria, async (req: any, res) => {
  try {
    res.send(await CategoriaService.Inserir(await UsuarioLogado(req, res), req.body.item.Categoria));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.put(RouteDictionary.Categoria, async (req: any, res) => {
  try {
    res.send(await CategoriaService.Alterar(await UsuarioLogado(req, res), req.body.item.Categoria));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.delete(RouteDictionary.Categoria, async (req: any, res) => {
  try {
    res.send(await CategoriaService.Deletar(await UsuarioLogado(req, res), req.query.id));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
});
export {
  CategoriaRouter
}
