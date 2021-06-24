import { entities, enums } from '@personalizados-lopes/data';
import { Imagem } from 'libs/data/src/lib/classes';

import { Repository } from '../../repositories/repository';
import { BaseService } from '../baseService';

export class ImagemService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.Imagem.NomeID);

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
}
