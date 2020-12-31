import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';
import { Autor, Comentario } from './blogPost';

export class ComentarioProduto extends MongoDocument implements entidadeBase{
  IdProduto:string;
  Comentario:Comentario;
  Respostas:Comentario[];
  key?:string;
  idUsuario?:string;
  constructor(IdProduto:string,
    Comentario:Comentario,
    Respostas:Comentario[]){
      super();
      this.IdProduto = IdProduto;
      this.Comentario = Comentario;
      this.Respostas = Respostas;
    }
  DataHoraCriacao: Date;
  DataHoraAlteracao: Date;
  DataHoraExclusao: Date;

}
