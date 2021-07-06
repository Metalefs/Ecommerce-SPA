import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TamanhoProduto } from 'libs/data/src/lib/classes';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { ErrorHandler } from '../../core/error.handler';

import { BaseService } from './base/base.service';
@Injectable({
  providedIn: 'root'
})
export class TamanhoProdutoService extends BaseService<TamanhoProduto> {

  constructor(protected HttpClient:HttpClient, protected ErrorHandler:ErrorHandler) {
    super(RouteDictionary.TamanhoProduto,HttpClient,ErrorHandler)
   }
}
