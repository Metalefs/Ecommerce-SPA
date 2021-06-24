import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';

const ImagemRouter = express();
let ImagemService: Services.ImagemService = new Services.ImagemService();

ImagemRouter.get(RouteDictionary.Imagem, async (req: any, res) => {
  try {
    if (req.query.src) {
      res.send(await ImagemService.Filtrar({ Src: req.query.src }));
    }
    if (req.query.nome) {
      res.send(await ImagemService.Filtrar({ Nome: req.query.nome }));
    }
    else {
      res.send(await ImagemService.Ler());
    }
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.post(RouteDictionary.Imagem, async (req: any, res) => {
  try {
    res.send(await ImagemService.InserirSemUsuario(req.body.item));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.put(RouteDictionary.Imagem, async (req: any, res) => {
  try {
    res.send(await ImagemService.Alterar(await UsuarioLogado(req,res), req.body.item.Imagem));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.delete(RouteDictionary.Imagem, async (req: any, res) => {
  try {
    res.send(await ImagemService.Deletar(await UsuarioLogado(req,res), req.query.id));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
});
export {
  ImagemRouter
}
