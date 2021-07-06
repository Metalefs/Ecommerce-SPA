import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';


export class CorProduto extends MongoDocument implements entidadeBase {
  Nome: string;
  Cor: string;
  static readonly NomeID: string = "CorProduto";
  constructor(
    Nome: string,
    Cor: string
  ) {
    super();
    this.Nome = Nome;
    this.Cor = Cor;
  }
  DataHoraCriacao: Date;
  DataHoraAlteracao: Date;
  DataHoraExclusao: Date;
}
