import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class Integracoes extends MongoDocument implements entidadeBase {
 MP_access_token:string;
 static NomeID:string = "Integracoes";
 constructor(MP_access_token:string){
   super();
   this.MP_access_token= MP_access_token;
 }
  DataHoraCriacao: Date;
  DataHoraAlteracao: Date;
  DataHoraExclusao: Date;
}
