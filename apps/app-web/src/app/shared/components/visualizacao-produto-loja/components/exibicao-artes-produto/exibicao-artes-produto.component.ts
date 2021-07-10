import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fade } from 'apps/app-web/src/app/animations';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-exibicao-artes-produto',
  templateUrl: './exibicao-artes-produto.component.html',
  styleUrls: ['./exibicao-artes-produto.component.scss'],
  animations:[fade]
})
export class ExibicaoArtesProdutoComponent implements OnInit {
  @Input() Produto:Produto;
  @Output() onAbrirModalArte:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
