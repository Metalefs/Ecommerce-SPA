import { entities } from '@personalizados-lopes/data';
import { FornecedorProduto, Produto } from 'libs/data/src/lib/classes';
import { ProdutoService } from './produto.service';
import { BaseService } from '../baseService';

export class FornecedorProdutoService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.FornecedorProduto.NomeID);

  }
  async Alterar(Usuario: entities.Usuario, FornecedorProduto: FornecedorProduto) {
    let result = await super.Alterar(Usuario,FornecedorProduto);

    let servicoProduto = new ProdutoService();

    servicoProduto.Filtrar({"Marca._id": FornecedorProduto._id})
    .then((produtos : Array<Produto>)=>{
      produtos.forEach(async(produto)=>{
        produto.Marca = FornecedorProduto;
        await servicoProduto.Alterar(Usuario,produto)
      })
    })
    return result;
  }
}
