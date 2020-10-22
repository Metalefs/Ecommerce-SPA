import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { AuthenticationService } from '../../core/service/authentication/authentication.service';
import { Imagem } from 'libs/data/src/lib/classes';


@Injectable({
    providedIn: 'root'
})

export class ImagemService {
    constructor(private http: HttpClient,
        private AuthenticationService: AuthenticationService,
        private AF:AngularFireStorage) { }


  async getRef(foto,nome,tipo) : Promise<string>{
    return new Promise((resolve, reject) => {
      try{
        this.AF.storage.ref(foto).getDownloadURL().then(x=>{
          this.Incluir(new Imagem(x,nome,tipo)).subscribe();
          alert("getting image url "+ x)
          resolve(x);
        });
      }
      catch(ex){}
    })
  }

  async storeImage(dir,caminho) : Promise<AngularFireUploadTask>{
    console.log(caminho);
    return new Promise((resolve, reject) => {
      try{
        this.AF.upload(dir+`${Math.random()}${caminho.name}`,caminho).then(x=>{
          alert("store image " + x.task.snapshot.metadata.fullPath)
          resolve(x);
        });
      }
      catch(ex){console.error(ex)}
    })
  }

  async deleteImage(caminho) : Promise<AngularFireUploadTask>{
    return new Promise((resolve, reject) => {
      try{
        this.AF.storage.refFromURL(caminho).delete().then(x=>{
          console.log(x);
          this.Remover(caminho);
          resolve(x);
        });
      }
      catch(ex){

      }
    })
  }

  Ler(): Observable<entities.Imagem[]> {
      return this.http.get<entities.Imagem[]>(environment.endpoint + RouteDictionary.Imagem).pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );
  }

  Filtrar(src:string): Observable<entities.Imagem[]> {
    return this.http.get<entities.Imagem[]>(environment.endpoint + RouteDictionary.Imagem+ `?src = ${src}`).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  Editar(item: entities.Imagem): any {
      let payload = this.AuthenticationService.tokenize({Imagem:item});
      console.log(payload);
      return this.http.put<entities.Imagem>(environment.endpoint + RouteDictionary.Imagem,
          payload).pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
      );
  }

  Remover(src: string){
    let token;
    this.Filtrar(src).subscribe((x : Imagem[])=>{
      token = this.AuthenticationService.tokenize({id:x[0]._id});
      this.http.delete<entities.Imagem>(environment.endpoint + RouteDictionary.Imagem  + `?id=${token.id}&token=${token.token}`).pipe(
          retry(3),
          catchError(this.handleError)
      ).subscribe();
    });
  }

  Incluir(item: entities.Imagem): Observable<any> {
      return this.http.post<entities.Imagem>(environment.endpoint + RouteDictionary.Imagem, {item}).pipe(
          retry(3),
          catchError(this.handleError)
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
