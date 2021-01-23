import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { entities } from 'libs/data/src';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { escapeRegex } from '../_handlers/regexescape';
import { FiltrarProdutoSearchQuery } from 'libs/data/src/lib/interfaces/filtrarProdutoQuery';

const ProdutoRouter = express();

var ObjectId = require('mongodb').ObjectID;
ProdutoRouter.get(RouteDictionary.Produto, (req: any, res) => {
    try {
      let ProdutoService:Services.ProdutoService = new Services.ProdutoService();


      ProdutoService.Search({},parseInt(req.query.limit)||12,req.query.skip||1).then(x=>{
          res.send(x);
      });

    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).get(RouteDictionary.Produto+":id", (req: any, res) => {
  try {
    let ProdutoService:Services.ProdutoService = new Services.ProdutoService();
    console.log(req.params.id)
    if(req.params.id){
      ProdutoService.Filtrar({"_id": new ObjectId(req.params.id)}).then(x=>{
        res.send(x);
      });
    }
    else{
      ErrorHandler.DefaultException("unknown", res)

    }

  }
  catch (err) {
      ErrorHandler.DefaultException(err, res)
  }
})
.get(RouteDictionary.FiltrarProduto+":page", (req:any, res) =>{
  const limit = parseInt(req.query.limit)||12; // results per page
  const page = req.params.page || 1; // Page
  let sQuery:FiltrarProdutoSearchQuery = {  }
  let ProdutoService:Services.ProdutoService = new Services.ProdutoService();

  if(req.query.nome){
    sQuery.Nome = new RegExp(decodeURI(escapeRegex(req.query.nome)), 'gi');
  }
  if(req.query.categoria){
    console.log(decodeURI(req.query.categoria))
    if(!decodeURI(req.query.categoria).includes("Todos"))
      sQuery.NomeCategoria = new RegExp(decodeURI(escapeRegex(req.query.categoria)), 'gi');
    else
      sQuery.NomeCategoria = new RegExp('.*', 'gi');
  }
  if(req.query.preco){
    sQuery.Preco = new RegExp(decodeURI(escapeRegex(req.query.preco)), 'gi');
  }
  if(req.query.status){
    sQuery.Status = new RegExp(decodeURI(escapeRegex(req.query.status)), 'gi');
  }
  if(req.query.marca){
    sQuery.Marca = new RegExp(decodeURI(escapeRegex(req.query.marca)), 'gi');
  }
  if(req.query.modelo){
    sQuery.Modelo = new RegExp(decodeURI(escapeRegex(req.query.modelo)), 'gi');
  }
  if(req.query.tags){
    sQuery.Tags = new RegExp(decodeURI(escapeRegex(req.query.tags)), 'gi');
  }

  ProdutoService.Search(
    sQuery
  , limit, page).then(x=>{
    console.log(x)
    res.send(x);
  });
})
.
post(RouteDictionary.Produto, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.body.token).then((user:entities.Usuario) => {

            let ProdutoService:Services.ProdutoService = new Services.ProdutoService();

            ProdutoService.Inserir(user,req.body.item.Produto).then(x=>{
                res.send(x);
            });

        }).catch(ex=>{
          ErrorHandler.AuthorizationException(ex, res);
        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).post(RouteDictionary.GostarProduto, (req: any, res) => {
  try {
    let ProdutoService:Services.ProdutoService = new Services.ProdutoService();
    ProdutoService.Gostar(req.body.id).then(x=>{
        res.send(x);
    });
  }
  catch (err) {
      ErrorHandler.DefaultException(err, res)
  }
})
.post(RouteDictionary.RateProduto, (req: any, res) => {
  try {
    let ProdutoService:Services.ProdutoService = new Services.ProdutoService();
    ProdutoService.Rate(req.body.id,req.body.rating).then(x=>{
        res.send(x);
    });
  }
  catch (err) {
      ErrorHandler.DefaultException(err, res)
  }
})
.put(RouteDictionary.IncrementarVendaProduto, (req: any, res)=>{
  try {
    let ProdutoService:Services.ProdutoService = new Services.ProdutoService();
    ProdutoService.IncrementarVenda(req.body.id).then(x=>{
        res.send(x);
    });
  }
  catch (err) {
      ErrorHandler.DefaultException(err, res)
  }
})
.put(RouteDictionary.Produto, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.body.token).then(user => {

            let ProdutoService:Services.ProdutoService = new Services.ProdutoService();

            ProdutoService.Alterar(user,req.body.item.Produto).then(x=>{
                res.send(x);
            });

        }).catch(ex=>{
          ErrorHandler.AuthorizationException(ex, res);
        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).delete(RouteDictionary.Produto, (req: any, res) => {
    try {
      console.log(req.query);
      Services.UsuarioService.getByToken(req.query.token).then(user => {

          let ProdutoService:Services.ProdutoService = new Services.ProdutoService();

          ProdutoService.Deletar(user,req.query.id).then(x=>{
              res.send(x);
          });

      }).catch(ex=>{
        ErrorHandler.AuthorizationException(ex, res);
      });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
});
export {
    ProdutoRouter
}
