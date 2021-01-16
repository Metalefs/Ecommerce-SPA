import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Comentario } from 'libs/data/src/lib/classes/blogPost';
import { AuthenticationService } from '../../../../core/service/authentication/authentication.service';

@Component({
  selector: 'personalizados-lopes-escrever-comentario',
  templateUrl: './escrever-comentario.component.html',
  styleUrls: ['./escrever-comentario.component.scss']
})
export class EscreverComentarioComponent implements OnInit {

  @Output()
  EnviarComentario = new EventEmitter();

  Comentario:Comentario = {
    Autor:{
      Nome:'',
      Email:'',
      RedeSocial: [
        {Nome:'Facebook',Link:''},
        {Nome:'Instagram',Link:''},
        {Nome:'Twitter',Link:''}
      ]
    },Texto:'',Respostas:[],
    Likes:0,
    Dislikes:0,
    DataHoraAlteracao: new Date(),
    DataHoraCriacao:new Date(),
    DataHoraExclusao: null
  };
  constructor(auth:AuthenticationService) {
    auth.currentUser.subscribe(x=>{
      if(x && x._id){
        this.Comentario.Autor.Email = x.Email;
        this.Comentario.Autor.Nome = x.Nome;
        this.Comentario.idUsuario = x._id;
      }
    });
  }

  ngOnInit(): void {
  }

  Enviar(){
    this.EnviarComentario.emit(this.Comentario)
  }
}
