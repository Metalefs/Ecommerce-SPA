import { entities } from '@personalizados-lopes/data';

export class LerInformacoesContato {

  static readonly type = '[InformacoesContato] Read'

  constructor() {}
}

export class EditarInformacoesContato {

  static readonly type = '[InformacoesContato] Edit'

  constructor(public payload: entities.InformacoesContato, public id:string) {}
}
