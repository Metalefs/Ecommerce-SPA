import { Component, OnInit} from '@angular/core';

import { ProdutoStateService } from 'apps/app-web/src/app/modules/produtos/produto-state.service';
@Component({
  selector: 'personalizados-lopes-nenhum-produto-encontrado',
  templateUrl: './nenhum-produto-encontrado.component.html',
  styleUrls: ['./nenhum-produto-encontrado.component.scss']
})
export class NenhumProdutoEncontradoComponent implements OnInit {

  Produto;

  redefinirBusca(){
    this.produtoStateService.redefinirBusca();
  }

  constructor(private produtoStateService:ProdutoStateService) {
  }

  ngOnInit(): void {
  }

}
