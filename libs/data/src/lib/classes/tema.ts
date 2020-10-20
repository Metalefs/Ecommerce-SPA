import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class Tema extends MongoDocument implements entidadeBase {
    CorPrimaria:string;
    CorSecundaria:string;
    CorTerciaria:string;
    static readonly NomeID:string = "Tema";
    constructor(
        CorPrimaria:string,
        CorSecundaria:string,
        CorTerciaria:string,
    ){
        super();
        this.CorPrimaria = CorPrimaria;
        this.CorSecundaria = CorSecundaria;
        this.CorTerciaria = CorTerciaria;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
}
