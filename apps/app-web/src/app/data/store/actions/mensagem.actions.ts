import { entities } from '@personalizados-lopes/data';

export class LerMensagem {

  static readonly type = '[Mensagem] Read'

  constructor() {}
}


export class AdicionarMensagem {

  static readonly type = '[Mensagem] Add'

  constructor(public payload: entities.Mensagem) {}
}


export class EditarMensagem {

  static readonly type = '[Mensagem] Edit'

  constructor(public payload: entities.Mensagem, public id:string) {}
}


export class RemoverMensagem {

  static readonly type = '[Mensagem] Remove'

  constructor(public id: string) {}
}
