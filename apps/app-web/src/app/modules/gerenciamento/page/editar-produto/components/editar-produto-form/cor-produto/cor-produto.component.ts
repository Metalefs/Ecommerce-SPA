import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Produto } from 'libs/data/src/lib/classes';
import { Cor } from 'libs/data/src/lib/classes/produto';
import { Observable } from 'rxjs';

@Component({
  selector: 'personalizados-lopes-cor-produto',
  templateUrl: './cor-produto.component.html',
  styleUrls: ['./cor-produto.component.scss']
})
export class CorProdutoComponent implements OnInit {
  filteredColors: Observable<Cor[]>;
  @Input() Produto:Produto;
  @Input() colorCtrl:FormControl;

  @Output() onAddCor: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelectedCor: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemoveCor: EventEmitter<any> = new EventEmitter<any>();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor() { }

  ngOnInit(): void {
  }

  addCor($event){
    this.onAddCor.emit($event);
  }

  selectedCor($event){
    this.onSelectedCor.emit($event);
  }

  removeCor(cor){
    this.onRemoveCor.emit(cor);
  }
}
