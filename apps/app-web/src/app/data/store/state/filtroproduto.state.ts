import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { ProdutoService } from '../../service';

import { LerFiltroProduto, EditarFiltroProduto, AdicionarFiltroProduto, RemoverFiltroProduto } from '../actions/filtroproduto.actions';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Categoria } from 'libs/data/src/lib/classes';

export class FiltroProdutoStateModel{
  FiltroProdutos: entities.Produto[];
  Categoria: entities.Categoria;
  areFiltroProdutosLoaded: boolean;

}

@State<FiltroProdutoStateModel>({
  name:"FiltroProdutos",
  defaults: {
    FiltroProdutos:[],
    Categoria: new Categoria("Todos", "Todos"),
    areFiltroProdutosLoaded: false
  }
})
@Injectable()
export class FiltroProdutoState {

  constructor(private ProdutoService:ProdutoService){

  }

  @Selector()
  static ObterListaFiltroProdutos(state: FiltroProdutoStateModel) {
      return state.Categoria;
  }

  @Selector()
  static areFiltroProdutosLoaded(state: FiltroProdutoStateModel) {
      return state.areFiltroProdutosLoaded;
  }

  @Action(AdicionarFiltroProduto)
  AdicionarFiltroProduto(context: StateContext<FiltroProdutoStateModel>, action: AdicionarFiltroProduto) {
    const current = context.getState();

    context.patchState({
        Categoria : action.payload
    });
  }


}
