import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class InformacoesContato extends MongoDocument implements entidadeBase{
    Telefone:string;
    Email:string;
    HorarioAtendimento:string;
    Endereco:string;
    Whatsapp:string;
    Instagram:string;
    Facebook:string;
    static readonly NomeID:string = "InformacoesContato";
    constructor(
        Telefone:string,
        Email:string,
        HorarioAtendimento:string,
        Endereco:string,
        Whatsapp:string,
        Instagram:string,
        Facebook:string,
        ){
        super();
            this.Telefone = Telefone;
            this.Email = Email;
            this.HorarioAtendimento = HorarioAtendimento;
            this.Endereco = Endereco;
            this.Whatsapp = Whatsapp;
            this.Instagram = Instagram;
            this.Facebook = Facebook;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
};
