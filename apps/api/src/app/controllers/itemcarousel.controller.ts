import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
import { UsuarioLogado } from '../_handlers/Authentication';

const ItemCarouselRouter = express();

let ItemCarouselService: Services.ItemCarouselService = new Services.ItemCarouselService();

ItemCarouselRouter.get(RouteDictionary.ItemCarousel, async (req: any, res) => {
  try {
    res.send(await ItemCarouselService.Ler());
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.post(RouteDictionary.ItemCarousel, async (req: any, res) => {
  try {
    res.send(await ItemCarouselService.Inserir(await UsuarioLogado(req,res), req.body.item.ItemCarousel));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.put(RouteDictionary.ItemCarousel, async (req: any, res) => {
  try {
    res.send(await ItemCarouselService.Alterar(await UsuarioLogado(req,res), req.body.item.ItemCarousel));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
})
.delete(RouteDictionary.ItemCarousel, async (req: any, res) => {
  try {
    res.send(await ItemCarouselService.Deletar(await UsuarioLogado(req,res), req.query.id));
  }
  catch (err) {
    ErrorHandler.DefaultException(err, res)
  }
});
export {
  ItemCarouselRouter
}
