import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { OrcamentoService, UsuarioService } from '../../service';

import { LerOrcamento, EditarOrcamento, AdicionarOrcamento, RemoverOrcamento, AdicionarProdutoAoOrcamento, RemoverProdutoOrcamento, EditarOrcamentoLocal, EditarProdutoOrcamentoLocal, ResetarOrcamento } from '../actions/orcamento.actions'
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Orcamento, Usuario } from 'libs/data/src/lib/classes';
import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { removeDuplicates } from '../../../helper/ObjHelper';
import { AuthenticationService } from '../../../core/service/authentication/authentication.service';
import { ThrowStmt } from '@angular/compiler';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';

export class OrcamentoStateModel{
  Orcamentos: entities.Orcamento;
  ListaOrcamentos: entities.Orcamento[];
  areOrcamentosLoaded: boolean;

}
let DEFAULT = new Orcamento([],"",StatusOrcamento.aberto,0,"",new Usuario("","","",""));
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

  constructor(
    private OrcamentoService:OrcamentoService,
    private authenticationService:AuthenticationService,
    private usuarioService:UsuarioService
    ){

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
    this.OrcamentoService.Ler().subscribe(rslt=>{
      const state = getState();
      rslt = rslt.sort(x=>x.Status);
      setState({
        ...state,
        ListaOrcamentos: rslt
      });
    });
  }

  @Action(AdicionarOrcamento)
  Adicionar({getState,patchState}: StateContext<OrcamentoStateModel>){
    return this.OrcamentoService.Incluir(getState().Orcamentos).subscribe((result) => {
      const state = getState();
      this.usuarioService.AtualizarInformacoes(state.Orcamentos.Usuario).subscribe();
      patchState({
          Orcamentos: DEFAULT
      });
    });
  }

  @Action(AdicionarProdutoAoOrcamento)
  AdicionarProdutoAoOrcamento({getState,patchState}: StateContext<OrcamentoStateModel>, {payload} : AdicionarProdutoAoOrcamento){
    const state = getState();
    if(payload.Status == StatusProduto.esgotado)
    return;
    try{
      let total = state.Orcamentos.Produto
        .filter(item => item._id == payload._id)
        .map(x=>x.Quantidade)
        .reduce((total, num)=>{return total + Math.round(num)})

        state.Orcamentos.Produto
        .filter(item => item._id == payload._id).forEach(prod=>prod.Quantidade = total);
    }catch(ex){console.error(ex)};
    state.Orcamentos.Produto.push(payload);
    this.atualizarPreco(state);
    patchState({
        Orcamentos: state.Orcamentos
    });
  }
  @Action(RemoverProdutoOrcamento)
  RemoverProdutoOrcamento({getState,patchState}: StateContext<OrcamentoStateModel>, {id} : RemoverProdutoOrcamento){
    const state = getState();
    state.Orcamentos.Produto = state.Orcamentos.Produto.filter(item => item._id !== id);
    this.atualizarPreco(state);
    patchState({
        Orcamentos: state.Orcamentos
    });
  }

  @Action(ResetarOrcamento)
  ResetarOrcamento({getState,patchState}: StateContext<OrcamentoStateModel>, {}: ResetarOrcamento){
    const state = getState();
    let usuario = state.Orcamentos.Usuario;
    state.Orcamentos = DEFAULT;
    state.Orcamentos.Usuario = usuario;
    state.Orcamentos.Status = StatusOrcamento.aberto;
    this.atualizarPreco(state);
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
  EditarOrcamentoLocal({getState,patchState}: StateContext<OrcamentoStateModel>, {payload} : EditarOrcamento){
    let state = getState();
    this.atualizarPreco(state);
    patchState({
      ...state,
      Orcamentos: payload,
    });
  }

  @Action(EditarProdutoOrcamentoLocal)
  EditarProdutoOrcamentoLocal({getState,patchState}: StateContext<OrcamentoStateModel>, {payload, id} : EditarProdutoOrcamentoLocal){
    let state = getState();
    const ListaProdutos = [...state.Orcamentos.Produto];
    const index = ListaProdutos.findIndex(item => item._id === id);
    ListaProdutos[index] = payload;
    const orc = state.Orcamentos;
    orc.Produto = ListaProdutos;
    this.atualizarPreco(state);
    patchState({
      ...state,
      Orcamentos: orc,
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

  atualizarPreco(state:OrcamentoStateModel){
    state.Orcamentos.Preco = 0;
    state.Orcamentos.Produto.forEach(prod=>{
      if(!isNaN(prod.Preco))
      state.Orcamentos.Preco += prod.Preco * prod.Quantidade;
    })
  }
}
