import { StatusOrcamento } from '../enums/StatusOrcamento';
import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';
import { Usuario} from './usuario';
import { Produto } from './produto';


export class Orcamento extends MongoDocument implements entidadeBase{

    Usuario?:Usuario;
    Produto:CodProduto[];
    Empresa:string;
    Status:StatusOrcamento;
    Preco:number;
    Mensagem:string;
    Dimensoes?:string;
    ResultadoPagamentoMP:ResultadoPagamentoMP;
    static readonly NomeID:string = "Orcamento";
    constructor(
      Produto:CodProduto[],
      Empresa:string,
      Status:StatusOrcamento,
      Preco:number,
      Mensagem:string,
      Usuario?:Usuario,
      Dimensoes?:string,
      ResultadoPagamentoMP?:ResultadoPagamentoMP
    ){
        super();
        this.Produto = Produto;
        this.Empresa = Empresa;
        this.Status = Status;
        this.Preco = Preco;
        this.Mensagem = Mensagem;
        this.Usuario = Usuario;
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


export interface ResultadoPagamentoMP{
  collection_id:number;
  collection_status:string //approved&pending
  payment_id:number;
  status:string //approved|failure|pending
  external_reference:any
  payment_type:string; //credit_card&
  merchant_order_id:number;
  preference_id:string;
  site_id:string; //MLB&
  processing_mode:string; //aggregator&
  merchant_account_id:number;
}
