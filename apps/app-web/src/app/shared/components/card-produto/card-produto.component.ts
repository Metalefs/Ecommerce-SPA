import { Component, Input, OnInit } from '@angular/core';
import { entities } from '@personalizados-lopes/data';

@Component({
  selector: 'personalizados-lopes-card-produto',
  templateUrl: './card-produto.component.html',
  styleUrls: ['./card-produto.component.scss']
})
export class CardProdutoComponent implements OnInit {

  constructor() { }
  @Input() Produto:entities.Produto;
  @Input() MostarOpcoes: boolean = true;
  ngOnInit(): void {
  }

}
