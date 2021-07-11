import * as express from 'express';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { ensureIsAdmin } from '../middleware/ensure-is-admin';
import BaseController from './base.controller';

let CarouselService: Services.CarouselService = new Services.CarouselService();

const CarrouselRouter = express();

export class CarrouselController extends BaseController {
  constructor(service:Services.CarouselService) {
    super(service)
  }
}

const CarrouselCtrl = new CarrouselController(CarouselService)

CarrouselRouter.get(RouteDictionary.Carousel, async (req: any, res) => {
  CarouselService.LerUltimo()
  .then(result => res.send(result))
  .catch(err =>ErrorHandler.DefaultException(err, res));
})
.put(RouteDictionary.Carousel, ensureIsAdmin, CarrouselCtrl.Editar)
.post(RouteDictionary.Carousel, ensureIsAdmin, CarrouselCtrl.Incluir)
.delete(RouteDictionary.Carousel + `:id`, ensureIsAdmin, CarrouselCtrl.Remover);

export {
  CarrouselRouter
}
