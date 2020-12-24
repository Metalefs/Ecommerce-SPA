import { entities, enums } from '@personalizados-lopes/data';
import { Integracoes } from 'libs/data/src/lib/classes';

import { Repository } from '../repositories/repository';

export class IntegracoesService {

    async Ler(): Promise<Integracoes>{
        return Repository.List(entities.Integracoes.NomeID).then((x :Integracoes)=> {
            return x[0];
        });
    }
    async Filtrar(filter:{}){
        return Repository.Filter(entities.Integracoes.NomeID, filter).then(x => {
            return x;
        });
    }
    async Alterar(Usuario:entities.Usuario, Integracoes:entities.Integracoes){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Edit(entities.Integracoes.NomeID, Integracoes._id, Integracoes).then(x => {
                return x;
            });
        }
    }
    async Deletar(Usuario:entities.Usuario, id:string){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Remove(entities.Integracoes.NomeID, id).then(x => {
                return x;
            });
        }
    }
    async Inserir(Usuario:entities.Usuario, Integracoes:entities.Integracoes){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Insert(entities.Integracoes.NomeID, Integracoes).then(x => {
                return x;
            });
        }
    }

}
