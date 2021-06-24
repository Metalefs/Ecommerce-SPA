import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';

const ClienteRouter = express();

let ClienteService: Services.ClienteService = new Services.ClienteService();

ClienteRouter.get(RouteDictionary.Cliente, async (req: any, res) => {
  try {
    res.send(await ClienteService.Ler());
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.post(RouteDictionary.Cliente, async (req: any, res) => {
  try {
    res.send(await ClienteService.Inserir(await UsuarioLogado(req,res), req.body.item.Cliente));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.put(RouteDictionary.Cliente, async (req: any, res) => {
  try {
    res.send(await ClienteService.Alterar(await UsuarioLogado(req,res), req.body.item.Cliente));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.delete(RouteDictionary.Cliente, async (req: any, res) => {
  try {
    res.send(await ClienteService.Deletar(await UsuarioLogado(req,res), req.query.id));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
});
export {
  ClienteRouter
}
