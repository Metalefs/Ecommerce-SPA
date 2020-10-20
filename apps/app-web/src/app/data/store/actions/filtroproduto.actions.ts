import { entities } from '@personalizados-lopes/data';

export class LerFiltroProduto {

  static readonly type = '[FiltroProduto] Read'

  constructor() {}
}


export class AdicionarFiltroProduto {

  static readonly type = '[FiltroProduto] Add'

  constructor(public payload: entities.Categoria) {}
}


export class EditarFiltroProduto {

  static readonly type = '[FiltroProduto] Edit'

  constructor(public payload: entities.Categoria, public id:string) {}
}


export class RemoverFiltroProduto {

  static readonly type = '[FiltroProduto] Remove'

  constructor(public id: string) {}
}
