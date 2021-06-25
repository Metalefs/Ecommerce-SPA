import { Categoria, Produto } from 'libs/data/src/lib/classes';
import { FiltroProduto } from '../../../shared/models/interfaces/filtroProduto';

export class LerFiltroProduto {

  static readonly type = '[FiltroProduto] Read'

  constructor() {}
}


export class AdicionarFiltroProduto {

  static readonly type = '[FiltroProduto] Add'

  constructor(public payload: FiltroProduto) {}
}

export class AdicionarListaProdutosFiltroProduto {

  static readonly type = '[FiltroProduto] Add Product List'

  constructor(public payload: Produto[]) {}
}

export class EditarFiltroProduto {

  static readonly type = '[FiltroProduto] Edit'

  constructor(public payload: FiltroProduto) {}
}



export class EditarCategoriaFiltroProduto {

  static readonly type = '[FiltroProduto] Edit Category'

  constructor(public payload: Categoria) {}
}
export class EditarSearchFiltroProduto {

  static readonly type = '[FiltroProduto] Edit Search'

  constructor(public payload: string) {}
}


export class RemoverFiltroProduto {

  static readonly type = '[FiltroProduto] Remove'

  constructor(public id: string) {}
}
