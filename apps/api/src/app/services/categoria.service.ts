import { entities, enums } from '@personalizados-lopes/data';

import { Repository } from '../repositories/repository';

export class CategoriaService {

    async Ler(){
        return Repository.List(entities.Categoria.NomeID).then(x => {
            return x;
        });
    }
    async Filtrar(filter:{}){
        return Repository.Filter(entities.Categoria.NomeID, filter).then(x => {
            return x;
        });
    }
    async Alterar(Usuario:entities.Usuario, Categoria:entities.Categoria){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Edit(entities.Categoria.NomeID, Categoria._id, Categoria).then(x => {
                return x;
            });
        }
    }
    async Deletar(Usuario:entities.Usuario, id:string){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Remove(entities.Categoria.NomeID, id).then(x => {
                return x;
            });
        }
    }
    async Inserir(Usuario:entities.Usuario, Categoria:entities.Categoria){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Insert(entities.Categoria.NomeID, Categoria).then(x => {
                return x;
            });
        }
    }

}
