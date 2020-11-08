import { entities } from '@personalizados-lopes/data';

export interface FiltroProduto {
  Categoria:entities.Categoria;
  SearchFilter:string;
  OrderFilter:number;
}
