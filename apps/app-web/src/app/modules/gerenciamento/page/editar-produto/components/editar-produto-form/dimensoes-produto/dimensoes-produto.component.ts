import { Component, Input, OnInit } from '@angular/core';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-dimensoes-produto',
  templateUrl: './dimensoes-produto.component.html',
  styleUrls: ['./dimensoes-produto.component.scss']
})
export class DimensoesProdutoComponent implements OnInit {
  @Input() Produto:Produto;
  constructor() { }

  ngOnInit(): void {
  }

}
