import { entities, enums } from '@personalizados-lopes/data';

import { Repository } from '../repositories/repository';

export class InformacoesContatoService {

    async Ler(){
        return Repository.List(entities.InformacoesContato.NomeID).then(x => {
            return x[0];
        });
    }
    async Filtrar(filter:{}){
        return Repository.Filter(entities.InformacoesContato.NomeID, filter).then(x => {
            return x;
        });
    }
    async Alterar(Usuario:entities.Usuario, InformacoesContato:entities.InformacoesContato){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
          console.log(Usuario.Tipo , "Alterando")
            return Repository.Edit(entities.InformacoesContato.NomeID, InformacoesContato._id, InformacoesContato).then(x => {
                return x;
            });
        }
    }
    async Deletar(Usuario:entities.Usuario, id:string){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Remove(entities.InformacoesContato.NomeID, id).then(x => {
                return x;
            });
        }
    }
    async Inserir(Usuario:entities.Usuario, InformacoesContato:entities.InformacoesContato){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Insert(entities.InformacoesContato.NomeID, InformacoesContato).then(x => {
                return x;
            });
        }
    }

}
