import { Component, Input, OnInit } from '@angular/core';
import { HoverRatingChangeEvent, RatingChangeEvent } from 'angular-star-rating';
import { Comentario } from 'libs/data/src/lib/classes/blogPost';

@Component({
  selector: 'personalizados-lopes-exibir-comentario',
  templateUrl: './exibir-comentario.component.html',
  styleUrls: ['./exibir-comentario.component.scss']
})
export class ExibirComentarioComponent implements OnInit {
  @Input()
  Comentario:Comentario;
  constructor() { }

  ngOnInit(): void {
  }
  readonlyRating:boolean = false;

}
