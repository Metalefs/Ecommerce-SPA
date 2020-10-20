import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class EmailNotificacao extends MongoDocument implements entidadeBase {
    Email:string;
    Nome:string;
    static readonly NomeID:string = "EmailNotificacao";
    constructor(
        EmailNotificacao:string,
        Nome:string,
    ){
        super();
        this.Email =  EmailNotificacao;
        this.Nome =  Nome;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
}
