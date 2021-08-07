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
  selected;

  constructor() { }

  ngOnInit(): void {
    if(this.Produto){
      this.selected = this.Produto.Cor ?? this.Cores[0] ?? null;
    }
    else{
      this.selected = this.Cores[0] ?? null;
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    if(o1 &&o2)
    return o1._id === o2._id
  }
}
