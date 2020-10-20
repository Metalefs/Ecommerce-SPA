import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { exception } from 'console';
const InformacoesContatoRouter = express();

InformacoesContatoRouter.get(RouteDictionary.InformacoesContato, (req: any, res) => {
    try {
        let InformacoesContatoService:Services.InformacoesContatoService = new Services.InformacoesContatoService();

        InformacoesContatoService.Ler().then(x=>{
            res.send(x);
        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).post(RouteDictionary.InformacoesContato, (req: any, res) => {
    try {

        Services.UsuarioService.getByToken(req.body.token).then(user => {

            console.log(user);
            let InformacoesContatoService:Services.InformacoesContatoService = new Services.InformacoesContatoService();

            InformacoesContatoService.Inserir(user,req.body.item.InformacoesContato).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).put(RouteDictionary.InformacoesContato, (req: any, res) => {
    try {
        console.log(req.body);
        Services.UsuarioService.getByToken(req.body.token).then(user => {

            console.log(user);
            let InformacoesContatoService:Services.InformacoesContatoService = new Services.InformacoesContatoService();
            InformacoesContatoService.Alterar(user,req.body.item.InformacoesContato).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).delete(RouteDictionary.InformacoesContato, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.query.token).then(user => {

            console.log(user);
            let InformacoesContatoService:Services.InformacoesContatoService = new Services.InformacoesContatoService();

            InformacoesContatoService.Deletar(user,req.query.id).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
});
export {
    InformacoesContatoRouter
}
