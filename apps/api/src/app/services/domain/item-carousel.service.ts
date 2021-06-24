import { entities } from '@personalizados-lopes/data';
import { BaseService } from '../baseService';

export class ItemCarouselService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.ItemCarousel.NomeID);

  }
}
