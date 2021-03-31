import { entities } from '@personalizados-lopes/data';

export class LerSobre {

  static readonly type = '[Sobre] Read'

  constructor() {}
}

export class EditarSobre {

  static readonly type = '[Sobre] Edit'

  constructor(public payload: entities.Sobre, public id:string) {}
}
