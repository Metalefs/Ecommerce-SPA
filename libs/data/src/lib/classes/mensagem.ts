import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class MensagemEmail extends MongoDocument implements entidadeBase{
  Whatsapp:string;
  EmailRecebimentoOrcamento:string;
  EmailRecebimentoContato:string;
  EmailCadadastroUsuario:string;
  EmailProdutoReestocado:string;
  EmailRecuperacaoSenha:string;
  EmailRecebimentoFeedback:string;
  EmailCadastroCodRastreamentoPedido:string;
  static readonly NomeID:string = "Mensagem";
  constructor(
  Whatsapp:string,
  EmailRecebimentoOrcamento?:string,
  EmailRecebimentoContato?:string,
  EmailCadadastroUsuario?:string,
  EmailProdutoReestocado?:string,
  EmailRecuperacaoSenha?:string,
  EmailRecebimentoFeedback?:string,
  EmailCadastroCodRastreamentoPedido?:string,
  ){
    super();
    this.Whatsapp = Whatsapp;
    this.EmailRecebimentoOrcamento = EmailRecebimentoOrcamento;
    this.EmailRecebimentoContato = EmailRecebimentoContato;
    this.EmailCadadastroUsuario = EmailCadadastroUsuario;
    this.EmailProdutoReestocado = EmailProdutoReestocado;
    this.EmailRecuperacaoSenha = EmailRecuperacaoSenha;
    this.EmailRecebimentoFeedback = EmailRecebimentoFeedback;
    this.EmailCadastroCodRastreamentoPedido = EmailCadastroCodRastreamentoPedido;
  }
  DataHoraCriacao: Date;
  DataHoraAlteracao: Date;
  DataHoraExclusao: Date;
}
