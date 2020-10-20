import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';


export class Sobre extends MongoDocument implements entidadeBase{
    Nome:string;
    Descricao:string;
    Historia:string;
    Fabricacao:string;
    static readonly NomeID:string = "Sobre";
    constructor(
        Nome:string,
        Descricao:string,
        Historia:string,
        Fabricacao:string,
    ){
        super();
        this.Nome = Nome;
        this.Descricao = Descricao;
        this.Historia = Historia;
        this.Fabricacao = Fabricacao;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
}
