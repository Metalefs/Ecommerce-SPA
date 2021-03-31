import { Component, Input, OnInit } from '@angular/core';
import { ComentarioProduto } from 'libs/data/src/lib/classes';
import { BlogPost, Comentario } from 'libs/data/src/lib/classes/blogPost';

@Component({
  selector: 'personalizados-lopes-exibir-lista-comentario',
  templateUrl: './exibir-lista-comentario.component.html',
  styleUrls: ['./exibir-lista-comentario.component.scss']
})
export class ExibirListaComentarioComponent implements OnInit {
  @Input()
  Post:BlogPost;
  @Input()
  EhResposta:boolean;
  @Input()
  IndiceResposta:number;
  @Input()
  ComentarioPai:ComentarioProduto;
  constructor() { }

  ngOnInit(): void {
  }

}
