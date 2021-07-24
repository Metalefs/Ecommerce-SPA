import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departamento } from 'libs/data/src/lib/classes';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { ErrorHandler } from '../../core/error.handler';

import { BaseService } from './base/base.service';
@Injectable({
  providedIn: 'root'
})
export class DepartamentoService extends BaseService<Departamento> {

  constructor(protected HttpClient:HttpClient, protected ErrorHandler:ErrorHandler) {
    super(RouteDictionary.Departamento,HttpClient,ErrorHandler)
  }
}
