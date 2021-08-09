import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Produto } from '../../../../../../../../../../libs/data/src/lib/classes';
import { ProdutoStateService } from 'apps/app-web/src/app/modules/produtos/produto-state.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Select } from '@ngxs/store';
import { ProdutoState } from 'apps/app-web/src/app/data/store/state';
import { Observable } from 'rxjs';

@Component({
  selector: 'personalizados-lopes-dataview-produtos',
  templateUrl: './dataview-produtos.component.html',
  styleUrls: ['./dataview-produtos.component.scss']
})
export class DataviewProdutosComponent implements OnInit {

  @Select(ProdutoState.ObterListaProdutos) Produtos$: Observable<Produto[]>;

  @Input() Produtos:Produto[];

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

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(
    private produtoStateService:ProdutoStateService,
    media: MediaMatcher,
    private cdr: ChangeDetectorRef) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => cdr.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  atualizarFiltroAtivo(){
    this.produtoStateService.atualizarFiltroAtivo();
  }
  filtroAtivo(produto){
    return this.produtoStateService.filtroAtivo(produto);
  }
}
