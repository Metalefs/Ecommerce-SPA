import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { entities } from 'libs/data/src';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';

const ProdutoRouter = express();

ProdutoRouter.get(RouteDictionary.Produto, (req: any, res) => {
    try {
        let ProdutoService:Services.ProdutoService = new Services.ProdutoService();
        if(req.query.id){
          ProdutoService.Filtrar({_id: req.query.id}).then(x=>{
            res.send(x);
          });
        }
        else{
          ProdutoService.Ler().then(x=>{
              res.send(x);
          });
        }
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).post(RouteDictionary.Produto, (req: any, res) => {
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
