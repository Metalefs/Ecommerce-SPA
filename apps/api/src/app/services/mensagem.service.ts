import { entities, enums } from '@personalizados-lopes/data';

import { Repository } from '../repositories/repository';

export class MensagemService {

    async Ler(){
        return Repository.List(entities.Mensagem.NomeID).then(x => {
            return x;
        });
    }
    async Filtrar(filter:{}){
        return Repository.Filter(entities.Mensagem.NomeID, filter).then(x => {
            return x;
        });
    }
    async Alterar(Usuario:entities.Usuario, Mensagem:entities.Mensagem){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Edit(entities.Mensagem.NomeID, Mensagem._id, Mensagem).then(x => {
                return x;
            });
        }
    }
    async Deletar(Usuario:entities.Usuario, id:string){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Remove(entities.Mensagem.NomeID, id).then(x => {
                return x;
            });
        }
    }
    async Inserir(Usuario:entities.Usuario, Mensagem:entities.Mensagem){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Insert(entities.Mensagem.NomeID, Mensagem).then(x => {
                return x;
            });
        }
    }

}
