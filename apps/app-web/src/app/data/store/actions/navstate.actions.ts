import { NavState } from '../../models/navstate';

export class LerNavState {

  static readonly type = '[NavState] Read'

  constructor(public payload: NavState) {}
}

export class EditarNavState {

  static readonly type = '[NavState] Edit'

  constructor(public payload: NavState) {}
}

