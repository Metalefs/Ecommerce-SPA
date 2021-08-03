import { Component, OnInit } from '@angular/core';
import { OrderStatus } from '../../../../shared/models/interfaces';

import { ProdutoStateService } from 'apps/app-web/src/app/modules/produtos/produto-state.service';

@Component({
  selector: 'personalizados-lopes-selecao-status-produto',
  templateUrl: './selecao-status-produto.component.html',
  styleUrls: ['./selecao-status-produto.component.scss']
})
export class SelecaoStatusProdutoComponent implements OnInit {

  atualizarFiltroAtivo(atualizarPreco?: boolean){
    this.produtoStateService.atualizarFiltroAtivo(atualizarPreco);
  }
  private _activeOrderStatus: OrderStatus;
  public get activeOrderStatus(): OrderStatus {
    return this.produtoStateService.activeOrderStatus;
  }
  public set activeOrderStatus(value: OrderStatus) {
    this.produtoStateService.activeOrderStatus = value;
  }

  private _orderStatus: OrderStatus[];
  public get orderStatus(): OrderStatus[] {
    return this.produtoStateService.orderStatus;
  }
  public set orderStatus(value: OrderStatus[]) {
    this.produtoStateService.orderStatus = value;
  }

  constructor(private produtoStateService:ProdutoStateService) {
  }

  ngOnInit(): void {
  }

}
