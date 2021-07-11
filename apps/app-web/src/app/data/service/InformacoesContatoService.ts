import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';

import { ErrorHandler } from '../../core/error.handler';
import { BaseService } from './base/base.service';
import { InformacoesContato } from 'libs/data/src/lib/classes';
@Injectable({
  providedIn: 'root'
})

export class InformacoesContatoService extends BaseService<InformacoesContato> {

  constructor(protected HttpClient:HttpClient, protected ErrorHandler:ErrorHandler) {
    super(RouteDictionary.InformacoesContato,HttpClient,ErrorHandler)
  }
}
