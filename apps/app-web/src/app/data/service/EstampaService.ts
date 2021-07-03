import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { AuthenticationService } from '../../core/service/authentication/authentication.service';

import { PathDictionary } from 'libs/data/src/lib/routes/image-folders';
import { isEmpty } from '../../helper/ObjHelper';
import { Estampa } from 'libs/data/src/lib/classes';
import { ErrorHandler } from '../../core/error.handler';

import { ImagemService } from './ImagemService';
@Injectable({
    providedIn: 'root'
})

export class EstampaService {
    constructor(private http: HttpClient, private ErrorHandler:ErrorHandler,
    private AuthenticationService: AuthenticationService,
    private servicoImagem: ImagemService) { }

    Ler(limit?:number,skip?:number): Observable<Array<Estampa>> {
        return this.http.get<Array<Estampa>>(environment.endpoint + RouteDictionary.Estampa.Raiz).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.ErrorHandler.handleError) // then handle the error
        );
    }

    Filtrar(id:any): Observable<Array<Estampa>> {
      return this.http.get<Array<Estampa>>(environment.endpoint + RouteDictionary.Estampa.Filtrar + `${id}`).pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(this.ErrorHandler.handleError) // then handle the error
      );
    }

    async Editar(item: Estampa): Promise<Observable<Estampa>> {
        return this.EditarImagens(item).then(x=>{
          let payload = this.AuthenticationService.tokenize({Produto:item});
          return this.http.put<Estampa>(environment.endpoint + RouteDictionary.Estampa.Raiz,
            payload).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.ErrorHandler.handleError)
          )
        });

    }

    async Remover(id: string): Promise<Observable<any>>{
      return new Promise((resolve, reject) =>{
        this.Filtrar(id).subscribe(async Produto =>{
          for(let i =0; i<= Produto[0].Imagem.length ; i++){
            try{
              //if(Produto[0].Imagem[i])
              //await this.servicoImagem.deleteImage(Produto[0].Imagem[i]);
            }catch(EX){ console.log(EX); continue;}
          }
          resolve(this.http.delete<Estampa>(environment.endpoint + RouteDictionary.Produtos.Produto + `/${id}`).pipe(
              retry(3),
              catchError(this.ErrorHandler.handleError)
          ));
        })
      })
    }

    Incluir(item: Estampa): Observable<Estampa> {

      let payload = this.AuthenticationService.tokenize({Produto:item});
      return this.http.post<Estampa>(environment.endpoint + RouteDictionary.Produtos.Produto, payload).pipe(
        retry(3),
        catchError(this.ErrorHandler.handleError)
      );

    }

    async EditarImagens(item:Estampa) : Promise<Estampa>{
      if(!isEmpty(item.FileList[0])){
        let deletar = confirm("Imagens diferentes, deletar?");
        if (deletar)
          await this.RemoverImagens(item);
      }
      return await this.UploadItemImages(item);
    }

    async RemoverImagens(item:Estampa){
      for(let i =0; i<= item.Imagem.length ; i++){

        try{
          if(item.Imagem != [])
            await this.servicoImagem.deleteImage(item.Imagem[i]);

        }
        catch(EX){
           console.log(EX); continue;
        }

      }
    }

    async UploadItemImages(item:Estampa) : Promise<Estampa>{
      if(item.FileList){
        for(let i =0; i<= item.FileList.length ; i++){
          if(item.FileList[i])
            await this.servicoImagem.storeImage(PathDictionary.produtos,item.FileList[i]).then(async x=>{
              item.Imagem[i] = await this.servicoImagem.getRef((await x).metadata.fullPath, item.Nome, "Produto");
            })
        }
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
