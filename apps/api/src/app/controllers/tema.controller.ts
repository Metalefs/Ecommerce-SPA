import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';
const TemaRouter = express();

let TemaService: Services.TemaService = new Services.TemaService();

TemaRouter.get(RouteDictionary.Tema, (req: any, res) => {
  try {
    TemaService.Ler().then(x => {
      res.send(x);
    });
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
}).post(RouteDictionary.Tema, async (req: any, res) => {
  try {
    TemaService.Inserir(await UsuarioLogado(req,res), req.body.item.Tema).then(x => {
      res.send(x);
    });
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
}).put(RouteDictionary.Tema, async (req: any, res) => {
  try {
    TemaService.Alterar(await UsuarioLogado(req,res), req.body.item.Produtos).then(x => {
      res.send(x);
    });
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
}).delete(RouteDictionary.Tema, async (req: any, res) => {
  try {
    TemaService.Deletar(await UsuarioLogado(req,res), req.query.id).then(x => {
      res.send(x);
    });
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
});

export {
  TemaRouter
}
