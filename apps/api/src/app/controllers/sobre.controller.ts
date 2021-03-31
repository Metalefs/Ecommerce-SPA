import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
const SobreRouter = express();

SobreRouter.get(RouteDictionary.Sobre, (req: any, res) => {
    try {
        let SobreService:Services.SobreService = new Services.SobreService();

        SobreService.Ler().then(x=>{
            res.send(x);
        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).post(RouteDictionary.Sobre, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.body.token).then(user => {

            let SobreService:Services.SobreService = new Services.SobreService();

            SobreService.Inserir(user,req.body.item.Sobre).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).put(RouteDictionary.Sobre, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.body.token).then(user => {

            let SobreService:Services.SobreService = new Services.SobreService();

            SobreService.Alterar(user,req.body.item.Sobre).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).delete(RouteDictionary.Sobre, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.query.token).then(user => {

            let SobreService:Services.SobreService = new Services.SobreService();

            SobreService.Deletar(user,req.query.id).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
});
export {
    SobreRouter
}
