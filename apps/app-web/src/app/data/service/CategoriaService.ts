import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { AuthenticationService } from '../../core/service/authentication/authentication.service';
import { ErrorHandler } from '../../core/error.handler';
import { Categoria } from 'libs/data/src/lib/classes';
import { BaseService } from './base/base.service';

@Injectable({
    providedIn: 'root'
})

export class CategoriaService extends BaseService<Categoria> {

  constructor(protected HttpClient:HttpClient, protected ErrorHandler:ErrorHandler) {
    super(RouteDictionary.Categoria,HttpClient,ErrorHandler)
   }

}
