import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-selecao-quantidade-produto',
  templateUrl: './selecao-quantidade-produto.component.html',
  styleUrls: ['./selecao-quantidade-produto.component.scss']
})
export class SelecaoQuantidadeProdutoComponent implements OnInit {
  @Input() Produto:Produto;
  @Input() ErroQuantidade : Function;
  @Input() Erros: any;
  @Output() onQuantidadeChange:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {

  }

  IncrementarQuantidade(){
    if(this.Produto.Quantidade >= this.Produto.QuantidadeMinima)
    this.Produto.Quantidade++;
    this.onQuantidadeChange.emit(this.Produto.Quantidade);
  }
  DecrescerQuantidade(){
    if(this.Produto.Quantidade - 1 >= this.Produto.QuantidadeMinima)
    this.Produto.Quantidade--;
    this.onQuantidadeChange.emit(this.Produto.Quantidade);
  }
  VerificarQuantidade($event){
    if($event.target.value < this.Produto.QuantidadeMinima)
      this.Produto.Quantidade = this.Produto.QuantidadeMinima;
  }
}
