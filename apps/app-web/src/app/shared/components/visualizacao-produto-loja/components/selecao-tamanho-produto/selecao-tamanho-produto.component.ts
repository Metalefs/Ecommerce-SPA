import { Component, Input, OnInit } from '@angular/core';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-selecao-tamanho-produto',
  templateUrl: './selecao-tamanho-produto.component.html',
  styleUrls: ['./selecao-tamanho-produto.component.scss']
})
export class SelecaoTamanhoProdutoComponent implements OnInit {
  @Input() Produto:Produto;
  @Input() ErroTamanho : Function;
  @Input() Erros: any;
  constructor() { }

  ngOnInit(): void {
  }
  SetTamanho(tamanho){
    if(this.Produto.Tamanho)
      this.Produto.Tamanho = null;
    else{
      this.Produto.Tamanho = tamanho;
    }
  }
}
