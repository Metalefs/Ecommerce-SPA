
import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class AgrupamentoCategoria extends MongoDocument implements entidadeBase {
    Nome:string;
    Categorias:string[];
    Posicao:number;
    static readonly NomeID:string = "AgrupamentoCategoria";

    constructor(Nome:string, Categorias:string[], Posicao:number){
        super();
        this.Nome = Nome;
        this.Categorias = Categorias;
        this.Posicao = Posicao;

    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
}
