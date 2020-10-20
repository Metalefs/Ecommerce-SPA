import { entities, enums } from '@personalizados-lopes/data';

import { Repository } from '../repositories/repository';

export class OrcamentoService {

    async Ler(){
        return  Repository.List(entities.Orcamento.NomeID).then(x => {
            return x;
        });
    }
    async Filtrar(filter:{}){
        return Repository.Filter(entities.Orcamento.NomeID, filter).then(x => {
            return x;
        });
    }
    async Alterar(Usuario:entities.Usuario, Orcamento:entities.Orcamento){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Edit(entities.Orcamento.NomeID, Orcamento._id, Orcamento).then(x => {
                return x;
            });
        }
    }
    async Deletar(Usuario:entities.Usuario, id:string){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Remove(entities.Orcamento.NomeID, id).then(x => {
                return x;
            });
        }
    }
    async Inserir(Usuario:entities.Usuario, Orcamento:entities.Orcamento){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Insert(entities.Orcamento.NomeID, Orcamento).then(x => {
                return x;
            });
        }
    }

}
