import { entities, enums } from '@personalizados-lopes/data';

import { Repository } from '../repositories/repository';

export class ItemCarouselService {

    async Ler(){
        return Repository.List(entities.ItemCarousel.NomeID).then(x => {
            return x;
        });
    }
    async Filtrar(filter:{}){
        return Repository.Filter(entities.ItemCarousel.NomeID, filter).then(x => {
            return x;
        });
    }
    async Alterar(Usuario:entities.Usuario, ItemCarousel:entities.ItemCarousel){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Edit(entities.ItemCarousel.NomeID, ItemCarousel._id, ItemCarousel).then(x => {
                return x;
            });
        }
    }
    async Deletar(Usuario:entities.Usuario, id:string){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Remove(entities.ItemCarousel.NomeID, id).then(x => {
                return x;
            });
        }
    }
    async Inserir(Usuario:entities.Usuario, ItemCarousel:entities.ItemCarousel){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Insert(entities.ItemCarousel.NomeID, ItemCarousel).then(x => {
                return x;
            });
        }
    }

}
