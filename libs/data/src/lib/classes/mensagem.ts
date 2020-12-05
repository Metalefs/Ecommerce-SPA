import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class Mensagem extends MongoDocument implements entidadeBase{
  Whatsapp:string;
  EmailRecebimentoOrcamento:string;
  EmailRecebimentoContato:string;
  EmailCadadastroUsuario:string;
  static readonly NomeID:string = "Mensagem";
  constructor(
  Whatsapp:string,
  EmailRecebimentoOrcamento?:string,
  EmailRecebimentoContato?:string,
  EmailCadadastroUsuario?:string,
  ){
    super();
    this.Whatsapp = Whatsapp;
    this.EmailRecebimentoOrcamento = EmailRecebimentoOrcamento;
    this.EmailRecebimentoContato = EmailRecebimentoContato;
    this.EmailCadadastroUsuario = EmailCadadastroUsuario;
  }
  DataHoraCriacao: Date;
  DataHoraAlteracao: Date;
  DataHoraExclusao: Date;
}
