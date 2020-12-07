import { entities, enums } from '@personalizados-lopes/data';

import { Repository } from '../repositories/repository';

export class ServicoService {

    async Ler(){
        return Repository.List(entities.Servico.NomeID).then(x => {
            return x;
        });
    }
    async Filtrar(filter:{}){
        return  Repository.Filter(entities.Servico.NomeID, filter).then(x => {
            return x;
        });
    }
    async Alterar(Usuario:entities.Usuario, Servico:entities.Servico){
        if (Usuario?.Tipo == enums.TipoUsuario.admin) {
            return  Repository.Edit(entities.Servico.NomeID, Servico._id, Servico).then(x => {
                return x;
            });
        }
    }
    async Deletar(Usuario:entities.Usuario, id:string){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return  Repository.Remove(entities.Servico.NomeID, id).then(x => {
                return x;
            });
        }
    }
    async Inserir(Usuario:entities.Usuario, Servico:entities.Servico){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return  Repository.Insert(entities.Servico.NomeID, Servico).then(x => {
                return x;
            });
        }
    }

}
