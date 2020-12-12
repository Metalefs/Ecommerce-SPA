import { TipoUsuario } from '../enums/TipoUsuario';
import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';
import { EnderecoEntrega } from './enderecoEntrega';

export class Usuario extends MongoDocument implements entidadeBase{
    Nome:string;
    Email:string;
    Telefone:string;
    Senha?:string;
    Tipo?:TipoUsuario;
    EnderecoEntrega:EnderecoEntrega;
    EnderecosEntrega:EnderecoEntrega[];
    DataCriacao?:Date;
    token?: string;
    static readonly NomeID:string = "Usuario";
    constructor(
    Nome:string,
    Email:string,
    Telefone:string,
    Senha?:string,
    EnderecoEntrega?:EnderecoEntrega,
    EnderecosEntrega?:EnderecoEntrega[],
    Tipo?:TipoUsuario){
        super();
        this.Nome = Nome;
        this.Email = Email;
        this.Senha = Senha;
        this.Telefone = Telefone;
        this.EnderecoEntrega = EnderecoEntrega;
        this.EnderecosEntrega = EnderecosEntrega;
        this.Tipo = Tipo;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
};
