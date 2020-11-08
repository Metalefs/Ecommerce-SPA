import { Categoria } from '.';
import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class Produto extends MongoDocument implements entidadeBase{
    Nome:string;
    Descricao:string;
    Subtitulo:string;
    Categoria:Categoria;
    NomeCategoria:string;
    Preco?:number;
    Imagem:string[];
    FileList:FileList;
    Tamanho?:string;
    Cor?:string;
    Likes?:number = 0;
    Quantidade?:number = 10;
    QuantidadeMinima?:number = 10;
    Cores?:string;
    static readonly NomeID:string = "Produto";
    constructor(
    Nome:string,
    Descricao:string,
    Subtitulo:string,
    Categoria:Categoria,
    NomeCategoria:string,
    Imagem:string[],
    QuantidadeMinima?:number,
    Preco?:number,
    Tamanho?:string,
    Cor?:string,
    Likes?:number,
    ){
        super();
        this.Nome = Nome;
        this.Descricao = Descricao;
        this.Subtitulo = Subtitulo;
        this.Categoria = Categoria;
        this.NomeCategoria = NomeCategoria;
        this.Imagem = Imagem;
        this.QuantidadeMinima = QuantidadeMinima;
        this.Preco = Preco;
        this.Tamanho = Tamanho;
        this.Cor = Cor;
        this.Likes = Likes;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;

    ObterPreco(){
      if(this.Preco)
        return this.Preco * this.Quantidade;
      return 0;
    }
};
