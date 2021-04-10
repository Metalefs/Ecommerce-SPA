import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { AuthenticationService } from '../../core/service/authentication/authentication.service';
import { ErrorHandler } from '../../core/error.handler';
import { Servico } from 'libs/data/src/lib/classes';
import { ImagemService } from '.';
import { PathDictionary } from 'libs/data/src/lib/routes/image-folders';
import { isEmpty } from '../../helper/ObjHelper';

@Injectable({
    providedIn: 'root'
})

export class ServicoService {
    constructor(private http: HttpClient, private ErrorHandler:ErrorHandler,
      private servicoImagem: ImagemService,
        private AuthenticationService: AuthenticationService) { }

    Ler(): Observable<entities.Servico[]> {
        return this.http.get<entities.Servico[]>(environment.endpoint + RouteDictionary.Servico).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.ErrorHandler.handleError) // then handle the error
        );
    }

    async Editar(item: entities.Servico): Promise<Observable<entities.Servico>> {
      return this.EditarImagens(item).then(x=>{
        let payload = this.AuthenticationService.tokenize({Servico:item});
        console.log(item);
        return this.http.put<entities.Servico>(environment.endpoint + RouteDictionary.Servico,
          payload).pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(this.ErrorHandler.handleError)
        )
      });
    }

    async EditarImagens(item:Servico) : Promise<Servico>{

      if(!isEmpty(item.FileList)){

        alert("Imagens diferentes")
        // return this.RemoverImagens(item).then(async()=>{
        // })
      }
      return await this.UploadItemImages(item);

    }

    async UploadItemImages(item:entities.Servico) : Promise<entities.Servico>{
      if(item.FileList){
        for(let i =0; i<= item.FileList.length ; i++){
          if(item.FileList[i])
          await this.servicoImagem.storeImage(PathDictionary.servicos,item.FileList[i]).then(async x=>{
            item.Imagem = await this.servicoImagem.getRef((await x).metadata.fullPath, item.Nome, "Empresa");
          })
        }
        return item;
      }
    }

    Remover(id: string): Observable<any>{
      let token = this.AuthenticationService.tokenize({id});
      return this.http.delete<entities.Servico>(environment.endpoint + RouteDictionary.Servico + `?id=${id}&token=${token.token}`).pipe(
          retry(3),
          catchError(this.ErrorHandler.handleError)
      );
    }

    Incluir(item: entities.Servico): Observable<any> {
      let payload = this.AuthenticationService.tokenize({Servico:item});
      return this.http.post<entities.Servico>(environment.endpoint + RouteDictionary.Servico, payload).pipe(
          retry(3),
          catchError(this.ErrorHandler.handleError)
      );
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
