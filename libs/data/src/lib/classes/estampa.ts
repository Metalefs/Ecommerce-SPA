import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';
import { Imagem } from './imagem';

export class Estampa extends MongoDocument implements entidadeBase {
  IdCategoria:string;
  Nome:string;
  Preco:number;
  Imagem:Imagem[];
  Descricao?:string;
  Posicao?:number;
  Destaque?:boolean;
  Files:any;
  Base64:string;
  static readonly NomeID:string = "Estampa";
  constructor(
    IdCategoria:string,
    Imagem:Imagem[],
    Preco:number,
    Descricao:string,
    Posicao:number,
    Destaque:boolean,
    Files?:any
    ){
      super();
      this.IdCategoria =  IdCategoria;
      this.Imagem =  Imagem;
      this.Descricao = Descricao;
      this.Posicao = Posicao;
      this.Destaque = Destaque;
      this.Preco = Preco;
      this.Files = Files;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
}
