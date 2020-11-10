import { TipoUsuario } from '../enums/TipoUsuario';
import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class Usuario extends MongoDocument implements entidadeBase{
    Nome:string;
    Email:string;
    Telefone:string;
    Senha?:string;
    Rua?:string;
    Numero?:string;
    Bairro?:string;
    Estado?:string;
    Cidade?:string;
    Complemento?:string;
    Tipo?:TipoUsuario;
    DataCriacao?:Date;
    token?: string;
    static readonly NomeID:string = "Usuario";
    constructor(
    Nome:string,
    Email:string,
    Telefone:string,
    Senha?:string,
    Rua?:string,
    Bairro?:string,
    Numero?:string,
    Cidade?:string,
    Complemento?:string,
    Estado?:string,
    Tipo?:TipoUsuario){
        super();
        this.Nome = Nome;
        this.Email = Email;
        this.Senha = Senha;
        this.Telefone = Telefone;
        this.Rua = Rua;
        this.Bairro = Bairro;
        this.Numero = Numero;
        this.Cidade = Cidade;
        this.Complemento = Complemento;
        this.Estado = Estado;
        this.Tipo = Tipo;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
};
