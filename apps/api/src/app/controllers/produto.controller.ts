import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { escapeRegex } from '../_handlers/regexescape';
import { FiltrarProdutoSearchQuery } from 'libs/data/src/lib/interfaces/filtrarProdutoQuery';
import { UsuarioLogado } from '../_handlers/Authentication';
import { Usuario } from 'libs/data/src/lib/classes';

const ProdutoRouter = express();

let ProdutoService: Services.ProdutoService = new Services.ProdutoService();

ProdutoRouter.get(RouteDictionary.Produtos.Produto, ListarProdutos)
  .get(RouteDictionary.Produtos.Produto + ":id", FiltrarPorId)
  .get(RouteDictionary.Produtos.Filtrar + ":page", FiltrarProdutos)
  .post(RouteDictionary.Produtos.Produto, CadastrarProduto)
  .post(RouteDictionary.Produtos.Gostar, GostarProduto)
  .post(RouteDictionary.Produtos.Rate, AvaliarProduto)
  .post(RouteDictionary.Produtos.IncrementarVendas, IncrementarVenda)
  .post(RouteDictionary.Produtos.IncrementarVisualizacoes, IncrementarVisualizacao)
  .put(RouteDictionary.Produtos.Produto, AtualizarProduto)
  .delete(RouteDictionary.Produtos.Produto + ":id", DeletarProduto);

export {
  ProdutoRouter
}

function ListarProdutos(req, res){
  ProdutoService.Search({}, parseInt(req.query.limit) || 12, req.query.skip || 1)
    .then(result => res.send(result))
    .catch(err => ErrorHandler.DefaultException(err, res));
}

function FiltrarPorId(req, res){
  if (req.params.id)
    ProdutoService.FiltrarPorId(req.params.id)
      .then(result => res.send(result))
      .then(err => ErrorHandler.DefaultException(err, res))
  else
    ErrorHandler.DefaultException("unknown", res);
}

function FiltrarProdutos(req, res){
  const limit = parseInt(req.query.limit) || 12; // results per page
  const page = req.params.page || 1; // Page
  let sQuery: FiltrarProdutoSearchQuery = {}

  if (req.query.nome) sQuery.Nome = new RegExp(decodeURI(escapeRegex(req.query.nome)), 'gi');

  if (req.query.categoria)
    sQuery.NomeCategoria = !decodeURI(req.query.categoria)
      .includes("Todos") ?
      new RegExp(decodeURI(req.query.categoria).replace('\\', '').split(',').join('|'), 'gi')
      :
      sQuery.NomeCategoria = new RegExp('.*', 'gi');

  if (req.query.preco) sQuery.Preco = new RegExp(decodeURI(escapeRegex(req.query.preco)), 'gi');

  if (req.query.status) sQuery.Status = new RegExp(decodeURI(escapeRegex(req.query.status)), 'gi');

  if (req.query.marca) sQuery.Marca = new RegExp(decodeURI(escapeRegex(req.query.marca)), 'gi');

  if (req.query.modelo) sQuery.Modelo = new RegExp(decodeURI(escapeRegex(req.query.modelo)), 'gi');

  if (req.query.tags) sQuery.Tags = new RegExp(decodeURI(escapeRegex(req.query.tags)), 'gi');

  ProdutoService.Search(sQuery, limit, page)
    .then(x => res.send(x));
}

function CadastrarProduto(req, res){
  UsuarioLogado(req, res)
    .catch(ex => {
      ErrorHandler.AuthorizationException(ex, res);
      return;
    })
    .then(usuario => {
      if (usuario)
        ProdutoService.Inserir(usuario as Usuario, req.body.item.Produto)
          .then(result => res.send(result))
          .catch(err => ErrorHandler.DefaultException(err, res))
    })
}

function AtualizarProduto(req,res){
  UsuarioLogado(req, res)
  .catch(ex => {
    ErrorHandler.AuthorizationException(ex, res);
    return;
  })
  .then(usuario => {
    if (usuario)
      ProdutoService.Alterar(usuario, req.body.item.Produto)
      .then(result => res.send(result))
      .catch(err => ErrorHandler.DefaultException(err, res))
  })
}

function DeletarProduto(req,res){
  UsuarioLogado(req, res)
  .catch(ex => {
    ErrorHandler.AuthorizationException(ex, res);
    return;
  })
  .then(usuario => {
    if (usuario)
      ProdutoService.Deletar(usuario, req.params.id)
      .then(result => res.send(result))
      .catch(err => ErrorHandler.DefaultException(err, res))
  })
}

function GostarProduto(req,res){
  ProdutoService.Gostar(req.body.id).then(result=> res.send(result))
  .catch(err => ErrorHandler.DefaultException(err, res))
}

function AvaliarProduto(req,res){
  ProdutoService.Rate(req.body.id, req.body.rating)
  .then(result => res.send(result))
  .catch(err => ErrorHandler.DefaultException(err, res))
}

function IncrementarVenda(req,res){
  ProdutoService.IncrementarVenda(req.body.id)
  .then(result => res.send(result))
  .catch(err => ErrorHandler.DefaultException(err, res));
}

function IncrementarVisualizacao(req,res){
  ProdutoService.IncrementarVisualizacoes(req.body.id)
  .then(result => res.send(result))
  .catch (err =>  ErrorHandler.DefaultException(err, res));
}
