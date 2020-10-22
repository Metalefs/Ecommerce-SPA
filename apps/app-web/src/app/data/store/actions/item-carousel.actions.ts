import { entities } from '@personalizados-lopes/data';

export class LerItemCarousel {

  static readonly type = '[ItemCarousel] Read'

  constructor() {}
}


export class AdicionarItemCarousel {

  static readonly type = '[ItemCarousel] Add'

  constructor(public payload: entities.ItemCarousel) {}
}


export class EditarItemCarousel {

  static readonly type = '[ItemCarousel] Edit'

  constructor(public payload: entities.ItemCarousel, public id:string) {}
}


export class RemoverItemCarousel {

  static readonly type = '[ItemCarousel] Remove'

  constructor(public id: string) {}
}
