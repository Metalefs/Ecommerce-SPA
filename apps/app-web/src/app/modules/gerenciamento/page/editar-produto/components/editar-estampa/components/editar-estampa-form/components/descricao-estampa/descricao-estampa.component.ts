import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Estampa } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-descricao-estampa',
  templateUrl: './descricao-estampa.component.html',
  styleUrls: ['./descricao-estampa.component.scss']
})
export class DescricaoEstampaComponent implements OnInit {
  @Output() onDescricaoChange:EventEmitter<any> = new EventEmitter<any>();
  @Input() Estampa:Estampa;
  constructor() { }

  ngOnInit(): void {
  }

}
