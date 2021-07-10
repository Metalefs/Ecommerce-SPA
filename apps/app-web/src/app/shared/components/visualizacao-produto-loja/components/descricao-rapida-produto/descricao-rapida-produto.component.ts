import { Component, Input, OnInit } from '@angular/core';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-descricao-rapida-produto',
  templateUrl: './descricao-rapida-produto.component.html',
  styleUrls: ['./descricao-rapida-produto.component.scss']
})
export class DescricaoRapidaProdutoComponent implements OnInit {
  @Input() Produto:Produto;
  constructor() { }

  ngOnInit(): void {
  }

}
