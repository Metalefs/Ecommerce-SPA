import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class Integracoes extends MongoDocument implements entidadeBase {
 MP_access_token:string;
 ParcelasPadrao:number = 12;
 ResumoCartao:string;
 static NomeID:string = "Integracoes";
 constructor(MP_access_token:string,
  ParcelasPadrao:number,
  ResumoCartao:string){
   super();
   this.MP_access_token= MP_access_token;
   this.ParcelasPadrao = ParcelasPadrao;
   this.ResumoCartao =  ResumoCartao;
 }
  DataHoraCriacao: Date;
  DataHoraAlteracao: Date;
  DataHoraExclusao: Date;
}
