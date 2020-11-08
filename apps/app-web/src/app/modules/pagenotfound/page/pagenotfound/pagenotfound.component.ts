import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { ProdutoState } from 'apps/app-web/src/app/data/store/state';
import { Produto } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';

@Component({
  selector: 'personalizados-lopes-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss']
})
export class PagenotfoundComponent implements OnInit {
  @Select(ProdutoState.ObterListaProdutos) Produtos$: Observable<Produto[]>;
  constructor() { }

  ngOnInit(): void {
  }

}
