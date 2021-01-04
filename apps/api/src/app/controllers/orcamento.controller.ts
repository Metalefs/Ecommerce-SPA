import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';

const OrcamentoRouter = express();


OrcamentoRouter.get(RouteDictionary.Orcamento, (req: any, res) => {
    try {
        let OrcamentoService:Services.OrcamentoService = new Services.OrcamentoService();

        OrcamentoService.Ler().then(x=>{
            res.send(x);
        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).get(RouteDictionary.Pedidos, (req: any, res) => {
  try {

    Services.UsuarioService.getByToken(req.query.token).then(user => {

        let OrcamentoService:Services.OrcamentoService = new Services.OrcamentoService();

        OrcamentoService.FiltrarOrcamentosPorUsuario(user).then(x=>{
            res.send(x);
        }).catch(ex=>{
          throw ex;
        });

    }).catch(ex=>{
      ErrorHandler.AuthorizationException(ex, res);
    })

  }
  catch (err) {
      ErrorHandler.DefaultException(err, res)
  }
}).post(RouteDictionary.Orcamento, (req: any, res) => {
    try {
        let OrcamentoService:Services.OrcamentoService = new Services.OrcamentoService();
        console.log(req.body)
        OrcamentoService.Inserir(null,req.body.payload.item.Orcamento).then(x=>{
            res.send(x);
        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).put(RouteDictionary.Orcamento, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.body.token).then(user => {


            let OrcamentoService:Services.OrcamentoService = new Services.OrcamentoService();

            OrcamentoService.Alterar(user,req.body.item.Orcamento).then(x=>{
                res.send(x);
            });

        }).catch(ex=>{
          ErrorHandler.AuthorizationException(ex, res);
        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).delete(RouteDictionary.Orcamento, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.query.token).then(user => {


            let OrcamentoService:Services.OrcamentoService = new Services.OrcamentoService();

            OrcamentoService.Deletar(user,req.query.id).then(x=>{
                res.send(x);
            });

        }).catch(ex=>{
          ErrorHandler.AuthorizationException(ex, res);
        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
});
export {
    OrcamentoRouter
}
