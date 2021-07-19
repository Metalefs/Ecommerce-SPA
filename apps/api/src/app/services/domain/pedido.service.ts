import { entities } from '@personalizados-lopes/data';
import { Pedido, Usuario } from 'libs/data/src/lib/classes';
import { Repository } from '../../repositories/repository';
import { BaseService } from '../baseService';

export class PedidoService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.Pedido.NomeID);

  }
  async FiltrarPedidosPorUsuario(user:Usuario){
    return Repository.Filter(entities.Pedido.NomeID, {"Usuario.CPF" : user.CPF}).then(x => {
      return x;
    }).catch(ex=>{
      throw ex;
    });
  }
  async FiltrarPedidosPorIdUsuario(CPF:string):Promise<Pedido[]>{
    return Repository.Filter(entities.Pedido.NomeID, {"Usuario.CPF" : CPF}).then((x:Pedido[]) => {
      return x;
    }).catch(ex=>{
      throw ex;
    });
  }
}
