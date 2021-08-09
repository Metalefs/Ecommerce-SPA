import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ProdutoStateService } from '../../../produto-state.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-exibicao-lista-produtos',
  templateUrl: './exibicao-lista-produtos.component.html',
  styleUrls: ['./exibicao-lista-produtos.component.scss']
})
export class ExibicaoListaProdutosComponent implements OnInit {
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

  CarregarMaisProdutos(){
    this.produtoStateService.CarregarMaisProdutos();
  }
}
