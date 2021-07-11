import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tema } from 'libs/data/src/lib/classes';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { BaseService } from './base/base.service';
import { ErrorHandler } from '../../core/error.handler';
@Injectable({
    providedIn: 'root'
})

export class TemaService extends BaseService<Tema> {

  constructor(protected HttpClient:HttpClient, protected ErrorHandler:ErrorHandler) {
    super(RouteDictionary.Tema,HttpClient,ErrorHandler)
   }

}
