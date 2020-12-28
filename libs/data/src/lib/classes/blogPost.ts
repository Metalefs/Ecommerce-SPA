import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class BlogPost extends MongoDocument implements entidadeBase {
    Titulo:string;
    FotoCapa:string | ArrayBuffer;
    Autor:Autor;
    Categoria:string;
    Tags:string[];
    Conteudo:string;
    Comentarios:Comentario[];
    Avaliacao:number[];
    Visualizacoes:number;
    static readonly NomeID:string = "BlogPost";
    constructor(
      Titulo:string,
      Autor:Autor,
      Categoria:string,
      Tags:string[],
      Conteudo:string,
      Comentarios:Comentario[],
      Avaliacao:number[],
      Visualizacoes:number
    ){
        super();
        this.Titulo = Titulo;
        this.Autor = Autor;
        this.Categoria = Categoria;
        this.Tags = Tags;
        this.Conteudo = Conteudo;
        this.Comentarios = Comentarios;
        this.Avaliacao = Avaliacao;
        this.Visualizacoes = Visualizacoes;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
}
export interface Autor{
  Nome:string;
  Email:string;
  RedeSocial:RedeSocial[];
}
export interface RedeSocial{
  Nome:string;
  Link:string;
  Icone?:string;
}
export interface Comentario{
  Nome:string;
  Email:string;
  Texto:string;
}
