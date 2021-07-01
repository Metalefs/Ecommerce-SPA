import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { AuthenticationService } from '../../core/service/authentication/authentication.service';
import { PathDictionary } from 'libs/data/src/lib/routes/image-folders';
import { ItemCarousel } from 'libs/data/src/lib/classes';
import { ImagemService } from './ImagemService';
import { ErrorHandler } from '../../core/error.handler';
@Injectable({
    providedIn: 'root'
})

export class ItemCarouselService {
    constructor(private http: HttpClient, private ErrorHandler:ErrorHandler,
    private AuthenticationService: AuthenticationService,
    private servicoImagem: ImagemService) { }

    Ler(): Observable<entities.ItemCarousel[]> {
        return this.http.get<entities.ItemCarousel[]>(environment.endpoint + RouteDictionary.ItemCarousel).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.ErrorHandler.handleError) // then handle the error
        );
    }

    Filtrar(id:any): Observable<entities.ItemCarousel[]> {
      return this.http.get<entities.ItemCarousel[]>(environment.endpoint + RouteDictionary.ItemCarousel + `?id = ${id}`).pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(this.ErrorHandler.handleError) // then handle the error
      );
    }

    async Editar(item: entities.ItemCarousel): Promise<Observable<entities.ItemCarousel>> {
      // return this.EditarImagens(item).then(x=>{
      //     // alert("Editando !");
      //     console.log(item);
      //   });
      let payload = this.AuthenticationService.tokenize({ItemCarousel:item});
      return this.http.put<entities.ItemCarousel>(environment.endpoint + RouteDictionary.ItemCarousel,
        payload).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.ErrorHandler.handleError)
      )
    }

    Remover(id: string): Observable<any>{
      return this.http.delete<entities.Cliente>(environment.endpoint + RouteDictionary.ItemCarousel + `/${id}`).pipe(
          retry(3),
          catchError(this.ErrorHandler.handleError)
      );
    }

    Incluir(item: entities.ItemCarousel):  Observable<ItemCarousel> {
        let payload = this.AuthenticationService.tokenize({ItemCarousel:item});
        return this.http.post<entities.ItemCarousel>(environment.endpoint + RouteDictionary.ItemCarousel, payload).pipe(
          retry(3),
          catchError(this.ErrorHandler.handleError)
        );
    }

    async EditarImagens(item:ItemCarousel) : Promise<ItemCarousel>{
      if(item.url){
        alert("Imagens diferentes")
        return this.RemoverImagens(item).then(async()=>{
          return await this.UploadItemImages(item);
        })
      }
    }

    async RemoverImagens(item:ItemCarousel){
        try{
          if(item.url != ''){
            await this.servicoImagem.deleteImage(item.url);
          }
          else{
            return item;
          }
        }catch(EX){ console.log(EX); return item;}
    }

    async UploadItemImages(item:entities.ItemCarousel) : Promise<entities.ItemCarousel>{
      await this.servicoImagem.storeImage(PathDictionary.carousel,item.url).then(async x=>{
        item.url = await this.servicoImagem.getRef((await x).metadata.fullPath, item.nome, "ItemCarousel");
      })
      return item;
      // if(item.url){
      // }
    }

    handleError(error) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }
}
