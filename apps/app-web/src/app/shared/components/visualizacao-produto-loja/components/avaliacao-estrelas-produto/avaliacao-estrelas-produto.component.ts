import { Component, Input, OnInit } from '@angular/core';
import { sum } from 'apps/app-web/src/app/helper/ObjHelper';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-avaliacao-estrelas-produto',
  templateUrl: './avaliacao-estrelas-produto.component.html',
  styleUrls: ['./avaliacao-estrelas-produto.component.scss']
})
export class AvaliacaoEstrelasProdutoComponent implements OnInit {
  @Input() Produto:Produto;
  constructor() { }

  ngOnInit(): void {
  }
  meanRating(){
    if (!this.Produto.Rating)
    return 0;
    return (sum(this.Produto?.Rating||0) / this.Produto.Rating?.length||0).toFixed(1)
  }
}
