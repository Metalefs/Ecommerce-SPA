import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-dimensoes-produto',
  templateUrl: './dimensoes-produto.component.html',
  styleUrls: ['./dimensoes-produto.component.scss']
})
export class DimensoesProdutoComponent implements OnInit {
  @Input() Produto:Produto;
  @Output() onAlturaChange:EventEmitter<any> = new EventEmitter<any>();
  @Output() onLarguraChange:EventEmitter<any> = new EventEmitter<any>();
  @Output() onComprimentoChange:EventEmitter<any> = new EventEmitter<any>();
  @Output() onPesoChange:EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
