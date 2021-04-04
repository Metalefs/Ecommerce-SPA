import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';
import { Autor, Comentario } from './blogPost';

export class ComentarioProduto extends MongoDocument implements entidadeBase{
  IdProduto:string;
  Comentario:Comentario;
  Respostas:Comentario[];
  Avaliacao:number;
  key?:string;
  idUsuario?:string;
  constructor(IdProduto:string,
    Comentario:Comentario,
    Respostas:Comentario[],
    Avaliacao:number){
      super();
      this.IdProduto = IdProduto;
      this.Comentario = Comentario;
      this.Respostas = Respostas;
      this.Avaliacao = Avaliacao;
    }
  DataHoraCriacao: Date;
  DataHoraAlteracao: Date;
  DataHoraExclusao: Date;

}
