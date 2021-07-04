import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'personalizados-lopes-preco-estampa',
  templateUrl: './preco-estampa.component.html',
  styleUrls: ['./preco-estampa.component.scss']
})
export class PrecoEstampaComponent implements OnInit {
  @Output() onPrecoChange:EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  changePreco(evt){
    this.onPrecoChange.emit(evt);
  }
}
