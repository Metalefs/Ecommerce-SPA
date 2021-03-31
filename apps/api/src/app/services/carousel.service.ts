import { entities, enums } from '@personalizados-lopes/data';

import { Repository } from '../repositories/repository';

export class CarouselService {

    async Ler(){
        return  Repository.List(entities.Carousel.NomeID).then(x => {
            return x[0];
        });
    }
    async Filtrar(filter:{}){
        return Repository.Filter(entities.Carousel.NomeID, filter).then(x => {
            return x;
        });
    }
    async Alterar(Usuario:entities.Usuario, Carousel:entities.Carousel){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Edit(entities.Carousel.NomeID, Carousel._id, Carousel).then(x => {
                return x;
            });
        }
    }
    async Deletar(Usuario:entities.Usuario, id:string){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Remove(entities.Carousel.NomeID, id).then(x => {
                return x;
            });
        }
    }
    async Inserir(Usuario:entities.Usuario, Carousel:entities.Carousel){
        if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.Insert(entities.Carousel.NomeID, Carousel).then(x => {
                return x;
            });
        }
    }

}
