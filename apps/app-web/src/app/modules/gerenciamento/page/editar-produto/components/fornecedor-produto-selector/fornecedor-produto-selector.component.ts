import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FornecedorProduto, Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-fornecedor-produto-selector',
  templateUrl: './fornecedor-produto-selector.component.html',
  styleUrls: ['./fornecedor-produto-selector.component.scss']
})
export class FornecedorProdutoSelectorComponent implements OnInit {
  @Input() Produto:Produto = null;
  @Input() FornecedoresProduto:FornecedorProduto[];
  @Output() onSelected:EventEmitter<any> = new EventEmitter<any>();
  @Output() onEditar:EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemover:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
}
