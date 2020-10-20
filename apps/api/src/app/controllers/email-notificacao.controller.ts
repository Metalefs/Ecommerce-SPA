import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';

const EmailNotificacaoRouter = express();


EmailNotificacaoRouter.get(RouteDictionary.EmailNotificacao, (req: any, res) => {
    try {
        let EmailNotificacaoService:Services.EmailNotificacaoService = new Services.EmailNotificacaoService();

        EmailNotificacaoService.Ler().then(x=>{
            res.send(x);
        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).post(RouteDictionary.EmailNotificacao, (req: any, res) => {
    try {
          let EmailNotificacaoService:Services.EmailNotificacaoService = new Services.EmailNotificacaoService();

          EmailNotificacaoService.Inserir(req.body.item).then(x=>{
              res.send(x);
          });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).put(RouteDictionary.EmailNotificacao, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.body.token).then(user => {

            let EmailNotificacaoService:Services.EmailNotificacaoService = new Services.EmailNotificacaoService();

            EmailNotificacaoService.Alterar(user,req.body.item.EmailNotificacao).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).delete(RouteDictionary.EmailNotificacao, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.query.token).then(user => {

            let EmailNotificacaoService:Services.EmailNotificacaoService = new Services.EmailNotificacaoService();

            EmailNotificacaoService.Deletar(user,req.query.id).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
});
export {
  EmailNotificacaoRouter
}
