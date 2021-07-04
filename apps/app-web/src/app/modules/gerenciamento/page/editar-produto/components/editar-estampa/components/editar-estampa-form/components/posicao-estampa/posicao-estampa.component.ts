import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'personalizados-lopes-posicao-estampa',
  templateUrl: './posicao-estampa.component.html',
  styleUrls: ['./posicao-estampa.component.scss']
})
export class PosicaoEstampaComponent implements OnInit {
  @Output() onPosicaoChange:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
