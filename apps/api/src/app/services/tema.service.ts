import { entities, enums } from '@personalizados-lopes/data';

import { Repository } from '../repositories/repository';

export class TemaService {

    async Ler(){
        return  Repository.List(entities.Tema.NomeID).then(x => {
            return x;
        });
    }
    async Filtrar(filter:{}){
        return Repository.Filter(entities.Tema.NomeID, filter).then(x => {
            return x;
        });
    }
    async Alterar(Usuario:entities.Usuario, Tema:entities.Tema){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Edit(entities.Tema.NomeID, Tema._id, Tema).then(x => {
                return x;
            });
        }
    }
    async Deletar(Usuario:entities.Usuario, id:string){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Remove(entities.Tema.NomeID, id).then(x => {
                return x;
            });
        }
    }
    async Inserir(Usuario:entities.Usuario, Tema:entities.Tema){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Insert(entities.Tema.NomeID, Tema).then(x => {
                return x;
            });
        }
    }

}
