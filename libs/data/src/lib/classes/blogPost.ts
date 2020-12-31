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
    StatusPostagem:StatusPostagem;
    AutorUltimaModificacao:Autor;
    static readonly NomeID:string = "BlogPost";
    public key:string;
    constructor(
      Titulo:string,
      FotoCapa:string | ArrayBuffer,
      Autor:Autor,
      Categoria:string,
      Tags:string[],
      Conteudo:string,
      Comentarios:Comentario[],
      Avaliacao:number[],
      Visualizacoes:number,
      StatusPostagem:StatusPostagem
    ){
        super();
        this.Titulo = Titulo;
        this.Autor = Autor;
        this.FotoCapa = FotoCapa;
        this.Categoria = Categoria;
        this.Tags = Tags;
        this.Conteudo = Conteudo;
        this.Comentarios = Comentarios;
        this.Avaliacao = Avaliacao;
        this.Visualizacoes = Visualizacoes;
        this.StatusPostagem = StatusPostagem;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
}
export enum StatusPostagem{
  privado,
  aberto
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
export interface Comentario extends entidadeBase{
  Nome:string;
  Email:string;
  Texto:string;
  Respostas:Comentario[];
  Avaliacao?:number;
  key?:string;
  idUsuario?:string;
}
