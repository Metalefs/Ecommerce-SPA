import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { ErrorHandler } from '../../core/error.handler';
import { Feedback } from 'libs/data/src/lib/classes';
import { BaseService } from './base/base.service';
@Injectable({
    providedIn: 'root'
})

export class FeedbackService extends BaseService<Feedback> {

  constructor(protected HttpClient:HttpClient, protected ErrorHandler:ErrorHandler) {
    super(RouteDictionary.Feedback,HttpClient,ErrorHandler)
  }


}
