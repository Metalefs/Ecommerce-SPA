import { Component, Input, OnInit } from '@angular/core';
import { Produto, StatusProduto } from 'libs/data/src/lib/classes/produto';

@Component({
  selector: 'personalizados-lopes-status-produto',
  templateUrl: './status-produto.component.html',
  styleUrls: ['./status-produto.component.scss']
})
export class StatusProdutoComponent implements OnInit {
  @Input() Produto:Produto;
  statusProduto:string[] = [];
  constructor() { }

  ngOnInit(): void {
    for (var enumMember in StatusProduto) {
      if (isNaN(parseInt(StatusProduto[enumMember])))
        this.statusProduto.push(StatusProduto[enumMember])
    }
  }

}
