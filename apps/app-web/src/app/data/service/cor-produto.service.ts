import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CorProduto } from 'libs/data/src/lib/classes';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { ErrorHandler } from '../../core/error.handler';
import { BaseService } from './base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CorProdutoService extends BaseService<CorProduto> {

  constructor(protected HttpClient:HttpClient, protected ErrorHandler:ErrorHandler) {
    super(RouteDictionary.CorProduto,HttpClient,ErrorHandler)
   }
}
