import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class Imagem extends MongoDocument implements entidadeBase {
    Src:string;
    Nome:string;
    Tipo:string;
    static readonly NomeID:string = "Imagem";
    constructor(
        Src:string,
        Nome:string,
        Tipo:string,
    ){
        super();
        this.Src =  Src;
        this.Nome =  Nome;
        this.Tipo = Tipo;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
}
