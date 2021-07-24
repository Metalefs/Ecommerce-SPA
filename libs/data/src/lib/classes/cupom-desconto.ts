import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class CupomDesconto extends MongoDocument implements entidadeBase {
    Codigo:string;
    Tipo:TipoDesconto;
    Valor:number;
    static readonly NomeID:string = "CupomDesconto";

    constructor(Codigo:string, Tipo: TipoDesconto, Valor:number){
        super();
        this.Codigo = Codigo;
        this.Tipo = Tipo;
        this.Valor = Valor;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
}
export enum TipoDesconto {
  Preco = 1,
  Porcentagem = 2
}
