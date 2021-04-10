import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';
import { Categoria } from './categoria';

export class Servico extends MongoDocument implements entidadeBase{
    Nome:string;
    Descricao:string;
    Categoria:Categoria;
    Imagem:string;
    FileList:FileList;
    static readonly NomeID:string = "Servico";
    constructor(
        Nome:string,
        Descricao:string,
        Categoria:Categoria,
        Imagem:string,
        FileList:FileList
    ){
        super();
        this.Nome = Nome;
        this.Descricao = Descricao;
        this.Categoria = Categoria;
        this.Imagem = Imagem;
        this.FileList = FileList;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
}
