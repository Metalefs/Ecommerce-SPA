const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require("cors");

import * as express from 'express';

const app = express();

import * as ControllerUsuario  from './app/controllers/usuario.controller';
import { Routers } from './app/controllers';
import { SeedingService } from './app/services/seeding/seeding.service';

app.use(cors());
app.use(express.static('./static-files'));
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(function(req: any, res: { header: (arg0: string, arg1: string) => void; }, next: () => void) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use ("/", [Routers]);
app.use ("/usuario", [ControllerUsuario.app]);
app.post("/seed", function (req,res) {
  let seedingService:SeedingService = new SeedingService();
  seedingService.Seed(null);
  res.send("Seeding...")
});

app.listen(port, () => console.log(`Running on port ${port}`));
