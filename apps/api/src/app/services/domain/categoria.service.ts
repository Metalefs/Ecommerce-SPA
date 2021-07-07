import { entities, enums } from '@personalizados-lopes/data';
import { Categoria, Produto } from 'libs/data/src/lib/classes';
import { BaseService } from '../baseService';
import { ProdutoService } from './produto.service';

export class CategoriaService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.Categoria.NomeID);

  }

  async Alterar(Usuario: entities.Usuario, Categoria: Categoria) {
    let result = await super.Alterar(Usuario,Categoria);

    let servicoProduto = new ProdutoService();

    servicoProduto.Filtrar({Categoria:{_id:Categoria._id}})
    .then((produtos : Array<Produto>)=>{
      produtos.forEach(async(produto)=>{
        produto.Categoria = Categoria;
        produto.NomeCategoria = Categoria.Nome;
        await servicoProduto.Alterar(Usuario,produto)
      })
    })
    return result;
  }
}
