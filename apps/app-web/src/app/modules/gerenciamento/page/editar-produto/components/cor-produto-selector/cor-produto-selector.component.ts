import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CorProduto, Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-cor-produto-checkbox-selector',
  templateUrl: './cor-produto-selector.component.html',
  styleUrls: ['./cor-produto-selector.component.scss']
})
export class CorProdutoCheckboxSelectorComponent implements OnInit {
  @Input() Produto:Produto = null;
  @Input() Cores:CorProduto[];
  @Input() editable:boolean;
  @Input() Multiple:boolean;
  @Output() onSelected:EventEmitter<any> = new EventEmitter<any>();
  @Output() onEditar:EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemover:EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
