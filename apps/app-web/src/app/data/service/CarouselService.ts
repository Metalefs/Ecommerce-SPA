import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { ErrorHandler } from '../../core/error.handler';
import { Carousel } from 'libs/data/src/lib/classes';
import { BaseService } from './base/base.service';
@Injectable({
    providedIn: 'root'
})

export class CarouselService  extends BaseService<Carousel> {

  constructor(protected HttpClient:HttpClient, protected ErrorHandler:ErrorHandler) {
    super(RouteDictionary.Carousel,HttpClient,ErrorHandler)
   }
}
