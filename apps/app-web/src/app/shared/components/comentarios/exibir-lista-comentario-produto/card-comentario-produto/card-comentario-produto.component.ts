import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ComentarioProduto, Usuario } from 'libs/data/src/lib/classes';
import { Comentario } from 'libs/data/src/lib/classes/blogPost';
import { TipoUsuario } from 'libs/data/src/lib/enums';
import { fade } from '../../../../../animations';
import { AuthenticationService } from '../../../../../core/service/authentication/authentication.service';
import { ComentarioProdutoService } from '../../../../../data/service';
declare var require: any;
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
  Editor;
  querEditar:boolean =false;
  querResponder:boolean =false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private service:ComentarioProdutoService, private auth:AuthenticationService) {
      if(isPlatformBrowser(this.platformId)){
        const ClassicEditor = require('@ckeditor/ckeditor5-build-balloon');
        this.Editor = ClassicEditor;
      }
    }

  ngOnInit(): void {
    this.auth.currentUser.subscribe(x=>{
      if(x)
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
  like(){
    if(!localStorage.getItem(`like${this.Comentario.key}`)){
      if(!this.Comentario.Comentario.Likes){
        Object.assign(this.Comentario.Comentario, [].constructor(1));
      }
      else
        this.Comentario.Comentario.Likes += 1
      this.service.update(this.Comentario.key,this.Comentario);
      localStorage.setItem(`like${this.Comentario.key}`,"true")
    }
    else {
      this.Comentario.Comentario.Likes += 1
      this.service.update(this.Comentario.key,this.Comentario);
      localStorage.removeItem(`like${this.Comentario.key}`)
    }
  }
  dislike(){
    if(!localStorage.getItem(`dislike${this.Comentario.key}`)){
      if(!this.Comentario.Comentario.Dislikes){
        Object.assign(this.Comentario.Comentario, [].constructor(1));
      }
      else
        this.Comentario.Comentario.Dislikes += 1
      this.service.update(this.Comentario.key,this.Comentario);
      localStorage.setItem(`dislike${this.Comentario.key}`,"true")
    }
    else {
      this.Comentario.Comentario.Dislikes += 1
      this.service.update(this.Comentario.key,this.Comentario);
      localStorage.removeItem(`dislike${this.Comentario.key}`)
    }
  }
  deletar(){

    if(this.usr?.Tipo == TipoUsuario.admin){
      this.service.delete(this.Comentario.key)
    }
  }
  Editar(){
    if(this.usr?._id == this.Comentario.idUsuario || ''){
      this.service.update(this.Comentario.key,this.Comentario)
    }
  }
}
