const MongoClient = require('mongodb').MongoClient
const MDBurl = process.env.MONGODB_URI || 'mongodb+srv://Metalefs:i4e7l4@cluster0.7u463.azure.mongodb.net/PersonalizadosLopes?retryWrites=true&w=majority';
const MongoDBName = "PersonalizadosLopes";

export class Connection {
  static url = MDBurl
  static dbCon = null;
  static options = {
    bufferMaxEntries: 0,
    poolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  static async db() :Promise<any> {
   if(Connection.dbCon)
    return new Promise(async (resolve, reject) :Promise<any> => {resolve(Connection.dbCon)});

   return new Promise(async (resolve, reject) :Promise<any> => {
      await MongoClient.connect(this.url, this.options, function (err: any, db: { db: (arg0: string) => any; close: () => void; }) {
        if (err) {
          reject(err)
        }
        console.log("OPEN");
        Connection.dbCon = db.db(MongoDBName);
        resolve(db.db(MongoDBName)as any);
      });
    });
  }
}
