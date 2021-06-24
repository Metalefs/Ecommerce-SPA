import { entities, enums } from '@personalizados-lopes/data';
import { Integracoes } from 'libs/data/src/lib/classes';

import { Repository } from '../../repositories/repository';
import { BaseService } from '../baseService';

export class IntegracoesService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.Integracoes.NomeID);

  }
  async Ler() : Promise<Integracoes>{
    return Repository.List(entities.Integracoes.NomeID).then((x:Integracoes[]) => {
      if(x){
        let arr = [];
        arr.push(x[x.length -1]);
        return arr[0];
      }
      return x;
    });
  }

}
