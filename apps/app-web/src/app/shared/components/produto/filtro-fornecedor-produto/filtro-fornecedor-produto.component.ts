import { Component, OnInit } from '@angular/core';
import { FornecedorProdutoService } from 'apps/app-web/src/app/data/service';
import { FornecedorProduto } from 'libs/data/src/lib/classes';

import { ProdutoStateService } from 'apps/app-web/src/app/modules/produtos/produto-state.service';
@Component({
  selector: 'personalizados-lopes-filtro-fornecedor-produto',
  templateUrl: './filtro-fornecedor-produto.component.html',
  styleUrls: ['./filtro-fornecedor-produto.component.scss']
})
export class FiltroFornecedorProdutoComponent implements OnInit {

  FornecedoresProdutos:FornecedorProduto[]

  private _FornecedorProduto: any;
  public get FornecedorProduto(): any {
    return this.produtoStateService.activeFornecedor;
  }
  public set FornecedorProduto(value: any) {
    this.produtoStateService.activeFornecedor = value;
  }
  constructor(
    private produtoStateService:ProdutoStateService,
    private fornecedorProdutoService:FornecedorProdutoService) { }

  ngOnInit(): void {
    this.fornecedorProdutoService.Ler().subscribe(fornecedores =>{
      this.FornecedoresProdutos = fornecedores as unknown as FornecedorProduto[];
    })
  }

}
