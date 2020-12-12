import { entidadeBase } from '../interfaces/entity';

export class EnderecoEntrega implements entidadeBase{
  Rua?:string;
  Numero?:string;
  Bairro?:string;
  Cidade?:string;
  Complemento?:string;
  CEP?:string;
  Estado?:string;
  constructor(
    Rua?:string,
    Numero?:string,
    Bairro?:string,
    Cidade?:string,
    Complemento?:string,
    CEP?:string,
    Estado?:string,
  ){
    this.Rua = Rua;
    this.Numero = Numero;
    this.Bairro = Bairro;
    this.Cidade = Cidade;
    this.Complemento = Complemento;
    this.CEP = CEP;
    this.Estado = Estado;
  }
  DataHoraCriacao: Date;
  DataHoraAlteracao: Date;
  DataHoraExclusao: Date;
}
