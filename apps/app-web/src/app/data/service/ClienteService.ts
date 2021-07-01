import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { AuthenticationService } from '../../core/service/authentication/authentication.service';
import { ImagemService } from './ImagemService';
import { Cliente } from 'libs/data/src/lib/classes';
import { isEmpty } from '../../helper/ObjHelper';
import { PathDictionary } from 'libs/data/src/lib/routes/image-folders';

import { ErrorHandler } from '../../core/error.handler';
@Injectable({
    providedIn: 'root'
})

export class ClienteService {
    constructor(private http: HttpClient, private ErrorHandler:ErrorHandler,
        private AuthenticationService: AuthenticationService,
        private servicoImagem:ImagemService) { }

    Ler(): Observable<entities.Cliente[]> {
        return this.http.get<entities.Cliente[]>(environment.endpoint + RouteDictionary.Cliente).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.ErrorHandler.handleError) // then handle the error
        );
    }

    async Editar(item: entities.Cliente): Promise<Observable<entities.Cliente>> {
        return this.EditarImagens(item).then(x=> {
          item = x;
          let payload = this.AuthenticationService.tokenize({Cliente:item});
          return this.http.put<entities.Cliente>(environment.endpoint + RouteDictionary.Cliente,
              payload).pipe(
              retry(3), // retry a failed request up to 3 times
              catchError(this.ErrorHandler.handleError) // then handle the error
          );
        })
    }

    Remover(id: string): Observable<any>{
      return this.http.delete<entities.Cliente>(environment.endpoint + RouteDictionary.Cliente + `/${id}`).pipe(
          retry(3),
          catchError(this.ErrorHandler.handleError)
      );
    }

    Incluir(item: entities.Cliente): Observable<any> {
      let payload = this.AuthenticationService.tokenize({Cliente:item});
      return this.http.post<entities.Cliente>(environment.endpoint + RouteDictionary.Cliente, payload).pipe(
          retry(3),
          catchError(this.ErrorHandler.handleError)
      );
    }

    async EditarImagens(item:Cliente) : Promise<Cliente>{
      if(!isEmpty(item.Foto)){

        alert("Imagens diferentes")
        return this.RemoverImagens(item).then(async()=>{
          return await this.UploadItemImages(item);
        })
      }
    }

    async RemoverImagens(item:Cliente){
        try{
          if(item.Foto != ''){
            await this.servicoImagem.deleteImage(item.Foto);
          }
          else{
            return item;
          }
        }catch(EX){ console.log(EX); }
    }

    async UploadItemImages(item:entities.Cliente) : Promise<entities.Cliente>{
      if(item.Foto){
        await this.servicoImagem.storeImage(PathDictionary.clientes,item.Foto).then(async x=>{
          item.Foto = await this.servicoImagem.getRef((await x).metadata.fullPath, item.Nome, "Cliente");
        })
        return item;
      }
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
