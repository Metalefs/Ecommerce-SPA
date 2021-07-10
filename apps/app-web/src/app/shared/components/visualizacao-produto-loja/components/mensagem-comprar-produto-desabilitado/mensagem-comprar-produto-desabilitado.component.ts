import { Component, Input, OnInit } from '@angular/core';
import { fade } from 'apps/app-web/src/app/animations';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-mensagem-comprar-produto-desabilitado',
  templateUrl: './mensagem-comprar-produto-desabilitado.component.html',
  styleUrls: ['./mensagem-comprar-produto-desabilitado.component.scss'],
  animations:[fade]
})
export class MensagemComprarProdutoDesabilitadoComponent implements OnInit {
  @Input() Produto:Produto;
  constructor() { }

  ngOnInit(): void {
  }

}
