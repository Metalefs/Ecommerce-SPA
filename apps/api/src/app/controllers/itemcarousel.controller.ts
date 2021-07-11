import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";

import * as express from 'express';
import BaseController from './base.controller';
import { ensureIsAdmin } from '../middleware/ensure-is-admin';

let ItemCarouselService: Services.ItemCarouselService = new Services.ItemCarouselService();

const ItemCarouselRouter = express();

export class ItemCarouselController extends BaseController {
  constructor(service:Services.ItemCarouselService) {
    super(service);
  }
}

const ItemCarouselCtrl = new ItemCarouselController(ItemCarouselService)

ItemCarouselRouter.get(RouteDictionary.ItemCarousel,ItemCarouselCtrl.Ler);
ItemCarouselRouter.put(RouteDictionary.ItemCarousel, ensureIsAdmin, ItemCarouselCtrl.Editar);
ItemCarouselRouter.post(RouteDictionary.ItemCarousel, ensureIsAdmin, ItemCarouselCtrl.Incluir);
ItemCarouselRouter.delete(RouteDictionary.ItemCarousel + `:id`, ensureIsAdmin, ItemCarouselCtrl.Remover);

export {
  ItemCarouselRouter
}
