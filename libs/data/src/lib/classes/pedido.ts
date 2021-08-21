import { StatusOrcamento } from '../enums/StatusOrcamento';
import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';
import { Usuario} from './usuario';
import { Produto } from './produto';
import { MercadoPagoPayment, MercadoPagoResultadoPagamentoCheckout, PrecoPrazoCep } from '../interfaces';
import { Orcamento } from './orcamento';

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
    Frete:PrecoPrazoCep;
    static readonly NomeID:string = "Pedido";
    constructor(
     orcamento:Orcamento
    ){
        super();
        this.Produto = orcamento.Produto;
        this.Empresa = orcamento.Empresa;
        this.Status = orcamento.Status;
        this.Preco = orcamento.Preco;
        this.Mensagem = orcamento.Mensagem;
        this.Usuario = orcamento.Usuario;
        this.Dimensoes = orcamento.Dimensoes;
        this.Frete = orcamento.Entrega.dados;
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
