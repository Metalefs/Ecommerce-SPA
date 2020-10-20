import { entities, enums } from '@personalizados-lopes/data';

import { Repository } from '../repositories/repository';

export class ClienteService {

    async Ler(){
        return Repository.List(entities.Cliente.NomeID).then(x => {
            return x;
        });
    }
    async Filtrar(filter:{}){
        return Repository.Filter(entities.Cliente.NomeID, filter).then(x => {
            return x;
        });
    }
    async Alterar(Usuario:entities.Usuario, Cliente:entities.Cliente){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Edit(entities.Cliente.NomeID, Cliente._id, Cliente).then(x => {
                return x;
            });
        }
    }
    async Deletar(Usuario:entities.Usuario, id:string){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Remove(entities.Cliente.NomeID, id).then(x => {
                return x;
            });
        }
    }
    async Inserir(Usuario:entities.Usuario, Cliente:entities.Cliente){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Insert(entities.Cliente.NomeID, Cliente).then(x => {
                return x;
            });
        }
    }

}
