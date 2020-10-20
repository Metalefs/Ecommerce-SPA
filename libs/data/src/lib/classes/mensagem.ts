import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class Mensagem extends MongoDocument implements entidadeBase{
  Whatsapp:string;
  EmailRecebimentoOrcamento:string;
  static readonly NomeID:string = "Mensagem";
  constructor(
  Whatsapp:string,
  EmailRecebimentoOrcamento?:string
  ){
    super();
    this.Whatsapp = Whatsapp;
    this.EmailRecebimentoOrcamento = EmailRecebimentoOrcamento;
  }
  DataHoraCriacao: Date;
  DataHoraAlteracao: Date;
  DataHoraExclusao: Date;
}
