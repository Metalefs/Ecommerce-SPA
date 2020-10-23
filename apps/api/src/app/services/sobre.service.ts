import { entities, enums } from '@personalizados-lopes/data';
import { Sobre } from 'libs/data/src/lib/classes';

import { Repository } from '../repositories/repository';

export class SobreService {

    async Ler() : Promise<Sobre> {
        return  Repository.List(entities.Sobre.NomeID).then((x:Sobre) => {
            return x[0];
        });
    }
    async Filtrar(filter:{}){
        return Repository.Filter(entities.Sobre.NomeID, filter).then(x => {
            return x;
        });
    }
    async Alterar(Usuario:entities.Usuario, Sobre:entities.Sobre){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Edit(entities.Sobre.NomeID, Sobre._id, Sobre).then(x => {
                return x;
            });
        }
    }
    async Deletar(Usuario:entities.Usuario, id:string){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Remove(entities.Sobre.NomeID, id).then(x => {
                return x;
            });
        }
    }
    async Inserir(Usuario:entities.Usuario, Sobre:entities.Sobre){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Insert(entities.Sobre.NomeID, Sobre).then(x => {
                return x;
            });
        }
    }

}
