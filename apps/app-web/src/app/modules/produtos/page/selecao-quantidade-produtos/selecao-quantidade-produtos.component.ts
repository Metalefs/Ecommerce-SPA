import { Component, OnInit } from '@angular/core';
import { OrderType } from '../../../../shared/models/interfaces';
import { ProdutoStateService } from '../../produto-state.service';

@Component({
  selector: 'personalizados-lopes-selecao-quantidade-produtos',
  templateUrl: './selecao-quantidade-produtos.component.html',
  styleUrls: ['./selecao-quantidade-produtos.component.scss']
})
export class SelecaoQuantidadeProdutosComponent implements OnInit {

  atualizarFiltroAtivo(atualizarPreco?: boolean){
    this.produtoStateService.atualizarFiltroAtivo(atualizarPreco);
  }
  private _activeOrderLimit: number;
  public get activeOrderLimit(): number {
    return this.produtoStateService.activeOrderLimit;
  }
  public set activeOrderLimit(value: number) {
    this.produtoStateService.activeOrderLimit = value;
  }

  private _orderLimit: OrderType[];
  public get orderLimit(): OrderType[] {
    return this.produtoStateService.orderLimit;
  }
  public set orderLimit(value: OrderType[]) {
    this.produtoStateService.orderLimit = value;
  }

  constructor(private produtoStateService:ProdutoStateService) {
  }

  ngOnInit(): void {
  }

}
