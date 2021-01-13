export interface FiltrarProdutoSearchQuery{
  Nome?:RegExp|string;
  NomeCategoria?:RegExp|string|boolean;
  Preco?:RegExp|string;
  Status?:RegExp|string;
  Marca?:RegExp|string;
  Modelo?:RegExp|string;
};
