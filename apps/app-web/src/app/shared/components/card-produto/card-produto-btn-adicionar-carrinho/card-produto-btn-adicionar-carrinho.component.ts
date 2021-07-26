import { Component, Input, OnInit } from '@angular/core';
import {
  AdicionarProdutoAoOrcamento,
  DuplicarProdutoOrcamento
} from '../../../../data/store/actions/orcamento.actions';
import { Produto } from '../../../../../../../../libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-card-produto-btn-adicionar-carrinho',
  templateUrl: './card-produto-btn-adicionar-carrinho.component.html',
  styleUrls: ['./card-produto-btn-adicionar-carrinho.component.scss']
})
export class CardProdutoBtnAdicionarCarrinhoComponent implements OnInit {

  @Input() AdicionarAoOrcamento: (produto?: Produto) => void;

  constructor() {
  }

  ngOnInit(): void {
  }

}
