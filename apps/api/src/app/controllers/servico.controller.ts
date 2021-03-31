import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
const ServicoRouter = express();

ServicoRouter.get(RouteDictionary.Servico, (req: any, res) => {
    try {
        let ServicoService:Services.ServicoService = new Services.ServicoService();

        ServicoService.Ler().then(x=>{
            res.send(x);
        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).post(RouteDictionary.Servico, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.body.token).then(user => {

            let ServicoService:Services.ServicoService = new Services.ServicoService();

            ServicoService.Inserir(user,req.body.item.Servico).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).put(RouteDictionary.Servico, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.body.token).then(user => {

            let ServicoService:Services.ServicoService = new Services.ServicoService();

            ServicoService.Alterar(user,req.body.item.Servico).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).delete(RouteDictionary.Servico, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.query.token).then(user => {

            let ServicoService:Services.ServicoService = new Services.ServicoService();

            ServicoService.Deletar(user,req.query.id).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
});
export {
    ServicoRouter
}
