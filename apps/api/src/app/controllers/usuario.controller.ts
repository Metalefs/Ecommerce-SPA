import { UsuarioService } from '../services';

import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { entities } from '@personalizados-lopes/data';

import * as express from 'express';
import { ErrorHandler } from '../_handlers/error-handler';

const app = express();

app.post(RouteDictionary.Login, (req : any, res, next) => {
    console.log(req.body);
    try{
      UsuarioService.authenticate(req.body)
          .then((user: entities.Usuario) => res.json(user))
          .catch(reason => ErrorHandler.AuthorizationException(reason,res));
    }
    catch(ex){
     ErrorHandler.AuthorizationException(ex,res);
    }
})

app.post(RouteDictionary.Registro, (req,res, next) =>{
  try{
    console.log(req.body.Usuario);
    UsuarioService.create(req.body.Usuario)
        .then((user: entities.Usuario | any) => res.json(user))
        .catch(reason => ErrorHandler.AuthorizationException(reason,res));
  }
  catch(ex){
    ErrorHandler.AuthorizationException(ex,res);
  }
})

export {
    app
}
