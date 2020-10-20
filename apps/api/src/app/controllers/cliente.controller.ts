import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';

const ClienteRouter = express();


ClienteRouter.get(RouteDictionary.Cliente, (req: any, res) => {
    try {
        let ClienteService:Services.ClienteService = new Services.ClienteService();

        ClienteService.Ler().then(x=>{
            res.send(x);
        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).post(RouteDictionary.Cliente, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.body.token).then(user => {

            let ClienteService:Services.ClienteService = new Services.ClienteService();

            ClienteService.Inserir(user,req.body.item.Cliente).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).put(RouteDictionary.Cliente, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.body.token).then(user => {

            let ClienteService:Services.ClienteService = new Services.ClienteService();

            ClienteService.Alterar(user,req.body.item.Cliente).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).delete(RouteDictionary.Cliente, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.query.token).then(user => {

            let ClienteService:Services.ClienteService = new Services.ClienteService();

            ClienteService.Deletar(user,req.query.id).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
});
export {
    ClienteRouter
}
