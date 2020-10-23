import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { OrcamentoService } from '../../service';

import { LerOrcamento, EditarOrcamento, AdicionarOrcamento, RemoverOrcamento, AdicionarProdutoAoOrcamento, RemoverProdutoOrcamento, EditarOrcamentoLocal } from '../actions/Orcamento.actions'
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Orcamento, Usuario } from 'libs/data/src/lib/classes';
import { StatusOrcamento } from 'libs/data/src/lib/enums';

export class OrcamentoStateModel{
  Orcamentos: entities.Orcamento;
  areOrcamentosLoaded: boolean;

}
let DEFAULT = new Orcamento([],"",StatusOrcamento.aberto,0,"",new Usuario("","",""));
@State<OrcamentoStateModel>({
  name:"Orcamentos",
  defaults: {
    Orcamentos: DEFAULT,
    areOrcamentosLoaded: false
  }
})
@Injectable()
export class OrcamentoState {

  constructor(private OrcamentoService:OrcamentoService){

  }

  @Selector()
  static ObterListaOrcamentos(state: OrcamentoStateModel) {
    return state.Orcamentos;
  }

  @Action(LerOrcamento)
  LerOrcamento({getState, setState}: StateContext<OrcamentoStateModel>){
    return getState().Orcamentos;
  }

  @Action(AdicionarOrcamento)
  Adicionar({getState,patchState}: StateContext<OrcamentoStateModel>, {payload} : AdicionarOrcamento){
    return this.OrcamentoService.Incluir(payload).pipe(tap((result) => {
      const state = getState();
      patchState({
          Orcamentos: result
      });
    }));
  }

  @Action(AdicionarProdutoAoOrcamento)
  AdicionarProdutoAoOrcamento({getState,patchState}: StateContext<OrcamentoStateModel>, {payload} : AdicionarProdutoAoOrcamento){
    const state = getState();
    state.Orcamentos.Produto.push(payload);
    patchState({
        Orcamentos: state.Orcamentos
    });
  }

  @Action(RemoverProdutoOrcamento)
  RemoverProdutoOrcamento({getState,patchState}: StateContext<OrcamentoStateModel>, {id} : RemoverProdutoOrcamento){
    const state = getState();
    state.Orcamentos.Produto = state.Orcamentos.Produto.filter(item => item._id !== id);
    patchState({
        Orcamentos: state.Orcamentos
    });
  }

  @Action(EditarOrcamento)
  Editar({getState,setState}: StateContext<OrcamentoStateModel>, {payload, id} : EditarOrcamento){
    return this.OrcamentoService.Editar(payload).pipe(
      tap(result => {
        const state = getState();
        setState({
          ...state,
          Orcamentos: result,
        });
      })
    );
  }

  @Action(EditarOrcamentoLocal)
  EditarOrcamentoLocal({getState,patchState}: StateContext<OrcamentoStateModel>, {payload, id} : EditarOrcamento){
    let state = getState();
    patchState({
      ...state,
      Orcamentos: payload,
    });
  }

  @Action(RemoverOrcamento)
  Remover({getState,setState}: StateContext<OrcamentoStateModel>, {id} : RemoverOrcamento){
    return this.OrcamentoService.Remover(id).pipe(
      tap(result => {
        const state = getState();
        setState({
          ...state,
          Orcamentos: DEFAULT,
        });
      })
    );
  }

}
