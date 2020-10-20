import { entities } from '@personalizados-lopes/data';

export class LerProduto {

  static readonly type = '[Produto] Read'

  constructor() {}
}


export class AdicionarProduto {

  static readonly type = '[Produto] Add'

  constructor(public payload: entities.Produto) {}
}


export class EditarProduto {

  static readonly type = '[Produto] Edit'

  constructor(public payload: entities.Produto, public id:string) {}
}

export class GostarProduto {

  static readonly type = '[Produto] Like'

  constructor(public id: string){}
}

export class RemoverProduto {

  static readonly type = '[Produto] Remove'

  constructor(public id: string) {}
}
