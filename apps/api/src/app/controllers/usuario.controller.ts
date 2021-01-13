import { UsuarioService } from '../services';

import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { entities } from '@personalizados-lopes/data';

import * as express from 'express';
import { ErrorHandler } from '../_handlers/error-handler';
import { Usuario } from 'libs/data/src/lib/classes';

const app = express();

app.post(RouteDictionary.Login, (req : any, res, next) => {
    console.log(req.body);
    try{
      UsuarioService.authenticate(req.body)
          .then((user: entities.Usuario) => res.status(200).json(user))
          .catch(reason => ErrorHandler.AuthorizationException(reason,res));
    }
    catch(ex){
      ErrorHandler.AuthorizationException(ex,res);
    }
}).post(RouteDictionary.Registro, (req,res, next) =>{
  try{
    console.log(req.body.Usuario);
    UsuarioService.create(req.body.Usuario)
        .then((user: entities.Usuario | any) => res.json(user))
        .catch(reason => ErrorHandler.AuthorizationException(reason,res));
  }
  catch(ex){
    ErrorHandler.AuthorizationException(ex,res);
  }
}).post(RouteDictionary.RegistroTemporario, (req,res, next) =>{
  try{
    console.log(req.body.Usuario);
    let user:Usuario = req.body.Usuario;
    let senha = UsuarioService.generateRandomPassword();
    user.Senha = senha;
    UsuarioService.create(req.body.Usuario)
        .then((user: entities.Usuario | any) => res.json(user))
        .catch(reason => ErrorHandler.AuthorizationException(reason,res));
  }
  catch(ex){
    ErrorHandler.AuthorizationException(ex,res);
  }
}).put(RouteDictionary.AtualizarConta, (req,res, next) =>{
  try{
    UsuarioService.getByToken(req.body.token).then(user => {
      if(user)
      UsuarioService.UpdateInfo(user, req.body.item.Usuario)
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
.put(RouteDictionary.TrocarSenha, (req,res, next) =>{
  try{
    console.log(req.body);
    UsuarioService.getByToken(req.body.token).then(user => {
      if(user)
        UsuarioService.changePassword(user,req.body.item.TrocaSenha)
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
.post(RouteDictionary.RecuperarSenha, (req,res, next) =>{
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
