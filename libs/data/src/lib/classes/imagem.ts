import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class Imagem extends MongoDocument implements entidadeBase {
    Src:string;
    Nome:string;
    Tipo:string;
    FileList?:FileList;
    static readonly NomeID:string = "Imagem";
    constructor(
        Src:string,
        Nome:string,
        Tipo:string,
        FileList?:FileList
    ){
        super();
        this.Src =  Src;
        this.Nome =  Nome;
        this.Tipo = Tipo;
        this.FileList = FileList;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
}
