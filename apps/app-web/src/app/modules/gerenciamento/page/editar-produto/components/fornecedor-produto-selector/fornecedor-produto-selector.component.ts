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

  selected;
  constructor() { }

  ngOnInit(): void {
    if(this.Produto){
      this.selected = this.Produto.Marca ?? this.FornecedoresProduto[0] ?? null;
    }
    else
    this.selected = this.FornecedoresProduto[0] ?? null;

  }
  compareObjects(o1: any, o2: any): boolean {
    return o1._id === o2._id
  }
}
