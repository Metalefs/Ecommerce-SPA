import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';
const SobreRouter = express();

let SobreService: Services.SobreService = new Services.SobreService();

SobreRouter.get(RouteDictionary.Sobre, async (req: any, res) => {
  try {
    const result = await SobreService.LerPrimeiro();
    res.send(result);
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
  .post(RouteDictionary.Sobre, async (req: any, res) => {
    try {
      const usuario = await UsuarioLogado(req, res);
      const result = await SobreService.Inserir(usuario, req.body.item.Sobre);
      res.send(result);
    }
    catch (err) {
      ErrorHandler.DefaultException(err, res)
    }
  })
  .put(RouteDictionary.Sobre, async (req: any, res) => {
    try {
      const usuario = await UsuarioLogado(req, res);
      const result = await SobreService.Alterar(usuario, req.body.item.Sobre);
      res.send(result);
    }
    catch (err) {
      ErrorHandler.DefaultException(err, res)
    }
  })
  .delete(RouteDictionary.Sobre, async (req: any, res) => {
    try {
      UsuarioLogado(req, res)
      .then(usuario => SobreService.Deletar(usuario, req.query.id))
      .then(result => res.send(result))
      .catch();
    }
    catch (err) {
      ErrorHandler.DefaultException(err, res)
    }
  });
export {
  SobreRouter
}
