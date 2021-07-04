import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Estampa } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-preco-estampa',
  templateUrl: './preco-estampa.component.html',
  styleUrls: ['./preco-estampa.component.scss']
})
export class PrecoEstampaComponent implements OnInit {
  @Input() Estampa:Estampa;
  @Output() onPrecoChange:EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  changePreco(evt){
    this.onPrecoChange.emit(evt);
  }
}
