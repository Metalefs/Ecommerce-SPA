import { Component, OnInit } from '@angular/core';
import { ProdutoStateService } from 'apps/app-web/src/app/modules/produtos/produto-state.service';
@Component({
  selector: 'personalizados-lopes-checkbox-cores-produto',
  templateUrl: './checkbox-cores-produto.component.html',
  styleUrls: ['./checkbox-cores-produto.component.scss']
})
export class CheckboxCoresProdutoComponent implements OnInit {

  atualizarFiltroAtivo: (atualizarPreco?: boolean) => void;
  private _MultiplasCores: boolean;
  public get MultiplasCores(): boolean {
    return this.produtoStateService.MultiplasCores;
  }
  public set MultiplasCores(value: boolean) {
    this.produtoStateService.MultiplasCores = value;
  }

  constructor(private produtoStateService:ProdutoStateService) {
    this.atualizarFiltroAtivo = produtoStateService.atualizarFiltroAtivo;
    this.atualizarFiltroAtivo.bind(produtoStateService);
  }

  ngOnInit(): void {
  }

}
