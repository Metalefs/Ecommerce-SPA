import { entities } from '@personalizados-lopes/data';

export interface FiltroProduto {
  Categoria:entities.Categoria;
  CategoriasAtivas:entities.Categoria[];
  Produtos:entities.Produto[];
  SearchFilter:string;
  OrderFilter:number;
}
