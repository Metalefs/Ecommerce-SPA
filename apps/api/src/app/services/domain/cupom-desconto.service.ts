import { entities } from "@personalizados-lopes/data";
import { BaseService } from "../baseService";

export class CupomDescontoService extends BaseService {

  /**
   *
   */
  constructor() {
    super(entities.CupomDesconto.NomeID);

  }
}
