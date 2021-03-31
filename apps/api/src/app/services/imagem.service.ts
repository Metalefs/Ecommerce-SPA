import { entities, enums } from '@personalizados-lopes/data';
import { Imagem } from 'libs/data/src/lib/classes';

import { Repository } from '../repositories/repository';

export class ImagemService {

    async Ler(){
        return  Repository.List(entities.Imagem.NomeID).then(x => {
            return x;
        });
    }
    async Filtrar(filter:{}){
        return Repository.Filter(entities.Imagem.NomeID, filter).then(x => {
            return x;
        });
    }
    async Alterar(Usuario:entities.Usuario, Imagem:entities.Imagem){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Edit(entities.Imagem.NomeID, Imagem._id, Imagem).then(x => {
                return x;
            });
        }
    }
    async Deletar(Usuario:entities.Usuario, id:string){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
          return Repository.FindOne(entities.Imagem.NomeID, {Src: id}).then((img:Imagem)=>{
            return Repository.Remove(entities.Imagem.NomeID, img._id).then(x => {
                return x;
            });
          })
        }
    }
    async Inserir(Imagem:entities.Imagem){
        return Repository.Insert(entities.Imagem.NomeID, Imagem).then(x => {
            return x;
        });
    }

}
