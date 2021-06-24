import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';
const SobreRouter = express();

let SobreService: Services.SobreService = new Services.SobreService();

SobreRouter.get(RouteDictionary.Sobre, async (req: any, res) => {
  try {
    res.send(await SobreService.LerPrimeiro());
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.post(RouteDictionary.Sobre, async (req: any, res) => {
  try {
    res.send(await SobreService.Inserir(await UsuarioLogado(req, res), req.body.item.Sobre));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.put(RouteDictionary.Sobre, async (req: any, res) => {
  try {
    res.send(await SobreService.Alterar(await UsuarioLogado(req, res), req.body.item.Sobre));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.delete(RouteDictionary.Sobre, async (req: any, res) => {
  try {
    res.send(await SobreService.Deletar(await UsuarioLogado(req, res), req.query.id));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
});
export {
  SobreRouter
}
