import { entities, enums } from '@personalizados-lopes/data';
import { Integracoes, Produto } from 'libs/data/src/lib/classes';
import { MongoDocument } from 'libs/data/src/lib/classes/abstract/MongoDocument';
import { BaseService } from '../baseService';
import { ProdutoService } from './produto.service';

export class IntegracoesService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.Integracoes.NomeID);

  }
  async Alterar(Usuario: entities.Usuario, obj: MongoDocument){
    let result = await super.Alterar(Usuario,obj) as Integracoes;

    let servicoProduto = new ProdutoService();

    servicoProduto.Ler()
    .then((produtos : Array<Produto>)=>{
      produtos.forEach(async(produto)=>{
        produto.Parcelas = result.ParcelasPadrao;
        await servicoProduto.Alterar(Usuario, produto)
      })
    })
    return result;
  }
}
