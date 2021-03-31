import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
const TemaRouter = express();


TemaRouter.get(RouteDictionary.Tema, (req: any, res) => {
    try {
        let TemaService:Services.TemaService = new Services.TemaService();

        TemaService.Ler().then(x=>{
            res.send(x);
        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).post(RouteDictionary.Tema, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.body.token).then(user => {

            let TemaService:Services.TemaService = new Services.TemaService();

            TemaService.Inserir(user,req.body.item.Tema).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).put(RouteDictionary.Tema, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.body.token).then(user => {

            let TemaService:Services.TemaService = new Services.TemaService();

            TemaService.Alterar(user,req.body.item.Produtos).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).delete(RouteDictionary.Tema, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.query.token).then(user => {

            let TemaService:Services.TemaService = new Services.TemaService();

            TemaService.Deletar(user,req.query.id).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
});

export {
    TemaRouter
}
