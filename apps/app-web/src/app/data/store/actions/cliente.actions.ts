import { entities } from '@personalizados-lopes/data';

export class LerCliente {

  static readonly type = '[Cliente] Read'

  constructor() {}
}


export class AdicionarCliente {

  static readonly type = '[Cliente] Add'

  constructor(public payload: entities.Cliente) {}
}


export class EditarCliente {

  static readonly type = '[Cliente] Edit'

  constructor(public payload: entities.Cliente, public id:string) {}
}


export class RemoverCliente {

  static readonly type = '[Cliente] Remove'

  constructor(public id: string) {}
}
