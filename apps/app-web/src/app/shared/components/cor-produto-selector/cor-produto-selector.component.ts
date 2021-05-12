import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Produto } from 'libs/data/src/lib/classes';
import { Cor } from 'libs/data/src/lib/classes/produto';

@Component({
  selector: 'personalizados-lopes-cor-produto-selector',
  templateUrl: './cor-produto-selector.component.html',
  styleUrls: ['./cor-produto-selector.component.scss']
})
export class CorProdutoSelectorComponent implements OnInit {
  @Input() Produto: Produto;
  @Input() ErroCor: boolean;
  @Output() onSetColor: EventEmitter<Cor> = new EventEmitter<Cor>();
  constructor() { }

  ngOnInit(): void {
  }

  setColor(cor:Cor){
    this.onSetColor.emit(cor);
  }
}
