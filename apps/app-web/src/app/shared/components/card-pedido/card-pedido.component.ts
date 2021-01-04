import { Component, Input, OnInit } from '@angular/core';
import { Orcamento } from 'libs/data/src/lib/classes';
import { CodProduto } from 'libs/data/src/lib/classes/orcamento';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';

@Component({
  selector: 'personalizados-lopes-card-pedido',
  templateUrl: './card-pedido.component.html',
  styleUrls: ['./card-pedido.component.scss']
})
export class CardPedidoComponent implements OnInit {
  @Input() CodProduto:CodProduto;
  statusProduto = StatusProduto
  constructor() { }

  ngOnInit(): void {
  }

}
