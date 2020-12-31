import { Component, Input, OnInit } from '@angular/core';
import { HoverRatingChangeEvent, RatingChangeEvent } from 'angular-star-rating';
import { ComentarioProduto } from 'libs/data/src/lib/classes';
import { Comentario } from 'libs/data/src/lib/classes/blogPost';

@Component({
  selector: 'personalizados-lopes-exibir-comentario',
  templateUrl: './exibir-comentario.component.html',
  styleUrls: ['./exibir-comentario.component.scss']
})
export class ExibirComentarioComponent implements OnInit {
  @Input()
  Comentario:Comentario;
  @Input()
  ComentarioProduto:ComentarioProduto;
  constructor() { }

  ngOnInit(): void {
  }
  readonlyRating:boolean = false;

}
