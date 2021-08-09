import { StatusProduto } from "../classes/produto";

export interface FiltrarProdutoSearchQuery{
  Nome?:RegExp|string;
  NomeCategoria?:RegExp|string|boolean;
  Preco?:RegExp|string;
  Status?:RegExp|string|StatusProduto;
  Marca?:RegExp|string|{Nome:string|RegExp};
  "Marca.Nome"?:RegExp|string;
  Cores?:RegExp|string|{$elemMatch:{Nome:string|RegExp}};
  Modelo?:RegExp|string;
  Tags?:RegExp|string;
};
