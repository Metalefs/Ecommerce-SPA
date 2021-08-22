import { Connection } from './MongoConnection';
var ObjectId = require('mongodb').ObjectID;

export class MongoClientService {

  async InsertMany(collection: any, value: any) { // upserts many
    try {
      Connection.db().then((db:any)=>db.collection(collection).insertMany(value, function (err: any, res: any) {
        if (err) {
          throw err;
        }
        console.log("Inserido " + res.insertedCount + " " + collection + " :  | " + new Date());
      }));
    }
    catch (ex) {
      throw ex;
    }
  }

  async Insert(collection: any, value: any) { // upserts one
    try {
      let self = this;
      return new Promise((resolve, reject) :any => {
        value.DataHoraCriacao = new Date();
        Connection.db().then((db:any)=>db.collection(collection).insertOne(value, async function (err: any, res: any) {
          if (err) {
            reject(err);
          }
          resolve(await self.FindOne(collection, { _id: value._id }));
        }));
      });
    }
    catch (ex) {
      throw ex;
    }
  }

  List(collection: string) { // reads without caching
    try {
      return new Promise((resolve, reject) :any => {
        Connection.db().then((db:any)=>db.collection(collection).find({}).toArray(function (err: any, result: any) {
          if (err) {
            reject(err);
          }
          resolve(result);
        }));
      });
    }
    catch (ex) {
      throw ex;
    }
  }

  Count(collection: string) { // count documents in collection
    try {
      return new Promise((resolve, reject) :any => {
        Connection.db().then((db:any)=>db.collection(collection).countDocuments({}, function (error: any, numOfDocs: any) {
          resolve(numOfDocs);
          reject(error);
        }));
      });
    }
    catch (ex) {
      throw ex;
    }
  }

  CountFilter(collection: string, query: any) { // count documents in collection
    try {
      return new Promise((resolve, reject) :any => {
        Connection.db().then((db:any)=>db.collection(collection).countDocuments(query, function (error: any, numOfDocs: any) {
          if (error) {
            reject(error);
          }
          resolve(numOfDocs);
        }));
      });
    }
    catch (ex) {
      throw ex;
    }
  }

  async FindOne(collection: string, query: any) { // finds by query
    try {
      return new Promise((resolve, reject) :any => {
        Connection.db().then((db:any)=>db.collection(collection).find(query).toArray(function (err: string, result: unknown) {
          if (err) {
            reject(err);
          }
          resolve(result[0])
        }));
      });
    }
    catch (ex) {
      throw ex;
    }
  }

  async Filter(collection: string, query: any) { // filters by query
    try {
      return new Promise((resolve, reject) :any => {
        Connection.db().then((db:any)=>db.collection(collection).find(query).toArray(function (err: any, result: any) {
          if (err) {
            reject(err);
          }
          resolve(result);
        }));
      });
    }
    catch (ex) {
      throw ex;
    }
  }
  async Paginate(collection: string, query: any, limit: number, skip: number) { // filters by query
    try {
      return new Promise((resolve, reject) :any => {
        Connection.db().then((db:any)=>db.collection(collection).find(query).limit(limit).skip(limit * (skip - 1)).toArray(function (err: any, result: any) {
          if (err) {
            reject(err);
          }
          resolve(result);
        }));
      });
    }
    catch (ex) {
      throw ex;
    }
  }

  async Aggregate(collection: string, query: any, search: any) { // filters by query
    try {
      return new Promise((resolve, reject) :any => {
        Connection.db().then((db:any)=>db.collection(collection).find(query, search).toArray(function (err: any, result: any) {
          if (err) {
            reject(err);
          }
          resolve(result);
        }));
      });
    }
    catch (ex) {
      throw ex;
    }
  }

  async Edit(collection: any, id: string, query: any) { // edits one document by id
    try {
      query.DataHoraAlteracao = new Date();
      const { _id, DataHoraCriacao, ...queryWithoutIdAndCreationDate } = query;

      let self = this;
      return new Promise((resolve, reject) :any => {
        Connection.db().then((db:any)=>db.collection(collection).updateOne({ "_id": new ObjectId(id) }, { $set: queryWithoutIdAndCreationDate }, async function (err: any, result: any) {
          if (err) {
            reject(err);
          }
          resolve(await self.FindOne(collection, { "_id": new ObjectId(id) }).catch(x => reject(x)));
        }));
      });
    }
    catch (ex) {
      throw ex;
    }
  }

  EditByAttribute(collection: any, attr: object, query: any) { // edits documents by one attribute
    try {
      return new Promise((resolve, reject) :any => {
        Connection.db().then((db:any)=>db.collection(collection).updateOne(attr, { $set: query }, async function (err: any, result: any) {
          if (err) {
            reject(err);
          }
          console.log("Editado", result, query);
          resolve(result.n);
        }));
      });
    }
    catch (ex) {
      throw ex;
    }
  }

  async UpdateUserToken(collection: any, id: string, token: any) { // updates one user token
    try {

      Connection.db().then((db:any)=>db.collection(collection).updateOne({ _id: id }, { $set: { token: token, DataHoraAlteracao: new Date() } }, function (err: any, result: any) {
        if (err) {
          throw err;
        }
        console.log("UpdateUserToken ", result.documents);
      }));
    }
    catch (ex) {
      throw ex;
    }
  }

  UpdateUserPassword(collection: any, id: string, Senha: any) { // updates one user token
    try {
      let self = this;
      return new Promise((resolve, reject) :any => {
        Connection.db().then((db:any)=>db.collection(collection).updateOne({ _id: id }, { $set: { Senha: Senha, DataHoraAlteracao: new Date() } }, async function (err: any, result: any) {
          if (err) {
            reject(err);
          }
          console.log("UpdateUserPassword ", result.documents);
          resolve(await self.FindOne(collection, { "_id": new ObjectId(id) }).catch(x => reject(x)));
        }));
      });
    }
    catch (ex) {
      throw ex;
    }
  }

  async Remove(collection: any, id: any) { // removes one from collection
    try {
      return new Promise((resolve, reject) :any => {
        Connection.db().then((db:any)=>db.collection(collection).deleteOne({ "_id": new ObjectId(id) }, function (err: any, result: any) {
          if (err) {
            reject(err);
          }
          resolve(result);
          console.log("Removed", collection, id);
        }));
      });
    }
    catch (ex) {
      throw ex;
    }
  }
}
