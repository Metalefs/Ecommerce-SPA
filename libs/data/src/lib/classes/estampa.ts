import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';
import { Imagem } from './imagem';

export class Estampa extends MongoDocument implements entidadeBase {
  IdCategoria:string;
  Nome:string;
  Preco:number;
  Imagem:Imagem;
  Descricao?:string;
  Posicao?:string;
  Destaque?:string;
  FileList:FileList;
  Base64:string;
  static readonly NomeID:string = "Estampa";
  constructor(
    IdCategoria:string,
    Imagem:Imagem,
    Preco:number,
    FileList?:FileList
    ){
      super();
      this.IdCategoria =  IdCategoria;
      this.Imagem =  Imagem;
      this.Preco = Preco;
      this.FileList = FileList;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
}
