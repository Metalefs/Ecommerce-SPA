import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CorProduto, Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-cor-produto-selector',
  templateUrl: './cor-produto-selector.component.html',
  styleUrls: ['./cor-produto-selector.component.scss']
})
export class CorProdutoSelectorComponent implements OnInit {
  @Input() Produto: Produto;
  @Input() ErroCor: boolean;
  hovercolor:any;
  @Output() onSetColor: EventEmitter<CorProduto> = new EventEmitter<CorProduto>();
  constructor() { }

  ngOnInit(): void {
  }

  setColor(cor:CorProduto){
    this.onSetColor.emit(cor);
  }
}
