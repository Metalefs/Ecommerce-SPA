import { Component, Input, OnInit } from '@angular/core';
import { EditarProdutoAbertoOrcamentoLocal } from '../../../../data/store/actions/orcamento.actions';

@Component({
  selector: 'personalizados-lopes-card-produto-btn-comprar',
  templateUrl: './card-produto-btn-comprar.component.html',
  styleUrls: ['./card-produto-btn-comprar.component.scss']
})
export class CardProdutoBtnComprarComponent implements OnInit {

  @Input() AbrirPaginaProduto: () => void;

  constructor() {
  }

  ngOnInit(): void {
  }

}
