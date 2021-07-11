import { Usuario } from "libs/data/src/lib/classes";
import { TipoUsuario } from "libs/data/src/lib/enums";
import { UsuarioLogado } from "../_handlers/Authentication";
import { ErrorHandler } from "../_handlers/error-handler";

export function ensureIsAdmin(req, res, next) {
  UsuarioLogado(req, res)
    .catch(ex => {
      ErrorHandler.AuthorizationException(ex, res);
      return;
    })
    .then((usuario : Usuario) => {
      if (!usuario || usuario?.Tipo != TipoUsuario.admin) {
        ErrorHandler.AuthorizationException('Usuário não autorizado!', res);
      } else if(usuario.Tipo == TipoUsuario.admin){
        res.locals.user = usuario;
        return next();
      }
    })
}
