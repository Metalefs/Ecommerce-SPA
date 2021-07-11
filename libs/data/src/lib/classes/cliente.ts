import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class Cliente extends MongoDocument implements entidadeBase{
  Nome:string;
  Tipo:string;
  Origem:string;
  Comentario:string;
  Foto:string;
  Files:any;
  static readonly NomeID:string = "Cliente";
    constructor(
      Nome:string,
      Tipo:string,
      Origem:string,
      Comentario:string,
      Foto:string,
        ){
        super();
        this.Nome = Nome;
        this.Tipo = Tipo;
        this.Origem = Origem;
        this.Comentario = Comentario;
        this.Foto = Foto;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
};
