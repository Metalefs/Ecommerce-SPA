import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';
import { Usuario } from './usuario';

export class Feedback extends MongoDocument implements entidadeBase{
    Empresa:string;
    Usuario:Usuario;
    Titulo:string;
    Comentario:string;
    static readonly NomeID:string = "Feedback";
    constructor(
    Empresa:string,
    Usuario:Usuario,
    Titulo:string,
    Comentario:string){
        super();
        this.Empresa = Empresa;
        this.Usuario = Usuario;
        this.Titulo = Titulo;
        this.Comentario = Comentario;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
};
