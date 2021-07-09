import { UsuarioService } from '../services';

import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { entities } from '@personalizados-lopes/data';

import * as express from 'express';
import { ErrorHandler } from '../_handlers/error-handler';
import { Usuario } from 'libs/data/src/lib/classes';

import { UsuarioLogado } from '../_handlers/Authentication';

const app = express();
const user_route = '/usuario';
app.post(RouteDictionary.Usuario.Login, (req : any, res, next) => {
    console.log(req.body);
    try{
      UsuarioService.authenticate(req.body)
          .then((user: entities.Usuario) => res.status(200).json(user))
          .catch(reason => ErrorHandler.AuthorizationException(reason,res));
    }
    catch(ex){
      ErrorHandler.DefaultException(ex,res);
    }
}).post(RouteDictionary.Usuario.Registro, (req,res, next) =>{
  try{
    console.log(req.body.Usuario);
    UsuarioService.create(req.body.Usuario)
        .then((user: entities.Usuario | any) => res.json(user))
        .catch(reason => ErrorHandler.ConflictException(reason,res));
  }
  catch(ex){
    ErrorHandler.AuthorizationException(ex,res);
  }
}).post(RouteDictionary.Usuario.RegistroTemporario, (req,res, next) =>{
  try{
    console.log(req.body.Usuario);
    let user:Usuario = req.body.Usuario;
    let senha = UsuarioService.generateRandomPassword();
    user.Senha = senha;
    UsuarioService.createTempAccount(req.body.Usuario)
        .then((user: entities.Usuario | any) => res.json(user))
        .catch(reason => ErrorHandler.ConflictException(reason,res));
  }
  catch(ex){
    ErrorHandler.AuthorizationException(ex,res);
  }
}).put(RouteDictionary.Usuario.AtualizarConta, (req,res, next) =>{
  try{
    UsuarioLogado(req, res)
    .catch(ex => ErrorHandler.AuthorizationException(ex, res))
    .then(usuario => {
      if (usuario)
      UsuarioService.UpdateInfo(usuario, req.body.item.Usuario)
          .then((user: Usuario | any) => res.json(user))
          .catch(reason => ErrorHandler.AuthorizationException(reason,res));
      else
      ErrorHandler.AuthorizationException('autenticação inválida',res);
    });
  }
  catch(ex){
    ErrorHandler.AuthorizationException(ex,res);
  }
})
.put(RouteDictionary.Usuario.TrocarSenha, (req,res, next) =>{
  try{
    UsuarioLogado(req, res)
    .catch(ex => ErrorHandler.AuthorizationException(ex, res))
    .then(usuario => {
      if (usuario)
        UsuarioService.changePassword(usuario,req.body.item.TrocaSenha)
        .then((user: Usuario | any) => res.json(user))
        .catch(reason => ErrorHandler.AuthorizationException(reason,res));
      else
        ErrorHandler.AuthorizationException('autenticação inválida',res);
    });
  }
  catch(ex){
    ErrorHandler.AuthorizationException(ex,res);
  }
})
.post(RouteDictionary.Usuario.RecuperarSenha, (req,res, next) =>{
  try{
    console.log(req.body.email);
    UsuarioService.recoverPassword(req.body.email)
        .then((user: boolean | any) => res.json(user))
        .catch(reason => ErrorHandler.AuthorizationException(reason,res));
  }
  catch(ex){
    ErrorHandler.AuthorizationException(ex,res);
  }
})
export {
  app
}
