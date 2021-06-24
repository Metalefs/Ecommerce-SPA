import { Usuario } from "libs/data/src/lib/classes";
import * as Services from "../services";
import { ErrorHandler } from "./error-handler";
import { extractToken } from "./jwt.extract";
export async function UsuarioLogado(req,res):Promise<Usuario>{
  try{
    return await Services.UsuarioService.getByToken(extractToken(req));
  }
  catch(ex) {
    ErrorHandler.DefaultException(ex, res);
  }
}
