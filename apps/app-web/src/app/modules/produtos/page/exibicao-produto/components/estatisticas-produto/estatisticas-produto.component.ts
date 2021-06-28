import { Component, Input, OnInit } from '@angular/core';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-estatisticas-produto',
  templateUrl: './estatisticas-produto.component.html',
  styleUrls: ['./estatisticas-produto.component.scss']
})
export class EstatisticasProdutoComponent implements OnInit {
  @Input() Produto:Produto;
  constructor() { }

  ngOnInit(): void {
  }

}
