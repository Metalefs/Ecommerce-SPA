import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';

const ItemCarouselRouter = express();


ItemCarouselRouter.get(RouteDictionary.ItemCarousel, (req: any, res) => {
    try {
        let ItemCarouselService:Services.ItemCarouselService = new Services.ItemCarouselService();

        ItemCarouselService.Ler().then(x=>{
            res.send(x);
        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).post(RouteDictionary.ItemCarousel, (req: any, res) => {
    try {
      Services.UsuarioService.getByToken(req.body.token).then(user => {

          let ItemCarouselService:Services.ItemCarouselService = new Services.ItemCarouselService();

          ItemCarouselService.Inserir(user,req.body.item.ItemCarousel).then(x=>{
              res.send(x);
          });

      });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).put(RouteDictionary.ItemCarousel, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.body.token).then(user => {

            let ItemCarouselService:Services.ItemCarouselService = new Services.ItemCarouselService();

            ItemCarouselService.Alterar(user,req.body.item.ItemCarousel).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).delete(RouteDictionary.ItemCarousel, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.query.token).then(user => {

            let ItemCarouselService:Services.ItemCarouselService = new Services.ItemCarouselService();

            ItemCarouselService.Deletar(user,req.query.id).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
});
export {
    ItemCarouselRouter
}
