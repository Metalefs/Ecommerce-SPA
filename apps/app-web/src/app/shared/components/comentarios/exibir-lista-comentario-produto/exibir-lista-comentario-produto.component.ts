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
  ComentariosProduto:ComentarioProduto[];
  constructor() { }

  ngOnInit(): void {
  }

}
