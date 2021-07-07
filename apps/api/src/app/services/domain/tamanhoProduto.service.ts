import { entities } from '@personalizados-lopes/data';
import { Produto, TamanhoProduto } from 'libs/data/src/lib/classes';
import { ProdutoService } from './produto.service';
import { BaseService } from '../baseService';

export class TamanhoProdutoService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.TamanhoProduto.NomeID);

  }
  async Alterar(Usuario: entities.Usuario, TamanhoProduto: TamanhoProduto) {
    let result = await super.Alterar(Usuario,TamanhoProduto);

    let servicoProduto = new ProdutoService();

    servicoProduto.Filtrar({Tamanhos:{_id:TamanhoProduto._id}})
    .then((produtos : Array<Produto>)=>{
      produtos.forEach(async(produto)=>{
        produto.Tamanhos.find(x=>x._id == TamanhoProduto._id)[0] = TamanhoProduto;
        await servicoProduto.Alterar(Usuario,produto)
      })
    })
    return result;
  }
}
