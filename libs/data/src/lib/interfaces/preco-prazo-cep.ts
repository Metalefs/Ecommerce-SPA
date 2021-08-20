
import {PrecoPrazoEvent} from 'correios-brasil';

export interface PrecoPrazoCep {
  cep:string,
  precos?: PrecoPrazoEvent;
}
