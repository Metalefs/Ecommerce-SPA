import { Seeder } from "../../repositories/seeding/";

import { MongoClientService } from "../../client/MongoClient.service";

export class SeedingService {

  _mongoClientService = new MongoClientService();
  async SeedCollections() {
    let collectionsToSeed = Seeder.SeedCollections();
    try {
      collectionsToSeed.forEach((collection: any) => {
        console.log(collection.name);
        if (collection.array) {
          // if (Usuario.Tipo == enums.TipoUsuario.admin)
            this._mongoClientService.InsertMany(collection.name, collection.value)
        }
        else {
            this._mongoClientService.Insert(collection.name, collection.value)
        }
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  async SeedCarousel() {
    let collectionsToSeed = Seeder.SeedCarousel();
    try {
      // if (Usuario.Tipo == enums.TipoUsuario.admin)
        this._mongoClientService.Insert(collectionsToSeed.name, collectionsToSeed.value)
    }
    catch (err) {
      console.log(err);
    }
  }
  async SeedIntegracoes() {
    // if (Usuario.Tipo == enums.TipoUsuario.admin)
      let collectionsToSeed = Seeder.SeedIntegracoes();
    try {
        this._mongoClientService.Insert(collectionsToSeed.name, collectionsToSeed.value)
    }
    catch (err) {
      console.log(err);
    }
  }

}
