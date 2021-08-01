import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { ProdutoStateService } from '../../produto-state.service';

@Component({
  selector: 'personalizados-lopes-selecao-faixa-preco-produto',
  templateUrl: './selecao-faixa-preco-produto.component.html',
  styleUrls: ['./selecao-faixa-preco-produto.component.scss']
})
export class SelecaoFaixaPrecoProdutoComponent implements OnInit {

  atualizarFiltroAtivo: (atualizarPreco?: boolean) => void;

  private _value: number;
  public get value(): number {
    return this.produtoStateService.value;
  }
  public set value(value: number) {
    this.produtoStateService.value = value;
  }

  private _maxValue: number;
  public get maxValue(): number {
    return this.produtoStateService.maxValue;
  }
  public set maxValue(value: number) {
    this.produtoStateService.maxValue = value;
  }

  private _options: Options;
  public get options(): Options {
    return this.produtoStateService.options;
  }
  public set options(value: Options) {
    this.produtoStateService.options = value;
  }

  constructor(private produtoStateService:ProdutoStateService) {
  }

  ngOnInit(): void {
  }

}
