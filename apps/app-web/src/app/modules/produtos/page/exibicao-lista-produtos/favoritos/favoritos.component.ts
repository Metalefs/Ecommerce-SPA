import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProdutoState } from '../../../../../data/store/state';
import { Produto } from '../../../../../../../../../libs/data/src/lib/classes';
import { ProdutoStateModel } from 'apps/app-web/src/app/data/store/state/produto.state';

@Component({
  selector: 'personalizados-lopes-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {
  @Select(ProdutoState.ObterListaFavoritos) Favoritos$: Observable<ProdutoStateModel>;
  Favoritos:Produto[]
  constructor() { }

  ngOnInit(): void {
    this.Favoritos$.subscribe(favorites=>{
      this.Favoritos = favorites as unknown as Produto[];
    })
  }

}
