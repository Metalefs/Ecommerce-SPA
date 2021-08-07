import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-quantidade-produto',
  templateUrl: './quantidade-produto.component.html',
  styleUrls: ['./quantidade-produto.component.scss']
})
export class QuantidadeProdutoComponent implements OnInit {
  @Input() Produto:Produto
  @Output() onDecrescerQuantidade:EventEmitter<any> = new EventEmitter<any>();
  @Output() onIncrementarQuantidade:EventEmitter<any> = new EventEmitter<any>();
  @Output() onVerificarQuantidade:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  VerificarQuantidade(event){
    this.onVerificarQuantidade.emit(event);
  }
  DecrescerQuantidade(){
    this.onDecrescerQuantidade.emit();
  }
  IncrementarQuantidade(){
    this.onIncrementarQuantidade.emit();
  }
}
