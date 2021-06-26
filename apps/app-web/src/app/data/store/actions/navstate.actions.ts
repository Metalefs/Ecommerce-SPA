import { NavState } from "../../../shared/models/interfaces"

export class LerNavState {

  static readonly type = '[NavState] Read'

  constructor(public payload: NavState) {}
}

export class EditarNavState {

  static readonly type = '[NavState] Edit'

  constructor(public payload: NavState) {}
}

