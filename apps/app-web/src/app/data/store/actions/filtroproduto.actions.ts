import { FiltroProduto } from '../../models/filtroProduto';

export class LerFiltroProduto {

  static readonly type = '[FiltroProduto] Read'

  constructor() {}
}


export class AdicionarFiltroProduto {

  static readonly type = '[FiltroProduto] Add'

  constructor(public payload: FiltroProduto) {}
}


export class EditarFiltroProduto {

  static readonly type = '[FiltroProduto] Edit'

  constructor(public payload: FiltroProduto) {}
}


export class RemoverFiltroProduto {

  static readonly type = '[FiltroProduto] Remove'

  constructor(public id: string) {}
}
