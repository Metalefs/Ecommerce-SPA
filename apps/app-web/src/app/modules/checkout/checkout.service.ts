import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  public static DadosCompleto:boolean;
  public static EnderecoCompleto:boolean;
  public static PagamentoCompleto:boolean;
  constructor() { }


}
