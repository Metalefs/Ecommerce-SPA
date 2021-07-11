import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { ImagemService } from './ImagemService';
import { ErrorHandler } from '../../core/error.handler';
import { Servico } from 'libs/data/src/lib/classes';
import { PathDictionary } from 'libs/data/src/lib/routes/image-folders';
import { isEmpty } from '../../helper/ObjHelper';
import { BaseService } from './base/base.service';

@Injectable({
    providedIn: 'root'
})

export class ServicoService extends BaseService<Servico> {

  constructor(protected HttpClient:HttpClient, protected ErrorHandler:ErrorHandler, private servicoImagem:ImagemService) {
    super(RouteDictionary.Servico,HttpClient,ErrorHandler)
  }

    async EditarServico(item: entities.Servico): Promise<Observable<entities.Servico>> {
      return this.EditarImagens(item).then(x=>{
        return this.http.put<entities.Servico>(environment.endpoint + RouteDictionary.Servico,
          {item}).pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(this.ErrorHandler.handleError)
        )
      });
    }

    async EditarImagens(item:Servico) : Promise<Servico>{
      if(!isEmpty(item.FileList) && item.FileList != null){
        alert("Imagens diferentes")
        // return this.RemoverImagens(item).then(async()=>{
        // })
      }
      return await this.UploadItemImages(item);
    }

    async UploadItemImages(item:entities.Servico) : Promise<entities.Servico>{
      if(item.FileList){
        for(let i =0; i<= item.FileList.length ; i++){
          if(item.FileList[i]?.name)
          await this.servicoImagem.storeImage(PathDictionary.servicos,item.FileList[i]).then(async x=>{
            item.Imagem = await this.servicoImagem.getRef((await x).metadata.fullPath, item.Nome, "Empresa");
          })
        }
        return item;
      }
    }
}
