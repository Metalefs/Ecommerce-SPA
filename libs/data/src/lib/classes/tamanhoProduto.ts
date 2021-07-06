import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';


export class TamanhoProduto extends MongoDocument implements entidadeBase{
    Nome:string;
    Tamanhos:FaixaTamanho[];
    static readonly NomeID:string = "TamanhoProduto";
    constructor(
      Nome:string,
      Tamanhos:FaixaTamanho[]
    ){
      super();
      this.Nome = Nome;
      this.Tamanhos = Tamanhos;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
}

export interface FaixaTamanho {
  Tamanho:string;
  Preco:number;
}
