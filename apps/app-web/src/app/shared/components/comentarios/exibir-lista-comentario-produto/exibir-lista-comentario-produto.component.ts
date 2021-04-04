import { Component, Input, OnInit } from '@angular/core';
import { ComentarioProduto } from 'libs/data/src/lib/classes';
import { Comentario } from 'libs/data/src/lib/classes/blogPost';

@Component({
  selector: 'personalizados-lopes-exibir-lista-comentario-produto',
  templateUrl: './exibir-lista-comentario-produto.component.html',
  styleUrls: ['./exibir-lista-comentario-produto.component.scss']
})
export class ExibirListaComentarioProdutoComponent implements OnInit {
  @Input()
  Comentarios:ComentarioProduto[] | Comentario[];
  @Input()
  EhResposta:boolean;
  @Input()
  IndiceResposta:number;
  @Input()
  ComentarioPai:ComentarioProduto;
  constructor() { }

  ngOnInit(): void {
  }
  responderResposta(){

  }
  editarResposta(){

  }
  deletarResposta(){

  }
}
