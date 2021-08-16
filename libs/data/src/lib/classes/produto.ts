import { Categoria } from '.';
import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';
import { CorProduto } from './corProduto';
import { Estampa } from './estampa';
import { FornecedorProduto } from './fornecedorProduto';
import { FaixaTamanho, TamanhoProduto } from './tamanhoProduto';

export class Produto extends MongoDocument implements entidadeBase{
  Nome:string;
  Descricao:string;
  Subtitulo:string;
  Categoria:Categoria;
  NomeCategoria:string;
  Preco?:number;
  Imagem:string[];
  FileList:FileList;
  Tamanho?:TamanhoProduto;
  FaixaTamanho?:FaixaTamanho;
  Tamanhos?:TamanhoProduto[];
  Cor?:CorProduto;
  Cores?:CorProduto[];
  Likes?:number = 0;
  Quantidade?:number = 1;
  QuantidadeMinima?:number = 10;
  Status?:StatusProduto;
  PrecoPromocional?:number;
  Destaque?:boolean;
  Tags?:string[];
  Especificacoes?:string;
  DescricaoRapida?:string;
  Parcelas?:number;
  Dimensoes?:Dimensoes = {Altura:0,Largura:0, Comprimento:0};
  Peso?:number = 500;
  Estampas?:Estampa[];
  Arte?:string | ArrayBuffer;
  ArteSecundaria?:string | ArrayBuffer;
  Rating?:number[] = [];
  Marca?:FornecedorProduto;
  Modelo?:string;
  Visualizacoes:number;
  Vendas?:number;
  Design?:string;
  Canvas?:string;
  Codigo?:string;
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
    Tamanho?:TamanhoProduto,
    Cor?:CorProduto,
    Likes?:number,
    Cores?:CorProduto[],
    Tamanhos?:TamanhoProduto[],
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
    Marca?:FornecedorProduto,
    Modelo?:string,
    Peso?:number,
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
      this.Peso = Peso;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;

    ObterPreco(){
      if(this.Preco)
        return ( this.Preco * this.Quantidade ) + (this.Estampas ? this.Estampas.map(x=>x.Preco).reduce((a,b,i)=> a+b) : 0);
      return 0;
    }
    RecalcularPreco(){
      this.Preco = ( this.Preco * this.Quantidade ) + (this.Estampas ? this.Estampas.map(x=>x.Preco).reduce((a,b,i)=> a+b) : 0);
    }
};
export enum StatusProduto{
  novo,
  promocao,
  esgotado,
  padrao,
}
export interface Dimensoes{
  Altura:number;
  Largura:number;
  Comprimento:number;
  Peso?:number;
}
