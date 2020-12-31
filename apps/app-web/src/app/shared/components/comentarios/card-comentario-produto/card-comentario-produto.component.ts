import { Component, Input, OnInit } from '@angular/core';
import { ComentarioProduto, Usuario } from 'libs/data/src/lib/classes';
import { Comentario } from 'libs/data/src/lib/classes/blogPost';
import { TipoUsuario } from 'libs/data/src/lib/enums';
import { fade } from '../../../../animations';
import { AuthenticationService } from '../../../../core/service/authentication/authentication.service';
import { ComentarioProdutoService } from '../../../../data/service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { coerceArray } from '@angular/cdk/coercion';
@Component({
  selector: 'personalizados-lopes-card-comentario-produto',
  templateUrl: './card-comentario-produto.component.html',
  styleUrls: ['./card-comentario-produto.component.scss'],
  animations:[fade]
})
export class CardComentarioProdutoComponent implements OnInit {
  @Input()
  Comentario:ComentarioProduto;
  usr:Usuario;
  tipoUsuario = TipoUsuario;
  Editor = ClassicEditor;
  querEditar:boolean =false;
  querResponder:boolean =false;
  constructor(private service:ComentarioProdutoService, private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.auth.currentUser.subscribe(x=>{
    this.usr = x
    })
  }
  responder(Comentario:Comentario){
    if(!this.Comentario.Respostas){
      this.Comentario.Respostas = []
      Object.assign(this.Comentario.Respostas, [].constructor(Comentario));
    }
    else
      this.Comentario.Respostas.push(Comentario);
    this.service.update(this.Comentario.key,this.Comentario);
    this.querResponder = !this.querResponder;
  }
  deletar(){
    if(this.usr.Tipo == TipoUsuario.admin){
      this.service.delete(this.Comentario.key)
    }
  }
  Editar(){
    if(this.usr._id == this.Comentario.idUsuario || ''){
      this.service.update(this.Comentario.key,this.Comentario)
    }
  }
}
