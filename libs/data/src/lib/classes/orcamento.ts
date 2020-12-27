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
    static readonly NomeID:string = "Orcamento";
    constructor(
      Produto:CodProduto[],
      Empresa:string,
      Status:StatusOrcamento,
      Preco:number,
      Mensagem:string,
      Usuario?:Usuario,
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
