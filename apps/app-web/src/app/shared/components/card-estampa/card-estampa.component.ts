import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Estampa } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-card-estampa',
  templateUrl: './card-estampa.component.html',
  styleUrls: ['./card-estampa.component.scss']
})
export class CardEstampaComponent implements OnInit {
  @Input()Estampa:Estampa;
  @Input()is_edicao:boolean = false;

  @Output()onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output()onEditar: EventEmitter<any> = new EventEmitter<any>();
  @Output()onRemover: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
