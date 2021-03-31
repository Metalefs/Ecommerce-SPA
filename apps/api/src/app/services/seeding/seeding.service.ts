import { entities, enums } from '@personalizados-lopes/data';

import { Repository } from '../../repositories/repository';

export class SeedingService {

    async Seed(Usuario:entities.Usuario){
        //if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.SeedCollections();
        //}
    }
    async SeedCarousel(Usuario:entities.Usuario){
        //if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.SeedCarousel();
        //}
    }
    async SeedIntegracoes(Usuario:entities.Usuario){
        //if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.SeedIntegracoes();
        //}
    }
    //29.281.832/0001-05
}
