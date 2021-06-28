import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fade } from 'apps/app-web/src/app/animations';
import { Produto } from 'libs/data/src/lib/classes';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';

@Component({
  selector: 'personalizados-lopes-botao-comprar-produto',
  templateUrl: './botao-comprar-produto.component.html',
  styleUrls: ['./botao-comprar-produto.component.scss'],
  animations:[fade]
})
export class BotaoComprarProdutoComponent implements OnInit {
  statusProduto=StatusProduto;
  @Input() Produto:Produto;

  @Output() onAdicionarAoOrcamento:EventEmitter<any> = new EventEmitter<any>()
  @Output() onDuplicarOrcamento:EventEmitter<any> = new EventEmitter<any>()

  @Input() isOrcamento:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
