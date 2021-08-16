import { Component, Input, OnInit } from '@angular/core';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-selecao-tamanho-produto-edicao',
  templateUrl: './selecao-tamanho-produto-edicao.component.html',
  styleUrls: ['./selecao-tamanho-produto-edicao.component.scss']
})
export class SelecaoTamanhoProdutoEdicaoComponent implements OnInit {
  @Input() Produto:Produto;
  constructor() { }

  ngOnInit(): void {
  }

  SetTamanho(element, tamanho){
    element.Produto.Tamanho = element.Produto.Tamanho ? null : tamanho;
  }
  SetFaixaTamanho(element, faixa){
    if(element.Produto.FaixaTamanho)
    element.Produto.FaixaTamanho = null;
    else{
      element.Produto.FaixaTamanho = faixa;
    }
  }
}
