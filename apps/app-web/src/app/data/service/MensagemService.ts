
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { Mensagem } from 'libs/data/src/lib/classes';
import { ErrorHandler } from '../../core/error.handler';
import { BaseService } from './base/base.service';

@Injectable({
  providedIn: 'root'
})

export class MensagemService extends BaseService<Mensagem> {

  constructor(protected HttpClient:HttpClient, protected ErrorHandler:ErrorHandler) {
    super(RouteDictionary.Mensagem,HttpClient,ErrorHandler)
  }

}
