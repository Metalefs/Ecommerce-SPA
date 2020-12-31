import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';
import { Autor, Comentario } from './blogPost';

export class ComentarioProduto extends MongoDocument implements entidadeBase{
  IdProduto:string;
  Autor:Autor;
  Comentario:Comentario;
  key?:string;
  idUsuario?:string;
  constructor(IdProduto:string,
    Autor:Autor,
    Comentario:Comentario){
      super();
      this.IdProduto = IdProduto;
      this.Autor = Autor;
      this.Comentario = Comentario;
    }
  DataHoraCriacao: Date;
  DataHoraAlteracao: Date;
  DataHoraExclusao: Date;

}
