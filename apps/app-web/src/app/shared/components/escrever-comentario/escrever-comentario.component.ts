import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Comentario } from 'libs/data/src/lib/classes/blogPost';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AuthenticationService } from '../../../core/service/authentication/authentication.service';
import { Usuario } from 'libs/data/src/lib/classes';
@Component({
  selector: 'personalizados-lopes-escrever-comentario',
  templateUrl: './escrever-comentario.component.html',
  styleUrls: ['./escrever-comentario.component.scss']
})
export class EscreverComentarioComponent implements OnInit {

  @Output()
  EnviarComentario = new EventEmitter();;
  Comentario:Comentario = {
    Nome:'',Email:'',Texto:'',Respostas:[],
    DataHoraAlteracao: new Date(),
    DataHoraCriacao:new Date(),
    DataHoraExclusao: null
  };
  Editor = ClassicEditor;
  constructor(auth:AuthenticationService) {
    auth.currentUser.subscribe(x=>{
      if(x){
        this.Comentario.Email = x.Email;
        this.Comentario.Nome = x.Nome;
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
