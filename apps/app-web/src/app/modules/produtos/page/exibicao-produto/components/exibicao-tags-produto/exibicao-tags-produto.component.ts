import { Component, Input, OnInit } from '@angular/core';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-exibicao-tags-produto',
  templateUrl: './exibicao-tags-produto.component.html',
  styleUrls: ['./exibicao-tags-produto.component.scss']
})
export class ExibicaoTagsProdutoComponent implements OnInit {
  @Input() Produto:Produto;
  constructor() { }

  ngOnInit(): void {
  }

}
