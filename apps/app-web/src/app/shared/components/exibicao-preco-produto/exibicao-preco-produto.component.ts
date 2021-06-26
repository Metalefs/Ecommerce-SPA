import { Component, OnInit, Input } from '@angular/core';
import { Produto } from 'libs/data/src/lib/classes';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';

@Component({
  selector: 'personalizados-lopes-exibicao-preco-produto',
  templateUrl: './exibicao-preco-produto.component.html',
  styleUrls: ['./exibicao-preco-produto.component.scss']
})
export class ExibicaoPrecoProdutoComponent implements OnInit {
  @Input() Produto:Produto;
  enumStatusProduto = StatusProduto
  constructor() { }

  ngOnInit(): void {
  }

}
