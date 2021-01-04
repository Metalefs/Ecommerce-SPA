import { Component, OnInit } from '@angular/core';
import { Orcamento } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-detalhes-pedido',
  templateUrl: './detalhes-pedido.component.html',
  styleUrls: ['./detalhes-pedido.component.scss']
})
export class DetalhesPedidoComponent implements OnInit {
  Pedido:Orcamento;
  constructor() { }

  ngOnInit(): void {
  }

}
