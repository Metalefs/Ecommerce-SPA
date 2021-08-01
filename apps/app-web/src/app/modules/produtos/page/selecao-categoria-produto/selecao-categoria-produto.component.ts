import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from '../../../../../../../../libs/data/src/lib/classes';
import { ProdutoStateService } from '../../produto-state.service';

@Component({
  selector: 'personalizados-lopes-selecao-categoria-produto',
  templateUrl: './selecao-categoria-produto.component.html',
  styleUrls: ['./selecao-categoria-produto.component.scss']
})
export class SelecaoCategoriaProdutoComponent implements OnInit {


  private _CategoriaAtiva: Categoria;

  SetCategoria(categoria:Categoria) {this.produtoStateService.SetCategoria(categoria)};

  atualizarFiltroAtivo(atualizarPreco?: boolean){
    this.produtoStateService.atualizarFiltroAtivo(atualizarPreco);
  }
  IsCategoriaAtiva(categoria:Categoria) {
    return this.produtoStateService.IsCategoriaAtiva(categoria);
  }

  public get CategoriaAtiva(): Categoria {
    return this.produtoStateService.CategoriaAtiva;
  }
  public set CategoriaAtiva(value: Categoria) {
    this.produtoStateService.CategoriaAtiva = value;
  }

  public get defaultCategory() :any{
    return this.produtoStateService.defaultCategory;
  }

  private _Categorias: any;
  public get Categorias(): any {
    return this.produtoStateService.Categorias$;
  }
  public set Categorias(value: any) {

  }

  constructor(private produtoStateService: ProdutoStateService) {
    this.CategoriaAtiva = produtoStateService.CategoriaAtiva;

  }

  ngOnInit(): void {
  }

}
