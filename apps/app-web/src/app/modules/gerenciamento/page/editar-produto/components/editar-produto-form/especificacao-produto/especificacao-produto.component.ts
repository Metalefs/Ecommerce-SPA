import { Component, Input, OnInit } from '@angular/core';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-especificacao-produto',
  templateUrl: './especificacao-produto.component.html',
  styleUrls: ['./especificacao-produto.component.scss']
})
export class EspecificacaoProdutoComponent implements OnInit {
  @Input() Produto:Produto;

  constructor() { }

  ngOnInit(): void {
  }

}
