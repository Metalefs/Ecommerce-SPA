import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Estampa } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-posicao-estampa',
  templateUrl: './posicao-estampa.component.html',
  styleUrls: ['./posicao-estampa.component.scss']
})
export class PosicaoEstampaComponent implements OnInit {
  @Input() Estampa:Estampa;
  @Output() onPosicaoChange:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
