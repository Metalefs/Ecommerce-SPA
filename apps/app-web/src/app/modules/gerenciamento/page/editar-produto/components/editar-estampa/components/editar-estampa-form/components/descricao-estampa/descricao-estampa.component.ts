import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'personalizados-lopes-descricao-estampa',
  templateUrl: './descricao-estampa.component.html',
  styleUrls: ['./descricao-estampa.component.scss']
})
export class DescricaoEstampaComponent implements OnInit {
  @Output() onDescricaoChange:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
