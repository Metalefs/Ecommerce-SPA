import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { AuthenticationService } from '../../core/service/authentication/authentication.service';

import { PathDictionary } from 'libs/data/src/lib/routes/image-folders';
import { isEmpty } from '../../helper/ObjHelper';
import { Produto } from 'libs/data/src/lib/classes';
import { ErrorHandler } from '../../core/error.handler';
import { FiltrarProdutoSearchQuery } from 'libs/data/src/lib/interfaces';

import { PaginationResponse } from 'libs/data/src/lib/interfaces';
import { ImagemService } from './ImagemService';
import { AngularFireUploadTask } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})

export class ProdutoService {
  constructor(private http: HttpClient, private ErrorHandler: ErrorHandler,
    private AuthenticationService: AuthenticationService,
    private servicoImagem: ImagemService) { }

  Ler(limit?: number, skip?: number): Observable<PaginationResponse<Produto>> {
    return this.http.get<PaginationResponse<Produto>>(environment.endpoint + RouteDictionary.Produtos.Produto).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.ErrorHandler.handleError) // then handle the error
    );
  }

  FiltrarSemelhantes(id: number): Observable<PaginationResponse<Produto>> {
    return this.http.get<PaginationResponse<Produto>>(environment.endpoint + RouteDictionary.Produtos.Semelhantes + `${id}`).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.ErrorHandler.handleError) // then handle the error
    );
  }

  Filtrar(id: any): Observable<Produto[]> {
    return this.http.get<Produto[]>(environment.endpoint + RouteDictionary.Produtos.Produto + `${id}`).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.ErrorHandler.handleError) // then handle the error
    );
  }

  FiltrarProdutos(fields: FiltrarProdutoSearchQuery, page: number = 1, limit: number = 12): Observable<PaginationResponse<Produto>> {
    let query = '?nome=' + fields.Nome;
    query += '&categoria=' + fields.NomeCategoria;
    query += '&preco=' + fields.Preco;
    query += '&status=' + fields.Status;
    query += '&marca=' + fields.Marca;
    query += '&modelo=' + fields.Modelo;
    query += '&tags=' + fields.Tags;
    query += '&limit=' + limit;

    return this.http.get<PaginationResponse<Produto>>(environment.endpoint + RouteDictionary.Produtos.Filtrar + `${page}/` + query).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.ErrorHandler.handleError) // then handle the error
    );
  }

  async Editar(item: entities.Produto): Promise<Observable<entities.Produto>> {
    return this.EditarImagens(item).then(x => {
      let payload = this.AuthenticationService.tokenize({ Produto: item });
      // alert("Editando !");
      return this.http.put<entities.Produto>(environment.endpoint + RouteDictionary.Produtos.Produto,
        payload).pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(this.ErrorHandler.handleError)
        )
    });

  }

  Gostar(id: string): Observable<entities.Produto> {
    return this.http.post<entities.Produto>(environment.endpoint + RouteDictionary.Produtos.Gostar, { id: id }).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }

  IncrementarVenda(id: string): Observable<entities.Produto> {
    return this.http.post<entities.Produto>(environment.endpoint + RouteDictionary.Produtos.IncrementarVendas, { id: id }).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }

  IncrementarVisualizacoes(id: string): Observable<entities.Produto> {
    return this.http.post<entities.Produto>(environment.endpoint + RouteDictionary.Produtos.IncrementarVisualizacoes, { id: id }).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }

  Rate(id: string, rating: number): Observable<entities.Produto> {
    return this.http.post<entities.Produto>(environment.endpoint + RouteDictionary.Produtos.Rate, { id: id, rating: rating }).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }

  async Remover(id: string): Promise<Observable<any>> {
    return new Promise((resolve, reject) => {
      this.Filtrar(id).subscribe(async Produto => {
        for (let i = 0; i <= Produto[0].Imagem.length; i++) {
          try {
            //if(Produto[0].Imagem[i])
            //await this.servicoImagem.deleteImage(Produto[0].Imagem[i]);
          } catch (EX) { console.log(EX); continue; }
        }
        resolve(this.http.delete<entities.Produto>(environment.endpoint + RouteDictionary.Produtos.Produto + `/${id}`).pipe(
          retry(3),
          catchError(this.ErrorHandler.handleError)
        ));
      })
    })
  }

  Incluir(item: entities.Produto): Observable<Produto> {

    let payload = this.AuthenticationService.tokenize({ Produto: item });
    return this.http.post<entities.Produto>(environment.endpoint + RouteDictionary.Produtos.Produto, payload).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );

  }

  async EditarImagens(item: Produto): Promise<Produto> {

    if (!isEmpty(item.FileList[0])) {
      let deletar = confirm("Imagens diferentes, deletar?");
      if (deletar)
        await this.RemoverImagens(item)
    }
    return await this.UploadItemImages(item);

  }

  async RemoverImagens(item: Produto) {
    for (let i = 0; i <= item.Imagem.length; i++) {

      try {
        if (item.Imagem != []) {
          await this.servicoImagem.deleteImage(item.Imagem[i]);
        }
      } catch (EX) { console.log(EX); continue; }

    }
  }

  async UploadItemImages(item: entities.Produto): Promise<entities.Produto> {
    if (item.FileList) {
      for (let i = 0; i <= item.FileList.length; i++) {
        if (item.FileList[i])
          await this.servicoImagem.storeImage(PathDictionary.produtos, item.FileList[i])
          .then(async (uploadTask: AngularFireUploadTask) => {
            item.Imagem[i] = await this.servicoImagem.getRef((await uploadTask).metadata.fullPath, item.Nome, "Produto");
          })
      }
      return item;
    }
  }
}
