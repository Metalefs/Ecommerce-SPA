import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';

const MensagemRouter = express();


MensagemRouter.get(RouteDictionary.Mensagem, (req: any, res) => {
    try {
        let MensagemService:Services.MensagemService = new Services.MensagemService();

        MensagemService.Ler().then(x=>{
            res.send(x);
        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).post(RouteDictionary.Mensagem, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.body.token).then(user => {

            let MensagemService:Services.MensagemService = new Services.MensagemService();

            MensagemService.Inserir(user,req.body.item.Mensagem).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).put(RouteDictionary.Mensagem, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.body.token).then(user => {

            let MensagemService:Services.MensagemService = new Services.MensagemService();

            MensagemService.Alterar(user,req.body.item.Mensagem).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).delete(RouteDictionary.Mensagem, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.query.token).then(user => {

            let MensagemService:Services.MensagemService = new Services.MensagemService();

            MensagemService.Deletar(user,req.query.id).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
});
export {
    MensagemRouter
}
