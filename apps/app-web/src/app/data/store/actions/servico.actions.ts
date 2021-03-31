import { entities } from '@personalizados-lopes/data';

export class LerServico {

  static readonly type = '[Servico] Read'

  constructor() {}
}

export class EditarServico {

  static readonly type = '[Servico] Edit'

  constructor(public payload: entities.Servico, public id:string) {}
}

export class RemoverServico {

  static readonly type = '[Servico] Remove'

  constructor(public id:string) {}
}
