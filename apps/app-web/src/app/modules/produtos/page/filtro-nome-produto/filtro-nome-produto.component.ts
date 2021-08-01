import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../../../../../../libs/data/src/lib/classes';
import { ProdutoStateService } from '../../produto-state.service';

@Component({
  selector: 'personalizados-lopes-filtro-nome-produto',
  templateUrl: './filtro-nome-produto.component.html',
  styleUrls: ['./filtro-nome-produto.component.scss']
})
export class FiltroNomeProdutoComponent implements OnInit {

  atualizarFiltroAtivo(atualizarPreco?: boolean){
    this.produtoStateService.atualizarFiltroAtivo(atualizarPreco);
  }

  private _activeSearchFilter: string;
  public get activeSearchFilter(): string {
    return this.produtoStateService.activeSearchFilter;
  }
  public set activeSearchFilter(value: string) {
    this.produtoStateService.activeSearchFilter = value;
  }

  private _CategoriaAtiva: Categoria;
  public get CategoriaAtiva(): Categoria {
    return this.produtoStateService.CategoriaAtiva;
  }
  public set CategoriaAtiva(value: Categoria) {
    this.produtoStateService.CategoriaAtiva = value;
  }

  constructor(private produtoStateService:ProdutoStateService) {
  }

  ngOnInit(): void {
  }

}
