import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
import { BaseServiceWithImageHandling } from './base/base-with-image-handling';
@Injectable({
  providedIn: 'root'
})

export class ClienteService extends BaseServiceWithImageHandling<Cliente> {

  constructor(protected HttpClient:HttpClient, protected ErrorHandler:ErrorHandler,
    protected servicoImagem: ImagemService) {
    super(RouteDictionary.Cliente,HttpClient,ErrorHandler,servicoImagem)
   }

  async Editar(item: entities.Cliente): Promise<Observable<entities.Cliente>> {
    return this.EditarImagens(item).then(x => {
      item = x;
      return this.http.put<entities.Cliente>(environment.endpoint + RouteDictionary.Cliente,
        {item}).pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(this.ErrorHandler.handleError) // then handle the error
        );
    })
  }

  Remover(id: string): Observable<entities.Cliente> {
    return this.http.delete<entities.Cliente>(environment.endpoint +  RouteDictionary.Cliente + `${id}`).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    )
  }

  async EditarImagens(item: Cliente): Promise<Cliente> {
    if (!isEmpty(item.Foto)) {
      alert("Imagens diferentes")
      return this.RemoverImagens(item).then(async () => {
        return await this.UploadItemImages(item);
      }).catch(async () =>{
        return await this.UploadItemImages(item);
      })
    }
  }

  async RemoverImagens(item: Cliente) {
    try {
      if (item.Foto != '')
        await this.servicoImagem.deleteImage(item.Foto);
      else
        return item;
    }
    catch (ex)
    {
      console.error(ex);
      throw ex;
    }
  }

  async UploadItemImages(item: entities.Cliente): Promise<entities.Cliente> {
    if (item.Foto) {
      await this.servicoImagem.storeImage(PathDictionary.clientes, item.Foto).then(async x => {
        item.Foto = await this.servicoImagem.getRef((await x).metadata.fullPath, item.Nome, "Cliente");
      })
      return item;
    }
  }
}
