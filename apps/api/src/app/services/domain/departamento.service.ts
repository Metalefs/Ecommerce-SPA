import { entities } from "@personalizados-lopes/data";
import { Categoria } from "libs/data/src/lib/classes";
import { BaseService } from "../baseService";
import { CategoriaService } from "./categoria.service";

export class DepartamentoService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.Departamento.NomeID);

  }

  async Alterar(Usuario: entities.Usuario, Departamento: entities.Departamento) {
    let result = await super.Alterar(Usuario,Departamento);

    let categoriaService = new CategoriaService();

    categoriaService.Filtrar({"Departamento._id": Departamento._id})
    .then((categorias : Array<Categoria>)=>{
      categorias.forEach(async(categoria)=>{
        categoria.Departamento = Departamento;
        await categoriaService.Alterar(Usuario,categoria)
      })
    })
    return result;
  }
}
