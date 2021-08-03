import { Component, Input, OnInit } from '@angular/core';

import { ProdutoStateService } from 'apps/app-web/src/app/modules/produtos/produto-state.service';
@Component({
  selector: 'personalizados-lopes-filtro-categoria-mobile',
  templateUrl: './filtro-categoria-mobile.component.html',
  styleUrls: ['./filtro-categoria-mobile.component.scss']
})
export class FiltroCategoriaMobileComponent implements OnInit {

  AbrirDialogoCategorias(){
    this.produtoStateService.AbrirDialogoCategorias();
  }

  JoinCategoriasAtivas():string {
    return this.produtoStateService.JoinCategoriasAtivas();
  }

  AbrirDialogoOrdenacao():void {
    this.produtoStateService.AbrirDialogoOrdenacao();
  }

  translate(orderId: number):string {
    return this.produtoStateService.translate(orderId);
  }

  private _activeOrderFilter: number;
  public get activeOrderFilter(): number {
    return this.produtoStateService.activeOrderFilter;
  }
  public set activeOrderFilter(value: number) {
    this.produtoStateService.activeOrderFilter = value;
  }

  constructor(private produtoStateService:ProdutoStateService) {
  }

  ngOnInit(): void {
  }

}
