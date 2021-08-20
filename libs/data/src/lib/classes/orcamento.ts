import { StatusOrcamento } from '../enums/StatusOrcamento';
import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';
import { Usuario} from './usuario';
import { Produto } from '.';
import { Dimensoes } from './produto';
import { PrecoPrazoCep } from '../interfaces';
export class Orcamento extends MongoDocument implements entidadeBase{

    Usuario?:Usuario;
    Produto:CodProduto[];
    Empresa:string;
    Status:StatusOrcamento;
    Preco:number;
    Mensagem:string;

    Dimensoes?:string;
    DimensoesObjs?:Dimensoes[];
    CupomDesconto?:string;
    Entrega:EntregaOrcamento;
    static readonly NomeID:string = "Orcamento";
    constructor(
      Produto:CodProduto[],
      Empresa:string,
      Status:StatusOrcamento,
      Preco:number,
      Mensagem:string,
      CupomDesconto:string,
      Usuario?:Usuario,
      Entrega?:EntregaOrcamento,
    ){
        super();
        this.Produto = Produto;
        this.Empresa = Empresa;
        this.Status = Status;
        this.Preco = Preco;
        this.Mensagem = Mensagem;
        this.Usuario = Usuario;
        this.CupomDesconto = CupomDesconto;
        this.Entrega = Entrega;
    }

    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
}
export class CodProduto {
  Produto:Produto;
  codOrcamento:string;
  constructor(Produto:Produto, codOrcamento:string){
    this.Produto  =  Produto;
    this.codOrcamento =  codOrcamento;
  }
}
export interface EntregaOrcamento{
  cep?:string,
  dados?:PrecoPrazoCep
}
