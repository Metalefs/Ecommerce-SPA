import { entities } from '@personalizados-lopes/data';

export class LerCategoria {

  static readonly type = '[Categoria] Read'

  constructor() {}
}


export class AdicionarCategoria {

  static readonly type = '[Categoria] Add'

  constructor(public payload: entities.Categoria) {}
}


export class EditarCategoria {

  static readonly type = '[Categoria] Edit'

  constructor(public payload: entities.Categoria, public id:string) {}
}


export class RemoverCategoria {

  static readonly type = '[Categoria] Remove'

  constructor(public id: string) {}
}
