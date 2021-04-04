import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import * as Services from "../services";
import { ErrorHandler } from '../_handlers/error-handler';

import * as express from 'express';
const CarouselRouter = express();

CarouselRouter.get(RouteDictionary.Carousel, (req: any, res) => {
    try {
        let CarouselService:Services.CarouselService = new Services.CarouselService();

        CarouselService.Ler().then(x=>{
            res.send(x);
        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).post(RouteDictionary.Carousel, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.body.token).then(user => {

            let CarouselService:Services.CarouselService = new Services.CarouselService();

            CarouselService.Inserir(user,req.body.item.Carousel).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).put(RouteDictionary.Carousel, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.body.token).then(user => {

            let CarouselService:Services.CarouselService = new Services.CarouselService();

            CarouselService.Alterar(user,req.body.item.Carousel).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
}).delete(RouteDictionary.Carousel, (req: any, res) => {
    try {
        Services.UsuarioService.getByToken(req.query.token).then(user => {

            let CarouselService:Services.CarouselService = new Services.CarouselService();

            CarouselService.Deletar(user,req.query.id).then(x=>{
                res.send(x);
            });

        });
    }
    catch (err) {
        ErrorHandler.DefaultException(err, res)
    }
});
export {
    CarouselRouter
}
