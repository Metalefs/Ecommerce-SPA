import { StatusProduto } from "../classes/produto";

export interface FiltrarProdutoSearchQuery{
  Nome?:RegExp|string;
  NomeCategoria?:RegExp|string|boolean;
  Preco?:RegExp|string;
  Status?:RegExp|string|StatusProduto;
  Marca?:RegExp|string;
  Modelo?:RegExp|string;
  Tags?:RegExp|string;
};
