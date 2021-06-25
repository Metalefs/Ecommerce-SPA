import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Produto, Categoria } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-categoria-produto',
  templateUrl: './categoria-produto.component.html',
  styleUrls: ['./categoria-produto.component.scss']
})
export class CategoriaProdutoComponent implements OnInit {
  @Input() Produto:Produto;
  @Input() Categorias:Categoria[];

  @Output() onSelecionarCategoria:EventEmitter<any> = new EventEmitter<any>();
  @Output() onCriarCategoria:EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  SelecionarCategoria(categoria){
    this.onSelecionarCategoria.emit(categoria);
  }
  CriarCategoria(){
    this.onCriarCategoria.emit();
  }
}
