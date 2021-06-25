import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { NavState } from '../../../shared/models/interfaces';

import { LerNavState, EditarNavState } from '../actions/navstate.actions'

export class NavStateStateModel{
  NavState: NavState;

}

@State<NavStateStateModel>({
  name:"NavState",
  defaults: {
    NavState: {activeNav:"Home"}
  }
})
@Injectable()
export class NavStateState {

  @Selector()
  static ObterNavState(state:NavStateStateModel){
      return state.NavState;
  }

  @Action(EditarNavState)
  Editar({getState,patchState}: StateContext<NavStateStateModel>, {payload} : EditarNavState){
    const state = getState();
    patchState({
      NavState: state.NavState = payload
    })
  }

}
