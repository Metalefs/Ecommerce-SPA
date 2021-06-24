import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { exception } from 'console';
import { UsuarioLogado } from '../_handlers/Authentication';
const InformacoesContatoRouter = express();

let InformacoesContatoService: Services.InformacoesContatoService = new Services.InformacoesContatoService();

InformacoesContatoRouter.get(RouteDictionary.InformacoesContato, async (req: any, res) => {
  try {
    res.send(await InformacoesContatoService.Ler());
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
}).post(RouteDictionary.InformacoesContato, async (req: any, res) => {
  try {
    res.send(await InformacoesContatoService.Inserir(await UsuarioLogado(req, res), req.body.item.InformacoesContato));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
}).put(RouteDictionary.InformacoesContato, async (req: any, res) => {
  try {
    res.send(await InformacoesContatoService.Alterar(await UsuarioLogado(req, res), req.body.item.InformacoesContato));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
}).delete(RouteDictionary.InformacoesContato, async (req: any, res) => {
  try {
    res.send(await InformacoesContatoService.Deletar(await UsuarioLogado(req, res), req.query.id));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
});
export {
  InformacoesContatoRouter
}
