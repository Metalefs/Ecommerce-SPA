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
    CEP:string;
    static readonly NomeID:string = "InformacoesContato";
    constructor(
        Telefone:string,
        Email:string,
        HorarioAtendimento:string,
        Endereco:string,
        Whatsapp:string,
        Instagram:string,
        Facebook:string,
        CEP:string,
        ){
        super();
            this.Telefone = Telefone;
            this.Email = Email;
            this.HorarioAtendimento = HorarioAtendimento;
            this.Endereco = Endereco;
            this.Whatsapp = Whatsapp;
            this.Instagram = Instagram;
            this.Facebook = Facebook;
            this.CEP = CEP;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
};
