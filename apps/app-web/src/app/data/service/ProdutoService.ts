import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { AuthenticationService } from '../../core/service/authentication/authentication.service';
import { CategoriaService } from './CategoriaService';
import { ImagemService } from './ImagemService';

import { PathDictionary } from 'libs/data/src/lib/routes/image-folders';
import { isEmpty } from '../../helper/ObjHelper';
import { Produto } from 'libs/data/src/lib/classes';

@Injectable({
    providedIn: 'root'
})

export class ProdutoService {
    constructor(private http: HttpClient,
    private AuthenticationService: AuthenticationService,
    private servicoCategoria: CategoriaService,
    private servicoImagem: ImagemService) { }

    Ler(): Observable<entities.Produto[]> {
        return this.http.get<entities.Produto[]>(environment.endpoint + RouteDictionary.Produto).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );
    }

    Filtrar(id:any): Observable<entities.Produto[]> {
      return this.http.get<entities.Produto[]>(environment.endpoint + RouteDictionary.Produto + `?id = ${id}`).pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );
    }

    async Editar(item: entities.Produto): Promise<Observable<entities.Produto>> {
        let imagensDeletadas = 0;
        if(!isEmpty(item.FileList[0])){
          alert("Imagens diferentes")
          for(let i =0; i<= item.Imagem.length ; i++){

            try{
              if(item.Imagem != []){
                await this.servicoImagem.deleteImage(item.Imagem[i]);
                imagensDeletadas ++;
              }
            }catch(EX){ console.log(EX); continue;}

          }
          for(let i =0; i< item.FileList.length ; i++){
            this.servicoImagem.storeImage(PathDictionary.produtos,item.FileList[i]).then(async x=>{
              item.Imagem[i] = await this.servicoImagem.getRef((await x).metadata.fullPath, item.Nome,"Produto");
            })
          }

        }

        let payload = this.AuthenticationService.tokenize({Produto:item});
        console.log("Editando !",payload);

        return this.http.put<entities.Produto>(environment.endpoint + RouteDictionary.Produto,
          payload).pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(this.handleError)
        )
    }

    Gostar(id:string) :Observable<entities.Produto> {
      return this.http.post<entities.Produto>(environment.endpoint + RouteDictionary.GostarProduto, {id:id}).pipe(
          retry(3),
          catchError(this.handleError)
      );
    }

    async Remover(id: string): Promise<Observable<any>>{
      return new Promise((resolve, reject) =>{
        this.Filtrar(id).subscribe(async Produto =>{
          for(let i =0; i<= Produto[0].Imagem.length ; i++){
            try{
              await this.servicoImagem.deleteImage(Produto[0].Imagem[i]);
            }catch(EX){ console.log(EX); continue;}
          }
          let token = this.AuthenticationService.tokenize({id});
          resolve(this.http.delete<entities.Produto>(environment.endpoint + RouteDictionary.Produto + `?id=${id}&token=${token.token}`).pipe(
              retry(3),
              catchError(this.handleError)
          ));
        })
      })
    }

    Incluir(item: entities.Produto): Observable<Produto> {

      let payload = this.AuthenticationService.tokenize({Produto:item});
      return this.http.post<entities.Produto>(environment.endpoint + RouteDictionary.Produto, payload).pipe(
        retry(3),
        catchError(this.handleError)
      );

    }

    async UploadItemImages(item:entities.Produto) : Promise<entities.Produto>{
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
