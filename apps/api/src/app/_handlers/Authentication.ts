import { Usuario } from "libs/data/src/lib/classes";
import * as Services from "../services";
import { extractToken } from "./jwt.extract";
export async function UsuarioLogado(req,res):Promise<Usuario>{
  let token = extractToken(req);
  if(token)
    return await Services.UsuarioService.getByToken(token);
  throw 'Token não presente na requisição';
}
