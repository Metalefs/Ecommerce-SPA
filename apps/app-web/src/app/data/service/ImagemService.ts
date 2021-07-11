import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { Imagem } from 'libs/data/src/lib/classes';
import { ErrorHandler } from '../../core/error.handler';
import { PathDictionary } from 'libs/data/src/lib/routes/image-folders';

@Injectable({
  providedIn: 'root'
})

export class ImagemService {
  constructor(private http: HttpClient, private ErrorHandler: ErrorHandler,
    private AF: AngularFireStorage) { }


  async getRef(foto, nome, tipo): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        this.AF.storage.ref(foto).getDownloadURL().then(x => {
          this.Incluir(new Imagem(x, nome, tipo)).subscribe();
          resolve(x);
        });
      }
      catch (ex) { alert("Erro ao obter imagem"); console.error(ex); reject(ex) }
    })
  }

  async storeImage(dir, data): Promise<AngularFireUploadTask> {
    return new Promise((resolve, reject) => {
      try {
        this.AF.upload(dir + `${Math.random()}${data.name}`, data).then(uploadTask => {
          resolve(uploadTask as AngularFireUploadTask);
        });
      }
      catch (ex) { alert("Erro ao armazenar imagem"); console.error(ex); reject(ex) }
    })
  }

  async deleteImage(caminho): Promise<AngularFireUploadTask> {
    return new Promise((resolve, reject) => {
      try {
        this.AF.storage.refFromURL(caminho).delete().then(x => {
          console.log(x);
          this.Remover(caminho);
          resolve(x);
        }).catch((ex) => {
          this.Remover(caminho);
          resolve(ex);
        });
      }
      catch (ex) {
        alert("Erro ao deletar imagem");
        console.error(ex);
        reject(ex);
      }
    })
  }

  Ler(): Observable<entities.Imagem[]> {
    return this.http.get<entities.Imagem[]>(environment.endpoint + RouteDictionary.Imagem).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.ErrorHandler.handleError) // then handle the error
    );
  }

  Filtrar(src: string): Observable<entities.Imagem[]> {
    return this.http.get<entities.Imagem[]>(environment.endpoint + RouteDictionary.Imagem + `?src = ${src}`).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.ErrorHandler.handleError) // then handle the error
    );
  }

  FiltrarPorNome(nome: string): Observable<entities.Imagem[]> {
    return this.http.get<entities.Imagem[]>(environment.endpoint + RouteDictionary.Imagem + `?nome = ${nome}`).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.ErrorHandler.handleError) // then handle the error
    );
  }

  Editar(item: entities.Imagem): any {
    return this.http.put<entities.Imagem>(environment.endpoint + RouteDictionary.Imagem,
      {item}).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.ErrorHandler.handleError) // then handle the error
      );
  }

  Remover(src: string) {
    this.Filtrar(src).subscribe((x: Imagem[]) => {
      this.http.delete<entities.Imagem>(environment.endpoint + RouteDictionary.Imagem + `${x[0]._id}`).pipe(
        retry(3),
        catchError(this.ErrorHandler.handleError)
      ).subscribe();
    });
  }

  Incluir(item: entities.Imagem, upload?: boolean): Observable<any> {
    let subject = new Subject<any>();
    if (upload) {
      if (item.FileList) {
        this.storeImage(PathDictionary.generico, item.FileList).then(async x => {
          item.Src = await this.getRef((await x).metadata.fullPath, item.Nome, item.Tipo);
        }).then(x => {
          subject.next(item);
          return subject.asObservable();
        })
      }
    }
    else {
      return this.http.post<entities.Imagem>(environment.endpoint + RouteDictionary.Imagem, { item }).pipe(
        retry(3),
        catchError(this.ErrorHandler.handleError)
      );
    }
  }
}
