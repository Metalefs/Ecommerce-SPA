import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { AuthenticationService } from '../../core/service/authentication/authentication.service';
import { handleError } from '../../core/error.handler';
@Injectable({
    providedIn: 'root'
})

export class CarouselService {
    constructor(private http: HttpClient,
        private AuthenticationService: AuthenticationService){}

    Ler(): Observable<entities.Carousel> {
        return this.http.get<entities.Carousel>(environment.endpoint + RouteDictionary.Carousel).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(handleError) // then handle the error
        );
    }
    Editar(item: entities.Carousel): Observable<entities.Carousel> {
        let payload = this.AuthenticationService.tokenize({Carousel:item});
        console.log(payload);
        return this.http.put<entities.Carousel>(environment.endpoint + RouteDictionary.Carousel,
            payload).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(handleError) // then handle the error
        );
    }
    Remover(id: string): Observable<any>{
        return this.http.delete<entities.Carousel>(environment.endpoint + RouteDictionary.Carousel).pipe(
            retry(3),
            catchError(handleError)
        );
    }
    Incluir(item: entities.Carousel): Observable<any> {
      let payload = this.AuthenticationService.tokenize({Carousel:item});
      return this.http.post<entities.Carousel>(environment.endpoint + RouteDictionary.Carousel, payload).pipe(
          retry(3),
          catchError(handleError)
      );
    }
}
