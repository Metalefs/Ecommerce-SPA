import { entities } from "@personalizados-lopes/data";
import { BaseService } from "../baseService";

export class EstampaService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.Estampa.NomeID);

  }
}
