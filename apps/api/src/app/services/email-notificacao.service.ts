import { entities, enums } from '@personalizados-lopes/data';

import { Repository } from '../repositories/repository';

export class EmailNotificacaoService {

    async Ler(){
        return  Repository.List(entities.EmailNotificacao.NomeID).then(x => {
            return x;
        });
    }
    async Filtrar(filter:{}){
        return Repository.Filter(entities.EmailNotificacao.NomeID, filter).then(x => {
            return x;
        });
    }
    async Alterar(Usuario:entities.Usuario, EmailNotificacao:entities.EmailNotificacao){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Edit(entities.EmailNotificacao.NomeID, EmailNotificacao._id, EmailNotificacao).then(x => {
                return x;
            });
        }
    }
    async Deletar(Usuario:entities.Usuario, id:string){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Remove(entities.EmailNotificacao.NomeID, id).then(x => {
                return x;
            });
        }
    }
    async Inserir(EmailNotificacao:entities.EmailNotificacao){
        return Repository.Insert(entities.EmailNotificacao.NomeID, EmailNotificacao).then(x => {
            return x;
        });
    }

}
