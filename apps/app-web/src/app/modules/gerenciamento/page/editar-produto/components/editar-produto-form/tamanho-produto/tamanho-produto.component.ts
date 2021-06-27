import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-tamanho-produto',
  templateUrl: './tamanho-produto.component.html',
  styleUrls: ['./tamanho-produto.component.scss']
})
export class TamanhoProdutoComponent implements OnInit {
  @Input() Produto:Produto;
  @Input() sizeCtrl:FormControl;

  @Output() onAddTamanho: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemoveTamanho: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelectedTamanho: EventEmitter<any> = new EventEmitter<any>();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor() { }

  ngOnInit(): void {
  }

  addTamanho($event){
    this.onAddTamanho.emit($event);
  }

  selectedTamanho($event){
    this.onSelectedTamanho.emit($event);
  }

  removeTamanho(tamanho){
    this.onRemoveTamanho.emit(tamanho);
  }
}
