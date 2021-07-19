import { StatusOrcamento } from '../enums/StatusOrcamento';
import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';
import { Usuario} from './usuario';
import { Produto } from './produto';
import { MercadoPagoPayment, MercadoPagoResultadoPagamentoCheckout } from '../interfaces';

export class Pedido extends MongoDocument implements entidadeBase{

    Usuario?:Usuario;
    Produto:CodProduto[];
    Empresa:string;
    Status:StatusOrcamento;
    Preco:number;
    Mensagem:string;
    Dimensoes?:string;
    ResultadoPagamentoMP:MercadoPagoResultadoPagamentoCheckout;
    HistoricoPagamento?:MercadoPagoPayment[];
    static readonly NomeID:string = "Pedido";
    constructor(
      Produto:CodProduto[],
      Empresa:string,
      Status:StatusOrcamento,
      Preco:number,
      Mensagem:string,
      Usuario?:Usuario,
      Dimensoes?:string,
      ResultadoPagamentoMP?:MercadoPagoResultadoPagamentoCheckout
    ){
        super();
        this.Produto = Produto;
        this.Empresa = Empresa;
        this.Status = Status;
        this.Preco = Preco;
        this.Mensagem = Mensagem;
        this.Usuario = Usuario;
        this.Dimensoes = Dimensoes;
        this.ResultadoPagamentoMP = ResultadoPagamentoMP;
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
