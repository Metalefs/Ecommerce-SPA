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

export class IncrementarVendaProduto {

  static readonly type = '[Produto] IncrementarVenda'

  constructor(public id: string){}
}

export class IncrementarVisualizacoesProduto {

  static readonly type = '[Produto] IncrementarVisualizacoes'

  constructor(public id: string){}
}

export class RateProduto {

  static readonly type = '[Produto] Rate'

  constructor(public id: string, public rating:number){}
}

export class AdicionarFavorito {

  static readonly type = '[Orcamento] Add favorite'

  constructor(public produto: entities.Produto) {}
}

export class RemoverFavorito {

  static readonly type = '[Orcamento] Remove favorite'

  constructor(public produto: entities.Produto) {}
}

export class AdicionarComparacao {

  static readonly type = '[Orcamento] Add comparison'

  constructor(public produto: entities.Produto) {}
}

export class RemoverComparacao {

  static readonly type = '[Orcamento] Remove comparison'

  constructor(public produto: entities.Produto) {}
}

export class RemoverProduto {

  static readonly type = '[Produto] Remove'

  constructor(public id: string) {}
}
