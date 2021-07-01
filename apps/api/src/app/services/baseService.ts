import { entities, enums } from '@personalizados-lopes/data';
import { MongoDocument } from 'libs/data/src/lib/classes/abstract/MongoDocument';

import { Repository } from '../repositories/repository';

var ObjectId = require('mongodb').ObjectID;
export class BaseService {

  /**
   *
   */
  constructor(private entity: string) {
  }

  async Ler() {
    return Repository.List(this.entity).then(x => {
      return x;
    }).catch(err => {
      throw `Erro ao listar ${this.entity}. - ${err}`
    });
  }

  async LerPrimeiro() {
    return Repository.List(this.entity).then(x => {
      return x[0];
    }).catch(err => {
      throw `Erro ao ler primeiro(a) ${this.entity}. - ${err}`
    });
  }

  async LerUltimo(){
    return Repository.List(this.entity).then((x:any) => {
      if(x){
        let arr = [];
        arr.push(x[x.length -1]);
        return arr[0];
      }
      return x;
    }).catch(err => {
      throw `Erro ao ler último(a) ${this.entity}. - ${err}`
    });
  }

  async Count(filter: {}) {
    return Repository.CountFilter(this.entity, filter).then(x => {
      return x;
    }).catch(err => {
      throw `Erro ao realizar contagem de (${this.entity}). - ${err}`
    });
  }

  async FiltrarUm(filter: {}) {
    return Repository.FindOne(this.entity, filter).then(x => {
      return x;
    }).catch(err => {
      throw `Erro ao filtrar um(a) ${this.entity}. - ${err}`
    });
  }

  async Filtrar(filter: {}) {
    return Repository.Filter(this.entity, filter).then(x => {
      return x;
    }).catch(err => {
      throw `Erro ao filtrar ${this.entity}. - ${err}`
    });
  }
  async FiltrarPorId(id) {
    return Repository.Filter(this.entity, { "_id": new ObjectId(id) }).then(x => {
      return x;
    }).catch(err => {
      throw `Erro ao filtrar ${this.entity}. - ${err}`
    });
  }

  async Alterar(Usuario: entities.Usuario, obj: MongoDocument) {
    if (Usuario.Tipo == enums.TipoUsuario.admin) {
      return Repository.Edit(this.entity, obj._id, obj).then(x => {
        return x;
      }).catch(err => {
        throw `Erro ao alterar ${this.entity}. - ${err}`
      });
    }
    throw 'Usuario não autorizado.'
  }

  async Deletar(Usuario: entities.Usuario, id: string) {
    if (Usuario.Tipo == enums.TipoUsuario.admin) {
      return Repository.Remove(this.entity, id).then(x => {
        return x;
      }).catch(err => {
        throw `Erro ao deletar ${this.entity}. - ${err}`
      });
    }
    throw 'Usuario não autorizado.'
  }

  async Inserir(Usuario: entities.Usuario, obj: MongoDocument) {
    if (Usuario.Tipo == enums.TipoUsuario.admin) {
      return Repository.Insert(this.entity, obj).then(x => {
        return x;
      }).catch(err => {
        throw `Erro ao inserir ${this.entity}. - ${err}`
      });
    }
    throw 'Usuario não autorizado.'
  }

  async InserirSemUsuario(obj: MongoDocument) {
    return Repository.Insert(this.entity, obj).then(x => {
      return x;
    }).catch(err => {
      throw `Erro ao Inserir Sem Usuario. - ${err}`
    });
  }
}
