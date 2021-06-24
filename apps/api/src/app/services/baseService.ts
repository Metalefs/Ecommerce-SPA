import { entities, enums } from '@personalizados-lopes/data';
import { MongoDocument } from 'libs/data/src/lib/classes/abstract/MongoDocument';

import { Repository } from '../repositories/repository';

export class BaseService {

  /**
   *
   */
  constructor(private entity:string) {
  }

  async Ler(){
      return  Repository.List(this.entity).then(x => {
          return x;
      });
  }
  async LerPrimeiro(){
    return  Repository.List(this.entity).then(x => {
        return x[0];
    });
}
  async Filtrar(filter:{}){
      return Repository.Filter(this.entity, filter).then(x => {
          return x;
      });
  }
  async Alterar(Usuario:entities.Usuario, obj:MongoDocument){
      if (Usuario.Tipo == enums.TipoUsuario.admin) {
          return Repository.Edit(this.entity, obj._id, obj).then(x => {
              return x;
          });
      }
  }
  async Deletar(Usuario:entities.Usuario, id:string){
      if (Usuario.Tipo == enums.TipoUsuario.admin) {
          return Repository.Remove(this.entity, id).then(x => {
              return x;
          });
      }
  }
  async Inserir(Usuario:entities.Usuario, obj:MongoDocument){
      if (Usuario.Tipo == enums.TipoUsuario.admin) {
          return Repository.Insert(this.entity, obj).then(x => {
              return x;
          });
      }
  }
  async InserirSemUsuario(obj:MongoDocument){
    return Repository.Insert(this.entity, obj).then(x => {
      return x;
    });
  }
}
