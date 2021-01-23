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
  Cor?:Cor;
  Likes?:number = 0;
  Quantidade?:number = 1;
  QuantidadeMinima?:number = 10;
  Cores?:Cor[];
  Tamanhos?:string[];
  Status?:StatusProduto;
  PrecoPromocional?:number;
  Destaque?:boolean;
  Tags?:string[];
  Especificacoes?:string;
  DescricaoRapida?:string;
  Parcelas?:number;
  Dimensoes?:Dimensoes = {Altura:0,Largura:0, Comprimento:0};
  Arte?:string | ArrayBuffer;
  ArteSecundaria?:string | ArrayBuffer;
  Rating?:number[] = [];
  Marca?:string;
  Modelo?:string;
  Visualizacoes:number;
  Vendas?:number;
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
    Cor?:Cor,
    Likes?:number,
    Cores?:Cor[],
    Tamanhos?:string[],
    Status?:StatusProduto,
    PrecoPromocional?:number,
    Destaque?:boolean,
    Tags?:string[],
    Especificacoes?:string,
    DescricaoRapida?:string,
    Parcelas?:number,
    Dimensoes?:Dimensoes,
    Arte?:string | ArrayBuffer,
    ArteSecundaria?:string | ArrayBuffer,
    Rating?:number[],
    Marca?:string,
    Modelo?:string,
    Visualizacoes?:number,
    Vendas?:number,
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
      this.Cores = Cores;
      this.Tamanhos = Tamanhos;
      this.Status = Status;
      this.PrecoPromocional = PrecoPromocional;
      this.Destaque = Destaque;
      this.Tags = Tags;
      this.Especificacoes = Especificacoes;
      this.DescricaoRapida = DescricaoRapida;
      this.Parcelas = Parcelas;
      this.Arte = Arte;
      this.ArteSecundaria = ArteSecundaria;
      this.Rating = Rating;
      this.Dimensoes = Dimensoes;
      this.Marca = Marca;
      this.Modelo = Modelo;
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
export interface Cor{
  nome:string;
  cor:string;
}
export enum StatusProduto{
  novo,
  promocao,
  esgotado,
}
export interface Dimensoes{
  Altura:number;
  Largura:number;
  Comprimento:number;
}
