import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderType } from '../../../../shared/models/interfaces';

import { ProdutoStateService } from 'apps/app-web/src/app/modules/produtos/produto-state.service';

@Component({
  selector: 'personalizados-lopes-selecao-ordenacao-produto',
  templateUrl: './selecao-ordenacao-produto.component.html',
  styleUrls: ['./selecao-ordenacao-produto.component.scss']
})
export class SelecaoOrdenacaoProdutoComponent implements OnInit {

  atualizarFiltroAtivo(atualizarPreco?: boolean){
    this.produtoStateService.atualizarFiltroAtivo(atualizarPreco);
  }

  private _activeOrderFilter: number;
  public get activeOrderFilter(): number {
    return this.produtoStateService.activeOrderFilter;
  }
  public set activeOrderFilter(value: number) {
    this.produtoStateService.activeOrderFilter = value;
  }

  private _ordertypes: OrderType[];
  public get ordertypes(): OrderType[] {
    return this.produtoStateService.ordertypes;
  }
  public set ordertypes(value: OrderType[]) {
    this.produtoStateService.ordertypes = value;
  }

  constructor(private produtoStateService:ProdutoStateService) {
  }

  ngOnInit(): void {
  }

}
