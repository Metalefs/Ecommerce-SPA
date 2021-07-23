import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class Categoria extends MongoDocument implements entidadeBase {
    Nome:string;
    Processo:string;
    Cor:string;
    Nicho:string;
    static readonly NomeID:string = "Categoria";

    constructor(Nome:string, Processo:string, Cor?: string, Nicho?:string){
      super();
      this.Nome = Nome;
      this.Processo = Processo;
      this.Cor = Cor;
      this.Nicho = Nicho;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
}
