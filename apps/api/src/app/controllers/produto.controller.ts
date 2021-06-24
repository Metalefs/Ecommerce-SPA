import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { entities } from 'libs/data/src';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { escapeRegex } from '../_handlers/regexescape';
import { FiltrarProdutoSearchQuery } from 'libs/data/src/lib/interfaces/filtrarProdutoQuery';
import { UsuarioLogado } from '../_handlers/Authentication';

const ProdutoRouter = express();

let ProdutoService: Services.ProdutoService = new Services.ProdutoService();

var ObjectId = require('mongodb').ObjectID;
ProdutoRouter.get(RouteDictionary.Produto, async (req: any, res) => {
  try {
    res.send(await ProdutoService.Search({}, parseInt(req.query.limit) || 12, req.query.skip || 1));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
}).get(RouteDictionary.Produto + ":id", async (req: any, res) => {
  try {
    if (req.params.id) {
      res.send(await ProdutoService.Filtrar({ "_id": new ObjectId(req.params.id) }));
    }
    else {
      ErrorHandler.DefaultException("unknown", res);
    }
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
  .get(RouteDictionary.FiltrarProduto + ":page", (req: any, res) => {
    const limit = parseInt(req.query.limit) || 12; // results per page
    const page = req.params.page || 1; // Page
    let sQuery: FiltrarProdutoSearchQuery = {}

    if (req.query.nome) {
      sQuery.Nome = new RegExp(decodeURI(escapeRegex(req.query.nome)), 'gi');
    }
    if (req.query.categoria) {
      if (!decodeURI(req.query.categoria).includes("Todos"))
        sQuery.NomeCategoria = new RegExp(decodeURI(escapeRegex(req.query.categoria)), 'gi');
      else
        sQuery.NomeCategoria = new RegExp('.*', 'gi');
    }
    if (req.query.preco) {
      sQuery.Preco = new RegExp(decodeURI(escapeRegex(req.query.preco)), 'gi');
    }
    if (req.query.status) {
      sQuery.Status = new RegExp(decodeURI(escapeRegex(req.query.status)), 'gi');
    }
    if (req.query.marca) {
      sQuery.Marca = new RegExp(decodeURI(escapeRegex(req.query.marca)), 'gi');
    }
    if (req.query.modelo) {
      sQuery.Modelo = new RegExp(decodeURI(escapeRegex(req.query.modelo)), 'gi');
    }
    if (req.query.tags) {
      sQuery.Tags = new RegExp(decodeURI(escapeRegex(req.query.tags)), 'gi');
    }

    ProdutoService.Search(
      sQuery
      , limit, page).then(x => {
        res.send(x);
      });
  })
  .
  post(RouteDictionary.Produto, async (req: any, res) => {
    try {
      res.send(await ProdutoService.Inserir(await UsuarioLogado(req, res), req.body.item.Produto));
    }
    catch (err) {
      ErrorHandler.DefaultException(err, res)
    }
  }).post(RouteDictionary.GostarProduto, async (req: any, res) => {
    try {
      res.send(await ProdutoService.Gostar(req.body.id));
    }
    catch (err) {
      ErrorHandler.DefaultException(err, res)
    }
  })
  .post(RouteDictionary.RateProduto, async (req: any, res) => {
    try {
      res.send(await ProdutoService.Rate(req.body.id, req.body.rating));
    }
    catch (err) {
      ErrorHandler.DefaultException(err, res)
    }
  })
  .post(RouteDictionary.IncrementarVendaProduto, async (req: any, res) => {
    try {
      res.send(await ProdutoService.IncrementarVenda(req.body.id));
    }
    catch (err) {
      ErrorHandler.DefaultException(err, res)
    }
  })
  .post(RouteDictionary.IncrementarVisualizacoesProduto, async (req: any, res) => {
    try {
      res.send(await ProdutoService.IncrementarVisualizacoes(req.body.id));
    }
    catch (err) {
      ErrorHandler.DefaultException(err, res)
    }
  })
  .put(RouteDictionary.Produto, async (req: any, res) => {
    try {
      res.send(await ProdutoService.Alterar(await UsuarioLogado(req, res), req.body.item.Produto));
    }
    catch (err) {
      ErrorHandler.DefaultException(err, res)
    }
  }).delete(RouteDictionary.Produto, async (req: any, res) => {
    try {
      res.send(await ProdutoService.Deletar(await UsuarioLogado(req, res), req.query.id));
    }
    catch (err) {
      ErrorHandler.DefaultException(err, res)
    }
  });
export {
  ProdutoRouter
}
