import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from '../../../../../../../../libs/data/src/lib/classes';
import { ProdutoStateService } from '../../produto-state.service';

@Component({
  selector: 'personalizados-lopes-exibicao-categorias-ativas',
  templateUrl: './exibicao-categorias-ativas.component.html',
  styleUrls: ['./exibicao-categorias-ativas.component.scss']
})
export class ExibicaoCategoriasAtivasComponent implements OnInit {

  private _CategoriaAtiva: Categoria;
  public get CategoriaAtiva(): Categoria {
    return this.produtoStateService.CategoriaAtiva;
  }
  public set CategoriaAtiva(value: Categoria) {
    this.produtoStateService.CategoriaAtiva = value;
  }

  JoinCategoriasAtivas(){
    return this.produtoStateService.JoinCategoriasAtivas();
  }

  constructor(private produtoStateService:ProdutoStateService) {
  }

  ngOnInit(): void {
  }

}
