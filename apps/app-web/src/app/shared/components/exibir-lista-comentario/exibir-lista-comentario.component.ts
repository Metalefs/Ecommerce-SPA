import { Component, Input, OnInit } from '@angular/core';
import { ComentarioProduto } from 'libs/data/src/lib/classes';
import { Comentario } from 'libs/data/src/lib/classes/blogPost';

@Component({
  selector: 'personalizados-lopes-exibir-lista-comentario',
  templateUrl: './exibir-lista-comentario.component.html',
  styleUrls: ['./exibir-lista-comentario.component.scss']
})
export class ExibirListaComentarioComponent implements OnInit {
  @Input()
  Comentarios:Comentario[];
  ComentariosProduto:ComentarioProduto[];
  constructor() { }

  ngOnInit(): void {
  }

}
