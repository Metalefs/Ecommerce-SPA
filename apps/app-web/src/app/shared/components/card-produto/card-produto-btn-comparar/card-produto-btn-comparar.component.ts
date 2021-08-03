import { Component, Input, OnInit } from '@angular/core';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-card-produto-btn-comparar',
  templateUrl: './card-produto-btn-comparar.component.html',
  styleUrls: ['./card-produto-btn-comparar.component.scss']
})
export class CardProdutoBtnCompararComponent implements OnInit {
  @Input() AdicionarComparacao: (produto?: Produto) => void;

  constructor() { }

  ngOnInit(): void {
  }
}
