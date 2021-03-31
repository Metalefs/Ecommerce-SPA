import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';

const CategoriaRouter = express();


CategoriaRouter.get(RouteDictionary.Categoria, (req: any, res) => {
    try {
        let CategoriaService:Services.CategoriaService = new Services.CategoriaService();

        CategoriaService.Ler().then(x=>{
            res.send(x);
        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).post(RouteDictionary.Categoria, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.body.token).then(user => {

            let CategoriaService:Services.CategoriaService = new Services.CategoriaService();

            CategoriaService.Inserir(user,req.body.item.Categoria).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).put(RouteDictionary.Categoria, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.body.token).then(user => {

            let CategoriaService:Services.CategoriaService = new Services.CategoriaService();

            CategoriaService.Alterar(user,req.body.item.Categoria).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).delete(RouteDictionary.Categoria, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.query.token).then(user => {

            let CategoriaService:Services.CategoriaService = new Services.CategoriaService();

            CategoriaService.Deletar(user,req.query.id).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
});
export {
    CategoriaRouter
}
