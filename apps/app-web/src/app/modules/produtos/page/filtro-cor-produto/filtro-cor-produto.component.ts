import { Component, Input, OnInit } from '@angular/core';
import { CorProdutoService } from 'apps/app-web/src/app/data/service';
import { CorProduto } from '../../../../../../../../libs/data/src/lib/classes';
import { ProdutoStateService } from '../../produto-state.service';

@Component({
  selector: 'personalizados-lopes-filtro-cor-produto',
  templateUrl: './filtro-cor-produto.component.html',
  styleUrls: ['./filtro-cor-produto.component.scss']
})
export class FiltroCorProdutoComponent implements OnInit {
  CoresProdutos: CorProduto[] = [];

  private _CorProduto: CorProduto;
  public get CorProduto(): CorProduto {
    return this.produtoStateService.activeCorProduto;
  }
  public set CorProduto(value: CorProduto) {
    this.produtoStateService.activeCorProduto = value;
  }

  constructor(
    private produtoStateService: ProdutoStateService,
    private corProdutoService: CorProdutoService) {
  }

  ngOnInit(): void {

    this.ListarCoresProdutos();
  }

  ListarCoresProdutos(){
    this.corProdutoService.Ler().subscribe(cores=>{
      this.CoresProdutos = cores as unknown as CorProduto[];
    })
  }
}
