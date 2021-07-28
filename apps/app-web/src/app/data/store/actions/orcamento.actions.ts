import { entities } from '@personalizados-lopes/data';

export class LerOrcamento {

  static readonly type = '[Orcamento] Read'

  constructor() {}
}


export class AdicionarOrcamento {

  static readonly type = '[Orcamento] Add'

  constructor() {}
}


export class ResetarOrcamento {

  static readonly type = '[Orcamento] Reset'

  constructor() {}
}

export class AdicionarProdutoAoOrcamento {

  static readonly type = '[Orcamento] Add product'

  constructor(public payload: entities.Produto) {}
}

export class DuplicarProdutoOrcamento {

  static readonly type = '[Orcamento] Duplicate product'

  constructor(public payload: entities.Produto) {}
}

export class RemoverProdutoOrcamento {

  static readonly type = '[Orcamento] Remove product'

  constructor(public id: string, public codOrcamento:string) {}
}

export class EditarOrcamento {

  static readonly type = '[Orcamento] Edit'

  constructor(public payload: entities.Orcamento, public id:string) {}
}

export class EditarOrcamentoLocal {

  static readonly type = '[Orcamento] Edit Local'

  constructor(public payload: entities.Orcamento) {}
}

export class EditarProdutoOrcamentoLocal {

  static readonly type = '[Orcamento] Edit Product Local'

  constructor(public payload: entities.Produto, public id:string, public codOrcamento:string) {}
}

export class EditarProdutoAbertoOrcamentoLocal {

  static readonly type = '[Orcamento] Edit Open Product Local'

  constructor(public payload: entities.Produto) {}
}
export class AplicarCodigoPromocional {

  static readonly type = '[Orcamento] Apply coupon'

  constructor(public coupon: string) {}
}

export class RemoverOrcamento {

  static readonly type = '[Orcamento] Remove'

  constructor(public id: string) {}
}
