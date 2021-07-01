import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { escapeRegex } from '../_handlers/regexescape';
import { UsuarioLogado } from '../_handlers/Authentication';
import { Usuario } from 'libs/data/src/lib/classes';

const CategoriaRouter = express();

let CategoriaService: Services.CategoriaService = new Services.CategoriaService();

CategoriaRouter.get(RouteDictionary.Categoria, async (req: any, res) => {
  try {
    if (req.query.nicho) {
      let Nicho = new RegExp(decodeURI(escapeRegex(req.query.nicho)), 'gi');
      CategoriaService.Filtrar({ Nicho: Nicho }).then(result => res.send(result));
    }
    else
      CategoriaService.Ler().then(result => res.send(result));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})

.post(RouteDictionary.Categoria, async (req: any, res) => {
  UsuarioLogado(req, res)
    .catch(ex => ErrorHandler.AuthorizationException(ex, res))
    .then(usuario => {
      if (usuario)
      CategoriaService.Inserir(usuario as Usuario, req.body.item.Categoria)
          .then(result => res.send(result))
          .catch(err => ErrorHandler.DefaultException(err, res))
    })
})

.put(RouteDictionary.Categoria, async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex =>ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    CategoriaService.Alterar(usuario as Usuario, req.body.item.Categoria)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
})

.delete(RouteDictionary.Categoria + ":id", async (req: any, res) => {
  UsuarioLogado(req, res)
  .catch(ex =>ErrorHandler.AuthorizationException(ex, res))
  .then(usuario => {
    if (usuario)
    CategoriaService.Deletar(usuario as Usuario, req.params.id)
        .then(result => res.send(result))
        .catch(err => ErrorHandler.DefaultException(err, res))
  })
});

export {
  CategoriaRouter
}
