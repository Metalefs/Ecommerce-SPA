import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class ItemCarousel extends MongoDocument implements entidadeBase {
    url:string;
    href:string;
    backgroundSize:string;
    backgroundPosition:string;
    caption:string;
    static readonly NomeID:string = "ItemCarousel";
    constructor(
      url:string,
      href:string,
      backgroundSize:string,
      backgroundPosition:string,
      caption:string
    ){
        super();
        this.url =url
        this.href =href
        this.caption =caption
        this.backgroundSize =backgroundSize
        this.backgroundPosition =backgroundPosition
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
}
