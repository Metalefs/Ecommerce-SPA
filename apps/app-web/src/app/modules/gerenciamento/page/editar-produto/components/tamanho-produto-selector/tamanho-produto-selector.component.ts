import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Produto, TamanhoProduto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-tamanho-produto-selector',
  templateUrl: './tamanho-produto-selector.component.html',
  styleUrls: ['./tamanho-produto-selector.component.scss']
})
export class TamanhoProdutoSelectorComponent implements OnInit {
  @Input() Produto:Produto;
  @Input() TamanhosProduto:TamanhoProduto[];
  @Input() editable:boolean;
  @Input() Multiple:boolean;
  @Output() onSelected:EventEmitter<any> = new EventEmitter<any>();
  @Output() onEditar:EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemover:EventEmitter<any> = new EventEmitter<any>();
  selected;

  constructor() { }

  ngOnInit(): void {
    if(this.Produto){
      this.selected = this.Produto.Tamanho ?? this.TamanhosProduto[0] ?? null;
    }
    else{
      this.selected = this.TamanhosProduto[0] ?? null;
    }
  }

  getTamanhos() :any{
    return this.TamanhosProduto;
  }

  compareObjects(o1: any, o2: any): boolean {
    if(o1&&o2)
    return o1._id === o2._id
  }

}
