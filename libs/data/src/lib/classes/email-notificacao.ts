import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';
import { Produto } from './produto';

export class EmailNotificacao extends MongoDocument implements entidadeBase {
    Email:string;
    Nome:string;
    ProdutoNotificacao?:Produto;
    static readonly NomeID:string = "EmailNotificacao";
    constructor(
        EmailNotificacao:string,
        Nome:string,
        ProdutoNotificacao?:Produto
    ){
        super();
        this.Email =  EmailNotificacao;
        this.Nome =  Nome;
        this.ProdutoNotificacao = ProdutoNotificacao;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
}
