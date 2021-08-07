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

  constructor() { }

  ngOnInit(): void {

    console.log(this.TamanhosProduto)
  }

  getTamanhos() :any{
    if(this.Produto?._id)
      return this.Produto?.Tamanhos || this.TamanhosProduto;
    else
      return this.TamanhosProduto;
  }


}
