import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { ErrorHandler } from '../../core/error.handler';
import { Sobre } from 'libs/data/src/lib/classes';
import { BaseService } from './base/base.service';
@Injectable({
    providedIn: 'root'
})

export class SobreService extends BaseService<Sobre> {

  constructor(protected HttpClient:HttpClient, protected ErrorHandler:ErrorHandler) {
    super(RouteDictionary.Sobre,HttpClient,ErrorHandler)
  }


}
