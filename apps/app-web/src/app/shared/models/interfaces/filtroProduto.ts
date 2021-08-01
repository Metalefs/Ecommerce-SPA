import { entities } from '@personalizados-lopes/data';
import { CorProduto, FornecedorProduto } from 'libs/data/src/lib/classes';

export interface FiltroProduto {
  Categoria:entities.Categoria;
  CategoriasAtivas:entities.Categoria[];
  Produtos:entities.Produto[];
  SearchFilter:string;
  OrderFilter:number;
  MarcaFilter:FornecedorProduto;
  CorFilter:CorProduto;
}
