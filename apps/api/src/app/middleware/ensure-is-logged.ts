import { Usuario } from "libs/data/src/lib/classes";
import { UsuarioLogado } from "../_handlers/Authentication";
import { ErrorHandler } from "../_handlers/error-handler";

export function ensureIsLogged(req, res, next) {
  UsuarioLogado(req, res)
    .catch(ex => {
      ErrorHandler.AuthorizationException(ex, res);
      return;
    })
    .then((usuario : Usuario) => {
      if (!usuario) {
        ErrorHandler.AuthorizationException('Usuário não autorizado!', res);
      }
      else{
        res.locals.user = usuario;
        return next();
      }
    })
}
