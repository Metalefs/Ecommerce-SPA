import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class Integracoes extends MongoDocument implements entidadeBase {
 MP_access_token:string;
 ParcelasPadrao:number = 12;
 ResumoCartao:string;
 static NomeID:string = "Integracoes";

 auto_return:string = "all"; //URL de acesso ao checkout
 collector_id?:number;//Sua identificação como um vendedor no Mercado Pago.
 client_id?:number;//Id do dono do aplicativo que usa a API do Mercado Livre.
 client_secret?:string;//secret do dono do aplicativo que usa a API do Mercado Livre.
 public_key?:string;//Id do dono do aplicativo que usa a API do Mercado Livre.
 marketplace?:string;//Origem do pagamento. Valor por defeito: NENHUM
 marketplace_fee?:number;//Comissão de Mercado cobrada pelo proprietário do aplicativo. Valor por defeito: 0 em moeda local
 binary_mode:boolean;//Quando definido como true, o pagamento só pode ter os status approved ou rejected. Caso contrário, o status in_process é adicionado.

 descontoCompras?:number;
 valorMinimoDescontoCompras?:number;
 constructor(
  MP_access_token:string,
  ParcelasPadrao:number,
  ResumoCartao:string,
  auto_return:string,
  collector_id?:number,
  client_id?:number,
  client_secret?:string,
  public_key?:string,
  marketplace?:string,
  marketplace_fee?:number,
  binary_mode?:boolean,
  ){
    super();
    this.MP_access_token= MP_access_token;
    this.ParcelasPadrao = ParcelasPadrao;
    this.ResumoCartao =  ResumoCartao;
    this.auto_return = auto_return;
    this.collector_id = collector_id
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.public_key = public_key;
    this.marketplace = marketplace;
    this.marketplace_fee = marketplace_fee;
    this.binary_mode = binary_mode;
 }
  DataHoraCriacao: Date;
  DataHoraAlteracao: Date;
  DataHoraExclusao: Date;
}
