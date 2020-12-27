import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { OrcamentoService, UsuarioService } from '../../service';

import { LerOrcamento, EditarOrcamento, AdicionarOrcamento, RemoverOrcamento, AdicionarProdutoAoOrcamento, RemoverProdutoOrcamento, EditarOrcamentoLocal, EditarProdutoOrcamentoLocal, ResetarOrcamento, DuplicarProdutoOrcamento } from '../actions/orcamento.actions'
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { EnderecoEntrega, Orcamento, Usuario } from 'libs/data/src/lib/classes';
import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { removeDuplicates } from '../../../helper/ObjHelper';
import { AuthenticationService } from '../../../core/service/authentication/authentication.service';
import { ThrowStmt } from '@angular/compiler';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { CodProduto } from 'libs/data/src/lib/classes/orcamento';

export class OrcamentoStateModel{
  Orcamentos: entities.Orcamento;
  ListaOrcamentos: entities.Orcamento[];
  areOrcamentosLoaded: boolean;

}
let enderecoEntrega = new EnderecoEntrega("","","","","","","");
let DEFAULT = new Orcamento([],"",StatusOrcamento.aberto,0,"",new Usuario("","","","","",enderecoEntrega));
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

    state.Orcamentos.Produto.push(new CodProduto(payload,new Date().toISOString()+new Date().toString()));
    this.atualizarPreco(state);
    patchState({
        Orcamentos: state.Orcamentos
    });
  }
  @Action(DuplicarProdutoOrcamento)
  DuplicarProdutoOrcamento({getState,patchState}: StateContext<OrcamentoStateModel>, {payload} : DuplicarProdutoOrcamento){
    const state = getState();
    if(payload.Status == StatusProduto.esgotado)
    return;
    state.Orcamentos.Produto.push(new CodProduto(payload,new Date().toISOString()+new Date().toString()));
    this.atualizarPreco(state);
    patchState({
        Orcamentos: state.Orcamentos
    });
  }

  @Action(RemoverProdutoOrcamento)
  RemoverProdutoOrcamento({getState,patchState}: StateContext<OrcamentoStateModel>, {id} : RemoverProdutoOrcamento){
    const state = getState();
    state.Orcamentos.Produto = state.Orcamentos.Produto.filter(item => item.codOrcamento !== id);
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
    const ListaCodProdutos = [...state.Orcamentos.Produto];
    const index = ListaCodProdutos.findIndex(item => item.codOrcamento === id);
    ListaCodProdutos[index].Produto = payload;
    const orc = state.Orcamentos;
    orc.Produto = ListaCodProdutos;
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
      if(!isNaN(prod.Produto.Preco))
      state.Orcamentos.Preco += prod.Produto.Preco * prod.Produto.Quantidade;
    })
  }
}
