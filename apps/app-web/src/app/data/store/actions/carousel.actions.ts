import { entities } from '@personalizados-lopes/data';

export class LerCarousel {

  static readonly type = '[Carousel] Read'

  constructor() {}
}


export class AdicionarCarousel {

  static readonly type = '[Carousel] Add'

  constructor(public payload: entities.Carousel) {}
}


export class EditarCarousel {

  static readonly type = '[Carousel] Edit'

  constructor(public payload: entities.Carousel, public id:string) {}
}


export class RemoverCarousel {

  static readonly type = '[Carousel] Remove'

  constructor(public id: string) {}
}
