import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';

const ImagemRouter = express();


ImagemRouter.get(RouteDictionary.Imagem, (req: any, res) => {
    try {
        let ImagemService:Services.ImagemService = new Services.ImagemService();

        if(req.query.src){
          ImagemService.Filtrar({Src: req.query.src}).then(x=>{
            res.send(x);
          }).catch((ex)=>{
            ErrorHandler.AuthorizationException(ex,res);
          });
        }
        if(req.query.nome){
          ImagemService.Filtrar({Nome: req.query.nome}).then(x=>{
            res.send(x);
          }).catch((ex)=>{
            ErrorHandler.AuthorizationException(ex,res);
          });
        }
        else{
          ImagemService.Ler().then(x=>{
              res.send(x);
          }).catch((ex)=>{
            ErrorHandler.AuthorizationException(ex,res);
          });
        }
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).post(RouteDictionary.Imagem, (req: any, res) => {
    try {
          let ImagemService:Services.ImagemService = new Services.ImagemService();

          ImagemService.Inserir(req.body.item).then(x=>{
              res.send(x);
          }).catch((ex)=>{
            ErrorHandler.AuthorizationException(ex,res);
          });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).put(RouteDictionary.Imagem, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.body.token).then(user => {

            let ImagemService:Services.ImagemService = new Services.ImagemService();

            ImagemService.Alterar(user,req.body.item.Imagem).then(x=>{
                res.send(x);
            }).catch((ex)=>{
              ErrorHandler.AuthorizationException(ex,res);
            });

        }).catch((ex)=>{
          ErrorHandler.AuthorizationException(ex,res);
        });;
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).delete(RouteDictionary.Imagem, (req: any, res) => {
    try {
        console.log(req.query)
        Services.UsuarioService.getByToken(req.query.token[1]).then(user => {

            let ImagemService:Services.ImagemService = new Services.ImagemService();

            ImagemService.Deletar(user,req.query.id).then(x=>{
                res.send(x);
            }).catch((ex)=>{
              ErrorHandler.AuthorizationException(ex,res);
            });;

        }).catch((ex)=>{
          ErrorHandler.AuthorizationException(ex,res);
        });;
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
});
export {
  ImagemRouter
}
