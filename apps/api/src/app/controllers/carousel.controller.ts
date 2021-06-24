import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';
const CarouselRouter = express();
let CarouselService: Services.CarouselService = new Services.CarouselService();

CarouselRouter.get(RouteDictionary.Carousel, async (req: any, res) => {
  try {
    res.send(await CarouselService.LerPrimeiro())
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.post(RouteDictionary.Carousel, async (req: any, res) => {
  try {
    res.send(await CarouselService.Inserir(await UsuarioLogado(req, res), req.body.item.Carousel));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.put(RouteDictionary.Carousel, async (req: any, res) => {
  try {
    res.send(await CarouselService.Alterar(await UsuarioLogado(req, res), req.body.item.Carousel));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.delete(RouteDictionary.Carousel, async (req: any, res) => {
  try {
    res.send(await CarouselService.Deletar(await UsuarioLogado(req, res), req.query.id));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
});
export {
  CarouselRouter
}
