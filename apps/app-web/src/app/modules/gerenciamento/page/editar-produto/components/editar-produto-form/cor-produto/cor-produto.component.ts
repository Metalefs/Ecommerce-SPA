import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Produto } from 'libs/data/src/lib/classes';
import { CorProduto } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';

@Component({
  selector: 'personalizados-lopes-cor-produto',
  templateUrl: './cor-produto.component.html',
  styleUrls: ['./cor-produto.component.scss']
})
export class CorProdutoComponent implements OnInit {
  filteredColors: Observable<CorProduto[]>;
  @Input() Produto:Produto;
  @Input() colorCtrl:FormControl;

  @Output() onAddCor: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelectedCor: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemoveCor: EventEmitter<any> = new EventEmitter<any>();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  selected;

  constructor() { }

  ngOnInit(): void {
    // if(this.Produto){
    //   this.selected = this.Produto.Tamanho ?? this.TamanhosProduto[0] ?? null;
    // }
    // else{
    //   this.selected = this.TamanhosProduto[0] ?? null;
    // }
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
