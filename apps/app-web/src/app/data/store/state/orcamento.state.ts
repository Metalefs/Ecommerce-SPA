import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { OrcamentoService } from '../../service';

import { LerOrcamento, EditarOrcamento, AdicionarOrcamento, RemoverOrcamento, AdicionarProdutoAoOrcamento, RemoverProdutoOrcamento, EditarOrcamentoLocal } from '../actions/Orcamento.actions'
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Orcamento, Usuario } from 'libs/data/src/lib/classes';
import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { removeDuplicates } from '../../../helper/ObjHelper';
import { AuthenticationService } from '../../../core/service/authentication/authentication.service';
import { ThrowStmt } from '@angular/compiler';

export class OrcamentoStateModel{
  Orcamentos: entities.Orcamento;
  ListaOrcamentos: entities.Orcamento[];
  areOrcamentosLoaded: boolean;

}
let DEFAULT = new Orcamento([],"",StatusOrcamento.aberto,0,"",new Usuario("","",""));
@State<OrcamentoStateModel>({
  name:"Orcamentos",
  defaults: {
    Orcamentos: DEFAULT,
    ListaOrcamentos: [],
    areOrcamentosLoaded: false
  }
})
@Injectable()
export class OrcamentoState {

  constructor(private OrcamentoService:OrcamentoService,private authenticationService:AuthenticationService){

  }

  @Selector()
  static ObterOrcamentos(state: OrcamentoStateModel) {
    return state.Orcamentos;
  }

  @Selector()
  static ObterListaOrcamentos(state: OrcamentoStateModel) {
    return state.ListaOrcamentos;
  }


  @Action(LerOrcamento)
  LerOrcamento({getState, setState}: StateContext<OrcamentoStateModel>){
    this.authenticationService.currentUser.subscribe(usr=>{
      this.OrcamentoService.Ler().subscribe(rslt=>{
        const state = getState();
          setState({
            ...state,
            ListaOrcamentos: rslt
          });
      });
    })
  }

  @Action(AdicionarOrcamento)
  Adicionar({getState,patchState}: StateContext<OrcamentoStateModel>){
    return this.OrcamentoService.Incluir(getState().Orcamentos).subscribe((result) => {
      const state = getState();
      patchState({
          Orcamentos: DEFAULT
      });
    });
  }

  @Action(AdicionarProdutoAoOrcamento)
  AdicionarProdutoAoOrcamento({getState,patchState}: StateContext<OrcamentoStateModel>, {payload} : AdicionarProdutoAoOrcamento){
    const state = getState();
    try{
      let total = state.Orcamentos.Produto
        .filter(item => item._id == payload._id)
        .map(x=>x.Quantidade)
        .reduce((total, num)=>{return total + Math.round(num)})

        state.Orcamentos.Produto
        .filter(item => item._id == payload._id).forEach(prod=>prod.Quantidade = total);
    }catch(ex){console.error(ex)};
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
    return this.OrcamentoService.Editar(payload).subscribe(result => {
      const state = getState();
      const Lista = [...state.ListaOrcamentos];
      const index = Lista.findIndex(item => item._id === id);
      Lista[index] = result;
      setState({
        ...state,
        Orcamentos: result,
        ListaOrcamentos: Lista
      });
    })
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
