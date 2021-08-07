import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-descricao-produto',
  templateUrl: './descricao-produto.component.html',
  styleUrls: ['./descricao-produto.component.scss']
})
export class DescricaoProdutoComponent implements OnInit {
  @Input() Produto:Produto;
  @Output() onChange:EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
