import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { exception } from 'console';
const IntegracoesRouter = express();

IntegracoesRouter.get(RouteDictionary.Integracoes, (req: any, res) => {
    try {
        let IntegracoesService:Services.IntegracoesService = new Services.IntegracoesService();

        IntegracoesService.Ler().then(x=>{
            res.send(x);
        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).post(RouteDictionary.Integracoes, (req: any, res) => {
    try {

        Services.UsuarioService.getByToken(req.body.token).then(user => {

            console.log(user);
            let IntegracoesService:Services.IntegracoesService = new Services.IntegracoesService();

            IntegracoesService.Inserir(user,req.body.item.Integracoes).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).put(RouteDictionary.Integracoes, (req: any, res) => {
    try {
        console.log(req.body);
        Services.UsuarioService.getByToken(req.body.token).then(user => {

            console.log(user);
            let IntegracoesService:Services.IntegracoesService = new Services.IntegracoesService();
            IntegracoesService.Alterar(user,req.body.item.Integracoes).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).delete(RouteDictionary.Integracoes, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.query.token).then(user => {

            console.log(user);
            let IntegracoesService:Services.IntegracoesService = new Services.IntegracoesService();

            IntegracoesService.Deletar(user,req.query.id).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
});
export {
    IntegracoesRouter
}
