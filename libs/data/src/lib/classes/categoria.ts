import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class Categoria extends MongoDocument implements entidadeBase {
    Nome:string;
    Caminho:string;
    Processo:string;
    Cor:string;
    static readonly NomeID:string = "Categoria";
    constructor(Nome:string,Processo:string,Cor?: string,Caminho?:string){
        super();
        this.Nome = Nome;
        this.Processo = Processo;
        this.Cor = Cor;
        this.Caminho = Caminho
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
}
