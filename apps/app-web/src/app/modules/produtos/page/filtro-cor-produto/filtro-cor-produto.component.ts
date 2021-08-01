import { Component, Input, OnInit } from '@angular/core';
import { CorProdutoService } from 'apps/app-web/src/app/data/service';
import { CorProduto } from '../../../../../../../../libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-filtro-cor-produto',
  templateUrl: './filtro-cor-produto.component.html',
  styleUrls: ['./filtro-cor-produto.component.scss']
})
export class FiltroCorProdutoComponent implements OnInit {
  CoresProdutos: CorProduto[] = [];

  constructor(
    private corProdutoService: CorProdutoService) {
  }

  ngOnInit(): void {

    this.ListarCoresProdutos();
  }

  ListarCoresProdutos(){
    this.corProdutoService.Ler().subscribe(cores=>{
      this.CoresProdutos = cores as unknown as CorProduto[];
    })
  }
}
