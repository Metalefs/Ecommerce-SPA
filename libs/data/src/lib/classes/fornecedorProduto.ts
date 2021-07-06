import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';


export class FornecedorProduto extends MongoDocument implements entidadeBase {
  Nome: string;
  Website: string;
  static readonly NomeID: string = "FornecedorProduto";
  constructor(
    Nome: string,
    Website: string
  ) {
    super();
    this.Nome = Nome;
    this.Website = Website;
  }
  DataHoraCriacao: Date;
  DataHoraAlteracao: Date;
  DataHoraExclusao: Date;
}
