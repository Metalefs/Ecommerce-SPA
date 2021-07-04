import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Estampa } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-nome-estampa',
  templateUrl: './nome-estampa.component.html',
  styleUrls: ['./nome-estampa.component.scss']
})
export class NomeEstampaComponent implements OnInit {
  @Input() Estampa:Estampa;
  @Output() onNomeChange:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
