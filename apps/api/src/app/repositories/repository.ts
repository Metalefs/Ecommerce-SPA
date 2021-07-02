import { AppLogger } from "../../app-logger";
let logger = new AppLogger();

import { MongoClientService } from "../client/MongoClient.service";

export module Repository {

  let _mongoClientService = new MongoClientService();
  export async function InsertMany(collection: any, value: any) { // upserts many
    try {
     return await _mongoClientService.InsertMany(collection,value).catch(ex=>{
        throw ex;
      });
    }
    catch (ex) {
      logger.log(ex);
      throw ex;
    }
  }

  export async function Insert(collection: any, value: any) { // upserts one
    try {
      return await _mongoClientService.Insert(collection,value).catch(ex=>{
        throw ex;
      });
    }
    catch (ex) {
      throw ex;
    }
  }

  export async function List(collection: string) { // reads without caching
    try {
      return await _mongoClientService.List(collection).catch(ex=>{
        throw ex;
      });
    }
    catch (ex) {
      throw ex;
    }
  }

  export async function Count(collection: string) { // count documents in collection
    try {
      return await _mongoClientService.Count(collection).catch(ex=>{
        throw ex;
      });
    }
    catch (ex) {
      throw ex;
    }
  }

  export async function CountFilter(collection: string, query: any) { // count documents in collection
    try {
     return await _mongoClientService.CountFilter(collection, query).catch(ex=>{
        throw ex;
      });
    }
    catch (ex) {
      throw ex;
    }
  }

  export async function FindOne(collection: string, query: any) { // finds by query
    try {
      return await _mongoClientService.FindOne(collection, query).catch(ex=>{
        throw ex;
      });
    }
    catch (ex) {
      return { erro: ex };
    }
  }

  export async function Filter(collection: string, query: any) { // filters by query
    try {
      return await _mongoClientService.Filter(collection, query).catch(ex=>{
        throw ex;
      });
    }
    catch (ex) {
      throw ex;
    }
  }
  export async function Paginate(collection: string, query: any, limit: number, skip: number) { // filters by query
    try {
      return await _mongoClientService.Paginate(collection, query, limit, skip).catch(ex=>{
        throw ex;
      });
    }
    catch (ex) {
      throw ex;
    }
  }

  export async function Aggregate(collection: string, query: any, search: any) { // aggregation by query
    try {
      return await _mongoClientService.Aggregate(collection, query, search).catch(ex=>{
        throw ex;
      });
    }
    catch (ex) {
      throw ex;
    }
  }

  export async function Edit(collection: any, id: string, query: any) { // edits one document by id
    try {
      return await _mongoClientService.Edit(collection, id, query).catch(ex=>{
        throw ex;
      });
    }
    catch (ex) {
      return { erro: ex };
    }
  }

  export async function EditByAttribute(collection: any, attr: object, query: any) { // edits documents by one attribute
    try {
      return await _mongoClientService.EditByAttribute(collection, attr, query).catch(ex=>{
        throw ex;
      });
    }
    catch (ex) {
      throw ex;
    }
  }

  export async function Remove(collection: any, id: any) { // removes one from collection
    try {
      return await _mongoClientService.Remove(collection, id).catch(ex=>{
        throw ex;
      });
    }
    catch (ex) {
      throw ex;
    }
  }



  export async function UpdateUserToken(collection: any, id: string, token: any) { // updates one user token
    try {
      return await _mongoClientService.UpdateUserToken(collection, id, token);
    }
    catch (ex) {
      throw ex;
    }
  }

  export async function UpdateUserPassword(collection: any, id: string, Senha: any) { // updates one user token
    try {
      return await _mongoClientService.UpdateUserPassword(collection, id, Senha);
    }
    catch (ex) {
      throw ex;
    }
  }
}
