import { Component, Input, OnInit } from '@angular/core';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-card-produto-btn-favoritar',
  templateUrl: './card-produto-btn-favoritar.component.html',
  styleUrls: ['./card-produto-btn-favoritar.component.scss']
})
export class CardProdutoBtnFavoritarComponent implements OnInit {
  @Input() AdicionarFavorito: (produto?: Produto) => void;
  @Input() Favorito:boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
