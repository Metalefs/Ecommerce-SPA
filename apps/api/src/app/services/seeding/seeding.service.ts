import { entities, enums } from '@personalizados-lopes/data';

import { Repository } from '../../repositories/repository';

export class SeedingService {

    async Seed(Usuario:entities.Usuario){
        //if (Usuario.Tipo == enums.TipoUsuario.admin) {
            return Repository.SeedCollections();
        //}
    }

}