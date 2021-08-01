import { Component, Input, OnInit } from '@angular/core';
import { ProdutoStateService } from '../../produto-state.service';

@Component({
  selector: 'personalizados-lopes-exibicao-quantidade-produtos-filtrados',
  templateUrl: './exibicao-quantidade-produtos-filtrados.component.html',
  styleUrls: ['./exibicao-quantidade-produtos-filtrados.component.scss']
})
export class ExibicaoQuantidadeProdutosFiltradosComponent implements OnInit {

  private _total: number;
  public get total(): number {
    return this.produtoStateService.total;
  }
  public set total(value: number) {
    this.produtoStateService.total = value;
  }

  private _Filtro$: any;
  public get Filtro$(): any {
    return this.produtoStateService.Filtro$;
  }
  public set Filtro$(value: any) {
    this.produtoStateService.Filtro$ = value;
  }

  constructor(private produtoStateService:ProdutoStateService) {
  }

  ngOnInit(): void {
  }

}
