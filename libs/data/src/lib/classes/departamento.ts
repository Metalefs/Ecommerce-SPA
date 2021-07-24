import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';
import { Categoria } from './categoria';
import { Imagem } from './imagem';

export class Departamento extends MongoDocument implements entidadeBase {
    Nome:string;
    Imagem:Imagem;
    Categorias:Categoria[];
    static readonly NomeID:string = "Departamento";

    constructor(Nome:string, Categorias: Categoria[]){
        super();
        this.Nome = Nome;
        this.Categorias = Categorias;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
}
