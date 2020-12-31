import { Component, Input, OnInit } from '@angular/core';
import { ComentarioProduto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-exibir-comentario-produto',
  templateUrl: './exibir-comentario-produto.component.html',
  styleUrls: ['./exibir-comentario-produto.component.scss']
})
export class ExibirComentarioProdutoComponent implements OnInit {
  @Input()
  ComentarioProduto:ComentarioProduto;
  constructor() { }

  ngOnInit(): void {
  }
  readonlyRating:boolean = false;

}
