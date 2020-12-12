const MongoClient = require('mongodb').MongoClient;
const MDBurl = process.env.MONGODB_URI || 'mongodb+srv://Metalefs:i4e7l4@cluster0.7u463.azure.mongodb.net/PersonalizadosLopes?retryWrites=true&w=majority';
const MongoDBName = "PersonalizadosLopes";
const Options = {
    useNewUrlParser: true,
    poolSize: 10,
    useUnifiedTopology: true
}

var ObjectId = require('mongodb').ObjectID;
import { Seeder } from "./seeding/";
import { AppLogger } from "../../app-logger";
let logger = new AppLogger();

export module Repository {

    /*Seeding Mongo DB */

    export async function SeedCollections() {
        let collectionsToSeed = Seeder.SeedCollections();
        try {
            collectionsToSeed.forEach((collection: any) => {
                console.log(collection.name);
                if (collection.array) {

                    console.log("Inserindo muitos", collection.array, collection.value);
                    InsertMany(collection.name, collection.value)
                }
                else {

                    console.log("Inserindo um", collection.array, collection.value);
                    Insert(collection.name, collection.value)
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    export async function SeedCarousel() {
        let collectionsToSeed = Seeder.SeedCarousel();
        try {
            Insert(collectionsToSeed.name, collectionsToSeed.value)
        }
        catch (err) {
            console.log(err);
        }
    }

    /*----------------------------*/

    export function InsertMany(collection: any, value: any) { // upserts many
      try{

        MongoClient.connect(MDBurl, Options, function (err: any, db: { db: (arg0: string) => any; close: () => void; }) {
            if (err) {
                logger.log(err)
                throw err;
            }
            let dbo = db.db(MongoDBName);
            dbo.collection(collection).insertMany(value, function (err: any, res: any) {
                if (err) {
                    logger.log(err)
                    throw err;
                }
                console.log("Inserido " + res.insertedCount + " " + collection + " :  | " + new Date());
                db.close();
            });
        });
      }
      catch(ex){
        throw ex;
      }
    }

    export async function Insert(collection: any, value: any) { // upserts one
      try{

        return new Promise((resolve, reject) => {
            MongoClient.connect(MDBurl, Options, function (err: any, db: { db: (arg0: string) => any; close: () => void; }) {
                if (err) {
                    logger.log(err)
                    reject(err);
                }
                let dbo = db.db(MongoDBName);
                value.DataHoraCriacao = new Date();
                dbo.collection(collection).insertOne(value, async function (err: any, res: any) {
                    if (err) {
                        logger.log(err)
                        reject(err);
                    }
                    console.log("Inserido " + res.insertedCount + " " + collection + " : | " + new Date());
                    resolve(await FindOne(collection, {_id: value._id}));
                    db.close();
                });
            });
        });

      }
      catch(ex){
        throw ex;
      }
    }

    export function List(collection: string) { // reads without caching
      try{

        return new Promise((resolve, reject) => {
            MongoClient.connect(MDBurl, Options, function (err: any, db: { db: (arg0: string) => any; close: () => object; }) {
                if (err) {
                    logger.log(err)
                    reject(err);
                }
                var dbo = db.db(MongoDBName);
                dbo.collection(collection).find({}).toArray(function (err: any, result: any) {
                    if (err) {
                        logger.log(err)
                        reject(err);
                    }
                    db.close();
                    resolve(result);
                });
            });
        });
      }
      catch(ex){
        throw ex;
      }
    }

    export function Count(collection: string) { // count documents in collection
      try{

        return new Promise((resolve, reject) => {
            MongoClient.connect(MDBurl, Options, function (err: any, db: { db: (arg0: string) => any; close: () => object; }) {
                if (err) {
                    logger.log(err)
                    reject(err);
                }
                var dbo = db.db(MongoDBName);
                dbo.collection(collection).countDocuments({}, function (error: any, numOfDocs: any) {
                    if (err) {
                        logger.log(err)
                        reject(err);
                    }
                    db.close();
                    resolve(numOfDocs);
                });
            });
        });
      }
      catch(ex){
        throw ex;
      }
    }

    export async function FindOne(collection: string, query: any) { // finds by query
      try{

        return new Promise((resolve, reject) => {
            MongoClient.connect(MDBurl, Options, function (err: any, db: { db: (arg0: string) => any; close: () => object; }) {
                if (err) {
                  reject(err);
                }
                var dbo = db.db(MongoDBName);
                dbo.collection(collection).find(query).toArray(function (err: string, result: unknown) {
                    if (err) {
                      reject(err);
                    }
                    db.close();
                    console.log("Mongo FindOne",query, result[0]);
                    resolve(result[0])
                });
            });
        });
      }
      catch(ex){
        return {erro: ex};
      }
    }

    export async function Filter(collection: string, query: any) { // filters by query
      try{

        return new Promise((resolve, reject) => {
            MongoClient.connect(MDBurl, Options, function (err: any, db: { db: (arg0: string) => any; close: () => object; }) {
                if (err) {
                    logger.log(err)
                    reject(err);
                }
                var dbo = db.db(MongoDBName);
                return dbo.collection(collection).find(query).toArray(function (err: any, result: any) {
                    if (err) {
                        logger.log(err)
                        reject(err);
                    }
                    db.close();
                    resolve(result)
                });
            });
        });
      }
      catch(ex){
        throw ex;
      }
    }

    export async function Edit(collection: any, id: string, query: any) { // edits one document by id
      try{

      delete query._id;
      delete query.DataHoraCriacao;
      query.DataHoraAlteracao = new Date();
      return new Promise ( (resolve, reject) => {
            MongoClient.connect(MDBurl, Options, function (err: any, db: { db: (arg0: string) => any; close: () => void; }) {
                if (err) {
                    logger.log(err)
                    reject(err);
                }
                let dbo = db.db(MongoDBName);
                dbo.collection(collection).updateOne({ "_id": new ObjectId(id) }, { $set: query }, async function (err: any, result: any) {
                    if (err) {
                        logger.log(err)
                        reject(err);
                    }
                    console.log("Editado", result.n)
                    db.close();
                    resolve(await FindOne(collection, { "_id": new ObjectId(id) }).catch(x=>reject(x)));
                });
            });
        });
      }
      catch(ex){
        return {erro :ex};
      }
    }

    export function EditByAttribute(collection: any, attr: object, query: any) { // edits documents by one attribute
      try{


        MongoClient.connect(MDBurl, Options, function (err: any, db: { db: (arg0: string) => any; close: () => void; }) {
            if (err) {
                logger.log(err)
                throw err;
            }
            let dbo = db.db(MongoDBName);
            console.log(collection, query, attr);
            dbo.collection(collection).updateOne(attr, { $set: query }, function (err: any, result: any) {
                if (err) {
                    logger.log(err)
                    throw err;
                }
                console.log("Editado", result, query)
                db.close();
            });
        });

      }
      catch(ex){
        throw ex;
      }
    }

    export async function UpdateUserToken(collection: any, id: string, token: any) { // updates one user token
      try{


          MongoClient.connect(MDBurl, Options, function (err: any, db: { db: (arg0: string) => any; close: () => void; }) {
              if (err) {
                  logger.log(err)
                  throw err;
              }
              let dbo = db.db(MongoDBName);
              dbo.collection(collection).updateOne({ _id: id }, { $set: { token: token, DataHoraAlteracao: new Date() } }, function (err: any, result: any) {
                  if (err) {
                      logger.log(err)
                      throw err;
                  }
                  console.log("UpdateUserToken ", result.documents)
                  db.close();

              });
          });

      }
      catch(ex){
        throw ex;
      }
    }

    export function UpdateUserPassword(collection: any, id: string, Senha: any) { // updates one user token
      try{

        return new Promise ( (resolve, reject) => {
          MongoClient.connect(MDBurl, Options, function (err: any, db: { db: (arg0: string) => any; close: () => void; }) {
              if (err) {
                  logger.log(err)
                  throw err;
              }
              let dbo = db.db(MongoDBName);
              dbo.collection(collection).updateOne({ _id: id }, { $set: { Senha: Senha, DataHoraAlteracao: new Date() } },  async function  (err: any, result: any) {
                  if (err) {
                      logger.log(err)
                      throw err;
                  }
                  console.log("UpdateUserPassword ", result.documents)
                  db.close();
                  resolve(await FindOne(collection, { "_id": new ObjectId(id) }).catch(x=>reject(x)));
              });
          });
        });
      }
      catch(ex){
        throw ex;
      }
    }

    export async function Remove(collection: any, id: any) { // removes one from collection
      try{

        return new Promise((resolve, reject) => {
            MongoClient.connect(MDBurl, Options, function (err: any, db: { db: (arg0: string) => any; close: () => void; }) {
                if (err) {
                    logger.log(err)
                    reject(err);
                }
                let dbo = db.db(MongoDBName);
                dbo.collection(collection).deleteOne({ "_id": new ObjectId(id) }, function (err: any, result: any) {
                    if (err) {
                        logger.log(err)
                        reject(err);
                    }
                    resolve(result);
                    console.log("Removed",collection,id)
                    db.close();
                });
            });
        });
      }
      catch(ex){
        throw ex;
      }
    }
}
