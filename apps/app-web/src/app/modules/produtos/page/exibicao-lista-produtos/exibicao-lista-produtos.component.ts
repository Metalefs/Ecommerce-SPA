import { Component, Input, OnInit } from '@angular/core';
import { Produto } from '../../../../../../../../libs/data/src/lib/classes';
import { Select } from '@ngxs/store';
import { ProdutoState } from '../../../../data/store/state';
import { Observable } from 'rxjs';
import { ProdutoStateService } from '../../produto-state.service';

@Component({
  selector: 'personalizados-lopes-exibicao-lista-produtos',
  templateUrl: './exibicao-lista-produtos.component.html',
  styleUrls: ['./exibicao-lista-produtos.component.scss']
})
export class ExibicaoListaProdutosComponent implements OnInit {

  @Select(ProdutoState.ObterListaProdutos) Produtos$: Observable<Produto[]>;

  public get Produtos(): Produto[] {
    return this.produtoStateService.Produtos;
  }
  public set Produtos(value: Produto[]) {
    this.produtoStateService.Produtos = value;
  }

  public get Filtro(): any {
    return this.produtoStateService.Filtro$;
  }
  public set Filtro(value: any) {
    this.produtoStateService.Filtro$ = value;
  }

  public get loading(): boolean {
    return this.produtoStateService.loading;
  }
  public set loading(value: boolean) {
    this.produtoStateService.loading = value;
  }

  public get total(): number {
    return this.produtoStateService.total;
  }
  public set total(value: number) {
    this.produtoStateService.total = value;
  }

  public get loading_more() {
    return this.produtoStateService.loading_more;
  }

  public set loading_more(value) {
    this.produtoStateService.loading_more = value;
  }
  @Input()mobileQuery;

  constructor(private produtoStateService:ProdutoStateService) {
  }

  ngOnInit(): void {
  }

  CarregarMaisProdutos(){
    this.produtoStateService.CarregarMaisProdutos();
  }
  atualizarFiltroAtivo(){
    this.produtoStateService.atualizarFiltroAtivo();
  }
  filtroAtivo(produto){
    return this.produtoStateService.filtroAtivo(produto);
  }
}
