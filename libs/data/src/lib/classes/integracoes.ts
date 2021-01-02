import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class Integracoes extends MongoDocument implements entidadeBase {
 MP_access_token:string;
 ParcelasPadrao:number = 12;
 ResumoCartao:string;
 static NomeID:string = "Integracoes";

 auto_return:string = "all"; //URL de acesso ao checkout
 init_point:string; //URL de acesso ao checkout
 sandbox_init_point:string; //URL de acesso ao sandbox checkout.
 collector_id?:number;//Sua identificação como um vendedor no Mercado Pago.
 client_id?:string;//Id do dono do aplicativo que usa a API do Mercado Livre.
 marketplace?:string;//Origem do pagamento. Valor por defeito: NENHUM
 marketplace_fee?:number;//Comissão de Mercado cobrada pelo proprietário do aplicativo. Valor por defeito: 0 em moeda local
 binary_mode:boolean;//Quando definido como true, o pagamento só pode ter os status approved ou rejected. Caso contrário, o status in_process é adicionado.

 constructor(
  MP_access_token:string,
  ParcelasPadrao:number,
  ResumoCartao:string,
  auto_return:string,
  init_point:string,
  sandbox_init_point:string,
  collector_id?:number,
  client_id?:string,
  marketplace?:string,
  marketplace_fee?:number,
  binary_mode?:boolean,
  ){
    super();
    this.MP_access_token= MP_access_token;
    this.ParcelasPadrao = ParcelasPadrao;
    this.ResumoCartao =  ResumoCartao;
    this.auto_return = auto_return;
    this.init_point = init_point;
    this.sandbox_init_point = sandbox_init_point
    this.collector_id = collector_id
    this.client_id = client_id
    this.marketplace = marketplace
    this.marketplace_fee = marketplace_fee
    this.binary_mode = binary_mode
 }
  DataHoraCriacao: Date;
  DataHoraAlteracao: Date;
  DataHoraExclusao: Date;
}
