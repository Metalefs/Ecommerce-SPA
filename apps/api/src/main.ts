import { Connection } from './app/client/MongoConnection';
import { Routers } from './app/controllers';
import { SeedingService } from './app/services/seeding/seeding.service';
import * as express from 'express';
import * as ControllerUsuario from './app/controllers/usuario.controller';

(async function configureConnection() {
  Connection.db().then(() => {

    const port = process.env.PORT || 3000;
    const bodyParser = require('body-parser');
    const cors = require("cors");

    const app = express();
    var compression = require('compression')
    app.use(compression())

    app.use(cors());
    app.use(express.static('./static-files'));
    app.use(bodyParser.json({ limit: '10mb', extended: true }))
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
    app.use(function (req: any, res: { header: (arg0: string, arg1: string) => void; }, next: () => void) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.use("/", Routers);
    app.use("/usuario", [ControllerUsuario.app]);

    app.post("/seed", function (req, res) {
      let seedingService: SeedingService = new SeedingService();
      seedingService.SeedCollections();
      res.send("Seeding...")
    });

    app.post("/seedCar", function (req, res) {
      let seedingService: SeedingService = new SeedingService();
      seedingService.SeedCarousel();
      res.send("Seeding...")
    });

    app.post("/seedMP", function (req, res) {
      let seedingService: SeedingService = new SeedingService();
      seedingService.SeedIntegracoes();
      res.send("Seeding...")
    });

    app.listen(port, async () => {
      console.log(`Running on port ${port}`);
    });

  })
})();
