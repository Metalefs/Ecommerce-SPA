import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { PathDictionary } from 'libs/data/src/lib/routes/image-folders';
import { ItemCarousel } from 'libs/data/src/lib/classes';
import { ImagemService } from './ImagemService';
import { ErrorHandler } from '../../core/error.handler';
import { BaseServiceWithImageHandling } from './base/base-with-image-handling';
@Injectable({
  providedIn: 'root'
})

export class ItemCarouselService extends BaseServiceWithImageHandling<ItemCarousel> {

  constructor(protected HttpClient: HttpClient, protected ErrorHandler: ErrorHandler,
    protected servicoImagem: ImagemService) {
    super(RouteDictionary.ItemCarousel, HttpClient, ErrorHandler, servicoImagem)
  }

  async Editar(item: entities.ItemCarousel): Promise<Observable<entities.ItemCarousel>> {
    // return this.EditarImagens(item).then(x=>{
    //     // alert("Editando !");
    //     console.log(item);
    //   });
    return this.http.put<entities.ItemCarousel>(environment.endpoint + RouteDictionary.ItemCarousel,
      { item }).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.ErrorHandler.handleError)
      )
  }

  Remover(id: string): Observable<any> {
    return this.http.delete<entities.Cliente>(environment.endpoint + RouteDictionary.ItemCarousel + `${id}`).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }

  async EditarImagens(item: ItemCarousel): Promise<ItemCarousel> {
    if (item.url) {
      alert("Imagens diferentes")
      return this.RemoverImagens(item).then(async () => {
        return await this.UploadItemImages(item);
      })
    }
  }

  async RemoverImagens(item: ItemCarousel) {
    try {
      if (item.url != '') {
        await this.servicoImagem.deleteImage(item.url);
      }
      else {
        return item;
      }
    } catch (EX) { console.log(EX); return item; }
  }

  async UploadItemImages(item: entities.ItemCarousel): Promise<entities.ItemCarousel> {
    await this.servicoImagem.storeImage(PathDictionary.carousel, item.url).then(async x => {
      item.url = await this.servicoImagem.getRef((await x).metadata.fullPath, item.nome, "ItemCarousel");
    })
    return item;
  }
}
